// Script de validation de l'intégrité structurelle des fichiers mathématiques 6ème
// Vérifie que tous les fichiers .js respectent la structure définie dans reference.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Couleurs pour l'affichage console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class StructureValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      totalFiles: 0,
      validFiles: 0,
      totalCompetences: 0,
      detailedCompetences: 0,
      simpleCompetences: 0
    };
  }

  log(message, color = 'reset') {
    console.log(colors[color] + message + colors.reset);
  }

  error(message) {
    this.errors.push(message);
    this.log(`❌ ${message}`, 'red');
  }

  warning(message) {
    this.warnings.push(message);
    this.log(`⚠️  ${message}`, 'yellow');
  }

  success(message) {
    this.log(`✅ ${message}`, 'green');
  }

  info(message) {
    this.log(`ℹ️  ${message}`, 'blue');
  }

  async validateFile(filePath, fileName) {
    try {
      const module = await import(filePath);
      const exportName = Object.keys(module).find(key => key !== 'default');
      const data = module[exportName] || module.default;

      if (!data) {
        this.error(`${fileName}: Aucune donnée exportée trouvée`);
        return false;
      }

      this.info(`Validation de ${fileName}...`);
      let isValid = true;

      // Validation structure principale
      isValid &= this.validateMainStructure(data, fileName);
      
      // Validation des compétences
      isValid &= this.validateCompetences(data, fileName);
      
      // Validation du modèle hybride
      isValid &= this.validateHybridModel(data, fileName);

      if (isValid) {
        this.success(`${fileName}: Structure conforme ✓`);
        this.stats.validFiles++;
      }

      this.stats.totalFiles++;
      return isValid;

    } catch (error) {
      this.error(`${fileName}: Erreur lors du chargement - ${error.message}`);
      return false;
    }
  }

  validateMainStructure(data, fileName) {
    let isValid = true;

    // Validation des champs obligatoires
    const requiredFields = ['niveau', 'chapitre', 'sousChapitre', 'competences'];
    requiredFields.forEach(field => {
      if (!data[field]) {
        this.error(`${fileName}: Champ manquant '${field}'`);
        isValid = false;
      }
    });

    // Validation du niveau
    if (data.niveau !== "6ème") {
      this.error(`${fileName}: Niveau incorrect '${data.niveau}', attendu '6ème'`);
      isValid = false;
    }

    // Validation du chapitre
    const validChapters = [
      "Nombres & Calculs",
      "Géométrie", 
      "Grandeurs & Mesures",
      "Organisation & Gestion de données"
    ];
    if (!validChapters.includes(data.chapitre)) {
      this.error(`${fileName}: Chapitre invalide '${data.chapitre}'`);
      isValid = false;
    }

    // Validation des compétences
    if (!Array.isArray(data.competences) || data.competences.length === 0) {
      this.error(`${fileName}: 'competences' doit être un tableau non vide`);
      isValid = false;
    }

    return isValid;
  }

  validateCompetences(data, fileName) {
    let isValid = true;

    data.competences.forEach((competence, index) => {
      const compId = `${fileName}[${index}]`;

      // Validation des champs obligatoires pour toutes les compétences
      if (!competence.id || typeof competence.id !== 'string') {
        this.error(`${compId}: ID manquant ou invalide`);
        isValid = false;
      } else {
        // Validation du format de l'ID
        const idRegex = /^6[A-Z]{2}-[A-Z]{2,3}-\d+$/;
        if (!idRegex.test(competence.id)) {
          this.error(`${compId}: Format d'ID incorrect '${competence.id}', attendu 6XX-YY-Z`);
          isValid = false;
        }
      }

      if (!competence.titre || typeof competence.titre !== 'string' || competence.titre.length <= 5) {
        this.error(`${compId}: Titre manquant ou trop court`);
        isValid = false;
      }

      // Validation des ressources
      if (competence.ressources) {
        if (!Array.isArray(competence.ressources)) {
          this.error(`${compId}: 'ressources' doit être un tableau`);
          isValid = false;
        } else {
          competence.ressources.forEach((ressource, resIndex) => {
            if (!ressource.type || !['vidéo', 'exercice', 'jeu', 'fiches'].includes(ressource.type)) {
              this.error(`${compId}.ressources[${resIndex}]: Type de ressource invalide`);
              isValid = false;
            }
            if (!ressource.titre || typeof ressource.titre !== 'string') {
              this.error(`${compId}.ressources[${resIndex}]: Titre de ressource manquant`);
              isValid = false;
            }
            if (!ressource.url || !ressource.url.match(/^https?:\/\//)) {
              this.error(`${compId}.ressources[${resIndex}]: URL invalide`);
              isValid = false;
            }
          });
        }
      }

      // Validation du Quiz ID
      if (competence.quizId) {
        if (!competence.quizId.match(/^QUIZ_6_[A-Z_]+$/)) {
          this.error(`${compId}: Format de Quiz ID incorrect '${competence.quizId}'`);
          isValid = false;
        }
      }

      this.stats.totalCompetences++;
    });

    return isValid;
  }

  validateHybridModel(data, fileName) {
    let isValid = true;

    if (data.competences.length < 2) {
      this.warning(`${fileName}: Modèle hybride recommande au moins 2 compétences`);
    }

    // Validation de la première compétence (détaillée)
    const firstComp = data.competences[0];
    const requiredDetailedFields = ['objectif', 'cours', 'etapes', 'exercices', 'exemple', 'description', 'ressources', 'quizId'];
    
    requiredDetailedFields.forEach(field => {
      if (!firstComp[field]) {
        this.error(`${fileName}[0]: Champ manquant pour compétence détaillée '${field}'`);
        isValid = false;
      }
    });

    // Validation des étapes
    if (firstComp.etapes && Array.isArray(firstComp.etapes)) {
      firstComp.etapes.forEach((etape, etapeIndex) => {
        if (!etape.titre || !etape.comment || !etape.exemple) {
          this.error(`${fileName}[0].etapes[${etapeIndex}]: Champs manquants (titre, comment, exemple)`);
          isValid = false;
        }
        if (etape.comment && etape.comment.length <= 30) {
          this.warning(`${fileName}[0].etapes[${etapeIndex}]: Commentaire trop court (< 30 caractères)`);
        }
      });
    }

    // Validation des exercices
    if (firstComp.exercices && Array.isArray(firstComp.exercices)) {
      firstComp.exercices.forEach((exercice, exIndex) => {
        if (!exercice.type || !['débutant', 'intermédiaire', 'avancé'].includes(exercice.type)) {
          this.error(`${fileName}[0].exercices[${exIndex}]: Type d'exercice invalide`);
          isValid = false;
        }
        if (!exercice.question || typeof exercice.question !== 'string') {
          this.error(`${fileName}[0].exercices[${exIndex}]: Question manquante`);
          isValid = false;
        }
        if (typeof exercice.points !== 'number' || exercice.points < 10 || exercice.points > 20) {
          this.error(`${fileName}[0].exercices[${exIndex}]: Points invalides (doit être entre 10 et 20)`);
          isValid = false;
        }
      });
    }

    this.stats.detailedCompetences++;

    // Validation des compétences suivantes (simples)
    for (let i = 1; i < data.competences.length; i++) {
      const comp = data.competences[i];
      const compId = `${fileName}[${i}]`;

      // Vérifier que les champs détaillés ne sont PAS présents
      const forbiddenFields = ['objectif', 'cours', 'etapes', 'exercices'];
      forbiddenFields.forEach(field => {
        if (comp[field]) {
          this.error(`${compId}: Champ '${field}' ne doit pas être présent dans une compétence simple`);
          isValid = false;
        }
      });

      // Vérifier que les champs simples sont présents
      const requiredSimpleFields = ['description', 'ressources', 'quizId'];
      requiredSimpleFields.forEach(field => {
        if (!comp[field]) {
          this.error(`${compId}: Champ manquant pour compétence simple '${field}'`);
          isValid = false;
        }
      });

      if (comp.description && comp.description.length <= 20) {
        this.warning(`${compId}: Description trop courte (< 20 caractères)`);
      }

      this.stats.simpleCompetences++;
    }

    return isValid;
  }

  async validateAllFiles() {
    this.log('\n' + colors.bold + '🔍 VALIDATION DE L\'INTÉGRITÉ STRUCTURELLE' + colors.reset);
    this.log('==========================================\n');

    const dataDir = path.join(__dirname, '..');
    const files = fs.readdirSync(dataDir)
      .filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'reference.js')
      .sort();

    this.info(`Fichiers à valider: ${files.length}`);
    console.log();

    let allValid = true;
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const isValid = await this.validateFile(filePath, file);
      allValid &= isValid;
      console.log();
    }

    this.displaySummary(allValid);
    return allValid;
  }

  displaySummary(allValid) {
    this.log('\n' + colors.bold + '📊 RÉSUMÉ DE LA VALIDATION' + colors.reset);
    this.log('==========================\n');

    this.log(`Fichiers traités: ${this.stats.totalFiles}`, 'blue');
    this.log(`Fichiers valides: ${this.stats.validFiles}`, this.stats.validFiles === this.stats.totalFiles ? 'green' : 'red');
    this.log(`Total compétences: ${this.stats.totalCompetences}`, 'blue');
    this.log(`Compétences détaillées: ${this.stats.detailedCompetences}`, 'blue');
    this.log(`Compétences simples: ${this.stats.simpleCompetences}`, 'blue');

    console.log();

    if (this.errors.length > 0) {
      this.log(`❌ ${this.errors.length} erreur(s) trouvée(s)`, 'red');
    }

    if (this.warnings.length > 0) {
      this.log(`⚠️  ${this.warnings.length} avertissement(s)`, 'yellow');
    }

    if (allValid && this.errors.length === 0) {
      this.log('\n🎉 Tous les fichiers respectent la structure de référence!', 'green');
    } else {
      this.log('\n💥 Des problèmes de conformité ont été détectés.', 'red');
    }

    console.log();
  }
}

// Exécution si le script est appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new StructureValidator();
  const isValid = await validator.validateAllFiles();
  process.exit(isValid ? 0 : 1);
}

export { StructureValidator };
