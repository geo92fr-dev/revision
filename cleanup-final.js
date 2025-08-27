// NETTOYAGE FINAL COMPLÉMENTAIRE
import fs from 'fs/promises';

async function finalCleanup() {
  console.log('🧹 NETTOYAGE COMPLÉMENTAIRE FINAL\n');
  
  const filesToArchive = [
    // Fichiers de documentation d'optimisation
    'ARCHITECTURE_OPTIMIZATION.md',
    'CHANGELOG-STRUCTURE-ENRICHIE.md', 
    'DONNEES_LOCALISATION.md',
    'EXTENSION_COMPLETE.md',
    'MIGRATION_ARCHITECTURE.md',
    'OPTIMISATION.md',
    'RAPPORT-FINAL-OPTIMISATION.md',
    'RAPPORT-SAUVEGARDE.md',
    'STRUCTURE-ENRICHIE-REFERENCE.md',
    'STRUCTURE_MODULAIRE.md',
    'SYSTEME_GENERIQUE.md',
    'VALIDATION_GUIDE.md',
    'VALIDATION_SUMMARY.md',
    'TEST_SUITE.md',
    'GITHUB_SETUP.md',
    
    // Scripts de validation
    'check-status.js',
    'validate-all-urls.js',
    'validate-deployment.js',
    'test-structure-enrichie.html',
    
    // Données et fichiers temporaires
    'audit-results.json',
    'data/',
    'scripts/',
    'tests/',
    'public/',
    'dist/',
    
    // Configuration de développement
    'vite.config.js',
    'package.json',
    'package-lock.json',
    'node_modules/',
    
    // Autres
    'index.html', // Dupliqué avec src/index.html
    '.firebase/',
    '.github/'
  ];
  
  let moved = 0;
  
  for (const file of filesToArchive) {
    try {
      const exists = await checkExists(file);
      if (exists) {
        await moveToArchive(file);
        moved++;
        console.log(`   📦 ${file} → archive/`);
      }
    } catch (error) {
      console.log(`   ⚠️ ${file}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ ${moved} fichiers supplémentaires archivés`);
  console.log('\n🎯 PROJET ULTRA-PROPRE - FICHIERS INDISPENSABLES UNIQUEMENT');
  
  // Supprimer ce script après exécution
  setTimeout(async () => {
    try {
      await fs.unlink('cleanup-final.js');
      console.log('   🗑️ Script de nettoyage auto-supprimé');
    } catch (e) {
      // Ignore
    }
  }, 1000);
}

async function checkExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function moveToArchive(source) {
  const destination = `archive-optimization/${source}`;
  
  try {
    const stats = await fs.lstat(source);
    if (stats.isDirectory()) {
      await moveDirectory(source, destination);
    } else {
      await fs.copyFile(source, destination);
      await fs.unlink(source);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function moveDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = `${src}/${entry.name}`;
    const destPath = `${dest}/${entry.name}`;
    
    if (entry.isDirectory()) {
      await moveDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
  
  await fs.rm(src, { recursive: true, force: true });
}

finalCleanup().catch(console.error);
