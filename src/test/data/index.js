// Index des tests de données mathématiques
// Centralise tous les tests de validation des données

import { TEST_CONFIG } from './config.js';

// Export des suites de tests disponibles
export { runSimpleTests } from './test-simple.js';
export { runExportTests } from './test-exports.js';
export { runIntegrityTests } from './test-integrite.js';
export { runIndexTests } from './test-index.js';
export { runCompleteTests } from './test-complet.js';
export { runFinalTests } from './test-final.js';

// Fonction principale pour exécuter tous les tests
export async function runAllDataTests() {
    console.log('🧪 SUITE COMPLÈTE DE TESTS - DONNÉES MATHÉMATIQUES');
    console.log('=================================================');
    
    const results = [];
    
    try {
        // Test simple
        console.log('\n📝 Tests simples...');
        const { runSimpleTests } = await import('./test-simple.js');
        const simpleResult = await runSimpleTests();
        results.push({ suite: 'Simple', ...simpleResult });
        
        // Test exports
        console.log('\n📤 Tests des exports...');
        const { runExportTests } = await import('./test-exports.js');
        const exportResult = await runExportTests();
        results.push({ suite: 'Exports', ...exportResult });
        
        // Test final complet
        console.log('\n🎯 Test final...');
        const { runFinalTests } = await import('./test-final.js');
        const finalResult = await runFinalTests();
        results.push({ suite: 'Final', ...finalResult });
        
        // Résumé global
        console.log('\n' + '='.repeat(50));
        console.log('📊 RÉSUMÉ GLOBAL DES TESTS');
        console.log('='.repeat(50));
        
        let totalPassed = 0;
        let totalTests = 0;
        
        results.forEach(result => {
            totalPassed += result.passed || 0;
            totalTests += result.total || 0;
            console.log(`${result.suite}: ${result.passed || 0}/${result.total || 0} (${result.percentage || 0}%)`);
        });
        
        const globalPercentage = Math.round((totalPassed / totalTests) * 100);
        console.log(`\n🎯 TOTAL: ${totalPassed}/${totalTests} (${globalPercentage}%)`);
        
        if (globalPercentage === 100) {
            console.log('🎉 TOUS LES TESTS SONT RÉUSSIS !');
        } else {
            console.log('⚠️  Certains tests ont échoué');
        }
        
        return {
            success: globalPercentage === 100,
            totalPassed,
            totalTests,
            percentage: globalPercentage,
            results
        };
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'exécution des tests:', error);
        return { success: false, error: error.message };
    }
}

// Export de la configuration pour usage externe
export { TEST_CONFIG };
