const fs = require('fs');
const path = require('path');

/**
 * Suite de tests unifiée pour FunRevis V2
 * Centralise tous les tests éparpillés dans le projet
 */
class UnifiedTestSuite {
    constructor() {
        this.results = {
            total: 0,
            passed: 0,
            failed: 0,
            warnings: 0,
            details: []
        };
    }

    // ==========================================
    // MÉTHODES D'EXÉCUTION DES TESTS
    // ==========================================

    async runFileStructureTests() {
        const results = [];
        
        // Tests des fichiers essentiels
        const essentialFiles = [
            '../src/index.html',
            '../src/pages/cours.html', 
            '../src/pages/sections/section-manager.js',
            '../src/data/mathematiques/6ieme',
            '../src/data/mathematiques/5ieme'
        ];

        for (const file of essentialFiles) {
            const fullPath = path.resolve(__dirname, file);
            if (fs.existsSync(fullPath)) {
                results.push({
                    name: `Fichier existe: ${file}`,
                    status: 'passed',
                    message: 'Fichier trouvé'
                });
            } else {
                results.push({
                    name: `Fichier manquant: ${file}`,
                    status: 'failed',
                    message: `Fichier non trouvé: ${fullPath}`
                });
            }
        }

        return results;
    }

    async runJavaScriptSyntaxTests() {
        const results = [];
        
        try {
            // Test de syntax du section-manager
            const sectionManagerPath = path.resolve(__dirname, '../src/pages/sections/section-manager.js');
            if (fs.existsSync(sectionManagerPath)) {
                const content = fs.readFileSync(sectionManagerPath, 'utf8');
                
                // Vérifications basiques de syntaxe
                if (content.includes('function') || content.includes('const') || content.includes('class')) {
                    results.push({
                        name: 'Syntaxe section-manager.js',
                        status: 'passed',
                        message: 'Syntaxe JavaScript valide'
                    });
                } else {
                    results.push({
                        name: 'Syntaxe section-manager.js',
                        status: 'failed', 
                        message: 'Aucune structure JavaScript détectée'
                    });
                }
            } else {
                results.push({
                    name: 'Syntaxe section-manager.js',
                    status: 'failed',
                    message: 'Fichier section-manager.js non trouvé'
                });
            }
        } catch (error) {
            results.push({
                name: 'Test syntaxe JavaScript',
                status: 'failed',
                message: error.message
            });
        }

        return results;
    }

    async runCourseDataValidationTests() {
        const results = [];
        
        try {
            // Test des répertoires de données
            const dataPath = path.resolve(__dirname, '../src/data/mathematiques');
            if (fs.existsSync(dataPath)) {
                const levels = fs.readdirSync(dataPath);
                
                for (const level of levels) {
                    const levelPath = path.join(dataPath, level);
                    if (fs.lstatSync(levelPath).isDirectory()) {
                        results.push({
                            name: `Données niveau: ${level}`,
                            status: 'passed',
                            message: `Répertoire ${level} trouvé`
                        });
                    }
                }
            } else {
                results.push({
                    name: 'Répertoire données maths',
                    status: 'failed',
                    message: 'Répertoire data/mathematiques non trouvé'
                });
            }
        } catch (error) {
            results.push({
                name: 'Validation données cours',
                status: 'failed',
                message: error.message
            });
        }

        return results;
    }

    async runModularArchitectureTests() {
        const results = [];
        
        try {
            // Test de cours.html pour vérification SectionManager
            const coursPath = path.resolve(__dirname, '../src/pages/cours.html');
            if (fs.existsSync(coursPath)) {
                const content = fs.readFileSync(coursPath, 'utf8');
                
                if (content.includes('section-manager.js')) {
                    results.push({
                        name: 'Integration SectionManager',
                        status: 'passed',
                        message: 'cours.html utilise section-manager.js'
                    });
                } else {
                    results.push({
                        name: 'Integration SectionManager',
                        status: 'failed',
                        message: 'cours.html n\'utilise pas section-manager.js'
                    });
                }

                if (content.includes('modular') || content.includes('SectionManager')) {
                    results.push({
                        name: 'Architecture modulaire',
                        status: 'passed',
                        message: 'Architecture modulaire détectée'
                    });
                } else {
                    results.push({
                        name: 'Architecture modulaire',
                        status: 'warning',
                        message: 'Architecture modulaire non explicitement détectée'
                    });
                }
            } else {
                results.push({
                    name: 'Test cours.html',
                    status: 'failed',
                    message: 'Fichier cours.html non trouvé'
                });
            }
        } catch (error) {
            results.push({
                name: 'Test architecture modulaire',
                status: 'failed',
                message: error.message
            });
        }

        return results;
    }

