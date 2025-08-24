// Test d'intégrité pour tous les sujets de mathématiques 6ème
import mathsIndex from './src/data/mathematiques/6ieme/index.js';

console.log('🔍 Test d\'intégrité de la structure - Mathématiques 6ème');
console.log('==================================================');

const topics = Object.keys(mathsIndex);
let totalTests = 0;
let passedTests = 0;
let failedTopics = [];

console.log(`📊 ${topics.length} topics à tester:`);
console.log(topics.join(', '));
console.log();

for (const topicName of topics) {
    console.log(`🧪 Test du topic: ${topicName}`);
    const topicData = mathsIndex[topicName];
    
    totalTests++;
    
    try {
        // Test basique : existence des données
        if (!topicData) {
            throw new Error('Données du topic undefined');
        }
        
        // Test niveau
        if (!topicData.niveau) {
            throw new Error('Propriété "niveau" manquante');
        }
        
        // Test structure selon le type de données
        if (topicData.titre) {
            // Structure type "standard" avec phases
            if (!topicData.phase1 || !topicData.phase2 || !topicData.phase3 || !topicData.phase4) {
                throw new Error('Une ou plusieurs phases manquantes (phase1-4)');
            }
            console.log(`   ✅ Structure standard: ${topicData.titre}`);
        } else if (topicData.chapitre) {
            // Structure type "compétences" (comme moyenne)
            if (!topicData.competences || !Array.isArray(topicData.competences)) {
                throw new Error('Propriété "competences" manquante ou incorrecte');
            }
            console.log(`   ✅ Structure compétences: ${topicData.chapitre}`);
        } else {
            throw new Error('Structure inconnue (ni titre ni chapitre)');
        }
        
        passedTests++;
        
    } catch (error) {
        console.log(`   ❌ Erreur: ${error.message}`);
        failedTopics.push({
            topic: topicName,
            error: error.message,
            availableKeys: Object.keys(topicData)
        });
    }
    
    console.log();
}

console.log('📊 RÉSULTATS DU TEST D\'INTÉGRITÉ');
console.log('===============================');
console.log(`✅ Tests réussis: ${passedTests}/${totalTests}`);
console.log(`❌ Tests échoués: ${totalTests - passedTests}/${totalTests}`);

if (failedTopics.length > 0) {
    console.log();
    console.log('🚨 TOPICS AVEC ERREURS:');
    failedTopics.forEach(item => {
        console.log(`   - ${item.topic}: ${item.error}`);
        console.log(`     Clés disponibles: ${item.availableKeys.join(', ')}`);
    });
    process.exit(1);
} else {
    console.log();
    console.log('🎉 TOUS LES TESTS SONT RÉUSSIS !');
    console.log('La structure de tous les topics est correcte.');
}
