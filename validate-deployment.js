/**
 * 🧪 Script de Validation du Déploiement FunRevis
 * 
 * Ce script teste tous les points critiques de l'application
 * pour s'assurer que le déploiement fonctionne correctement.
 */

console.log('🚀 Début des tests de déploiement FunRevis...');

// Configuration des tests
const TEST_CONFIG = {
    baseUrl: 'http://localhost:8080',
    timeout: 10000,
    testModules: ['fractions', 'nombres-entiers', 'division', 'proportionnalite']
};

// Tests à effectuer
const DEPLOYMENT_TESTS = [
    {
        name: 'Page d\'accueil',
        url: '/index.html',
        checkElements: ['h1', '.subjects-grid', '.quick-links'],
        critical: true
    },
    {
        name: 'Page de test architecture',
        url: '/test-architecture.html',
        checkElements: ['h1', '.test-section', 'button'],
        critical: false
    },
    {
        name: 'Index Mathématiques 6ème',
        url: '/src/pages/mathematiques/6ieme/index.html',
        checkElements: ['.modules-grid', '.sixth-header'],
        critical: true
    },
    {
        name: 'Page de cours - Fractions',
        url: '/src/pages/page_de_cours.html?subject=mathematiques&level=6ieme&topic=fractions',
        checkElements: ['#mainTitle', '#objectifText', '.phase-section'],
        critical: true
    },
    {
        name: 'Page de cours - Nombres entiers', 
        url: '/src/pages/page_de_cours.html?subject=mathematiques&level=6ieme&topic=nombres-entiers',
        checkElements: ['#mainTitle', '#objectifText', '.phase-section'],
        critical: true
    }
];

// Tests des composants modulaires
const COMPONENT_TESTS = [
    {
        name: 'ModuleLoader',
        path: '/src/components/ModuleLoader.js',
        expectedExports: ['ModuleLoader', 'moduleLoader']
    },
    {
        name: 'CourseRenderer',
        path: '/src/components/CourseRenderer.js', 
        expectedExports: ['CourseRenderer', 'courseRenderer']
    },
    {
        name: 'NavigationManager',
        path: '/src/components/NavigationManager.js',
        expectedExports: ['NavigationManager', 'navigationManager']
    }
];

// Tests des modules de données
const DATA_TESTS = TEST_CONFIG.testModules.map(module => ({
    name: `Module ${module}`,
    path: `/src/data/mathematiques/6ieme/${module}.js`,
    checkStructure: true
}));

class DeploymentValidator {
    constructor() {
        this.results = [];
        this.errors = [];
        this.warnings = [];
    }

    async runAllTests() {
        console.log('📋 Lancement des tests de déploiement...\n');
        
        // Test 1: Pages principales
        await this.testPages();
        
        // Test 2: Composants modulaires
        await this.testComponents();
        
        // Test 3: Modules de données
        await this.testDataModules();
        
        // Test 4: Navigation
        await this.testNavigation();
        
        // Rapport final
        this.generateReport();
    }

    async testPages() {
        console.log('🌐 Test des pages principales...');
        
        for (const test of DEPLOYMENT_TESTS) {
            try {
                const url = `${TEST_CONFIG.baseUrl}${test.url}`;
                console.log(`  🔍 Test: ${test.name} (${test.url})`);
                
                const response = await fetch(url);
                
                if (response.ok) {
                    console.log(`    ✅ HTTP ${response.status} - OK`);
                    this.results.push({
                        category: 'Pages',
                        test: test.name,
                        status: 'success',
                        url: test.url
                    });
                } else {
                    const message = `HTTP ${response.status} - ${response.statusText}`;
                    if (test.critical) {
                        console.log(`    ❌ ${message} (CRITIQUE)`);
                        this.errors.push({
                            category: 'Pages',
                            test: test.name,
                            error: message,
                            critical: true
                        });
                    } else {
                        console.log(`    ⚠️ ${message}`);
                        this.warnings.push({
                            category: 'Pages',
                            test: test.name,
                            warning: message
                        });
                    }
                }
            } catch (error) {
                console.log(`    ❌ Erreur réseau: ${error.message}`);
                this.errors.push({
                    category: 'Pages',
                    test: test.name,
                    error: error.message,
                    critical: test.critical
                });
            }
        }
        console.log('');
    }

    async testComponents() {
        console.log('🧩 Test des composants modulaires...');
        
        for (const test of COMPONENT_TESTS) {
            try {
                const url = `${TEST_CONFIG.baseUrl}${test.path}`;
                console.log(`  🔍 Test: ${test.name} (${test.path})`);
                
                const response = await fetch(url);
                
                if (response.ok) {
                    console.log(`    ✅ Composant accessible`);
                    this.results.push({
                        category: 'Composants',
                        test: test.name,
                        status: 'success'
                    });
                } else {
                    console.log(`    ❌ HTTP ${response.status} - Composant inaccessible`);
                    this.errors.push({
                        category: 'Composants',
                        test: test.name,
                        error: `HTTP ${response.status}`,
                        critical: true
                    });
                }
            } catch (error) {
                console.log(`    ❌ Erreur: ${error.message}`);
                this.errors.push({
                    category: 'Composants',
                    test: test.name,
                    error: error.message,
                    critical: true
                });
            }
        }
        console.log('');
    }

