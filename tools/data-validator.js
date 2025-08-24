// VALIDATEUR DE STRUCTURE DES DONNÉES
// Analyse la conformité des fichiers avec la structure de référence
import fs from 'fs/promises';
import path from 'path';

class DataStructureValidator {
  constructor() {
    this.results = {
      totalFiles: 0,
      validFiles: 0,
      incompleteFiles: [],
      invalidFiles: [],
      recommendations: []
    };
    
    this.referenceStructure = this.getExpectedStructure();
  }

  getExpectedStructure() {
    return {
      // Structure attendue selon reference.js
      topLevel: ['niveau', 'chapitre', 'sousChapitre', 'competences'],
      competence: {
        required: ['id', 'titre', 'objectif', 'cours'],
        optional: ['etapes', 'exercices', 'preEvaluation', 'evaluation', 'conseils']
      },
      coursStructure: {
        type: 'object', // Doit être un objet, pas une string
        phases: ['activation', 'apprentissage', 'pratique', 'metacognition']
      }
    };
  }

  async validateAll() {
    console.log('🔍 VALIDATION DE LA STRUCTURE DES DONNÉES\n');
    
    const dataFiles = await this.findDataFiles();
    
    for (const file of dataFiles) {
      await this.validateFile(file);
    }
    
    this.generateReport();
    return this.results;
  }

  async findDataFiles() {
    const dataRoot = 'src/data';
    const files = [];
    
    await this.scanDirectory(dataRoot, files);
    
    return files.filter(f => 
      f.endsWith('.js') && 
      !f.includes('index.js') && 
      !f.includes('reference.js') &&
      !f.includes('legacyConverter.js')
    );
  }

