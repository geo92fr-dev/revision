// Nombres décimaux - 6ème
export const nombresDecimaux6eme = {
  titre: "Nombres décimaux",
  niveau: "6ème",
  description: "Comprendre et manipuler les nombres décimaux",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur les nombres décimaux",
    exercices: [
      {
        type: "qcm",
        question: "Dans le nombre 12,45, que représente le chiffre 4 ?",
        options: [
          "4 unités",
          "4 dixièmes",
          "4 centièmes",
          "4 millièmes"
        ],
        correct: 1,
        explication: "Le chiffre 4 est dans la position des dixièmes, il représente donc 4 dixièmes"
      },
      {
        type: "exercice",
        question: "Écris sous forme décimale : 3 + 0,2 + 0,07",
        reponse: "3,27",
        aide: "Additionne les parties entières et décimales séparément"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les nombres décimaux et leur écriture",
    cours: {
      definition: "Un nombre décimal est un nombre qui peut s'écrire avec une virgule. Il est composé d'une partie entière et d'une partie décimale.",
      structure: {
        "Partie entière": "À gauche de la virgule",
        "Partie décimale": "À droite de la virgule",
        "Dixièmes": "1er chiffre après la virgule",
        "Centièmes": "2ème chiffre après la virgule",
        "Millièmes": "3ème chiffre après la virgule"
      },
      exemples: [
        "12,5 = 12 + 5 dixièmes",
        "0,75 = 7 dixièmes + 5 centièmes",
        "3,146 = 3 + 1 dixième + 4 centièmes + 6 millièmes"
      ]
    },
    exercices: [
      {
        type: "decomposition",
        question: "Décompose le nombre 15,37",
        reponse: "15,37 = 1 × 10 + 5 × 1 + 3 × 0,1 + 7 × 0,01",
        aide: "Identifie la valeur de chaque chiffre selon sa position"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer l'écriture et la comparaison des nombres décimaux",
    exercices: [
      {
        type: "exercice",
        question: "Écris en chiffres : douze unités et vingt-trois centièmes",
        reponse: "12,23",
        aide: "12 unités + 23 centièmes = 12 + 0,23"
      },
      {
        type: "comparaison",
        question: "Compare avec <, > ou = : 5,7 ... 5,70",
        reponse: "=",
        aide: "5,7 = 5,70 car ajouter des zéros à droite ne change pas la valeur"
      },
      {
        type: "exercice",
        question: "Range dans l'ordre croissant : 2,15 ; 2,5 ; 2,051 ; 2,1",
        reponse: "2,051 < 2,1 < 2,15 < 2,5",
        aide: "Compare d'abord les unités, puis les dixièmes, puis les centièmes..."
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur les nombres décimaux",
    questions: [
      "Quelle méthode utilises-tu pour comparer deux nombres décimaux ?",
      "Comment expliques-tu que 2,5 et 2,50 sont égaux ?",
      "Dans quelles situations utilises-tu les nombres décimaux au quotidien ?",
      "Pourquoi est-il important de bien aligner les virgules lors des calculs ?",
      "Comment fais-tu pour ne pas confondre dixièmes et centièmes ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais lire et écrire les nombres décimaux",
          "Je comprends la valeur de chaque chiffre après la virgule",
          "Je sais comparer et ranger les nombres décimaux",
          "Je sais passer de l'écriture décimale à la décomposition et inversement"
        ]
      }
    ]
  }
};

// Export par défaut
export default nombresDecimaux6eme;
