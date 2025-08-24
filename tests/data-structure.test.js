/**
 * Suite de tests pour valider la structure des fichiers de données .js
 * Ce test valide que tous les fichiers respectent la structure attendue
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Chemin vers les données de mathématiques 6ème
const DATA_PATH = join(__dirname, '../src/data/mathematiques/6ieme');

describe('Validation des fichiers de données .js', () => {
  let dataFiles = [];
  let modules = {};

  beforeAll(async () => {
    // Charger tous les fichiers .js du dossier
    const files = await readdir(DATA_PATH);
    dataFiles = files.filter(file => file.endsWith('.js'));
    
    // Importer tous les modules
    for (const file of dataFiles) {
      try {
        const modulePath = join(DATA_PATH, file);
        const moduleUrl = `file://${modulePath.replace(/\\/g, '/')}`;
        const module = await import(moduleUrl);
        modules[file] = module;
      } catch (error) {
        console.error(`Erreur lors de l'import de ${file}:`, error);
      }
    }
  });

  describe('Tests d\'import et d\'export', () => {
    it('devrait avoir au moins un fichier de données', () => {
      expect(dataFiles.length).toBeGreaterThan(0);
    });

    dataFiles.forEach(file => {
      describe(`${file}`, () => {
        it('devrait s\'importer sans erreur', () => {
          expect(modules[file]).toBeDefined();
        });

        it('devrait avoir exactement 2 exports (named + default)', () => {
          const keys = Object.keys(modules[file]);
          expect(keys).toHaveLength(2);
          expect(keys).toContain('default');
        });

        it('devrait avoir un export nommé cohérent', () => {
          const keys = Object.keys(modules[file]);
          const namedExport = keys.find(key => key !== 'default');
          expect(namedExport).toBeDefined();
          expect(namedExport).toMatch(/^[a-zA-Z]+6eme$/); // Format: [sujet]6eme
        });

        it('devrait avoir des exports identiques (named et default)', () => {
          const keys = Object.keys(modules[file]);
          const namedExport = keys.find(key => key !== 'default');
          expect(modules[file].default).toBe(modules[file][namedExport]);
        });
      });
    });
  });

  describe('Tests de structure des données', () => {
    dataFiles.forEach(file => {
      describe(`Structure de ${file}`, () => {
        let data;

        beforeAll(() => {
          data = modules[file]?.default;
        });

        it('devrait avoir les métadonnées de base', () => {
          expect(data).toBeDefined();
          expect(data.niveau).toBeDefined();
          expect(data.chapitre).toBeDefined();
          expect(data.sousChapitre).toBeDefined();
          expect(data.competences).toBeDefined();
          expect(Array.isArray(data.competences)).toBe(true);
        });

        it('devrait avoir au moins une compétence', () => {
          expect(data.competences.length).toBeGreaterThan(0);
        });

        describe('Structure des compétences', () => {
          data?.competences?.forEach((competence, index) => {
            describe(`Compétence ${index + 1}`, () => {
              it('devrait avoir les champs obligatoires', () => {
                expect(competence.id).toBeDefined();
                expect(competence.titre).toBeDefined();
                expect(competence.objectif || competence.description).toBeDefined();
              });

              it('devrait avoir un ID au bon format', () => {
                expect(competence.id).toMatch(/^6[A-Z]+-[A-Z]+-\d+$/);
              });

              it('devrait avoir du contenu pédagogique', () => {
                expect(competence.cours).toBeDefined();
                expect(competence.exercices).toBeDefined();
                expect(Array.isArray(competence.exercices)).toBe(true);
              });

              describe('Structure des exercices', () => {
                competence.exercices?.forEach((exercice, exIndex) => {
                  it(`Exercice ${exIndex + 1} devrait avoir la structure requise`, () => {
                    expect(exercice.type).toBeDefined();
                    expect(['débutant', 'intermédiaire', 'avancé']).toContain(exercice.type);
                    expect(exercice.question).toBeDefined();
                    expect(exercice.reponse).toBeDefined();
                    expect(typeof exercice.points).toBe('number');
                  });
                });
              });

              describe('Structure de métacognition (CRITIQUE)', () => {
                it('devrait avoir une section métacognition', () => {
                  expect(competence.metacognition).toBeDefined();
                  expect(competence.metacognition.questions).toBeDefined();
                  expect(Array.isArray(competence.metacognition.questions)).toBe(true);
                });

                it('devrait avoir au moins 4 questions de métacognition', () => {
                  expect(competence.metacognition.questions.length).toBeGreaterThanOrEqual(4);
                });

                competence.metacognition?.questions?.forEach((question, qIndex) => {
                  describe(`Question de métacognition ${qIndex + 1}`, () => {
                    it('devrait avoir la structure complète', () => {
                      expect(question.type).toBeDefined();
                      expect(typeof question.type).toBe('string');
                      expect(question.question).toBeDefined();
                      expect(typeof question.question).toBe('string');
                      expect(question.options).toBeDefined();
                      expect(Array.isArray(question.options)).toBe(true);
                    });

                    it('devrait avoir exactement 4 options', () => {
                      expect(question.options).toHaveLength(4);
                    });

                    it('devrait avoir des options non-vides', () => {
                      question.options.forEach(option => {
                        expect(typeof option).toBe('string');
                        expect(option.trim().length).toBeGreaterThan(0);
                      });
                    });

                    it('devrait avoir un type unique dans le fichier', () => {
                      const types = competence.metacognition.questions.map(q => q.type);
                      const uniqueTypes = [...new Set(types)];
                      expect(uniqueTypes.length).toBe(types.length);
                    });
                  });
                });

                it('devrait avoir les types recommandés de questions', () => {
                  const types = competence.metacognition.questions.map(q => q.type);
                  const recommendedTypes = ['objectif', 'facilite', 'difficulte', 'strategie'];
                  
                  // Au moins 3 des 4 types recommandés doivent être présents
                  const presentTypes = recommendedTypes.filter(type => types.includes(type));
                  expect(presentTypes.length).toBeGreaterThanOrEqual(3);
                });
              });
            });
          });
        });
      });
    });
  });

  describe('Tests de cohérence entre fichiers', () => {
    it('tous les fichiers devraient avoir le même niveau', () => {
      const niveaux = Object.values(modules).map(module => module.default?.niveau);
      const uniqueNiveaux = [...new Set(niveaux)];
      expect(uniqueNiveaux).toHaveLength(1);
      expect(uniqueNiveaux[0]).toBe('6ème');
    });

    it('tous les fichiers devraient avoir le même chapitre principal', () => {
      const chapitres = Object.values(modules).map(module => module.default?.chapitre);
      const uniqueChapitres = [...new Set(chapitres)];
      expect(uniqueChapitres).toHaveLength(1);
    });

    it('chaque fichier devrait avoir un sous-chapitre unique', () => {
      const sousChapitres = Object.values(modules).map(module => module.default?.sousChapitre);
      const uniqueSousChapitres = [...new Set(sousChapitres)];
      expect(uniqueSousChapitres.length).toBe(sousChapitres.length);
    });
  });

  describe('Tests de performance et qualité', () => {
    dataFiles.forEach(file => {
      describe(`Qualité de ${file}`, () => {
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
          const longueurs = questions?.map(q => q.question.length);
          const moyenne = longueurs?.reduce((a, b) => a + b, 0) / longueurs?.length;
          expect(moyenne).toBeGreaterThan(30); // Questions suffisamment détaillées
        });
      });
    });
  });
});

// Test d'intégration avec le système de chargement
describe('Tests d\'intégration avec page_de_cours.html', () => {
  it('devrait charger les fichiers de données', async () => {
    const files = await readdir(DATA_PATH);
    const jsFiles = files.filter(file => file.endsWith('.js') && file !== 'index.js');
    
    for (const file of jsFiles) {
      const modulePath = join(DATA_PATH, file);
      const moduleUrl = `file://${modulePath.replace(/\\/g, '/')}`;
      const module = await import(moduleUrl);
      const data = module?.default;
      
      // Vérifie la compatibilité avec le système de métacognition
      expect(data?.competences?.[0]?.metacognition?.questions).toBeDefined();
      
      // Simule le rendu des questions
      const questions = data.competences[0].metacognition.questions;
      if (questions) {
        questions.forEach(question => {
          // Vérification que le rendu ne plantera pas
          expect(() => {
            question.options.map((option, index) => `<button>${option}</button>`);
          }).not.toThrow();
        });
      }
    }
  });
});
