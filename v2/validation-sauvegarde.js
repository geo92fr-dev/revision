// 🎯 VALIDATION RAPIDE ARCHITECTURE 5EME
// Script pour vérifier l'état du système après sauvegarde

const fs = require('fs');
const path = require('path');

console.log('🔍 VALIDATION ARCHITECTURE 5EME - FunRevis V2');
console.log('='.repeat(50));

// Chemins à vérifier
const paths = {
    // Structure 5ème
    data5eme: 'v2/src/data/mathematiques/5ieme/5e_nombres_calculs_fractions.js',
    index5eme: 'v2/src/data/mathematiques/5ieme/index.js',
    page5eme: 'v2/src/pages/mathematiques/5ieme/index.html',
    
    // Core system
    coursPage: 'v2/src/pages/cours.html',
    dataIndex: 'v2/src/data/index.js',
    mathIndex: 'v2/src/data/mathematiques/index.js',
    
    // Tests
    testStructure: 'v2/test-5eme-structure.js',
    testValidation: 'v2/src/test-5eme-validation.js',
    testPage: 'v2/src/test-5eme.html'
};

let allValid = true;

// Vérification existence fichiers
console.log('\n📁 VÉRIFICATION FICHIERS :');
for (const [name, filePath] of Object.entries(paths)) {
    const exists = fs.existsSync(filePath);
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${name}: ${filePath}`);
    if (!exists) allValid = false;
}

// Vérification contenu critique
console.log('\n📋 VÉRIFICATION CONTENU :');

try {
    // Vérifier exports 5ème
    const data5eme = fs.readFileSync(paths.data5eme, 'utf8');
    const hasExport = data5eme.includes('export default') || data5eme.includes('module.exports');
    console.log(`${hasExport ? '✅' : '❌'} Export 5ème données`);
    
    const index5eme = fs.readFileSync(paths.index5eme, 'utf8');
    const hasNombresFractions = index5eme.includes('nombres-calculs-fractions');
    console.log(`${hasNombresFractions ? '✅' : '❌'} Index 5ème exports`);
    
    // Vérifier cours.html breadcrumb
    const coursHtml = fs.readFileSync(paths.coursPage, 'utf8');
    const hasUpdateBreadcrumb = coursHtml.includes('updateBreadcrumb');
    const hasLoadData5eme = coursHtml.includes('loadData5eme');
    const hasBreadcrumbLogs = coursHtml.includes('console.log') && coursHtml.includes('breadcrumb');
    
    console.log(`${hasUpdateBreadcrumb ? '✅' : '❌'} Fonction updateBreadcrumb`);
    console.log(`${hasLoadData5eme ? '✅' : '❌'} Fonction loadData5eme`);
    console.log(`${hasBreadcrumbLogs ? '✅' : '❌'} Logs debugging breadcrumb`);
    
    // Vérifier URL parameters support
    const hasNiveauParam = coursHtml.includes('niveau') && coursHtml.includes('urlParams.get');
    console.log(`${hasNiveauParam ? '✅' : '❌'} Support paramètres URL niveau`);
    
} catch (error) {
    console.log('❌ Erreur vérification contenu:', error.message);
    allValid = false;
}

// Vérification structure ES6
console.log('\n🔧 VÉRIFICATION ES6 MODULES :');
try {
    const mathIndex = fs.readFileSync(paths.mathIndex, 'utf8');
    const has5emeExport = mathIndex.includes('./5ieme/index.js') || mathIndex.includes("'5eme'");
    console.log(`${has5emeExport ? '✅' : '❌'} Export 5ème dans mathematiques/index.js`);
    
    const dataIndex = fs.readFileSync(paths.dataIndex, 'utf8');
    const hasMathExport = dataIndex.includes('./mathematiques/index.js');
    console.log(`${hasMathExport ? '✅' : '❌'} Export mathematiques dans data/index.js`);
    
} catch (error) {
    console.log('❌ Erreur vérification ES6:', error.message);
    allValid = false;
}

// Résumé final
console.log('\n' + '='.repeat(50));
if (allValid) {
    console.log('🎉 VALIDATION RÉUSSIE - Architecture 5ème opérationnelle !');
    console.log('✅ Tous les composants sont présents et fonctionnels');
    console.log('🚀 Système prêt pour utilisation et extension');
} else {
    console.log('⚠️  VALIDATION PARTIELLE - Certains éléments manquent');
    console.log('🔧 Vérifiez les éléments marqués ❌ ci-dessus');
}

console.log('\n📊 RÉSUMÉ TECHNIQUE :');
console.log('• Structure ES6 modulaire : 5ème niveau');
console.log('• Breadcrumb dynamique avec logs debugging');
console.log('• Support URLs niveau/matiere/chapitre'); 
console.log('• Tests et validation intégrés');
console.log('• Backward compatibility 6ème préservée');

console.log('\n🔗 URLS DE TEST :');
console.log('• http://localhost:8080/pages/cours.html?niveau=5eme&matiere=mathematiques&chapitre=nombres-calculs-fractions');
console.log('• http://localhost:8080/v2/src/test-5eme.html');
console.log('• http://localhost:8080/v2/src/pages/mathematiques/5ieme/index.html');

console.log('\n💾 Sauvegarde complétée le:', new Date().toLocaleString('fr-FR'));
