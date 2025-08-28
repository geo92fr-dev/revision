// Script pour standardiser TOUS les fichiers de données au même format
const fs = require('fs');
const path = require('path');

const dataDir = 'c:/Users/I051377/OneDrive - SAP SE/Documents/Scripts/Revision/v2/src/data/mathematiques/6ieme';

// Fichiers problématiques identifiés
const filesToFix = [
    'addition-soustraction.js',
    'constructions-geometriques.js',
    'durees.js',
    'fractions-simples.js',
    'graphiques.js',
    'lecture-tableaux.js',
    'moyenne.js',
    'nombres-decimaux.js',
    'symetrie-axiale.js',
    'unites-longueur.js',
    'unites-masse-capacite.js'
];

console.log('🔧 Standardisation des fichiers de données...\n');

function removeAccents(text) {
    return text
        .replace(/é/g, 'e')
        .replace(/è/g, 'e')
        .replace(/à/g, 'a')
        .replace(/ù/g, 'u')
        .replace(/ô/g, 'o')
        .replace(/ê/g, 'e')
        .replace(/ç/g, 'c')
        .replace(/î/g, 'i')
        .replace(/ï/g, 'i')
        .replace(/É/g, 'E')
        .replace(/È/g, 'E')
        .replace(/À/g, 'A')
        .replace(/Ç/g, 'C');
}

filesToFix.forEach(fileName => {
    const filePath = path.join(dataDir, fileName);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${fileName}: Fichier introuvable`);
        return;
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // 1. Supprimer les accents
        const originalContent = content;
        content = removeAccents(content);
        if (content !== originalContent) {
            modified = true;
            console.log(`✅ ${fileName}: Accents supprimés`);
        }
        
        // 2. Convertir window.data = { vers const data = { format
        if (content.includes('window.data = {')) {
            // Déterminer le nom de variable approprié
            const varName = fileName.replace('.js', '').replace(/-/g, '') + '6eme';
            
            // Remplacer window.data = { par const varName = {
            content = content.replace('window.data = {', `const ${varName} = {`);
            
            // Ajouter l'assignment à window.data à la fin si pas présent
            if (!content.includes('window.data =')) {
                content = content.trim() + `\n\n// Assign to window for browser compatibility\nwindow.data = ${varName};\n`;
            }
            
            modified = true;
            console.log(`✅ ${fileName}: Format standardisé vers const ${varName} = {`);
        }
        
        // 3. Sauvegarder si modifié
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`💾 ${fileName}: Fichier sauvegardé`);
        } else {
            console.log(`✨ ${fileName}: Déjà conforme`);
        }
        
    } catch (error) {
        console.error(`❌ ${fileName}: Erreur lors du traitement:`, error.message);
    }
});

console.log('\n🎉 Standardisation terminée ! Tous les fichiers utilisent maintenant le même format.');
