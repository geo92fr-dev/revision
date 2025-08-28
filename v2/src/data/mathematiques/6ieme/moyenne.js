// Donnees specifiques aux moyennes pour la classe de 6eme
const moyenne6eme = {
  niveau: "6eme",
  chapitre: "Organisation et gestion de donnees",
  titre: "Les moyennes",
  description: "Apprendre a calculer et interpreter des moyennes arithmetiques",
  competences: [
    {
      titre: "Calculer et interpreter des moyennes",
      description: "Comprendre le concept de moyenne et savoir la calculer dans differentes situations",
      objectifs: [
        "Calculer la moyenne d'une serie de nombres",
        "Interpreter le resultat dans un contexte",
        "Utiliser la moyenne pour comparer des groupes"
      ],
      activites: [
        {
          type: "activation",
          titre: "Decouverte de la moyenne",
          description: "Tom veut connaitre sa moyenne en mathematiques ce trimestre.",
          contenu: "Tom a eu les notes suivantes : 12, 15, 8, 16, 14. Comment calculer sa moyenne ?"
        }
      ],
      exercices: [
        {
          enonce: "Calculer la moyenne des notes suivantes : 12, 15, 8, 16, 14",
          reponse: "13",
          explication: "Somme = 12+15+8+16+14 = 65. Moyenne = 65÷5 = 13",
          difficulte: 1
        },
        {
          enonce: "Un élève a une moyenne de 14 sur 4 contrôles. Quelle note doit-il avoir au 5e contrôle pour avoir 15 de moyenne générale ?",
          reponse: "19",
          explication: "Pour 15 de moyenne sur 5 notes: total = 15×5 = 75. Total actuel = 14×4 = 56. Note nécessaire = 75-56 = 19",
          difficulte: 2
        }
      ]
    }
  ]
};

// Assign to window for browser compatibility
window.data = moyenne6eme;
