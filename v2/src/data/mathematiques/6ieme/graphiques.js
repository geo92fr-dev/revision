// Graphiques - 6eme
const graphiques6eme = {
  titre: "Graphiques",
  niveau: "6eme",
  description: "Apprendre a lire et interpreter differents types de graphiques",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur les graphiques",
    exercices: [
      {
        type: "qcm",
        question: "Quel type de graphique utilise des barres pour representer des donnees ?",
        options: [
          "Graphique en secteurs (camembert)",
          "Graphique en barres",
          "Graphique en courbes",
          "Pictogramme"
        ],
        correct: 1,
        explication: "Le graphique en barres utilise des rectangles de hauteurs differentes"
      },
      {
        type: "observation",
        question: "En regardant ce graphique des temperatures, peux-tu dire quel jour il a fait le plus chaud ?",
        aide: "Cherche la barre la plus haute ou le point le plus eleve"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir les differents types de graphiques et leur utilisation",
    cours: {
      definition: "Un graphique est une representation visuelle de donnees qui facilite leur lecture et leur comparaison",
      types: {
        "Graphique en barres": {
          "Usage": "Comparer des quantites",
          "Exemple": "Nombre d'eleves par classe",
          "Lecture": "La hauteur des barres indique les valeurs"
        },
        "Graphique en courbes": {
          "Usage": "Montrer l'evolution dans le temps",
          "Exemple": "Temperature au cours d'une journee",
          "Lecture": "Les points relies montrent les variations"
        },
        "Graphique en secteurs": {
          "Usage": "Montrer la repartition d'un tout",
          "Exemple": "Repartition du budget familial",
          "Lecture": "La taille des secteurs indique les proportions"
        },
        "Pictogramme": {
          "Usage": "Representer avec des symboles",
          "Exemple": "Nombre de voitures avec des icones",
          "Lecture": "Chaque symbole represente une quantite donnee"
        }
      },
      elements: {
        "Titre": "Indique le sujet du graphique",
        "Axes": "Axe horizontal (abscisses) et vertical (ordonnees)",
        "Graduation": "Echelle sur les axes",
        "Legende": "Explique les symboles ou couleurs utilises",
        "Unites": "Precisent ce qui est mesure"
      },
      lecture: [
        "1. Lire le titre pour comprendre le sujet",
        "2. Identifier les axes et leurs unites",
        "3. Reperer l'echelle et la graduation",
        "4. Localiser les donnees recherchees",
        "5. Interpreter les resultats"
      ]
    },
    exercices: [
      {
        type: "lecture_barres",
        question: "Sur ce graphique des sports preferes, combien d'eleves preferent le football ?",
        aide: "Trouve la barre 'Football' et lis sa hauteur sur l'axe vertical"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer la lecture et l'interpretation de graphiques varies",
    exercices: [
      {
        type: "graphique_barres",
        question: "Graphique des notes obtenues :\n[Barres : 0-5: 2 eleves, 6-10: 5 eleves, 11-15: 12 eleves, 16-20: 6 eleves]\nCombien d'eleves ont eu une note entre 11 et 15 ?",
        reponse: "12 eleves",
        aide: "Regarde la hauteur de la barre correspondant a 11-15"
      },
      {
        type: "graphique_courbes",
        question: "Evolution de la temperature :\n[Courbe : 6h:8°C, 12h:15°C, 18h:18°C, 24h:12°C]\nA quel moment de la journee fait-il le plus chaud ?",
        reponse: "A 18h",
        aide: "Cherche le point le plus haut sur la courbe"
      },
      {
        type: "graphique_secteurs",
        question: "Repartition du temps d'une journee :\n[Secteurs : Sommeil 40%, Ecole 25%, Loisirs 20%, Repas 15%]\nQuelle activite prend le plus de temps ?",
        reponse: "Le sommeil",
        aide: "Cherche le secteur le plus grand ou le pourcentage le plus eleve"
      },
      {
        type: "pictogramme",
        question: "Vente de glaces (1 symbole = 10 glaces) :\nLundi: 3 symboles, Mardi: 5 symboles, Mercredi: 7 symboles\nCombien de glaces ont ete vendues mercredi ?",
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
        question: "D'apres le graphique des notes, combien y a-t-il d'eleves au total dans la classe ?",
        reponse: "25 eleves",
        aide: "Additionne tous les effectifs : 2+5+12+6"
      },
      {
        type: "interpretation",
        question: "D'apres le graphique de temperature, que peux-tu dire sur l'evolution de la temperature ?",
        reponse: "Elle augmente jusqu'a 18h puis diminue",
        aide: "Observe la forme de la courbe"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur l'interpretation des graphiques",
    questions: [
      "Comment choisis-tu le type de graphique le plus adapte selon les donnees ?",
      "Quelle methode utilises-tu pour lire precisement une valeur sur un graphique ?",
      "Comment reperes-tu les informations importantes dans un graphique complexe ?",
      "Dans quelles situations rencontres-tu des graphiques au quotidien ?",
      "Pourquoi les graphiques sont-ils plus pratiques que les tableaux pour certaines informations ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais identifier les differents types de graphiques",
          "Je sais lire les informations d'un graphique en barres",
          "Je sais interpreter un graphique en courbes",
          "Je comprends les graphiques en secteurs", 
          "Je sais calculer a partir des donnees d'un graphique",
          "Je peux comparer des donnees representees graphiquement"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = graphiques6eme;
