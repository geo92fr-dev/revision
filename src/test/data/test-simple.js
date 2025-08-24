// Test d'intégrité direct et simple
console.log('🔍 TEST D\'INTÉGRITÉ MATHÉMATIQUES 6ème');
console.log('=====================================');

async function runTests() {
    try {
        // Test 1: Import de l'index
        console.log('📦 Test 1: Import de l\'index...');
        const mathsIndex = await import('./src/data/mathematiques/6ieme/index.js');
        console.log('✅ Index importé avec succès');
        
        // Test 2: Vérification des 20 topics
        const topics = Object.keys(mathsIndex.default);
        console.log(`📊 Test 2: ${topics.length} topics trouvés`);
        if (topics.length === 20) {
            console.log('✅ Nombre de topics correct (20)');
        } else {
            throw new Error(`Nombre incorrect de topics: ${topics.length} au lieu de 20`);
        }
        
        // Test 3: Vérification topic spécifique (moyenne)
        console.log('🔢 Test 3: Vérification topic moyenne...');
        const moyenneData = mathsIndex.default.moyenne;
        if (moyenneData && moyenneData.niveau === '6ème') {
            console.log('✅ Topic moyenne correct');
        } else {
            throw new Error('Topic moyenne incorrect ou manquant');
        }
        
        // Test 4: Vérification topic nombres-entiers  
        console.log('🔢 Test 4: Vérification topic nombres-entiers...');
        const nombresEntiersData = mathsIndex.default['nombres-entiers'];
        if (nombresEntiersData && nombresEntiersData.titre === 'Nombres entiers naturels') {
            console.log('✅ Topic nombres-entiers correct');
        } else {
            throw new Error('Topic nombres-entiers incorrect ou manquant');
        }
        
        // Test 5: Import direct d'un fichier
        console.log('📄 Test 5: Import direct moyenne.js...');
        const moyenneModule = await import('./src/data/mathematiques/6ieme/moyenne.js');
        if (moyenneModule.moyenne6eme) {
            console.log('✅ Import direct moyenne.js réussi');
        } else {
            throw new Error('Export moyenne6eme manquant');
        }
        
        console.log();
        console.log('🎉 TOUS LES TESTS RÉUSSIS !');
        console.log('===========================');
        console.log('✅ Index fonctionnel');
        console.log('✅ 20 topics disponibles'); 
        console.log('✅ Exports corrects');
        console.log('✅ Structure cohérente');
        console.log();
        console.log('🚀 Le système est prêt !');
        
    } catch (error) {
        console.error('❌ ERREUR:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
}

runTests();
