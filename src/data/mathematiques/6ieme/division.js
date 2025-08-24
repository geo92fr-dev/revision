// Données spécifiques à la division pour la classe de 6ème
export const division6eme = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Division",
  competences: [
    {
      id: "6NC-DIV-1",
      titre: "Comprendre la division euclidienne",
      objectif: "Savoir effectuer une division euclidienne et interpréter le résultat (dividende, diviseur, quotient, reste).",

      cours: "La division euclidienne permet de diviser un nombre entier (le dividende) par un autre nombre entier (le diviseur) pour obtenir un quotient entier et un reste. La formule est : Dividende = (Diviseur × Quotient) + Reste.",

      etapes: [
        {
          titre: "Identifier les termes de la division",
          comment: "Chaque nombre a un rôle : le dividende est le nombre à diviser, le diviseur est le nombre qui divise, le quotient est le résultat entier, et le reste est ce qu'il reste.",
          exemple: "Dans 17 ÷ 5, 17 est le dividende, 5 est le diviseur. Le quotient est 3 et le reste est 2."
        },
        {
          titre: "Effectuer l'opération de division",
          comment: "Cherche le plus grand nombre de fois que le diviseur 'rentre' dans le dividende. Le nombre de fois est le quotient, et ce qui reste est le reste.",
          exemple: "Pour 17 ÷ 5, 5 rentre 3 fois dans 17 (car 5 × 3 = 15). Il reste 2 (17 - 15 = 2)."
        },
        {
          titre: "Vérifier le résultat",
          comment: "Utilise la formule Dividende = (Diviseur × Quotient) + Reste pour t'assurer que ton calcul est juste. Le reste doit toujours être plus petit que le diviseur.",
          exemple: "Vérification de 17 ÷ 5 : (5 × 3) + 2 = 15 + 2 = 17. Le reste 2 est bien plus petit que le diviseur 5."
        }
      ],

      exemple: "Si tu dois partager 20 bonbons entre 6 amis, chacun en aura 3 et il en restera 2.",

      exercices: [
        {
          type: "débutant",
          question: "Quel est le quotient de 15 ÷ 4 ?",
          reponse: "3",
          points: 10
        },
        {
          type: "intermédiaire",
          question: "Quel est le reste de 26 ÷ 8 ?",
          reponse: "2",
          points: 15
        },
        {
          type: "avancé",
          question: "Calcule 38 ÷ 7 (quotient et reste séparés par un espace) ?",
          reponse: "5 3",
          points: 20
        }
      ],

      miniQuiz: [
        {
          question: "Dans 25 ÷ 6, quel est le reste ?",
          choix: [
            {"option": "4", "estCorrect": false, "feedback": "Non, 25 ÷ 6 = 4. Il te reste quelque chose."},
            {"option": "1", "estCorrect": true, "feedback": "Bravo ! 6 × 4 = 24, et il reste 1."},
            {"option": "2", "estCorrect": false, "feedback": "Non, 6 × 3 = 18 et il reste 7. Le reste est toujours plus petit que le diviseur !"},
            {"option": "3", "estCorrect": false, "feedback": "Non, 6 × 3 = 18. Il reste plus que ça."}
          ]
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Dans la division 19 par 5, quel est le quotient entier ?",
            choix: ["3", "4", "5", "9"],
            reponse: "3"
          },
          {
            question: "Le reste d'une division peut-il être plus grand que le diviseur ?",
            choix: ["Oui", "Non"],
            reponse: "Non"
          },
          {
            question: "Si 13 = (4 × 3) + 1, quel est le dividende ?",
            choix: ["13", "4", "3", "1"],
            reponse: "13"
          }
        ]
      },

      astuce: "Pense au partage : pour 17 ÷ 5, imagine que tu as 17 objets à donner à 5 personnes. Tu peux en donner 3 à chacun, et il te restera 2 objets.",

      pieges: [
        {
          titre: "Le reste est trop grand",
          description: "Le reste doit toujours être strictement inférieur au diviseur. Si ton reste est 5 quand tu divises par 5, c'est que tu peux encore diviser une fois !"
        }
      ],

      defi: {
        titre: "Le défi du pâtissier",
        description: "Un pâtissier a 50 œufs. Il les utilise pour faire des gâteaux qui demandent 6 œufs chacun. Combien de gâteaux peut-il faire, et combien d'œufs lui restera-t-il ?",
        reponse: {
          gateaux: 8,
          oeufs: 2
        },
        solutionDetaillee: "50 ÷ 6 = 8, avec un reste de 2. Il peut faire 8 gâteaux et il lui restera 2 œufs."
      },

      utilite: "La division est essentielle pour partager équitablement, calculer des prix à l'unité (combien coûte une pomme si j'achète 12 pommes pour 6€ ?), et organiser des groupes de personnes ou d'objets.",

      funFact: "Le symbole de la division (÷) est appelé l'obélus. Il est apparu pour la première fois en 1659 dans un livre de mathématiques.",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir faire une division euclidienne' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semblé le plus facile ?",
            options: [
              "🔍 Identifier les termes (dividende, diviseur, etc.)",
              "🧠 Effectuer l'opération de division",
              "💪 Faire les exercices interactifs",
              "✅ Vérifier le résultat avec la formule"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a été la plus grande difficulté pour toi ?",
            options: [
              "🔄 Comprendre la notion de reste",
              "📝 Poser l'opération",
              "⚖️ Vérifier la division avec la formule",
              "🌟 Aucune difficulté particulière"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser la division dans ta vie de tous les jours ?",
            options: [
              "💰 Pour partager l'argent de poche",
              "🔢 Pour calculer combien de bonbons chacun aura",
              "⚽ Pour savoir combien d'équipes on peut former"
            ]
          }
        ]
      },

      // Maintien de la compatibilité avec l'ancien format
      description: "Effectuer une division euclidienne et interpréter le résultat (dividende, diviseur, quotient, reste).",
      ressources: [
        { type: "vidéo", titre: "Division euclidienne", url: "https://www.youtube.com/watch?v=division" },
        { type: "exercice", titre: "Divisions pas à pas", url: "https://www.sesamath.net/" }
      ],
      quizId: "QUIZ_6_DIVISION_EUCLIDIENNE"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6NC-DIV-2",
      titre: "Division décimale",
      description: "Effectuer des divisions simples avec des nombres décimaux et comprendre la notion de division exacte.",
      exemple: "Ex. : 12,5 ÷ 2,5 = 5",
      astuce: "Pour diviser par un nombre décimal, multiplie les deux nombres par 10, 100... pour que le diviseur devienne entier",
      ressources: [
        { type: "vidéo", titre: "Division de décimaux", url: "https://www.youtube.com/watch?v=div_decimaux" }
      ],
      quizId: "QUIZ_6_DIVISION_DECIMALE"
    }
  ]
};

export default division6eme;