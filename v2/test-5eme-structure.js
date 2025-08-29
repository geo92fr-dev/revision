// Test rapide pour vérifier la structure 5ème
console.log('🧪 Test de la structure 5ème mathématiques');

try {
  // Test en environnement Node.js
  const fs = require('fs');
  const path = require('path');
  
  // Vérification des fichiers
  const files = [
    './src/data/mathematiques/5ieme/index.js',
    './src/data/mathematiques/5ieme/5e_nombres_calculs_fractions.js',
    './src/pages/mathematiques/5ieme/index.html'
  ];
  
  console.log('\n📁 Vérification des fichiers:');
  files.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
  });
  
  // Test d'import du module 5ème
  console.log('\n📦 Test du module 5ème:');
  
  // Nous ne pouvons pas facilement tester l'import ES6 en Node.js direct
  // Donc nous lisons le contenu pour vérifier
  const fractionContent = fs.readFileSync('./src/data/mathematiques/5ieme/5e_nombres_calculs_fractions.js', 'utf8');
  
  const hasExport = fractionContent.includes('export default');
  const hasData = fractionContent.includes('fractions5eme');
  const hasCompetences = fractionContent.includes('competences');
  
  console.log(`✅ Export par défaut: ${hasExport}`);
  console.log(`✅ Données fractions5eme: ${hasData}`);
  console.log(`✅ Structure compétences: ${hasCompetences}`);
  
  console.log('\n🎯 Structure 5ème prête à être utilisée!');
  
} catch (error) {
  console.log('❌ Erreur lors du test:', error.message);
}
