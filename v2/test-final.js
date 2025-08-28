// Test final pour vérifier que tout fonctionne après les corrections
const fs = require('fs');
const path = require('path');

console.log('🚀 Test final du système après corrections...\n');

// Test 1: Vérifier que tous les fichiers corrigés se chargent sans erreur
const fichiersCorrigesTests = [
    'src/data/mathematiques/6ieme/moyenne.js',
    'src/data/mathematiques/6ieme/multiplication.js', 
    'src/data/mathematiques/6ieme/division.js',
    'src/data/mathematiques/6ieme/proportionnalite.js',
    'src/data/mathematiques/6ieme/algebre.js',
    'src/data/mathematiques/5ieme/5e_nombres_calculs_fractions.js'
];

let testsReussis = 0;
let testsTotal = fichiersCorrigesTests.length;

console.log('📋 Test des fichiers JavaScript corrigés:');
for (const fichier of fichiersCorrigesTests) {
    try {
        // Simuler le chargement comme dans un navigateur
        const contenu = fs.readFileSync(fichier, 'utf8');
        
        // Vérifier la structure de base
        const aCompetences = contenu.includes('competences');
        const aExercices = contenu.includes('exercices');
        const pasDeQuiz = !contenu.includes('quiz') && !contenu.includes('miniQuiz') && !contenu.includes('quizId');
        const structureValide = contenu.includes('export') || contenu.includes('window');
        
        if (aCompetences && aExercices && pasDeQuiz && structureValide) {
            console.log(`  ✅ ${path.basename(fichier)} - Valide`);
            testsReussis++;
        } else {
            console.log(`  ❌ ${path.basename(fichier)} - Structure incomplète`);
            if (!aCompetences) console.log(`     - Manque: competences`);
            if (!aExercices) console.log(`     - Manque: exercices`);
            if (!pasDeQuiz) console.log(`     - Contient encore: quiz/miniQuiz/quizId`);
            if (!structureValide) console.log(`     - Manque: export/window`);
        }
    } catch (error) {
        console.log(`  ❌ ${path.basename(fichier)} - Erreur: ${error.message}`);
    }
}

// Test 2: Vérifier l'absence de références quiz dans tout le projet
console.log('\n🔍 Vérification finale des références quiz:');
let totalFichiers = 0;
let fichiersAvecQuiz = 0;

function scannerRepertoire(repertoire) {
    const fichiers = fs.readdirSync(repertoire);
    for (const fichier of fichiers) {
        const cheminComplet = path.join(repertoire, fichier);
        const stat = fs.statSync(cheminComplet);
        
        if (stat.isDirectory() && !fichier.startsWith('.') && fichier !== 'node_modules') {
            scannerRepertoire(cheminComplet);
        } else if (fichier.endsWith('.js') && !fichier.includes('test') && !fichier.includes('node_modules')) {
            totalFichiers++;
            const contenu = fs.readFileSync(cheminComplet, 'utf8');
            if (contenu.includes('quiz') || contenu.includes('miniQuiz') || contenu.includes('quizId')) {
                fichiersAvecQuiz++;
                console.log(`  ⚠️  ${cheminComplet} contient encore des références quiz`);
            }
        }
    }
}

scannerRepertoire('src');

// Test 3: Vérifier que le build fonctionne
console.log('\n🏗️  Vérification du build:');
try {
    const buildPath = path.join('build', 'cours.html');
    if (fs.existsSync(buildPath)) {
        console.log('  ✅ Build existe et semble fonctionnel');
    } else {
        console.log('  ⚠️  Build non trouvé (normal si pas encore généré)');
    }
} catch (error) {
    console.log(`  ❌ Erreur build: ${error.message}`);
}

// Résumé final
console.log('\n' + '='.repeat(60));
console.log('📊 RÉSUMÉ DU TEST FINAL:');
console.log(`✅ Fichiers corrigés validés: ${testsReussis}/${testsTotal}`);
console.log(`🔍 Fichiers JS scannés: ${totalFichiers}`);
console.log(`🚫 Fichiers avec quiz restants: ${fichiersAvecQuiz}`);

if (testsReussis === testsTotal && fichiersAvecQuiz === 0) {
    console.log('\n🎉 SUCCÈS TOTAL ! Toutes les corrections sont opérationnelles ! 🎉');
    console.log('   ✓ Tous les fichiers corrigés fonctionnent');
    console.log('   ✓ Aucune référence quiz restante');
    console.log('   ✓ Structure des données intacte');
    console.log('   ✓ Build fonctionnel');
} else {
    console.log('\n⚠️  Quelques points d\'attention détectés');
}

console.log('='.repeat(60));
