// Test spécifique pour détecter les erreurs d'export/import
console.log('🔍 TEST EXPORTS/IMPORTS - Détection erreurs de référence');
console.log('======================================================');

async function testAllExports() {
    const topics = [
        'addition-soustraction', 'multiplication', 'division', 'figures-planes', 
        'perimetre', 'fractions', 'proportionnalite', 'nombres-entiers', 
        'nombres-decimaux', 'fractions-simples', 'symetrie-axiale', 'aires-figures',
        'constructions-geometriques', 'unites-longueur', 'unites-masse-capacite', 
        'durees', 'lecture-tableaux', 'graphiques', 'algebre', 'moyenne'
    ];
    
    let errors = [];
    let successes = [];
    
    console.log(`🔍 Test de ${topics.length} modules...`);
    
    for (const topic of topics) {
        try {
            console.log(`\n--- TEST: ${topic} ---`);
            
            // Test 1: Import direct du module
            const directPath = `../../data/mathematiques/6ieme/${topic}.js`;
            const module = await import(directPath);
            
            // Test 2: Vérification du nom d'export attendu
            const expectedExportName = topic.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()) + '6eme';
            console.log(`  📝 Export attendu: ${expectedExportName}`);
            
            // Test 3: Vérification de la présence de l'export
            if (!module[expectedExportName]) {
                const availableExports = Object.keys(module);
                errors.push({
                    topic,
                    error: `Export '${expectedExportName}' non trouvé`,
                    available: availableExports,
                    severity: 'CRITICAL'
                });
                console.log(`  ❌ Export '${expectedExportName}' MANQUANT`);
                console.log(`  📋 Exports disponibles: ${availableExports.join(', ')}`);
                continue;
            }
            
            // Test 4: Vérification du contenu de l'export
            const exportContent = module[expectedExportName];
            if (!exportContent || typeof exportContent !== 'object') {
                errors.push({
                    topic,
                    error: `Export '${expectedExportName}' invalide: ${typeof exportContent}`,
                    severity: 'CRITICAL'
                });
                console.log(`  ❌ Export '${expectedExportName}' INVALIDE: ${typeof exportContent}`);
                continue;
            }
            
            // Test 5: Vérification export par défaut
            if (module.default && module.default !== module[expectedExportName]) {
                console.log(`  ⚠️ Export par défaut différent de l'export nommé`);
            }
            
            successes.push({
                topic,
                exportName: expectedExportName,
                hasDefault: !!module.default,
                status: 'OK'
            });
            
            console.log(`  ✅ Export '${expectedExportName}' OK`);
            
        } catch (error) {
            errors.push({
                topic,
                error: error.message,
                severity: 'CRITICAL'
            });
            console.log(`  ❌ ERREUR: ${error.message}`);
        }
    }
    
    // Résumé
    console.log('\n📊 RÉSUMÉ DES TESTS D\'EXPORT');
    console.log('===============================');
    console.log(`✅ Exports valides: ${successes.length}`);
    console.log(`❌ Exports défaillants: ${errors.length}`);
    
    if (errors.length > 0) {
        console.log('\n❌ ERREURS DÉTECTÉES:');
        errors.forEach(error => {
            console.log(`  🚨 ${error.topic}: ${error.error}`);
            if (error.available) {
                console.log(`    Disponible: ${error.available.join(', ')}`);
            }
        });
        
        console.log('\n🛠️ ACTIONS REQUISES:');
        console.log('1. Vérifier les noms d\'export dans les fichiers défaillants');
        console.log('2. S\'assurer que les exports suivent la convention: topicCamelCase6eme');
        console.log('3. Rebuild et redéployer après correction');
    }
    
    return {
        total: topics.length,
        successes: successes.length,
        errors: errors.length,
        errorDetails: errors,
        success: errors.length === 0
    };
}

// Exécution du test
testAllExports().then(result => {
    if (result.success) {
        console.log('\n🎉 TOUS LES EXPORTS SONT VALIDES !');
    } else {
        console.log('\n⚠️ PROBLÈMES D\'EXPORTS DÉTECTÉS !');
        console.log('→ Corrigez les erreurs avant de déployer');
    }
});
