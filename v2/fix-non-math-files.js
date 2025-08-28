#!/usr/bin/env node

/**
 * 🔧 CORRECTEUR DE FICHIERS NON-MATH - FunRevis V2
 * ===============================================
 * 
 * Corrige les fichiers anglais/français pour adopter le format uniforme
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION DES FICHIERS NON-MATHÉMATIQUES');
console.log('=============================================');

class FileFixer {
    constructor() {
        this.srcDir = path.join(__dirname, 'src');
        this.dataDir = path.join(this.srcDir, 'data');
        this.fixedCount = 0;
    }

    // 🔍 Trouver les fichiers à corriger
    findNonMathFiles() {
        const files = [];
        const folders = ['anglais', 'francais'];
        
        folders.forEach(folder => {
            const folderPath = path.join(this.dataDir, folder);
            if (fs.existsSync(folderPath)) {
                const items = fs.readdirSync(folderPath);
                items.forEach(item => {
                    if (item.endsWith('.js') && item !== 'index.js') {
                        files.push({
                            subject: folder,
                            topic: item.replace('.js', ''),
                            path: path.join(folderPath, item)
                        });
                    }
                });
            }
        });
        
        return files;
    }

    // 🔧 Corriger un fichier
    fixFile(fileInfo) {
        try {
            const content = fs.readFileSync(fileInfo.path, 'utf8');
            
            // Déterminer le nom de la variable
            const varName = `${fileInfo.subject}${fileInfo.topic.charAt(0).toUpperCase() + fileInfo.topic.slice(1)}`;
            
            // Transformer le contenu
            let newContent = content;
            
            // Supprimer les commentaires d'export en début
            newContent = newContent.replace(/^\/\/ export const [^=]+ = \[/m, '');
            
            // Ajouter la déclaration const au début
            newContent = `// Données de cours pour ${fileInfo.subject} ${fileInfo.topic}
const ${varName} = ${newContent.trim()}`;

            // S'assurer que ça se termine par ];
            if (!newContent.trim().endsWith('];')) {
                newContent = newContent.replace(/\]$/, '];');
            }

            // Ajouter l'exposition window.data
            newContent += `

// Exposition des données pour usage global (protection environnement navigateur)
if (typeof window !== 'undefined') {
    window.data = ${varName};
    window.${varName} = ${varName};

    // Debug pour confirmer l'exposition
    console.log('🎯 Données exposées dans window:', {
        'window.data': !!window.data,
        'window.${varName}': !!window.${varName},
        'nombre de compétences': ${varName}?.length || 0
    });
}

// export default ${varName};
`;

            // Écrire le fichier corrigé
            fs.writeFileSync(fileInfo.path, newContent, 'utf8');
            this.fixedCount++;
            
            console.log(`✅ Corrigé: ${fileInfo.subject}/${fileInfo.topic}`);
            
        } catch (error) {
            console.log(`❌ Erreur ${fileInfo.subject}/${fileInfo.topic}:`, error.message);
        }
    }

    // 🔧 Corriger le fichier legacyConverter
    fixLegacyConverter() {
        const legacyPath = path.join(this.dataDir, 'legacyConverter.js');
        if (fs.existsSync(legacyPath)) {
            try {
                const content = fs.readFileSync(legacyPath, 'utf8');
                
                let newContent = content;
                
                // Ajouter const si manquant
                if (!newContent.includes('const legacyConverter')) {
                    newContent = `const legacyConverter = {
    niveau: "general",
    chapitre: "Outils de conversion",
    competences: []
};

${newContent}`;
                }

                // Ajouter l'exposition window.data
                newContent += `

// Exposition des données pour usage global (protection environnement navigateur)
if (typeof window !== 'undefined') {
    window.data = legacyConverter;
    window.legacyConverter = legacyConverter;

    // Debug pour confirmer l'exposition
    console.log('🎯 Legacy converter exposé dans window:', {
        'window.data': !!window.data,
        'window.legacyConverter': !!window.legacyConverter
    });
}

// export default legacyConverter;
`;

                fs.writeFileSync(legacyPath, newContent, 'utf8');
                console.log(`✅ Corrigé: legacyConverter`);
                this.fixedCount++;
                
            } catch (error) {
                console.log(`❌ Erreur legacyConverter:`, error.message);
            }
        }
    }

    // 🔧 Corriger le fichier reference
    fixReference() {
        const refPath = path.join(this.dataDir, 'reference.js');
        if (fs.existsSync(refPath)) {
            try {
                const content = fs.readFileSync(refPath, 'utf8');
                
                let newContent = content;
                
                // Ajouter const si manquant
                if (!newContent.includes('const reference')) {
                    newContent = `const reference = {
    niveau: "general",
    chapitre: "Documentation",
    competences: []
};

${newContent}`;
                }

                // Ajouter l'exposition window.data
                newContent += `

// Exposition des données pour usage global (protection environnement navigateur)
if (typeof window !== 'undefined') {
    window.data = reference;
    window.reference = reference;

    // Debug pour confirmer l'exposition
    console.log('🎯 Reference exposée dans window:', {
        'window.data': !!window.data,
        'window.reference': !!window.reference
    });
}

// export default reference;
`;

                fs.writeFileSync(refPath, newContent, 'utf8');
                console.log(`✅ Corrigé: reference`);
                this.fixedCount++;
                
            } catch (error) {
                console.log(`❌ Erreur reference:`, error.message);
            }
        }
    }

    // 🚀 Lancer la correction
    async runFixes() {
        const files = this.findNonMathFiles();
        console.log(`📄 ${files.length} fichiers non-math trouvés\n`);
        
        // Corriger les fichiers anglais/français
        files.forEach(file => this.fixFile(file));
        
        // Corriger les fichiers spéciaux
        this.fixLegacyConverter();
        this.fixReference();
        
        console.log(`\n📊 RÉSULTATS DE CORRECTION`);
        console.log(`=========================`);
        console.log(`✅ ${this.fixedCount} fichiers corrigés`);
        console.log(`\n🎯 Tous les fichiers sont maintenant au format uniforme !`);
    }
}

// 🚀 Exécution
const fixer = new FileFixer();
fixer.runFixes();
