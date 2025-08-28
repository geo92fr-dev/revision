// Lecture de tableaux - 6eme
const lecturetableaux6eme = {
  titre: "Lecture de tableaux",
  niveau: "6eme",
  description: "Apprendre a lire et interpreter des tableaux de donnees",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur les tableaux",
    exercices: [
      {
        type: "qcm",
        question: "Dans un tableau, comment appelle-t-on les lignes horizontales et verticales ?",
        options: [
          "Colonnes et rangees",
          "Lignes et colonnes",
          "Rangees et files", 
          "Abscisses et ordonnees"
        ],
        correct: 1,
        explication: "Un tableau est organise en lignes (horizontales) et colonnes (verticales)"
      },
      {
        type: "lecture_simple",
        question: "Dans ce tableau des notes de Julie, quelle note a-t-elle eue en mathematiques ? [Tableau : Maths: 15, Francais: 12, Histoire: 14]",
        reponse: "15",
        aide: "Regarde dans la colonne Mathematiques"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir l'organisation et la lecture des tableaux",
    cours: {
      definition: "Un tableau organise des donnees en lignes et colonnes pour faciliter la lecture et la comparaison",
      structure: {
        "En-tetes de colonnes": "Indiquent ce que contient chaque colonne",
        "En-tetes de lignes": "Indiquent ce que represente chaque ligne",
        "Cellules": "Cases contenant les donnees",
        "Intersection": "Croisement d'une ligne et d'une colonne"
      },
      types_tableaux: [
        "Tableaux de donnees numeriques (notes, prix, quantites...)",
        "Tableaux d'horaires (transports, emploi du temps...)",
        "Tableaux de correspondance (conversions, equivalences...)",
        "Tableaux a double entree (croisement de deux criteres)"
      ],
      methode_lecture: [
        "1. Identifier le titre et le sujet du tableau",
        "2. Reperer les en-tetes de lignes et colonnes",
        "3. Localiser la cellule a l'intersection recherchee",
        "4. Lire la valeur et verifier son unite"
      ]
    },
    exercices: [
      {
        type: "lecture_tableau",
        question: "Voici les temperatures de la semaine : [tableau avec jours et temperatures]. Quelle temperature fait-il mercredi ?",
        aide: "Trouve la colonne 'Mercredi' et lis la temperature correspondante"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer la lecture et l'interpretation de tableaux varies",
    exercices: [
      {
        type: "tableau_notes",
        question: "Tableau des notes de la classe :\n| Eleve | Maths | Francais | Anglais |\n|-------|-------|----------|----------|\n| Alice | 16    | 14       | 15      |\n| Bob   | 12    | 16       | 13      |\n| Clara | 15    | 13       | 17      |\n\nQuelle est la moyenne de Clara ?",
        reponse: "15",
        aide: "Additionne les notes de Clara et divise par 3 : (15+13+17)÷3"
      },
      {
        type: "tableau_horaires",
        question: "Horaires de bus :\n| Arret      | 7h30 | 8h15 | 9h00 | 10h30 |\n|------------|------|------|------|-------|\n| Gare       | 7h30 | 8h15 | 9h00 | 10h30 |\n| College    | 7h45 | 8h30 | 9h15 | 10h45 |\n| Centre     | 8h00 | 8h45 | 9h30 | 11h00 |\n\nA quelle heure le bus de 8h15 arrive-t-il au centre ?",
        reponse: "8h45",
        aide: "Suis la colonne du bus de 8h15 jusqu'a la ligne 'Centre'"
      },
      {
        type: "tableau_double_entree",
        question: "Tableau des distances (en km) :\n|        | Paris | Lyon | Marseille |\n|--------|-------|------|----------|\n| Paris  | 0     | 463  | 775      |\n| Lyon   | 463   | 0    | 314      |\n| Bordeaux| 579   | 543  | 563      |\n\nQuelle est la distance entre Lyon et Marseille ?",
        reponse: "314 km",
        aide: "Trouve l'intersection de la ligne Lyon et de la colonne Marseille"
      },
      {
        type: "calcul_tableau",
        question: "Ventes de la semaine :\n| Jour   | Lundi | Mardi | Mercredi | Jeudi | Vendredi |\n|--------|-------|-------|----------|-------|----------|\n| Ventes | 45    | 38    | 52       | 41    | 59       |\n\nCombien d'articles ont ete vendus au total cette semaine ?",
        reponse: "235 articles",
        aide: "Additionne toutes les ventes : 45+38+52+41+59"
      },
      {
        type: "comparaison",
        question: "En utilisant le tableau des notes precedent, qui a la meilleure note en anglais ?",
        reponse: "Clara",
        aide: "Compare les notes dans la colonne 'Anglais' : Alice(15), Bob(13), Clara(17)"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur la lecture de tableaux",
    questions: [
      "Quelle methode utilises-tu pour ne pas te tromper en lisant un tableau ?",
      "Comment procedes-tu pour comparer plusieurs valeurs dans un tableau ?",
      "Dans quelles situations rencontres-tu des tableaux au quotidien ?",
      "Pourquoi est-il important de bien identifier les en-tetes avant de lire ?",
      "Comment organiserais-tu des donnees dans un tableau ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais identifier la structure d'un tableau",
          "Je sais localiser une information precise dans un tableau",
          "Je sais comparer des donnees d'un tableau",
          "Je sais effectuer des calculs a partir d'un tableau",
          "Je sais interpreter les informations d'un tableau",
          "Je comprends l'utilite des tableaux pour organiser l'information"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = lecturetableaux6eme;
