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
      exercices: [],
      miniQuiz: [
        {
          question: "Pour calculer une moyenne, on doit :",
          choix: [
            "Additionner toutes les valeurs",
            "Diviser la somme par le nombre de valeurs", 
            "Prendre la valeur du milieu",
            "Prendre la plus grande valeur"
          ],
          reponse: "Diviser la somme par le nombre de valeurs",
          points: 10
        }
      ]
    }
  ]
};

// Assign to window for browser compatibility
window.data = moyenne6eme;
