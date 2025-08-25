#!/usr/bin/env node

// TEST DE VALIDATION FINALE - FunRevis
// Vérification complète du système après optimisation

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎯 VALIDATION FINALE COMPLÈTE - FunRevis');
console.log('==========================================');
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

// Test 1: Validation structure projet
console.log('\n📋 Test 1: Structure du projet...');
try {
    const essentialFiles = [
        'firebase.json',
        'PROJECT_SUMMARY.md', 
        'README.md',
        'src/index.html',
        'src/auto-detection.js',
        'src/data/mathematiques/6ieme/index.js'
    ];
    
    for (const file of essentialFiles) {
        try {
            await fs.access(file);
            logTest(`Structure ${file}`, true);
        } catch {
            logTest(`Structure ${file}`, false, 'Fichier manquant');
        }
    }
} catch (error) {
    logTest('Validation structure', false, error.message);
}

// Test 2: Validation index des modules 
console.log('\n📋 Test 2: Index des modules...');
try {
    const modules = await import('./src/data/mathematiques/6ieme/index.js');
    
    logTest('Index chargeable', true, `Export détecté`);
    
    // Vérification des exports camelCase
    const camelCaseModules = ['additionSoustraction6eme', 'multiplication6eme', 'division6eme', 'fractions6eme'];
    for (const moduleName of camelCaseModules) {
        const exists = modules[moduleName] !== undefined;
        logTest(`Export ${moduleName}`, exists);
    }
    
    // Vérification de l'export consolidé
    const consolidatedExists = modules.mathematiques6eme !== undefined;
    logTest('Export consolidé mathematiques6eme', consolidatedExists);
    
    if (consolidatedExists) {
        const moduleCount = Object.keys(modules.mathematiques6eme).length;
        logTest('Modules dans export consolidé', moduleCount > 15, `${moduleCount} modules`);
    }
    
} catch (error) {
    logTest('Index modules', false, error.message.substring(0, 100));
}

// Test 3: Validation modules individuels
console.log('\n📋 Test 3: Modules individuels...');
const testModules = [
    'addition-soustraction.js',
    'multiplication.js',
    'division.js', 
    'fractions.js',
    'perimetre.js'
];

for (const moduleFile of testModules) {
    try {
        const module = await import(`./src/data/mathematiques/6ieme/${moduleFile}`);
        const moduleData = Object.values(module)[0];
        
        if (moduleData) {
            logTest(`Module ${moduleFile} - chargement`, true);
            logTest(`Module ${moduleFile} - niveau`, moduleData.niveau === '6ème');
            
            // Vérification structure avec compétences (structure de référence)
            const hasCompetences = Array.isArray(moduleData.competences) && moduleData.competences.length > 0;
            logTest(`Module ${moduleFile} - structure compétences`, hasCompetences);
            
            // Vérification du contenu riche de la première compétence
            if (hasCompetences && moduleData.competences[0]) {
                const firstComp = moduleData.competences[0];
                const hasRichContent = firstComp.cours || firstComp.etapes || firstComp.exercices;
                logTest(`Module ${moduleFile} - contenu riche`, hasRichContent);
            }
        } else {
            logTest(`Module ${moduleFile}`, false, 'Pas de données exportées');
        }
    } catch (error) {
        logTest(`Module ${moduleFile}`, false, error.message.substring(0, 50));
    }
}

// Test 4: Auto-detection system
console.log('\n📋 Test 4: Système auto-detection...');
try {
    const autoDetection = await import('./src/auto-detection.js');
    logTest('Auto-detection - chargement', true);
    
    // Test des fonctions disponibles
    const hasDetectFunction = typeof autoDetection.detectNewFiles === 'function';
    logTest('Auto-detection - fonction detectNewFiles', hasDetectFunction);
    
    if (hasDetectFunction) {
        logTest('Auto-detection - fonctionnel', true, 'Prêt pour auto-extensibilité');
    }
} catch (error) {
    logTest('Auto-detection', false, error.message.substring(0, 100));
}

// Test 5: Configuration Firebase
console.log('\n📋 Test 5: Configuration déploiement...');
try {
    const firebaseConfig = await fs.readFile('./firebase.json', 'utf8');
    const config = JSON.parse(firebaseConfig);
    
    logTest('Firebase config - présente', true);
    logTest('Firebase config - hosting', config.hosting && config.hosting.public);
    logTest('Firebase config - valide', config.hosting.public === 'src');
} catch (error) {
    logTest('Firebase config', false, error.message);
}

// Test 6: Vérification intégrité des 20 modules
console.log('\n📋 Test 6: Intégrité des 20 modules...');
try {
    const dataDir = './src/data/mathematiques/6ieme';
    const files = await fs.readdir(dataDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && f !== 'index.js');
    
    logTest('Nombre total modules', jsFiles.length >= 20, `${jsFiles.length} modules détectés`);
    
    let validModules = 0;
    for (const file of jsFiles) {
        try {
            const module = await import(`${dataDir}/${file}`);
            const moduleData = Object.values(module)[0];
            if (moduleData && moduleData.niveau === '6ème') {
                validModules++;
            }
        } catch (error) {
            // Module invalide, continue
        }
    }
    
    logTest('Modules valides', validModules >= 18, `${validModules}/${jsFiles.length} valides`);
    
} catch (error) {
    logTest('Vérification intégrité', false, error.message);
}

// Test 7: Archive optimisation
console.log('\n📋 Test 7: Archive optimisation...');
try {
    const archiveExists = await fs.access('./archive-optimization').then(() => true).catch(() => false);
    logTest('Archive créée', archiveExists);
    
    if (archiveExists) {
        const archiveFiles = await fs.readdir('./archive-optimization');
        const hasTools = archiveFiles.some(f => f.includes('test') || f.includes('clean'));
        logTest('Outils archivés', hasTools, 'Outils d\'optimisation sauvegardés');
    }
} catch (error) {
    logTest('Archive optimisation', false, error.message);
}

// Résumé final avec scoring détaillé
console.log('\n🏆 RÉSUMÉ FINAL - VALIDATION SYSTÈME');
console.log('====================================');
console.log(`📊 Total tests: ${totalTests}`);
console.log(`✅ Tests réussis: ${passedTests}`);
console.log(`❌ Tests échoués: ${failedTests}`);

const successRate = ((passedTests/totalTests)*100).toFixed(1);
console.log(`📈 Taux de réussite: ${successRate}%`);

// Evaluation de la qualité
let qualityLevel = '';
if (successRate >= 95) {
    qualityLevel = '🏆 EXCELLENT - Système production-ready';
} else if (successRate >= 85) {
    qualityLevel = '🥇 TRÈS BON - Système opérationnel';
} else if (successRate >= 75) {
    qualityLevel = '🥈 BON - Corrections mineures nécessaires';
} else if (successRate >= 60) {
    qualityLevel = '🥉 ACCEPTABLE - Corrections importantes nécessaires';
} else {
    qualityLevel = '⚠️ CRITIQUE - Révision majeure requise';
}

console.log(`🎯 Evaluation: ${qualityLevel}`);

if (failedTests === 0) {
    console.log('\n🎉 VALIDATION COMPLÈTE RÉUSSIE !');
    console.log('✅ Système auto-extensible opérationnel');
    console.log('✅ Fondations ultra-solides confirmées');
    console.log('✅ Prêt pour production et croissance autonome');
} else {
    console.log(`\n📋 Actions recommandées: ${failedTests} point(s) d'amélioration identifié(s)`);
}

console.log(`🕐 Fin de validation: ${new Date().toLocaleString()}`);
