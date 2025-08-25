// CORRECTEUR SPÉCIALISÉ - Finalisation de la structure
import fs from 'fs/promises';
import path from 'path';

async function finalizeFileStructures() {
  console.log('🎯 CORRECTION FINALE DES STRUCTURES\n');
  
  const results = {
    processed: 0,
    corrected: 0,
    errors: []
  };

  const mathDir = 'src/data/mathematiques/6ieme';
  
  try {
    const files = await fs.readdir(mathDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && !f.includes('index'));
    
    console.log(`🔧 Finalisation de ${jsFiles.length} fichiers...\n`);
    
    for (const file of jsFiles) {
      const filePath = path.join(mathDir, file);
      console.log(`📝 Correction: ${file}`);
      
      try {
        const corrected = await correctFileStructure(filePath);
        results.processed++;
        
        if (corrected) {
          results.corrected++;
          console.log(`   ✅ Structure finalisée`);
        } else {
          console.log(`   ℹ️ Déjà correct`);
        }
        
      } catch (error) {
        results.errors.push({ file, error: error.message });
        console.log(`   ❌ Erreur: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
  }

  console.log('\n📊 RÉSULTATS CORRECTION:');
  console.log(`   • Fichiers traités: ${results.processed}`);
  console.log(`   • Fichiers corrigés: ${results.corrected}`);
  console.log(`   • Erreurs: ${results.errors.length}`);
  
  return results;
}

async function correctFileStructure(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');
  const originalContent = content;
  const filename = path.basename(filePath, '.js');
  
  // Sauvegarder backup
  await fs.writeFile(filePath + '.final-backup', content, 'utf-8');
  
  // Créer une structure propre standardisée
  const cleanStructure = await buildCleanStructure(content, filename);
  
  if (cleanStructure !== content) {
    await fs.writeFile(filePath, cleanStructure, 'utf-8');
    return true;
  }
  
  return false;
}

async function buildCleanStructure(originalContent, filename) {
  // Extraire les données existantes
  const extractedData = extractExistingData(originalContent);
  const exportName = toCamelCase(filename) + '6eme';
  
  const cleanStructure = `// ${extractedData.titre || filename.replace(/-/g, ' ').toUpperCase()}
// Cours de mathématiques 6ème

export const ${exportName} = {
  niveau: "6ème",
  chapitre: "${extractedData.chapitre || getDefaultChapter(filename)}",
  titre: "${extractedData.titre || 'Module ' + filename.replace(/-/g, ' ')}",
  
  competences: ${JSON.stringify(extractedData.competences || [
    "Comprendre et utiliser les notions étudiées",
    "Résoudre des problèmes mathématiques"
  ], null, 2)},
  
  cours: {
    activation: "Rappel des prérequis et motivation",
    apprentissage: "${extractedData.apprentissage || 'Concepts fondamentaux à maîtriser'}",
    pratique: "Exercices d'application et entraînement",
    metacognition: "Synthèse et bilan des apprentissages"
  },
  
  ${extractedData.exercices ? `exercices: ${JSON.stringify(extractedData.exercices, null, 2)},\n  ` : ''}
  
  evaluations: {
    formative: {
      questions_flash: ["Questions de vérification rapide"],
      exercices_type: "Problèmes représentatifs du niveau"
    }
  }
};

export default ${exportName};

// Structure standardisée - ${new Date().toLocaleString('fr-FR')}`;

  return cleanStructure;
}

function extractExistingData(content) {
  const data = {};
  
  // Extraire titre
  const titleMatch = content.match(/titre:\s*["']([^"']+)["']/);
  if (titleMatch) data.titre = titleMatch[1];
  
  // Extraire chapitre
  const chapitreMatch = content.match(/chapitre:\s*["']([^"']+)["']/);
  if (chapitreMatch) data.chapitre = chapitreMatch[1];
  
  // Extraire compétences (première compétence si structure complexe)
  const competenceMatch = content.match(/titre:\s*["']([^"']+)["']/);
  if (competenceMatch) {
    data.competences = [competenceMatch[1]];
  }
  
  // Extraire apprentissage du cours
  const apprentissageMatch = content.match(/apprentissage:\s*["']([^"']+)["']/);
  if (apprentissageMatch) {
    data.apprentissage = apprentissageMatch[1];
  }
  
  // Extraire exercices si présents
  try {
    const exercicesMatch = content.match(/exercices:\s*(\[[^\]]+\])/s);
    if (exercicesMatch) {
      data.exercices = JSON.parse(exercicesMatch[1]);
    }
  } catch (e) {
    // Ignore si parsing échoue
  }
  
  return data;
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
    'algebre': 'Nombres & Calculs',
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
    'durees': 'Grandeurs & Mesures'
  };
  
  return chapters[filename] || 'Mathématiques 6ème';
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

finalizeFileStructures().catch(console.error);
