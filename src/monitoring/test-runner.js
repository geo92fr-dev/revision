// Test simple du système de monitoring
import AutomatedTester from './automated-tester.js';

console.log('🧪 Test du système de monitoring...');

const tester = new AutomatedTester();

try {
    await tester.runTests();
    console.log('✅ Test terminé avec succès !');
} catch (error) {
    console.error('❌ Erreur lors du test:', error);
    process.exit(1);
}
