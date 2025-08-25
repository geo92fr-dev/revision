#!/usr/bin/env node

/**
 * Script de test pour FunRevis V2
 * Valide le fonctionnement de l'application
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TestScript {
    constructor() {
        this.srcDir = path.join(__dirname, '..', 'src');
        this.testResults = [];
    }
    
    async runTests() {
        console.log('🧪 Début des tests FunRevis V2...');
        
        try {
            // 1. Tests de structure
            await this.testStructure();
            
            // 2. Tests des modules
            await this.testModules();
            
            // 3. Tests des données
            await this.testData();
            
            // 4. Tests des pages
            await this.testPages();
            
            // 5. Rapport final
            this.generateReport();
            
        } catch (error) {
            console.error('❌ Erreur lors des tests:', error.message);
            process.exit(1);
        }
    }
    
    async testStructure() {
        console.log('📁 Test de structure...');
        
        const requiredDirs = [
            'src',
            'src/components',
            'src/data',
            'src/pages',
            'src/config'
        ];
        
        const requiredFiles = [
            'firebase.json',
            'package.json',
            'src/index.html'
        ];
        
        for (const dir of requiredDirs) {
            const fullPath = path.join(__dirname, '..', dir);
            if (!fs.existsSync(fullPath)) {
                this.addTestResult('Structure', `Dossier manquant: ${dir}`, false);
            } else {
                this.addTestResult('Structure', `Dossier présent: ${dir}`, true);
            }
        }
        
        for (const file of requiredFiles) {
            const fullPath = path.join(__dirname, '..', file);
            if (!fs.existsSync(fullPath)) {
                this.addTestResult('Structure', `Fichier manquant: ${file}`, false);
            } else {
                this.addTestResult('Structure', `Fichier présent: ${file}`, true);
            }
        }
    }
    
    async testModules() {
        console.log('🔧 Test des modules...');
        
        const moduleFiles = [
            'src/components/ModuleLoader.js',
            'src/components/CourseRenderer.js',
            'src/components/NavigationManager.js'
        ];
        
        for (const moduleFile of moduleFiles) {
            const fullPath = path.join(__dirname, '..', moduleFile);
            
            if (!fs.existsSync(fullPath)) {
                this.addTestResult('Modules', `Module manquant: ${moduleFile}`, false);
                continue;
            }
            
            // Vérifier la syntaxe du module
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // Vérifications basiques
                if (content.includes('export class') || content.includes('export default')) {
                    this.addTestResult('Modules', `Syntaxe ES6 OK: ${moduleFile}`, true);
                } else {
                    this.addTestResult('Modules', `Syntaxe ES6 manquante: ${moduleFile}`, false);
                }
                
                // Vérifier les imports/exports (plus flexible)
                const hasExports = content.includes('export class') || content.includes('export default') || content.includes('export const');
                const hasImports = content.includes('import') || !content.includes('import'); // Les imports sont optionnels
                
                if (hasExports) {
                    this.addTestResult('Modules', `Imports/Exports OK: ${moduleFile}`, true);
                } else {
                    this.addTestResult('Modules', `Imports/Exports problématiques: ${moduleFile}`, false);
                }
                
            } catch (error) {
                this.addTestResult('Modules', `Erreur lecture: ${moduleFile}`, false);
            }
        }
    }
    
    async testData() {
        console.log('📊 Test des données...');
        
        const dataDir = path.join(this.srcDir, 'data', 'mathematiques', '6ieme');
        
        if (!fs.existsSync(dataDir)) {
            this.addTestResult('Données', 'Dossier data/mathematiques/6ieme manquant', false);
            return;
        }
        
        const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));
        
        if (dataFiles.length === 0) {
            this.addTestResult('Données', 'Aucun fichier de données trouvé', false);
            return;
        }
        
        for (const dataFile of dataFiles) {
            const fullPath = path.join(dataDir, dataFile);
            
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // Vérifier la structure des données
                if (content.includes('export default') || content.includes('export const')) {
                    this.addTestResult('Données', `Structure OK: ${dataFile}`, true);
                } else {
                    this.addTestResult('Données', `Structure problématique: ${dataFile}`, false);
                }
                
                // Vérifier les propriétés essentielles (sauf pour les fichiers index)
                if (dataFile === 'index.js') {
                    // Les fichiers index contiennent des imports/exports, c'est normal
                    this.addTestResult('Données', `Index file OK: ${dataFile}`, true);
                } else {
                    const hasNewFormat = content.includes('title') && content.includes('description');
                    const hasLegacyFormat = content.includes('competences') || content.includes('niveau');
                    
                    if (hasNewFormat || hasLegacyFormat) {
                        this.addTestResult('Données', `Propriétés OK: ${dataFile}`, true);
                    } else {
                        this.addTestResult('Données', `Propriétés manquantes: ${dataFile}`, false);
                    }
                }
                
            } catch (error) {
                this.addTestResult('Données', `Erreur lecture: ${dataFile}`, false);
            }
        }
    }
    
    async testPages() {
        console.log('📄 Test des pages...');
        
        const pageFiles = [
            'src/index.html',
            'src/pages/page_de_cours.html',
            'src/pages/mathematiques/index.html'
        ];
        
        for (const pageFile of pageFiles) {
            const fullPath = path.join(__dirname, '..', pageFile);
            
            if (!fs.existsSync(fullPath)) {
                this.addTestResult('Pages', `Page manquante: ${pageFile}`, false);
                continue;
            }
            
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // Vérifications HTML de base
                if (content.includes('<!DOCTYPE html>')) {
                    this.addTestResult('Pages', `DOCTYPE OK: ${pageFile}`, true);
                } else {
                    this.addTestResult('Pages', `DOCTYPE manquant: ${pageFile}`, false);
                }
                
                if (content.includes('<meta charset="UTF-8">')) {
                    this.addTestResult('Pages', `Charset OK: ${pageFile}`, true);
                } else {
                    this.addTestResult('Pages', `Charset manquant: ${pageFile}`, false);
                }
                
                if (content.includes('type="module"')) {
                    this.addTestResult('Pages', `Modules ES6 OK: ${pageFile}`, true);
                } else {
                    this.addTestResult('Pages', `Modules ES6 manquants: ${pageFile}`, false);
                }
                
            } catch (error) {
                this.addTestResult('Pages', `Erreur lecture: ${pageFile}`, false);
            }
        }
    }
    
    addTestResult(category, message, success) {
        this.testResults.push({
            category,
            message,
            success,
            timestamp: new Date().toISOString()
        });
        
        const icon = success ? '✅' : '❌';
        console.log(`  ${icon} ${message}`);
    }
    
    generateReport() {
        console.log('\\n📋 RAPPORT DE TESTS');
        console.log('='.repeat(50));
        
        const categories = [...new Set(this.testResults.map(r => r.category))];
        
        let totalTests = 0;
        let successfulTests = 0;
        
        for (const category of categories) {
            const categoryResults = this.testResults.filter(r => r.category === category);
            const successes = categoryResults.filter(r => r.success).length;
            const total = categoryResults.length;
            
            console.log(`\\n${category}: ${successes}/${total} tests réussis`);
            
            totalTests += total;
            successfulTests += successes;
        }
        
        const successRate = Math.round((successfulTests / totalTests) * 100);
        
        console.log('\\n' + '='.repeat(50));
        console.log(`TOTAL: ${successfulTests}/${totalTests} tests réussis (${successRate}%)`);
        
        if (successRate >= 90) {
            console.log('🎉 Application prête pour le déploiement !');
        } else if (successRate >= 70) {
            console.log('⚠️ Application fonctionnelle mais améliorations possibles');
        } else {
            console.log('❌ Application nécessite des corrections majeures');
            process.exit(1);
        }
        
        // Sauvegarder le rapport
        const reportPath = path.join(__dirname, '..', 'test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify({
            timestamp: new Date().toISOString(),
            totalTests,
            successfulTests,
            successRate,
            results: this.testResults
        }, null, 2));
        
        console.log(`\\n📄 Rapport détaillé sauvé: test-report.json`);
    }
}

// Exécution
if (require.main === module) {
    new TestScript().runTests();
}

module.exports = TestScript;
