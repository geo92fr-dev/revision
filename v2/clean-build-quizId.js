const fs = require('fs');
const path = require('path');

function findJSFiles(dir) {
    let jsFiles = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            jsFiles = jsFiles.concat(findJSFiles(fullPath));
        } else if (item.endsWith('.js')) {
            jsFiles.push(fullPath);
        }
    }
    
    return jsFiles;
}

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Supprimer les propriétés quizId
    const quizIdRegex = /,?\s*quizId:\s*"[^"]*",?/g;
    if (quizIdRegex.test(content)) {
        content = content.replace(quizIdRegex, '');
        modified = true;
        console.log(`  ✂️  Supprimé quizId dans ${path.basename(filePath)}`);
    }
    
    // Nettoyer les commentaires avec quizId
    const quizIdCommentRegex = /\/\/\s*Identifiant unique du quiz\s*[\r\n]+\s*\*\s*quizId:\s*"[^"]*"[^\r\n]*/g;
    if (quizIdCommentRegex.test(content)) {
        content = content.replace(quizIdCommentRegex, '');
        modified = true;
        console.log(`  ✂️  Supprimé commentaire quizId dans ${path.basename(filePath)}`);
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    
    return false;
}

console.log('🧹 Nettoyage des références quizId dans le dossier build...\n');

const buildDir = path.join(__dirname, 'build');
const files = findJSFiles(buildDir);

console.log(`📁 ${files.length} fichiers trouvés dans build\n`);

let modifiedCount = 0;
let errorCount = 0;

for (const file of files) {
    try {
        if (cleanFile(file)) {
            modifiedCount++;
        }
    } catch (error) {
        console.error(`❌ Erreur avec ${path.basename(file)}: ${error.message}`);
        errorCount++;
    }
}

console.log(`\n✅ ${modifiedCount} fichiers modifiés dans build`);
console.log(`📝 ${files.length} fichiers total traités`);
if (errorCount === 0) {
    console.log('🎉 Aucune erreur ! Toutes les références quizId supprimées du dossier build !');
} else {
    console.log(`⚠️  ${errorCount} erreur(s) rencontrée(s)`);
}
