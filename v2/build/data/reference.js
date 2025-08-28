// FICHIER DE RÉFÉRENCE POUR LA STRUCTURE DES DONNÉES
// ================================================
// 
// 📍 EMPLACEMENT : src/data/reference.js (racine de data)
// 🎯 OBJECTIF    : Définir la structure commune à TOUS les sujets et niveaux
// 🔗 UTILISÉ PAR : Tests d'intégrité, validation des données, documentation
//
// Ce fichier documente la structure attendue pour tous les sujets éducatifs.
// Il sert de référence pour maintenir la cohérence entre tous les contenus.

/**
 * STRUCTURE GÉNÉRALE D'UN SUJET
 * =============================
 * 
 * Chaque sujet de mathématiques doit respecter cette structure :
 * 
 * export const nomSujet6eme = {
 *   niveau: "6ème",                    // Toujours "6ème" pour ce niveau
 *   chapitre: "Nom du chapitre",       // Ex: "Nombres & Calculs", "Géométrie", etc.
 *   sousChapitre: "Nom du sous-chapitre", // Ex: "Addition et soustraction"
 *   competences: [...]                 // Tableau des compétences (voir structure ci-dessous)
 * }
 * 
 * export default nomSujet6eme;        // Export par défaut obligatoire
 */

/**
 * STRUCTURE D'UNE COMPÉTENCE
 * ==========================
 * 
 * Il existe DEUX types de compétences :
 * 
 * 1. COMPÉTENCE DÉTAILLÉE (généralement la première) :
 * ---------------------------------------------------
 * {
 *   id: "6XX-YY-Z",                    // Format: 6 + code chapitre + code sujet + numéro
 *   titre: "Titre de la compétence",   // Titre court et explicite
 *   objectif: "Description de l'objectif pédagogique", // Ce que l'élève doit savoir faire
 *   
 *   cours: "Explication théorique...", // Contenu du cours, explications
 *   
 *   etapes: [                          // Étapes d'apprentissage détaillées
 *     {
 *       titre: "Nom de l'étape",
 *       comment: "Explication de l'étape (>30 caractères)",
 *       exemple: "Exemple concret"
 *     },
 *     // ... autres étapes
 *   ],
 *   
 *   exemple: "Exemple global de la compétence",
 *   
 *   exercices: [                       // Exercices interactifs avec progression
 *     {
 *       type: "débutant",              // "débutant", "intermédiaire", "avancé"
 *       question: "Énoncé de l'exercice se terminant par ?",
 *       reponse: "réponse attendue",   // Format numérique ou textuel selon le contexte
 *       points: 15,                    // Points croissants avec la difficulté (10, 15, 20)
 *       interactif: true,              // (optionnel) si l'exercice est interactif
 *       typeExercice: "type"           // (optionnel) type spécifique d'exercice
 *     },
 *     // ... autres exercices avec points croissants
 *   ],
 *   
 *   // Éléments pédagogiques enrichis (optionnels)
 *                   // Quiz rapides
 *   preEvaluation: {...},              // Évaluation diagnostique
 *   astuce: "Conseil pratique",        // Astuce mémorisation/méthode
 *   pieges: [...],                     // Erreurs fréquentes à éviter
 *   defi: {...},                       // Défi/challenge
 *   utilite: "Applications pratiques", // Utilité dans la vie courante
 *   funFact: "Anecdote amusante",      // Fait amusant lié au sujet
 *   metacognition: {...},              // Questions de réflexion sur l'apprentissage
 *   
 *   // Compatibilité avec l'ancien format (obligatoire)
 *   description: "Description courte pour compatibilité",
 *   ressources: [                      // Ressources externes
 *     {
 *       type: "vidéo",                 // "vidéo", "exercice", "jeu", "fiches"
 *       titre: "Titre de la ressource",
 *       url: "https://..."
 *     },
 *     // ... autres ressources
 *   ],
 *          // Identifiant unique du quiz
 * }
 * 
 * 2. COMPÉTENCE SIMPLE (compétences suivantes) :
 * ----------------------------------------------
 * {
 *   id: "6XX-YY-Z",                    // Format identique
 *   titre: "Titre de la compétence",   // Titre court
 *   description: "Description complète de la compétence", // Objectif pédagogique
 *   exemple: "Ex. : exemple concret",  // (optionnel) Exemple illustratif
 *   astuce: "Conseil pratique",        // (optionnel) Astuce mémorisation
 *   ressources: [                      // Ressources externes (structure identique)
 *     { type: "vidéo", titre: "...", url: "..." },
 *     // ...
 *   ],
 *          // Identifiant unique du quiz
 * }
 */

/**
 * CODES CHAPITRES STANDARDISÉS
 * ============================
 * NC = Nombres & Calculs
 * GE = Géométrie  
 * GM = Grandeurs & Mesures
 * OR = Organisation & Gestion de données
 */

/**
 * RÈGLES DE NOMMAGE
 * =================
 * - IDs des compétences : 6 + code chapitre + code sujet + numéro (ex: 6NC-AS-1)
 * - Quiz IDs : QUIZ_6_DESCRIPTION_COURTE (ex: QUIZ_6_ADDITION)
 * - Points exercices : progression 10 → 15 → 20 (ou 15 → 15 → 10 si décroissant acceptable)
 * - Questions : doivent se terminer par "?" ou contenir "Calcule"/"Combien"/"Quel"
 * - Réponses numériques : format simple "42" ou avec unités "42 cm"
 */

