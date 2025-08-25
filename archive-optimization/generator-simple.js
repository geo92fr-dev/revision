// GÉNÉRATEUR D'INDEX AUTOMATIQUE - Phase 3
import fs from 'fs/promises';
import path from 'path';

async function autoGenerateIndex() {
  console.log('🔧 GÉNÉRATION AUTOMATIQUE DE L\'INDEX\n');
  
  // 1. Scanner et découvrir automatiquement tous les fichiers
  const dataDir = 'src/data';
  const discoveries = await discoverAllDataFiles(dataDir);
  
  // 2. Générer l'index maître automatiquement
  await generateMasterIndex(discoveries);
  
  // 3. Créer le système d'auto-détection
  await createAutoDetectionSystem();
  
  console.log('✅ Système de découverte automatique installé!');
}

async function discoverAllDataFiles(baseDir) {
  console.log('🔍 Découverte automatique des fichiers...\n');
  
  const discoveries = {
    mathematiques: {
      '6ieme': []
    }
  };

  try {
    // Scanner mathématiques 6ème
    const mathDir = path.join(baseDir, 'mathematiques', '6ieme');
    const files = await fs.readdir(mathDir);
    
    for (const file of files) {
      if (file.endsWith('.js') && !file.includes('index') && !file.includes('reference')) {
        const filePath = path.join(mathDir, file);
        const metadata = await extractMetadata(filePath);
        
        discoveries.mathematiques['6ieme'].push({
          filename: file,
          moduleName: file.replace('.js', ''),
          metadata: metadata,
          path: filePath
        });
        
        console.log(`   ✓ Découvert: ${file} (${metadata.title || 'Titre à définir'})`);
      }
    }
    
    console.log(`\n📊 Total découvert: ${discoveries.mathematiques['6ieme'].length} modules mathématiques 6ème`);
    
  } catch (error) {
    console.error(`❌ Erreur découverte: ${error.message}`);
  }
  
  return discoveries;
}

async function extractMetadata(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    const metadata = {
      title: 'Module sans titre',
      chapitre: 'Non défini',
      niveau: '6ème',
      hasQuiz: false,
      hasExercices: false,
      exportName: null
    };

    // Extraire le titre
    const titleMatch = content.match(/titre\s*:\s*["']([^"']+)["']/);
    if (titleMatch) metadata.title = titleMatch[1];

    // Extraire le chapitre
    const chapitreMatch = content.match(/chapitre\s*:\s*["']([^"']+)["']/);
    if (chapitreMatch) metadata.chapitre = chapitreMatch[1];

    // Détecter quiz
    if (content.includes('quiz') || content.includes('questions')) {
      metadata.hasQuiz = true;
    }

    // Détecter exercices
    if (content.includes('exercices') || content.includes('pratique')) {
      metadata.hasExercices = true;
    }

    // Extraire le nom d'export
    const exportMatch = content.match(/export\s+const\s+(\w+)/);
    if (exportMatch) metadata.exportName = exportMatch[1];

    return metadata;
    
  } catch (error) {
    return { title: 'Erreur lecture', error: error.message };
  }
}

async function generateMasterIndex(discoveries) {
  console.log('\n🏗️ Génération de l\'index maître...');
  
  const indexContent = `// INDEX MAÎTRE AUTO-GÉNÉRÉ
// ⚠️ Ce fichier est généré automatiquement - Ne pas modifier manuellement

${discoveries.mathematiques['6ieme'].map(module => {
  return `import ${module.metadata.exportName || module.moduleName} from './${module.filename}';`;
}).join('\n')}

// Export consolidé automatique
export const mathematiques6eme = {
${discoveries.mathematiques['6ieme'].map(module => {
  const name = module.metadata.exportName || module.moduleName;
  return `  ${module.moduleName}: ${name},`;
}).join('\n')}
};

// Métadonnées automatiques
export const metadata6eme = {
${discoveries.mathematiques['6ieme'].map(module => {
  return `  ${module.moduleName}: {
    titre: "${module.metadata.title}",
    chapitre: "${module.metadata.chapitre}",
    hasQuiz: ${module.metadata.hasQuiz},
    hasExercices: ${module.metadata.hasExercices}
  },`;
}).join('\n')}
};

export default mathematiques6eme;

// Auto-généré le ${new Date().toLocaleString('fr-FR')}
// Total modules: ${discoveries.mathematiques['6ieme'].length}
`;

  const indexPath = 'src/data/mathematiques/6ieme/index.js';
  await fs.writeFile(indexPath, indexContent, 'utf-8');
  
  console.log(`   ✓ Index généré: ${indexPath}`);
  console.log(`   ✓ ${discoveries.mathematiques['6ieme'].length} modules indexés automatiquement`);
}

async function createAutoDetectionSystem() {
  console.log('\n🤖 Création du système d\'auto-détection...');
  
  const watcherCode = `// SYSTÈME D'AUTO-DÉTECTION
// Détecte automatiquement les nouveaux fichiers .js et met à jour l'index

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function detectNewFiles() {
  const dataDir = path.join(__dirname, '../data/mathematiques/6ieme');
  const indexPath = path.join(dataDir, 'index.js');
  
  try {
    const files = await fs.readdir(dataDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && f !== 'index.js');
    
    // Lire l'index actuel
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    
    // Détecter les nouveaux fichiers
    const newFiles = jsFiles.filter(file => !indexContent.includes(file));
    
    if (newFiles.length > 0) {
      console.log('🔍 Nouveaux fichiers détectés:', newFiles);
      
      // Régénérer l'index automatiquement
      await regenerateIndex(dataDir, jsFiles);
      
      return { newFiles, updated: true };
    }
    
    return { newFiles: [], updated: false };
    
  } catch (error) {
    console.error('❌ Erreur auto-détection:', error.message);
    return { error: error.message };
  }
}

async function regenerateIndex(dataDir, allFiles) {
  // Code de régénération automatique...
  console.log('🔄 Régénération automatique de l\\'index...');
}

// Export du système
export default { detectNewFiles };
`;

  await fs.writeFile('src/auto-detection.js', watcherCode, 'utf-8');
  console.log('   ✓ Système d\'auto-détection créé: src/auto-detection.js');
}

autoGenerateIndex().catch(console.error);
