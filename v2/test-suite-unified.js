#!/usr/bin/env node

/**
 * 🧪 SUITE DE TESTS UNIFIÉE - FunRevis V2
 * =======================================
 * 
 * Tests complets pour validation JS et intégration cours.html
 * Rationalisation de tous les systèmes de tests existants
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 SUITE DE TESTS FUNREVIS V2 - VALIDATION COMPLÈTE');
console.log('===================================================');

class TestSuite {
    constructor() {
        this.srcDir = path.join(__dirname, 'src');
        this.dataDir = path.join(this.srcDir, 'data');
        this.results = {
            syntax: { passed: 0, failed: 0, errors: [] },
            structure: { passed: 0, failed: 0, errors: [] },
            integration: { passed: 0, failed: 0, errors: [] },
            loading: { passed: 0, failed: 0, errors: [] }
        };
    }

    // 🔍 Recherche des fichiers JS de données
    findDataFiles() {
        const files = [];
        const findJS = (dir, prefix = '') => {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const itemPath = path.join(dir, item);
                const stat = fs.statSync(itemPath);
                
                if (stat.isDirectory()) {
                    findJS(itemPath, prefix ? `${prefix}/${item}` : item);
                } else if (item.endsWith('.js') && !item.includes('index.js')) {
                    files.push({
                        name: item.replace('.js', ''),
                        path: itemPath,
                        relativePath: prefix ? `${prefix}/${item}` : item,
                        category: prefix.split('/')[0] || 'root',
                        level: prefix.split('/')[1] || 'general'
                    });
                }
            }
        };
        
        findJS(this.dataDir);
        return files;
    }

    // ✅ Test 1: Validation syntaxique JavaScript
    testSyntax(file) {
        try {
            const content = fs.readFileSync(file.path, 'utf8');
            
            // Vérifications basiques
            if (!content.trim()) {
                throw new Error('Fichier vide');
            }

            // Test de parsing JavaScript (moins strict)
            const hasValidStructure = content.includes('const ') && content.includes('{');
            const hasValidEnding = content.includes('}');
            const hasWindowExposure = content.includes('window.data');
            
            if (!hasValidStructure) {
                throw new Error('Structure const manquante');
            }
            
            if (!hasValidEnding) {
                throw new Error('Accolades mal fermées');
            }

            if (!hasWindowExposure) {
                throw new Error('Exposition window.data manquante');
            }

            this.results.syntax.passed++;
            return { success: true };
            
        } catch (error) {
            this.results.syntax.failed++;
            this.results.syntax.errors.push(`${file.name}: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    // 🏗️ Test 2: Validation structure de données
    testStructure(file) {
        try {
            const content = fs.readFileSync(file.path, 'utf8');
            
            // Déterminer le nom de variable réel selon le type de fichier
            let expectedVarName;
            if (file.category === 'anglais' || file.category === 'francais') {
                expectedVarName = `${file.category}${file.name.charAt(0).toUpperCase() + file.name.slice(1)}`;
            } else if (file.category === 'mathematiques' && file.level === '6ieme') {
                expectedVarName = file.name.replace(/-/g, '') + '6eme';
            } else if (file.category === 'mathematiques' && file.level === '5ieme') {
                expectedVarName = file.name.replace(/[^a-zA-Z0-9]/g, '');
            } else {
                expectedVarName = file.name;
            }
            
            // Vérifications structure communes
            const hasConstDeclaration = content.includes(`const ${expectedVarName}`);
            const hasCorrectExposure = content.includes(`window.data = ${expectedVarName}`);
            
            // Vérifications des propriétés requises
            const hasNiveau = content.includes('"niveau"') || content.includes("'niveau'");
            const hasChapitre = content.includes('"chapitre"') || content.includes("'chapitre'");
            const hasCompetences = content.includes('"competences"') || content.includes("'competences'");
            
            const errors = [];
            if (!hasConstDeclaration) errors.push(`Déclaration const ${expectedVarName} incorrecte`);
            if (!hasNiveau) errors.push('Propriété niveau manquante');
            if (!hasChapitre) errors.push('Propriété chapitre manquante');
            if (!hasCompetences) errors.push('Propriété competences manquante');
            if (!hasCorrectExposure) errors.push(`Exposition window.data = ${expectedVarName} incorrecte`);
            
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            this.results.structure.passed++;
            return { success: true };
            
        } catch (error) {
            this.results.structure.failed++;
            this.results.structure.errors.push(`${file.name}: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    // 🔗 Test 3: Intégration cours.html
    testIntegration(file) {
        try {
            // URL de test pour cours.html
            const url = `http://localhost:8080/pages/cours.html?subject=${file.category}&level=${file.level}&topic=${file.name}`;
            
            // Vérification que le fichier peut être intégré
            const content = fs.readFileSync(file.path, 'utf8');
            const hasValidFormat = content.includes('window.data') && content.includes('competences');
            
            if (!hasValidFormat) {
                throw new Error('Format incompatible cours.html');
            }

            this.results.integration.passed++;
            return { success: true, url };
            
        } catch (error) {
            this.results.integration.failed++;
            this.results.integration.errors.push(`${file.name}: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    // 📥 Test 4: Test de chargement simulé
    testLoading(file) {
        try {
            const content = fs.readFileSync(file.path, 'utf8');
            
            // Simulation du chargement dans un environnement browser-like
            const mockWindow = { data: null };
            const mockConsole = { log: () => {} };
            
            // Exécution du code avec des globals mockés
            const wrappedCode = `
                (function() {
                    const window = arguments[0];
                    const console = arguments[1];
                    ${content}
                })(arguments[0], arguments[1]);
            `;
            
            // Test si le code s'exécute sans erreur
            try {
                eval(wrappedCode)(mockWindow, mockConsole);
                
                if (!mockWindow.data) {
                    throw new Error('window.data non défini après chargement');
                }
                
                this.results.loading.passed++;
                return { success: true };
                
            } catch (execError) {
                throw new Error(`Erreur d'exécution: ${execError.message}`);
            }
            
        } catch (error) {
            this.results.loading.failed++;
            this.results.loading.errors.push(`${file.name}: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    // 🏷️ Calculer le nom de variable attendu
    getExpectedVariableName(filename) {
        // Pour les fichiers mathématiques 6ème
        if (filename.includes('-')) {
            return filename.replace(/-/g, '') + '6eme';
        }
        // Pour les fichiers 5ème
        else if (filename.includes('5e_')) {
            return filename.replace(/[^a-zA-Z0-9]/g, '');
        }
        // Pour les fichiers anglais/français
        else if (['cinquieme', 'sixieme', 'quatrieme', 'troisieme'].includes(filename)) {
            // Le correcteur génère: anglaisCinquieme, francaisCinquieme, etc.
            return filename; // Le sujet sera ajouté dans le test
        }
        // Pour legacyConverter et reference
        else {
            return filename;
        }
    }

    // 🚀 Exécution de tous les tests
    async runAllTests() {
        const files = this.findDataFiles();
        
        console.log(`🔍 ${files.length} fichiers trouvés pour les tests\n`);

        for (const file of files) {
            console.log(`📄 Test: ${file.name} (${file.category}/${file.level})`);

            // Test 1: Syntaxe
            const syntaxResult = this.testSyntax(file);
            if (syntaxResult.success) {
                console.log('  ✅ Syntaxe: OK');
            } else {
                console.log(`  ❌ Syntaxe: ${syntaxResult.error}`);
            }

            // Test 2: Structure
            const structureResult = this.testStructure(file);
            if (structureResult.success) {
                console.log('  ✅ Structure: OK');
            } else {
                console.log(`  ❌ Structure: ${structureResult.error}`);
            }

            // Test 3: Intégration
            const integrationResult = this.testIntegration(file);
            if (integrationResult.success) {
                console.log('  ✅ Intégration: OK');
                console.log(`  🌐 URL: ${integrationResult.url}`);
            } else {
                console.log(`  ❌ Intégration: ${integrationResult.error}`);
            }

            // Test 4: Chargement
            const loadingResult = this.testLoading(file);
            if (loadingResult.success) {
                console.log('  ✅ Chargement: OK');
            } else {
                console.log(`  ❌ Chargement: ${loadingResult.error}`);
            }

            console.log('');
        }

        this.displayResults();
        this.generateReport();
    }

    // 📊 Affichage des résultats
    displayResults() {
        console.log('📊 RÉSULTATS FINAUX');
        console.log('===================');
        
        const total = this.results.syntax.passed + this.results.syntax.failed;
        
        console.log(`🔧 Validation JavaScript: ${this.results.syntax.passed}/${total} (${Math.round((this.results.syntax.passed/total)*100)}%)`);
        console.log(`🏗️ Structure données: ${this.results.structure.passed}/${total} (${Math.round((this.results.structure.passed/total)*100)}%)`);
        console.log(`🔗 Compatibilité cours.html: ${this.results.integration.passed}/${total} (${Math.round((this.results.integration.passed/total)*100)}%)`);
        console.log(`📥 Tests de chargement: ${this.results.loading.passed}/${total} (${Math.round((this.results.loading.passed/total)*100)}%)`);

        // Erreurs détaillées
        if (this.results.syntax.errors.length > 0) {
            console.log('\n❌ ERREURS SYNTAXE:');
            this.results.syntax.errors.forEach(error => console.log(`   ${error}`));
        }

        if (this.results.structure.errors.length > 0) {
            console.log('\n❌ ERREURS STRUCTURE:');
            this.results.structure.errors.forEach(error => console.log(`   ${error}`));
        }

        if (this.results.integration.errors.length > 0) {
            console.log('\n❌ ERREURS INTÉGRATION:');
            this.results.integration.errors.forEach(error => console.log(`   ${error}`));
        }

        if (this.results.loading.errors.length > 0) {
            console.log('\n❌ ERREURS CHARGEMENT:');
            this.results.loading.errors.forEach(error => console.log(`   ${error}`));
        }

        // Statut global
        const allPassed = 
            this.results.syntax.failed === 0 && 
            this.results.structure.failed === 0 && 
            this.results.integration.failed === 0 && 
            this.results.loading.failed === 0;

        if (allPassed) {
            console.log('\n🎉 TOUS LES TESTS RÉUSSIS !');
        } else {
            console.log(`\n⚠️  ${this.results.syntax.failed + this.results.structure.failed + this.results.integration.failed + this.results.loading.failed} test(s) échoué(s)`);
            process.exit(1);
        }
    }

    // 📄 Génération du rapport
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                total: this.results.syntax.passed + this.results.syntax.failed,
                syntax: this.results.syntax,
                structure: this.results.structure,
                integration: this.results.integration,
                loading: this.results.loading
            }
        };

        fs.writeFileSync(
            path.join(__dirname, 'test-report.json'),
            JSON.stringify(report, null, 2)
        );
        
        console.log('\n📄 Rapport sauvegardé: test-report.json');
    }
}

// 🚀 Exécution
if (require.main === module) {
    const suite = new TestSuite();
    suite.runAllTests().catch(console.error);
}
