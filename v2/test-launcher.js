#!/usr/bin/env node

/**
 * 🚀 LAUNCHER UNIFIÉ TESTS FUNREVIS V2
 * 
 * Permet de lancer les deux types de tests depuis un point d'entrée unique :
 * 1. Tests automatisés (test-reports/)
 * 2. Tests de développement (src/)
 * 
 * Usage:
 *   node test-launcher.js              - Menu interactif
 *   node test-launcher.js auto         - Tests automatisés seulement
 *   node test-launcher.js dev          - Guide tests développement  
 *   node test-launcher.js all          - Tous les tests
 *   node test-launcher.js help         - Aide
 */

const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

class TestLauncher {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async run() {
        console.log('='.repeat(80));
        console.log('                LAUNCHER UNIFIÉ TESTS FUNREVIS V2');
        console.log('='.repeat(80));

        const args = process.argv.slice(2);
        const mode = args[0];

        if (!mode) {
            await this.showMenu();
        } else {
            switch (mode.toLowerCase()) {
                case 'auto':
                    await this.runAutomatedTests();
                    break;
                case 'dev':
                    await this.showDevTests();
                    break;
                case 'all':
                    await this.runAllTests();
                    break;
                case 'help':
                    this.showHelp();
                    break;
                default:
                    console.log(`❌ Mode invalide: ${mode}`);
                    this.showHelp();
            }
        }

        this.rl.close();
    }

    async showMenu() {
        console.log('\n🎯 TYPES DE TESTS DISPONIBLES:\n');
        
        console.log('   1. 🤖 Tests Automatisés (test-reports/)');
        console.log('      - Validation système, CI/CD, rapports');
        console.log('      - 12 tests: Structure, Syntaxe, Données, Architecture, Performance, Intégration\n');
        
        console.log('   2. 🛠️  Tests de Développement (src/)');
        console.log('      - Debug, développement, tests visuels');
        console.log('      - 10 fichiers: debug, fractions, loading, cours, etc.\n');
        
        console.log('   3. 🚀 Tous les Tests');
        console.log('      - Automatisés + Guide développement\n');
        
        console.log('   4. ❓ Aide\n');

        const choice = await this.askQuestion('Votre choix (1-4): ');
        
        switch (choice) {
            case '1':
                await this.runAutomatedTests();
                break;
            case '2':
                await this.showDevTests();
                break;
            case '3':
                await this.runAllTests();
                break;
            case '4':
                this.showHelp();
                break;
            default:
                console.log('❌ Choix invalide');
                await this.showMenu();
        }
    }

    async runAutomatedTests() {
        console.log('\n🤖 LANCEMENT DES TESTS AUTOMATISÉS');
        console.log('='.repeat(80));
        console.log('📂 Répertoire: test-reports/');
        console.log('🚀 Commande: node run-tests-quick.js all\n');

        return new Promise((resolve) => {
            const testProcess = spawn('node', ['run-tests-quick.js', 'all'], {
                cwd: path.join(__dirname, 'test-reports'),
                stdio: 'inherit'
            });

            testProcess.on('close', (code) => {
                console.log(`\n📊 Tests automatisés terminés (Code: ${code})`);
                resolve(code);
            });

            testProcess.on('error', (error) => {
                console.error('❌ Erreur lors de l\'exécution des tests:', error.message);
                resolve(1);
            });
        });
    }

