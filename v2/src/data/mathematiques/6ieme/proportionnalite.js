// Donnees specifiques a la proportionnalite pour la classe de 6eme
const data = {
  niveau: "6eme",
  chapitre: "Organisation et gestion de donnees",
  sousChapitre: "Proportionnalite",
  competences: [
    {
      id: "6OGD-PRO-1",
      titre: "Reconnaitre et resoudre des situations de proportionnalite",
      objectif: "Savoir identifier une situation de proportionnalite, utiliser differentes methodes pour la resoudre, et comprendre la notion de coefficient de proportionnalite.",

      cours: "Deux grandeurs sont proportionnelles si l'on peut passer de l'une a l'autre en multipliant toujours par le meme nombre. Ce nombre est appele le coefficient de proportionnalite.",

      etapes: [
        {
          titre: "Reconnaitre une situation de proportionnalite",
          comment: "Une situation est proportionnelle si quand une grandeur est multipliee par un nombre, l'autre est aussi multipliee par ce meme nombre. Pensez au prix d'un produit : 2 kg de pommes coûtent deux fois plus cher que 1 kg.",
          exemple: "Le prix a payer et le nombre de litres d'essence sont proportionnels."
        },
        {
          titre: "Utiliser le coefficient de proportionnalite",
          comment: "Pour passer de la premiere ligne a la deuxieme ligne d'un tableau, on multiplie par un nombre, le coefficient de proportionnalite.",
          exemple: "Si 1 kg de pommes coûte 2€, le coefficient est 2. Pour 3 kg, on fait 3 × 2 = 6€."
        },
        {
          titre: "Utiliser la regle de trois (produit en croix)",
          comment: "C'est une autre methode tres utile. Quand tu as trois valeurs dans un tableau, tu peux trouver la quatrieme en multipliant les deux valeurs en diagonale et en divisant par la troisieme.",
          exemple: "Si 5 billes coûtent 10€, pour trouver le prix de 7 billes, on fait (7 × 10) / 5."
        }
      ],

      exemple: "Si un cycliste roule a une vitesse constante de 20 km/h, la distance qu'il parcourt est proportionnelle a son temps de trajet.",

      exercices: [
        {
          type: "debutant",
          question: "Complete le tableau de proportionnalite.",
          points: 10,
          interactif: true,
          typeExercice: "tableau",
          donnees: {
            ligne1: [2, 4, 6],
            ligne2: [10, null, null],
            reponse: [20, 30]
          },
          aide: "Quel est le coefficient de 2 a 10 ?"
        },
        {
          type: "intermediaire",
          question: "Un robot met 5 secondes pour peindre 15 objets. Combien d'objets peut-il peindre en 20 secondes ?",
          points: 15,
          interactif: true,
          typeExercice: "saisie",
          reponse: 60,
          solutionDetaillee: "On peut trouver le coefficient : 15 / 5 = 3. Il peint 3 objets par seconde. Donc, en 20 secondes, 20 × 3 = 60 objets."
        },
        {
          type: "avance",
          question: "Avec 3 kg de farine, on fait 42 crepes. Combien de farine faut-il pour 70 crepes ?",
          points: 20,
          interactif: true,
          typeExercice: "calcul",
          reponse: 5,
          solutionDetaillee: "On utilise la regle de trois : (70 × 3) / 42 = 210 / 42 = 5 kg."
        }
      ],

      miniQuiz: [
        {
          question: "Quel est le coefficient de proportionnalite qui permet de passer de la ligne du haut a la ligne du bas ?",
          tableau: {
            ligne1: [4, 8, 12],
            ligne2: [2, 4, 6]
          },
          choix: [
            {"option": "0,5", "estCorrect": true, "feedback": "Bravo ! On divise par 2 ou on multiplie par 0,5."},
            {"option": "2", "estCorrect": false, "feedback": "Non, 2 est le coefficient pour passer de la ligne du bas a celle du haut."},
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
            question: "Est-ce que l'âge d'une personne est proportionnel a sa taille ?",
            choix: ["Oui", "Non"],
            reponse: "Non"
          },
          {
            question: "Si 3 pommes pesent 500 grammes, combien pesent 6 pommes ?",
            choix: ["500g", "1000g", "1500g"],
            reponse: "1000g"
          }
        ]
      },

      astuce: "Pour savoir si une situation est proportionnelle, pose-toi la question : 'Si je double la quantite, est-ce que le resultat double aussi ?'",

      pieges: [
        {
          titre: "Confondre proportionnalite et non-proportionnalite",
          description: "La taille d'une personne et son âge ne sont pas proportionnels. Avoir 2 fois l'âge ne signifie pas que l'on sera 2 fois plus grand !"
        }
      ],

      defi: {
        titre: "Le defi du supermarche",
        description: "3 boites de conserve pesent 1,2 kg. Combien pesent 5 boites ?",
        exemples: ["1,2 ÷ 3 × 5", "0,4 × 5", "2 kg"],
        duree: 90,
        reponse: 2,
        solutionDetaillee: "On peut trouver la masse d'une boite : 1,2 kg / 3 = 0,4 kg. Donc, 5 boites pesent 5 × 0,4 = 2 kg."
      },

      utilite: "La proportionnalite est partout : pour cuisiner (doubler les ingredients), faire du sport (calculer une vitesse) ou faire ses courses (calculer le prix d'un produit).",

      funFact: "Les egyptiens utilisaient deja la proportionnalite pour construire les pyramides, en s'aidant d'une corde avec des nœuds pour mesurer les distances et les angles.",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir resoudre des problemes de proportionnalite' ?",
            options: ["🎉 Completement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semble le plus facile ?",
            options: [
              "🔍 Reconnaitre la proportionnalite",
              "🤔 Utiliser le coefficient",
              "📈 Utiliser la regle de trois",
              "💡 Faire la difference entre proportionnalite et non-proportionnalite"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a ete la plus grande difficulte pour toi ?",
            options: [
              "🔄 Trouver le bon coefficient",
              "🤔 Appliquer la regle de trois",
              "⚖️ Distinguer les grandeurs proportionnelles",
              "🌟 Aucune difficulte particuliere"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser la proportionnalite dans ta vie de tous les jours ?",
            options: [
              "📝 Pour adapter une recette de cuisine",
              "💰 Pour comparer les prix au supermarche",
              "🗺️ Pour calculer une distance sur une carte",
              "⚽ Pour trouver un ratio de buts dans un match"
            ]
          }
        ]
      }
    }
  ]
};

// Assign to window for browser compatibility
window.data = data;