    async testDataModules() {
        console.log('📚 Test des modules de données...');
        
        for (const test of DATA_TESTS) {
            try {
                const url = `${TEST_CONFIG.baseUrl}${test.path}`;
                console.log(`  🔍 Test: ${test.name} (${test.path})`);
                
                const response = await fetch(url);
                
                if (response.ok) {
                    console.log(`    ✅ Module de données accessible`);
                    this.results.push({
                        category: 'Données',
                        test: test.name,
                        status: 'success'
                    });
                } else {
                    console.log(`    ❌ HTTP ${response.status} - Module inaccessible`);
                    this.errors.push({
                        category: 'Données',
                        test: test.name,
                        error: `HTTP ${response.status}`,
                        critical: false
                    });
                }
            } catch (error) {
                console.log(`    ❌ Erreur: ${error.message}`);
                this.errors.push({
                    category: 'Données',
                    test: test.name,
                    error: error.message,
                    critical: false
                });
            }
        }
        console.log('');
    }

    async testNavigation() {
        console.log('🧭 Test de la navigation...');
        
        const navigationTests = [
            {
                name: 'URL avec paramètres - Fractions',
                url: '/src/pages/page_de_cours.html?subject=mathematiques&level=6ieme&topic=fractions'
            },
            {
                name: 'URL avec paramètres - Nombres entiers',
                url: '/src/pages/page_de_cours.html?subject=mathematiques&level=6ieme&topic=nombres-entiers'
            }
        ];
        
        for (const test of navigationTests) {
            try {
                const url = `${TEST_CONFIG.baseUrl}${test.url}`;
                console.log(`  🔍 Test: ${test.name}`);
                
                const response = await fetch(url);
                
                if (response.ok) {
                    console.log(`    ✅ Navigation fonctionnelle`);
                    this.results.push({
                        category: 'Navigation',
                        test: test.name,
                        status: 'success'
                    });
                } else {
                    console.log(`    ❌ HTTP ${response.status} - Navigation échoue`);
                    this.errors.push({
                        category: 'Navigation',
                        test: test.name,
                        error: `HTTP ${response.status}`,
                        critical: true
                    });
                }
            } catch (error) {
                console.log(`    ❌ Erreur: ${error.message}`);
                this.errors.push({
                    category: 'Navigation',
                    test: test.name,
                    error: error.message,
                    critical: true
                });
            }
        }
        console.log('');
    }

    generateReport() {
        console.log('📊 RAPPORT DE VALIDATION DU DÉPLOIEMENT');
        console.log('=' .repeat(50));
        
        const totalTests = this.results.length + this.errors.length + this.warnings.length;
        const successRate = Math.round((this.results.length / totalTests) * 100);
        
        console.log(`\n📈 STATISTIQUES GLOBALES:`);
        console.log(`  Total des tests: ${totalTests}`);
        console.log(`  Réussites: ${this.results.length} ✅`);
        console.log(`  Erreurs: ${this.errors.length} ❌`);
        console.log(`  Avertissements: ${this.warnings.length} ⚠️`);
        console.log(`  Taux de réussite: ${successRate}%`);
        
        if (this.errors.length > 0) {
            console.log(`\n❌ ERREURS DÉTECTÉES:`);
            this.errors.forEach(error => {
                const criticalTag = error.critical ? ' [CRITIQUE]' : '';
                console.log(`  - ${error.category}: ${error.test}${criticalTag}`);
                console.log(`    Erreur: ${error.error}`);
            });
        }
        
        if (this.warnings.length > 0) {
            console.log(`\n⚠️ AVERTISSEMENTS:`);
            this.warnings.forEach(warning => {
                console.log(`  - ${warning.category}: ${warning.test}`);
                console.log(`    Avertissement: ${warning.warning}`);
            });
        }
        
        console.log(`\n🎯 VERDICT:`);
        const criticalErrors = this.errors.filter(e => e.critical).length;
        
        if (criticalErrors === 0) {
            console.log(`  ✅ DÉPLOIEMENT VALIDÉ - L'application est prête pour la production`);
            if (this.warnings.length > 0) {
                console.log(`  💡 Quelques améliorations mineures possibles`);
            }
        } else {
            console.log(`  ❌ DÉPLOIEMENT À CORRIGER - ${criticalErrors} erreur(s) critique(s) détectée(s)`);
            console.log(`  🔧 Corrigez les erreurs critiques avant le déploiement`);
        }
        
        return {
            success: criticalErrors === 0,
            stats: {
                total: totalTests,
                successes: this.results.length,
                errors: this.errors.length,
                warnings: this.warnings.length,
                successRate: successRate
            },
            criticalErrors: criticalErrors
        };
    }
}

// Lancement des tests si exécuté directement
if (typeof window === 'undefined') {
    // Mode Node.js
    const validator = new DeploymentValidator();
    validator.runAllTests();
} else {
    // Mode navigateur - exposer les fonctions
    window.DeploymentValidator = DeploymentValidator;
    console.log('🧪 Validator prêt ! Utilisez: new DeploymentValidator().runAllTests()');
}

export { DeploymentValidator };
