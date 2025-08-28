// Donnees specifiques aux figures planes pour la classe de 6eme
const data = {
  niveau: "6eme",
  chapitre: "Geometrie",
  sousChapitre: "Figures planes",
  competences: [
    {
      // COMPETENCE DETAILLEE (premiere competence)
      id: "6GE-FP-1",
      titre: "Les triangles",
      objectif: "Savoir reconnaitre et construire differents types de triangles.",

      cours: "Un triangle est un polygone a 3 cotes et 3 angles. Il existe plusieurs types de triangles selon leurs cotes et leurs angles.",

      etapes: [
        {
          titre: "Triangle quelconque",
          comment: "Triangle dont les 3 cotes sont de longueurs differentes et les 3 angles sont differents.",
          exemple: "Un triangle ABC avec AB = 5 cm, BC = 7 cm, AC = 4 cm."
        },
        {
          titre: "Triangle isocele",
          comment: "Triangle ayant 2 cotes de meme longueur. Les angles opposes aux cotes egaux sont egaux.",
          exemple: "Triangle avec AB = AC = 6 cm, BC = 4 cm."
        },
        {
          titre: "Triangle equilateral",
          comment: "Triangle ayant ses 3 cotes de meme longueur et ses 3 angles egaux (60° chacun).",
          exemple: "Triangle avec AB = BC = AC = 5 cm."
        },
        {
          titre: "Triangle rectangle",
          comment: "Triangle ayant un angle droit (90°). Le cote oppose a l'angle droit est l'hypotenuse.",
          exemple: "Triangle rectangle en A avec un angle de 90° en A."
        }
      ],

      exemple: "Dans un triangle equilateral de cote 4 cm, tous les angles mesurent 60°.",

      exercices: [
        { 
          type: "debutant", 
          question: "Quel type de triangle a 3 cotes egaux ?",
          reponse: "equilateral",
          points: 10
        },
        { 
          type: "intermediaire", 
          question: "Dans un triangle isocele, combien de cotes sont egaux ?",
          reponse: "2",
          points: 15
        },
        { 
          type: "avance", 
          question: "Comment appelle-t-on le cote oppose a l'angle droit dans un triangle rectangle ?",
          reponse: "hypotenuse",
          points: 20
        }
      ],

      astuce: "Pour retenir : equi-lateral = tous les cotes egaux, iso-cele = 2 cotes egaux",
      
      utilite: "Les triangles sont partout : architecture, art, panneaux de signalisation, structures...",

      // Phase 4 : Metacognition - Reflexion sur l'apprentissage
      metacognition: {
        questions: [
          {
            type: "comprehension",
            question: "Quelles sont les differences principales entre un triangle isocele et un triangle equilateral ?",
            options: [
              "L'isocele a 2 cotes egaux, l'equilateral en a 3",
              "L'isocele a 3 angles egaux, l'equilateral en a 2", 
              "Il n'y a pas de difference",
              "L'isocele est plus grand que l'equilateral"
            ]
          },
          {
            type: "application",
            question: "Dans quelle situation reelle pourriez-vous utiliser vos connaissances sur les triangles ?",
            options: [
              "Pour construire une etagere triangulaire",
              "Pour comprendre les panneaux de signalisation",
              "Pour analyser l'architecture d'un bâtiment",
              "Toutes ces reponses"
            ]
          },
          {
            type: "analyse",
            question: "Quelle etait la partie la plus difficile a comprendre dans cette lecon ?",
            options: [
              "La difference entre les types de triangles",
              "La construction des triangles",
              "Le vocabulaire specialise",
              "Rien n'etait difficile"
            ]
          },
          {
            type: "synthese",
            question: "Comment pourriez-vous expliquer ce qu'est un triangle rectangle a un ami ?",
            options: [
              "C'est un triangle avec un angle droit de 90°",
              "C'est un triangle qui a la forme d'un carre",
              "C'est un triangle avec 3 angles droits",
              "C'est un triangle tres grand"
            ]
          }
        ]
      },

      // Maintien de la compatibilite avec l'ancien format
      description: "Identifier et classer les triangles selon leurs proprietes (cotes et angles).",
      ressources: [
        { type: "video", titre: "Types de triangles", url: "https://www.youtube.com/watch?v=triangles" },
        { type: "jeu", titre: "Construction de triangles", url: "https://www.geogebra.org/" }
      ],
      quizId: "QUIZ_6_TRIANGLES"
    },
    {
      // COMPETENCE SIMPLE
      id: "6GE-FP-2",
      titre: "Les quadrilateres",
      description: "Reconnaitre et nommer les quadrilateres : carre, rectangle, losange, parallelogramme, trapeze.",
      exemple: "Ex. : Un carre a 4 cotes egaux et 4 angles droits, un rectangle a 4 angles droits",
      astuce: "Carre = rectangle + losange (4 cotes egaux ET 4 angles droits)",
      ressources: [
        { type: "fiches", titre: "Proprietes des quadrilateres", url: "https://www.maths-et-tiques.fr/" }
      ],
      quizId: "QUIZ_6_QUADRILATERES"
    },
    {
      // COMPETENCE SIMPLE
      id: "6GE-FP-3",
      titre: "Le cercle",
      description: "Connaitre le vocabulaire du cercle : centre, rayon, diametre, corde, arc.",
      exemple: "Ex. : Le diametre mesure 2 fois le rayon, une corde relie 2 points du cercle",
      astuce: "Diametre = 2 × rayon, et le diametre est la plus grande corde du cercle",
      ressources: [
        { type: "jeu", titre: "Elements du cercle", url: "https://www.geogebra.org/" }
      ],
      quizId: "QUIZ_6_CERCLE"
    },
    {
      // COMPETENCE SIMPLE
      id: "6GE-FP-4",
      titre: "Construction de figures",
      description: "Utiliser les instruments de geometrie pour construire des figures planes precises.",
      exemple: "Ex. : Construire un triangle equilateral avec un compas et une regle",
      astuce: "Toujours tracer les traits de construction en pointilles et les laisser visibles",
      ressources: [
        { type: "video", titre: "Constructions geometriques", url: "https://www.youtube.com/watch?v=construction" }
      ],
      quizId: "QUIZ_6_CONSTRUCTION"
    }
  ]
};

// Assign to window for browser compatibility
window.data = data;
