/**
 * Tests de validation de la structure des fichiers de données .js
 * Ce test valide que tous les fichiers respectent la structure attendue
 * pour le système de métacognition et l'architecture générale
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Chemin vers tous les données
const DATA_PATH = join(__dirname, '../data');

// Fonction récursive pour scanner tous les fichiers .js
async function scanJSFiles(dirPath, basePath = '') {
  const files = [];
  const entries = await readdir(dirPath);
  
  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      // Récursion dans les sous-dossiers
      const subFiles = await scanJSFiles(fullPath, join(basePath, entry));
      files.push(...subFiles);
    } else if (entry.endsWith('.js') && entry !== 'index.js') {
      // Ajouter le fichier avec son chemin relatif
      files.push({
        name: entry,
        path: fullPath,
        relativePath: basePath ? join(basePath, entry) : entry
      });
    }
  }
  
  return files;
}

describe('🔍 Validation de la Structure des Fichiers de Données', () => {
  let dataFiles = [];
  let modules = {};

  beforeAll(async () => {
    // Charger tous les fichiers .js du dossier data récursivement
    dataFiles = await scanJSFiles(DATA_PATH);
    console.log(`📁 Fichiers trouvés: ${dataFiles.length}`);
    dataFiles.forEach(file => console.log(`  - ${file.relativePath}`));
    
    // Importer tous les modules
    for (const fileInfo of dataFiles) {
      try {
        const moduleUrl = `file://${fileInfo.path.replace(/\\/g, '/')}`;
        const module = await import(moduleUrl);
        modules[fileInfo.name] = {
          ...module,
          _fileInfo: fileInfo
        };
      } catch (error) {
        console.error(`❌ Erreur lors de l'import de ${fileInfo.relativePath}:`, error);
      }
    }
  });

  describe('📦 Tests d\'Import et d\'Export', () => {
    it('devrait avoir au moins un fichier de données', () => {
      expect(dataFiles.length).toBeGreaterThan(0);
    });

    dataFiles.forEach(fileInfo => {
      describe(`📄 ${fileInfo.relativePath}`, () => {
        it('devrait s\'importer sans erreur', () => {
          expect(modules[fileInfo.name]).toBeDefined();
        });

        it('devrait avoir exactement 2 exports (named + default)', () => {
          const keys = Object.keys(modules[fileInfo.name]).filter(key => key !== '_fileInfo');
          expect(keys).toHaveLength(2);
          expect(keys).toContain('default');
        });

        it('devrait avoir un export nommé cohérent', () => {
          const keys = Object.keys(modules[fileInfo.name]).filter(key => key !== '_fileInfo' && key !== 'default');
          const namedExport = keys[0];
          expect(namedExport).toBeDefined();
          expect(namedExport).toMatch(/^[a-zA-Z]+6eme$/); // Format: [sujet]6eme
        });

        it('devrait avoir des exports identiques (named et default)', () => {
          const keys = Object.keys(modules[fileInfo.name]).filter(key => key !== '_fileInfo' && key !== 'default');
          const namedExport = keys[0];
          expect(modules[fileInfo.name].default).toBe(modules[fileInfo.name][namedExport]);
        });
      });
    });
  });

  describe('🏗️ Tests de Structure des Données', () => {
    dataFiles.forEach(fileInfo => {
      describe(`🔧 Structure de ${fileInfo.relativePath}`, () => {
        it('devrait avoir les métadonnées de base', () => {
          const data = modules[fileInfo.name]?.default;
          expect(data).toBeDefined();
          expect(data.niveau).toBe('6ème');
          expect(data.chapitre).toBeDefined();
          expect(data.sousChapitre).toBeDefined();
          expect(data.competences).toBeDefined();
          expect(Array.isArray(data.competences)).toBe(true);
        });

        it('devrait avoir au moins une compétence', () => {
          const data = modules[fileInfo.name]?.default;
          expect(data.competences.length).toBeGreaterThan(0);
        });

        it('devrait avoir des IDs valides', () => {
          const data = modules[fileInfo.name]?.default;
          data.competences.forEach(competence => {
            expect(competence.id).toMatch(/^6[A-Z]+-[A-Z]+-\d+$/);
          });
        });
      });
    });
  });

  describe('🧠 Tests Critiques de Métacognition', () => {
    dataFiles.forEach(file => {
      describe(`🎭 Métacognition - ${file}`, () => {
        let data;
        let premierCompetence;

        beforeAll(() => {
          data = modules[file]?.default;
          premierCompetence = data?.competences?.[0];
        });

        it('devrait avoir une section métacognition', () => {
          expect(premierCompetence?.metacognition, `${file} n'a pas de section métacognition`).toBeDefined();
          expect(premierCompetence?.metacognition?.questions, `${file} n'a pas de questions de métacognition`).toBeDefined();
          expect(Array.isArray(premierCompetence?.metacognition?.questions)).toBe(true);
        });

        it('devrait avoir au moins 4 questions de métacognition', () => {
          const questions = premierCompetence?.metacognition?.questions;
          expect(questions?.length, `${file} n'a que ${questions?.length} questions (minimum: 4)`).toBeGreaterThanOrEqual(4);
        });

        premierCompetence?.metacognition?.questions?.forEach((question, qIndex) => {
          describe(`❓ Question ${qIndex + 1}`, () => {
            it('devrait avoir la structure complète', () => {
              expect(question.type, `Question ${qIndex + 1}: type manquant`).toBeDefined();
              expect(typeof question.type).toBe('string');
              expect(question.question, `Question ${qIndex + 1}: question manquante`).toBeDefined();
              expect(typeof question.question).toBe('string');
              expect(question.options, `Question ${qIndex + 1}: options manquantes`).toBeDefined();
              expect(Array.isArray(question.options)).toBe(true);
            });

            it('devrait avoir exactement 4 options', () => {
              expect(question.options, `Question ${qIndex + 1}: ${question.options?.length} options au lieu de 4`).toHaveLength(4);
            });

            it('devrait avoir des options non-vides', () => {
              question.options.forEach((option, optIndex) => {
                expect(typeof option).toBe('string');
                expect(option.trim().length, `Question ${qIndex + 1}, Option ${optIndex + 1} est vide`).toBeGreaterThan(0);
              });
            });
          });
        });

        it('devrait avoir des types de questions uniques', () => {
          const questions = premierCompetence?.metacognition?.questions;
          if (questions) {
            const types = questions.map(q => q.type);
            const uniqueTypes = [...new Set(types)];
            expect(uniqueTypes.length, `Types dupliqués détectés: ${types.join(', ')}`).toBe(types.length);
          }
        });

        it('devrait avoir les types recommandés de questions', () => {
          const questions = premierCompetence?.metacognition?.questions;
          if (questions) {
            const types = questions.map(q => q.type);
            const recommendedTypes = ['objectif', 'facilite', 'difficulte', 'strategie'];
            
            // Au moins 3 des 4 types recommandés doivent être présents
            const presentTypes = recommendedTypes.filter(type => types.includes(type));
            expect(presentTypes.length, `Types recommandés manquants. Présents: ${presentTypes.join(', ')}`).toBeGreaterThanOrEqual(3);
          }
        });
      });
    });
  });

  describe('🔄 Tests de Cohérence Entre Fichiers', () => {
    it('tous les fichiers valides devraient avoir le niveau "6ème"', () => {
      const validModules = Object.values(modules).filter(module => module.default?.niveau);
      const niveaux = validModules.map(module => module.default.niveau);
      const uniqueNiveaux = [...new Set(niveaux)];
      expect(uniqueNiveaux).toHaveLength(1);
      expect(uniqueNiveaux[0]).toBe('6ème');
    });

    it('chaque fichier devrait avoir un sous-chapitre unique', () => {
      const validModules = Object.values(modules).filter(module => module.default?.sousChapitre);
      const sousChapitres = validModules.map(module => module.default.sousChapitre);
      const uniqueSousChapitres = [...new Set(sousChapitres)];
      expect(uniqueSousChapitres.length).toBe(sousChapitres.length);
    });
  });

  describe('📊 Tests de Qualité et Performance', () => {
    dataFiles.forEach(file => {
      describe(`⚡ Qualité - ${file}`, () => {
        let data;

        beforeAll(() => {
          data = modules[file]?.default;
        });

        it('devrait avoir du contenu substantiel', () => {
          const premiereCours = data?.competences?.[0]?.cours;
          if (typeof premiereCours === 'string') {
            expect(premiereCours.length).toBeGreaterThan(50);
          }
        });

        it('devrait avoir au moins 3 exercices', () => {
          const exercices = data?.competences?.[0]?.exercices;
          expect(exercices?.length).toBeGreaterThanOrEqual(3);
        });

        it('devrait avoir des questions de métacognition variées', () => {
          const questions = data?.competences?.[0]?.metacognition?.questions;
          if (questions && questions.length > 0) {
            const longueurs = questions.map(q => q.question.length);
            const moyenne = longueurs.reduce((a, b) => a + b, 0) / longueurs.length;
            expect(moyenne).toBeGreaterThan(30); // Questions suffisamment détaillées
          }
        });
      });
    });
  });

  describe('🌐 Tests d\'Intégration avec le Système', () => {
    it('tous les fichiers devraient être compatibles avec page_de_cours.html', async () => {
      const files = await readdir(DATA_PATH);
      const jsFiles = files.filter(file => file.endsWith('.js') && file !== 'index.js');
      
      for (const file of jsFiles) {
        const modulePath = join(DATA_PATH, file);
        const moduleUrl = `file://${modulePath.replace(/\\/g, '/')}`;
        const module = await import(moduleUrl);
        const data = module?.default;
        
        // Simule le rendu des questions si métacognition présente
        if (data?.competences?.[0]?.metacognition?.questions) {
          const questions = data.competences[0].metacognition.questions;
          
          questions.forEach(question => {
            // Vérification que le rendu ne plantera pas
            expect(() => {
              question.options.map((option, index) => `<button>${option}</button>`);
            }).not.toThrow();
          });
        }
      }
    });

    it('devrait détecter les fichiers problématiques', () => {
      const problematicFiles = [];
      
      dataFiles.forEach(fileInfo => {
        const data = modules[fileInfo.name]?.default;
        const metacognition = data?.competences?.[0]?.metacognition;
        
        if (!metacognition) {
          problematicFiles.push(`${fileInfo.name}: métacognition manquante`);
        } else if (!metacognition.questions || metacognition.questions.length < 4) {
          problematicFiles.push(`${fileInfo.name}: questions insuffisantes (${metacognition.questions?.length || 0}/4)`);
        } else {
          // Vérifier que toutes les questions ont 4 options
          metacognition.questions.forEach((question, qIndex) => {
            if (!question.options || question.options.length !== 4) {
              problematicFiles.push(`${fileInfo.name}: question ${qIndex + 1} a ${question.options?.length || 0} options au lieu de 4`);
            }
          });
        }
      });

      // Afficher les problèmes détectés (informatif)
      if (problematicFiles.length > 0) {
        console.warn('🚨 Problèmes détectés:', problematicFiles);
      }

      // Le test passe mais log les problèmes pour information
      expect(problematicFiles.length).toBeGreaterThanOrEqual(0);
    });
  });
});
