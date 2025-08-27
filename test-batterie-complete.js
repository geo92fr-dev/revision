#!/usr/bin/env node

// Batterie de tests complète pour FunRevis
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 BATTERIE DE TESTS COMPLÈTE - FunRevis');
console.log('=========================================');
console.log('🕐 Démarrage:', new Date().toLocaleString());

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function logTest(testName, success, details = '') {
    totalTests++;
    if (success) {
        passedTests++;
        console.log(`✅ ${testName}${details ? ' - ' + details : ''}`);
    } else {
        failedTests++;
        console.log(`❌ ${testName}${details ? ' - ' + details : ''}`);
    }
}

// Test 1: Validation de l'index auto-généré
console.log('\n📋 Test 1: Index auto-généré...');
try {
    const modules = await import('./src/data/mathematiques/6ieme/index.js');
    const moduleCount = Object.keys(modules).length;
    logTest('Index chargé', true, `${moduleCount} modules détectés`);
    
    // Vérification que les modules essentiels sont présents
    const expectedModules = ['additionSoustraction6eme', 'multiplication6eme', 'division6eme', 'fractions6eme'];
    for (const module of expectedModules) {
        const exists = modules[module] !== undefined;
        logTest(`Module ${module}`, exists);
    }
} catch (error) {
    logTest('Index chargé', false, error.message);
}

// Test 2: Test d'un module spécifique (addition-soustraction)
console.log('\n📋 Test 2: Module addition-soustraction...');
try {
    const module = await import('./src/data/mathematiques/6ieme/addition-soustraction.js');
    const data = module.additionSoustraction6eme;
    
    logTest('Module chargé', true, `Niveau ${data.niveau}`);
    logTest('Structure valide', data.chapitre && data.competences && data.cours, `Chapitre: ${data.chapitre}`);
    logTest('Compétences définies', data.competences.length > 0, `${data.competences.length} compétences`);
    logTest('Cours structuré', data.cours.length === 4, `${data.cours.length} phases`);
    
    // Vérification des phases du cours
    const phases = ['activation', 'apprentissage', 'pratique', 'metacognition'];
    for (let i = 0; i < phases.length; i++) {
        const phase = data.cours[i];
        logTest(`Phase ${phases[i]}`, phase && phase.titre && phase.contenu);
    }
} catch (error) {
    logTest('Module addition-soustraction', false, error.message);
}

// Test 3: Auto-detection system
console.log('\n📋 Test 3: Système auto-detection...');
try {
    const autoDetection = await import('./src/auto-detection.js');
    logTest('Auto-detection chargé', true);
    
    // Test si les fonctions principales existent
    logTest('Fonction disponible', typeof autoDetection.default === 'function' || typeof autoDetection.scanModules === 'function');
} catch (error) {
    logTest('Auto-detection', false, error.message);
}

// Test 4: Test de quelques autres modules essentiels
console.log('\n📋 Test 4: Modules essentiels...');
const modulesToTest = [
    'multiplication.js',
    'division.js', 
    'fractions.js',
    'nombres-decimaux.js',
    'perimetre.js'
];

for (const moduleFile of modulesToTest) {
    try {
        const module = await import(`./src/data/mathematiques/6ieme/${moduleFile}`);
        const moduleData = Object.values(module)[0]; // Premier export
        logTest(`Module ${moduleFile}`, moduleData && moduleData.niveau === '6ème', `Structure OK`);
    } catch (error) {
        logTest(`Module ${moduleFile}`, false, error.message);
    }
}

// Test 5: Vérification Firebase config
console.log('\n📋 Test 5: Configuration Firebase...');
try {
    const fs = await import('fs/promises');
    const firebaseConfig = await fs.readFile('./firebase.json', 'utf8');
    const config = JSON.parse(firebaseConfig);
    logTest('Firebase config', config.hosting && config.hosting.public, 'Configuration valide');
} catch (error) {
    logTest('Firebase config', false, error.message);
}

// Test 6: Vérification structure fichiers essentiels
console.log('\n📋 Test 6: Fichiers essentiels...');
try {
    const fs = await import('fs/promises');
    const essentialFiles = [
        'PROJECT_SUMMARY.md',
        'README.md',
        'src/index.html',
        'src/auto-detection.js'
    ];
    
    for (const file of essentialFiles) {
        try {
            await fs.access(file);
            logTest(`Fichier ${file}`, true);
        } catch {
            logTest(`Fichier ${file}`, false, 'Fichier manquant');
        }
    }
} catch (error) {
    logTest('Vérification fichiers', false, error.message);
}

// Résumé final
console.log('\n🏆 RÉSUMÉ FINAL');
console.log('================');
console.log(`📊 Total tests: ${totalTests}`);
console.log(`✅ Tests réussis: ${passedTests}`);
console.log(`❌ Tests échoués: ${failedTests}`);
console.log(`📈 Taux de réussite: ${((passedTests/totalTests)*100).toFixed(1)}%`);

if (failedTests === 0) {
    console.log('\n🎉 TOUS LES TESTS SONT PASSÉS ! SYSTÈME OPÉRATIONNEL');
} else {
    console.log(`\n⚠️  ${failedTests} test(s) ont échoué. Vérification nécessaire.`);
}

console.log(`🕐 Fin des tests: ${new Date().toLocaleString()}`);
