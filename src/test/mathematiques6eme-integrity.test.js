// Tests d'intégrité pour vérifier que tous les fichiers de données mathématiques 6ème respectent la structure de reference.js
import { describe, test, expect } from 'vitest';

describe('Tests d\'intégrité structurelle - Mathématiques 6ème', () => {
  
  // Import dynamique des modules pour éviter les erreurs de chargement
  let sujets = [];
  let referenceStructure = null;

  beforeAll(async () => {
    try {
      // Chargement de la structure de référence
      const referenceModule = await import('../data/reference.js');
      referenceStructure = referenceModule.reference6eme || referenceModule.default;

      // Chargement de tous les sujets
      const modules = await Promise.all([
        import('../data/mathematiques/6ieme/addition-soustraction.js'),
        import('../data/mathematiques/6ieme/multiplication.js'),
        import('../data/mathematiques/6ieme/division.js'),
        import('../data/mathematiques/6ieme/fractions.js'),
        import('../data/mathematiques/6ieme/figures-planes.js'),
        import('../data/mathematiques/6ieme/perimetre.js'),
        import('../data/mathematiques/6ieme/algebre.js')
      ]);

      sujets = [
        { nom: 'addition-soustraction', data: modules[0].additionSoustraction6eme || modules[0].default },
        { nom: 'multiplication', data: modules[1].multiplication6eme || modules[1].default },
        { nom: 'division', data: modules[2].division6eme || modules[2].default },
        { nom: 'fractions', data: modules[3].fractions6eme || modules[3].default },
        { nom: 'figures-planes', data: modules[4].figuresPlanes6eme || modules[4].default },
        { nom: 'perimetre', data: modules[5].perimetre6eme || modules[5].default },
        { nom: 'algebre', data: modules[6].algebre6eme || modules[6].default }
      ];
    } catch (error) {
      console.error('Erreur lors du chargement des modules:', error);
    }
  });

  // Tests de structure principale
  describe('Structure principale du sujet', () => {
    test('tous les sujets doivent avoir la structure de base correcte', () => {
      sujets.forEach(({ nom, data }) => {
        expect(data, `${nom}: données non définies`).toBeDefined();
        expect(data.niveau, `${nom}: niveau manquant`).toBe("6ème");
        expect(data.chapitre, `${nom}: chapitre manquant`).toBeDefined();
        expect(typeof data.chapitre, `${nom}: chapitre n'est pas une string`).toBe('string');
        expect(data.sousChapitre, `${nom}: sous-chapitre manquant`).toBeDefined();
        expect(typeof data.sousChapitre, `${nom}: sous-chapitre n'est pas une string`).toBe('string');
        expect(data.competences, `${nom}: compétences manquantes`).toBeDefined();
        expect(Array.isArray(data.competences), `${nom}: compétences n'est pas un tableau`).toBe(true);
        expect(data.competences.length, `${nom}: aucune compétence trouvée`).toBeGreaterThan(0);
      });
    });

    test('tous les chapitres doivent être valides', () => {
      const chapitresValides = [
        "Nombres & Calculs",
        "Géométrie", 
        "Grandeurs & Mesures",
        "Organisation & Gestion de données"
      ];
      
      sujets.forEach(({ nom, data }) => {
        expect(chapitresValides, `${nom}: chapitre invalide '${data.chapitre}'`).toContain(data.chapitre);
      });
    });
  });

  // Tests de conformité au modèle hybride
  describe('Conformité au modèle hybride', () => {
    test('tous les sujets doivent avoir au moins 2 compétences', () => {
      sujets.forEach(({ nom, data }) => {
        expect(data.competences.length, `${nom}: devrait avoir au moins 2 compétences pour le modèle hybride`).toBeGreaterThanOrEqual(2);
      });
    });

    test('la première compétence doit être détaillée', () => {
      sujets.forEach(({ nom, data }) => {
        const premiereCompetence = data.competences[0];
        
        // Champs obligatoires pour une compétence détaillée
        expect(premiereCompetence.objectif, `${nom}: première compétence sans objectif`).toBeDefined();
        expect(typeof premiereCompetence.objectif, `${nom}: objectif n'est pas une string`).toBe('string');
        expect(premiereCompetence.objectif.length, `${nom}: objectif trop court`).toBeGreaterThan(20);
        
        expect(premiereCompetence.cours, `${nom}: première compétence sans cours`).toBeDefined();
        expect(typeof premiereCompetence.cours, `${nom}: cours n'est pas une string`).toBe('string');
        expect(premiereCompetence.cours.length, `${nom}: cours trop court`).toBeGreaterThan(30);
        
        expect(premiereCompetence.etapes, `${nom}: première compétence sans étapes`).toBeDefined();
        expect(Array.isArray(premiereCompetence.etapes), `${nom}: étapes n'est pas un tableau`).toBe(true);
        expect(premiereCompetence.etapes.length, `${nom}: aucune étape trouvée`).toBeGreaterThan(0);
        
        expect(premiereCompetence.exemple, `${nom}: première compétence sans exemple`).toBeDefined();
        expect(typeof premiereCompetence.exemple, `${nom}: exemple n'est pas une string`).toBe('string');
        
        expect(premiereCompetence.exercices, `${nom}: première compétence sans exercices`).toBeDefined();
        expect(Array.isArray(premiereCompetence.exercices), `${nom}: exercices n'est pas un tableau`).toBe(true);
        
        // Champs de compatibilité obligatoires
        expect(premiereCompetence.description, `${nom}: première compétence sans description (compatibilité)`).toBeDefined();
        expect(typeof premiereCompetence.description, `${nom}: description n'est pas une string`).toBe('string');
        
        expect(premiereCompetence.ressources, `${nom}: première compétence sans ressources`).toBeDefined();
        expect(Array.isArray(premiereCompetence.ressources), `${nom}: ressources n'est pas un tableau`).toBe(true);
        
        expect(premiereCompetence.quizId, `${nom}: première compétence sans quizId`).toBeDefined();
        expect(typeof premiereCompetence.quizId, `${nom}: quizId n'est pas une string`).toBe('string');
      });
    });

    test('les compétences suivantes doivent être simples', () => {
      sujets.forEach(({ nom, data }) => {
        if (data.competences.length > 1) {
          for (let i = 1; i < data.competences.length; i++) {
            const competence = data.competences[i];
            
            // Champs obligatoires pour une compétence simple
            expect(competence.description, `${nom}[${i}]: compétence simple sans description`).toBeDefined();
            expect(typeof competence.description, `${nom}[${i}]: description n'est pas une string`).toBe('string');
            expect(competence.description.length, `${nom}[${i}]: description trop courte`).toBeGreaterThan(20);
            
            expect(competence.ressources, `${nom}[${i}]: compétence simple sans ressources`).toBeDefined();
            expect(Array.isArray(competence.ressources), `${nom}[${i}]: ressources n'est pas un tableau`).toBe(true);
            
            expect(competence.quizId, `${nom}[${i}]: compétence simple sans quizId`).toBeDefined();
            expect(typeof competence.quizId, `${nom}[${i}]: quizId n'est pas une string`).toBe('string');
            
            // Ces champs ne doivent PAS être présents dans une compétence simple
            expect(competence.objectif, `${nom}[${i}]: compétence simple ne doit pas avoir 'objectif'`).toBeUndefined();
            expect(competence.cours, `${nom}[${i}]: compétence simple ne doit pas avoir 'cours'`).toBeUndefined();
            expect(competence.etapes, `${nom}[${i}]: compétence simple ne doit pas avoir 'etapes'`).toBeUndefined();
            expect(competence.exercices, `${nom}[${i}]: compétence simple ne doit pas avoir 'exercices'`).toBeUndefined();
          }
        }
      });
    });
  });

  // Tests de structure des étapes
  describe('Structure des étapes', () => {
    test('les étapes doivent avoir la structure correcte', () => {
      sujets.forEach(({ nom, data }) => {
        const premiereCompetence = data.competences[0];
        if (premiereCompetence.etapes) {
          premiereCompetence.etapes.forEach((etape, index) => {
            expect(etape.titre, `${nom}: étape ${index} sans titre`).toBeDefined();
            expect(typeof etape.titre, `${nom}: titre étape ${index} n'est pas une string`).toBe('string');
            expect(etape.titre.length, `${nom}: titre étape ${index} trop court`).toBeGreaterThan(5);
            
            expect(etape.comment, `${nom}: étape ${index} sans commentaire`).toBeDefined();
            expect(typeof etape.comment, `${nom}: commentaire étape ${index} n'est pas une string`).toBe('string');
            expect(etape.comment.length, `${nom}: commentaire étape ${index} trop court`).toBeGreaterThan(30);
            
            expect(etape.exemple, `${nom}: étape ${index} sans exemple`).toBeDefined();
            expect(typeof etape.exemple, `${nom}: exemple étape ${index} n'est pas une string`).toBe('string');
            expect(etape.exemple.length, `${nom}: exemple étape ${index} trop court`).toBeGreaterThan(10);
          });
        }
      });
    });
  });

  // Tests de structure des exercices
  describe('Structure des exercices', () => {
    test('les exercices doivent avoir la structure correcte', () => {
      sujets.forEach(({ nom, data }) => {
        const premiereCompetence = data.competences[0];
        if (premiereCompetence.exercices) {
          premiereCompetence.exercices.forEach((exercice, index) => {
            expect(exercice.type, `${nom}: exercice ${index} sans type`).toBeDefined();
            expect(['débutant', 'intermédiaire', 'avancé'], `${nom}: type exercice ${index} invalide`).toContain(exercice.type);
            
            expect(exercice.question, `${nom}: exercice ${index} sans question`).toBeDefined();
            expect(typeof exercice.question, `${nom}: question exercice ${index} n'est pas une string`).toBe('string');
            expect(exercice.question.length, `${nom}: question exercice ${index} trop courte`).toBeGreaterThan(10);
            
            expect(exercice.points, `${nom}: exercice ${index} sans points`).toBeDefined();
            expect(typeof exercice.points, `${nom}: points exercice ${index} n'est pas un nombre`).toBe('number');
            expect(exercice.points, `${nom}: points exercice ${index} trop faibles`).toBeGreaterThanOrEqual(10);
            expect(exercice.points, `${nom}: points exercice ${index} trop élevés`).toBeLessThanOrEqual(20);
          });
        }
      });
    });

    test('les questions doivent suivre les conventions pédagogiques', () => {
      sujets.forEach(({ nom, data }) => {
        const premiereCompetence = data.competences[0];
        if (premiereCompetence.exercices) {
          premiereCompetence.exercices.forEach((exercice, index) => {
            const question = exercice.question.toLowerCase();
            const hasQuestionMark = exercice.question.includes('?');
            const hasKeywords = ['calcule', 'combien', 'quel', 'quelle', 'trouve', 'détermine', 'écris', 'simplifie', 'identifie', 'vérifie', 'colorie', 'repère'].some(
              keyword => question.includes(keyword)
            );
            
            expect(hasQuestionMark || hasKeywords, `${nom}: question exercice ${index} doit se terminer par '?' ou contenir un mot-clé pédagogique`).toBe(true);
          });
        }
      });
    });
  });

  // Tests de structure des ressources
  describe('Structure des ressources', () => {
    test('les ressources doivent avoir la structure correcte', () => {
      sujets.forEach(({ nom, data }) => {
        data.competences.forEach((competence, index) => {
          if (competence.ressources && competence.ressources.length > 0) {
            competence.ressources.forEach((ressource, resIndex) => {
              expect(ressource.type, `${nom}[${index}]: ressource ${resIndex} sans type`).toBeDefined();
              expect(['vidéo', 'exercice', 'jeu', 'fiches', 'animation'], `${nom}[${index}]: type ressource ${resIndex} invalide`).toContain(ressource.type);
              
              expect(ressource.titre, `${nom}[${index}]: ressource ${resIndex} sans titre`).toBeDefined();
              expect(typeof ressource.titre, `${nom}[${index}]: titre ressource ${resIndex} n'est pas une string`).toBe('string');
              expect(ressource.titre.length, `${nom}[${index}]: titre ressource ${resIndex} trop court`).toBeGreaterThan(5);
              
              expect(ressource.url, `${nom}[${index}]: ressource ${resIndex} sans URL`).toBeDefined();
              expect(typeof ressource.url, `${nom}[${index}]: URL ressource ${resIndex} n'est pas une string`).toBe('string');
              expect(ressource.url, `${nom}[${index}]: URL ressource ${resIndex} invalide`).toMatch(/^https?:\/\//);
            });
          }
        });
      });
    });
  });

  // Tests des formats d'IDs
  describe('Format des IDs', () => {
    test('les IDs de compétences doivent suivre le format standardisé', () => {
      const codesChapitre = {
        'Nombres & Calculs': 'NC',
        'Géométrie': 'GE',
        'Grandeurs & Mesures': 'GM',
        'Organisation & Gestion de données': 'OR'
      };

      sujets.forEach(({ nom, data }) => {
        const codeAttendu = codesChapitre[data.chapitre];
        expect(codeAttendu, `${nom}: code chapitre introuvable pour '${data.chapitre}'`).toBeDefined();
        
        data.competences.forEach((competence, index) => {
          const expectedIdRegex = new RegExp(`^6${codeAttendu}-[A-Z]{2,3}-${index + 1}$`);
          expect(competence.id, `${nom}[${index}]: ID incorrect '${competence.id}', attendu format 6${codeAttendu}-XX-${index + 1}`).toMatch(expectedIdRegex);
        });
      });
    });

    test('les Quiz IDs doivent suivre le format standardisé', () => {
      sujets.forEach(({ nom, data }) => {
        data.competences.forEach((competence, index) => {
          if (competence.quizId) {
            expect(competence.quizId, `${nom}[${index}]: Quiz ID incorrect '${competence.quizId}', attendu format QUIZ_6_XXX`).toMatch(/^QUIZ_6_[A-Z_]+$/);
            expect(competence.quizId.length, `${nom}[${index}]: Quiz ID trop court`).toBeGreaterThan(8);
          }
        });
      });
    });
  });

  // Tests d'unicité
  describe('Unicité des identifiants', () => {
    test('les IDs de compétences doivent être uniques', () => {
      const allIds = [];
      sujets.forEach(({ nom, data }) => {
        data.competences.forEach((competence) => {
          allIds.push({ id: competence.id, source: nom });
        });
      });

      const duplicates = allIds.filter((item, index) => 
        allIds.findIndex(other => other.id === item.id) !== index
      );

      expect(duplicates, `IDs dupliqués trouvés: ${duplicates.map(d => `${d.id} (${d.source})`).join(', ')}`).toHaveLength(0);
    });

    test('les Quiz IDs doivent être uniques', () => {
      const allQuizIds = [];
      sujets.forEach(({ nom, data }) => {
        data.competences.forEach((competence) => {
          if (competence.quizId) {
            allQuizIds.push({ id: competence.quizId, source: nom });
          }
        });
      });

      const duplicates = allQuizIds.filter((item, index) => 
        allQuizIds.findIndex(other => other.id === item.id) !== index
      );

      expect(duplicates, `Quiz IDs dupliqués trouvés: ${duplicates.map(d => `${d.id} (${d.source})`).join(', ')}`).toHaveLength(0);
    });
  });

  // Test de conformité avec la référence
  describe('Conformité avec reference.js', () => {
    test('la structure de référence doit être valide', () => {
      expect(referenceStructure, 'Structure de référence non chargée').toBeDefined();
      expect(referenceStructure.niveau, 'Reference: niveau manquant').toBe("6ème");
      expect(referenceStructure.competences, 'Reference: compétences manquantes').toBeDefined();
      expect(referenceStructure.competences.length, 'Reference: doit avoir au moins 2 compétences').toBeGreaterThanOrEqual(2);
    });

    test('tous les sujets doivent maintenir la qualité de la référence', () => {
      sujets.forEach(({ nom, data }) => {
        // Même niveau de détail dans la première compétence
        const firstComp = data.competences[0];
        const refFirstComp = referenceStructure.competences[0];
        
        if (firstComp.etapes && refFirstComp.etapes) {
          expect(firstComp.etapes.length, `${nom}: devrait avoir au moins 2 étapes comme la référence`).toBeGreaterThanOrEqual(2);
        }
        
        if (firstComp.exercices && refFirstComp.exercices) {
          expect(firstComp.exercices.length, `${nom}: devrait avoir au moins 2 exercices comme la référence`).toBeGreaterThanOrEqual(2);
        }
        
        // Même niveau de simplicité dans les compétences suivantes
        for (let i = 1; i < data.competences.length; i++) {
          const competence = data.competences[i];
          expect(competence.description, `${nom}[${i}]: compétence simple doit avoir une description`).toBeDefined();
          expect(competence.ressources, `${nom}[${i}]: compétence simple doit avoir des ressources`).toBeDefined();
          expect(competence.quizId, `${nom}[${i}]: compétence simple doit avoir un quizId`).toBeDefined();
        }
      });
    });
  });

  // Test de complétude
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
        expect(sujetsTrouves, `Sujet manquant: ${sujetAttendu}`).toContain(sujetAttendu);
      });
    });

    test('aucun sujet ne doit avoir de structure corrompue', () => {
      sujets.forEach(({ nom, data }) => {
        expect(data, `${nom}: données corrompues (null)`).not.toBeNull();
        expect(data, `${nom}: données corrompues (undefined)`).not.toBeUndefined();
        expect(typeof data, `${nom}: données corrompues (type incorrect)`).toBe('object');
        expect(Object.keys(data).length, `${nom}: objet vide`).toBeGreaterThan(3);
      });
    });
  });
});
