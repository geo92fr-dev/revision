// Test de validation 5ème - Fractions
// Testons directement dans le navigateur

const test5eme = async () => {
    console.log('🧪 Test de validation 5ème - Fractions');
    console.log('=====================================');
    
    // Test 1: Vérification de l'accès aux données
    console.log('\n📊 Test 1: Accès aux données');
    
    try {
        // Simuler un import dynamique
        const response = await fetch('./data/mathematiques/5ieme/5e_nombres_calculs_fractions.js');
        const content = await response.text();
        
        const hasCorrectStructure = content.includes('fractions5eme') && 
                                   content.includes('competences') &&
                                   content.includes('export default');
        
        console.log(`✅ Structure du fichier: ${hasCorrectStructure ? 'OK' : 'ERREUR'}`);
        
        // Test 2: Vérification de la page 5ème
        console.log('\n📄 Test 2: Page 5ème');
        
        const pageResponse = await fetch('./pages/mathematiques/5ieme/index.html');
        const pageContent = await pageResponse.text();
        
        const hasCorrectLinks = pageContent.includes('nombres-calculs-fractions') &&
                               pageContent.includes('cours.html?niveau=5eme');
        
        console.log(`✅ Liens de la page: ${hasCorrectLinks ? 'OK' : 'ERREUR'}`);
        
        // Test 3: Vérification de l'index mathématiques
        console.log('\n📚 Test 3: Index mathématiques');
        
        const indexResponse = await fetch('./data/mathematiques/index.js');
        const indexContent = await indexResponse.text();
        
        const hasLevel5 = indexContent.includes('5eme') &&
                         indexContent.includes('mathematiques5eme');
        
        console.log(`✅ Niveau 5ème dans l'index: ${hasLevel5 ? 'OK' : 'ERREUR'}`);
        
        console.log('\n🎯 Résultats du test:');
        if (hasCorrectStructure && hasCorrectLinks && hasLevel5) {
            console.log('✅ SUCCÈS: La structure 5ème est complètement fonctionnelle!');
            console.log('   - Fichier de données: ✅');
            console.log('   - Page de navigation: ✅');
            console.log('   - Index mathématiques: ✅');
        } else {
            console.log('❌ PROBLÈME: Certains éléments nécessitent une correction');
        }
        
    } catch (error) {
        console.log('❌ Erreur lors du test:', error.message);
    }
};

// Auto-exécution si dans le navigateur
if (typeof window !== 'undefined') {
    test5eme();
}

// Export pour Node.js
if (typeof module !== 'undefined') {
    module.exports = test5eme;
}
