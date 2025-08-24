// Données spécifiques aux moyennes pour la classe de 6ème
const moyenne6eme = {
  niveau: "6ème",
  chapitre: "Organisation et gestion de données",
  titre: "Les moyennes",
  description: "Apprendre à calculer et interpréter des moyennes arithmétiques",
  competences: [
    {
      titre: "Calculer et interpréter des moyennes",
      description: "Comprendre le concept de moyenne et savoir la calculer dans différentes situations",
      objectifs: [
        "Calculer la moyenne d'une série de nombres",
        "Interpréter le résultat dans un contexte",
        "Utiliser la moyenne pour comparer des groupes"
      ],
      activites: [
        {
          type: "activation",
          titre: "Découverte de la moyenne",
          description: "Tom veut connaître sa moyenne en mathématiques ce trimestre.",
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

export const moyennes6eme = moyenne6eme; // Alias pour compatibilité
export { moyenne6eme }; // Export de la variable existante
export default moyenne6eme;
