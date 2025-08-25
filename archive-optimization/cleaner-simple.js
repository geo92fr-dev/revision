// CLEANER SIMPLIFIÉ - Compatible ES6
import fs from 'fs/promises';
import path from 'path';

async function cleanProject() {
  console.log('🧹 NETTOYAGE AUTOMATIQUE EN COURS...\n');
  
  // Fichiers obsolètes à supprimer
  const obsoleteFiles = [
    'src/coursData.js',
    'src/quizData.js',
    'structure-proposee.js',
    'test-final.js',
    'test-structure.mjs'
  ];

  let deletedCount = 0;
  let bytesFreed = 0;

  for (const file of obsoleteFiles) {
    try {
      const stats = await fs.stat(file);
      await fs.unlink(file);
      console.log(`✅ Supprimé: ${file} (${Math.round(stats.size/1024)}KB)`);
      deletedCount++;
      bytesFreed += stats.size;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.log(`⚠️  ${file}: ${error.message}`);
      }
    }
  }

  // Créer répertoire docs et déplacer documentation importante
  try {
    await fs.mkdir('docs', { recursive: true });
    console.log('✅ Répertoire docs/ créé');
  } catch (error) {
    // Déjà existe
  }

  // Déplacer documents importants
  const docsToMove = [
    { from: 'PLAN-OPTIMISATION-ULTRA-RIGOUREUX.md', to: 'docs/architecture-plan.md' },
    { from: 'RESUME-EXECUTIF.md', to: 'docs/executive-summary.md' }
  ];

  for (const doc of docsToMove) {
    try {
      await fs.rename(doc.from, doc.to);
      console.log(`✅ Déplacé: ${doc.from} → ${doc.to}`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.log(`⚠️  ${doc.from}: ${error.message}`);
      }
    }
  }

  console.log(`\n📊 NETTOYAGE TERMINÉ:`);
  console.log(`   • Fichiers supprimés: ${deletedCount}`);
  console.log(`   • Espace libéré: ${Math.round(bytesFreed/1024)}KB`);
  console.log(`   • Documentation organisée dans docs/`);
}

cleanProject().catch(console.error);
