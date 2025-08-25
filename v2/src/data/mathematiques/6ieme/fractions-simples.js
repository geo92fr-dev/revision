// Fractions simples - 6ème
export const fractionsSimples6eme = {
  titre: "Les fractions simples",
  niveau: "6ème",
  description: "Découvrir et comprendre les fractions simples",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur le partage et les fractions",
    exercices: [
      {
        type: "qcm",
        question: "Si je partage une pizza en 4 parts égales et que j'en mange 1, quelle fraction ai-je mangée ?",
        options: [
          "1/4",
          "4/1", 
          "1/3",
          "3/4"
        ],
        correct: 0,
        explication: "J'ai mangé 1 part sur 4, donc 1/4 de la pizza"
      },
      {
        type: "visuel",
        question: "Colorie 2/3 d'un rectangle divisé en 3 parties égales",
        aide: "2/3 signifie 2 parties sur 3"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les fractions et leur signification",
    cours: {
      definition: "Une fraction représente une ou plusieurs parties d'un tout partagé en parts égales.",
      notation: {
        "Numérateur": "Le nombre du haut, indique combien de parts on prend",
        "Dénominateur": "Le nombre du bas, indique en combien de parts on partage",
        "Barre de fraction": "Sépare le numérateur du dénominateur"
      },
      exemples: [
        "3/4 : on partage en 4 parts égales et on prend 3 parts",
        "1/2 : c'est la moitié",
        "1/4 : c'est le quart",
        "1/3 : c'est le tiers"
      ],
      vocabulaire: {
        "Fraction égale à 1": "Le numérateur = dénominateur (ex: 3/3 = 1)",
        "Fraction inférieure à 1": "Le numérateur < dénominateur (ex: 2/5)",
        "Fraction supérieure à 1": "Le numérateur > dénominateur (ex: 7/3)"
      }
    },
    exercices: [
      {
        type: "representation",
        question: "Dessine 3/5 d'un cercle",
        aide: "Divise le cercle en 5 parts égales et colorie 3 parts"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer la lecture et l'écriture des fractions simples",
    exercices: [
      {
        type: "lecture",
        question: "Lis la fraction représentée : [dessin de 5 parts dont 2 coloriées sur 7]",
        reponse: "2/7",
        aide: "Compte les parts coloriées (numérateur) et le total de parts (dénominateur)"
      },
      {
        type: "comparaison",
        question: "Compare avec <, > ou = : 1/2 ... 2/4",
        reponse: "=",
        aide: "1/2 et 2/4 représentent la même quantité (la moitié)"
      },
      {
        type: "exercice",
        question: "Dans une classe de 24 élèves, 1/3 sont des garçons. Combien y a-t-il de garçons ?",
        reponse: "8 garçons",
        aide: "1/3 de 24 = 24 ÷ 3 = 8"
      },
      {
        type: "placement",
        question: "Place sur une droite graduée : 1/4, 1/2, 3/4",
        aide: "Divise le segment [0;1] en 4 parts égales"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur les fractions",
    questions: [
      "Comment fais-tu pour visualiser une fraction dans ta tête ?",
      "Quelle stratégie utilises-tu pour comparer deux fractions simples ?",
      "Dans quelles situations de la vie quotidienne rencontres-tu des fractions ?",
      "Comment expliques-tu à un camarade ce que représente le numérateur et le dénominateur ?",
      "Pourquoi est-il important que les parts soient égales quand on partage ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais lire une fraction simple",
          "Je sais représenter une fraction avec un dessin",
          "Je comprends le sens du numérateur et du dénominateur", 
          "Je sais comparer des fractions simples",
          "Je sais résoudre des problèmes simples avec des fractions"
        ]
      }
    ]
  }
};

// Export par défaut
export default fractionsSimples6eme;
