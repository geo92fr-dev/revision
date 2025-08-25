// Nombres entiers naturels - 6ème
export const nombresEntiers6eme = {
  titre: "Nombres entiers naturels",
  niveau: "6ème",
  description: "Comprendre et manipuler les nombres entiers naturels",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur les nombres entiers",
    exercices: [
      {
        type: "qcm",
        question: "Qu'est-ce qu'un nombre entier naturel ?",
        options: [
          "Un nombre positif sans virgule",
          "Un nombre avec une virgule",
          "Un nombre négatif",
          "Une fraction"
        ],
        correct: 0,
        explication: "Les nombres entiers naturels sont les nombres positifs sans virgule : 0, 1, 2, 3, 4, 5..."
      },
      {
        type: "exercice",
        question: "Écris en chiffres : deux mille trois cent quarante-cinq",
        reponse: "2345",
        aide: "Décompose le nombre : 2000 + 300 + 40 + 5"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les propriétés des nombres entiers naturels",
    cours: {
      definition: "Les nombres entiers naturels sont les nombres que l'on utilise pour compter : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...",
      proprietes: [
        "Ils sont tous positifs ou nuls",
        "Ils n'ont pas de partie décimale",
        "Ils sont ordonnés : chaque nombre a un suivant",
        "On peut les représenter sur une demi-droite graduée"
      ],
      exemples: [
        "Nombres d'objets : 15 élèves, 24 cahiers",
        "Années : 2025, 1998, 476",
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
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer la lecture, l'écriture et la comparaison des nombres entiers",
    exercices: [
      {
        type: "exercice",
        question: "Écris en lettres le nombre 1 847",
        reponse: "mille huit cent quarante-sept",
        aide: "1000 = mille, 800 = huit cents, 40 = quarante, 7 = sept"
      },
      {
        type: "exercice",
        question: "Quel est le plus grand nombre que l'on peut écrire avec les chiffres 3, 7, 1, 9 ?",
        reponse: "9731",
        aide: "Pour avoir le plus grand nombre, place les chiffres dans l'ordre décroissant"
      },
      {
        type: "comparaison",
        question: "Compare avec <, > ou = : 1 256 ... 1 265",
        reponse: "<",
        aide: "Compare chiffre par chiffre en commençant par la gauche"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur la compréhension des nombres entiers",
    questions: [
      "Quelles stratégies utilises-tu pour comparer deux grands nombres ?",
      "Comment peux-tu vérifier que tu as bien écrit un nombre en lettres ?",
      "Dans quelles situations de la vie quotidienne utilises-tu les nombres entiers naturels ?",
      "Quelle est la différence entre un chiffre et un nombre ?",
      "Comment expliques-tu à un camarade la méthode pour ranger des nombres dans l'ordre ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais lire et écrire les nombres entiers en chiffres",
          "Je sais lire et écrire les nombres entiers en lettres",
          "Je sais comparer et ranger les nombres entiers",
          "Je comprends la valeur de chaque chiffre selon sa position"
        ]
      }
    ]
  }
};

// Export par défaut
export default nombresEntiers6eme;
