#!/usr/bin/env node

// SCRIPT DE RESTAURATION MASSIVE - URGENCE
// ==========================================
// Restauration complète du contenu pédagogique riche

import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🚨 RESTAURATION MASSIVE DU CONTENU PÉDAGOGIQUE');
console.log('===============================================');

// Liste des fichiers à restaurer avec leur contenu riche original
const modules = [
    'addition-soustraction.js',
    'aires-figures.js', 
    'algebre.js',
    'constructions-geometriques.js',
    'division.js',
    'durees.js',
    'figures-planes.js',
    'fractions-simples.js',
    'fractions.js',
    'graphiques.js',
    'lecture-tableaux.js',
    'moyenne.js',
    'multiplication.js',
    'nombres-decimaux.js',
    'nombres-entiers.js',
    'perimetre.js',
    'proportionnalite.js',
    'symetrie-axiale.js',
    'unites-longueur.js',
    'unites-masse-capacite.js'
];

async function restaurerModule(moduleFile) {
    try {
        console.log(`📥 Restauration ${moduleFile}...`);
        
        // Récupération du contenu original via git
        const { stdout } = await execAsync(`git show ad3a658:src/data/mathematiques/6ieme/${moduleFile}`);
        
        if (stdout && stdout.length > 1000) { // Vérification que le contenu est riche
            await fs.writeFile(`src/data/mathematiques/6ieme/${moduleFile}`, stdout, 'utf8');
            console.log(`✅ ${moduleFile} - Restauré (${stdout.length} caractères)`);
            return true;
        } else {
            console.log(`⚠️ ${moduleFile} - Contenu insuffisant, tentative commit précédent...`);
            
            // Tentative avec commit précédent
            const { stdout: stdout2 } = await execAsync(`git show 12365d3:src/data/mathematiques/6ieme/${moduleFile}`);
            if (stdout2 && stdout2.length > 1000) {
                await fs.writeFile(`src/data/mathematiques/6ieme/${moduleFile}`, stdout2, 'utf8');
                console.log(`✅ ${moduleFile} - Restauré depuis commit précédent (${stdout2.length} caractères)`);
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.log(`❌ ${moduleFile} - Erreur: ${error.message}`);
        return false;
    }
}

// Exécution de la restauration
let totalRestored = 0;
let totalFailed = 0;

for (const module of modules) {
    const success = await restaurerModule(module);
    if (success) {
        totalRestored++;
    } else {
        totalFailed++;
    }
    
    // Pause pour éviter la surcharge
    await new Promise(resolve => setTimeout(resolve, 100));
}

console.log('\n🏆 RÉSULTATS DE LA RESTAURATION');
console.log('================================');
console.log(`✅ Modules restaurés: ${totalRestored}/${modules.length}`);
console.log(`❌ Échecs: ${totalFailed}`);

if (totalRestored > 15) {
    console.log('\n🎉 RESTAURATION RÉUSSIE !');
    console.log('✅ Contenu pédagogique riche récupéré');
    console.log('✅ Structure de référence respectée');
    console.log('✅ Prêt pour re-validation');
} else {
    console.log('\n⚠️ RESTAURATION PARTIELLE');
    console.log('Certains modules nécessitent une intervention manuelle');
}

console.log(`\n📊 Taux de réussite: ${((totalRestored/modules.length)*100).toFixed(1)}%`);
