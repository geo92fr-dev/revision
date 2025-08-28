#!/usr/bin/env node

/**
 * 🧹 SCRIPT DE NETTOYAGE - Suppression fichiers redondants
 * ========================================================
 * 
 * Supprime tous les anciens fichiers de tests et outils
 * Garde uniquement la suite de tests unifiée
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 NETTOYAGE DES FICHIERS REDONDANTS');
console.log('====================================');

class Cleaner {
    constructor() {
        this.baseDir = __dirname;
        this.toDelete = [];
        this.toKeep = [
            'test-suite-unified.js',
            'package.json',
            'README.md',
            'TESTS.md',
            'src/',
            'build/',
            'dist/',
            '.git'
        ];
    }

    // 🔍 Identifier les fichiers à supprimer
    identifyFilesToDelete() {
        // Fichiers de tests redondants
        const testFiles = [
            'test-suite.js',
            'js-validation-test.js',
            'test-compatibility.js',
            'diagnostic-quick.js',
            'mega-fix-all-problems.js',
            'precision-fix.js',
            'intelligent-fix.js',
            'final-const-fix.js',
            'massive-js-fixer.js',
            'debug-file.js',
            'final-compatibility-check.js',
            'ultimate-fix.js',
            'test-direct-js.html',
            'test-js-loading.html',
            'js-validation-report.json'
        ];

        // Ajouter les fichiers de tests redondants du dossier tests/
        const testsDir = path.join(this.baseDir, 'tests');
        if (fs.existsSync(testsDir)) {
            const testDirFiles = fs.readdirSync(testsDir);
            testDirFiles.forEach(file => {
                this.toDelete.push(path.join(testsDir, file));
            });
            this.toDelete.push(testsDir);
        }

        // Ajouter les fichiers de la racine v2
        testFiles.forEach(file => {
            const filePath = path.join(this.baseDir, file);
            if (fs.existsSync(filePath)) {
                this.toDelete.push(filePath);
            }
        });

        console.log(`🔍 ${this.toDelete.length} fichiers identifiés pour suppression`);
    }

    // 🗑️ Supprimer les fichiers
    deleteFiles() {
        let deleted = 0;
        let skipped = 0;

        for (const filePath of this.toDelete) {
            try {
                const relativePath = path.relative(this.baseDir, filePath);
                
                if (fs.existsSync(filePath)) {
                    const stat = fs.statSync(filePath);
                    
                    if (stat.isDirectory()) {
                        fs.rmSync(filePath, { recursive: true, force: true });
                        console.log(`🗂️  Dossier supprimé: ${relativePath}`);
                    } else {
                        fs.unlinkSync(filePath);
                        console.log(`📄 Fichier supprimé: ${relativePath}`);
                    }
                    deleted++;
                } else {
                    skipped++;
                }
            } catch (error) {
                console.log(`❌ Erreur suppression ${filePath}: ${error.message}`);
            }
        }

        console.log(`\n✅ ${deleted} éléments supprimés, ${skipped} non trouvés`);
    }

    // 📝 Créer un fichier README des tests
    createTestReadme() {
        const content = `# Tests FunRevis V2

## 🧪 Suite de Tests Unifiée

Utilisez uniquement \`test-suite-unified.js\` pour tous les tests.

### Commandes

\`\`\`bash
# Exécuter tous les tests
node test-suite-unified.js

# Avec serveur local (requis pour tests d'intégration)
cd src && python -m http.server 8080 &
node test-suite-unified.js
\`\`\`

### Types de Tests

1. **Validation JavaScript** - Syntaxe et structure
2. **Structure des données** - Format et cohérence
3. **Intégration cours.html** - Compatibilité web
4. **Tests de chargement** - Simulation browser

### Rapports

- \`test-report.json\` - Rapport détaillé JSON
- Console - Résultats en temps réel

## 🧹 Nettoyage Effectué

Fichiers supprimés lors de la rationalisation :
- Anciens scripts de test redondants
- Outils de correction obsolètes
- Fichiers de diagnostic temporaires
- Dossier tests/ avec anciens tests

## 📁 Structure Actuelle

\`\`\`
v2/
├── test-suite-unified.js     # 🧪 Suite de tests principale
├── src/                      # 📂 Code source
├── package.json             # 📦 Configuration
└── README.md               # 📖 Documentation
\`\`\`
`;

        fs.writeFileSync(path.join(this.baseDir, 'TESTS-UNIFIED.md'), content);
        console.log('📖 Documentation créée: TESTS-UNIFIED.md');
    }

    // 🚀 Exécution du nettoyage
    run() {
        console.log('Phase 1: Identification des fichiers...');
        this.identifyFilesToDelete();
        
        console.log('\nPhase 2: Suppression...');
        this.deleteFiles();
        
        console.log('\nPhase 3: Documentation...');
        this.createTestReadme();
        
        console.log('\n🎉 NETTOYAGE TERMINÉ !');
        console.log('✅ Environnement de test rationalisé');
        console.log('📖 Voir TESTS-UNIFIED.md pour les instructions');
    }
}

// 🚀 Exécution
if (require.main === module) {
    const cleaner = new Cleaner();
    cleaner.run();
}
