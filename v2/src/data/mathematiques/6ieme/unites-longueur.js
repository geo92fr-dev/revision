// Les unités de longueur - 6ème
export const unitesLongueur6eme = {
  titre: "Les unités de longueur",
  niveau: "6ème",
  description: "Connaître et utiliser les unités de longueur et leurs conversions",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur les mesures de longueur",
    exercices: [
      {
        type: "qcm",
        question: "Quelle unité utilises-tu pour mesurer la longueur de ta règle ?",
        options: [
          "Le mètre",
          "Le centimètre", 
          "Le kilomètre",
          "Le millimètre"
        ],
        correct: 1,
        explication: "Pour mesurer des objets de la taille d'une règle, le centimètre est l'unité la plus adaptée"
      },
      {
        type: "estimation",
        question: "Estime puis mesure : la largeur de ton cahier, la hauteur de ta table, la longueur du tableau",
        aide: "Compare avec des objets dont tu connais la taille"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les unités de longueur et leurs relations",
    cours: {
      unite_principale: "Le mètre (m) est l'unité principale de longueur",
      echelle: {
        "km": "kilomètre = 1000 m",
        "hm": "hectomètre = 100 m", 
        "dam": "décamètre = 10 m",
        "m": "mètre = 1 m",
        "dm": "décimètre = 0,1 m",
        "cm": "centimètre = 0,01 m",
        "mm": "millimètre = 0,001 m"
      },
      conversions: {
        "Pour passer à l'unité suivante": "× 10",
        "Pour passer à l'unité précédente": "÷ 10",
        "Exemples": [
          "1 m = 10 dm = 100 cm = 1000 mm",
          "1 km = 1000 m",
          "1 cm = 10 mm"
        ]
      },
      tableau_conversion: "km | hm | dam | m | dm | cm | mm",
      utilisations: {
        "mm": "Épaisseur d'une feuille, diamètre d'un clou",
        "cm": "Longueur d'une règle, hauteur d'un livre",
        "m": "Hauteur d'une personne, longueur d'une voiture",
        "km": "Distance entre deux villes"
      }
    },
    exercices: [
      {
        type: "conversion",
        question: "Convertis 5 m en cm",
        reponse: "500 cm",
        aide: "5 m = 5 × 100 cm = 500 cm"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer les conversions et l'utilisation des unités de longueur",
    exercices: [
      {
        type: "conversion",
        question: "Convertis 3,5 km en m",
        reponse: "3500 m",
        aide: "3,5 km = 3,5 × 1000 m = 3500 m"
      },
      {
        type: "conversion",
        question: "Convertis 250 cm en m",
        reponse: "2,5 m",
        aide: "250 cm = 250 ÷ 100 m = 2,5 m"
      },
      {
        type: "conversion",
        question: "Convertis 1,2 m en mm",
        reponse: "1200 mm",
        aide: "1,2 m = 1,2 × 1000 mm = 1200 mm"
      },
      {
        type: "probleme",
        question: "Paul mesure 1 m 65 cm. Quelle est sa taille en cm ? en mm ?",
        reponse: "165 cm et 1650 mm",
        aide: "1 m 65 cm = 100 cm + 65 cm = 165 cm = 1650 mm"
      },
      {
        type: "choix_unite",
        question: "Quelle unité choisir pour exprimer : la distance Paris-Lyon, l'épaisseur d'un cheveu, la longueur d'un terrain de football ?",
        reponse: "km, µm (ou mm), m",
        aide: "Choisis l'unité la plus adaptée à la grandeur mesurée"
      },
      {
        type: "calcul",
        question: "Un rectangle a une longueur de 12 cm et une largeur de 8,5 cm. Quel est son périmètre en mm ?",
        reponse: "410 mm",
        aide: "Périmètre = 2 × (12 + 8,5) = 41 cm = 410 mm"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur les unités de longueur",
    questions: [
      "Comment choisis-tu l'unité la plus appropriée selon ce que tu mesures ?",
      "Quelle méthode utilises-tu pour éviter les erreurs de conversion ?",
      "Comment expliques-tu à un camarade la relation entre les différentes unités ?",
      "Dans quelles situations de la vie quotidienne utilises-tu ces conversions ?",
      "Pourquoi est-il important d'avoir un système d'unités cohérent ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je connais les principales unités de longueur",
          "Je sais convertir d'une unité à l'autre",
          "Je sais choisir l'unité appropriée selon la situation",
          "Je sais utiliser le tableau de conversion",
          "Je sais résoudre des problèmes impliquant des mesures de longueur"
        ]
      }
    ]
  }
};

// Export par défaut
export default unitesLongueur6eme;