    async showDevTests() {
        console.log('\n🛠️ TESTS DE DÉVELOPPEMENT DISPONIBLES');
        console.log('='.repeat(80));
        console.log('📂 Répertoire: src/');
        console.log('🌐 Serveur local requis: http://localhost:8080\n');

        console.log('📋 FICHIERS DE TESTS DISPONIBLES:\n');

        const testCategories = [
            {
                title: '🐛 DEBUG:',
                tests: [
                    'test-debug.html           - Debug général du système',
                    'test-debug-forcé.html     - Debug avec chargement forcé'
                ]
            },
            {
                title: '⚙️ FONCTIONNELS:',
                tests: [
                    'test-fractions.html       - Test module fractions',
                    'test-loading.html         - Test chargement données',
                    'test-js-loading.html      - Test chargement JavaScript',
                    'test-direct-js.html       - Test direct modules JS'
                ]
            },
            {
                title: '📚 INTERFACE:',
                tests: [
                    'test-cours-simple.html    - Interface cours simplifiée'
                ]
            },
            {
                title: '📍 SPÉCIALISÉS:',
                tests: [
                    'pages/mathematiques/6ieme/test-simple.html      - Test niveau 6ème',
                    'pages/mathematiques/6ieme/test-diagnostique.html - Test diagnostique'
                ]
            }
        ];

        testCategories.forEach(category => {
            console.log(`   ${category.title}`);
            category.tests.forEach(test => {
                console.log(`      • ${test}`);
            });
            console.log('');
        });

        console.log('🚀 COMMENT UTILISER:');
        console.log('   1. Démarrer serveur: python -m http.server 8080 (dans src/)');
        console.log('   2. Ouvrir: http://localhost:8080/[nom-du-test].html');
        console.log('   3. Tester visuellement dans le navigateur\n');

        const startServer = await this.askQuestion('💡 Démarrer automatiquement le serveur local? (y/n): ');
        
        if (startServer.toLowerCase() === 'y') {
            console.log('\n🚀 Démarrage du serveur sur http://localhost:8080');
            console.log('📂 Racine: src/');
            console.log('🔗 Exemple: http://localhost:8080/test-debug.html');
            console.log('\n⚠️  Appuyez sur Ctrl+C pour arrêter le serveur\n');

            const serverProcess = spawn('python', ['-m', 'http.server', '8080'], {
                cwd: path.join(__dirname, 'src'),
                stdio: 'inherit'
            });

            // Ouvrir le navigateur après un délai
            setTimeout(() => {
                const open = process.platform === 'win32' ? 'start' : 
                             process.platform === 'darwin' ? 'open' : 'xdg-open';
                exec(`${open} http://localhost:8080/test-debug.html`);
            }, 2000);

        } else {
            console.log('\n📖 Consultez src/TESTS-README.md pour plus de détails');
        }
    }

    async runAllTests() {
        console.log('\n🚀 LANCEMENT DE TOUS LES TESTS');
        console.log('='.repeat(80));
        
        await this.runAutomatedTests();
        
        console.log('\n⏸️  Appuyez sur Entrée pour continuer vers les tests de développement...');
        await this.askQuestion('');
        
        await this.showDevTests();
    }

    showHelp() {
        console.log('\n❓ AIDE - LAUNCHER TESTS FUNREVIS V2');
        console.log('='.repeat(80));
        console.log('\n📖 USAGE:');
        console.log('   node test-launcher.js             - Menu interactif');
        console.log('   node test-launcher.js auto        - Tests automatisés uniquement');
        console.log('   node test-launcher.js dev         - Guide tests développement');
        console.log('   node test-launcher.js all         - Tous les tests');
        console.log('   node test-launcher.js help        - Cette aide\n');

        console.log('🤖 TESTS AUTOMATISÉS (test-reports/):');
        console.log('   • Validation système automatique');
        console.log('   • 6 catégories: Structure, Syntaxe, Données, Architecture, Performance, Intégration');
        console.log('   • Rapports JSON automatiques');
        console.log('   • Utilisés pour CI/CD et validation qualité\n');

        console.log('🛠️ TESTS DE DÉVELOPPEMENT (src/):');
        console.log('   • Tests manuels dans le navigateur');
        console.log('   • Debug interactif et tests visuels');
        console.log('   • 10 fichiers pour différents besoins de développement');
        console.log('   • Utilisés pendant le développement\n');

        console.log('📚 DOCUMENTATION:');
        console.log('   • src/TESTS-README.md - Guide complet');
        console.log('   • test-reports/README.md - Tests automatisés\n');
    }

    askQuestion(question) {
        return new Promise((resolve) => {
            this.rl.question(question, resolve);
        });
    }
}

// Point d'entrée
if (require.main === module) {
    const launcher = new TestLauncher();
    launcher.run().then(() => {
        console.log('\n✅ LAUNCHER TERMINÉ');
        console.log('📚 Documentation: src/TESTS-README.md et test-reports/README.md\n');
        process.exit(0);
    }).catch(error => {
        console.error('💥 Erreur fatale:', error);
        process.exit(1);
    });
}

module.exports = { TestLauncher };
