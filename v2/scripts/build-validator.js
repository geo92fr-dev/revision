/**
 * Script de validation automatique pour le build
 * Intégration des tests robustes dans le processus de build
 */

const path = require('path');
const CoursTestSuite = require('../tests/cours-test-suite');

class BuildValidator {
    constructor() {
        this.testSuite = new CoursTestSuite();
        this.minScore = 70; // Score minimum requis pour le build
    }

    async validateForBuild() {
        console.log('🔍 VALIDATION PRÉ-BUILD - COURS.HTML');
        console.log('='.repeat(40));
        
        try {
            // Validation rapide d'abord
            const quickValid = await this.testSuite.runQuickValidation();
            
            if (!quickValid) {
                console.log('❌ Échec validation rapide - arrêt du build');
                return false;
            }
            
            console.log('\n🔄 Validation complète...');
            
            // Exécution silencieuse de la suite complète
            const originalLog = console.log;
            const logs = [];
            console.log = (...args) => logs.push(args.join(' '));
            
            await this.testSuite.runFullTestSuite();
            
            console.log = originalLog;
            
            // Lire le rapport final
            const reportPath = path.join(__dirname, '../test-reports/cours-final-report.json');
            const fs = require('fs');
            
            if (fs.existsSync(reportPath)) {
                const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
                const score = report.overall.percentage;
                
                console.log(`📊 Score final: ${score}%`);
                console.log(`🎯 Seuil requis: ${this.minScore}%`);
                
                if (score >= this.minScore) {
                    console.log('✅ Validation réussie - build autorisé');
                    return true;
                } else {
                    console.log('❌ Score insuffisant - build bloqué');
                    this.showCriticalIssues(report);
                    return false;
                }
            } else {
                console.log('❌ Rapport de test introuvable');
                return false;
            }
            
        } catch (error) {
            console.error('❌ Erreur validation:', error.message);
            return false;
        }
    }

    showCriticalIssues(report) {
        console.log('\n🚨 PROBLÈMES CRITIQUES À CORRIGER:');
        
        const criticalFailures = report.failures.filter(f => 
            f.message.includes('manquant') || 
            f.message.includes('invalide') ||
            f.message.includes('critique')
        );
        
        criticalFailures.slice(0, 5).forEach((issue, index) => {
            console.log(`  ${index + 1}. ${issue.message}`);
        });
        
        if (criticalFailures.length > 5) {
            console.log(`  ... et ${criticalFailures.length - 5} autres problèmes`);
        }
    }
}

module.exports = BuildValidator;

// CLI usage
if (require.main === module) {
    const validator = new BuildValidator();
    validator.validateForBuild().then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('❌ Erreur fatale:', error);
        process.exit(1);
    });
}
