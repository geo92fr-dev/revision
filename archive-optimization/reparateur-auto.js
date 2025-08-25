// RÉPARATEUR AUTOMATIQUE - Correction des structures modifiées
import fs from 'fs/promises';
import path from 'path';

async function repairModifiedFiles() {
  console.log('🔧 RÉPARATION AUTOMATIQUE DES FICHIERS MODIFIÉS\n');
  
  const results = {
    processed: 0,
    repaired: 0,
    errors: []
  };

  // Scanner tous les fichiers mathématiques 6ème
  const mathDir = 'src/data/mathematiques/6ieme';
  
  try {
    const files = await fs.readdir(mathDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('reference'));
    
    console.log(`🎯 Réparation de ${jsFiles.length} fichiers...\n`);
    
    for (const file of jsFiles) {
      const filePath = path.join(mathDir, file);
      console.log(`🔍 Analyse: ${file}`);
      
      try {
        const needsRepair = await analyzeAndRepair(filePath);
        results.processed++;
        
        if (needsRepair) {
          results.repaired++;
          console.log(`   ✅ Réparé avec succès`);
        } else {
          console.log(`   ℹ️ Aucune réparation nécessaire`);
        }
        
      } catch (error) {
        results.errors.push({ file, error: error.message });
        console.log(`   ❌ Erreur: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Erreur lecture ${mathDir}: ${error.message}`);
  }

  console.log('\n📊 RÉSULTATS RÉPARATION:');
  console.log(`   • Fichiers analysés: ${results.processed}`);
  console.log(`   • Fichiers réparés: ${results.repaired}`);
  console.log(`   • Erreurs: ${results.errors.length}`);
  
  return results;
}

async function analyzeAndRepair(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');
  const originalContent = content;
  let needsRepair = false;
  
  // Sauvegarder backup
  await fs.writeFile(filePath + '.repair-backup', content, 'utf-8');
  
  // 1. Corriger les problèmes de structure cours
  if (content.includes('cours: {') && content.includes('},addition')) {
    console.log('   🔧 Correction structure cours cassée...');
    content = fixBrokenCoursStructure(content);
    needsRepair = true;
  }
  
  // 2. Corriger les problèmes d'exports manquants
  if (!content.includes('export const') && !content.includes('export default')) {
    console.log('   🔧 Ajout export manquant...');
    content = addMissingExport(content, filePath);
    needsRepair = true;
  }
  
  // 3. Standardiser la structure si nécessaire
  if (content.includes('const data = {') && !content.includes('export const')) {
    console.log('   🔧 Conversion en export ES6...');
    content = convertToES6Export(content, filePath);
    needsRepair = true;
  }
  
  // 4. Corriger les chaînes de caractères cassées
  if (content.includes('apprentissage: "') && content.includes('",addition')) {
    console.log('   🔧 Correction chaînes cassées...');
    content = fixBrokenStrings(content);
    needsRepair = true;
  }
  
  // 5. Assurer la cohérence de la structure
  content = ensureConsistentStructure(content, filePath);
  
  if (content !== originalContent) {
    await fs.writeFile(filePath, content, 'utf-8');
    needsRepair = true;
  }
  
  return needsRepair;
}

function fixBrokenCoursStructure(content) {
  // Corriger les structures cours cassées comme :
  // cours: { activation: "...", apprentissage: "L", pratique: "...", metacognition: "..." },addition et la soustraction...
  
  const brokenCoursPattern = /cours:\s*{\s*activation:\s*"[^"]*",\s*apprentissage:\s*"[^"]*",\s*pratique:\s*"[^"]*",\s*metacognition:\s*"[^"]*"\s*},([^,\n]*)/g;
  
  return content.replace(brokenCoursPattern, (match, afterText) => {
    return `cours: {
    activation: "Rappel des prérequis et introduction du sujet",
    apprentissage: "Concepts fondamentaux : ${afterText.trim()}",
    pratique: "Exercices d'application guidés et pratique",
    metacognition: "Synthèse et bilan des apprentissages"
  },`;
  });
}

function fixBrokenStrings(content) {
  // Corriger les chaînes cassées
  return content.replace(/apprentissage:\s*"[^"]*",\s*([^,\n}]+)/g, (match, continuation) => {
    return `apprentissage: "Concepts fondamentaux à maîtriser : ${continuation.trim()}",`;
  });
}

function convertToES6Export(content, filePath) {
  const filename = path.basename(filePath, '.js');
  const exportName = toCamelCase(filename) + '6eme';
  
  // Remplacer const data = { par export const nomModule6eme = {
  content = content.replace('const data = {', `export const ${exportName} = {`);
  
  // Ajouter export default à la fin si pas présent
  if (!content.includes('export default')) {
    content += `\n\nexport default ${exportName};\n`;
  }
  
  return content;
}

function addMissingExport(content, filePath) {
  const filename = path.basename(filePath, '.js');
  const exportName = toCamelCase(filename) + '6eme';
  
  // Si le fichier n'a pas d'export, l'ajouter
  if (!content.includes('export')) {
    // Trouver la fin de l'objet principal
    const lastBraceIndex = content.lastIndexOf('};');
    if (lastBraceIndex !== -1) {
      content = content.slice(0, lastBraceIndex + 2) + 
               `\n\nexport { data as ${exportName} };\nexport default data;\n` + 
               content.slice(lastBraceIndex + 2);
    }
  }
  
  return content;
}

function ensureConsistentStructure(content, filePath) {
  const filename = path.basename(filePath, '.js');
  
  // S'assurer que le niveau 6ème est présent
  if (!content.includes('niveau: "6ème"')) {
    content = content.replace(/^(\s*)(export const \w+ = {)/, '$1$2\n$1  niveau: "6ème",');
  }
  
  // S'assurer qu'il y a un chapitre défini
  if (!content.includes('chapitre:') || content.includes('chapitre: "Chapitre à définir"')) {
    const defaultChapter = getDefaultChapter(filename);
    content = content.replace(/chapitre: "[^"]*",?/, `chapitre: "${defaultChapter}",`);
    
    if (!content.includes('chapitre:')) {
      content = content.replace(/(niveau: "6ème",)/, `$1\n  chapitre: "${defaultChapter}",`);
    }
  }
  
  return content;
}

function getDefaultChapter(filename) {
  const chapters = {
    'addition-soustraction': 'Nombres & Calculs',
    'multiplication': 'Nombres & Calculs', 
    'division': 'Nombres & Calculs',
    'fractions': 'Nombres & Calculs',
    'fractions-simples': 'Nombres & Calculs',
    'nombres-decimaux': 'Nombres & Calculs',
    'nombres-entiers': 'Nombres & Calculs',
    'proportionnalite': 'Nombres & Calculs',
    'moyenne': 'Données & Statistiques',
    'graphiques': 'Données & Statistiques',
    'lecture-tableaux': 'Données & Statistiques',
    'figures-planes': 'Géométrie',
    'constructions-geometriques': 'Géométrie',
    'symetrie-axiale': 'Géométrie',
    'aires-figures': 'Grandeurs & Mesures',
    'perimetre': 'Grandeurs & Mesures',
    'unites-longueur': 'Grandeurs & Mesures',
    'unites-masse-capacite': 'Grandeurs & Mesures',
    'durees': 'Grandeurs & Mesures',
    'algebre': 'Nombres & Calculs'
  };
  
  return chapters[filename] || 'Mathématiques 6ème';
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

repairModifiedFiles().catch(console.error);
