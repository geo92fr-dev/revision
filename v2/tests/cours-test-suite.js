/**
 * Suite de tests complète pour cours.html - FunRevis V2
 * Orchestrateur principal des tests
 */

const CoursHtmlValidator = require('./cours-validator');
const CoursIntegrationTester = require('./cours-integration');
const fs = require('fs');
const path = require('path');

class CoursTestSuite {
    constructor() {
        this.validator = new CoursHtmlValidator();
        this.integrationTester = new CoursIntegrationTester();
        this.overallResults = {
            validation: null,
            integration: null,
            overall: null
        };
    }

    async runFullTestSuite() {
        console.log('🚀 DÉMARRAGE SUITE DE TESTS COMPLÈTE - COURS.HTML');
        console.log('='.repeat(60));
        console.log('📅 Date:', new Date().toLocaleString('fr-FR'));
        console.log('📁 Fichier testé: cours.html');
        console.log('🎯 Objectif: Validation robuste du fichier critique');
        console.log('='.repeat(60));
        
        const startTime = Date.now();
        
        try {
            // Phase 1: Tests de validation
            console.log('\n📋 PHASE 1: TESTS DE VALIDATION');
            console.log('-'.repeat(40));
            await this.validator.runAllTests();
            
            // Phase 2: Tests d'intégration
            console.log('\n🔄 PHASE 2: TESTS D\'INTÉGRATION');
            console.log('-'.repeat(40));
            await this.integrationTester.runIntegrationTests();
            
            // Phase 3: Analyse et rapport final
            console.log('\n📊 PHASE 3: ANALYSE FINALE');
            console.log('-'.repeat(40));
            await this.generateFinalReport();
            
            const endTime = Date.now();
            const duration = Math.round((endTime - startTime) / 1000);
            
            console.log(`\n⏱️ Durée totale: ${duration}s`);
            console.log('✅ Suite de tests terminée');
            
        } catch (error) {
            console.error('❌ Erreur lors des tests:', error.message);
            process.exit(1);
        }
    }

