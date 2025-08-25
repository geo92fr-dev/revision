// SYSTÈME D'AUTO-DÉTECTION
// Détecte automatiquement les nouveaux fichiers .js et met à jour l'index

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function detectNewFiles() {
  const dataDir = path.join(__dirname, 'data/mathematiques/6ieme');
  const indexPath = path.join(dataDir, 'index.js');
  
  try {
    const files = await fs.readdir(dataDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && f !== 'index.js');
    
    // Lire l'index actuel
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    
    // Détecter les nouveaux fichiers
    const newFiles = jsFiles.filter(file => !indexContent.includes(file));
    
    if (newFiles.length > 0) {
      console.log('🔍 Nouveaux fichiers détectés:', newFiles);
      
      // Régénérer l'index automatiquement
      await regenerateIndex(dataDir, jsFiles);
      
      return { newFiles, updated: true };
    }
    
    return { newFiles: [], updated: false };
    
  } catch (error) {
    console.error('❌ Erreur auto-détection:', error.message);
    return { error: error.message };
  }
}

async function regenerateIndex(dataDir, allFiles) {
  console.log('🔄 Régénération automatique de l\'index...');
  
  try {
    // Générer les imports
    const imports = [];
    const exports = [];
    const consolidatedExports = [];
    
    for (const file of allFiles) {
      const baseName = path.basename(file, '.js');
      const camelCaseName = toCamelCase(baseName) + '6eme';
      
      imports.push(`import { ${camelCaseName} } from './${file}';`);
      exports.push(`  ${camelCaseName},`);
      consolidatedExports.push(`  '${baseName}': ${camelCaseName},`);
    }
    
    // Créer le contenu de l'index
    const indexContent = `// INDEX MAÎTRE AUTO-GÉNÉRÉ
// ⚠️ Ce fichier est généré automatiquement - Ne pas modifier manuellement

${imports.join('\n')}

// Export consolidé automatique avec clés quoted pour compatibilité
export const mathematiques6eme = {
${consolidatedExports.join('\n')}
};

// Export des modules individuels en camelCase pour compatibilité
export {
${exports.join('\n')}
};

// Export par défaut pour compatibilité
export default mathematiques6eme;`;

    // Écrire le nouvel index
    await fs.writeFile(path.join(dataDir, 'index.js'), indexContent, 'utf8');
    
    console.log('✅ Index régénéré automatiquement avec', allFiles.length, 'modules');
    
  } catch (error) {
    console.error('❌ Erreur régénération index:', error.message);
    throw error;
  }
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Export du système
export default { detectNewFiles };
