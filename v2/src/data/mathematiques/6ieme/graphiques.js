// Graphiques - 6ème
export const graphiques6eme = {
  titre: "Graphiques",
  niveau: "6ème",
  description: "Apprendre à lire et interpréter différents types de graphiques",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur les graphiques",
    exercices: [
      {
        type: "qcm",
        question: "Quel type de graphique utilise des barres pour représenter des données ?",
        options: [
          "Graphique en secteurs (camembert)",
          "Graphique en barres",
          "Graphique en courbes",
          "Pictogramme"
        ],
        correct: 1,
        explication: "Le graphique en barres utilise des rectangles de hauteurs différentes"
      },
      {
        type: "observation",
        question: "En regardant ce graphique des températures, peux-tu dire quel jour il a fait le plus chaud ?",
        aide: "Cherche la barre la plus haute ou le point le plus élevé"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les différents types de graphiques et leur utilisation",
    cours: {
      definition: "Un graphique est une représentation visuelle de données qui facilite leur lecture et leur comparaison",
      types: {
        "Graphique en barres": {
          "Usage": "Comparer des quantités",
          "Exemple": "Nombre d'élèves par classe",
          "Lecture": "La hauteur des barres indique les valeurs"
        },
        "Graphique en courbes": {
          "Usage": "Montrer l'évolution dans le temps",
          "Exemple": "Température au cours d'une journée",
          "Lecture": "Les points reliés montrent les variations"
        },
        "Graphique en secteurs": {
          "Usage": "Montrer la répartition d'un tout",
          "Exemple": "Répartition du budget familial",
          "Lecture": "La taille des secteurs indique les proportions"
        },
        "Pictogramme": {
          "Usage": "Représenter avec des symboles",
          "Exemple": "Nombre de voitures avec des icônes",
          "Lecture": "Chaque symbole représente une quantité donnée"
        }
      },
      elements: {
        "Titre": "Indique le sujet du graphique",
        "Axes": "Axe horizontal (abscisses) et vertical (ordonnées)",
        "Graduation": "Échelle sur les axes",
        "Légende": "Explique les symboles ou couleurs utilisés",
        "Unités": "Précisent ce qui est mesuré"
      },
      lecture: [
        "1. Lire le titre pour comprendre le sujet",
        "2. Identifier les axes et leurs unités",
        "3. Repérer l'échelle et la graduation",
        "4. Localiser les données recherchées",
        "5. Interpréter les résultats"
      ]
    },
    exercices: [
      {
        type: "lecture_barres",
        question: "Sur ce graphique des sports préférés, combien d'élèves préfèrent le football ?",
        aide: "Trouve la barre 'Football' et lis sa hauteur sur l'axe vertical"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer la lecture et l'interprétation de graphiques variés",
    exercices: [
      {
        type: "graphique_barres",
        question: "Graphique des notes obtenues :\n[Barres : 0-5: 2 élèves, 6-10: 5 élèves, 11-15: 12 élèves, 16-20: 6 élèves]\nCombien d'élèves ont eu une note entre 11 et 15 ?",
        reponse: "12 élèves",
        aide: "Regarde la hauteur de la barre correspondant à 11-15"
      },
      {
        type: "graphique_courbes",
        question: "Évolution de la température :\n[Courbe : 6h:8°C, 12h:15°C, 18h:18°C, 24h:12°C]\nÀ quel moment de la journée fait-il le plus chaud ?",
        reponse: "À 18h",
        aide: "Cherche le point le plus haut sur la courbe"
      },
      {
        type: "graphique_secteurs",
        question: "Répartition du temps d'une journée :\n[Secteurs : Sommeil 40%, École 25%, Loisirs 20%, Repas 15%]\nQuelle activité prend le plus de temps ?",
        reponse: "Le sommeil",
        aide: "Cherche le secteur le plus grand ou le pourcentage le plus élevé"
      },
      {
        type: "pictogramme",
        question: "Vente de glaces (1 symbole = 10 glaces) :\nLundi: 3 symboles, Mardi: 5 symboles, Mercredi: 7 symboles\nCombien de glaces ont été vendues mercredi ?",
        reponse: "70 glaces",
        aide: "7 symboles × 10 glaces = 70 glaces"
      },
      {
        type: "comparaison",
        question: "En utilisant le graphique des sports, quel sport est le moins populaire ?",
        aide: "Cherche la barre la plus petite"
      },
      {
        type: "calcul",
        question: "D'après le graphique des notes, combien y a-t-il d'élèves au total dans la classe ?",
        reponse: "25 élèves",
        aide: "Additionne tous les effectifs : 2+5+12+6"
      },
      {
        type: "interpretation",
        question: "D'après le graphique de température, que peux-tu dire sur l'évolution de la température ?",
        reponse: "Elle augmente jusqu'à 18h puis diminue",
        aide: "Observe la forme de la courbe"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur l'interprétation des graphiques",
    questions: [
      "Comment choisis-tu le type de graphique le plus adapté selon les données ?",
      "Quelle méthode utilises-tu pour lire précisément une valeur sur un graphique ?",
      "Comment repères-tu les informations importantes dans un graphique complexe ?",
      "Dans quelles situations rencontres-tu des graphiques au quotidien ?",
      "Pourquoi les graphiques sont-ils plus pratiques que les tableaux pour certaines informations ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais identifier les différents types de graphiques",
          "Je sais lire les informations d'un graphique en barres",
          "Je sais interpréter un graphique en courbes",
          "Je comprends les graphiques en secteurs", 
          "Je sais calculer à partir des données d'un graphique",
          "Je peux comparer des données représentées graphiquement"
        ]
      }
    ]
  }
};

// Export par défaut
export default graphiques6eme;
