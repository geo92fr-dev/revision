// Donnees specifiques a la division pour la classe de 6eme
const data = {
  niveau: "6eme",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Division",
  competences: [
    {
      id: "6NC-DIV-1",
      titre: "Comprendre la division euclidienne",
      objectif: "Savoir effectuer une division euclidienne et interpreter le resultat (dividende, diviseur, quotient, reste).",

      cours: "La division euclidienne permet de diviser un nombre entier (le dividende) par un autre nombre entier (le diviseur) pour obtenir un quotient entier et un reste. La formule est : Dividende = (Diviseur × Quotient) + Reste.",

      etapes: [
        {
          titre: "Identifier les termes de la division",
          comment: "Chaque nombre a un role : le dividende est le nombre a diviser, le diviseur est le nombre qui divise, le quotient est le resultat entier, et le reste est ce qu'il reste.",
          exemple: "Dans 17 ÷ 5, 17 est le dividende, 5 est le diviseur. Le quotient est 3 et le reste est 2."
        },
        {
          titre: "Effectuer l'operation de division",
          comment: "Cherche le plus grand nombre de fois que le diviseur 'rentre' dans le dividende. Le nombre de fois est le quotient, et ce qui reste est le reste.",
          exemple: "Pour 17 ÷ 5, 5 rentre 3 fois dans 17 (car 5 × 3 = 15). Il reste 2 (17 - 15 = 2)."
        },
        {
          titre: "Verifier le resultat",
          comment: "Utilise la formule Dividende = (Diviseur × Quotient) + Reste pour t'assurer que ton calcul est juste. Le reste doit toujours etre plus petit que le diviseur.",
          exemple: "Verification de 17 ÷ 5 : (5 × 3) + 2 = 15 + 2 = 17. Le reste 2 est bien plus petit que le diviseur 5."
        }
      ],

      exemple: "Si tu dois partager 20 bonbons entre 6 amis, chacun en aura 3 et il en restera 2.",

      exercices: [
        {
          type: "debutant",
          question: "Quel est le quotient de 15 ÷ 4 ?",
          reponse: "3",
          points: 10
        },
        {
          type: "intermediaire",
          question: "Quel est le reste de 26 ÷ 8 ?",
          reponse: "2",
          points: 15
        },
        {
          type: "avance",
          question: "Calcule 38 ÷ 7 (quotient et reste separes par un espace) ?",
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
            {"option": "3", "estCorrect": false, "feedback": "Non, 6 × 3 = 18. Il reste plus que ca."}
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
            question: "Le reste d'une division peut-il etre plus grand que le diviseur ?",
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

      astuce: "Pense au partage : pour 17 ÷ 5, imagine que tu as 17 objets a donner a 5 personnes. Tu peux en donner 3 a chacun, et il te restera 2 objets.",

      pieges: [
        {
          titre: "Le reste est trop grand",
          description: "Le reste doit toujours etre strictement inferieur au diviseur. Si ton reste est 5 quand tu divises par 5, c'est que tu peux encore diviser une fois !"
        }
      ],

      defi: {
        titre: "Le defi du pâtissier",
        description: "Un pâtissier a 50 œufs. Il les utilise pour faire des gâteaux qui demandent 6 œufs chacun. Combien de gâteaux peut-il faire, et combien d'œufs lui restera-t-il ?",
        exemples: ["50 ÷ 6", "42 ÷ 7", "38 ÷ 5"],
        duree: 90,
        reponse: {
          gateaux: 8,
          oeufs: 2
        },
        solutionDetaillee: "50 ÷ 6 = 8, avec un reste de 2. Il peut faire 8 gâteaux et il lui restera 2 œufs."
      },

      utilite: "La division est essentielle pour partager equitablement, calculer des prix a l'unite (combien coûte une pomme si j'achete 12 pommes pour 6€ ?), et organiser des groupes de personnes ou d'objets.",

      funFact: "Le symbole de la division (÷) est appele l'obelus. Il est apparu pour la premiere fois en 1659 dans un livre de mathematiques.",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir faire une division euclidienne' ?",
            options: ["🎉 Completement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semble le plus facile ?",
            options: [
              "🔍 Identifier les termes (dividende, diviseur, etc.)",
              "🧠 Effectuer l'operation de division",
              "💪 Faire les exercices interactifs",
              "✅ Verifier le resultat avec la formule"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a ete la plus grande difficulte pour toi ?",
            options: [
              "🔄 Comprendre la notion de reste",
              "📝 Poser l'operation",
              "⚖️ Verifier la division avec la formule",
              "🌟 Aucune difficulte particuliere"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser la division dans ta vie de tous les jours ?",
            options: [
              "💰 Pour partager l'argent de poche",
              "🔢 Pour calculer combien de bonbons chacun aura",
              "⚽ Pour savoir combien d'equipes on peut former",
              "🍰 Pour decouper un gâteau en parts egales"
            ]
          }
        ]
      },

      // Maintien de la compatibilite avec l'ancien format
      description: "Effectuer une division euclidienne et interpreter le resultat (dividende, diviseur, quotient, reste).",
      ressources: [
        { type: "video", titre: "Division euclidienne", url: "https://www.youtube.com/watch?v=division" },
        { type: "exercice", titre: "Divisions pas a pas", url: "https://www.sesamath.net/" }
      ],
      quizId: "QUIZ_6_DIVISION_EUCLIDIENNE"
    },
    {
      // COMPETENCE SIMPLE
      id: "6NC-DIV-2",
      titre: "Division decimale",
      description: "Effectuer des divisions simples avec des nombres decimaux et comprendre la notion de division exacte.",
      exemple: "Ex. : 12,5 ÷ 2,5 = 5",
      astuce: "Pour diviser par un nombre decimal, multiplie les deux nombres par 10, 100... pour que le diviseur devienne entier",
      ressources: [
        { type: "video", titre: "Division de decimaux", url: "https://www.youtube.com/watch?v=div_decimaux" }
      ],
      quizId: "QUIZ_6_DIVISION_DECIMALE"
    }
  ]
};

// Assign to window for browser compatibility
window.data = data;
