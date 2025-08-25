// STANDARDISEUR DE STRUCTURE - Phase 4 Auto
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
        const updated = await standardizeFile(filePath);
        results.processed++;
        
        if (updated) {
          results.updated++;
          console.log(`   ✅ Structure améliorée`);
        } else {
          console.log(`   ℹ️ Déjà conforme`);
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

async function standardizeFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const filename = path.basename(filePath, '.js');
  
  // Analyser la structure actuelle
  const analysis = analyzeCurrentStructure(content);
  
  // Si déjà conforme (score > 90%), ne pas modifier
  if (analysis.score >= 90) {
    return false;
  }
  
  // Construire la nouvelle structure standardisée
  const newContent = buildStandardizedContent(content, filename, analysis);
  
  // Sauvegarder avec backup
  await fs.writeFile(filePath + '.backup', content, 'utf-8');
  await fs.writeFile(filePath, newContent, 'utf-8');
  
  return true;
}

function analyzeCurrentStructure(content) {
  const analysis = {
    score: 0,
    issues: [],
    hasTitle: false,
    hasChapter: false,
    hasCompetences: false,
    hasStructuredCours: false,
    hasQuiz: false,
    hasExport: false
  };

  // Vérifications
  if (/titre\s*:\s*["']/.test(content)) {
    analysis.hasTitle = true;
    analysis.score += 15;
  }

  if (/chapitre\s*:\s*["']/.test(content)) {
    analysis.hasChapter = true;
    analysis.score += 15;
  }

  if (/competences\s*:\s*\[/.test(content)) {
    analysis.hasCompetences = true;
    analysis.score += 20;
  }

  if (/cours\s*:\s*{/.test(content) && /activation/.test(content)) {
    analysis.hasStructuredCours = true;
    analysis.score += 30;
  }

  if (/quiz/.test(content)) {
    analysis.hasQuiz = true;
    analysis.score += 10;
  }

  if (/export\s+(const|default)/.test(content)) {
    analysis.hasExport = true;
    analysis.score += 10;
  }

  return analysis;
}

function buildStandardizedContent(originalContent, filename, analysis) {
  // Extraire les données existantes
  const extractedData = extractExistingData(originalContent);
  
  // Template de structure standardisée
  const template = `// ${extractedData.title || filename.replace(/-/g, ' ').toUpperCase()}
// Cours de mathématiques 6ème - Structure standardisée

export const ${toCamelCase(filename)}6eme = {
  // Métadonnées
  niveau: "6ème",
  matiere: "Mathématiques",
  chapitre: "${extractedData.chapitre || 'Chapitre à définir'}",
  titre: "${extractedData.titre || 'Titre à définir'}",
  
  // Compétences ciblées
  competences: ${JSON.stringify(extractedData.competences || [
    "Comprendre et utiliser les notions étudiées",
    "Résoudre des problèmes en utilisant les outils mathématiques",
    "Modéliser une situation"
  ], null, 2)},
  
  // Structure pédagogique complète
  cours: {
    // Phase d'activation (15 min)
    activation: {
      rappels: "${extractedData.activation || 'Rappel des prérequis et introduction du sujet'}",
      objectifs: "Comprendre les enjeux de la leçon",
      activite_ouverture: "Situation problème pour motiver l'apprentissage"
    },
    
    // Phase d'apprentissage (30 min) 
    apprentissage: {
      concepts_cles: "${extractedData.apprentissage || 'Concepts fondamentaux à maîtriser'}",
      demonstrations: "Exemples détaillés et explications pas à pas",
      methodes: "Techniques et stratégies de résolution",
      proprietes: "Règles et théorèmes essentiels"
    },
    
    // Phase de pratique (30 min)
    pratique: {
      exercices_guides: "${extractedData.pratique || 'Exercices d\'application avec accompagnement'}",
      exercices_autonomes: "Problèmes à résoudre individuellement", 
      differenciation: "Adaptations selon les besoins des élèves"
    },
    
    // Phase de métacognition (10 min)
    metacognition: {
      bilan: "${extractedData.metacognition || 'Synthèse des apprentissages de la séance'}",
      autoévaluation: "Réflexion sur sa compréhension",
      liens: "Connections avec d'autres domaines mathématiques"
    }
  },
  
  // Évaluations
  evaluations: {
    formative: {
      questions_flash: [
        "Question rapide de vérification 1",
        "Question rapide de vérification 2"  
      ],
      exercices_type: "Problèmes représentatifs du niveau attendu"
    },
    
    ${extractedData.quiz ? \`quiz: \${JSON.stringify(extractedData.quiz, null, 2)},\` : ''}
  },
  
  // Ressources complémentaires
  ressources: {
    videos: [],
    liens_utiles: [],
    documents: []
  }
};

export default ${toCamelCase(filename)}6eme;

// Générée automatiquement le ${new Date().toLocaleString('fr-FR')}
// Structure standardisée pour auto-extensibilité`;

  return template;
}

function extractExistingData(content) {
  const data = {};
  
  // Extraire titre
  const titleMatch = content.match(/titre\s*:\s*["']([^"']+)["']/);
  if (titleMatch) data.titre = titleMatch[1];
  
  // Extraire chapitre  
  const chapitreMatch = content.match(/chapitre\s*:\s*["']([^"']+)["']/);
  if (chapitreMatch) data.chapitre = chapitreMatch[1];
  
  // Extraire compétences
  const competencesMatch = content.match(/competences\s*:\s*(\[[^\]]+\])/);
  if (competencesMatch) {
    try {
      data.competences = JSON.parse(competencesMatch[1]);
    } catch (e) {
      // Fallback si parsing échoue
    }
  }
  
  // Extraire cours simple
  const coursMatch = content.match(/cours\s*:\s*["']([^"']+)["']/);
  if (coursMatch) data.apprentissage = coursMatch[1];
  
  return data;
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

standardizeDataStructures().catch(console.error);
