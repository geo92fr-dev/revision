#!/usr/bin/env node

/**
 * Script de lancement rapide pour les tests FunRevis V2
 * Usage: node run-tests-quick.js [categorie]
 * 
 * Categories disponibles:
 * - structure: Tests de structure des fichiers
 * - syntax: Tests de syntaxe JavaScript/HTML  
 * - data: Tests de validation des données
 * - architecture: Tests d'architecture modulaire
 * - performance: Tests de performance
 * - integration: Tests d'intégration
 * - all: Tous les tests (défaut)
 */

const { TestRunner } = require('./run-tests.js');
const path = require('path');

// Configuration simple
const args = process.argv.slice(2);
const category = args[0] || 'all';

console.log('==========================================');
console.log('    TESTS FUNREVIS V2 - LANCEMENT RAPIDE');
console.log('==========================================\n');

if (category !== 'all') {
    console.log(`Execution de la categorie: ${category.toUpperCase()}\n`);
} else {
    console.log('Execution de TOUS les tests\n');
}

const runner = new TestRunner();

// Fonction d'aide
function showHelp() {
    console.log('Usage: node run-tests-quick.js [categorie]\n');
    console.log('Categories disponibles:');
    console.log('  structure    - Tests de structure des fichiers');
    console.log('  syntax       - Tests de syntaxe JavaScript/HTML');
    console.log('  data         - Tests de validation des donnees');
    console.log('  architecture - Tests d\'architecture modulaire');
    console.log('  performance  - Tests de performance');
    console.log('  integration  - Tests d\'integration');
    console.log('  all          - Tous les tests (defaut)\n');
    console.log('  help         - Affiche cette aide\n');
    console.log('Exemples:');
    console.log('  node run-tests-quick.js structure');
    console.log('  node run-tests-quick.js');
}

// Exécution
if (category === 'help' || category === '--help' || category === '-h') {
    showHelp();
    process.exit(0);
}

async function runQuickTests() {
    try {
        if (category === 'all') {
            await runner.runAllTests();
        } else {
            // Test d'une seule catégorie
            console.log(`Execution des tests: ${category}`);
            const results = await runner.runCategoryTests(category);
            
            console.log('\n' + '='.repeat(40));
            console.log('RESULTAT:');
            console.log(`Total: ${results.total}`);
            console.log(`Reussis: ${results.passed}`);
            console.log(`Echecs: ${results.failed}`);
            console.log(`Avertissements: ${results.warnings}`);
            
            if (results.failed > 0) {
                console.log('\nECHECS DETECTES:');
                results.details.filter(d => d.status === 'failed').forEach(detail => {
                    console.log(`  - ${detail.name}: ${detail.message}`);
                });
                process.exit(1);
            }
        }
    } catch (error) {
        console.error('ERREUR:', error.message);
        process.exit(1);
    }
}

runQuickTests();
