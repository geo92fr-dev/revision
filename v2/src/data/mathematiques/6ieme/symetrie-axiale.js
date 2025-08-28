// Symetrie axiale - 6eme
const symetrieaxiale6eme = {
  titre: "Symetrie axiale",
  niveau: "6eme",
  description: "Comprendre et construire des figures par symetrie axiale",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur la symetrie",
    exercices: [
      {
        type: "qcm",
        question: "Qu'est-ce qu'un axe de symetrie ?",
        options: [
          "Une ligne qui partage une figure en deux parties identiques",
          "Une ligne courbe",
          "Un point au centre d'une figure",
          "Le contour d'une figure"
        ],
        correct: 0,
        explication: "Un axe de symetrie partage une figure en deux parties qui se superposent parfaitement par pliage"
      },
      {
        type: "reconnaissance",
        question: "Parmi ces figures, lesquelles ont un axe de symetrie : carre, triangle quelconque, cercle, rectangle ?",
        reponse: "carre, cercle, rectangle",
        aide: "Imagine que tu plies la figure : les deux parties doivent se superposer exactement"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir les proprietes de la symetrie axiale",
    cours: {
      definition: "Deux figures sont symetriques par rapport a une droite (axe de symetrie) si elles se superposent parfaitement par pliage le long de cette droite.",
      proprietes: [
        "La symetrie conserve les distances",
        "La symetrie conserve les angles", 
        "La symetrie transforme une droite en une droite",
        "L'axe de symetrie est la mediatrice du segment qui joint un point a son symetrique"
      ],
      construction: [
        "Tracer la perpendiculaire a l'axe passant par le point",
        "Reporter la distance du point a l'axe de l'autre cote",
        "Le point symetrique est a egale distance de l'axe"
      ],
      exemples: [
        "Lettres ayant un axe de symetrie : A, B, C, D, H, I, M, O, T, U, V, W, X, Y",
        "Figures geometriques : carre (4 axes), rectangle (2 axes), cercle (infinite d'axes)"
      ]
    },
    exercices: [
      {
        type: "construction",
        question: "Construis le symetrique du triangle ABC par rapport a la droite d",
        aide: "Construis le symetrique de chaque sommet, puis relie les points"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraine", 
    objectif: "Pratiquer la construction de symetriques et l'identification d'axes",
    exercices: [
      {
        type: "construction",
        question: "Construis le symetrique du point M par rapport a la droite (d)",
        etapes: [
          "Trace la perpendiculaire a (d) passant par M",
          "Mesure la distance de M a (d)",
          "Reporte cette distance de l'autre cote de (d)",
          "Place le point M'"
        ]
      },
      {
        type: "reconnaissance",
        question: "Trouve tous les axes de symetrie d'un hexagone regulier",
        reponse: "6 axes de symetrie",
        aide: "Un hexagone regulier a 6 axes : 3 passant par les sommets opposes et 3 passant par les milieux des cotes opposes"
      },
      {
        type: "verification",
        question: "Les points A(2;3) et B(6;3) sont-ils symetriques par rapport a la droite d'equation x = 4 ?",
        reponse: "Oui",
        aide: "Verifie que la droite x = 4 est bien la mediatrice du segment [AB]"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur la symetrie axiale",
    questions: [
      "Quelle methode utilises-tu pour verifier qu'une construction est correcte ?",
      "Comment expliques-tu a un camarade comment construire un symetrique ?",
      "Dans quels objets du quotidien observes-tu des symetries ?",
      "Pourquoi la symetrie est-elle importante en architecture et dans l'art ?",
      "Comment reconnais-tu rapidement si une figure a un axe de symetrie ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais reconnaitre si une figure a un axe de symetrie",
          "Je sais construire le symetrique d'un point par rapport a une droite",
          "Je sais construire le symetrique d'une figure simple",
          "Je comprends les proprietes de la symetrie axiale",
          "Je sais utiliser les instruments de geometrie pour construire des symetriques"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = symetrieaxiale6eme;
