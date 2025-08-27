/**
 * Tests robustes pour cours.html - FunRevis V2
 * Validation complète du fichier critique du projet
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class CoursHtmlValidator {
    constructor() {
        this.coursPath = path.join(__dirname, '../src/pages/cours.html');
        this.testResults = [];
        this.score = 0;
        this.totalTests = 0;
    }

    async runAllTests() {
        console.log('🔍 Début des tests pour cours.html...\n');
        
        // Tests de base
        await this.testFileExists();
        await this.testFileSize();
        await this.testHtmlValidity();
        
        // Tests de structure
        await this.testRequiredElements();
        await this.testBreadcrumbStructure();
        await this.testSectionsStructure();
        
        // Tests de fonctionnalités
        await this.testJavaScriptFunctions();
        await this.testCSSStyles();
        await this.testFormElements();
        
        // Tests d'accessibilité
        await this.testAccessibility();
        
        // Tests de performance
        await this.testPerformance();
        
        // Tests d'intégration
        await this.testDataIntegration();
        
        this.generateReport();
    }

    async testFileExists() {
        this.totalTests++;
        try {
            const exists = fs.existsSync(this.coursPath);
            if (exists) {
                this.score++;
                this.addResult('✅ Fichier cours.html existe', true);
            } else {
                this.addResult('❌ Fichier cours.html introuvable', false);
            }
        } catch (error) {
            this.addResult(`❌ Erreur vérification fichier: ${error.message}`, false);
        }
    }

    async testFileSize() {
        this.totalTests++;
        try {
            const stats = fs.statSync(this.coursPath);
            const sizeKB = Math.round(stats.size / 1024);
            
            if (sizeKB > 10 && sizeKB < 500) {
                this.score++;
                this.addResult(`✅ Taille fichier acceptable: ${sizeKB}KB`, true);
            } else {
                this.addResult(`⚠️ Taille fichier inhabituelle: ${sizeKB}KB`, false);
            }
        } catch (error) {
            this.addResult(`❌ Erreur lecture taille: ${error.message}`, false);
        }
    }

    async testHtmlValidity() {
        this.totalTests++;
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            const dom = new JSDOM(content);
            
            // Tests basiques de validité HTML
            const document = dom.window.document;
            const hasDoctype = content.startsWith('<!DOCTYPE html>');
            const hasHtml = document.querySelector('html');
            const hasHead = document.querySelector('head');
            const hasBody = document.querySelector('body');
            
            if (hasDoctype && hasHtml && hasHead && hasBody) {
                this.score++;
                this.addResult('✅ Structure HTML valide', true);
            } else {
                this.addResult('❌ Structure HTML invalide', false);
            }
        } catch (error) {
            this.addResult(`❌ Erreur validation HTML: ${error.message}`, false);
        }
    }

    async testRequiredElements() {
        this.totalTests += 5; // 5 sous-tests
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            const dom = new JSDOM(content);
            const document = dom.window.document;
            
            // Test 1: Titre principal
            const mainTitle = document.getElementById('mainTitle');
            if (mainTitle) {
                passedSubTests++;
                this.addResult('✅ Titre principal présent', true);
            } else {
                this.addResult('❌ Titre principal manquant', false);
            }
            
            // Test 2: Breadcrumb
            const breadcrumb = document.querySelector('.breadcrumb');
            if (breadcrumb) {
                passedSubTests++;
                this.addResult('✅ Breadcrumb présent', true);
            } else {
                this.addResult('❌ Breadcrumb manquant', false);
            }
            
            // Test 3: Container principal
            const container = document.querySelector('.container');
            if (container) {
                passedSubTests++;
                this.addResult('✅ Container principal présent', true);
            } else {
                this.addResult('❌ Container principal manquant', false);
            }
            
            // Test 4: Sections collapsibles
            const sections = document.querySelectorAll('.collapsible-section');
            if (sections.length >= 5) {
                passedSubTests++;
                this.addResult(`✅ Sections collapsibles présentes (${sections.length})`, true);
            } else {
                this.addResult(`❌ Sections insuffisantes (${sections.length}/5)`, false);
            }
            
            // Test 5: Navigation
            const navigation = document.querySelector('.navigation');
            if (navigation) {
                passedSubTests++;
                this.addResult('✅ Navigation présente', true);
            } else {
                this.addResult('❌ Navigation manquante', false);
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test éléments: ${error.message}`, false);
        }
    }

    async testBreadcrumbStructure() {
        this.totalTests += 3;
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            const dom = new JSDOM(content);
            const document = dom.window.document;
            
            // Test liens breadcrumb
            const homeLink = document.querySelector('a[href="../../index.html"]');
            const subjectLink = document.getElementById('breadcrumbSubjectLink');
            const levelLink = document.getElementById('breadcrumbLevelLink');
            
            if (homeLink) {
                passedSubTests++;
                this.addResult('✅ Lien accueil breadcrumb OK', true);
            } else {
                this.addResult('❌ Lien accueil breadcrumb manquant', false);
            }
            
            if (subjectLink) {
                passedSubTests++;
                this.addResult('✅ Lien matière breadcrumb OK', true);
            } else {
                this.addResult('❌ Lien matière breadcrumb manquant', false);
            }
            
            if (levelLink) {
                passedSubTests++;
                this.addResult('✅ Lien niveau breadcrumb OK', true);
            } else {
                this.addResult('❌ Lien niveau breadcrumb manquant', false);
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test breadcrumb: ${error.message}`, false);
        }
    }

    async testSectionsStructure() {
        this.totalTests += 6;
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            const requiredSections = [
                'pre-evaluation',
                'cours', 
                'exercices',
                'quiz',
                'reflexion',
                'ressources'
            ];
            
            for (const sectionId of requiredSections) {
                if (content.includes(`id="${sectionId}"`)) {
                    passedSubTests++;
                    this.addResult(`✅ Section ${sectionId} présente`, true);
                } else {
                    this.addResult(`❌ Section ${sectionId} manquante`, false);
                }
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test sections: ${error.message}`, false);
        }
    }

    async testJavaScriptFunctions() {
        this.totalTests += 4;
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            
            // Fonctions critiques à vérifier
            const criticalFunctions = [
                'toggleSection',
                'loadCourse',
                'validatePreEvaluation',
                'updateBreadcrumb'
            ];
            
            for (const func of criticalFunctions) {
                if (content.includes(`function ${func}`) || content.includes(`${func} =`)) {
                    passedSubTests++;
                    this.addResult(`✅ Fonction ${func} présente`, true);
                } else {
                    this.addResult(`❌ Fonction ${func} manquante`, false);
                }
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test JavaScript: ${error.message}`, false);
        }
    }

    async testCSSStyles() {
        this.totalTests += 3;
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            
            // Styles critiques
            const criticalStyles = [
                '.collapsible-section',
                '.exercise-item',
                '.feedback'
            ];
            
            for (const style of criticalStyles) {
                if (content.includes(style)) {
                    passedSubTests++;
                    this.addResult(`✅ Style ${style} présent`, true);
                } else {
                    this.addResult(`❌ Style ${style} manquant`, false);
                }
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test CSS: ${error.message}`, false);
        }
    }

    async testFormElements() {
        this.totalTests += 2;
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            const dom = new JSDOM(content);
            const document = dom.window.document;
            
            // Test inputs
            const inputs = document.querySelectorAll('input.answer-input');
            if (inputs.length > 0) {
                passedSubTests++;
                this.addResult(`✅ Champs de saisie présents (${inputs.length})`, true);
            } else {
                this.addResult('❌ Aucun champ de saisie trouvé', false);
            }
            
            // Test boutons validation
            const validateButtons = document.querySelectorAll('.validate-btn');
            if (validateButtons.length > 0) {
                passedSubTests++;
                this.addResult(`✅ Boutons validation présents (${validateButtons.length})`, true);
            } else {
                this.addResult('❌ Aucun bouton validation trouvé', false);
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test formulaires: ${error.message}`, false);
        }
    }

    async testAccessibility() {
        this.totalTests += 3;
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            
            // Test lang attribute
            if (content.includes('lang="fr"')) {
                passedSubTests++;
                this.addResult('✅ Attribut lang présent', true);
            } else {
                this.addResult('❌ Attribut lang manquant', false);
            }
            
            // Test meta viewport
            if (content.includes('name="viewport"')) {
                passedSubTests++;
                this.addResult('✅ Meta viewport présent', true);
            } else {
                this.addResult('❌ Meta viewport manquant', false);
            }
            
            // Test titre de page
            if (content.includes('<title')) {
                passedSubTests++;
                this.addResult('✅ Titre de page présent', true);
            } else {
                this.addResult('❌ Titre de page manquant', false);
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test accessibilité: ${error.message}`, false);
        }
    }

    async testPerformance() {
        this.totalTests += 2;
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            
            // Test CSS inline (pour éviter les requêtes externes)
            if (content.includes('<style>')) {
                passedSubTests++;
                this.addResult('✅ CSS inline présent (performance)', true);
            } else {
                this.addResult('⚠️ CSS externe détecté', false);
            }
            
            // Test JS inline
            if (content.includes('<script>') && !content.includes('src=')) {
                passedSubTests++;
                this.addResult('✅ JavaScript inline (performance)', true);
            } else {
                this.addResult('⚠️ JavaScript externe détecté', false);
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test performance: ${error.message}`, false);
        }
    }

    async testDataIntegration() {
        this.totalTests += 2;
        let passedSubTests = 0;
        
        try {
            const content = fs.readFileSync(this.coursPath, 'utf8');
            
            // Test chargement données
            if (content.includes('loadRealData') || content.includes('loadCourse')) {
                passedSubTests++;
                this.addResult('✅ Système chargement données présent', true);
            } else {
                this.addResult('❌ Système chargement données manquant', false);
            }
            
            // Test fallback content
            if (content.includes('displayFallbackContent') || content.includes('fallback')) {
                passedSubTests++;
                this.addResult('✅ Contenu de fallback présent', true);
            } else {
                this.addResult('❌ Contenu de fallback manquant', false);
            }
            
            this.score += passedSubTests;
            
        } catch (error) {
            this.addResult(`❌ Erreur test intégration: ${error.message}`, false);
        }
    }

    addResult(message, passed) {
        this.testResults.push({ message, passed });
        console.log(message);
    }

    generateReport() {
        const percentage = Math.round((this.score / this.totalTests) * 100);
        const status = percentage >= 80 ? '✅ SUCCÈS' : percentage >= 60 ? '⚠️ ATTENTION' : '❌ ÉCHEC';
        
        console.log('\n' + '='.repeat(50));
        console.log('📊 RAPPORT DE TESTS COURS.HTML');
        console.log('='.repeat(50));
        console.log(`Score: ${this.score}/${this.totalTests} (${percentage}%)`);
        console.log(`Statut: ${status}`);
        console.log('\n📋 Détails par catégorie:');
        
        const passedTests = this.testResults.filter(r => r.passed).length;
        const failedTests = this.testResults.filter(r => !r.passed).length;
        
        console.log(`✅ Tests réussis: ${passedTests}`);
        console.log(`❌ Tests échoués: ${failedTests}`);
        
        if (failedTests > 0) {
            console.log('\n🚨 Tests échoués:');
            this.testResults
                .filter(r => !r.passed)
                .forEach(result => console.log(`  ${result.message}`));
        }
        
        console.log('\n💡 Recommandations:');
        if (percentage < 80) {
            console.log('  - Vérifier les éléments manquants');
            console.log('  - Corriger les erreurs de structure');
            console.log('  - Tester manuellement les fonctionnalités');
        } else {
            console.log('  - Le fichier cours.html est robuste');
            console.log('  - Continuer les tests d\'intégration');
        }
        
        // Sauvegarder le rapport
        this.saveReport(percentage, status);
    }

    saveReport(percentage, status) {
        const report = {
            timestamp: new Date().toISOString(),
            file: 'cours.html',
            score: this.score,
            total: this.totalTests,
            percentage: percentage,
            status: status,
            results: this.testResults
        };
        
        const reportPath = path.join(__dirname, '../test-reports/cours-validation.json');
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`\n📄 Rapport sauvé: ${reportPath}`);
    }
}

module.exports = CoursHtmlValidator;

// Exécution directe si appelé en CLI
if (require.main === module) {
    const validator = new CoursHtmlValidator();
    validator.runAllTests().catch(console.error);
}
