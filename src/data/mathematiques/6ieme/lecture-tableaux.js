// Lecture de tableaux - 6ème
export const lectureTableaux6eme = {
  titre: "Lecture de tableaux",
  niveau: "6ème",
  description: "Apprendre à lire et interpréter des tableaux de données",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur les tableaux",
    exercices: [
      {
        type: "qcm",
        question: "Dans un tableau, comment appelle-t-on les lignes horizontales et verticales ?",
        options: [
          "Colonnes et rangées",
          "Lignes et colonnes",
          "Rangées et files", 
          "Abscisses et ordonnées"
        ],
        correct: 1,
        explication: "Un tableau est organisé en lignes (horizontales) et colonnes (verticales)"
      },
      {
        type: "lecture_simple",
        question: "Dans ce tableau des notes de Julie, quelle note a-t-elle eue en mathématiques ? [Tableau : Maths: 15, Français: 12, Histoire: 14]",
        reponse: "15",
        aide: "Regarde dans la colonne Mathématiques"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir l'organisation et la lecture des tableaux",
    cours: {
      definition: "Un tableau organise des données en lignes et colonnes pour faciliter la lecture et la comparaison",
      structure: {
        "En-têtes de colonnes": "Indiquent ce que contient chaque colonne",
        "En-têtes de lignes": "Indiquent ce que représente chaque ligne",
        "Cellules": "Cases contenant les données",
        "Intersection": "Croisement d'une ligne et d'une colonne"
      },
      types_tableaux: [
        "Tableaux de données numériques (notes, prix, quantités...)",
        "Tableaux d'horaires (transports, emploi du temps...)",
        "Tableaux de correspondance (conversions, équivalences...)",
        "Tableaux à double entrée (croisement de deux critères)"
      ],
      methode_lecture: [
        "1. Identifier le titre et le sujet du tableau",
        "2. Repérer les en-têtes de lignes et colonnes",
        "3. Localiser la cellule à l'intersection recherchée",
        "4. Lire la valeur et vérifier son unité"
      ]
    },
    exercices: [
      {
        type: "lecture_tableau",
        question: "Voici les températures de la semaine : [tableau avec jours et températures]. Quelle température fait-il mercredi ?",
        aide: "Trouve la colonne 'Mercredi' et lis la température correspondante"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer la lecture et l'interprétation de tableaux variés",
    exercices: [
      {
        type: "tableau_notes",
        question: "Tableau des notes de la classe :\n| Élève | Maths | Français | Anglais |\n|-------|-------|----------|----------|\n| Alice | 16    | 14       | 15      |\n| Bob   | 12    | 16       | 13      |\n| Clara | 15    | 13       | 17      |\n\nQuelle est la moyenne de Clara ?",
        reponse: "15",
        aide: "Additionne les notes de Clara et divise par 3 : (15+13+17)÷3"
      },
      {
        type: "tableau_horaires",
        question: "Horaires de bus :\n| Arrêt      | 7h30 | 8h15 | 9h00 | 10h30 |\n|------------|------|------|------|-------|\n| Gare       | 7h30 | 8h15 | 9h00 | 10h30 |\n| Collège    | 7h45 | 8h30 | 9h15 | 10h45 |\n| Centre     | 8h00 | 8h45 | 9h30 | 11h00 |\n\nÀ quelle heure le bus de 8h15 arrive-t-il au centre ?",
        reponse: "8h45",
        aide: "Suis la colonne du bus de 8h15 jusqu'à la ligne 'Centre'"
      },
      {
        type: "tableau_double_entree",
        question: "Tableau des distances (en km) :\n|        | Paris | Lyon | Marseille |\n|--------|-------|------|----------|\n| Paris  | 0     | 463  | 775      |\n| Lyon   | 463   | 0    | 314      |\n| Bordeaux| 579   | 543  | 563      |\n\nQuelle est la distance entre Lyon et Marseille ?",
        reponse: "314 km",
        aide: "Trouve l'intersection de la ligne Lyon et de la colonne Marseille"
      },
      {
        type: "calcul_tableau",
        question: "Ventes de la semaine :\n| Jour   | Lundi | Mardi | Mercredi | Jeudi | Vendredi |\n|--------|-------|-------|----------|-------|----------|\n| Ventes | 45    | 38    | 52       | 41    | 59       |\n\nCombien d'articles ont été vendus au total cette semaine ?",
        reponse: "235 articles",
        aide: "Additionne toutes les ventes : 45+38+52+41+59"
      },
      {
        type: "comparaison",
        question: "En utilisant le tableau des notes précédent, qui a la meilleure note en anglais ?",
        reponse: "Clara",
        aide: "Compare les notes dans la colonne 'Anglais' : Alice(15), Bob(13), Clara(17)"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur la lecture de tableaux",
    questions: [
      "Quelle méthode utilises-tu pour ne pas te tromper en lisant un tableau ?",
      "Comment procèdes-tu pour comparer plusieurs valeurs dans un tableau ?",
      "Dans quelles situations rencontres-tu des tableaux au quotidien ?",
      "Pourquoi est-il important de bien identifier les en-têtes avant de lire ?",
      "Comment organiserais-tu des données dans un tableau ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais identifier la structure d'un tableau",
          "Je sais localiser une information précise dans un tableau",
          "Je sais comparer des données d'un tableau",
          "Je sais effectuer des calculs à partir d'un tableau",
          "Je sais interpréter les informations d'un tableau",
          "Je comprends l'utilité des tableaux pour organiser l'information"
        ]
      }
    ]
  }
};

// Export par défaut
export default lectureTableaux6eme;
