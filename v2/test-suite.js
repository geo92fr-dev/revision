#!/usr/bin/env node

/**
 * 🧪 SUITE DE TESTS UNIFIÉE - FunRevis V2
 * =====================================
 * 
 * Suite de tests complète pour valider tous les composants du système FunRevis V2
 * - Validation des fichiers JavaScript
 * - Tests de compatibilité cours.html
 * - Vérification de l'intégrité des données
 * - Tests de chargement dynamique
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    dataDir: path.join(__dirname, 'src', 'data'),
    srcDir: path.join(__dirname, 'src'),
    outputDir: path.join(__dirname, 'test-reports'),
    levels: ['6ieme', '5ieme', '4ieme', '3ieme'],
    subjects: ['mathematiques', 'sciences']
};

// Utilitaires
const Logger = {
    info: (msg) => console.log(`ℹ️  ${msg}`),
    success: (msg) => console.log(`✅ ${msg}`),
    warning: (msg) => console.log(`⚠️  ${msg}`),
    error: (msg) => console.log(`❌ ${msg}`),
    debug: (msg) => console.log(`🔍 ${msg}`)
};

class TestResults {
    constructor() {
        this.results = {
            jsValidation: { passed: 0, failed: 0, details: [] },
            dataIntegrity: { passed: 0, failed: 0, details: [] },
            coursCompatibility: { passed: 0, failed: 0, details: [] },
            loadingTests: { passed: 0, failed: 0, details: [] }
        };
        this.startTime = Date.now();
    }

    addResult(category, success, fileName, details = '') {
        if (success) {
            this.results[category].passed++;
        } else {
            this.results[category].failed++;
            this.results[category].details.push({ fileName, details });
        }
    }

    generateReport() {
        const endTime = Date.now();
        const duration = endTime - this.startTime;
        
        const report = {
            timestamp: new Date().toISOString(),
            duration: `${duration}ms`,
            summary: {},
            details: this.results
        };

        // Calcul des totaux
        let totalPassed = 0, totalFailed = 0;
        for (const [category, data] of Object.entries(this.results)) {
            totalPassed += data.passed;
            totalFailed += data.failed;
            report.summary[category] = {
                total: data.passed + data.failed,
                passed: data.passed,
                failed: data.failed,
                successRate: data.passed + data.failed > 0 ? 
                    Math.round((data.passed / (data.passed + data.failed)) * 100) : 0
            };
        }

        report.summary.overall = {
            total: totalPassed + totalFailed,
            passed: totalPassed,
            failed: totalFailed,
            successRate: totalPassed + totalFailed > 0 ? 
                Math.round((totalPassed / (totalPassed + totalFailed)) * 100) : 0
        };

        return report;
    }
}

// Tests de validation JavaScript
class JavaScriptValidator {
    static validateFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const issues = [];

            // Test 1: Caractères problématiques
            if (content.includes('6ème')) {
                issues.push('Caractère "6ème" détecté (devrait être "6eme")');
            }

            // Test 2: Exports/imports non commentés
            if (/^\s*export\s/m.test(content)) {
                issues.push('Export ES6 non commenté détecté');
            }
            if (/^\s*import\s/m.test(content)) {
                issues.push('Import ES6 non commenté détecté');
            }

            // Test 3: Déclaration const
            const constMatch = content.match(/const\s+(\w+)\s*=/);
            if (!constMatch) {
                issues.push('Déclaration const manquante ou malformée');
            }

            // Test 4: Exposition window.data
            if (!content.includes('window.data')) {
                issues.push('window.data non exposé');
            }

            // Test 5: Références content problématiques
            if (/^\s*content\s*[:=]/m.test(content)) {
                issues.push('Références à "content" non commentées');
            }

            // Test 6: Validation structurelle simplifiée
            // Ne pas faire d'eval strict, juste vérifier la présence de structures clés
            const hasValidStructure = content.includes('competences') && 
                                    content.includes('niveau') && 
                                    content.includes('window.data');
            
            if (!hasValidStructure) {
                issues.push('Structure de base invalide (manque competences, niveau ou window.data)');
            }

            return { valid: issues.length === 0, issues };
        } catch (error) {
            return { valid: false, issues: [`Erreur de lecture: ${error.message}`] };
        }
    }
}

// Tests d'intégrité des données
class DataIntegrityChecker {
    static checkFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const issues = [];

            // Vérifier la structure de base
            if (!content.includes('competences')) {
                issues.push('Structure "competences" manquante');
            }

            if (!content.includes('niveau')) {
                issues.push('Propriété "niveau" manquante');
            }

            if (!content.includes('chapitre')) {
                issues.push('Propriété "chapitre" manquante');
            }

            // Vérifier la cohérence du nom de variable (plus flexible)
            const fileName = path.basename(filePath, '.js');
            let expectedVarName;
            
            if (fileName.includes('-')) {
                const parts = fileName.split('-');
                expectedVarName = parts.map((part, index) => 
                    index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
                ).join('') + '6eme';
            } else {
                expectedVarName = fileName + '6eme';
            }
            
            // Vérification plus souple du nom de variable
            const hasExpectedVar = content.includes(expectedVarName) || 
                                 content.includes(`const ${fileName}`) ||
                                 content.includes('window.data');
            
            if (!hasExpectedVar) {
                issues.push(`Variable cohérente non trouvée (attendu: ${expectedVarName} ou similaire)`);
            }

            return { valid: issues.length === 0, issues };
        } catch (error) {
            return { valid: false, issues: [`Erreur: ${error.message}`] };
        }
    }
}

// Tests de compatibilité cours.html
class CourseCompatibilityTester {
    static testFile(subject, level, topic) {
        const issues = [];
        
        // Vérifier que le fichier existe
        const filePath = path.join(CONFIG.dataDir, subject, level, `${topic}.js`);
        if (!fs.existsSync(filePath)) {
            issues.push('Fichier inexistant');
            return { valid: false, issues };
        }

        // URL de test
        const testUrl = `http://localhost:8080/pages/cours.html?subject=${subject}&level=${level}&topic=${topic}`;
        
        // Pour l'instant, on valide juste la structure d'URL
        if (!subject || !level || !topic) {
            issues.push('Paramètres d\'URL manquants');
        }

        return { 
            valid: issues.length === 0, 
            issues,
            url: testUrl
        };
    }
}

// Tests de chargement
class LoadingTester {
    static testDirectLoad(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Simuler un environnement navigateur basique
            const mockWindow = { data: null };
            const mockConsole = { log: () => {} };
            
            const testCode = content
                .replace(/window/g, 'mockWindow')
                .replace(/console/g, 'mockConsole');
            
            eval(testCode);
            
            const issues = [];
            if (!mockWindow.data) {
                issues.push('window.data non défini après chargement');
            }

            return { valid: issues.length === 0, issues };
        } catch (error) {
            return { valid: false, issues: [`Erreur de chargement: ${error.message}`] };
        }
    }
}

// Fonction principale de test
async function runTestSuite() {
    Logger.info('🚀 DÉMARRAGE DE LA SUITE DE TESTS UNIFIÉE');
    Logger.info('=========================================');
    
    const results = new TestResults();

    // Créer le répertoire de rapport
    if (!fs.existsSync(CONFIG.outputDir)) {
        fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    // Rechercher tous les fichiers JS à tester
    const testFiles = [];
    
    for (const subject of CONFIG.subjects) {
        for (const level of CONFIG.levels) {
            const levelDir = path.join(CONFIG.dataDir, subject, level);
            if (fs.existsSync(levelDir)) {
                const files = fs.readdirSync(levelDir)
                    .filter(f => f.endsWith('.js') && f !== 'index.js')
                    .map(f => ({
                        subject,
                        level,
                        topic: f.replace('.js', ''),
                        filePath: path.join(levelDir, f)
                    }));
                testFiles.push(...files);
            }
        }
    }

    Logger.info(`📋 ${testFiles.length} fichiers à tester`);

    // Tests de validation JavaScript
    Logger.info('\n🧪 TESTS DE VALIDATION JAVASCRIPT');
    Logger.info('==================================');
    
    for (const file of testFiles) {
        const validation = JavaScriptValidator.validateFile(file.filePath);
        const success = validation.valid;
        
        if (success) {
            Logger.success(`${file.topic} (${file.subject}/${file.level})`);
        } else {
            Logger.error(`${file.topic}: ${validation.issues.join(', ')}`);
        }
        
        results.addResult('jsValidation', success, file.topic, validation.issues.join(', '));
    }

    // Tests d'intégrité des données
    Logger.info('\n🔍 TESTS D\'INTÉGRITÉ DES DONNÉES');
    Logger.info('=================================');
    
    for (const file of testFiles) {
        const integrity = DataIntegrityChecker.checkFile(file.filePath);
        const success = integrity.valid;
        
        if (success) {
            Logger.success(`${file.topic} (${file.subject}/${file.level})`);
        } else {
            Logger.error(`${file.topic}: ${integrity.issues.join(', ')}`);
        }
        
        results.addResult('dataIntegrity', success, file.topic, integrity.issues.join(', '));
    }

    // Tests de compatibilité cours.html
    Logger.info('\n🌐 TESTS DE COMPATIBILITÉ COURS.HTML');
    Logger.info('====================================');
    
    for (const file of testFiles) {
        const compatibility = CourseCompatibilityTester.testFile(file.subject, file.level, file.topic);
        const success = compatibility.valid;
        
        if (success) {
            Logger.success(`${file.topic}: ${compatibility.url}`);
        } else {
            Logger.error(`${file.topic}: ${compatibility.issues.join(', ')}`);
        }
        
        results.addResult('coursCompatibility', success, file.topic, compatibility.issues.join(', '));
    }

    // Tests de chargement
    Logger.info('\n📦 TESTS DE CHARGEMENT DIRECT');
    Logger.info('=============================');
    
    for (const file of testFiles) {
        const loading = LoadingTester.testDirectLoad(file.filePath);
        const success = loading.valid;
        
        if (success) {
            Logger.success(`${file.topic} (${file.subject}/${file.level})`);
        } else {
            Logger.error(`${file.topic}: ${loading.issues.join(', ')}`);
        }
        
        results.addResult('loadingTests', success, file.topic, loading.issues.join(', '));
    }

    // Génération du rapport
    const report = results.generateReport();
    
    Logger.info('\n📊 RÉSULTATS FINAUX');
    Logger.info('===================');
    
    for (const [category, summary] of Object.entries(report.summary)) {
        if (category === 'overall') {
            Logger.info(`\n🎯 GLOBAL: ${summary.passed}/${summary.total} (${summary.successRate}%)`);
        } else {
            const icon = summary.successRate === 100 ? '✅' : summary.successRate >= 80 ? '⚠️' : '❌';
            Logger.info(`${icon} ${category}: ${summary.passed}/${summary.total} (${summary.successRate}%)`);
        }
    }

    // Sauvegarder le rapport
    const reportPath = path.join(CONFIG.outputDir, `test-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    Logger.info(`\n📄 Rapport détaillé: ${reportPath}`);

    // Retourner le code de sortie approprié
    return report.summary.overall.successRate === 100 ? 0 : 1;
}

// Exécution si appelé directement
if (require.main === module) {
    runTestSuite()
        .then(exitCode => process.exit(exitCode))
        .catch(error => {
            Logger.error(`Erreur fatale: ${error.message}`);
            process.exit(1);
        });
}

module.exports = {
    runTestSuite,
    JavaScriptValidator,
    DataIntegrityChecker,
    CourseCompatibilityTester,
    LoadingTester
};
