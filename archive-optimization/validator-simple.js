// VALIDATEUR SIMPLE - Analyse des fichiers de données
import fs from 'fs/promises';
import path from 'path';

async function validateDataStructure() {
  console.log('🔍 VALIDATION DE LA STRUCTURE DES DONNÉES\n');
  
  const results = {
    totalFiles: 0,
    validFiles: 0,
    incompleteFiles: [],
    issues: []
  };

  // Scanner les fichiers de données mathématiques 6ème
  const mathDir = 'src/data/mathematiques/6ieme';
  
  try {
    const files = await fs.readdir(mathDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('reference'));
    
    console.log(`📊 Analyse de ${jsFiles.length} fichiers mathématiques 6ème...\n`);
    
    for (const file of jsFiles) {
      const filePath = path.join(mathDir, file);
      const analysis = await analyzeFile(filePath);
      results.totalFiles++;
      
      const status = analysis.completeness >= 80 ? '✅' : 
                     analysis.completeness >= 40 ? '⚠️' : '❌';
      
      console.log(`${status} ${file} (${analysis.completeness}% conforme)`);
      
      if (analysis.issues.length > 0) {
        analysis.issues.forEach(issue => {
          console.log(`    • ${issue}`);
        });
      }
      
      if (analysis.completeness >= 80) {
        results.validFiles++;
      } else {
        results.incompleteFiles.push({
          file: file,
          completeness: analysis.completeness,
          issues: analysis.issues
        });
      }
    }
    
  } catch (error) {
    console.error(`❌ Erreur lecture ${mathDir}: ${error.message}`);
  }

  console.log('\n📋 RÉSULTATS DE VALIDATION:');
  console.log(`   • Total fichiers: ${results.totalFiles}`);
  console.log(`   • Fichiers valides: ${results.validFiles}`);
  console.log(`   • Fichiers à améliorer: ${results.incompleteFiles.length}`);
  
  const conformityRate = Math.round((results.validFiles / results.totalFiles) * 100);
  console.log(`   • Taux de conformité: ${conformityRate}%`);
  
  return results;
}

async function analyzeFile(filePath) {
  const analysis = {
    completeness: 0,
    issues: []
  };

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    let score = 0;
    const maxScore = 8;

    // Vérifications de base
    if (/niveau\s*:\s*["']6ème["']/.test(content)) {
      score++;
    } else {
      analysis.issues.push('Niveau 6ème manquant ou incorrect');
    }

    if (/chapitre\s*:\s*["']/.test(content)) {
      score++;
    } else {
      analysis.issues.push('Champ chapitre manquant');
    }

    if (/competences\s*:\s*\[/.test(content)) {
      score++;
    } else {
      analysis.issues.push('Tableau competences manquant');
    }

    // Vérifier export
    if (/export\s+const\s+\w+6eme/.test(content)) {
      score++;
    } else {
      analysis.issues.push('Export const principal manquant');
    }

    if (/export\s+default/.test(content)) {
      score++;
    } else {
      analysis.issues.push('Export default manquant');
    }

    // Structure cours
    if (/cours\s*:\s*{/.test(content)) {
      score += 2; // Bonus pour structure objet
      
      // Vérifier phases
      const phases = ['activation', 'apprentissage', 'pratique', 'metacognition'];
      const hasPhases = phases.every(phase => content.includes(phase));
      if (hasPhases) {
        score++;
      } else {
        analysis.issues.push('Phases pédagogiques manquantes (activation, apprentissage, pratique, métacognition)');
      }
    } else if (/cours\s*:\s*["']/.test(content)) {
      score++; // Structure simple string
      analysis.issues.push('Structure cours simplifiée - devrait être un objet avec phases');
    } else {
      analysis.issues.push('Champ cours manquant');
    }

    analysis.completeness = Math.round((score / maxScore) * 100);
    
  } catch (error) {
    analysis.issues.push(`Erreur lecture fichier: ${error.message}`);
  }

  return analysis;
}

validateDataStructure().catch(console.error);
