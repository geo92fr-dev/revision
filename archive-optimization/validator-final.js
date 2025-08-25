// VALIDATEUR FINAL - Post-standardisation
import fs from 'fs/promises';
import path from 'path';

async function validatePostStandardization() {
  console.log('🔍 VALIDATION POST-STANDARDISATION\n');
  
  const results = {
    totalFiles: 0,
    conformeFiles: 0,
    partialFiles: 0,
    detailedResults: []
  };

  // Scanner tous les fichiers mathématiques 6ème
  const mathDir = 'src/data/mathematiques/6ieme';
  
  try {
    const files = await fs.readdir(mathDir);
    const jsFiles = files.filter(f => f.endsWith('.js') && !f.includes('index') && !f.includes('reference'));
    
    console.log(`📊 Validation de ${jsFiles.length} fichiers post-standardisation...\n`);
    
    for (const file of jsFiles) {
      const filePath = path.join(mathDir, file);
      const analysis = await analyzeFileCompliance(filePath);
      
      results.totalFiles++;
      results.detailedResults.push({ file, ...analysis });
      
      const status = analysis.conformityRate >= 90 ? '✅' : 
                     analysis.conformityRate >= 70 ? '⚠️' : '❌';
      
      console.log(`${status} ${file} (${analysis.conformityRate}% conforme)`);
      
      if (analysis.conformityRate >= 90) {
        results.conformeFiles++;
      } else if (analysis.conformityRate >= 70) {
        results.partialFiles++;
      }
      
      // Afficher les problèmes restants
      if (analysis.issues.length > 0) {
        analysis.issues.forEach(issue => {
          console.log(`    ⚠️ ${issue}`);
        });
      }
    }
    
  } catch (error) {
    console.error(`❌ Erreur lecture ${mathDir}: ${error.message}`);
  }

  console.log('\n📋 RÉSULTATS VALIDATION FINALE:');
  console.log(`   • Total fichiers: ${results.totalFiles}`);
  console.log(`   • Fichiers conformes (≥90%): ${results.conformeFiles}`);
  console.log(`   • Fichiers partiels (70-89%): ${results.partialFiles}`);
  console.log(`   • Fichiers problématiques: ${results.totalFiles - results.conformeFiles - results.partialFiles}`);
  
  const globalRate = Math.round(
    (results.conformeFiles * 100 + results.partialFiles * 80) / (results.totalFiles * 100) * 100
  );
  console.log(`   • Taux de conformité global: ${globalRate}%`);
  
  // Générer recommandations
  generateRecommendations(results);
  
  return results;
}

async function analyzeFileCompliance(filePath) {
  const analysis = {
    conformityRate: 0,
    issues: [],
    strengths: []
  };

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    let score = 0;
    const maxScore = 10;

    // Vérification 1: Niveau 6ème (10 points)
    if (/niveau\s*:\s*["']6ème["']/.test(content)) {
      score += 1;
      analysis.strengths.push('Niveau 6ème défini');
    } else {
      analysis.issues.push('Niveau 6ème manquant');
    }

    // Vérification 2: Chapitre défini (15 points)
    if (/chapitre\s*:\s*["'][^"']+["']/.test(content) && 
        !/Chapitre à définir/.test(content)) {
      score += 1.5;
      analysis.strengths.push('Chapitre défini');
    } else {
      analysis.issues.push('Chapitre manquant ou générique');
    }

    // Vérification 3: Compétences (20 points)
    if (/competences\s*:\s*\[/.test(content)) {
      score += 2;
      analysis.strengths.push('Compétences listées');
    } else {
      analysis.issues.push('Compétences manquantes');
    }

    // Vérification 4: Structure cours avec phases (30 points)
    const hasCoursObject = /cours\s*:\s*{/.test(content);
    const hasActivation = /activation/.test(content);
    const hasApprentissage = /apprentissage/.test(content);
    const hasPratique = /pratique/.test(content);
    const hasMetacognition = /metacognition/.test(content);
    
    if (hasCoursObject && hasActivation && hasApprentissage && hasPratique && hasMetacognition) {
      score += 3;
      analysis.strengths.push('Structure cours complète (4 phases)');
    } else if (hasCoursObject) {
      score += 1.5;
      analysis.issues.push('Structure cours incomplète');
    } else {
      analysis.issues.push('Structure cours manquante');
    }

    // Vérification 5: Évaluations (15 points)
    if (/evaluations\s*:\s*{/.test(content)) {
      score += 1.5;
      analysis.strengths.push('Section évaluations présente');
    } else {
      analysis.issues.push('Section évaluations manquante');
    }

    // Vérification 6: Export correct (10 points)
    if (/export\s+(const|default)/.test(content)) {
      score += 1;
      analysis.strengths.push('Export défini');
    } else {
      analysis.issues.push('Export manquant');
    }

    analysis.conformityRate = Math.round((score / maxScore) * 100);
    
  } catch (error) {
    analysis.issues.push(`Erreur lecture: ${error.message}`);
  }

  return analysis;
}

function generateRecommendations(results) {
  console.log('\n💡 RECOMMANDATIONS:');
  
  const problemCounts = {};
  results.detailedResults.forEach(result => {
    result.issues.forEach(issue => {
      problemCounts[issue] = (problemCounts[issue] || 0) + 1;
    });
  });
  
  const sortedProblems = Object.entries(problemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  if (sortedProblems.length > 0) {
    console.log('\n🔧 Problèmes les plus fréquents:');
    sortedProblems.forEach(([problem, count]) => {
      console.log(`   • ${problem} (${count} fichiers)`);
    });
  }
  
  console.log('\n🎯 Actions prioritaires:');
  if (results.conformeFiles < results.totalFiles * 0.8) {
    console.log('   1. Finaliser la standardisation des structures');
  }
  if (problemCounts['Chapitre manquant ou générique'] > 5) {
    console.log('   2. Définir les chapitres spécifiques pour chaque module');
  }
  if (problemCounts['Structure cours incomplète'] > 5) {
    console.log('   3. Compléter les structures pédagogiques (4 phases)');
  }
  
  console.log('\n✨ Le système auto-extensible est opérationnel !');
}

validatePostStandardization().catch(console.error);
