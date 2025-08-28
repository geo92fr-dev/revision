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

function checkJSSyntax(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Test simple de parsing
        require(filePath);
        return { valid: true, file: path.basename(filePath) };
    } catch (error) {
        return { 
            valid: false, 
            file: path.basename(filePath), 
            error: error.message,
            path: filePath
        };
    }
}

console.log('🔍 Vérification de la syntaxe JavaScript...\n');

const v2SrcDir = path.join(__dirname, 'src');
const files = findJSFiles(v2SrcDir);

console.log(`📁 ${files.length} fichiers JavaScript trouvés\n`);

let invalidFiles = [];

for (const file of files) {
    const result = checkJSSyntax(file);
    if (!result.valid) {
        invalidFiles.push(result);
        console.log(`❌ ${result.file}`);
        console.log(`   Error: ${result.error}\n`);
    }
}

console.log(`\n📊 Résumé:`);
console.log(`✅ ${files.length - invalidFiles.length} fichiers valides`);
console.log(`❌ ${invalidFiles.length} fichiers avec erreurs`);

if (invalidFiles.length === 0) {
    console.log('🎉 Tous les fichiers JavaScript sont valides !');
} else {
    console.log('\n🔧 Fichiers à corriger:');
    invalidFiles.forEach(file => {
        console.log(`- ${file.file}`);
    });
}
