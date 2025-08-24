// Test pour vérifier l'import depuis l'index
import mathsIndex from './src/data/mathematiques/6ieme/index.js';

console.log('🧪 Test de l\'index mathématiques 6ème');

try {
    // Test 1: Vérifier que l'index est défini
    if (mathsIndex) {
        console.log('✅ Test 1 réussi: Index défini');
    } else {
        console.log('❌ Test 1 échoué: Index undefined');
        process.exit(1);
    }

    // Test 2: Vérifier que moyenne est dans l'index
    if (mathsIndex.moyenne) {
        console.log('✅ Test 2 réussi: Topic "moyenne" trouvé dans l\'index');
    } else {
        console.log('❌ Test 2 échoué: Topic "moyenne" manquant');
        console.log('Topics disponibles:', Object.keys(mathsIndex));
        process.exit(1);
    }

    // Test 3: Vérifier que nombres-entiers est dans l'index
    if (mathsIndex['nombres-entiers']) {
        console.log('✅ Test 3 réussi: Topic "nombres-entiers" trouvé dans l\'index');
    } else {
        console.log('❌ Test 3 échoué: Topic "nombres-entiers" manquant');
        process.exit(1);
    }

    // Test 4: Vérifier la structure du topic moyenne
    const moyenneData = mathsIndex.moyenne;
    if (moyenneData.chapitre && moyenneData.niveau) {
        console.log('✅ Test 4 réussi: Structure du topic moyenne correcte');
        console.log('   - Chapitre:', moyenneData.chapitre);
        console.log('   - Niveau:', moyenneData.niveau);
    } else {
        console.log('❌ Test 4 échoué: Structure du topic moyenne incorrecte');
        console.log('   - Clés disponibles:', Object.keys(moyenneData));
        process.exit(1);
    }

    // Test 5: Compter tous les topics
    const topics = Object.keys(mathsIndex);
    console.log(`✅ Test 5: ${topics.length} topics trouvés dans l'index`);
    console.log('Topics:', topics.join(', '));

    console.log('🎉 Tous les tests index sont réussis !');

} catch (error) {
    console.error('❌ Erreur lors des tests index:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
}
