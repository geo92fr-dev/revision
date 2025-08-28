const { UnifiedTestSuite } = require('./unified-test-suite-simple.js');
const fs = require('fs');
const path = require('path');

class TestRunner {
    constructor() {
        this.configPath = path.join(__dirname, 'test-config.json');
        this.config = this.loadConfig();
        this.testSuite = new UnifiedTestSuite();
    }

    loadConfig() {
        try {
            const configContent = fs.readFileSync(this.configPath, 'utf8');
            return JSON.parse(configContent);
        } catch (error) {
            console.warn('⚠️ Configuration non trouvée, utilisation des valeurs par défaut');
            return this.getDefaultConfig();
        }
    }

    getDefaultConfig() {
        return {
            testCategories: {
                structure: { critical: true },
                syntax: { critical: true },
                data: { critical: true },
                architecture: { critical: true },
                performance: { critical: false },
                integration: { critical: false }
            },
            thresholds: {
                minimumPassRate: 80,
                criticalTestFailureThreshold: 0
            }
        };
    }

    async runAllTests() {
        console.log('🚀 Démarrage de la suite de tests unifiée FunRevis V2');
        console.log('='.repeat(60));
        
        const startTime = Date.now();
        const results = {
            summary: {
                total: 0,
                passed: 0,
                failed: 0,
                warnings: 0,
                criticalFailures: 0
            },
            categories: {},
            errors: []
        };

        // Exécution des tests par catégorie
        for (const [categoryName, categoryConfig] of Object.entries(this.config.testCategories)) {
            console.log(`\n📂 Catégorie: ${categoryName.toUpperCase()}`);
            console.log('-'.repeat(40));
            
            try {
                const categoryResults = await this.runCategoryTests(categoryName);
                results.categories[categoryName] = categoryResults;
                
                // Mise à jour du résumé
                results.summary.total += categoryResults.total;
                results.summary.passed += categoryResults.passed;
                results.summary.failed += categoryResults.failed;
                results.summary.warnings += categoryResults.warnings;
                
                if (categoryConfig.critical && categoryResults.failed > 0) {
                    results.summary.criticalFailures += categoryResults.failed;
                }
                
            } catch (error) {
                results.errors.push({
                    category: categoryName,
                    error: error.message,
                    stack: error.stack
                });
                console.error(`❌ Erreur dans la catégorie ${categoryName}:`, error.message);
            }
        }

        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Génération du rapport final
        await this.generateReport(results, duration);
        
        // Affichage du résumé
        this.displaySummary(results, duration);
        
        return results;
    }

    async runCategoryTests(categoryName) {
        const results = { total: 0, passed: 0, failed: 0, warnings: 0, details: [] };
        
        switch (categoryName) {
            case 'structure':
                const structureResults = await this.testSuite.runFileStructureTests();
                this.processResults(structureResults, results);
                break;
                
            case 'syntax':
                const syntaxResults = await this.testSuite.runJavaScriptSyntaxTests();
                this.processResults(syntaxResults, results);
                break;
                
            case 'data':
                const dataResults = await this.testSuite.runCourseDataValidationTests();
                this.processResults(dataResults, results);
                break;
                
            case 'architecture':
                const archResults = await this.testSuite.runModularArchitectureTests();
                this.processResults(archResults, results);
                break;
                
            case 'performance':
                const perfResults = await this.testSuite.runPerformanceTests();
                this.processResults(perfResults, results);
                break;
                
            case 'integration':
                const integResults = await this.testSuite.runIntegrationTests();
                this.processResults(integResults, results);
                break;
                
            default:
                console.warn(`⚠️ Catégorie de test inconnue: ${categoryName}`);
        }
        
        return results;
    }

    processResults(testResults, categoryResults) {
        for (const result of testResults) {
            categoryResults.total++;
            categoryResults.details.push(result);
            
            if (result.status === 'passed') {
                categoryResults.passed++;
                console.log(`  ✅ ${result.name}`);
            } else if (result.status === 'failed') {
                categoryResults.failed++;
                console.log(`  ❌ ${result.name}: ${result.message}`);
            } else if (result.status === 'warning') {
                categoryResults.warnings++;
                console.log(`  ⚠️ ${result.name}: ${result.message}`);
            }
        }
    }

    async generateReport(results, duration) {
        const report = {
            timestamp: new Date().toISOString(),
            duration: duration,
            config: this.config.testSuite,
            summary: results.summary,
            categories: results.categories,
            errors: results.errors,
            recommendations: this.generateRecommendations(results)
        };

        // Sauvegarde du rapport JSON
        const reportPath = path.join(__dirname, `test-report-${Date.now()}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`\n📊 Rapport sauvegardé: ${reportPath}`);
        
        return report;
    }

    generateRecommendations(results) {
        const recommendations = [];
        
        // Analyse des échecs critiques
        if (results.summary.criticalFailures > 0) {
            recommendations.push({
                priority: 'critical',
                message: 'Des tests critiques ont échoué. Veuillez corriger ces problèmes avant de continuer.',
                category: 'stability'
            });
        }
        
        // Analyse du taux de réussite
        const successRate = (results.summary.passed / results.summary.total) * 100;
        if (successRate < this.config.thresholds.minimumPassRate) {
            recommendations.push({
                priority: 'high',
                message: `Taux de réussite (${successRate.toFixed(1)}%) inférieur au seuil (${this.config.thresholds.minimumPassRate}%)`,
                category: 'quality'
            });
        }
        
        // Recommandations par catégorie
        for (const [categoryName, categoryResults] of Object.entries(results.categories)) {
            if (categoryResults.failed > 0) {
                recommendations.push({
                    priority: 'medium',
                    message: `Catégorie ${categoryName}: ${categoryResults.failed} test(s) échoué(s)`,
                    category: categoryName
                });
            }
        }
        
        return recommendations;
    }

    displaySummary(results, duration) {
        console.log('\n' + '='.repeat(60));
        console.log('📋 RÉSUMÉ DES TESTS');
        console.log('='.repeat(60));
        
        console.log(`⏱️  Durée d'exécution: ${(duration / 1000).toFixed(2)}s`);
        console.log(`📊 Tests exécutés: ${results.summary.total}`);
        console.log(`✅ Réussis: ${results.summary.passed}`);
        console.log(`❌ Échoués: ${results.summary.failed}`);
        console.log(`⚠️  Avertissements: ${results.summary.warnings}`);
        console.log(`🔴 Échecs critiques: ${results.summary.criticalFailures}`);
        
        const successRate = (results.summary.passed / results.summary.total) * 100;
        console.log(`📈 Taux de réussite: ${successRate.toFixed(1)}%`);
        
        // Status global
        let status = '🟢 SUCCÈS';
        if (results.summary.criticalFailures > 0) {
            status = '🔴 ÉCHEC CRITIQUE';
        } else if (successRate < this.config.thresholds.minimumPassRate) {
            status = '🟡 ATTENTION';
        }
        
        console.log(`\n🎯 Status global: ${status}`);
        console.log('='.repeat(60));
    }
}

// Point d'entrée
if (require.main === module) {
    const runner = new TestRunner();
    
    runner.runAllTests().then(results => {
        const exitCode = results.summary.criticalFailures > 0 ? 1 : 0;
        process.exit(exitCode);
    }).catch(error => {
        console.error('ERREUR FATALE lors de l\'execution des tests:', error);
        process.exit(1);
    });
}

module.exports = { TestRunner };
