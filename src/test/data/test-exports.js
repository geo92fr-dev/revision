// Test d'intégrité des exports pour tous les fichiers
console.log('🔍 Test d\'intégrité des exports - Mathématiques 6ème');
console.log('=================================================');

const expectedTopics = [
    'addition-soustraction', 'multiplication', 'division', 'figures-planes', 
    'perimetre', 'fractions', 'proportionnalite', 'nombres-entiers', 
    'nombres-decimaux', 'fractions-simples', 'symetrie-axiale', 'aires-figures',
    'constructions-geometriques', 'unites-longueur', 'unites-masse-capacite', 
    'durees', 'lecture-tableaux', 'graphiques', 'algebre', 'moyenne'
];

let totalTests = 0;
let passedTests = 0;
let failedImports = [];

console.log(`📊 ${expectedTopics.length} fichiers à tester`);
console.log();

for (const topic of expectedTopics) {
    totalTests++;
    console.log(`🧪 Test import: ${topic}.js`);
    
    try {
        const module = await import(`./src/data/mathematiques/6ieme/${topic}.js`);
        
        // Convertir le topic en camelCase + 6eme pour l'export nommé
        const topicCamelCase = topic.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        const expectedExportName = `${topicCamelCase}6eme`;
        
        // Test export nommé
        if (module[expectedExportName]) {
            console.log(`   ✅ Export nommé: ${expectedExportName}`);
        } else {
            throw new Error(`Export nommé manquant: ${expectedExportName}. Exports disponibles: ${Object.keys(module).join(', ')}`);
        }
        
        // Test export par défaut si présent
        if (module.default) {
            console.log(`   ✅ Export par défaut présent`);
        } else {
            console.log(`   ⚠️  Export par défaut absent (pas obligatoire)`);
        }
        
        // Vérifier la cohérence entre export nommé et index
        const indexModule = await import('./src/data/mathematiques/6ieme/index.js');
        if (indexModule.default[topic] === module[expectedExportName]) {
            console.log(`   ✅ Cohérence avec l'index`);
        } else {
            throw new Error('Incohérence entre export et index');
        }
        
        passedTests++;
        
    } catch (error) {
        console.log(`   ❌ Erreur: ${error.message}`);
        failedImports.push({
            topic: topic,
            error: error.message
        });
    }
    
    console.log();
}

console.log('📊 RÉSULTATS DU TEST D\'EXPORTS');
console.log('==============================');
console.log(`✅ Tests réussis: ${passedTests}/${totalTests}`);
console.log(`❌ Tests échoués: ${totalTests - passedTests}/${totalTests}`);

if (failedImports.length > 0) {
    console.log();
    console.log('🚨 FICHIERS AVEC ERREURS:');
    failedImports.forEach(item => {
        console.log(`   - ${item.topic}.js: ${item.error}`);
    });
    process.exit(1);
} else {
    console.log();
    console.log('🎉 TOUS LES EXPORTS SONT CORRECTS !');
    console.log('Tous les fichiers exportent correctement leurs données.');
}
