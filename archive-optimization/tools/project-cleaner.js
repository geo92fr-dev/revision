// SCRIPT DE CLEANSING - Suppression des fichiers obsolètes
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class ProjectCleaner {
  constructor(options = {}) {
    this.options = {
      dryRun: options.dryRun || false,
      verbose: options.verbose || false,
      interactive: options.interactive || false
    };
    
    this.stats = {
      filesDeleted: 0,
      bytesFreed: 0,
      errorsCount: 0
    };
  }

  async clean() {
    console.log('🧹 PROJECT CLEANER - Nettoyage des fichiers obsolètes\n');
    
    if (this.options.dryRun) {
      console.log('🔍 MODE DRY-RUN - Aucun fichier ne sera supprimé\n');
    }

    try {
      await this.cleanObsoleteFiles();
      await this.cleanEmptyDirectories();
      await this.consolidateDocumentation();
      
      this.printSummary();
      return this.stats;
    } catch (error) {
      console.error('❌ Erreur lors du nettoyage:', error.message);
      throw error;
    }
  }

  async cleanObsoleteFiles() {
    console.log('🗑️ Suppression des fichiers obsolètes...');
    
    const obsoleteFiles = [
      // Fichiers de données legacy
      'src/coursData.js',
      'src/quizData.js',
      
      // Fichiers de test dispersés
      'src/test/data/test-complet.js',
      'src/test/data/test-exports-detailed.js',
      'src/test/data/test-exports.js',
      'src/test/data/test-final.js',
      'src/test/data/test-import.js',
      'src/test/data/test-index.js',
      'src/test/data/test-integration.js',
      'src/test/data/test-integrite.js',
      'src/test/data/test-loading.js',
      'src/test/data/test-moyenne.js',
      'src/test/data/test-simple.js',
      'src/test/data-structure-validation.test.js',
      
      // Scripts obsolètes
      'structure-proposee.js',
      'test-final.js',
      'test-structure.mjs',
      
      // Monitoring obsolète
      'src/monitoring/latest-test-report.json',
      'src/monitoring/test-runner.js'
    ];

    for (const file of obsoleteFiles) {
      await this.deleteFile(file);
    }
  }

  async cleanEmptyDirectories() {
    console.log('\n📁 Suppression des répertoires vides...');
    
    const potentialEmptyDirs = [
      'src/test/data',
      'tests',
      'data'
    ];

    for (const dir of potentialEmptyDirs) {
      await this.deleteEmptyDirectory(dir);
    }
  }

  async consolidateDocumentation() {
    console.log('\n📚 Consolidation de la documentation...');
    
    const docsToMove = [
      // Documentation à garder et organiser
      { from: 'PLAN-OPTIMISATION-ULTRA-RIGOUREUX.md', to: 'docs/architecture-plan.md' },
      { from: 'MIGRATION_ARCHITECTURE.md', to: 'docs/migration-guide.md' },
      { from: 'VALIDATION_GUIDE.md', to: 'docs/validation-guide.md' }
    ];

    // Créer le répertoire docs
    await this.ensureDirectory('docs');

    for (const doc of docsToMove) {
      await this.moveFile(doc.from, doc.to);
    }

    // Supprimer les documentations redondantes
    const obsoleteDocs = [
      'ARCHITECTURE_OPTIMIZATION.md',
      'OPTIMISATION.md', 
      'STRUCTURE_MODULAIRE.md',
      'STRUCTURE-ENRICHIE-REFERENCE.md',
      'CHANGELOG-STRUCTURE-ENRICHIE.md',
      'EXTENSION_COMPLETE.md',
      'GITHUB_SETUP.md',
      'PROJECT_SUMMARY.md',
      'SYSTEME_GENERIQUE.md',
      'TEST_SUITE.md',
      'VALIDATION_SUMMARY.md',
      'DONNEES_LOCALISATION.md'
    ];

    for (const doc of obsoleteDocs) {
      await this.deleteFile(doc);
    }
  }

  async deleteFile(filePath) {
    const fullPath = path.resolve(__dirname, filePath);
    
    try {
      const stats = await fs.stat(fullPath);
      
      if (this.options.dryRun) {
        console.log(`   [DRY-RUN] Suppression de ${filePath} (${this.formatBytes(stats.size)})`);
        this.stats.bytesFreed += stats.size;
        this.stats.filesDeleted++;
        return;
      }

      await fs.unlink(fullPath);
      console.log(`   ✅ Supprimé: ${filePath} (${this.formatBytes(stats.size)})`);
      this.stats.bytesFreed += stats.size;
      this.stats.filesDeleted++;
      
    } catch (error) {
      if (error.code === 'ENOENT') {
        if (this.options.verbose) {
          console.log(`   ⚠️  Fichier déjà absent: ${filePath}`);
        }
      } else {
        console.error(`   ❌ Erreur suppression ${filePath}: ${error.message}`);
        this.stats.errorsCount++;
      }
    }
  }

  async deleteEmptyDirectory(dirPath) {
    const fullPath = path.resolve(__dirname, dirPath);
    
    try {
      const entries = await fs.readdir(fullPath);
      
      if (entries.length === 0) {
        if (this.options.dryRun) {
          console.log(`   [DRY-RUN] Suppression répertoire vide: ${dirPath}`);
          return;
        }

        await fs.rmdir(fullPath);
        console.log(`   ✅ Répertoire vide supprimé: ${dirPath}`);
      } else {
        if (this.options.verbose) {
          console.log(`   ℹ️  Répertoire non vide conservé: ${dirPath} (${entries.length} éléments)`);
        }
      }
      
    } catch (error) {
      if (error.code === 'ENOENT') {
        if (this.options.verbose) {
          console.log(`   ⚠️  Répertoire déjà absent: ${dirPath}`);
        }
      } else {
        console.error(`   ❌ Erreur suppression répertoire ${dirPath}: ${error.message}`);
        this.stats.errorsCount++;
      }
    }
  }

  async ensureDirectory(dirPath) {
    const fullPath = path.resolve(__dirname, dirPath);
    
    try {
      await fs.mkdir(fullPath, { recursive: true });
      console.log(`   ✅ Répertoire créé: ${dirPath}`);
    } catch (error) {
      console.error(`   ❌ Erreur création répertoire ${dirPath}: ${error.message}`);
    }
  }

  async moveFile(fromPath, toPath) {
    const fullFromPath = path.resolve(__dirname, fromPath);
    const fullToPath = path.resolve(__dirname, toPath);
    
    try {
      await fs.stat(fullFromPath);
      
      if (this.options.dryRun) {
        console.log(`   [DRY-RUN] Déplacement: ${fromPath} → ${toPath}`);
        return;
      }

      // Créer le répertoire de destination si nécessaire
      await fs.mkdir(path.dirname(fullToPath), { recursive: true });
      
      // Déplacer le fichier
      await fs.rename(fullFromPath, fullToPath);
      console.log(`   ✅ Déplacé: ${fromPath} → ${toPath}`);
      
    } catch (error) {
      if (error.code === 'ENOENT') {
        if (this.options.verbose) {
          console.log(`   ⚠️  Fichier source absent: ${fromPath}`);
        }
      } else {
        console.error(`   ❌ Erreur déplacement ${fromPath}: ${error.message}`);
        this.stats.errorsCount++;
      }
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  printSummary() {
    console.log('\n📋 RÉSUMÉ DU NETTOYAGE');
    console.log('=' .repeat(40));
    console.log(`✅ Fichiers supprimés: ${this.stats.filesDeleted}`);
    console.log(`💾 Espace libéré: ${this.formatBytes(this.stats.bytesFreed)}`);
    console.log(`❌ Erreurs: ${this.stats.errorsCount}`);
    
    if (this.options.dryRun) {
      console.log('\n💡 Pour exécuter réellement: node cleaner.js');
    } else {
      console.log('\n🎉 Nettoyage terminé avec succès !');
    }
    console.log('=' .repeat(40));
  }
}

// CLI Usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = {
    dryRun: process.argv.includes('--dry-run'),
    verbose: process.argv.includes('--verbose'),
    interactive: process.argv.includes('--interactive')
  };

  const cleaner = new ProjectCleaner(options);
  cleaner.clean().catch(console.error);
}
