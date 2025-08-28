// Fractions simples - 6eme
const fractionssimples6eme = {
  titre: "Les fractions simples",
  niveau: "6eme",
  description: "Decouvrir et comprendre les fractions simples",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur le partage et les fractions",
    exercices: [
      {
        type: "qcm",
        question: "Si je partage une pizza en 4 parts egales et que j'en mange 1, quelle fraction ai-je mangee ?",
        options: [
          "1/4",
          "4/1", 
          "1/3",
          "3/4"
        ],
        correct: 0,
        explication: "J'ai mange 1 part sur 4, donc 1/4 de la pizza"
      },
      {
        type: "visuel",
        question: "Colorie 2/3 d'un rectangle divise en 3 parties egales",
        aide: "2/3 signifie 2 parties sur 3"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir les fractions et leur signification",
    cours: {
      definition: "Une fraction represente une ou plusieurs parties d'un tout partage en parts egales.",
      notation: {
        "Numerateur": "Le nombre du haut, indique combien de parts on prend",
        "Denominateur": "Le nombre du bas, indique en combien de parts on partage",
        "Barre de fraction": "Separe le numerateur du denominateur"
      },
      exemples: [
        "3/4 : on partage en 4 parts egales et on prend 3 parts",
        "1/2 : c'est la moitie",
        "1/4 : c'est le quart",
        "1/3 : c'est le tiers"
      ],
      vocabulaire: {
        "Fraction egale a 1": "Le numerateur = denominateur (ex: 3/3 = 1)",
        "Fraction inferieure a 1": "Le numerateur < denominateur (ex: 2/5)",
        "Fraction superieure a 1": "Le numerateur > denominateur (ex: 7/3)"
      }
    },
    exercices: [
      {
        type: "representation",
        question: "Dessine 3/5 d'un cercle",
        aide: "Divise le cercle en 5 parts egales et colorie 3 parts"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer la lecture et l'ecriture des fractions simples",
    exercices: [
      {
        type: "lecture",
        question: "Lis la fraction representee : [dessin de 5 parts dont 2 coloriees sur 7]",
        reponse: "2/7",
        aide: "Compte les parts coloriees (numerateur) et le total de parts (denominateur)"
      },
      {
        type: "comparaison",
        question: "Compare avec <, > ou = : 1/2 ... 2/4",
        reponse: "=",
        aide: "1/2 et 2/4 representent la meme quantite (la moitie)"
      },
      {
        type: "exercice",
        question: "Dans une classe de 24 eleves, 1/3 sont des garcons. Combien y a-t-il de garcons ?",
        reponse: "8 garcons",
        aide: "1/3 de 24 = 24 ÷ 3 = 8"
      },
      {
        type: "placement",
        question: "Place sur une droite graduee : 1/4, 1/2, 3/4",
        aide: "Divise le segment [0;1] en 4 parts egales"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur les fractions",
    questions: [
      "Comment fais-tu pour visualiser une fraction dans ta tete ?",
      "Quelle strategie utilises-tu pour comparer deux fractions simples ?",
      "Dans quelles situations de la vie quotidienne rencontres-tu des fractions ?",
      "Comment expliques-tu a un camarade ce que represente le numerateur et le denominateur ?",
      "Pourquoi est-il important que les parts soient egales quand on partage ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais lire une fraction simple",
          "Je sais representer une fraction avec un dessin",
          "Je comprends le sens du numerateur et du denominateur", 
          "Je sais comparer des fractions simples",
          "Je sais resoudre des problemes simples avec des fractions"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = fractionssimples6eme;
