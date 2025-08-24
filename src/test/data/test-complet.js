// Suite de tests complète pour mathématiques 6ème
console.log('🧪 SUITE DE TESTS COMPLÈTE - MATHÉMATIQUES 6ème');
console.log('================================================');
console.log();

let totalSuites = 0;
let passedSuites = 0;

// Test 1: Test d'intégrité de la structure
console.log('📋 TEST 1: Intégrité de la structure');
console.log('------------------------------------');
totalSuites++;
try {
    const { execSync } = require('child_process');
    execSync('node test-integrite.js', { stdio: 'inherit' });
    passedSuites++;
    console.log('✅ Test d\'intégrité: RÉUSSI\n');
} catch (error) {
    console.log('❌ Test d\'intégrité: ÉCHOUÉ\n');
}

// Test 2: Test des exports
console.log('📋 TEST 2: Intégrité des exports');
console.log('---------------------------------');
totalSuites++;
try {
    const { execSync } = require('child_process');
    execSync('node test-exports.js', { stdio: 'inherit' });
    passedSuites++;
    console.log('✅ Test des exports: RÉUSSI\n');
} catch (error) {
    console.log('❌ Test des exports: ÉCHOUÉ\n');
}

// Test 3: Test spécifique moyenne
console.log('📋 TEST 3: Test spécifique moyenne.js');
console.log('------------------------------------');
totalSuites++;
try {
    const { execSync } = require('child_process');
    execSync('node test-moyenne.js', { stdio: 'inherit' });
    passedSuites++;
    console.log('✅ Test moyenne.js: RÉUSSI\n');
} catch (error) {
    console.log('❌ Test moyenne.js: ÉCHOUÉ\n');
}

// Test 4: Test de l'index
console.log('📋 TEST 4: Test de l\'index');
console.log('---------------------------');
totalSuites++;
try {
    const { execSync } = require('child_process');
    execSync('node test-index.js', { stdio: 'inherit' });
    passedSuites++;
    console.log('✅ Test index: RÉUSSI\n');
} catch (error) {
    console.log('❌ Test index: ÉCHOUÉ\n');
}

// Résumé final
console.log('🏆 RÉSUMÉ FINAL DES TESTS');
console.log('========================');
console.log(`✅ Suites réussies: ${passedSuites}/${totalSuites}`);
console.log(`❌ Suites échouées: ${totalSuites - passedSuites}/${totalSuites}`);

if (passedSuites === totalSuites) {
    console.log();
    console.log('🎉 FÉLICITATIONS !');
    console.log('==================');
    console.log('✅ Tous les tests sont réussis');
    console.log('✅ 20 sujets de mathématiques 6ème fonctionnels');
    console.log('✅ Structure de données cohérente');
    console.log('✅ Exports corrects');
    console.log('✅ Index fonctionnel');
    console.log();
    console.log('🚀 Le système est prêt pour la production !');
} else {
    console.log();
    console.log('⚠️  Des problèmes ont été détectés.');
    console.log('Veuillez corriger les erreurs avant le déploiement.');
    process.exit(1);
}
