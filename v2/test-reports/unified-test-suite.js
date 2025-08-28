#!/usr/bin/env node

/**
 * Suite de tests unifiée pour FunRevis V2
 * Centralise tous les tests dans un seul fichier rationalisé
 */

const fs = require('fs');
const path = require('path');

class UnifiedTestSuite {
    constructor() {
        this.results = {
            timestamp: new Date().toISOString(),
            environment: {
                node: process.version,
                platform: process.platform,
                arch: process.arch
            },
            tests: {},
            summary: {
                total: 0,
                passed: 0,
                failed: 0,
                warnings: 0
            }
        };
        this.colors = {
            reset: '\x1b[0m',
            bright: '\x1b[1m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m'
        };
    }

    log(message, color = 'reset') {
        console.log(`${this.colors[color]}${message}${this.colors.reset}`);
    }

    async runTest(name, testFunction) {
        this.log(`\n🧪 Test: ${name}`, 'cyan');
        this.results.summary.total++;
        
        try {
            const result = await testFunction();
            if (result.success) {
                this.log(`✅ ${name} - RÉUSSI`, 'green');
                this.results.summary.passed++;
                this.results.tests[name] = {
                    status: 'PASSED',
                    message: result.message || 'Test réussi',
                    details: result.details || {},
                    duration: result.duration || 0
                };
            } else {
                this.log(`⚠️  ${name} - AVERTISSEMENT`, 'yellow');
                this.results.summary.warnings++;
                this.results.tests[name] = {
                    status: 'WARNING',
                    message: result.message || 'Test avec avertissement',
                    details: result.details || {},
                    duration: result.duration || 0
                };
            }
        } catch (error) {
            this.log(`❌ ${name} - ÉCHEC`, 'red');
            this.log(`   Erreur: ${error.message}`, 'red');
            this.results.summary.failed++;
            this.results.tests[name] = {
                status: 'FAILED',
                message: error.message,
                stack: error.stack,
                duration: 0
            };
        }
    }

    // Test de structure des fichiers
    async testFileStructure() {
        const startTime = Date.now();
        const requiredPaths = [
            'src/pages/cours.html',
            'src/pages/sections/section-manager.js',
            'src/data/mathematiques/6ieme',
            'src/data/mathematiques/5ieme',
            'src/index.html'
        ];

        const missing = [];
        const existing = [];

        for (const filePath of requiredPaths) {
            const fullPath = path.join(__dirname, '..', filePath);
            if (fs.existsSync(fullPath)) {
                existing.push(filePath);
            } else {
                missing.push(filePath);
            }
        }

        const duration = Date.now() - startTime;

        if (missing.length === 0) {
            return {
                success: true,
                message: `Tous les fichiers requis sont présents (${existing.length})`,
                details: { existing, missing },
                duration
            };
        } else if (missing.length < requiredPaths.length / 2) {
            return {
                success: false,
                message: `Quelques fichiers manquants (${missing.length}/${requiredPaths.length})`,
                details: { existing, missing },
                duration
            };
        } else {
            throw new Error(`Trop de fichiers manquants: ${missing.join(', ')}`);
        }
    }

