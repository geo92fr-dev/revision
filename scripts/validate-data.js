#!/usr/bin/env node

/**
 * Script de validation rapide pour les fichiers de données .js
 * Usage: node validate-data.js [nom-du-fichier.js]
 * Sans paramètre, valide tous les fichiers du dossier
 */

import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_PATH = join(__dirname, '../src/data/mathematiques/6ieme');

// Couleurs pour la console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log(`\n${colors.bold}${colors.blue}=== ${title} ===${colors.reset}`);
}

async function validateFile(filename) {
  logSection(`Validation de ${filename}`);
  
  try {
    // Test d'import avec URL file:// pour Windows
    const modulePath = join(DATA_PATH, filename);
    const moduleUrl = `file://${modulePath.replace(/\\/g, '/')}`;
    const module = await import(moduleUrl);
    log('green', '✅ Import réussi');
    
    // Validation des exports
    const keys = Object.keys(module);
    if (keys.length !== 2) {
      log('red', `❌ Nombre d'exports incorrect: ${keys.length} (attendu: 2)`);
      return false;
    }
    
    if (!keys.includes('default')) {
      log('red', '❌ Export default manquant');
      return false;
    }
    
    const namedExport = keys.find(key => key !== 'default');
    if (!namedExport.match(/^[a-zA-Z]+6eme$/)) {
      log('red', `❌ Format de l'export nommé incorrect: ${namedExport}`);
      return false;
    }
    
    log('green', `✅ Exports valides: ${keys.join(', ')}`);
    
    // Validation de la structure des données
    const data = module.default;
    
    if (!data.niveau || !data.chapitre || !data.sousChapitre || !data.competences) {
      log('red', '❌ Métadonnées de base manquantes');
      return false;
    }
    
    if (!Array.isArray(data.competences) || data.competences.length === 0) {
      log('red', '❌ Aucune compétence trouvée');
      return false;
    }
    
    log('green', `✅ Structure de base valide (${data.competences.length} compétences)`);
    
    // Validation de la métacognition (CRITIQUE)
    const premierCompetence = data.competences[0];
    
    if (!premierCompetence.metacognition) {
      log('red', '❌ Section métacognition manquante');
      return false;
    }
    
    if (!premierCompetence.metacognition.questions || !Array.isArray(premierCompetence.metacognition.questions)) {
      log('red', '❌ Questions de métacognition manquantes ou invalides');
      return false;
    }
    
    const questions = premierCompetence.metacognition.questions;
    
    if (questions.length < 4) {
      log('red', `❌ Nombre de questions insuffisant: ${questions.length} (minimum: 4)`);
      return false;
    }
    
    // Validation de chaque question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      
      if (!question.type || !question.question || !question.options) {
        log('red', `❌ Question ${i + 1}: structure incomplète`);
        return false;
      }
      
      if (!Array.isArray(question.options) || question.options.length !== 4) {
        log('red', `❌ Question ${i + 1}: options invalides (${question.options?.length} options, attendu: 4)`);
        return false;
      }
      
      if (question.options.some(option => !option || option.trim().length === 0)) {
        log('red', `❌ Question ${i + 1}: options vides détectées`);
        return false;
      }
    }
    
    // Vérification des types de questions
    const types = questions.map(q => q.type);
    const uniqueTypes = [...new Set(types)];
    
    if (uniqueTypes.length !== types.length) {
      log('yellow', '⚠️  Types de questions dupliqués détectés');
    }
    
    const recommendedTypes = ['objectif', 'facilite', 'difficulte', 'strategie'];
    const presentTypes = recommendedTypes.filter(type => types.includes(type));
    
    if (presentTypes.length < 3) {
      log('yellow', `⚠️  Types recommandés manquants. Présents: ${presentTypes.join(', ')}`);
    }
    
    log('green', `✅ Métacognition valide (${questions.length} questions)`);
    
    // Validation des exercices
    if (!premierCompetence.exercices || !Array.isArray(premierCompetence.exercices)) {
      log('red', '❌ Exercices manquants');
      return false;
    }
    
    if (premierCompetence.exercices.length < 3) {
      log('yellow', `⚠️  Peu d'exercices: ${premierCompetence.exercices.length} (recommandé: 3+)`);
    }
    
    log('green', `✅ Exercices valides (${premierCompetence.exercices.length} exercices)`);
    
    // Test de compatibilité avec page_de_cours.html
    try {
      questions.forEach(question => {
        question.options.map((option, index) => `<button>${option}</button>`);
      });
      log('green', '✅ Compatible avec le système de rendu');
    } catch (error) {
      log('red', `❌ Erreur de compatibilité: ${error.message}`);
      return false;
    }
    
    log('green', `\n🎉 ${filename} est entièrement valide !`);
    return true;
    
  } catch (error) {
    log('red', `❌ Erreur lors de la validation: ${error.message}`);
    return false;
  }
}

async function main() {
  const targetFile = process.argv[2];
  
  if (targetFile) {
    // Valider un fichier spécifique
    const isValid = await validateFile(targetFile);
    process.exit(isValid ? 0 : 1);
  } else {
    // Valider tous les fichiers
    logSection('Validation de tous les fichiers de données');
    
    const files = await readdir(DATA_PATH);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    
    if (jsFiles.length === 0) {
      log('yellow', '⚠️  Aucun fichier .js trouvé');
      process.exit(1);
    }
    
    let validFiles = 0;
    
    for (const file of jsFiles) {
      const isValid = await validateFile(file);
      if (isValid) validFiles++;
    }
    
    logSection('Résumé');
    log('blue', `Fichiers analysés: ${jsFiles.length}`);
    log('green', `Fichiers valides: ${validFiles}`);
    log('red', `Fichiers invalides: ${jsFiles.length - validFiles}`);
    
    if (validFiles === jsFiles.length) {
      log('green', '\n🎉 Tous les fichiers sont valides !');
      process.exit(0);
    } else {
      log('red', '\n❌ Des erreurs ont été détectées');
      process.exit(1);
    }
  }
}

main().catch(error => {
  log('red', `Erreur fatale: ${error.message}`);
  process.exit(1);
});
