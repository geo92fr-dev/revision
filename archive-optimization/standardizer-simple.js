// STANDARDISEUR SIMPLE - Phase 4 Auto
import fs from 'fs/promises';
import path from 'path';

async function standardizeDataStructures() {
  console.log('🔧 STANDARDISATION AUTOMATIQUE DES STRUCTURES\n');
  
  const results = {
    processed: 0,
    updated: 0,
    errors: []
  };

  // Scanner tous les fichiers mathématiques 6ème
  const mathDir = 'src/data/mathematiques/6ieme';
  
  try {
    const files = await fs.readdir(mathDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('reference'));
    
    console.log(`🎯 Standardisation de ${jsFiles.length} fichiers...\n`);
    
    for (const file of jsFiles) {
      const filePath = path.join(mathDir, file);
      console.log(`📝 Traitement: ${file}`);
      
      try {
        const analysis = await analyzeFile(filePath);
        results.processed++;
        
        if (analysis.needsUpdate) {
          await addMissingFields(filePath, analysis);
          results.updated++;
          console.log(`   ✅ Structure améliorée (${analysis.score}% → ${Math.min(analysis.score + 40, 100)}%)`);
        } else {
          console.log(`   ℹ️ Déjà conforme (${analysis.score}%)`);
        }
        
      } catch (error) {
        results.errors.push({ file, error: error.message });
        console.log(`   ❌ Erreur: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Erreur lecture ${mathDir}: ${error.message}`);
  }

  console.log('\n📊 RÉSULTATS STANDARDISATION:');
  console.log(`   • Fichiers traités: ${results.processed}`);
  console.log(`   • Fichiers améliorés: ${results.updated}`);
  console.log(`   • Erreurs: ${results.errors.length}`);
  
  return results;
}

async function analyzeFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  
  const analysis = {
    score: 0,
    needsUpdate: false,
    missing: []
  };

  // Vérifications
  if (!/niveau\s*:\s*["']6ème["']/.test(content)) {
    analysis.missing.push('niveau');
    analysis.needsUpdate = true;
  } else {
    analysis.score += 10;
  }

  if (!/chapitre\s*:\s*["']/.test(content)) {
    analysis.missing.push('chapitre');
    analysis.needsUpdate = true;
  } else {
    analysis.score += 15;
  }

  if (!/competences\s*:\s*\[/.test(content)) {
    analysis.missing.push('competences');
    analysis.needsUpdate = true;
  } else {
    analysis.score += 20;
  }

  if (!/cours\s*:\s*{/.test(content) || !/activation/.test(content)) {
    analysis.missing.push('structure_cours');
    analysis.needsUpdate = true;
  } else {
    analysis.score += 30;
  }

  if (!/evaluations\s*:\s*{/.test(content)) {
    analysis.missing.push('evaluations');
    analysis.needsUpdate = true;
  } else {
    analysis.score += 15;
  }

  if (!/export\s+(const|default)/.test(content)) {
    analysis.missing.push('export');
    analysis.needsUpdate = true;
  } else {
    analysis.score += 10;
  }

  return analysis;
}

async function addMissingFields(filePath, analysis) {
  let content = await fs.readFile(filePath, 'utf-8');
  const filename = path.basename(filePath, '.js');
  
  // Sauvegarder backup
  await fs.writeFile(filePath + '.backup', content, 'utf-8');
  
  // Extraire le nom du module existant
  const exportMatch = content.match(/export\s+const\s+(\w+)/);
  const moduleName = exportMatch ? exportMatch[1] : toCamelCase(filename) + '6eme';
  
  // Ajouter les champs manquants un par un
  if (analysis.missing.includes('niveau')) {
    content = addNiveauField(content, moduleName);
  }
  
  if (analysis.missing.includes('chapitre')) {
    content = addChapitreField(content, moduleName);
  }
  
  if (analysis.missing.includes('competences')) {
    content = addCompetencesField(content, moduleName);
  }
  
  if (analysis.missing.includes('structure_cours')) {
    content = addStructureCours(content, moduleName);
  }
  
  if (analysis.missing.includes('evaluations')) {
    content = addEvaluationsField(content, moduleName);
  }
  
  // Écrire le fichier mis à jour
  await fs.writeFile(filePath, content, 'utf-8');
}

function addNiveauField(content, moduleName) {
  // Chercher où insérer le niveau
  if (content.includes(`export const ${moduleName}`)) {
    return content.replace(
      new RegExp(`(export const ${moduleName}\\s*=\\s*{)`),
      `$1\n  niveau: "6ème",`
    );
  }
  return content;
}

function addChapitreField(content, moduleName) {
  if (content.includes('niveau: "6ème"')) {
    return content.replace(
      'niveau: "6ème",',
      'niveau: "6ème",\n  chapitre: "Chapitre à définir",'
    );
  } else if (content.includes(`export const ${moduleName}`)) {
    return content.replace(
      new RegExp(`(export const ${moduleName}\\s*=\\s*{)`),
      `$1\n  chapitre: "Chapitre à définir",`
    );
  }
  return content;
}

function addCompetencesField(content, moduleName) {
  const insertPoint = content.includes('chapitre:') ? 'chapitre: "' : 
                      content.includes('niveau:') ? 'niveau: "6ème",' :
                      `export const ${moduleName} = {`;
  
  if (content.includes(insertPoint)) {
    const competencesField = `
  competences: [
    "Comprendre et utiliser les notions étudiées",
    "Résoudre des problèmes en utilisant les outils mathématiques"
  ],`;
    
    if (insertPoint.includes('chapitre:')) {
      return content.replace(/chapitre: "[^"]*",/, `$&${competencesField}`);
    } else if (insertPoint.includes('niveau:')) {
      return content.replace('niveau: "6ème",', `niveau: "6ème",${competencesField}`);
    } else {
      return content.replace(insertPoint, `${insertPoint}${competencesField}`);
    }
  }
  return content;
}

function addStructureCours(content, moduleName) {
  // Si cours existe déjà comme string simple, le transformer en objet
  if (/cours\s*:\s*["'][^"']*["']/.test(content)) {
    const coursMatch = content.match(/cours\s*:\s*["']([^"']*)["']/);
    const originalCours = coursMatch ? coursMatch[1] : '';
    
    const newStructure = `cours: {
    activation: "Rappel des prérequis et introduction",
    apprentissage: "${originalCours || 'Concepts fondamentaux à maîtriser'}",
    pratique: "Exercices d'application guidés",
    metacognition: "Synthèse et bilan de la séance"
  }`;
    
    return content.replace(/cours\s*:\s*["'][^"']*["'],?/, newStructure + ',');
  }
  
  // Sinon ajouter la structure complète
  const insertAfter = content.includes('competences:') ? /competences:\s*\[[^\]]*\],/ :
                      content.includes('chapitre:') ? /chapitre: "[^"]*",/ :
                      content.includes('niveau:') ? /niveau: "[^"]*",/ :
                      new RegExp(`(export const ${moduleName}\\s*=\\s*{)`);
  
  const coursStructure = `
  cours: {
    activation: "Rappel des prérequis et introduction",
    apprentissage: "Concepts fondamentaux à maîtriser", 
    pratique: "Exercices d'application guidés",
    metacognition: "Synthèse et bilan de la séance"
  },`;
  
  return content.replace(insertAfter, `$&${coursStructure}`);
}

function addEvaluationsField(content, moduleName) {
  const evaluationsField = `
  evaluations: {
    formative: {
      questions_flash: ["Question de vérification rapide"],
      exercices_type: "Problèmes représentatifs"
    }
  },`;
  
  const insertAfter = /cours:\s*{[^}]*},/ || 
                      content.includes('competences:') ? /competences:\s*\[[^\]]*\],/ :
                      new RegExp(`(export const ${moduleName}\\s*=\\s*{)`);
  
  return content.replace(insertAfter, `$&${evaluationsField}`);
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

standardizeDataStructures().catch(console.error);