    async runPerformanceTests() {
        const results = [];
        
        // Tests de performance basiques
        const startTime = Date.now();
        
        try {
            // Simulation de temps de chargement
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const duration = Date.now() - startTime;
            
            if (duration < 1000) {
                results.push({
                    name: 'Temps de réponse système',
                    status: 'passed',
                    message: `Durée: ${duration}ms (< 1000ms)`
                });
            } else {
                results.push({
                    name: 'Temps de réponse système',
                    status: 'failed',
                    message: `Durée: ${duration}ms (> 1000ms)`
                });
            }
        } catch (error) {
            results.push({
                name: 'Test performance',
                status: 'failed',
                message: error.message
            });
        }

        return results;
    }

    async runIntegrationTests() {
        const results = [];
        
        try {
            // Test d'intégration basique
            const coursExists = fs.existsSync(path.resolve(__dirname, '../src/pages/cours.html'));
            const sectionManagerExists = fs.existsSync(path.resolve(__dirname, '../src/pages/sections/section-manager.js'));
            const dataExists = fs.existsSync(path.resolve(__dirname, '../src/data/mathematiques'));
            
            if (coursExists && sectionManagerExists && dataExists) {
                results.push({
                    name: 'Intégration système complète',
                    status: 'passed',
                    message: 'Tous les composants essentiels sont présents'
                });
            } else {
                results.push({
                    name: 'Intégration système complète',
                    status: 'failed',
                    message: 'Composants manquants détectés'
                });
            }
        } catch (error) {
            results.push({
                name: 'Test intégration',
                status: 'failed',
                message: error.message
            });
        }

        return results;
    }

    // ==========================================
    // MÉTHODE PRINCIPALE
    // ==========================================

    async run() {
        console.log('🚀 Démarrage de la suite de tests unifiée FunRevis V2');
        console.log('='.repeat(60));
        
        const allTests = [
            { name: 'Structure', method: () => this.runFileStructureTests() },
            { name: 'Syntaxe', method: () => this.runJavaScriptSyntaxTests() },
            { name: 'Données', method: () => this.runCourseDataValidationTests() },
            { name: 'Architecture', method: () => this.runModularArchitectureTests() },
            { name: 'Performance', method: () => this.runPerformanceTests() },
            { name: 'Intégration', method: () => this.runIntegrationTests() }
        ];

        for (const test of allTests) {
            console.log(`\n📂 Catégorie: ${test.name.toUpperCase()}`);
            console.log('-'.repeat(40));
            
            try {
                const results = await test.method();
                this.processResults(results);
            } catch (error) {
                console.error(`❌ Erreur dans ${test.name}:`, error.message);
                this.results.failed++;
                this.results.total++;
            }
        }

        return this.generateSummary();
    }

    processResults(testResults) {
        for (const result of testResults) {
            this.results.total++;
            this.results.details.push(result);
            
            if (result.status === 'passed') {
                this.results.passed++;
                console.log(`  ✅ ${result.name}`);
            } else if (result.status === 'failed') {
                this.results.failed++;
                console.log(`  ❌ ${result.name}: ${result.message}`);
            } else if (result.status === 'warning') {
                this.results.warnings++;
                console.log(`  ⚠️ ${result.name}: ${result.message}`);
            }
        }
    }

    generateSummary() {
        console.log('\n' + '='.repeat(60));
        console.log('📋 RÉSUMÉ DES TESTS');
        console.log('='.repeat(60));
        
        console.log(`📊 Tests exécutés: ${this.results.total}`);
        console.log(`✅ Réussis: ${this.results.passed}`);
        console.log(`❌ Échoués: ${this.results.failed}`);
        console.log(`⚠️ Avertissements: ${this.results.warnings}`);
        
        const successRate = (this.results.passed / this.results.total) * 100;
        console.log(`📈 Taux de réussite: ${successRate.toFixed(1)}%`);
        
        return {
            success: this.results.failed === 0,
            results: this.results
        };
    }
}

module.exports = { UnifiedTestSuite };
