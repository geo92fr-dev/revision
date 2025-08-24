// Symétrie axiale - 6ème
export const symetrieAxiale6eme = {
  titre: "Symétrie axiale",
  niveau: "6ème",
  description: "Comprendre et construire des figures par symétrie axiale",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur la symétrie",
    exercices: [
      {
        type: "qcm",
        question: "Qu'est-ce qu'un axe de symétrie ?",
        options: [
          "Une ligne qui partage une figure en deux parties identiques",
          "Une ligne courbe",
          "Un point au centre d'une figure",
          "Le contour d'une figure"
        ],
        correct: 0,
        explication: "Un axe de symétrie partage une figure en deux parties qui se superposent parfaitement par pliage"
      },
      {
        type: "reconnaissance",
        question: "Parmi ces figures, lesquelles ont un axe de symétrie : carré, triangle quelconque, cercle, rectangle ?",
        reponse: "carré, cercle, rectangle",
        aide: "Imagine que tu plies la figure : les deux parties doivent se superposer exactement"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les propriétés de la symétrie axiale",
    cours: {
      definition: "Deux figures sont symétriques par rapport à une droite (axe de symétrie) si elles se superposent parfaitement par pliage le long de cette droite.",
      proprietes: [
        "La symétrie conserve les distances",
        "La symétrie conserve les angles", 
        "La symétrie transforme une droite en une droite",
        "L'axe de symétrie est la médiatrice du segment qui joint un point à son symétrique"
      ],
      construction: [
        "Tracer la perpendiculaire à l'axe passant par le point",
        "Reporter la distance du point à l'axe de l'autre côté",
        "Le point symétrique est à égale distance de l'axe"
      ],
      exemples: [
        "Lettres ayant un axe de symétrie : A, B, C, D, H, I, M, O, T, U, V, W, X, Y",
        "Figures géométriques : carré (4 axes), rectangle (2 axes), cercle (infinité d'axes)"
      ]
    },
    exercices: [
      {
        type: "construction",
        question: "Construis le symétrique du triangle ABC par rapport à la droite d",
        aide: "Construis le symétrique de chaque sommet, puis relie les points"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraîne", 
    objectif: "Pratiquer la construction de symétriques et l'identification d'axes",
    exercices: [
      {
        type: "construction",
        question: "Construis le symétrique du point M par rapport à la droite (d)",
        etapes: [
          "Trace la perpendiculaire à (d) passant par M",
          "Mesure la distance de M à (d)",
          "Reporte cette distance de l'autre côté de (d)",
          "Place le point M'"
        ]
      },
      {
        type: "reconnaissance",
        question: "Trouve tous les axes de symétrie d'un hexagone régulier",
        reponse: "6 axes de symétrie",
        aide: "Un hexagone régulier a 6 axes : 3 passant par les sommets opposés et 3 passant par les milieux des côtés opposés"
      },
      {
        type: "verification",
        question: "Les points A(2;3) et B(6;3) sont-ils symétriques par rapport à la droite d'équation x = 4 ?",
        reponse: "Oui",
        aide: "Vérifie que la droite x = 4 est bien la médiatrice du segment [AB]"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur la symétrie axiale",
    questions: [
      "Quelle méthode utilises-tu pour vérifier qu'une construction est correcte ?",
      "Comment expliques-tu à un camarade comment construire un symétrique ?",
      "Dans quels objets du quotidien observes-tu des symétries ?",
      "Pourquoi la symétrie est-elle importante en architecture et dans l'art ?",
      "Comment reconnais-tu rapidement si une figure a un axe de symétrie ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais reconnaître si une figure a un axe de symétrie",
          "Je sais construire le symétrique d'un point par rapport à une droite",
          "Je sais construire le symétrique d'une figure simple",
          "Je comprends les propriétés de la symétrie axiale",
          "Je sais utiliser les instruments de géométrie pour construire des symétriques"
        ]
      }
    ]
  }
};

// Export par défaut
export default symetrieAxiale6eme;
