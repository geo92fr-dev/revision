// Nombres entiers naturels - 6eme
const data = {
  titre: "Nombres entiers naturels",
  niveau: "6eme",
  description: "Comprendre et manipuler les nombres entiers naturels",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur les nombres entiers",
    exercices: [
      {
        type: "qcm",
        question: "Qu'est-ce qu'un nombre entier naturel ?",
        options: [
          "Un nombre positif sans virgule",
          "Un nombre avec une virgule",
          "Un nombre negatif",
          "Une fraction"
        ],
        correct: 0,
        explication: "Les nombres entiers naturels sont les nombres positifs sans virgule : 0, 1, 2, 3, 4, 5..."
      },
      {
        type: "exercice",
        question: "Ecris en chiffres : deux mille trois cent quarante-cinq",
        reponse: "2345",
        aide: "Decompose le nombre : 2000 + 300 + 40 + 5"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir les proprietes des nombres entiers naturels",
    cours: {
      definition: "Les nombres entiers naturels sont les nombres que l'on utilise pour compter : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...",
      proprietes: [
        "Ils sont tous positifs ou nuls",
        "Ils n'ont pas de partie decimale",
        "Ils sont ordonnes : chaque nombre a un suivant",
        "On peut les representer sur une demi-droite graduee"
      ],
      exemples: [
        "Nombres d'objets : 15 eleves, 24 cahiers",
        "Annees : 2025, 1998, 476",
        "Distances en km : 150 km, 3 km"
      ]
    },
    exercices: [
      {
        type: "classement",
        question: "Range ces nombres dans l'ordre croissant : 156, 98, 205, 89, 156",
        elements: ["156", "98", "205", "89", "156"],
        ordre: ["89", "98", "156", "156", "205"]
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer la lecture, l'ecriture et la comparaison des nombres entiers",
    exercices: [
      {
        type: "exercice",
        question: "Ecris en lettres le nombre 1 847",
        reponse: "mille huit cent quarante-sept",
        aide: "1000 = mille, 800 = huit cents, 40 = quarante, 7 = sept"
      },
      {
        type: "exercice",
        question: "Quel est le plus grand nombre que l'on peut ecrire avec les chiffres 3, 7, 1, 9 ?",
        reponse: "9731",
        aide: "Pour avoir le plus grand nombre, place les chiffres dans l'ordre decroissant"
      },
      {
        type: "comparaison",
        question: "Compare avec <, > ou = : 1 256 ... 1 265",
        reponse: "<",
        aide: "Compare chiffre par chiffre en commencant par la gauche"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur la comprehension des nombres entiers",
    questions: [
      "Quelles strategies utilises-tu pour comparer deux grands nombres ?",
      "Comment peux-tu verifier que tu as bien ecrit un nombre en lettres ?",
      "Dans quelles situations de la vie quotidienne utilises-tu les nombres entiers naturels ?",
      "Quelle est la difference entre un chiffre et un nombre ?",
      "Comment expliques-tu a un camarade la methode pour ranger des nombres dans l'ordre ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais lire et ecrire les nombres entiers en chiffres",
          "Je sais lire et ecrire les nombres entiers en lettres",
          "Je sais comparer et ranger les nombres entiers",
          "Je comprends la valeur de chaque chiffre selon sa position"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = data;
