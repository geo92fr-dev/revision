const fs = require('fs');

const filePath = './src/pages/cours.html';
console.log('🔍 Debug: Vérification du contenu du fichier cours.html');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('📁 Taille du fichier:', content.length, 'caractères');
    
    // Test 1: Rechercher mainTitle dans le contenu brut
    const hasMainTitleRaw = content.includes('id="mainTitle"');
    console.log('🎯 mainTitle dans le contenu brut:', hasMainTitleRaw);
    
    // Test 2: Rechercher les fonctions dans le contenu brut
    const hasLoadCourse = content.includes('function loadCourse');
    const hasUpdateBreadcrumb = content.includes('function updateBreadcrumb');
    console.log('⚙️ function loadCourse dans le contenu brut:', hasLoadCourse);
    console.log('⚙️ function updateBreadcrumb dans le contenu brut:', hasUpdateBreadcrumb);
    
    // Test 3: Rechercher breadcrumb IDs
    const hasBreadcrumbSubject = content.includes('id="breadcrumbSubjectLink"');
    const hasBreadcrumbLevel = content.includes('id="breadcrumbLevelLink"');
    console.log('🔗 breadcrumbSubjectLink dans le contenu brut:', hasBreadcrumbSubject);
    console.log('🔗 breadcrumbLevelLink dans le contenu brut:', hasBreadcrumbLevel);
    
    // Test 4: Afficher les lignes contenant ces éléments
    console.log('\n📋 Lignes contenant mainTitle:');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('mainTitle')) {
            console.log(`Ligne ${index + 1}: ${line.trim()}`);
        }
    });
    
    console.log('\n📋 Lignes contenant function loadCourse:');
    lines.forEach((line, index) => {
        if (line.includes('function loadCourse')) {
            console.log(`Ligne ${index + 1}: ${line.trim()}`);
        }
    });
    
} catch (error) {
    console.error('❌ Erreur:', error.message);
}
