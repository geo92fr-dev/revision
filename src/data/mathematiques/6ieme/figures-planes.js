// Données spécifiques aux figures planes pour la classe de 6ème
export const figuresPlanes6eme = {
  niveau: "6ème",
  chapitre: "Géométrie",
  sousChapitre: "Figures planes",
  competences: [
    {
      // COMPÉTENCE DÉTAILLÉE (première compétence)
      id: "6GE-FP-1",
      titre: "Les triangles",
      objectif: "Savoir reconnaître et construire différents types de triangles.",

      cours: "Un triangle est un polygone à 3 côtés et 3 angles. Il existe plusieurs types de triangles selon leurs côtés et leurs angles.",

      etapes: [
        {
          titre: "Triangle quelconque",
          comment: "Triangle dont les 3 côtés sont de longueurs différentes et les 3 angles sont différents.",
          exemple: "Un triangle ABC avec AB = 5 cm, BC = 7 cm, AC = 4 cm."
        },
        {
          titre: "Triangle isocèle",
          comment: "Triangle ayant 2 côtés de même longueur. Les angles opposés aux côtés égaux sont égaux.",
          exemple: "Triangle avec AB = AC = 6 cm, BC = 4 cm."
        },
        {
          titre: "Triangle équilatéral",
          comment: "Triangle ayant ses 3 côtés de même longueur et ses 3 angles égaux (60° chacun).",
          exemple: "Triangle avec AB = BC = AC = 5 cm."
        },
        {
          titre: "Triangle rectangle",
          comment: "Triangle ayant un angle droit (90°). Le côté opposé à l'angle droit est l'hypoténuse.",
          exemple: "Triangle rectangle en A avec un angle de 90° en A."
        }
      ],

      exemple: "Dans un triangle équilatéral de côté 4 cm, tous les angles mesurent 60°.",

      exercices: [
        { 
          type: "débutant", 
          question: "Quel type de triangle a 3 côtés égaux ?",
          reponse: "équilatéral",
          points: 10
        },
        { 
          type: "intermédiaire", 
          question: "Dans un triangle isocèle, combien de côtés sont égaux ?",
          reponse: "2",
          points: 15
        },
        { 
          type: "avancé", 
          question: "Comment appelle-t-on le côté opposé à l'angle droit dans un triangle rectangle ?",
          reponse: "hypoténuse",
          points: 20
        }
      ],

      astuce: "Pour retenir : équi-latéral = tous les côtés égaux, iso-cèle = 2 côtés égaux",
      
      utilite: "Les triangles sont partout : architecture, art, panneaux de signalisation, structures...",

      // Maintien de la compatibilité avec l'ancien format
      description: "Identifier et classer les triangles selon leurs propriétés (côtés et angles).",
      ressources: [
        { type: "vidéo", titre: "Types de triangles", url: "https://www.youtube.com/watch?v=triangles" },
        { type: "jeu", titre: "Construction de triangles", url: "https://www.geogebra.org/" }
      ],
      quizId: "QUIZ_6_TRIANGLES"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6GE-FP-2",
      titre: "Les quadrilatères",
      description: "Reconnaître et nommer les quadrilatères : carré, rectangle, losange, parallélogramme, trapèze.",
      exemple: "Ex. : Un carré a 4 côtés égaux et 4 angles droits, un rectangle a 4 angles droits",
      astuce: "Carré = rectangle + losange (4 côtés égaux ET 4 angles droits)",
      ressources: [
        { type: "fiches", titre: "Propriétés des quadrilatères", url: "https://www.maths-et-tiques.fr/" }
      ],
      quizId: "QUIZ_6_QUADRILATERES"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6GE-FP-3",
      titre: "Le cercle",
      description: "Connaître le vocabulaire du cercle : centre, rayon, diamètre, corde, arc.",
      exemple: "Ex. : Le diamètre mesure 2 fois le rayon, une corde relie 2 points du cercle",
      astuce: "Diamètre = 2 × rayon, et le diamètre est la plus grande corde du cercle",
      ressources: [
        { type: "jeu", titre: "Éléments du cercle", url: "https://www.geogebra.org/" }
      ],
      quizId: "QUIZ_6_CERCLE"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6GE-FP-4",
      titre: "Construction de figures",
      description: "Utiliser les instruments de géométrie pour construire des figures planes précises.",
      exemple: "Ex. : Construire un triangle équilatéral avec un compas et une règle",
      astuce: "Toujours tracer les traits de construction en pointillés et les laisser visibles",
      ressources: [
        { type: "vidéo", titre: "Constructions géométriques", url: "https://www.youtube.com/watch?v=construction" }
      ],
      quizId: "QUIZ_6_CONSTRUCTION"
    }
  ]
};

export default figuresPlanes6eme;
