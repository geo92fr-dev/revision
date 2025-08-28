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
        } else if (item.endsWith('.js') || item.endsWith('.html')) {
            jsFiles.push(fullPath);
        }
    }
    
    return jsFiles;
}

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Supprimer les propriétés miniQuiz
    const miniQuizRegex = /,?\s*miniQuiz:\s*phase3Data\.miniQuiz\s*\|\|\s*\[\],?/g;
    if (miniQuizRegex.test(content)) {
        content = content.replace(miniQuizRegex, '');
        modified = true;
        console.log(`  ✂️  Supprimé miniQuiz reference dans ${path.basename(filePath)}`);
    }
    
    // Nettoyer autres patterns miniQuiz
    const miniQuizArrayRegex = /,?\s*miniQuiz:\s*\[[^\]]*\],?/gs;
    if (miniQuizArrayRegex.test(content)) {
        content = content.replace(miniQuizArrayRegex, '');
        modified = true;
        console.log(`  ✂️  Supprimé miniQuiz array dans ${path.basename(filePath)}`);
    }
    
    // Nettoyer les conditions avec miniQuiz
    const miniQuizConditionRegex = /if\s*\(\s*competence\.miniQuiz[^}]*\}/gs;
    if (miniQuizConditionRegex.test(content)) {
        content = content.replace(miniQuizConditionRegex, '');
        modified = true;
        console.log(`  ✂️  Supprimé condition miniQuiz dans ${path.basename(filePath)}`);
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    
    return false;
}

console.log('🧹 Nettoyage des références miniQuiz dans le dossier v2...\n');

const v2Dir = path.join(__dirname);
const files = findJSFiles(v2Dir);

console.log(`📁 ${files.length} fichiers trouvés dans v2\n`);

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

console.log(`\n✅ ${modifiedCount} fichiers modifiés dans v2`);
console.log(`📝 ${files.length} fichiers total traités`);
if (errorCount === 0) {
    console.log('🎉 Aucune erreur ! Toutes les références miniQuiz supprimées du dossier v2 !');
} else {
    console.log(`⚠️  ${errorCount} erreur(s) rencontrée(s)`);
}
