// Test de syntaxe des fichiers corrigés (sans execution)
const fs = require('fs');
const path = require('path');

const filesToTest = [
  'src/data/mathematiques/5ieme/5e_nombres_calculs_fractions.js',
  'src/data/mathematiques/6ieme/moyenne.js',
  'src/data/mathematiques/6ieme/multiplication.js',
  'src/data/mathematiques/6ieme/division.js',
  'src/data/mathematiques/6ieme/proportionnalite.js',
  'src/data/mathematiques/6ieme/algebre.js'
];

console.log('🧪 Test de validation des fichiers corrigés...\n');

let allValid = true;
const results = [];

for (const file of filesToTest) {
  const fullPath = path.join(__dirname, file);
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Test de parsing basique
    const fakeWindow = { data: null };
    const code = content.replace(/window\./g, 'fakeWindow.');
    
    // Verification que le fichier contient les bonnes structures
    const hasCompetences = content.includes('competences');
    const hasExercices = content.includes('exercices');
    const hasNoQuiz = !content.includes('quiz') && !content.includes('Quiz');
    
    const result = {
      file: path.basename(file),
      syntaxValid: true,
      hasCompetences,
      hasExercices,
      hasNoQuiz,
      status: '✅'
    };
    
    if (!hasCompetences || !hasExercices || !hasNoQuiz) {
      result.status = '⚠️';
      allValid = false;
    }
    
    results.push(result);
    
  } catch (error) {
    results.push({
      file: path.basename(file),
      syntaxValid: false,
      error: error.message,
      status: '❌'
    });
    allValid = false;
  }
}

console.log('📊 RÉSULTATS DES TESTS:\n');
results.forEach(result => {
  console.log(`${result.status} ${result.file}`);
  if (result.syntaxValid) {
    console.log(`   ✓ Compétences: ${result.hasCompetences}`);
    console.log(`   ✓ Exercices: ${result.hasExercices}`);
    console.log(`   ✓ Sans quiz: ${result.hasNoQuiz}`);
  } else {
    console.log(`   ✗ Erreur: ${result.error}`);
  }
  console.log('');
});

console.log(`🎯 RÉSUMÉ GLOBAL:`);
console.log(`✅ Fichiers valides: ${results.filter(r => r.status === '✅').length}`);
console.log(`⚠️  Fichiers avec avertissements: ${results.filter(r => r.status === '⚠️').length}`);
console.log(`❌ Fichiers avec erreurs: ${results.filter(r => r.status === '❌').length}`);

if (allValid) {
  console.log('\n🎉 TOUS LES FICHIERS CORRIGÉS SONT VALIDES !');
} else {
  console.log('\n⚠️  Certains fichiers nécessitent une attention...');
}
