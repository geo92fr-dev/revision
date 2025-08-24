// Test pour vérifier l'export du fichier moyenne.js
import { moyenne6eme } from './src/data/mathematiques/6ieme/moyenne.js';

console.log('🧪 Test de l\'export moyenne6eme');

try {
    // Test 1: Vérifier que moyenne6eme est défini
    if (moyenne6eme) {
        console.log('✅ Test 1 réussi: moyenne6eme est défini');
    } else {
        console.log('❌ Test 1 échoué: moyenne6eme est undefined');
        process.exit(1);
    }

    // Test 2: Vérifier la structure
    if (moyenne6eme.chapitre && moyenne6eme.niveau) {
        console.log('✅ Test 2 réussi: Structure de données correcte');
        console.log('   - Chapitre:', moyenne6eme.chapitre);
        console.log('   - Niveau:', moyenne6eme.niveau);
    } else {
        console.log('❌ Test 2 échoué: Structure de données incorrecte');
        console.log('   - Disponible:', Object.keys(moyenne6eme));
        process.exit(1);
    }

    // Test 3: Vérifier les compétences
    if (moyenne6eme.competences && Array.isArray(moyenne6eme.competences)) {
        console.log('✅ Test 3 réussi: Compétences présentes');
        console.log('   - Nombre de compétences:', moyenne6eme.competences.length);
    } else {
        console.log('❌ Test 3 échoué: Compétences manquantes');
        process.exit(1);
    }

    console.log('🎉 Tous les tests sont réussis ! Le fichier moyenne.js exporte correctement moyenne6eme');

} catch (error) {
    console.error('❌ Erreur lors des tests:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
}
