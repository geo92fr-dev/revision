// Les unités de masse et capacité - 6ème
export const unitesMasseCapacite6eme = {
  titre: "Les unités de masse et capacité",
  niveau: "6ème",
  description: "Connaître et utiliser les unités de masse et de capacité",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur les mesures de masse et capacité",
    exercices: [
      {
        type: "qcm",
        question: "Quelle unité utilises-tu pour mesurer ton poids ?",
        options: [
          "Le gramme",
          "Le kilogramme",
          "La tonne",
          "Le litre"
        ],
        correct: 1,
        explication: "Le kilogramme est l'unité utilisée pour mesurer le poids des personnes"
      },
      {
        type: "association",
        question: "Associe chaque objet à sa masse approximative",
        elements: {
          "Une pomme": "150 g",
          "Un éléphant": "5 tonnes", 
          "Un livre": "500 g",
          "Une voiture": "1 tonne"
        }
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les unités de masse et de capacité",
    cours: {
      masse: {
        unite_principale: "Le gramme (g) est l'unité principale de masse",
        echelle: {
          "t": "tonne = 1 000 000 g",
          "q": "quintal = 100 000 g",
          "kg": "kilogramme = 1 000 g",
          "hg": "hectogramme = 100 g",
          "dag": "décagramme = 10 g", 
          "g": "gramme = 1 g",
          "dg": "décigramme = 0,1 g",
          "cg": "centigramme = 0,01 g",
          "mg": "milligramme = 0,001 g"
        },
        conversions: "Chaque unité vaut 10 fois l'unité suivante",
        exemples: [
          "1 kg = 1000 g",
          "1 t = 1000 kg",
          "1 g = 1000 mg"
        ]
      },
      capacite: {
        unite_principale: "Le litre (L) est l'unité principale de capacité",
        echelle: {
          "kL": "kilolitre = 1000 L",
          "hL": "hectolitre = 100 L",
          "daL": "décalitre = 10 L",
          "L": "litre = 1 L",
          "dL": "décilitre = 0,1 L",
          "cL": "centilitre = 0,01 L",
          "mL": "millilitre = 0,001 L"
        },
        equivalence: "1 L = 1 dm³",
        exemples: [
          "1 L = 100 cL = 1000 mL",
          "Une canette = 33 cL",
          "Une bouteille = 1,5 L"
        ]
      }
    },
    exercices: [
      {
        type: "conversion",
        question: "Convertis 2,5 kg en g",
        reponse: "2500 g",
        aide: "2,5 kg = 2,5 × 1000 g = 2500 g"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer les conversions de masse et capacité",
    exercices: [
      {
        type: "conversion_masse",
        question: "Convertis 3,2 t en kg",
        reponse: "3200 kg",
        aide: "3,2 t = 3,2 × 1000 kg = 3200 kg"
      },
      {
        type: "conversion_masse",
        question: "Convertis 750 g en kg",
        reponse: "0,75 kg",
        aide: "750 g = 750 ÷ 1000 kg = 0,75 kg"
      },
      {
        type: "conversion_capacite",
        question: "Convertis 2,5 L en mL",
        reponse: "2500 mL",
        aide: "2,5 L = 2,5 × 1000 mL = 2500 mL"
      },
      {
        type: "conversion_capacite",
        question: "Convertis 250 cL en L",
        reponse: "2,5 L",
        aide: "250 cL = 250 ÷ 100 L = 2,5 L"
      },
      {
        type: "probleme",
        question: "Marie achète 500 g de pommes, 1,2 kg de poires et 800 g d'oranges. Quelle est la masse totale en kg ?",
        reponse: "2,5 kg",
        aide: "500 g + 1200 g + 800 g = 2500 g = 2,5 kg"
      },
      {
        type: "probleme",
        question: "Un réservoir contient 1,5 hL d'eau. On y ajoute 250 L. Quelle est la quantité totale en L ?",
        reponse: "400 L",
        aide: "1,5 hL = 150 L, donc 150 + 250 = 400 L"
      },
      {
        type: "choix_unite",
        question: "Quelle unité choisir pour : le poids d'un camion, la masse d'un médicament, la capacité d'une piscine ?",
        reponse: "tonnes, mg, kL ou m³",
        aide: "Adapte l'unité à la grandeur de ce que tu mesures"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur les unités de masse et capacité",
    questions: [
      "Comment différencies-tu la masse de la capacité ?",
      "Quelle stratégie utilises-tu pour choisir l'unité appropriée ?",
      "Comment évites-tu de confondre les conversions de masse et de capacité ?",
      "Dans quelles situations réelles utilises-tu ces mesures ?",
      "Pourquoi y a-t-il une relation entre le litre et le décimètre cube ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je distingue masse et capacité",
          "Je connais les principales unités de masse",
          "Je connais les principales unités de capacité",
          "Je sais convertir les unités de masse",
          "Je sais convertir les unités de capacité",
          "Je sais résoudre des problèmes concrets avec ces unités"
        ]
      }
    ]
  }
};

// Export par défaut
export default unitesMasseCapacite6eme;
