// Les unites de masse et capacite - 6eme
const unitesMasseCapacite6eme = {
  titre: "Les unites de masse et capacite",
  niveau: "6eme",
  description: "Connaitre et utiliser les unites de masse et de capacite",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur les mesures de masse et capacite",
    exercices: [
      {
        type: "qcm",
        question: "Quelle unite utilises-tu pour mesurer ton poids ?",
        options: [
          "Le gramme",
          "Le kilogramme",
          "La tonne",
          "Le litre"
        ],
        correct: 1,
        explication: "Le kilogramme est l'unite utilisee pour mesurer le poids des personnes"
      },
      {
        type: "association",
        question: "Associe chaque objet a sa masse approximative",
        elements: {
          "Une pomme": "150 g",
          "Un elephant": "5 tonnes", 
          "Un livre": "500 g",
          "Une voiture": "1 tonne"
        }
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir les unites de masse et de capacite",
    cours: {
      masse: {
        unite_principale: "Le gramme (g) est l'unite principale de masse",
        echelle: {
          "t": "tonne = 1 000 000 g",
          "q": "quintal = 100 000 g",
          "kg": "kilogramme = 1 000 g",
          "hg": "hectogramme = 100 g",
          "dag": "decagramme = 10 g", 
          "g": "gramme = 1 g",
          "dg": "decigramme = 0,1 g",
          "cg": "centigramme = 0,01 g",
          "mg": "milligramme = 0,001 g"
        },
        conversions: "Chaque unite vaut 10 fois l'unite suivante",
        exemples: [
          "1 kg = 1000 g",
          "1 t = 1000 kg",
          "1 g = 1000 mg"
        ]
      },
      capacite: {
        unite_principale: "Le litre (L) est l'unite principale de capacite",
        echelle: {
          "kL": "kilolitre = 1000 L",
          "hL": "hectolitre = 100 L",
          "daL": "decalitre = 10 L",
          "L": "litre = 1 L",
          "dL": "decilitre = 0,1 L",
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
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer les conversions de masse et capacite",
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
        question: "Marie achete 500 g de pommes, 1,2 kg de poires et 800 g d'oranges. Quelle est la masse totale en kg ?",
        reponse: "2,5 kg",
        aide: "500 g + 1200 g + 800 g = 2500 g = 2,5 kg"
      },
      {
        type: "probleme",
        question: "Un reservoir contient 1,5 hL d'eau. On y ajoute 250 L. Quelle est la quantite totale en L ?",
        reponse: "400 L",
        aide: "1,5 hL = 150 L, donc 150 + 250 = 400 L"
      },
      {
        type: "choix_unite",
        question: "Quelle unite choisir pour : le poids d'un camion, la masse d'un medicament, la capacite d'une piscine ?",
        reponse: "tonnes, mg, kL ou m³",
        aide: "Adapte l'unite a la grandeur de ce que tu mesures"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur les unites de masse et capacite",
    questions: [
      "Comment differencies-tu la masse de la capacite ?",
      "Quelle strategie utilises-tu pour choisir l'unite appropriee ?",
      "Comment evites-tu de confondre les conversions de masse et de capacite ?",
      "Dans quelles situations reelles utilises-tu ces mesures ?",
      "Pourquoi y a-t-il une relation entre le litre et le decimetre cube ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je distingue masse et capacite",
          "Je connais les principales unites de masse",
          "Je connais les principales unites de capacite",
          "Je sais convertir les unites de masse",
          "Je sais convertir les unites de capacite",
          "Je sais resoudre des problemes concrets avec ces unites"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = unitesMasseCapacite6eme;
