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

function scanForQuizReferences(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [];
    
    // Ignorer nos scripts de nettoyage
    if (filePath.includes('remove-quiz-references.js') || 
        filePath.includes('clean-v2-miniQuiz.js') || 
        filePath.includes('clean-build-quizId.js') ||
        filePath.includes('verify-cleanup.js')) {
        return matches;
    }
    
    // Chercher les patterns problématiques
    const patterns = [
        { name: 'quizId', regex: /quizId/g },
        { name: 'miniQuiz', regex: /miniQuiz/g },
        { name: 'quiz functions', regex: /(populateQuiz|validateQuiz|renderQuiz)/g }
    ];
    
    for (const pattern of patterns) {
        const patternMatches = [...content.matchAll(pattern.regex)];
        if (patternMatches.length > 0) {
            matches.push({
                pattern: pattern.name,
                count: patternMatches.length,
                file: path.basename(filePath)
            });
        }
    }
    
    return matches;
}

console.log('🔍 Vérification finale du nettoyage des quiz...\n');

const v2Dir = path.join(__dirname);
const files = findJSFiles(v2Dir);
let totalIssues = 0;

for (const file of files) {
    try {
        const matches = scanForQuizReferences(file);
        if (matches.length > 0) {
            console.log(`⚠️  ${path.basename(file)}:`);
            matches.forEach(match => {
                console.log(`   - ${match.pattern}: ${match.count} occurrence(s)`);
                totalIssues += match.count;
            });
        }
    } catch (error) {
        console.error(`❌ Erreur avec ${path.basename(file)}: ${error.message}`);
    }
}

console.log(`\n📊 Résumé:`);
console.log(`📁 ${files.length} fichiers scannés`);
if (totalIssues === 0) {
    console.log('✅ Aucune référence quiz trouvée ! Nettoyage complet réussi ! 🎉');
} else {
    console.log(`⚠️  ${totalIssues} référence(s) quiz encore présente(s)`);
}
