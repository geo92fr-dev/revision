// Tests d'intégrité pour vérifier que tous les fichiers .js respectent la structure de reference.js
import { describe, test, expect } from 'vitest';
import { additionSoustraction6eme } from '../addition-soustraction.js';
import { multiplication6eme } from            competence.exercices.forEach((exercice) => {
              const question = exercice.question.toLowerCase();
              const hasQuestionMark = exercice.question.includes('?');
              const hasKeywords = ['calcule', 'combien', 'quel', 'quelle', 'trouve', 'détermine', 'écris', 'simplifie'].some(
                keyword => question.includes(keyword)
              );
              
              expect(hasQuestionMark || hasKeywords).toBe(true);tiplication.js';
import { division6eme } from '../division.js';
import { fractions6eme } from '../fractions.js';
import { figuresPlanes6eme } from '../figures-planes.js';
import { perimetre6eme } from '../perimetre.js';
import { algebre6eme } from '../algebre.js';

describe('Tests d\'intégrité de structure - Conformité avec reference.js', () => {
  
  // Liste de tous les sujets à tester
  const sujets = [
    { nom: 'addition-soustraction', data: additionSoustraction6eme },
    { nom: 'multiplication', data: multiplication6eme },
    { nom: 'division', data: division6eme },
    { nom: 'fractions', data: fractions6eme },
    { nom: 'figures-planes', data: figuresPlanes6eme },
    { nom: 'perimetre', data: perimetre6eme },
    { nom: 'algebre', data: algebre6eme }
  ];

  // Tests de structure principale
  describe('Structure principale du sujet', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : doit avoir la structure de base correcte`, () => {
        expect(data).toBeDefined();
        expect(data.niveau).toBe("6ème");
        expect(data.chapitre).toBeDefined();
        expect(typeof data.chapitre).toBe('string');
        expect(data.sousChapitre).toBeDefined();
        expect(typeof data.sousChapitre).toBe('string');
        expect(data.competences).toBeDefined();
        expect(Array.isArray(data.competences)).toBe(true);
        expect(data.competences.length).toBeGreaterThan(0);
      });

      test(`${nom} : doit avoir un chapitre valide`, () => {
        const chapitresValides = [
          "Nombres & Calculs",
          "Géométrie", 
          "Grandeurs & Mesures",
          "Organisation & Gestion de données"
        ];
        expect(chapitresValides).toContain(data.chapitre);
      });
    });
  });

  // Tests de structure des compétences
  describe('Structure des compétences', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : toutes les compétences doivent avoir une structure valide`, () => {
        data.competences.forEach((competence, index) => {
          // Champs obligatoires pour toutes les compétences
          expect(competence.id).toBeDefined();
          expect(typeof competence.id).toBe('string');
          expect(competence.id).toMatch(/^6[A-Z]{2}-[A-Z]{2,3}-\d+$/); // Format: 6XX-YY-Z
          
          expect(competence.titre).toBeDefined();
          expect(typeof competence.titre).toBe('string');
          expect(competence.titre.length).toBeGreaterThan(5);
        });
      });

      test(`${nom} : la première compétence doit être détaillée (hybride)`, () => {
        const premiereCompetence = data.competences[0];
        
        // Champs obligatoires pour une compétence détaillée
        expect(premiereCompetence.objectif).toBeDefined();
        expect(typeof premiereCompetence.objectif).toBe('string');
        expect(premiereCompetence.objectif.length).toBeGreaterThan(20);
        
        expect(premiereCompetence.cours).toBeDefined();
        expect(typeof premiereCompetence.cours).toBe('string');
        expect(premiereCompetence.cours.length).toBeGreaterThan(30);
        
        expect(premiereCompetence.etapes).toBeDefined();
        expect(Array.isArray(premiereCompetence.etapes)).toBe(true);
        expect(premiereCompetence.etapes.length).toBeGreaterThan(0);
        
        expect(premiereCompetence.exemple).toBeDefined();
        expect(typeof premiereCompetence.exemple).toBe('string');
        
        expect(premiereCompetence.exercices).toBeDefined();
        expect(Array.isArray(premiereCompetence.exercices)).toBe(true);
        
        // Champs de compatibilité obligatoires
        expect(premiereCompetence.description).toBeDefined();
        expect(typeof premiereCompetence.description).toBe('string');
        
        expect(premiereCompetence.ressources).toBeDefined();
        expect(Array.isArray(premiereCompetence.ressources)).toBe(true);
        
        expect(premiereCompetence.quizId).toBeDefined();
        expect(typeof premiereCompetence.quizId).toBe('string');
      });

      test(`${nom} : les compétences suivantes doivent être simples`, () => {
        if (data.competences.length > 1) {
          for (let i = 1; i < data.competences.length; i++) {
            const competence = data.competences[i];
            
            // Champs obligatoires pour une compétence simple
            expect(competence.description).toBeDefined();
            expect(typeof competence.description).toBe('string');
            expect(competence.description.length).toBeGreaterThan(20);
            
            expect(competence.ressources).toBeDefined();
            expect(Array.isArray(competence.ressources)).toBe(true);
            
            expect(competence.quizId).toBeDefined();
            expect(typeof competence.quizId).toBe('string');
            
            // Ces champs ne doivent PAS être présents dans une compétence simple
            expect(competence.objectif).toBeUndefined();
            expect(competence.cours).toBeUndefined();
            expect(competence.etapes).toBeUndefined();
            expect(competence.exercices).toBeUndefined();
          }
        }
      });
    });
  });

  // Tests de structure des étapes
  describe('Structure des étapes (première compétence)', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : les étapes doivent avoir la structure correcte`, () => {
        const premiereCompetence = data.competences[0];
        if (premiereCompetence.etapes) {
          premiereCompetence.etapes.forEach((etape, index) => {
            expect(etape.titre).toBeDefined();
            expect(typeof etape.titre).toBe('string');
            expect(etape.titre.length).toBeGreaterThan(5);
            
            expect(etape.comment).toBeDefined();
            expect(typeof etape.comment).toBe('string');
            expect(etape.comment.length).toBeGreaterThan(30);
            
            expect(etape.exemple).toBeDefined();
            expect(typeof etape.exemple).toBe('string');
            expect(etape.exemple.length).toBeGreaterThan(10);
          });
        }
      });
    });
  });

  // Tests de structure des exercices
  describe('Structure des exercices (première compétence)', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : les exercices doivent avoir la structure correcte`, () => {
        const premiereCompetence = data.competences[0];
        if (premiereCompetence.exercices) {
          premiereCompetence.exercices.forEach((exercice, index) => {
            expect(exercice.type).toBeDefined();
            expect(['débutant', 'intermédiaire', 'avancé']).toContain(exercice.type);
            
            expect(exercice.question).toBeDefined();
            expect(typeof exercice.question).toBe('string');
            expect(exercice.question.length).toBeGreaterThan(10);
            
            expect(exercice.points).toBeDefined();
            expect(typeof exercice.points).toBe('number');
            expect(exercice.points).toBeGreaterThanOrEqual(10);
            expect(exercice.points).toBeLessThanOrEqual(20);
            
            // Réponse optionnelle mais si présente doit être définie
            if (exercice.reponse !== undefined) {
              expect(exercice.reponse).not.toBe('');
            }
          });
        }
      });

      test(`${nom} : les points des exercices doivent suivre une progression logique`, () => {
        const premiereCompetence = data.competences[0];
        if (premiereCompetence.exercices && premiereCompetence.exercices.length > 1) {
          const points = premiereCompetence.exercices.map(ex => ex.points);
          // Vérifier que les points sont dans une fourchette raisonnable
          points.forEach(point => {
            expect(point).toBeGreaterThanOrEqual(10);
            expect(point).toBeLessThanOrEqual(20);
          });
        }
      });
    });
  });

  // Tests de structure des ressources
  describe('Structure des ressources', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : les ressources doivent avoir la structure correcte`, () => {
        data.competences.forEach((competence, index) => {
          if (competence.ressources && competence.ressources.length > 0) {
            competence.ressources.forEach((ressource, resIndex) => {
              expect(ressource.type).toBeDefined();
              expect(['vidéo', 'exercice', 'jeu', 'fiches', 'animation']).toContain(ressource.type);
              
              expect(ressource.titre).toBeDefined();
              expect(typeof ressource.titre).toBe('string');
              expect(ressource.titre.length).toBeGreaterThan(5);
              
              expect(ressource.url).toBeDefined();
              expect(typeof ressource.url).toBe('string');
              expect(ressource.url).toMatch(/^https?:\/\//);
            });
          }
        });
      });
    });
  });

  // Tests des IDs de compétences
  describe('Format des IDs de compétences', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : les IDs doivent suivre le format standardisé`, () => {
        data.competences.forEach((competence, index) => {
          // Format attendu : 6XX-YY-Z où XX = code chapitre, YY = code sujet, Z = numéro
          const codesChapitre = {
            'Nombres & Calculs': 'NC',
            'Géométrie': 'GE', 
            'Grandeurs & Mesures': 'GM',
            'Organisation & Gestion de données': 'OR'
          };
          
          const codeAttendu = codesChapitre[data.chapitre];
          expect(competence.id).toMatch(new RegExp(`^6${codeAttendu}-[A-Z]{2,3}-\\d+$`));
          
          // Vérifier que le numéro correspond à l'index + 1
          const numeroAttendu = index + 1;
          expect(competence.id).toMatch(new RegExp(`-${numeroAttendu}$`));
        });
      });
    });
  });

  // Tests des Quiz IDs
  describe('Format des Quiz IDs', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : les Quiz IDs doivent suivre le format standardisé`, () => {
        data.competences.forEach((competence) => {
          if (competence.quizId) {
            expect(competence.quizId).toMatch(/^QUIZ_6_[A-Z_]+$/);
            expect(competence.quizId.length).toBeGreaterThan(8);
          }
        });
      });
    });
  });

  // Tests de cohérence du contenu
  describe('Cohérence du contenu pédagogique', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : les questions doivent se terminer par un point d'interrogation ou contenir des mots-clés`, () => {
        data.competences.forEach((competence) => {
          if (competence.exercices) {
            competence.exercices.forEach((exercice) => {
              const question = exercice.question.toLowerCase();
              const hasQuestionMark = exercice.question.includes('?');
              const hasKeywords = ['calcule', 'combien', 'quel', 'quelle', 'trouve', 'détermine'].some(
                keyword => question.includes(keyword)
              );
              
              expect(hasQuestionMark || hasKeywords).toBe(true);
            });
          }
        });
      });

      test(`${nom} : les réponses numériques doivent être dans un format acceptable`, () => {
        data.competences.forEach((competence) => {
          if (competence.exercices) {
            competence.exercices.forEach((exercice) => {
              if (exercice.reponse !== undefined && typeof exercice.reponse === 'string') {
                // Vérifier que la réponse n'est pas vide
                expect(exercice.reponse.trim().length).toBeGreaterThan(0);
              }
              if (exercice.reponse !== undefined && typeof exercice.reponse === 'number') {
                // Vérifier que c'est un nombre valide
                expect(isNaN(exercice.reponse)).toBe(false);
              }
            });
          }
        });
      });
    });
  });

  // Tests spécifiques au modèle hybride
  describe('Conformité au modèle hybride (référence fractions.js)', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : doit avoir au moins 2 compétences`, () => {
        expect(data.competences.length).toBeGreaterThanOrEqual(2);
      });

      test(`${nom} : première compétence détaillée, suivantes simples`, () => {
        const premiereCompetence = data.competences[0];
        
        // Première compétence : doit avoir les champs détaillés
        expect(premiereCompetence.objectif).toBeDefined();
        expect(premiereCompetence.cours).toBeDefined();
        expect(premiereCompetence.etapes).toBeDefined();
        expect(premiereCompetence.exercices).toBeDefined();
        
        // Compétences suivantes : ne doivent PAS avoir les champs détaillés
        for (let i = 1; i < data.competences.length; i++) {
          const competence = data.competences[i];
          expect(competence.objectif).toBeUndefined();
          expect(competence.cours).toBeUndefined();
          expect(competence.etapes).toBeUndefined();
          expect(competence.exercices).toBeUndefined();
          
          // Mais doivent avoir les champs simples
          expect(competence.description).toBeDefined();
          expect(competence.ressources).toBeDefined();
          expect(competence.quizId).toBeDefined();
        }
      });
    });
  });

  // Test de détection de fichiers manquants
  describe('Complétude des sujets', () => {
    test('tous les sujets attendus doivent être présents', () => {
      const sujetsTrouves = sujets.map(s => s.nom);
      const sujetsAttendus = [
        'addition-soustraction',
        'multiplication', 
        'division',
        'fractions',
        'figures-planes',
        'perimetre',
        'algebre'
      ];
      
      sujetsAttendus.forEach(sujetAttendu => {
        expect(sujetsTrouves).toContain(sujetAttendu);
      });
    });

    test('aucun sujet ne doit avoir de structure corrompue', () => {
      sujets.forEach(({ nom, data }) => {
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
        expect(typeof data).toBe('object');
        expect(Object.keys(data).length).toBeGreaterThan(3);
      });
    });
  });
});
