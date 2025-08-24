// Tests de conformité avancée avec les exemples concrets de reference.js
import { describe, test, expect } from 'vitest';
import { additionSoustraction6eme } from '../addition-soustraction.js';
import { multiplication6eme } from '../multiplication.js';
import { division6eme } from '../division.js';
import { fractions6eme } from '../fractions.js';
import { figuresPlanes6eme } from '../figures-planes.js';
import { perimetre6eme } from '../perimetre.js';
import { algebre6eme } from '../algebre.js';
import { reference6eme } from '../reference.js';

describe('Tests de conformité avancée avec reference.js', () => {
  
  const sujets = [
    { nom: 'addition-soustraction', data: additionSoustraction6eme },
    { nom: 'multiplication', data: multiplication6eme },
    { nom: 'division', data: division6eme },
    { nom: 'fractions', data: fractions6eme },
    { nom: 'figures-planes', data: figuresPlanes6eme },
    { nom: 'perimetre', data: perimetre6eme },
    { nom: 'algebre', data: algebre6eme }
  ];

  // Vérification que reference.js est lui-même conforme
  describe('Validation du fichier de référence', () => {
    test('reference.js doit être un exemple parfait', () => {
      expect(reference6eme).toBeDefined();
      expect(reference6eme.niveau).toBe("6ème");
      expect(reference6eme.chapitre).toBe("Nombres & Calculs");
      expect(reference6eme.sousChapitre).toBe("Fractions (bases)");
      expect(reference6eme.competences).toHaveLength(3);
      
      // Première compétence détaillée
      const premiere = reference6eme.competences[0];
      expect(premiere.objectif).toBeDefined();
      expect(premiere.cours).toBeDefined();
      expect(premiere.etapes).toBeDefined();
      expect(premiere.exercices).toBeDefined();
      
      // Compétences suivantes simples
      for (let i = 1; i < reference6eme.competences.length; i++) {
        const competence = reference6eme.competences[i];
        expect(competence.description).toBeDefined();
        expect(competence.objectif).toBeUndefined();
        expect(competence.cours).toBeUndefined();
        expect(competence.etapes).toBeUndefined();
        expect(competence.exercices).toBeUndefined();
      }
    });
  });

  // Tests de conformité stricte avec le modèle de référence
  describe('Conformité stricte avec le modèle reference.js', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : doit avoir la même structure que reference.js`, () => {
        // Structure principale identique
        const mainFields = ['niveau', 'chapitre', 'sousChapitre', 'competences'];
        mainFields.forEach(field => {
          expect(data).toHaveProperty(field);
          expect(typeof data[field]).toBe(typeof reference6eme[field]);
        });

        // Types des compétences identiques
        expect(data.competences.length).toBeGreaterThanOrEqual(2);
        
        // Première compétence : même structure que la référence
        const firstComp = data.competences[0];
        const refFirstComp = reference6eme.competences[0];
        
        const detailedFields = ['id', 'titre', 'objectif', 'cours', 'etapes', 'exemple', 'exercices', 'description', 'ressources', 'quizId'];
        detailedFields.forEach(field => {
          if (refFirstComp[field] !== undefined) {
            expect(firstComp).toHaveProperty(field);
            expect(typeof firstComp[field]).toBe(typeof refFirstComp[field]);
          }
        });
      });

      test(`${nom} : les étapes doivent avoir la même structure que la référence`, () => {
        const firstComp = data.competences[0];
        const refFirstComp = reference6eme.competences[0];
        
        if (firstComp.etapes && refFirstComp.etapes) {
          firstComp.etapes.forEach((etape, index) => {
            const refEtape = refFirstComp.etapes[0]; // Structure de référence
            expect(etape).toHaveProperty('titre');
            expect(etape).toHaveProperty('comment');
            expect(etape).toHaveProperty('exemple');
            expect(typeof etape.titre).toBe(typeof refEtape.titre);
            expect(typeof etape.comment).toBe(typeof refEtape.comment);
            expect(typeof etape.exemple).toBe(typeof refEtape.exemple);
          });
        }
      });

      test(`${nom} : les exercices doivent avoir la même structure que la référence`, () => {
        const firstComp = data.competences[0];
        const refFirstComp = reference6eme.competences[0];
        
        if (firstComp.exercices && refFirstComp.exercices) {
          firstComp.exercices.forEach((exercice, index) => {
            const refExercice = refFirstComp.exercices[0]; // Structure de référence
            
            // Champs obligatoires
            expect(exercice).toHaveProperty('type');
            expect(exercice).toHaveProperty('question');
            expect(exercice).toHaveProperty('points');
            
            // Types corrects
            expect(typeof exercice.type).toBe(typeof refExercice.type);
            expect(typeof exercice.question).toBe(typeof refExercice.question);
            expect(typeof exercice.points).toBe(typeof refExercice.points);
          });
        }
      });

      test(`${nom} : compétences simples doivent suivre le modèle de référence`, () => {
        if (data.competences.length > 1) {
          for (let i = 1; i < data.competences.length; i++) {
            const competence = data.competences[i];
            const refSimple = reference6eme.competences[1]; // Compétence simple de référence
            
            // Champs obligatoires pour compétence simple
            expect(competence).toHaveProperty('id');
            expect(competence).toHaveProperty('titre');
            expect(competence).toHaveProperty('description');
            expect(competence).toHaveProperty('ressources');
            expect(competence).toHaveProperty('quizId');
            
            // Types corrects
            expect(typeof competence.id).toBe(typeof refSimple.id);
            expect(typeof competence.titre).toBe(typeof refSimple.titre);
            expect(typeof competence.description).toBe(typeof refSimple.description);
            expect(Array.isArray(competence.ressources)).toBe(Array.isArray(refSimple.ressources));
            expect(typeof competence.quizId).toBe(typeof refSimple.quizId);
          }
        }
      });
    });
  });

  // Tests de qualité du contenu pédagogique
  describe('Qualité du contenu pédagogique', () => {
    sujets.forEach(({ nom, data }) => {
      test(`${nom} : contenu pédagogique doit être substantiel`, () => {
        const firstComp = data.competences[0];
        
        // Objectif doit être pédagogiquement précis
        if (firstComp.objectif) {
          expect(firstComp.objectif.length).toBeGreaterThan(30);
          expect(firstComp.objectif.toLowerCase()).toMatch(/savoir|comprendre|maîtriser|être capable|pouvoir/);
        }

        // Cours doit être informatif
        if (firstComp.cours) {
          expect(firstComp.cours.length).toBeGreaterThan(50);
        }

        // Étapes doivent être détaillées
        if (firstComp.etapes) {
          firstComp.etapes.forEach((etape, index) => {
            expect(etape.comment.length).toBeGreaterThan(40);
            expect(etape.exemple.length).toBeGreaterThan(15);
          });
        }

        // Exercices doivent être progressifs
        if (firstComp.exercices && firstComp.exercices.length > 1) {
          const types = firstComp.exercices.map(ex => ex.type);
          // Vérifier qu'il y a une progression ou variation
          const uniqueTypes = new Set(types);
          expect(uniqueTypes.size).toBeGreaterThan(1);
        }
      });

      test(`${nom} : descriptions des compétences simples doivent être riches`, () => {
        for (let i = 1; i < data.competences.length; i++) {
          const competence = data.competences[i];
          expect(competence.description.length).toBeGreaterThan(40);
          
          // Description doit être pédagogique
          const desc = competence.description.toLowerCase();
          const hasEducationalKeywords = [
            'savoir', 'comprendre', 'calculer', 'résoudre', 'identifier',
            'reconnaître', 'utiliser', 'appliquer', 'construire', 'tracer'
          ].some(keyword => desc.includes(keyword));
          
          expect(hasEducationalKeywords).toBe(true);
        }
      });
    });
  });

  // Tests de cohérence inter-sujets
  describe('Cohérence inter-sujets', () => {
    test('tous les sujets doivent avoir des codes chapitre cohérents', () => {
      const codesChapitre = {
        'Nombres & Calculs': 'NC',
        'Géométrie': 'GE',
        'Grandeurs & Mesures': 'GM',
        'Organisation & Gestion de données': 'OR'
      };

      sujets.forEach(({ nom, data }) => {
        const codeAttendu = codesChapitre[data.chapitre];
        expect(codeAttendu).toBeDefined();
        
        data.competences.forEach((competence) => {
          expect(competence.id).toMatch(new RegExp(`^6${codeAttendu}-`));
        });
      });
    });

    test('les Quiz IDs doivent être uniques entre tous les sujets', () => {
      const allQuizIds = [];
      
      sujets.forEach(({ nom, data }) => {
        data.competences.forEach((competence) => {
          if (competence.quizId) {
            allQuizIds.push(competence.quizId);
          }
        });
      });

      const uniqueQuizIds = new Set(allQuizIds);
      expect(uniqueQuizIds.size).toBe(allQuizIds.length);
    });

    test('les IDs de compétences doivent être uniques entre tous les sujets', () => {
      const allIds = [];
      
      sujets.forEach(({ nom, data }) => {
        data.competences.forEach((competence) => {
          allIds.push(competence.id);
        });
      });

      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });
  });

  // Tests de régression par rapport à reference.js
  describe('Tests de régression avec reference.js', () => {
    test('fractions.js doit être identique à reference.js (sauf métadonnées)', () => {
      // Le fichier fractions.js doit être notre référence parfaite
      expect(fractions6eme.niveau).toBe(reference6eme.niveau);
      expect(fractions6eme.chapitre).toBe(reference6eme.chapitre);
      expect(fractions6eme.competences).toHaveLength(reference6eme.competences.length);
      
      // Structure des compétences identique
      fractions6eme.competences.forEach((competence, index) => {
        const refComp = reference6eme.competences[index];
        
        if (index === 0) {
          // Compétence détaillée
          expect(competence.objectif).toBeDefined();
          expect(competence.cours).toBeDefined();
          expect(competence.etapes).toBeDefined();
          expect(competence.exercices).toBeDefined();
        } else {
          // Compétence simple
          expect(competence.description).toBeDefined();
          expect(competence.objectif).toBeUndefined();
          expect(competence.cours).toBeUndefined();
          expect(competence.etapes).toBeUndefined();
          expect(competence.exercices).toBeUndefined();
        }
      });
    });

    test('tous les sujets doivent maintenir la qualité de reference.js', () => {
      sujets.forEach(({ nom, data }) => {
        // Même niveau de détail dans la première compétence
        const firstComp = data.competences[0];
        const refFirstComp = reference6eme.competences[0];
        
        if (firstComp.etapes && refFirstComp.etapes) {
          expect(firstComp.etapes.length).toBeGreaterThanOrEqual(2);
        }
        
        if (firstComp.exercices && refFirstComp.exercices) {
          expect(firstComp.exercices.length).toBeGreaterThanOrEqual(2);
        }
        
        // Même niveau de simplicité dans les compétences suivantes
        for (let i = 1; i < data.competences.length; i++) {
          const competence = data.competences[i];
          expect(competence.description).toBeDefined();
          expect(competence.ressources).toBeDefined();
          expect(competence.quizId).toBeDefined();
        }
      });
    });
  });
});
