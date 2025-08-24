// Données spécifiques à la proportionnalité pour la classe de 6ème
export const proportionnalite6eme = {
  niveau: "6ème",
  chapitre: "Organisation et gestion de données",
  sousChapitre: "Proportionnalité",
  competences: [
    {
      id: "6OGD-PRO-1",
      titre: "Reconnaître et résoudre des situations de proportionnalité",
      objectif: "Savoir identifier une situation de proportionnalité, utiliser différentes méthodes pour la résoudre, et comprendre la notion de coefficient de proportionnalité.",

      cours: "Deux grandeurs sont proportionnelles si l'on peut passer de l'une à l'autre en multipliant toujours par le même nombre. Ce nombre est appelé le coefficient de proportionnalité.",

      etapes: [
        {
          titre: "Reconnaître une situation de proportionnalité",
          comment: "Une situation est proportionnelle si quand une grandeur est multipliée par un nombre, l'autre est aussi multipliée par ce même nombre. Pensez au prix d'un produit : 2 kg de pommes coûtent deux fois plus cher que 1 kg.",
          exemple: "Le prix à payer et le nombre de litres d'essence sont proportionnels."
        },
        {
          titre: "Utiliser le coefficient de proportionnalité",
          comment: "Pour passer de la première ligne à la deuxième ligne d'un tableau, on multiplie par un nombre, le coefficient de proportionnalité.",
          exemple: "Si 1 kg de pommes coûte 2€, le coefficient est 2. Pour 3 kg, on fait 3 × 2 = 6€."
        },
        {
          titre: "Utiliser la règle de trois (produit en croix)",
          comment: "C'est une autre méthode très utile. Quand tu as trois valeurs dans un tableau, tu peux trouver la quatrième en multipliant les deux valeurs en diagonale et en divisant par la troisième.",
          exemple: "Si 5 billes coûtent 10€, pour trouver le prix de 7 billes, on fait (7 × 10) / 5."
        }
      ],

      exemple: "Si un cycliste roule à une vitesse constante de 20 km/h, la distance qu'il parcourt est proportionnelle à son temps de trajet.",

      exercices: [
        {
          type: "débutant",
          question: "Complète le tableau de proportionnalité.",
          points: 10,
          interactif: true,
          typeExercice: "tableau",
          donnees: {
            ligne1: [2, 4, 6],
            ligne2: [10, null, null],
            reponse: [20, 30]
          },
          aide: "Quel est le coefficient de 2 à 10 ?"
        },
        {
          type: "intermédiaire",
          question: "Un robot met 5 secondes pour peindre 15 objets. Combien d'objets peut-il peindre en 20 secondes ?",
          points: 15,
          interactif: true,
          typeExercice: "saisie",
          reponse: 60,
          solutionDetaillee: "On peut trouver le coefficient : 15 / 5 = 3. Il peint 3 objets par seconde. Donc, en 20 secondes, 20 × 3 = 60 objets."
        },
        {
          type: "avancé",
          question: "Avec 3 kg de farine, on fait 42 crêpes. Combien de farine faut-il pour 70 crêpes ?",
          points: 20,
          interactif: true,
          typeExercice: "calcul",
          reponse: 5,
          solutionDetaillee: "On utilise la règle de trois : (70 × 3) / 42 = 210 / 42 = 5 kg."
        }
      ],

      miniQuiz: [
        {
          question: "Quel est le coefficient de proportionnalité qui permet de passer de la ligne du haut à la ligne du bas ?",
          tableau: {
            ligne1: [4, 8, 12],
            ligne2: [2, 4, 6]
          },
          choix: [
            {"option": "0,5", "estCorrect": true, "feedback": "Bravo ! On divise par 2 ou on multiplie par 0,5."},
            {"option": "2", "estCorrect": false, "feedback": "Non, 2 est le coefficient pour passer de la ligne du bas à celle du haut."},
            {"option": "4", "estCorrect": false, "feedback": "Non, 4 est juste le premier nombre de la ligne du haut."},
            {"option": "0,25", "estCorrect": false, "feedback": "Non, 0,25 serait pour diviser par 4."}
          ]
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Si 2 stylos coûtent 4€, combien coûtent 4 stylos ?",
            choix: ["4€", "8€", "12€"],
            reponse: "8€"
          },
          {
            question: "Est-ce que l'âge d'une personne est proportionnel à sa taille ?",
            choix: ["Oui", "Non"],
            reponse: "Non"
          },
          {
            question: "Si 3 pommes pèsent 500 grammes, combien pèsent 6 pommes ?",
            choix: ["500g", "1000g", "1500g"],
            reponse: "1000g"
          }
        ]
      },

      astuce: "Pour savoir si une situation est proportionnelle, pose-toi la question : 'Si je double la quantité, est-ce que le résultat double aussi ?'",

      pieges: [
        {
          titre: "Confondre proportionnalité et non-proportionnalité",
          description: "La taille d'une personne et son âge ne sont pas proportionnels. Avoir 2 fois l'âge ne signifie pas que l'on sera 2 fois plus grand !"
        }
      ],

      defi: {
        titre: "Le défi du supermarché",
        description: "3 boîtes de conserve pèsent 1,2 kg. Combien pèsent 5 boîtes ?",
        exemples: ["1,2 ÷ 3 × 5", "0,4 × 5", "2 kg"],
        duree: 90,
        reponse: 2,
        solutionDetaillee: "On peut trouver la masse d'une boîte : 1,2 kg / 3 = 0,4 kg. Donc, 5 boîtes pèsent 5 × 0,4 = 2 kg."
      },

      utilite: "La proportionnalité est partout : pour cuisiner (doubler les ingrédients), faire du sport (calculer une vitesse) ou faire ses courses (calculer le prix d'un produit).",

      funFact: "Les égyptiens utilisaient déjà la proportionnalité pour construire les pyramides, en s'aidant d'une corde avec des nœuds pour mesurer les distances et les angles.",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir résoudre des problèmes de proportionnalité' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semblé le plus facile ?",
            options: [
              "🔍 Reconnaître la proportionnalité",
              "🤔 Utiliser le coefficient",
              "📈 Utiliser la règle de trois",
              "💡 Faire la différence entre proportionnalité et non-proportionnalité"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a été la plus grande difficulté pour toi ?",
            options: [
              "🔄 Trouver le bon coefficient",
              "🤔 Appliquer la règle de trois",
              "⚖️ Distinguer les grandeurs proportionnelles",
              "🌟 Aucune difficulté particulière"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser la proportionnalité dans ta vie de tous les jours ?",
            options: [
              "📝 Pour adapter une recette de cuisine",
              "💰 Pour comparer les prix au supermarché",
              "🗺️ Pour calculer une distance sur une carte",
              "⚽ Pour trouver un ratio de buts dans un match"
            ]
          }
        ]
      }
    }
  ]
};

export default proportionnalite6eme;