/**
 * EXEMPLE COMPLET BASÉ SUR FRACTIONS.JS
 * =====================================
 */

// Données spécifiques aux fractions pour la classe de 6ème
export const reference6eme = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs", 
  sousChapitre: "Fractions (bases)",
  competences: [
    {
      // COMPÉTENCE DÉTAILLÉE (première compétence)
      id: "6NC-FR-1",
      titre: "Comprendre les fractions",
      objectif: "Savoir lire, écrire et représenter une fraction.",

      cours: "Une fraction représente une partie d'un tout. Exemple : 3/4 signifie 3 parts sur 4 au total.",

      etapes: [
        {
          titre: "Identifier le numérateur et le dénominateur",
          comment: "Dans une fraction a/b, le nombre du haut (a) est le numérateur (parts prises), le nombre du bas (b) est le dénominateur (total de parts).",
          exemple: "dans 3/5, le numérateur est 3 et le dénominateur est 5."
        },
        {
          titre: "Représenter une fraction sur un schéma", 
          comment: "Dessine une figure (cercle, rectangle, barre) et divise-la en autant de parts égales que le dénominateur, puis colorie le nombre de parts indiqué par le numérateur.",
          exemple: "pour 2/3, divise en 3 parts et colorie 2 parts."
        },
        {
          titre: "Comparer et classer des fractions",
          comment: "Si même dénominateur, compare les numérateurs. Sinon, convertis au même dénominateur ou utilise les décimaux.",
          exemple: "2/5 < 3/5 car 2 < 3. Pour 1/2 vs 2/3, convertis : 3/6 vs 4/6, donc 1/2 < 2/3."
        }
      ],

      exemple: "Si tu manges 2 parts sur 8 d'un gâteau, tu as mangé 2/8, soit 1/4.",

      exercices: [
        { 
          type: "débutant", 
          question: "Colorie 1/2 d'un rectangle.",
          points: 15,
          interactif: true,
          typeExercice: "rectangle"
        },
        { 
          type: "intermédiaire", 
          question: "Repère 3/4 sur une droite graduée.",
          points: 15,
          interactif: true,
          typeExercice: "droite"
        },
        { 
          type: "avancé", 
          question: "Calcule : 5/8 d'un gâteau de 32 parts.",
          points: 10,
          interactif: true,
          typeExercice: "calcul",
          reponse: 20,
          methode: "(5 × 32) ÷ 8"
        }
      ],

      // Éléments pédagogiques enrichis
          reponse: "2/5",
          points: 20
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Dans la fraction 7/9, quel est le dénominateur ?",
            choix: ["7", "9", "16", "2"],
            reponse: "9"
          }
        ]
      },

      astuce: "Pour bien identifier une fraction, souviens-toi que le numérateur (en haut) indique combien de parts on prend, et le dénominateur (en bas) indique en combien de parts égales on divise le tout.",
      
      pieges: [
        {
          titre: "Piège classique",
          description: "Ne confonds pas 3/4 avec 4/3 ! Dans 3/4, on prend 3 parts sur 4. Dans 4/3, on prend 4 parts sur 3 (plus que le tout !)."
        }
      ],

      defi: {
        titre: "Défi fractions équivalentes",
        description: "Tu as 30 secondes pour trouver 3 fractions équivalentes à 2/3.",
        exemples: ["4/6", "6/9", "8/12"],
        duree: 30
      },

      utilite: "Les fractions sont essentielles pour cuisiner, partager des objets, calculer des remises, comprendre les pourcentages et gérer son budget.",

      funFact: "Dans une étude américaine, 3 adultes sur 5 ont avoué qu'ils préféraient partager une pizza plutôt que des bonbons… mais 2 sur 5 ne savaient pas calculer 3/8 d'une pizza ! 🍕😂",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir lire, écrire et représenter une fraction' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          }
        ]
      },

      // Maintien de la compatibilité avec l'ancien format
      description: "Interpréter a/b comme 'a parts sur b parts égales' ; relier fraction, partage et repérage sur une demi-droite graduée.",
      ressources: [
        { type: "vidéo", titre: "Découvrir les fractions", url: "https://www.youtube.com/watch?v=QY1G1Yr4gkI" },
        { type: "jeu", titre: "Fraction – parts de pizza", url: "https://www.logicieleducatif.fr/" }
      ]
    },
    {
      // COMPÉTENCE SIMPLE (compétences suivantes)
      id: "6NC-FR-2",
      titre: "Fractions équivalentes et simplification",
      description: "Produire des fractions équivalentes en multipliant/divisant haut et bas par un même nombre. Réduire une fraction irréductible.",
      exemple: "Ex. : 6/8 = 3/4 ; 25/100 = 1/4.",
      astuce: "Divise par le plus grand facteur commun (PGCD) pour simplifier rapidement.",
      ressources: [
        { type: "exercice", titre: "Simplifier des fractions", url: "https://www.sesamath.net/" }
      ]
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6NC-FR-3",
      titre: "Passer fraction ↔ décimal",
      description: "Convertir certaines fractions en écriture décimale (dénominateur 2, 4, 5, 10, 20, 25, 50, 100…) et inversement.",
      exemple: "Ex. : 3/4 = 0,75 ; 0,2 = 1/5.",
      astuce: "Cherche un dénominateur 10, 100, 1000… pour écrire en décimal facilement.",
      ressources: [
        { type: "vidéo", titre: "Fractions ↔ décimaux", url: "https://www.youtube.com/watch?v=Omc8Nxnz3tE" }
      ]
    }
  ]
};

export default reference6eme;
