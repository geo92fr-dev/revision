// Script pour corriger automatiquement les noms d'exports
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ExportFixer {
    constructor() {
        this.baseDir = path.resolve(__dirname, '..');
        this.dataDir = path.join(this.baseDir, 'data');
        this.fixes = [];
    }

    async fixAllExports() {
        console.log('🔧 Correction automatique des exports...');
        
        const mathDir = path.join(this.dataDir, 'mathematiques', '6ieme');
        const files = await fs.readdir(mathDir);
        const jsFiles = files.filter(file => file.endsWith('.js') && file !== 'index.js');

        for (const file of jsFiles) {
            const filePath = path.join(mathDir, file);
            await this.fixFileExports(file, filePath);
        }

        console.log(`✅ ${this.fixes.length} fichiers corrigés !`);
        return this.fixes;
    }

    async fixFileExports(fileName, filePath) {
        const topicName = fileName.replace('.js', '');
        const expectedExport = this.getExpectedExportName(topicName);
        
        try {
            let content = await fs.readFile(filePath, 'utf8');
            const originalContent = content;

            // Vérifier si le bon export existe déjà
            if (content.includes(`export const ${expectedExport}`)) {
                console.log(`✓ ${fileName} - déjà correct`);
                return;
            }

            // Patterns à rechercher et remplacer
            const patterns = [
                // Pattern 1: export const [variableName] = ...
                {
                    search: /export const (\w+) = (\w+);/g,
                    replace: (match, exportName, varName) => {
                        return `export const ${expectedExport} = ${varName};\nexport const ${exportName} = ${varName}; // Alias pour compatibilité`;
                    }
                },
                // Pattern 2: export { [variableName] };
                {
                    search: /export { (\w+) };/g,
                    replace: (match, varName) => {
                        return `export const ${expectedExport} = ${varName};\nexport { ${varName} }; // Export original`;
                    }
                },
                // Pattern 3: export default [variableName];
                {
                    search: /export default (\w+);/g,
                    replace: (match, varName) => {
                        return `export const ${expectedExport} = ${varName};\nexport default ${varName};`;
                    }
                }
            ];

            let modified = false;
            for (const pattern of patterns) {
                if (pattern.search.test(content)) {
                    content = content.replace(pattern.search, pattern.replace);
                    modified = true;
                    break;
                }
            }

            // Si aucun pattern trouvé, ajouter l'export manquant
            if (!modified) {
                // Chercher le nom de la variable principale
                const varMatch = content.match(/const (\w+) = {/);
                if (varMatch) {
                    const varName = varMatch[1];
                    // Ajouter l'export avant les exports existants
                    const exportSection = content.match(/(export.*)/g);
                    if (exportSection) {
                        content = content.replace(
                            exportSection[0],
                            `export const ${expectedExport} = ${varName};\n${exportSection[0]}`
                        );
                        modified = true;
                    }
                }
            }

            if (modified && content !== originalContent) {
                await fs.writeFile(filePath, content, 'utf8');
                this.fixes.push({
                    file: fileName,
                    expectedExport,
                    status: 'fixed'
                });
                console.log(`✅ ${fileName} - export ${expectedExport} ajouté`);
            } else {
                console.log(`⚠️  ${fileName} - aucune modification nécessaire`);
            }

        } catch (error) {
            console.error(`❌ Erreur sur ${fileName}:`, error.message);
            this.fixes.push({
                file: fileName,
                expectedExport,
                status: 'error',
                error: error.message
            });
        }
    }

    getExpectedExportName(topicName) {
        // Convertir kebab-case vers camelCase + 6ieme
        const camelTopic = topicName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        return `${camelTopic}6eme`;
    }
}

// Exécution
if (import.meta.url === `file://${process.argv[1]}`) {
    const fixer = new ExportFixer();
    await fixer.fixAllExports();
}

export default ExportFixer;