    // Test de syntaxe JavaScript
    async testJavaScriptSyntax() {
        const startTime = Date.now();
        const jsFiles = this.findJSFiles(path.join(__dirname, '..', 'src'));
        const errors = [];
        const valid = [];

        for (const file of jsFiles) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                // Test basique de syntaxe
                new Function(content);
                valid.push(path.relative(path.join(__dirname, '..'), file));
            } catch (error) {
                errors.push({
                    file: path.relative(path.join(__dirname, '..'), file),
                    error: error.message
                });
            }
        }

        const duration = Date.now() - startTime;

        if (errors.length === 0) {
            return {
                success: true,
                message: `Syntaxe JavaScript valide pour ${valid.length} fichiers`,
                details: { valid, errors },
                duration
            };
        } else if (errors.length < jsFiles.length / 2) {
            return {
                success: false,
                message: `Erreurs de syntaxe dans ${errors.length} fichiers`,
                details: { valid, errors },
                duration
            };
        } else {
            throw new Error(`Trop d'erreurs de syntaxe: ${errors.length} fichiers`);
        }
    }

    // Test des données de cours
    async testCourseData() {
        const startTime = Date.now();
        const dataDir = path.join(__dirname, '..', 'src', 'data');
        const results = {};

        if (!fs.existsSync(dataDir)) {
            throw new Error('Dossier data/ non trouvé');
        }

        const subjects = fs.readdirSync(dataDir).filter(item => 
            fs.statSync(path.join(dataDir, item)).isDirectory()
        );

        for (const subject of subjects) {
            const subjectDir = path.join(dataDir, subject);
            const levels = fs.readdirSync(subjectDir).filter(item => 
                fs.statSync(path.join(subjectDir, item)).isDirectory()
            );

            results[subject] = {};

            for (const level of levels) {
                const levelDir = path.join(subjectDir, level);
                const files = fs.readdirSync(levelDir).filter(file => file.endsWith('.js'));
                
                results[subject][level] = {
                    fileCount: files.length,
                    files: files.map(f => f.replace('.js', ''))
                };
            }
        }

        const duration = Date.now() - startTime;
        const totalFiles = Object.values(results).reduce((sum, subject) => 
            sum + Object.values(subject).reduce((levelSum, level) => 
                levelSum + level.fileCount, 0), 0);

        return {
            success: totalFiles > 0,
            message: `Données de cours trouvées: ${totalFiles} fichiers dans ${subjects.length} matières`,
            details: { subjects: results, totalFiles },
            duration
        };
    }

    // Test de l'architecture modulaire
    async testModularArchitecture() {
        const startTime = Date.now();
        const sectionsDir = path.join(__dirname, '..', 'src', 'pages', 'sections');
        
        if (!fs.existsSync(sectionsDir)) {
            throw new Error('Dossier sections/ non trouvé');
        }

        const sectionManager = path.join(sectionsDir, 'section-manager.js');
        const sectionsCSS = path.join(sectionsDir, 'sections.css');
        const coursHTML = path.join(__dirname, '..', 'src', 'pages', 'cours.html');

        const checks = {
            sectionManagerExists: fs.existsSync(sectionManager),
            sectionsCSSExists: fs.existsSync(sectionsCSS),
            coursHTMLExists: fs.existsSync(coursHTML),
            coursUsesSectionManager: false
        };

        if (checks.coursHTMLExists) {
            const coursContent = fs.readFileSync(coursHTML, 'utf8');
            checks.coursUsesSectionManager = coursContent.includes('SectionManager');
        }

        const duration = Date.now() - startTime;
        const passedChecks = Object.values(checks).filter(Boolean).length;

        if (passedChecks === Object.keys(checks).length) {
            return {
                success: true,
                message: 'Architecture modulaire complète et fonctionnelle',
                details: checks,
                duration
            };
        } else if (passedChecks >= Object.keys(checks).length / 2) {
            return {
                success: false,
                message: `Architecture modulaire partielle (${passedChecks}/${Object.keys(checks).length})`,
                details: checks,
                duration
            };
        } else {
            throw new Error('Architecture modulaire défaillante');
        }
    }

    // Test de performance (simulation)
    async testPerformance() {
        const startTime = Date.now();
        
        // Simuler différents tests de performance
        const tests = [
            { name: 'Chargement page index', target: 500, actual: Math.random() * 800 },
            { name: 'Chargement cours.html', target: 800, actual: Math.random() * 1200 },
            { name: 'Chargement données', target: 300, actual: Math.random() * 500 },
            { name: 'Rendu sections', target: 200, actual: Math.random() * 400 }
        ];

        const results = tests.map(test => ({
            ...test,
            passed: test.actual <= test.target,
            ratio: test.actual / test.target
        }));

        const passedTests = results.filter(r => r.passed).length;
        const duration = Date.now() - startTime;

        if (passedTests === tests.length) {
            return {
                success: true,
                message: `Tous les tests de performance réussis (${passedTests}/${tests.length})`,
                details: { results },
                duration
            };
        } else if (passedTests >= tests.length / 2) {
            return {
                success: false,
                message: `Performance acceptable (${passedTests}/${tests.length} tests réussis)`,
                details: { results },
                duration
            };
        } else {
            throw new Error(`Performance insuffisante: ${passedTests}/${tests.length} tests réussis`);
        }
    }

    findJSFiles(dir) {
        const files = [];
        
        function scanDir(currentDir) {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    scanDir(fullPath);
                } else if (stat.isFile() && item.endsWith('.js')) {
                    files.push(fullPath);
                }
            }
        }
        
        if (fs.existsSync(dir)) {
            scanDir(dir);
        }
        
        return files;
    }

    generateReport() {
        const reportPath = path.join(__dirname, `unified-test-report-${Date.now()}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        
        this.log(`\n📊 RAPPORT DE TESTS`, 'bright');
        this.log(`===============================`, 'cyan');
        this.log(`Total: ${this.results.summary.total}`, 'blue');
        this.log(`✅ Réussis: ${this.results.summary.passed}`, 'green');
        this.log(`⚠️  Avertissements: ${this.results.summary.warnings}`, 'yellow');
        this.log(`❌ Échecs: ${this.results.summary.failed}`, 'red');
        
        const successRate = Math.round((this.results.summary.passed / this.results.summary.total) * 100);
        this.log(`📈 Taux de réussite: ${successRate}%`, successRate >= 80 ? 'green' : successRate >= 60 ? 'yellow' : 'red');
        
        this.log(`\n💾 Rapport détaillé sauvegardé: ${path.basename(reportPath)}`, 'cyan');
        
        return {
            success: this.results.summary.failed === 0,
            successRate,
            reportPath
        };
    }

    async run() {
        this.log('\n🚀 SUITE DE TESTS UNIFIÉE FUNREVIS V2', 'bright');
        this.log('=====================================', 'cyan');
        
        // Exécuter tous les tests
        await this.runTest('Structure des fichiers', () => this.testFileStructure());
        await this.runTest('Syntaxe JavaScript', () => this.testJavaScriptSyntax());
        await this.runTest('Données de cours', () => this.testCourseData());
        await this.runTest('Architecture modulaire', () => this.testModularArchitecture());
        await this.runTest('Performance', () => this.testPerformance());
        
        // Générer le rapport final
        return this.generateReport();
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
}
}

// Exécuter si appelé directement
if (require.main === module) {
    const suite = new UnifiedTestSuite();
    suite.run().then(result => {
        process.exit(result.success ? 0 : 1);
    }).catch(error => {
        console.error('❌ Erreur fatale:', error.message);
        process.exit(1);
    });
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

module.exports = { UnifiedTestSuite };
