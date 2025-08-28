// Aires des figures - 6eme
const data = {
  titre: "Aires des figures",
  niveau: "6eme", 
  description: "Calculer les aires des figures planes simples",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur les aires",
    exercices: [
      {
        type: "qcm",
        question: "Qu'est-ce que l'aire d'une figure ?",
        options: [
          "Son contour",
          "La surface qu'elle occupe",
          "Sa longueur",
          "Sa hauteur"
        ],
        correct: 1,
        explication: "L'aire est la mesure de la surface occupee par une figure"
      },
      {
        type: "estimation",
        question: "Combien de carreaux de 1 cm² couvre approximativement la surface de ta main ?",
        aide: "Compare avec des objets dont tu connais la taille"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir les formules d'aires des figures usuelles",
    cours: {
      definition: "L'aire d'une figure est la mesure de sa surface. Elle s'exprime en unites d'aire : cm², m², km²...",
      unites: {
        "mm²": "millimetre carre",
        "cm²": "centimetre carre", 
        "dm²": "decimetre carre",
        "m²": "metre carre",
        "dam²": "decametre carre (are)",
        "hm²": "hectometre carre (hectare)",
        "km²": "kilometre carre"
      },
      formules: {
        "Carre": "Aire = cote × cote = c²",
        "Rectangle": "Aire = longueur × largeur = L × l",
        "Triangle": "Aire = (base × hauteur) ÷ 2 = (b × h) ÷ 2",
        "Disque": "Aire = π × rayon² = π × r²"
      },
      conversions: [
        "1 m² = 100 dm² = 10 000 cm²",
        "1 dm² = 100 cm² = 10 000 mm²",
        "Pour convertir, on multiplie ou divise par 100"
      ]
    },
    exercices: [
      {
        type: "application",
        question: "Calcule l'aire d'un rectangle de longueur 8 cm et largeur 5 cm",
        reponse: "40 cm²",
        aide: "Aire = L × l = 8 × 5"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer le calcul d'aires et les conversions d'unites",
    exercices: [
      {
        type: "calcul",
        question: "Un carre a un cote de 7 cm. Quelle est son aire ?",
        reponse: "49 cm²",
        aide: "Aire du carre = cote² = 7² = 7 × 7"
      },
      {
        type: "calcul",
        question: "Un triangle a une base de 12 cm et une hauteur de 8 cm. Quelle est son aire ?",
        reponse: "48 cm²",
        aide: "Aire = (base × hauteur) ÷ 2 = (12 × 8) ÷ 2"
      },
      {
        type: "conversion",
        question: "Convertis 3,5 m² en cm²",
        reponse: "35 000 cm²",
        aide: "1 m² = 10 000 cm², donc 3,5 m² = 3,5 × 10 000 cm²"
      },
      {
        type: "probleme",
        question: "Un terrain rectangulaire mesure 25 m sur 18 m. Quelle est son aire en m² et en ares ?",
        reponse: "450 m² = 4,5 ares",
        aide: "Aire = 25 × 18 = 450 m². 1 are = 100 m²"
      },
      {
        type: "composition", 
        question: "Une figure est composee d'un carre de 6 cm de cote et d'un triangle de base 6 cm et hauteur 4 cm. Quelle est son aire totale ?",
        reponse: "48 cm²",
        aide: "Aire carre + Aire triangle = 6² + (6×4)÷2 = 36 + 12"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur le calcul d'aires",
    questions: [
      "Comment choisis-tu la bonne formule selon la figure ?",
      "Quelle strategie utilises-tu pour les figures composees ?",
      "Comment verifies-tu que ton resultat est coherent ?",
      "Dans quelles situations reelles as-tu besoin de calculer des aires ?",
      "Pourquoi est-il important de bien identifier la base et la hauteur d'un triangle ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais calculer l'aire d'un carre et d'un rectangle",
          "Je sais calculer l'aire d'un triangle",
          "Je sais convertir les unites d'aire",
          "Je sais decomposer une figure complexe en figures simples",
          "Je sais resoudre des problemes concrets impliquant des aires"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = data;
