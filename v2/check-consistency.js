// Script pour vérifier la cohérence de tous les fichiers de données
const fs = require('fs');
const path = require('path');

const dataDir = 'c:/Users/I051377/OneDrive - SAP SE/Documents/Scripts/Revision/v2/src/data/mathematiques/6ieme';

// Fichiers à vérifier (exclure les fichiers utilitaires)
const dataFiles = [
    'addition-soustraction.js',
    'aires-figures.js', 
    'algebre.js',
    'constructions-geometriques.js',
    'division.js',
    'durees.js',
    'figures-planes.js',
    'fractions-simples.js',
    'fractions.js',
    'geometrie-avancee.js',
    'graphiques.js',
    'lecture-tableaux.js',
    'moyenne.js',
    'multiplication.js',
    'nombres-decimaux.js',
    'nombres-entiers.js',
    'perimetre.js',
    'pourcentages.js',
    'proportionnalite.js',
    'symetrie-axiale.js',
    'unites-longueur.js',
    'unites-masse-capacite.js'
];

console.log('🔍 Vérification de la cohérence des fichiers de données...\n');

let totalFiles = 0;
let correctFiles = 0;
let issuesFound = [];

dataFiles.forEach(fileName => {
    const filePath = path.join(dataDir, fileName);
    
    if (!fs.existsSync(filePath)) {
        issuesFound.push(`❌ ${fileName}: Fichier introuvable`);
        return;
    }
    
    totalFiles++;
    let content = fs.readFileSync(filePath, 'utf8');
    let issues = [];
    
    // Vérifications
    
    // 1. Le fichier doit avoir window.data = 
    if (!content.includes('window.data =')) {
        issues.push('Pas de window.data assigné');
    }
    
    // 2. Le fichier ne doit pas avoir d\'exports ES6 actifs
    if (content.match(/^export\s+(const|default|{)/m)) {
        issues.push('Contient des exports ES6 actifs');
    }
    
    // 3. Vérifier le format préféré: const data = { ... }
    const hasConstData = content.includes('const data = {');
    const hasWindowDataDirect = content.includes('window.data = {');
    
    if (hasWindowDataDirect && !hasConstData) {
        issues.push('Utilise window.data = { directement (format non standard)');
    }
    
    // 4. Vérifier la présence d\'accents dans les commentaires
    if (content.match(/[éèàùôêçîï]/)) {
        issues.push('Contient encore des accents dans les commentaires');
    }
    
    if (issues.length === 0) {
        correctFiles++;
        console.log(`✅ ${fileName}: Conforme`);
    } else {
        console.log(`⚠️  ${fileName}:`);
        issues.forEach(issue => console.log(`    - ${issue}`));
        issuesFound.push(...issues.map(issue => `${fileName}: ${issue}`));
    }
});

console.log(`\n📊 Résumé:`);
console.log(`Total des fichiers vérifiés: ${totalFiles}`);
console.log(`Fichiers conformes: ${correctFiles}`);
console.log(`Fichiers avec problèmes: ${totalFiles - correctFiles}`);

if (issuesFound.length > 0) {
    console.log(`\n🚨 Problèmes détectés:`);
    issuesFound.forEach(issue => console.log(`   - ${issue}`));
} else {
    console.log(`\n🎉 Tous les fichiers sont conformes au format window.data !`);
}
