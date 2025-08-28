// Donnees specifiques au perimetre pour la classe de 6eme
const data = {
  niveau: "6eme",
  chapitre: "Grandeurs & Mesures",
  sousChapitre: "Perimetre",
  competences: [
    {
      // COMPETENCE DETAILLEE (premiere competence)
      id: "6GM-PE-1",
      titre: "Perimetre des polygones",
      objectif: "Savoir calculer le perimetre de polygones en additionnant les longueurs des cotes.",

      cours: "Le perimetre d'un polygone est la longueur de son contour. On l'obtient en additionnant les longueurs de tous ses cotes.",

      etapes: [
        {
          titre: "Identifier tous les cotes",
          comment: "Repere tous les cotes de la figure et note leurs longueurs.",
          exemple: "Pour un triangle ABC : cotes AB, BC et AC"
        },
        {
          titre: "Additionner les longueurs",
          comment: "Fais la somme de toutes les longueurs des cotes.",
          exemple: "Perimetre = AB + BC + AC"
        },
        {
          titre: "Utiliser les proprietes",
          comment: "Dans un carre, tous les cotes sont egaux. Dans un rectangle, les cotes opposes sont egaux.",
          exemple: "Carre de cote 5 cm : P = 4 × 5 = 20 cm"
        },
        {
          titre: "Verifier l'unite",
          comment: "Assure-toi que toutes les mesures sont dans la meme unite avant de calculer.",
          exemple: "Si un cote est en m et l'autre en cm, convertis tout en cm ou en m"
        }
      ],

      exemple: "Rectangle de longueur 8 cm et largeur 5 cm : P = 2 × (8 + 5) = 2 × 13 = 26 cm",

      exercices: [
        { 
          type: "debutant", 
          question: "Calcule le perimetre d'un carre de cote 6 cm",
          reponse: "24 cm",
          points: 10
        },
        { 
          type: "intermediaire", 
          question: "Calcule le perimetre d'un rectangle 7 cm × 4 cm",
          reponse: "22 cm",
          points: 15
        },
        { 
          type: "avance", 
          question: "Calcule le perimetre d'un triangle de cotes 5 cm, 7 cm et 9 cm",
          reponse: "21 cm",
          points: 20
        }
      ],

      astuce: "Pour un rectangle : P = 2 × (longueur + largeur), pour un carre : P = 4 × cote",
      
      utilite: "Calculer un perimetre sert a connaitre la longueur de cloture necessaire, de cadre pour un tableau, etc.",

      // Phase 4 : Metacognition - Reflexion sur l'apprentissage
      metacognition: {
        questions: [
          {
            type: "comprehension",
            question: "Qu'est-ce que le perimetre d'une figure ?",
            options: [
              "La somme de tous les cotes de la figure",
              "L'aire de la figure",
              "Le nombre de cotes de la figure",
              "La hauteur de la figure"
            ]
          },
          {
            type: "application",
            question: "Dans quelle situation reelle calculez-vous un perimetre ?",
            options: [
              "Pour acheter une cloture pour son jardin",
              "Pour encadrer un tableau",
              "Pour faire le tour d'un terrain de sport",
              "Toutes ces reponses"
            ]
          },
          {
            type: "analyse",
            question: "Quelle est la difference principale entre calculer le perimetre d'un carre et d'un rectangle ?",
            options: [
              "Pour le carre, on multiplie un cote par 4, pour le rectangle on utilise longueur et largeur",
              "Il n'y a pas de difference",
              "Le rectangle est plus complique a mesurer",
              "Le carre n'a pas de perimetre"
            ]
          },
          {
            type: "synthese",
            question: "Comment verifieriez-vous que votre calcul de perimetre est correct ?",
            options: [
              "En verifiant que j'ai bien additionne tous les cotes",
              "En refaisant le calcul une seconde fois",
              "En verifiant que l'unite est coherente (cm, m, etc.)",
              "Toutes ces methodes"
            ]
          }
        ]
      },

      // Maintien de la compatibilite avec l'ancien format
      description: "Calculer le perimetre de polygones en additionnant les longueurs de tous les cotes.",
      ressources: [
        { type: "video", titre: "Calcul de perimetres", url: "https://www.youtube.com/watch?v=perimetre" },
        { type: "exercice", titre: "Perimetres varies", url: "https://www.sesamath.net/" }
      ],
      quizId: "QUIZ_6_PERIMETRE_POLYGONES"
    },
    {
      // COMPETENCE SIMPLE
      id: "6GM-PE-2",
      titre: "Perimetre du cercle",
      description: "Calculer le perimetre (circonference) d'un cercle avec la formule P = π × diametre.",
      exemple: "Ex. : Cercle de rayon 3 cm, diametre = 6 cm, P = π × 6 ≈ 3,14 × 6 = 18,84 cm",
      astuce: "Retiens que π ≈ 3,14 et que diametre = 2 × rayon",
      ressources: [
        { type: "video", titre: "Circonference du cercle", url: "https://www.geogebra.org/" }
      ],
      quizId: "QUIZ_6_PERIMETRE_CERCLE"
    },
    {
      // COMPETENCE SIMPLE
      id: "6GM-PE-3",
      titre: "Problemes de perimetre",
      description: "Resoudre des problemes concrets impliquant le calcul de perimetres.",
      exemple: "Ex. : Combien de metres de grillage pour entourer un jardin rectangulaire de 12 m × 8 m ?",
      astuce: "Lis bien l'enonce pour identifier la forme et les dimensions de la figure",
      ressources: [
        { type: "exercice", titre: "Problemes concrets", url: "https://www.maths-et-tiques.fr/" }
      ],
      quizId: "QUIZ_6_PROBLEMES_PERIMETRE"
    }
  ]
};

// Assign to window for browser compatibility
window.data = data;
