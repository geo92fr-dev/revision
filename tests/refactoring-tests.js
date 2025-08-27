const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class V2TestSuite {
    constructor() {
        this.baseUrl = 'http://localhost:8080/v2/src';
        this.testResults = [];
        this.totalTests = 0;
        this.passedTests = 0;
    }

    async runAllTests() {
        console.log('🧪 === FUNREVIS V2 - TESTS DE REFACTORISATION ===');
        console.log(`⚡ Testing at: ${this.baseUrl}\n`);

        await this.testFileStructure();
        await this.testComponentsIntegrity();
        await this.testPageFunctionality();
        await this.testRefactoredPages();
        
        this.displayResults();
        return this.passedTests === this.totalTests;
    }

    test(name, condition, details = '') {
        this.totalTests++;
        const passed = condition;
        
        if (passed) {
            this.passedTests++;
            console.log(`✅ ${name}`);
        } else {
            console.log(`❌ ${name} ${details ? '- ' + details : ''}`);
        }
        
        this.testResults.push({ name, passed, details });
        return passed;
    }

    async testFileStructure() {
        console.log('📁 TESTS DE STRUCTURE DES FICHIERS');
        console.log('━'.repeat(50));

        const requiredFiles = [
            'components/BasePage.js',
            'components/PageBuilder.js',
            'components/SimpleCourseRenderer.js',
            'components/ModuleLoader.js',
            'components/NavigationManager.js',
            'pages/cours.html',
            'index.html',
            'styles/base.css',
            'styles/educational.css',
            'styles/components.css',
            'styles/modern.css',
            'styles/v2-custom.css'
        ];

        requiredFiles.forEach(file => {
            const filePath = path.join('v2/src', file);
            const exists = fs.existsSync(filePath);
            this.test(`Structure: ${file}`, exists, exists ? '' : 'Fichier manquant');
        });

        console.log();
    }

    async testComponentsIntegrity() {
        console.log('🔧 TESTS D\'INTÉGRITÉ DES COMPOSANTS');
        console.log('━'.repeat(50));

        // Test BasePage.js
        const basePagePath = 'v2/src/components/BasePage.js';
        if (fs.existsSync(basePagePath)) {
            const content = fs.readFileSync(basePagePath, 'utf8');
            this.test('BasePage: Classe exportée', content.includes('export class BasePage'));
            this.test('BasePage: Méthode init()', content.includes('init()'));
            this.test('BasePage: Gestion d\'erreurs', content.includes('handleError'));
            this.test('BasePage: Utilitaires URL', content.includes('getUrlParam'));
        }

        // Test PageBuilder.js
        const pageBuilderPath = 'v2/src/components/PageBuilder.js';
        if (fs.existsSync(pageBuilderPath)) {
            const content = fs.readFileSync(pageBuilderPath, 'utf8');
            this.test('PageBuilder: Classe exportée', content.includes('export class PageBuilder'));
            this.test('PageBuilder: Méthode buildPage()', content.includes('buildPage'));
            this.test('PageBuilder: Génération HTML', content.includes('innerHTML'));
        }

        // Test SimpleCourseRenderer.js
        const rendererPath = 'v2/src/components/SimpleCourseRenderer.js';
        if (fs.existsSync(rendererPath)) {
            const content = fs.readFileSync(rendererPath, 'utf8');
            this.test('SimpleCourseRenderer: Classe exportée', content.includes('export class SimpleCourseRenderer'));
            this.test('SimpleCourseRenderer: Méthode renderCourse()', content.includes('renderCourse('));
            this.test('SimpleCourseRenderer: Sanitisation', content.includes('sanitizeHTML(') || content.includes('sanitize('));
        }

        console.log();
    }

    async testPageFunctionality() {
        console.log('📄 TESTS DE FONCTIONNALITÉ DES PAGES');
        console.log('━'.repeat(50));

        // Test page cours.html
        const coursPagePath = 'v2/src/pages/cours.html';
        if (fs.existsSync(coursPagePath)) {
            const content = fs.readFileSync(coursPagePath, 'utf8');
            this.test('Page Cours: Imports ES6', content.includes('import {'));
            this.test('Page Cours: Héritage BasePage', content.includes('extends BasePage'));
            this.test('Page Cours: Utilisation SimpleCourseRenderer', content.includes('SimpleCourseRenderer'));
            this.test('Page Cours: Styles intégrés', content.includes('base.css'));
        }

        // Test page index.html
        const indexPath = 'v2/src/index.html';
        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');
            this.test('Index: Imports ES6', content.includes('import {'));
            this.test('Index: Héritage BasePage', content.includes('extends BasePage'));
            this.test('Index: Utilisation PageBuilder', content.includes('PageBuilder'));
            this.test('Index: Styles intégrés', content.includes('base.css'));
        }

        console.log();
    }

    async testRefactoredPages() {
        console.log('🔄 TESTS DE REFACTORISATION');
        console.log('━'.repeat(50));

        // Vérification que les nouvelles pages utilisent l'architecture refactorisée
        const refactoredPages = [
            { file: 'pages/cours.html', name: 'Page Cours' },
            { file: 'index.html', name: 'Index' }
        ];

        refactoredPages.forEach(page => {
            const filePath = path.join('v2/src', page.file);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                
                // Tests de refactorisation
                this.test(`${page.name}: Code modulaire`, content.includes('class ') && content.includes('extends BasePage'));
                this.test(`${page.name}: Pas de code dupliqué`, !content.includes('function init()') || content.includes('super.init()'));
                this.test(`${page.name}: Imports corrects`, content.includes("import { BasePage }"));
                this.test(`${page.name}: Gestion d'erreurs`, content.includes('try {') && content.includes('catch'));
                this.test(`${page.name}: Logging structuré`, content.includes('this.log('));
            }
        });

        console.log();
    }

    displayResults() {
        console.log('📊 RÉSULTATS DES TESTS DE REFACTORISATION');
        console.log('━'.repeat(50));
        console.log(`✅ Tests réussis: ${this.passedTests}/${this.totalTests}`);
        console.log(`📈 Taux de réussite: ${((this.passedTests / this.totalTests) * 100).toFixed(1)}%`);
        
        if (this.passedTests === this.totalTests) {
            console.log('🎉 REFACTORISATION RÉUSSIE !');
            console.log('🔧 Architecture V2 refactorisée et opérationnelle');
        } else {
            console.log('⚠️  Certains tests ont échoué');
            console.log('🔍 Vérifiez les erreurs ci-dessus');
        }
        
        console.log();
    }
}

// Lancement des tests si appelé directement
if (require.main === module) {
    const testSuite = new V2TestSuite();
    testSuite.runAllTests()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Erreur lors des tests:', error);
            process.exit(1);
        });
}

module.exports = V2TestSuite;
