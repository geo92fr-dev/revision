// NETTOYEUR FINAL - Garder uniquement les fichiers indispensables
import fs from 'fs/promises';
import path from 'path';

async function cleanProjectToEssentials() {
  console.log('🧹 NETTOYAGE FINAL - FICHIERS INDISPENSABLES UNIQUEMENT\n');
  
  const results = {
    moved: 0,
    kept: 0,
    errors: []
  };

  // Créer le dossier archive
  const archiveDir = 'archive-optimization';
  await fs.mkdir(archiveDir, { recursive: true });
  
  // Définir les fichiers INDISPENSABLES à garder
  const essentialFiles = [
    // Structure de base
    'firebase.json',
    'README.md',
    'PROJECT_SUMMARY.md',
    
    // Application principale
    'src/index.html',
    'src/css/',
    'src/js/',
    'src/pages/',
    
    // Données éducatives (indispensables)
    'src/data/mathematiques/6ieme/',
    
    // Configuration Git
    '.git/',
    '.gitignore'
  ];

  // Fichiers/dossiers à archiver (outils d'optimisation)
  const toArchive = [
    // Outils d'optimisation (plus nécessaires)
    'cleaner-simple.js',
    'validator-simple.js', 
    'validator-final.js',
    'generator-simple.js',
    'standardizer-simple.js',
    'reparateur-auto.js',
    'correcteur-final.js',
    'test-auto-extensibilite.js',
    'test-final-system.js',
    'standardizer.js',
    'audit-project.js',
    
    // Documentation d'optimisation (archiver)
    'docs/',
    
    // Backups
    'src/data/mathematiques/6ieme/*.backup',
    'src/data/mathematiques/6ieme/*.repair-backup',
    'src/data/mathematiques/6ieme/*.final-backup',
    
    // Autres fichiers temporaires
    'eslint.config.js',
    '.venv/',
    'tools/'
  ];

  console.log('📋 FICHIERS À CONSERVER (indispensables) :');
  essentialFiles.forEach(file => {
    console.log(`   ✅ ${file}`);
  });

  console.log('\n📦 FICHIERS À ARCHIVER (outils d\'optimisation terminés) :');
  
  // Archiver les fichiers non indispensables
  for (const item of toArchive) {
    try {
      const exists = await checkExists(item);
      if (exists) {
        await moveToArchive(item, archiveDir);
        results.moved++;
        console.log(`   📦 ${item} → archive/`);
      }
    } catch (error) {
      results.errors.push({ item, error: error.message });
      console.log(`   ❌ Erreur avec ${item}: ${error.message}`);
    }
  }

  // Nettoyer les fichiers backup dans le répertoire src/data
  console.log('\n🧹 Nettoyage des fichiers backup...');
  await cleanBackupFiles();

  console.log('\n📊 RÉSULTATS NETTOYAGE :');
  console.log(`   📦 Fichiers archivés : ${results.moved}`);
  console.log(`   ✅ Fichiers conservés : ${essentialFiles.length}`);
  console.log(`   ❌ Erreurs : ${results.errors.length}`);
  
  console.log('\n🎯 PROJET NETTOYÉ - FICHIERS INDISPENSABLES UNIQUEMENT');
  console.log('📁 Structure finale :');
  await showFinalStructure();
  
  return results;
}

async function checkExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function moveToArchive(source, archiveDir) {
  const stats = await fs.lstat(source);
  const destination = path.join(archiveDir, path.basename(source));
  
  if (stats.isDirectory()) {
    // Copier récursivement le dossier
    await copyDirectory(source, destination);
    await fs.rm(source, { recursive: true, force: true });
  } else {
    // Déplacer le fichier
    await fs.copyFile(source, destination);
    await fs.unlink(source);
  }
}

async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function cleanBackupFiles() {
  const mathDir = 'src/data/mathematiques/6ieme';
  
  try {
    const files = await fs.readdir(mathDir);
    const backupFiles = files.filter(f => 
      f.endsWith('.backup') || 
      f.endsWith('.repair-backup') || 
      f.endsWith('.final-backup')
    );
    
    for (const backupFile of backupFiles) {
      const filePath = path.join(mathDir, backupFile);
      await fs.unlink(filePath);
      console.log(`   🗑️ Supprimé : ${backupFile}`);
    }
    
    console.log(`   ✅ ${backupFiles.length} fichiers backup supprimés`);
    
  } catch (error) {
    console.log(`   ❌ Erreur nettoyage backup : ${error.message}`);
  }
}

async function showFinalStructure() {
  console.log(`
📦 FunRevis - Version Production (Nettoyée)
├── 📄 firebase.json              # Config Firebase
├── 📄 README.md                  # Documentation principale  
├── 📄 PROJECT_SUMMARY.md         # Résumé du projet
├── 📁 src/                       # Application
│   ├── 📄 index.html            # Page d'accueil
│   ├── 📁 css/                   # Styles
│   ├── 📁 js/                    # Scripts
│   ├── 📁 pages/                 # Pages HTML
│   └── 📁 data/mathematiques/6ieme/  # 20 modules éducatifs
│       ├── 📄 index.js          # Index auto-généré
│       ├── 📄 addition-soustraction.js
│       ├── 📄 algebre.js
│       └── 📄 ... (18 autres modules)
└── 📁 archive-optimization/      # Outils d'optimisation archivés
    ├── 📁 docs/                 # Documentation complète
    ├── 📁 tools/                # Outils développés
    └── 📄 *.js                  # Scripts d'optimisation
`);
}

cleanProjectToEssentials().catch(console.error);