  async scanDirectory(dir, files) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('_')) {
          await this.scanDirectory(fullPath, files);
        } else if (entry.isFile()) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️  Impossible de lire ${dir}: ${error.message}`);
    }
  }

  async validateFile(filePath) {
    this.results.totalFiles++;
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const analysis = await this.analyzeContent(content);
      const relativePath = path.relative(process.cwd(), filePath);
      
      const validation = {
        file: relativePath,
        analysis,
        issues: [],
        completeness: 0,
        recommendation: 'unknown'
      };

      // Valider la structure
      this.validateTopLevelStructure(analysis, validation);
      this.validateCompetencesStructure(analysis, validation);
      this.validateCoursStructure(analysis, validation);
      
      // Calculer le score de complétude
      validation.completeness = this.calculateCompleteness(validation);
      
      // Déterminer la recommandation
      validation.recommendation = this.getRecommendation(validation);
      
      // Classer le fichier
      if (validation.completeness >= 80 && validation.issues.length === 0) {
        this.results.validFiles++;
      } else if (validation.completeness >= 40) {
        this.results.incompleteFiles.push(validation);
      } else {
        this.results.invalidFiles.push(validation);
      }
      
      // Logging
      const status = validation.completeness >= 80 ? '✅' : validation.completeness >= 40 ? '⚠️' : '❌';
      console.log(`${status} ${relativePath} (${validation.completeness}%)`);
      
      if (validation.issues.length > 0) {
        validation.issues.forEach(issue => {
          console.log(`    • ${issue}`);
        });
      }
      
    } catch (error) {
      console.error(`❌ Erreur analyse ${filePath}: ${error.message}`);
      this.results.invalidFiles.push({
        file: path.relative(process.cwd(), filePath),
        issues: [`Erreur de lecture: ${error.message}`],
        completeness: 0,
        recommendation: 'recreate'
      });
    }
  }

  async analyzeContent(content) {
    const analysis = {
      hasNiveau: false,
      hasChapitre: false,
      hasSousChapitre: false,
      hasCompetences: false,
      competencesCount: 0,
      coursType: 'unknown',
      hasPhases: false,
      exports: {
        hasConst: false,
        hasDefault: false,
        hasNamed: false
      }
    };

    // Analyser la structure générale
    analysis.hasNiveau = /niveau\s*:\s*["']/.test(content);
    analysis.hasChapitre = /chapitre\s*:\s*["']/.test(content);
    analysis.hasSousChapitre = /sousChapitre\s*:\s*["']/.test(content);
    analysis.hasCompetences = /competences\s*:\s*\[/.test(content);

    // Compter les compétences
    const competenceMatches = content.match(/{\s*id\s*:/g);
    analysis.competencesCount = competenceMatches ? competenceMatches.length : 0;

    // Analyser la structure cours
    if (/cours\s*:\s*{/.test(content)) {
      analysis.coursType = 'object';
      // Vérifier les phases
      const phases = ['activation', 'apprentissage', 'pratique', 'metacognition'];
      analysis.hasPhases = phases.every(phase => content.includes(phase));
    } else if (/cours\s*:\s*["']/.test(content)) {
      analysis.coursType = 'string';
    }

    // Analyser les exports
    analysis.exports.hasConst = /export\s+const\s+\w+/.test(content);
    analysis.exports.hasDefault = /export\s+default/.test(content);
    analysis.exports.hasNamed = /export\s*{/.test(content);

    return analysis;
  }

  validateTopLevelStructure(analysis, validation) {
    if (!analysis.hasNiveau) {
      validation.issues.push('Champ "niveau" manquant');
    }
    if (!analysis.hasChapitre) {
      validation.issues.push('Champ "chapitre" manquant');
    }
    if (!analysis.hasSousChapitre) {
      validation.issues.push('Champ "sousChapitre" manquant ou utilise ancien format');
    }
    if (!analysis.hasCompetences) {
      validation.issues.push('Tableau "competences" manquant');
    }
  }

  validateCompetencesStructure(analysis, validation) {
    if (analysis.competencesCount === 0) {
      validation.issues.push('Aucune compétence détectée');
    } else if (analysis.competencesCount < 3) {
      validation.issues.push(`Seulement ${analysis.competencesCount} compétence(s) - minimum recommandé: 3`);
    }
  }

  validateCoursStructure(analysis, validation) {
    if (analysis.coursType === 'string') {
      validation.issues.push('Structure "cours" simplifiée (string) - devrait être un objet avec phases');
    } else if (analysis.coursType === 'object' && !analysis.hasPhases) {
      validation.issues.push('Structure "cours" objet mais phases manquantes (activation, apprentissage, pratique, métacognition)');
    } else if (analysis.coursType === 'unknown') {
      validation.issues.push('Structure "cours" non détectée');
    }

    if (!analysis.exports.hasConst) {
      validation.issues.push('Export const principal manquant');
    }
    if (!analysis.exports.hasDefault) {
      validation.issues.push('Export default manquant');
    }
  }

  calculateCompleteness(validation) {
    let score = 0;
    const maxScore = 10;

    // Structure de base (4 points)
    if (!validation.issues.some(i => i.includes('niveau'))) score++;
    if (!validation.issues.some(i => i.includes('chapitre'))) score++;
    if (!validation.issues.some(i => i.includes('sousChapitre'))) score++;
    if (!validation.issues.some(i => i.includes('competences'))) score++;

    // Contenu (3 points)
    if (!validation.issues.some(i => i.includes('compétence détectée'))) score++;
    if (!validation.issues.some(i => i.includes('Seulement'))) score += 2;

    // Structure avancée (2 points)
    if (!validation.issues.some(i => i.includes('cours'))) score += 2;

    // Exports (1 point)
    if (!validation.issues.some(i => i.includes('Export'))) score++;

    return Math.round((score / maxScore) * 100);
  }

  getRecommendation(validation) {
    if (validation.completeness >= 80) {
      return 'valid';
    } else if (validation.completeness >= 60) {
      return 'minor_fixes';
    } else if (validation.completeness >= 40) {
      return 'major_upgrade';
    } else {
      return 'recreate';
    }
  }

  generateReport() {
    console.log('\n📋 RAPPORT DE VALIDATION');
    console.log('=' .repeat(50));
    
    console.log(`📊 STATISTIQUES:`);
    console.log(`   • Total fichiers: ${this.results.totalFiles}`);
    console.log(`   • Fichiers valides: ${this.results.validFiles}`);
    console.log(`   • Fichiers incomplets: ${this.results.incompleteFiles.length}`);
    console.log(`   • Fichiers invalides: ${this.results.invalidFiles.length}`);
    
    const validPercent = Math.round((this.results.validFiles / this.results.totalFiles) * 100);
    console.log(`   • Taux de conformité: ${validPercent}%`);

    // Recommandations par action
    const recommendations = {
      valid: 0,
      minor_fixes: 0,
      major_upgrade: 0,
      recreate: 0
    };

    [...this.results.incompleteFiles, ...this.results.invalidFiles].forEach(file => {
      recommendations[file.recommendation]++;
    });

    console.log(`\n💡 ACTIONS RECOMMANDÉES:`);
    console.log(`   • Garder en l'état: ${this.results.validFiles + recommendations.valid}`);
    console.log(`   • Corrections mineures: ${recommendations.minor_fixes}`);
    console.log(`   • Mise à niveau majeure: ${recommendations.major_upgrade}`);
    console.log(`   • Recréer complètement: ${recommendations.recreate}`);

    // Fichiers à recréer en priorité
    const toRecreate = [...this.results.incompleteFiles, ...this.results.invalidFiles]
      .filter(f => f.recommendation === 'recreate')
      .slice(0, 5);

    if (toRecreate.length > 0) {
      console.log(`\n🚨 FICHIERS PRIORITAIRES À RECRÉER:`);
      toRecreate.forEach(file => {
        console.log(`   • ${file.file} (${file.completeness}%)`);
      });
    }

    console.log('\n🎯 PROCHAINE ÉTAPE: Utiliser le standardizer pour mettre à niveau automatiquement');
    console.log('=' .repeat(50));
  }
}

// CLI Usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new DataStructureValidator();
  validator.validateAll().catch(console.error);
}
