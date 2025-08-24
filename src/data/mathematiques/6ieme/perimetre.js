// Données spécifiques au périmètre pour la classe de 6ème
export const perimetre6eme = {
  niveau: "6ème",
  chapitre: "Grandeurs & Mesures",
  sousChapitre: "Périmètre",
  competences: [
    {
      // COMPÉTENCE DÉTAILLÉE (première compétence)
      id: "6GM-PE-1",
      titre: "Périmètre des polygones",
      objectif: "Savoir calculer le périmètre de polygones en additionnant les longueurs des côtés.",

      cours: "Le périmètre d'un polygone est la longueur de son contour. On l'obtient en additionnant les longueurs de tous ses côtés.",

      etapes: [
        {
          titre: "Identifier tous les côtés",
          comment: "Repère tous les côtés de la figure et note leurs longueurs.",
          exemple: "Pour un triangle ABC : côtés AB, BC et AC"
        },
        {
          titre: "Additionner les longueurs",
          comment: "Fais la somme de toutes les longueurs des côtés.",
          exemple: "Périmètre = AB + BC + AC"
        },
        {
          titre: "Utiliser les propriétés",
          comment: "Dans un carré, tous les côtés sont égaux. Dans un rectangle, les côtés opposés sont égaux.",
          exemple: "Carré de côté 5 cm : P = 4 × 5 = 20 cm"
        },
        {
          titre: "Vérifier l'unité",
          comment: "Assure-toi que toutes les mesures sont dans la même unité avant de calculer.",
          exemple: "Si un côté est en m et l'autre en cm, convertis tout en cm ou en m"
        }
      ],

      exemple: "Rectangle de longueur 8 cm et largeur 5 cm : P = 2 × (8 + 5) = 2 × 13 = 26 cm",

      exercices: [
        { 
          type: "débutant", 
          question: "Calcule le périmètre d'un carré de côté 6 cm",
          reponse: "24 cm",
          points: 10
        },
        { 
          type: "intermédiaire", 
          question: "Calcule le périmètre d'un rectangle 7 cm × 4 cm",
          reponse: "22 cm",
          points: 15
        },
        { 
          type: "avancé", 
          question: "Calcule le périmètre d'un triangle de côtés 5 cm, 7 cm et 9 cm",
          reponse: "21 cm",
          points: 20
        }
      ],

      astuce: "Pour un rectangle : P = 2 × (longueur + largeur), pour un carré : P = 4 × côté",
      
      utilite: "Calculer un périmètre sert à connaître la longueur de clôture nécessaire, de cadre pour un tableau, etc.",

      // Maintien de la compatibilité avec l'ancien format
      description: "Calculer le périmètre de polygones en additionnant les longueurs de tous les côtés.",
      ressources: [
        { type: "vidéo", titre: "Calcul de périmètres", url: "https://www.youtube.com/watch?v=perimetre" },
        { type: "exercice", titre: "Périmètres variés", url: "https://www.sesamath.net/" }
      ],
      quizId: "QUIZ_6_PERIMETRE_POLYGONES"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6GM-PE-2",
      titre: "Périmètre du cercle",
      description: "Calculer le périmètre (circonférence) d'un cercle avec la formule P = π × diamètre.",
      exemple: "Ex. : Cercle de rayon 3 cm, diamètre = 6 cm, P = π × 6 ≈ 3,14 × 6 = 18,84 cm",
      astuce: "Retiens que π ≈ 3,14 et que diamètre = 2 × rayon",
      ressources: [
        { type: "vidéo", titre: "Circonférence du cercle", url: "https://www.geogebra.org/" }
      ],
      quizId: "QUIZ_6_PERIMETRE_CERCLE"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6GM-PE-3",
      titre: "Problèmes de périmètre",
      description: "Résoudre des problèmes concrets impliquant le calcul de périmètres.",
      exemple: "Ex. : Combien de mètres de grillage pour entourer un jardin rectangulaire de 12 m × 8 m ?",
      astuce: "Lis bien l'énoncé pour identifier la forme et les dimensions de la figure",
      ressources: [
        { type: "exercice", titre: "Problèmes concrets", url: "https://www.maths-et-tiques.fr/" }
      ],
      quizId: "QUIZ_6_PROBLEMES_PERIMETRE"
    }
  ]
};

export default perimetre6eme;
