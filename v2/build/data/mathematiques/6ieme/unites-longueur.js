// Les unites de longueur - 6eme
const uniteslongueur6eme = {
  titre: "Les unites de longueur",
  niveau: "6eme",
  description: "Connaitre et utiliser les unites de longueur et leurs conversions",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur les mesures de longueur",
    exercices: [
      {
        type: "qcm",
        question: "Quelle unite utilises-tu pour mesurer la longueur de ta regle ?",
        options: [
          "Le metre",
          "Le centimetre", 
          "Le kilometre",
          "Le millimetre"
        ],
        correct: 1,
        explication: "Pour mesurer des objets de la taille d'une regle, le centimetre est l'unite la plus adaptee"
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
    objectif: "Decouvrir les unites de longueur et leurs relations",
    cours: {
      unite_principale: "Le metre (m) est l'unite principale de longueur",
      echelle: {
        "km": "kilometre = 1000 m",
        "hm": "hectometre = 100 m", 
        "dam": "decametre = 10 m",
        "m": "metre = 1 m",
        "dm": "decimetre = 0,1 m",
        "cm": "centimetre = 0,01 m",
        "mm": "millimetre = 0,001 m"
      },
      conversions: {
        "Pour passer a l'unite suivante": "× 10",
        "Pour passer a l'unite precedente": "÷ 10",
        "Exemples": [
          "1 m = 10 dm = 100 cm = 1000 mm",
          "1 km = 1000 m",
          "1 cm = 10 mm"
        ]
      },
      tableau_conversion: "km | hm | dam | m | dm | cm | mm",
      utilisations: {
        "mm": "Epaisseur d'une feuille, diametre d'un clou",
        "cm": "Longueur d'une regle, hauteur d'un livre",
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
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer les conversions et l'utilisation des unites de longueur",
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
        question: "Quelle unite choisir pour exprimer : la distance Paris-Lyon, l'epaisseur d'un cheveu, la longueur d'un terrain de football ?",
        reponse: "km, µm (ou mm), m",
        aide: "Choisis l'unite la plus adaptee a la grandeur mesuree"
      },
      {
        type: "calcul",
        question: "Un rectangle a une longueur de 12 cm et une largeur de 8,5 cm. Quel est son perimetre en mm ?",
        reponse: "410 mm",
        aide: "Perimetre = 2 × (12 + 8,5) = 41 cm = 410 mm"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur les unites de longueur",
    questions: [
      "Comment choisis-tu l'unite la plus appropriee selon ce que tu mesures ?",
      "Quelle methode utilises-tu pour eviter les erreurs de conversion ?",
      "Comment expliques-tu a un camarade la relation entre les differentes unites ?",
      "Dans quelles situations de la vie quotidienne utilises-tu ces conversions ?",
      "Pourquoi est-il important d'avoir un systeme d'unites coherent ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je connais les principales unites de longueur",
          "Je sais convertir d'une unite a l'autre",
          "Je sais choisir l'unite appropriee selon la situation",
          "Je sais utiliser le tableau de conversion",
          "Je sais resoudre des problemes impliquant des mesures de longueur"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = uniteslongueur6eme;
