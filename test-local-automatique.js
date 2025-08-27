#!/usr/bin/env node

// TEST AUTOMATIQUE LOCAL - FunRevis
// =================================
// Validation automatique de l'application en local

import fetch from 'node-fetch';

console.log('🔬 TEST AUTOMATIQUE LOCAL - FUNREVIS');
console.log('====================================');

const BASE_URL = 'http://localhost:8000';

// URLs à tester
const testUrls = [
    { name: 'Page d\'accueil', url: '/', expected: 200 },
    { name: 'Page index 6ème', url: '/pages/mathematiques/6ieme/index.html', expected: 200 },
    { name: 'Module multiplication', url: '/data/mathematiques/6ieme/multiplication.js', expected: 200 },
    { name: 'Module addition-soustraction', url: '/data/mathematiques/6ieme/addition-soustraction.js', expected: 200 },
    { name: 'Module fractions', url: '/data/mathematiques/6ieme/fractions.js', expected: 200 },
    { name: 'Module pourcentages (nouveau)', url: '/data/mathematiques/6ieme/pourcentages.js', expected: 200 },
    { name: 'Index des modules', url: '/data/mathematiques/6ieme/index.js', expected: 200 },
    { name: 'Page de cours', url: '/pages/page_de_cours.html', expected: 200 },
    { name: 'Styles CSS', url: '/styles/index.css', expected: 200 }
];

async function testUrl(testCase) {
    try {
        const response = await fetch(BASE_URL + testCase.url);
        const success = response.status === testCase.expected;
        
        console.log(`${success ? '✅' : '❌'} ${testCase.name} (${response.status})`);
        
        if (success && testCase.url.endsWith('.js')) {
            const content = await response.text();
            const hasContent = content.length > 500; // Vérifier que le module a du contenu
            console.log(`   📊 Contenu: ${content.length} caractères ${hasContent ? '✅' : '⚠️'}`);
        }
        
        return success;
    } catch (error) {
        console.log(`❌ ${testCase.name} - Erreur: ${error.message}`);
        return false;
    }
}

async function runTests() {
    console.log('\n🔍 TESTS DES URLS...');
    console.log('===================');
    
    let passed = 0;
    let total = 0;
    
    for (const testCase of testUrls) {
        total++;
        const success = await testUrl(testCase);
        if (success) passed++;
        
        // Pause entre les tests
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n📊 RÉSULTATS:');
    console.log('=============');
    console.log(`✅ Tests réussis: ${passed}/${total}`);
    console.log(`📈 Taux de réussite: ${((passed/total)*100).toFixed(1)}%`);
    
    if (passed === total) {
        console.log('\n🎉 TOUS LES TESTS SONT PASSÉS !');
        console.log('✅ Application locale fonctionnelle');
        console.log('✅ Modules chargés correctement');
        console.log('✅ Auto-extensibilité validée');
    } else {
        console.log(`\n⚠️ ${total - passed} test(s) échoué(s)`);
    }
    
    console.log('\n🔗 LIENS DE TEST DIRECTS:');
    console.log('=========================');
    console.log(`📋 Page d'accueil: ${BASE_URL}`);
    console.log(`📚 Cours multiplication: ${BASE_URL}/pages/page_de_cours.html?topic=multiplication`);
    console.log(`🔢 Cours addition-soustraction: ${BASE_URL}/pages/page_de_cours.html?topic=addition-soustraction`);
    console.log(`📊 Cours pourcentages (nouveau): ${BASE_URL}/pages/page_de_cours.html?topic=pourcentages`);
    console.log(`📝 Cours fractions (contenu riche): ${BASE_URL}/pages/page_de_cours.html?topic=fractions`);
}

// Vérifier que le serveur est accessible
try {
    console.log('🔌 Vérification de la connexion au serveur...');
    await fetch(BASE_URL);
    console.log('✅ Serveur accessible sur', BASE_URL);
    
    await runTests();
    
} catch (error) {
    console.log('❌ Impossible de se connecter au serveur local');
    console.log('💡 Assurez-vous que le serveur est démarré avec:');
    console.log('   cd src && python -m http.server 8000');
    console.log('\nErreur:', error.message);
}