    async generateFinalReport() {
        // Lire les rapports individuels
        const validationReport = this.readReport('cours-validation.json');
        const integrationReport = this.readReport('cours-integration.json');
        
        if (!validationReport || !integrationReport) {
            console.error('❌ Impossible de lire les rapports individuels');
            return;
        }
        
        // Calculer le score global
        const totalScore = validationReport.score + integrationReport.score;
        const totalTests = validationReport.total + integrationReport.total;
        const overallPercentage = Math.round((totalScore / totalTests) * 100);
        
        // Déterminer le statut
        let status = '❌ CRITIQUE';
        let recommendation = '';
        
        if (overallPercentage >= 90) {
            status = '🏆 EXCELLENT';
            recommendation = 'Le fichier cours.html est parfaitement validé et prêt pour la production.';
        } else if (overallPercentage >= 80) {
            status = '✅ BON';
            recommendation = 'Le fichier cours.html est solide avec quelques améliorations mineures possibles.';
        } else if (overallPercentage >= 70) {
            status = '⚠️ ACCEPTABLE';
            recommendation = 'Le fichier cours.html fonctionne mais nécessite des corrections importantes.';
        } else if (overallPercentage >= 60) {
            status = '🔧 PROBLÉMATIQUE';
            recommendation = 'Le fichier cours.html a des problèmes critiques à résoudre avant déploiement.';
        } else {
            status = '🚨 CRITIQUE';
            recommendation = 'Le fichier cours.html nécessite une refonte majeure avant utilisation.';
        }
        
        // Afficher le rapport final
        console.log('📈 RAPPORT FINAL CONSOLIDÉ');
        console.log('='.repeat(50));
        console.log(`📄 Fichier: cours.html`);
        console.log(`📊 Score global: ${totalScore}/${totalTests} (${overallPercentage}%)`);
        console.log(`🎯 Statut: ${status}`);
        console.log('');
        console.log('📋 Détail par phase:');
        console.log(`  📝 Validation: ${validationReport.score}/${validationReport.total} (${validationReport.percentage}%)`);
        console.log(`  🔄 Intégration: ${integrationReport.score}/${integrationReport.total} (${integrationReport.percentage}%)`);
        console.log('');
        console.log('💡 Recommandation:');
        console.log(`  ${recommendation}`);
        
        // Analyse détaillée des échecs
        const allFailures = [
            ...validationReport.results.filter(r => !r.passed),
            ...integrationReport.results.filter(r => !r.passed)
        ];
        
        if (allFailures.length > 0) {
            console.log('\n🚨 Points à corriger:');
            allFailures.forEach((failure, index) => {
                console.log(`  ${index + 1}. ${failure.message}`);
            });
        }
        
        // Points forts
        const allSuccesses = [
            ...validationReport.results.filter(r => r.passed),
            ...integrationReport.results.filter(r => r.passed)
        ];
        
        if (allSuccesses.length > 0) {
            console.log('\n✅ Points forts validés:');
            const topSuccesses = allSuccesses.slice(0, 5); // Top 5
            topSuccesses.forEach((success, index) => {
                console.log(`  ${index + 1}. ${success.message}`);
            });
            if (allSuccesses.length > 5) {
                console.log(`  ... et ${allSuccesses.length - 5} autres tests réussis`);
            }
        }
        
        // Sauvegarder le rapport consolidé
        const consolidatedReport = {
            timestamp: new Date().toISOString(),
            file: 'cours.html',
            overall: {
                score: totalScore,
                total: totalTests,
                percentage: overallPercentage,
                status: status,
                recommendation: recommendation
            },
            validation: validationReport,
            integration: integrationReport,
            failures: allFailures,
            successes: allSuccesses
        };
        
        const reportPath = path.join(__dirname, '../test-reports/cours-final-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(consolidatedReport, null, 2));
        
        console.log(`\n📄 Rapport final sauvé: ${reportPath}`);
        console.log('\n🔍 Pour plus de détails, consultez les rapports individuels dans test-reports/');
        
        // Déterminer le code de sortie
        if (overallPercentage < 70) {
            console.log('\n⚠️ Score insuffisant - des corrections sont nécessaires');
            process.exitCode = 1;
        } else {
            console.log('\n🎉 Validation réussie - fichier prêt pour utilisation');
        }
    }

    readReport(filename) {
        try {
            const reportPath = path.join(__dirname, '../test-reports', filename);
            if (fs.existsSync(reportPath)) {
                return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
            }
        } catch (error) {
            console.error(`❌ Erreur lecture rapport ${filename}:`, error.message);
        }
        return null;
    }

    // Méthode pour tests spécifiques
    async runQuickValidation() {
        console.log('⚡ VALIDATION RAPIDE - COURS.HTML');
        console.log('-'.repeat(30));
        
        const quickTests = [
            () => this.checkFileExists(),
            () => this.checkBasicStructure(),
            () => this.checkCriticalFunctions()
        ];
        
        let passed = 0;
        for (const test of quickTests) {
            if (await test()) passed++;
        }
        
        const percentage = Math.round((passed / quickTests.length) * 100);
        console.log(`\n⚡ Validation rapide: ${passed}/${quickTests.length} (${percentage}%)`);
        
        return percentage >= 80;
    }

    async checkFileExists() {
        const coursPath = path.join(__dirname, '../src/pages/cours.html');
        const exists = fs.existsSync(coursPath);
        console.log(exists ? '✅ Fichier existe' : '❌ Fichier manquant');
        return exists;
    }

    async checkBasicStructure() {
        try {
            const coursPath = path.join(__dirname, '../src/pages/cours.html');
            const content = fs.readFileSync(coursPath, 'utf8');
            const hasHtml = content.includes('<html');
            const hasBody = content.includes('<body');
            const hasContainer = content.includes('container');
            const valid = hasHtml && hasBody && hasContainer;
            console.log(valid ? '✅ Structure de base OK' : '❌ Structure de base KO');
            return valid;
        } catch (error) {
            console.log('❌ Erreur structure de base');
            return false;
        }
    }

    async checkCriticalFunctions() {
        try {
            const coursPath = path.join(__dirname, '../src/pages/cours.html');
            const content = fs.readFileSync(coursPath, 'utf8');
            const hasToggle = content.includes('function toggleSection');
            const hasValidation = content.includes('function validate');
            const hasLoad = content.includes('function loadCourse');
            const valid = hasToggle && hasValidation && hasLoad;
            console.log(valid ? '✅ Fonctions critiques OK' : '❌ Fonctions critiques KO');
            return valid;
        } catch (error) {
            console.log('❌ Erreur fonctions critiques');
            return false;
        }
    }
}

// Export et exécution CLI
module.exports = CoursTestSuite;

if (require.main === module) {
    const testSuite = new CoursTestSuite();
    
    // Vérifier les arguments CLI
    const args = process.argv.slice(2);
    
    if (args.includes('--quick') || args.includes('-q')) {
        testSuite.runQuickValidation().catch(console.error);
    } else {
        testSuite.runFullTestSuite().catch(console.error);
    }
}
