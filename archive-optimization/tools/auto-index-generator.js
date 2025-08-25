// OUTIL 1 : AUTO-INDEX GENERATOR
// Génération automatique des fichiers index.js pour auto-discovery
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class AutoIndexGenerator {
  constructor(options = {}) {
    this.options = {
      dataRoot: path.join(__dirname, 'src', 'data'),
      templatePath: path.join(__dirname, 'templates', 'index-template.js'),
      dryRun: options.dryRun || false,
      verbose: options.verbose || false
    };
  }

  async generateAll() {
    console.log('🔧 AUTO-INDEX GENERATOR - Génération automatique des index\n');
    
    try {
      const structure = await this.scanDataStructure();
      await this.generateIndexFiles(structure);
      
      console.log('\n✅ Génération terminée avec succès !');
      return structure;
    } catch (error) {
      console.error('❌ Erreur lors de la génération:', error.message);
      throw error;
    }
  }

  async scanDataStructure() {
    console.log('🔍 Scan de la structure des données...');
    
    const structure = {
      matieres: new Map(),
      totalFiles: 0,
      errors: []
    };

    try {
      const matieres = await fs.readdir(this.options.dataRoot, { withFileTypes: true });
      
      for (const matiere of matieres) {
        if (matiere.isDirectory() && !matiere.name.startsWith('_')) {
          const matierePath = path.join(this.options.dataRoot, matiere.name);
          const matiereStructure = await this.scanMatiere(matiere.name, matierePath);
          structure.matieres.set(matiere.name, matiereStructure);
          structure.totalFiles += matiereStructure.totalFiles;
        }
      }
      
    } catch (error) {
      structure.errors.push(`Erreur scan data root: ${error.message}`);
    }

    this.logStructure(structure);
    return structure;
  }

  async scanMatiere(matiereName, matierePath) {
    const matiere = {
      name: matiereName,
      niveaux: new Map(),
      totalFiles: 0,
      errors: []
    };

    try {
      const items = await fs.readdir(matierePath, { withFileTypes: true });
      
      for (const item of items) {
        if (item.isDirectory()) {
          // C'est un niveau (6eme, 5eme, etc.)
          const niveauPath = path.join(matierePath, item.name);
          const niveauStructure = await this.scanNiveau(item.name, niveauPath);
          matiere.niveaux.set(item.name, niveauStructure);
          matiere.totalFiles += niveauStructure.subjects.length;
        } else if (item.isFile() && item.name.endsWith('.js') && !item.name.includes('index')) {
          // Fichier de niveau direct (ancien format)
          matiere.niveaux.set(path.basename(item.name, '.js'), {
            name: path.basename(item.name, '.js'),
            subjects: [item.name],
            path: matierePath
          });
          matiere.totalFiles++;
        }
      }
      
    } catch (error) {
      matiere.errors.push(`Erreur scan matière ${matiereName}: ${error.message}`);
    }

    return matiere;
  }

  async scanNiveau(niveauName, niveauPath) {
    const niveau = {
      name: niveauName,
      subjects: [],
      path: niveauPath,
      errors: []
    };

    try {
      const files = await fs.readdir(niveauPath);
      
      for (const file of files) {
        if (file.endsWith('.js') && 
            !file.includes('index') && 
            !file.includes('reference') &&
            !file.includes('template')) {
          
          // Analyser le fichier pour extraire les métadonnées
          const subjectInfo = await this.analyzeSubjectFile(path.join(niveauPath, file));
          niveau.subjects.push({
            filename: file,
            name: path.basename(file, '.js'),
            exportName: subjectInfo.exportName,
            aliases: subjectInfo.aliases,
            valid: subjectInfo.valid,
            errors: subjectInfo.errors
          });
        }
      }
      
    } catch (error) {
      niveau.errors.push(`Erreur scan niveau ${niveauName}: ${error.message}`);
    }

    return niveau;
  }

  async analyzeSubjectFile(filePath) {
    const analysis = {
      exportName: null,
      aliases: [],
      valid: false,
      errors: []
    };

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Extraire l'export principal
      const exportMatches = content.match(/export\s+const\s+(\w+)/g);
      if (exportMatches) {
        analysis.exportName = exportMatches[0].match(/export\s+const\s+(\w+)/)[1];
      }

      // Extraire les exports nommés (aliases)
      const namedExportMatches = content.match(/export\s*{\s*([^}]+)\s*}/g);
      if (namedExportMatches) {
        namedExportMatches.forEach(match => {
          const names = match.match(/{\s*([^}]+)\s*}/)[1];
          const aliases = names.split(',').map(name => name.trim());
          analysis.aliases.push(...aliases);
        });
      }

      // Vérifier export par défaut
      const hasDefaultExport = content.includes('export default');

      analysis.valid = !!(analysis.exportName && hasDefaultExport);
      
      if (!analysis.exportName) {
        analysis.errors.push('Aucun export const trouvé');
      }
      if (!hasDefaultExport) {
        analysis.errors.push('Export default manquant');
      }

    } catch (error) {
      analysis.errors.push(`Erreur analyse fichier: ${error.message}`);
    }

    return analysis;
  }

  async generateIndexFiles(structure) {
    console.log('\n📝 Génération des fichiers index...');

    // 1. Générer index principal (src/data/index.js)
    await this.generateMainIndex(structure);

    // 2. Générer index par matière
    for (const [matiereName, matiere] of structure.matieres) {
      await this.generateMatiereIndex(matiereName, matiere);
      
      // 3. Générer index par niveau
      for (const [niveauName, niveau] of matiere.niveaux) {
        await this.generateNiveauIndex(matiereName, niveauName, niveau);
      }
    }
  }

  async generateMainIndex(structure) {
    const imports = [];
    const exports = [];

    for (const [matiereName, matiere] of structure.matieres) {
      const importName = this.toCamelCase(matiereName);
      imports.push(`import { ${importName} } from './${matiereName}/index.js';`);
      exports.push(`  ${matiereName}: ${importName}`);
    }

    const content = `// AUTO-GÉNÉRÉ - Ne pas modifier manuellement
// Fichier d'index principal généré automatiquement
// Date de génération: ${new Date().toISOString()}

${imports.join('\n')}
import { convertToLegacyFormat } from './legacyConverter.js';

// Structure organisée par matière et niveau
export const coursDataBySubjectAndLevel = {
${exports.join(',\n')}
};

// Export par défaut pour compatibilité
export default coursDataBySubjectAndLevel;

// Statistiques de génération
export const generationStats = {
  generatedAt: "${new Date().toISOString()}",
  totalMatieres: ${structure.matieres.size},
  totalFiles: ${structure.totalFiles}
};`;

    await this.writeFile('src/data/index.js', content);
    console.log('   ✅ Index principal généré');
  }

  async generateMatiereIndex(matiereName, matiere) {
    const imports = [];
    const exports = [];

    for (const [niveauName, niveau] of matiere.niveaux) {
      if (niveau.subjects.length > 0) {
        const importName = `${matiereName}${this.capitalizeFirst(niveauName)}Data`;
        imports.push(`import ${importName} from './${niveauName}/index.js';`);
        exports.push(`  "${niveauName}": ${importName}`);
      }
    }

    const content = `// AUTO-GÉNÉRÉ - Ne pas modifier manuellement
// Index de la matière: ${matiereName}
// Date de génération: ${new Date().toISOString()}

${imports.join('\n')}

export const ${this.toCamelCase(matiereName)} = {
${exports.join(',\n')}
};

export default ${this.toCamelCase(matiereName)};`;

    await this.writeFile(`src/data/${matiereName}/index.js`, content);
    console.log(`   ✅ Index ${matiereName} généré`);
  }

  async generateNiveauIndex(matiereName, niveauName, niveau) {
    if (niveau.subjects.length === 0) return;

    const imports = [];
    const exports = [];

    for (const subject of niveau.subjects) {
      if (subject.valid && subject.exportName) {
        imports.push(`import { ${subject.exportName} } from './${subject.filename}';`);
        exports.push(`  "${subject.name}": ${subject.exportName}`);
        
        // Ajouter les aliases
        if (subject.aliases.length > 0) {
          for (const alias of subject.aliases) {
            if (alias !== subject.exportName) {
              exports.push(`  "${alias}": ${subject.exportName}`);
            }
          }
        }
      }
    }

    const content = `// AUTO-GÉNÉRÉ - Ne pas modifier manuellement
// Index du niveau: ${niveauName} - Matière: ${matiereName}
// Date de génération: ${new Date().toISOString()}

${imports.join('\n')}

const ${matiereName}${this.capitalizeFirst(niveauName)}Data = {
${exports.join(',\n')}
};

export default ${matiereName}${this.capitalizeFirst(niveauName)}Data;

// Statistiques
export const stats = {
  niveau: "${niveauName}",
  matiere: "${matiereName}",
  totalSujets: ${niveau.subjects.length},
  validSujets: ${niveau.subjects.filter(s => s.valid).length}
};`;

    await this.writeFile(`src/data/${matiereName}/${niveauName}/index.js`, content);
    console.log(`   ✅ Index ${matiereName}/${niveauName} généré`);
  }

  async writeFile(relativePath, content) {
    const fullPath = path.join(__dirname, relativePath);
    
    if (this.options.dryRun) {
      console.log(`   [DRY-RUN] Écriture de ${relativePath}`);
      return;
    }

    try {
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');
      
      if (this.options.verbose) {
        console.log(`   📝 Fichier écrit: ${relativePath}`);
      }
    } catch (error) {
      console.error(`   ❌ Erreur écriture ${relativePath}: ${error.message}`);
      throw error;
    }
  }

  logStructure(structure) {
    console.log(`\n📊 Structure détectée:`);
    console.log(`   • Total matières: ${structure.matieres.size}`);
    console.log(`   • Total fichiers: ${structure.totalFiles}`);
    
    for (const [matiereName, matiere] of structure.matieres) {
      console.log(`   📚 ${matiereName}:`);
      for (const [niveauName, niveau] of matiere.niveaux) {
        const validCount = niveau.subjects.filter(s => s.valid).length;
        console.log(`      • ${niveauName}: ${niveau.subjects.length} sujets (${validCount} valides)`);
      }
    }
    
    if (structure.errors.length > 0) {
      console.log(`\n⚠️  Erreurs détectées:`);
      structure.errors.forEach(error => console.log(`   • ${error}`));
    }
  }

  // Utilitaires
  toCamelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// CLI Usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = {
    dryRun: process.argv.includes('--dry-run'),
    verbose: process.argv.includes('--verbose')
  };

  const generator = new AutoIndexGenerator(options);
  generator.generateAll().catch(console.error);
}
