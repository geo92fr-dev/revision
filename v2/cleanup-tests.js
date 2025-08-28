#!/usr/bin/env node

/**
 * 🧹 SCRIPT DE NETTOYAGE - Suppression des fichiers redondants
 * ===========================================================
 * 
 * Ce script supprime tous les fichiers de test et correction redondants
 * pour ne garder que la suite de tests unifiée.
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 NETTOYAGE DES FICHIERS REDONDANTS');
console.log('====================================');

// Fichiers à supprimer (relatifs à v2/)
const filesToDelete = [
    // Anciens fichiers de correction
    'mega-fix-all-problems.js',
    'precision-fix.js', 
    'intelligent-fix.js',
    'final-const-fix.js',
    'massive-js-fixer.js',
    'ultimate-fix.js',
    'fix-math-files.js',
    'fix-math-advanced.js',
    'fix-exports.js',
    'fix-corrupted-files.js',
    'fix-compatibility.js',
    'fix-all-compatibility.js',
    
    // Anciens fichiers de test
    'test-compatibility.js',
    'js-validation-test.js',
    'js-loader-test.js',
    'diagnostic-quick.js',
    
    // Fichiers HTML de test
    'test-js-loading.html',
    'test-direct-js.html',
    'test-iframe.html'
];

// Répertoires à nettoyer
const directoriesToCheck = [
    'scripts',
    'build'
];

let deletedCount = 0;
let keptCount = 0;

function deleteFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`✅ Supprimé: ${path.basename(filePath)}`);
            deletedCount++;
            return true;
        } else {
            console.log(`ℹ️  Déjà absent: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Erreur lors de la suppression de ${filePath}: ${error.message}`);
        return false;
    }
}

function cleanDirectory(dirPath, recursive = false) {
    if (!fs.existsSync(dirPath)) {
        console.log(`ℹ️  Répertoire inexistant: ${dirPath}`);
        return;
    }

    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory() && recursive) {
            cleanDirectory(itemPath, true);
            
            // Supprimer le répertoire s'il est vide
            try {
                const remainingItems = fs.readdirSync(itemPath);
                if (remainingItems.length === 0) {
                    fs.rmdirSync(itemPath);
                    console.log(`✅ Répertoire vide supprimé: ${item}`);
                    deletedCount++;
                }
            } catch (error) {
                // Le répertoire n'est pas vide, on le garde
            }
        } else if (stat.isFile()) {
            // Vérifier si c'est un fichier de test ou correction redondant
            if (item.includes('test') || item.includes('fix') || item.includes('diagnostic')) {
                // Garder seulement test-suite.js et cours-test-suite.js
                if (item === 'test-suite.js' || item === 'cours-test-suite.js') {
                    console.log(`🔒 Gardé: ${item}`);
                    keptCount++;
                } else {
                    deleteFile(itemPath);
                }
            }
        }
    }
}

// Supprimer les fichiers spécifiques
console.log('\n📁 Suppression des fichiers spécifiques...');
for (const file of filesToDelete) {
    const filePath = path.join(__dirname, file);
    deleteFile(filePath);
}

// Nettoyer les répertoires
console.log('\n📂 Nettoyage des répertoires...');
for (const dir of directoriesToCheck) {
    const dirPath = path.join(__dirname, dir);
    console.log(`\n🔍 Nettoyage de ${dir}/`);
    cleanDirectory(dirPath, true);
}

// Nettoyer la racine v2/
console.log('\n🔍 Nettoyage de la racine v2/');
const rootItems = fs.readdirSync(__dirname);
for (const item of rootItems) {
    const itemPath = path.join(__dirname, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isFile()) {
        // Supprimer les fichiers de test/fix à la racine (sauf test-suite.js)
        if ((item.includes('test') || item.includes('fix') || item.includes('diagnostic')) && 
            item !== 'test-suite.js') {
            deleteFile(itemPath);
        }
    }
}

// Créer un répertoire pour les rapports de test
const reportsDir = path.join(__dirname, 'test-reports');
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
    console.log(`✅ Créé: test-reports/`);
}

// Résumé final
console.log('\n📊 RÉSUMÉ DU NETTOYAGE');
console.log('======================');
console.log(`🗑️  Fichiers supprimés: ${deletedCount}`);
console.log(`🔒 Fichiers gardés: ${keptCount}`);
console.log(`📁 Structure finale:`);
console.log(`   ├── test-suite.js (suite de tests unifiée)`);
console.log(`   ├── tests/cours-test-suite.js (tests spécifiques cours)`);
console.log(`   └── test-reports/ (rapports générés)`);

console.log('\n✨ Nettoyage terminé ! Utilisez "node test-suite.js" pour les tests.');

// Optionnel : créer un fichier README pour les tests
const readmePath = path.join(__dirname, 'TEST-README.md');
const readmeContent = `# Tests FunRevis V2

## Suite de tests unifiée

Utilisez \`node test-suite.js\` pour exécuter tous les tests.

### Types de tests inclus:
- ✅ Validation JavaScript (syntaxe, structure)
- ✅ Intégrité des données (structure, cohérence)  
- ✅ Compatibilité cours.html (URLs, paramètres)
- ✅ Tests de chargement direct (window.data)

### Rapports
Les rapports détaillés sont sauvegardés dans \`test-reports/\`

### Structure maintenue:
- \`test-suite.js\` - Suite principale unifiée
- \`tests/cours-test-suite.js\` - Tests spécifiques cours
- \`test-reports/\` - Rapports générés
`;

fs.writeFileSync(readmePath, readmeContent);
console.log(`📚 Créé: TEST-README.md`);
