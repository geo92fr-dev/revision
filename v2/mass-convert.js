// Script pour convertir tous les fichiers de données du format ES6 vers window.data
const fs = require('fs');
const path = require('path');

const dataDir = 'c:/Users/I051377/OneDrive - SAP SE/Documents/Scripts/Revision/v2/src/data/mathematiques/6ieme';

// Fichiers à convertir (exclure les fichiers utilitaires)
const filesToConvert = [
    'division.js',
    'fractions.js',
    'aires-figures.js',
    'multiplication.js',
    'nombres-entiers.js',
    'figures-planes.js',
    'geometrie-avancee.js',
    'algebre.js',
    'perimetre.js',
    'pourcentages.js',
    'proportionnalite.js',
    'moyenne.js'
];

console.log('🔄 Conversion des fichiers vers le format window.data...');

filesToConvert.forEach(fileName => {
    const filePath = path.join(dataDir, fileName);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${fileName} n'existe pas, ignoré`);
        return;
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Détection du nom de la variable exportée
        const exportMatch = content.match(/export const (\w+) = \{/);
        if (!exportMatch) {
            console.log(`⚠️  ${fileName}: Pas de format export const détecté`);
            return;
        }
        
        const variableName = exportMatch[1];
        console.log(`🔍 ${fileName}: Variable détectée: ${variableName}`);
        
        // Transformation du contenu
        
        // 1. Remplacer "export const variableName = {" par "const data = {"
        content = content.replace(/export const \w+ = \{/, 'const data = {');
        
        // 2. Supprimer les lignes export à la fin
        content = content.replace(/\/\/ Export par défaut.*\n/g, '');
        content = content.replace(/export default \w+;.*\n?/g, '');
        content = content.replace(/export \{ \w+ \};.*\n?/g, '');
        content = content.replace(/export const \w+ = \w+;.*\n?/g, '');
        
        // 3. Nettoyer les accents dans les commentaires
        content = content.replace(/é/g, 'e');
        content = content.replace(/è/g, 'e');
        content = content.replace(/à/g, 'a');
        content = content.replace(/ù/g, 'u');
        content = content.replace(/ô/g, 'o');
        content = content.replace(/ê/g, 'e');
        content = content.replace(/ç/g, 'c');
        content = content.replace(/î/g, 'i');
        content = content.replace(/ï/g, 'i');
        content = content.replace(/É/g, 'E');
        content = content.replace(/È/g, 'E');
        content = content.replace(/À/g, 'A');
        
        // 4. Ajouter l'assignment à window.data à la fin
        if (!content.includes('window.data')) {
            // S'assurer qu'on a une ligne vide avant l'assignment
            content = content.trim();
            content += '\n\n// Assign to window for browser compatibility\nwindow.data = data;\n';
        }
        
        // Écrire le fichier modifié
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${fileName}: Converti avec succès`);
        
    } catch (error) {
        console.error(`❌ ${fileName}: Erreur lors de la conversion:`, error.message);
    }
});

console.log('\n🎉 Conversion terminée !');
console.log('📝 Tous les fichiers utilisent maintenant le format window.data');
