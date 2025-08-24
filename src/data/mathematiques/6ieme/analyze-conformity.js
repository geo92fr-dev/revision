// Script d'analyse comparative des structures par rapport à reference.js
// Génère un rapport détaillé de conformité et des métriques de qualité

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ComparativeAnalyzer {
  constructor() {
    this.referenceStructure = null;
    this.analysisResults = [];
    this.metrics = {
      structuralCompliance: {},
      contentQuality: {},
      pedagogicalRichness: {}
    };
  }

  async loadReference() {
    try {
      const referencePath = path.join(__dirname, 'reference.js');
      const module = await import(referencePath);
      this.referenceStructure = module.reference6eme || module.default;
      return true;
    } catch (error) {
      console.error('❌ Impossible de charger reference.js:', error.message);
      return false;
    }
  }

  async analyzeFile(filePath, fileName) {
    try {
      const module = await import(filePath);
      const exportName = Object.keys(module).find(key => key !== 'default');
      const data = module[exportName] || module.default;

      if (!data) {
        return { fileName, error: 'Aucune donnée exportée' };
      }

      const analysis = {
        fileName,
        structuralCompliance: this.analyzeStructuralCompliance(data),
        contentQuality: this.analyzeContentQuality(data),
        pedagogicalRichness: this.analyzePedagogicalRichness(data),
        hybridModelCompliance: this.analyzeHybridModel(data),
        overallScore: 0
      };

      // Calcul du score global
      analysis.overallScore = this.calculateOverallScore(analysis);
      
      this.analysisResults.push(analysis);
      return analysis;

    } catch (error) {
      return { fileName, error: error.message };
    }
  }

  analyzeStructuralCompliance(data) {
    const compliance = {
      score: 0,
      maxScore: 100,
      details: {},
      issues: []
    };

    // Vérification de la structure principale (25 points)
    const mainStructure = this.checkMainStructure(data);
    compliance.details.mainStructure = mainStructure;
    compliance.score += mainStructure.score;

    // Vérification des compétences (35 points)
    const competencesStructure = this.checkCompetencesStructure(data);
    compliance.details.competencesStructure = competencesStructure;
    compliance.score += competencesStructure.score;

    // Vérification des IDs et formats (20 points)
    const idsFormat = this.checkIdsFormat(data);
    compliance.details.idsFormat = idsFormat;
    compliance.score += idsFormat.score;

    // Vérification des ressources (20 points)
    const resourcesStructure = this.checkResourcesStructure(data);
    compliance.details.resourcesStructure = resourcesStructure;
    compliance.score += resourcesStructure.score;

    compliance.issues = [
      ...mainStructure.issues,
      ...competencesStructure.issues,
      ...idsFormat.issues,
      ...resourcesStructure.issues
    ];

    return compliance;
  }

  checkMainStructure(data) {
    const check = { score: 0, maxScore: 25, issues: [] };
    
    // Niveau correct (5 points)
    if (data.niveau === "6ème") {
      check.score += 5;
    } else {
      check.issues.push(`Niveau incorrect: '${data.niveau}'`);
    }

    // Chapitre valide (10 points)
    const validChapters = ["Nombres & Calculs", "Géométrie", "Grandeurs & Mesures", "Organisation & Gestion de données"];
    if (validChapters.includes(data.chapitre)) {
      check.score += 10;
    } else {
      check.issues.push(`Chapitre invalide: '${data.chapitre}'`);
    }

    // Sous-chapitre présent (5 points)
    if (data.sousChapitre && typeof data.sousChapitre === 'string' && data.sousChapitre.length > 0) {
      check.score += 5;
    } else {
      check.issues.push('Sous-chapitre manquant ou vide');
    }

    // Compétences présentes (5 points)
    if (Array.isArray(data.competences) && data.competences.length > 0) {
      check.score += 5;
    } else {
      check.issues.push('Compétences manquantes ou vides');
    }

    return check;
  }

  checkCompetencesStructure(data) {
    const check = { score: 0, maxScore: 35, issues: [] };
    
    if (!Array.isArray(data.competences) || data.competences.length === 0) {
      check.issues.push('Aucune compétence trouvée');
      return check;
    }

    // Première compétence détaillée (20 points)
    const firstComp = data.competences[0];
    const detailedFields = ['objectif', 'cours', 'etapes', 'exercices', 'exemple'];
    let detailedScore = 0;
    
    detailedFields.forEach(field => {
      if (firstComp[field]) {
        detailedScore += 4;
      } else {
        check.issues.push(`Première compétence: champ '${field}' manquant`);
      }
    });
    check.score += detailedScore;

    // Compétences simples (15 points)
    let simpleScore = 0;
    for (let i = 1; i < data.competences.length; i++) {
      const comp = data.competences[i];
      const simpleFields = ['description', 'ressources', 'quizId'];
      
      simpleFields.forEach(field => {
        if (comp[field]) {
          simpleScore += 1;
        } else {
          check.issues.push(`Compétence ${i}: champ '${field}' manquant`);
        }
      });

      // Vérifier l'absence de champs détaillés
      const forbiddenFields = ['objectif', 'cours', 'etapes', 'exercices'];
      forbiddenFields.forEach(field => {
        if (comp[field]) {
          check.issues.push(`Compétence ${i}: champ '${field}' ne devrait pas être présent`);
          simpleScore -= 0.5;
        }
      });
    }
    check.score += Math.min(simpleScore, 15);

    return check;
  }

  checkIdsFormat(data) {
    const check = { score: 0, maxScore: 20, issues: [] };
    
    const codesChapitre = {
      'Nombres & Calculs': 'NC',
      'Géométrie': 'GE',
      'Grandeurs & Mesures': 'GM',
      'Organisation & Gestion de données': 'OR'
    };

    const codeAttendu = codesChapitre[data.chapitre];
    if (!codeAttendu) {
      check.issues.push('Code chapitre introuvable');
      return check;
    }

    data.competences.forEach((competence, index) => {
      // Format ID compétence (10 points total)
      const expectedIdRegex = new RegExp(`^6${codeAttendu}-[A-Z]{2,3}-${index + 1}$`);
      if (competence.id && expectedIdRegex.test(competence.id)) {
        check.score += 10 / data.competences.length;
      } else {
        check.issues.push(`ID compétence ${index} incorrect: '${competence.id}'`);
      }

      // Format Quiz ID (10 points total)
      if (competence.quizId && competence.quizId.match(/^QUIZ_6_[A-Z_]+$/)) {
        check.score += 10 / data.competences.length;
      } else {
        check.issues.push(`Quiz ID ${index} incorrect: '${competence.quizId}'`);
      }
    });

    return check;
  }

  checkResourcesStructure(data) {
    const check = { score: 0, maxScore: 20, issues: [] };
    let totalResources = 0;
    let validResources = 0;

    data.competences.forEach((competence, index) => {
      if (competence.ressources && Array.isArray(competence.ressources)) {
        competence.ressources.forEach((ressource, resIndex) => {
          totalResources++;
          
          if (ressource.type && ['vidéo', 'exercice', 'jeu', 'fiches'].includes(ressource.type) &&
              ressource.titre && typeof ressource.titre === 'string' &&
              ressource.url && ressource.url.match(/^https?:\/\//)) {
            validResources++;
          } else {
            check.issues.push(`Ressource ${index}.${resIndex} invalide`);
          }
        });
      }
    });

    if (totalResources > 0) {
      check.score = Math.round((validResources / totalResources) * 20);
    }

    return check;
  }

  analyzeContentQuality(data) {
    const quality = {
      score: 0,
      maxScore: 100,
      details: {},
      recommendations: []
    };

    // Qualité des descriptions (30 points)
    quality.details.descriptions = this.checkDescriptionQuality(data);
    quality.score += quality.details.descriptions.score;

    // Richesse des étapes (25 points)
    quality.details.etapes = this.checkEtapesQuality(data);
    quality.score += quality.details.etapes.score;

    // Qualité des exercices (25 points)
    quality.details.exercices = this.checkExercicesQuality(data);
    quality.score += quality.details.exercices.score;

    // Cohérence pédagogique (20 points)
    quality.details.pedagogie = this.checkPedagogicalCoherence(data);
    quality.score += quality.details.pedagogie.score;

    quality.recommendations = [
      ...quality.details.descriptions.recommendations,
      ...quality.details.etapes.recommendations,
      ...quality.details.exercices.recommendations,
      ...quality.details.pedagogie.recommendations
    ];

    return quality;
  }

  checkDescriptionQuality(data) {
    const check = { score: 0, maxScore: 30, recommendations: [] };
    
    // Objectif de la première compétence
    const firstComp = data.competences[0];
    if (firstComp.objectif) {
      if (firstComp.objectif.length > 50) {
        check.score += 10;
      } else if (firstComp.objectif.length > 30) {
        check.score += 5;
        check.recommendations.push('Objectif pourrait être plus détaillé');
      } else {
        check.recommendations.push('Objectif trop court');
      }
    }

    // Cours de la première compétence
    if (firstComp.cours) {
      if (firstComp.cours.length > 100) {
        check.score += 10;
      } else if (firstComp.cours.length > 50) {
        check.score += 5;
        check.recommendations.push('Cours pourrait être plus développé');
      } else {
        check.recommendations.push('Cours trop succinct');
      }
    }

    // Descriptions des compétences simples
    let descScore = 0;
    for (let i = 1; i < data.competences.length; i++) {
      const comp = data.competences[i];
      if (comp.description && comp.description.length > 40) {
        descScore += 10 / (data.competences.length - 1);
      } else {
        check.recommendations.push(`Description compétence ${i} trop courte`);
      }
    }
    check.score += descScore;

    return check;
  }

  checkEtapesQuality(data) {
    const check = { score: 0, maxScore: 25, recommendations: [] };
    
    const firstComp = data.competences[0];
    if (firstComp.etapes && Array.isArray(firstComp.etapes)) {
      if (firstComp.etapes.length >= 3) {
        check.score += 10;
      } else if (firstComp.etapes.length >= 2) {
        check.score += 5;
        check.recommendations.push('Pourrait avoir plus d\'étapes');
      }

      let etapeQualityScore = 0;
      firstComp.etapes.forEach((etape, index) => {
        if (etape.comment && etape.comment.length > 50) {
          etapeQualityScore += 5;
        } else {
          check.recommendations.push(`Étape ${index}: commentaire trop court`);
        }
        
        if (etape.exemple && etape.exemple.length > 20) {
          etapeQualityScore += 5;
        } else {
          check.recommendations.push(`Étape ${index}: exemple trop court`);
        }
      });
      
      check.score += Math.min(etapeQualityScore, 15);
    } else {
      check.recommendations.push('Aucune étape trouvée');
    }

    return check;
  }

  checkExercicesQuality(data) {
    const check = { score: 0, maxScore: 25, recommendations: [] };
    
    const firstComp = data.competences[0];
    if (firstComp.exercices && Array.isArray(firstComp.exercices)) {
      if (firstComp.exercices.length >= 3) {
        check.score += 10;
      } else if (firstComp.exercices.length >= 2) {
        check.score += 5;
        check.recommendations.push('Pourrait avoir plus d\'exercices');
      }

      // Vérifier la progression des types
      const types = firstComp.exercices.map(ex => ex.type);
      const uniqueTypes = new Set(types);
      if (uniqueTypes.size > 1) {
        check.score += 5;
      } else {
        check.recommendations.push('Exercices manquent de variété dans les types');
      }

      // Vérifier la qualité des questions
      let questionScore = 0;
      firstComp.exercices.forEach((exercice, index) => {
        if (exercice.question && exercice.question.length > 20) {
          questionScore += 2;
        }
        if (exercice.question && (exercice.question.includes('?') || 
            /calcule|combien|quel|trouve/i.test(exercice.question))) {
          questionScore += 3;
        }
      });
      
      check.score += Math.min(questionScore, 10);
    } else {
      check.recommendations.push('Aucun exercice trouvé');
    }

    return check;
  }

  checkPedagogicalCoherence(data) {
    const check = { score: 0, maxScore: 20, recommendations: [] };
    
    // Cohérence entre titre et contenu
    data.competences.forEach((competence, index) => {
      if (competence.titre && competence.description) {
        const titre = competence.titre.toLowerCase();
        const description = competence.description.toLowerCase();
        
        // Recherche de mots-clés communs
        const titreMots = titre.split(/\s+/);
        const hasCommonWords = titreMots.some(mot => 
          mot.length > 3 && description.includes(mot)
        );
        
        if (hasCommonWords) {
          check.score += 10 / data.competences.length;
        } else {
          check.recommendations.push(`Compétence ${index}: titre et description peu cohérents`);
        }
      }
    });

    // Progression pédagogique
    if (data.competences.length > 1) {
      check.score += 10; // Base pour progression
    }

    return check;
  }

  analyzePedagogicalRichness(data) {
    const richness = {
      score: 0,
      maxScore: 100,
      elements: {},
      suggestions: []
    };

    const firstComp = data.competences[0];
    
    // Éléments enrichis optionnels (50 points)
    const enrichedFields = [
      'astuce', 'utilite', 'pieges', 'defi', 'funFact', 
      'miniQuiz', 'preEvaluation', 'metacognition'
    ];
    
    enrichedFields.forEach(field => {
      if (firstComp[field]) {
        richness.score += 6.25;
        richness.elements[field] = true;
      } else {
        richness.suggestions.push(`Pourrait ajouter: ${field}`);
      }
    });

    // Richesse des ressources (25 points)
    let resourceRichness = 0;
    data.competences.forEach(competence => {
      if (competence.ressources && competence.ressources.length > 0) {
        const typeVariety = new Set(competence.ressources.map(r => r.type));
        resourceRichness += typeVariety.size * 3;
      }
    });
    richness.score += Math.min(resourceRichness, 25);

    // Interactivité des exercices (25 points)
    if (firstComp.exercices) {
      const interactiveCount = firstComp.exercices.filter(ex => ex.interactif).length;
      richness.score += Math.min(interactiveCount * 8, 25);
    }

    return richness;
  }

  analyzeHybridModel(data) {
    const hybrid = {
      compliance: 0,
      maxCompliance: 100,
      issues: []
    };

    if (data.competences.length < 2) {
      hybrid.issues.push('Moins de 2 compétences (modèle hybride recommande 2+)');
      return hybrid;
    }

    // Première compétence détaillée (60 points)
    const firstComp = data.competences[0];
    const detailedRequiredFields = ['objectif', 'cours', 'etapes', 'exercices'];
    let detailedScore = 0;

    detailedRequiredFields.forEach(field => {
      if (firstComp[field]) {
        detailedScore += 15;
      } else {
        hybrid.issues.push(`Première compétence: champ '${field}' manquant`);
      }
    });
    hybrid.compliance += detailedScore;

    // Compétences suivantes simples (40 points)
    let simpleScore = 0;
    for (let i = 1; i < data.competences.length; i++) {
      const comp = data.competences[i];
      
      // Vérifier présence des champs simples
      if (comp.description && comp.ressources && comp.quizId) {
        simpleScore += 20 / (data.competences.length - 1);
      } else {
        hybrid.issues.push(`Compétence ${i}: champs simples manquants`);
      }

      // Vérifier absence des champs détaillés
      const forbiddenFields = ['objectif', 'cours', 'etapes', 'exercices'];
      const hasForbiddenFields = forbiddenFields.some(field => comp[field]);
      if (hasForbiddenFields) {
        hybrid.issues.push(`Compétence ${i}: contient des champs détaillés`);
        simpleScore -= 10 / (data.competences.length - 1);
      } else {
        simpleScore += 20 / (data.competences.length - 1);
      }
    }
    
    hybrid.compliance += Math.max(simpleScore, 0);

    return hybrid;
  }

  calculateOverallScore(analysis) {
    const weights = {
      structuralCompliance: 0.4,
      contentQuality: 0.3,
      pedagogicalRichness: 0.2,
      hybridModelCompliance: 0.1
    };

    let score = 0;
    score += (analysis.structuralCompliance.score / analysis.structuralCompliance.maxScore) * 100 * weights.structuralCompliance;
    score += (analysis.contentQuality.score / analysis.contentQuality.maxScore) * 100 * weights.contentQuality;
    score += (analysis.pedagogicalRichness.score / analysis.pedagogicalRichness.maxScore) * 100 * weights.pedagogicalRichness;
    score += (analysis.hybridModelCompliance.compliance / analysis.hybridModelCompliance.maxCompliance) * 100 * weights.hybridModelCompliance;

    return Math.round(score);
  }

  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 RAPPORT D\'ANALYSE COMPARATIVE - CONFORMITÉ AVEC REFERENCE.JS');
    console.log('='.repeat(80));

    // Résumé global
    console.log('\n📈 RÉSUMÉ GLOBAL');
    console.log('-'.repeat(40));
    
    const scores = this.analysisResults.filter(r => !r.error).map(r => r.overallScore);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    console.log(`Fichiers analysés: ${this.analysisResults.length}`);
    console.log(`Score moyen: ${avgScore.toFixed(1)}/100`);
    console.log(`Score minimum: ${Math.min(...scores)}/100`);
    console.log(`Score maximum: ${Math.max(...scores)}/100`);

    // Détail par fichier
    console.log('\n📋 DÉTAIL PAR FICHIER');
    console.log('-'.repeat(40));

    this.analysisResults.forEach(result => {
      if (result.error) {
        console.log(`❌ ${result.fileName}: ERREUR - ${result.error}`);
        return;
      }

      const scoreColor = result.overallScore >= 80 ? '🟢' : result.overallScore >= 60 ? '🟡' : '🔴';
      console.log(`\n${scoreColor} ${result.fileName} - Score: ${result.overallScore}/100`);
      
      console.log(`  Structure: ${result.structuralCompliance.score}/${result.structuralCompliance.maxScore}`);
      console.log(`  Contenu: ${result.contentQuality.score}/${result.contentQuality.maxScore}`);
      console.log(`  Richesse: ${result.pedagogicalRichness.score}/${result.pedagogicalRichness.maxScore}`);
      console.log(`  Modèle hybride: ${result.hybridModelCompliance.compliance}/${result.hybridModelCompliance.maxCompliance}`);

      if (result.structuralCompliance.issues.length > 0) {
        console.log(`  Issues: ${result.structuralCompliance.issues.slice(0, 3).join(', ')}${result.structuralCompliance.issues.length > 3 ? '...' : ''}`);
      }
    });

    // Recommandations générales
    console.log('\n💡 RECOMMANDATIONS GÉNÉRALES');
    console.log('-'.repeat(40));
    
    const allIssues = this.analysisResults.flatMap(r => r.structuralCompliance?.issues || []);
    const issueFrequency = {};
    allIssues.forEach(issue => {
      const key = issue.split(':')[0];
      issueFrequency[key] = (issueFrequency[key] || 0) + 1;
    });

    Object.entries(issueFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([issue, count]) => {
        console.log(`• ${issue}: ${count} occurrence(s)`);
      });

    console.log('\n' + '='.repeat(80));
  }

  async runAnalysis() {
    console.log('🔍 Chargement de la référence...');
    
    if (!await this.loadReference()) {
      return false;
    }

    console.log('📁 Analyse des fichiers...');
    
    const dataDir = path.join(__dirname, '..');
    const files = fs.readdirSync(dataDir)
      .filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'reference.js' && file !== 'validate-integrity.js')
      .sort();

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      await this.analyzeFile(filePath, file);
    }

    this.generateReport();
    return true;
  }
}

// Exécution si le script est appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new ComparativeAnalyzer();
  await analyzer.runAnalysis();
}

export { ComparativeAnalyzer };
