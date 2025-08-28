// Nombres decimaux - 6eme
const nombresdecimaux6eme = {
  titre: "Nombres decimaux",
  niveau: "6eme",
  description: "Comprendre et manipuler les nombres decimaux",
  
  phase1: {
  titre: "Que sais-je deja ?",
  objectif: "Activer les connaissances prealables sur les nombres decimaux",
    exercices: [
      {
        type: "qcm",
  question: "Dans le nombre 12,45, que represente le chiffre 4 ?",
        options: [
          "4 unites",
          "4 dixiemes",
          "4 centiemes",
          "4 milliemes"
        ],
        correct: 1,
  explication: "Le chiffre 4 est dans la position des dixiemes, il represente donc 4 dixiemes"
      },
      {
        type: "exercice",
  question: "Ecris sous forme decimale : 3 + 0,2 + 0,07",
  reponse: "3,27",
  aide: "Additionne les parties entieres et decimales separement"
      }
    ]
  },
  
  phase2: {
  titre: "J'apprends",
  objectif: "Decouvrir les nombres decimaux et leur ecriture",
    cours: {
  definition: "Un nombre decimal est un nombre qui peut s'ecrire avec une virgule. Il est compose d'une partie entiere et d'une partie decimale.",
      structure: {
  "Partie entiere": "A gauche de la virgule",
  "Partie decimale": "A droite de la virgule",
  "Dixiemes": "1er chiffre apres la virgule",
  "Centiemes": "2eme chiffre apres la virgule",
  "Milliemes": "3eme chiffre apres la virgule"
      },
      exemples: [
  "12,5 = 12 + 5 dixiemes",
  "0,75 = 7 dixiemes + 5 centiemes",
  "3,146 = 3 + 1 dixieme + 4 centiemes + 6 milliemes"
      ]
    },
    exercices: [
      {
        type: "decomposition",
  question: "Decompose le nombre 15,37",
  reponse: "15,37 = 1 x 10 + 5 x 1 + 3 x 0,1 + 7 x 0,01",
  aide: "Identifie la valeur de chaque chiffre selon sa position"
      }
    ]
  },
  
  phase3: {
  titre: "Je m'entraine",
  objectif: "Pratiquer l'ecriture et la comparaison des nombres decimaux",
    exercices: [
      {
        type: "exercice",
  question: "Ecris en chiffres : douze unites et vingt-trois centiemes",
  reponse: "12,23",
  aide: "12 unites + 23 centiemes = 12 + 0,23"
      },
      {
        type: "comparaison",
        question: "Compare avec <, > ou = : 5,7 ... 5,70",
        reponse: "=",
  aide: "5,7 = 5,70 car ajouter des zeros a droite ne change pas la valeur"
      },
      {
        type: "exercice",
  question: "Range dans l'ordre croissant : 2,15 ; 2,5 ; 2,051 ; 2,1",
  reponse: "2,051 < 2,1 < 2,15 < 2,5",
  aide: "Compare d'abord les unites, puis les dixiemes, puis les centiemes..."
      }
    ]
  },
  
  phase4: {
  titre: "Je reflechis sur mes apprentissages",
  objectif: "Developper une reflexion metacognitive sur les nombres decimaux",
    questions: [
  "Quelle methode utilises-tu pour comparer deux nombres decimaux ?",
  "Comment expliques-tu que 2,5 et 2,50 sont egaux ?",
  "Dans quelles situations utilises-tu les nombres decimaux au quotidien ?",
  "Pourquoi est-il important de bien aligner les virgules lors des calculs ?",
  "Comment fais-tu pour ne pas confondre dixiemes et centiemes ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais lire et ecrire les nombres decimaux",
          "Je comprends la valeur de chaque chiffre apres la virgule",
          "Je sais comparer et ranger les nombres decimaux",
          "Je sais passer de l'ecriture decimale a la decomposition et inversement"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = nombresdecimaux6eme;
