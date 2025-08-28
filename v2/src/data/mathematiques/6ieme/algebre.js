// Donnees specifiques a l'Algebre pour la classe de 6eme
const data = {
  niveau: "6eme",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Initiation a l'Algebre",
  competences: [
    {
      id: "6NC-ALG-1",
      titre: "Comprendre les expressions litterales",
      objectif: "Savoir utiliser des lettres pour representer des nombres et simplifier des expressions.",

      cours: "En algebre, on utilise des lettres comme 'x' ou 'y' pour remplacer un nombre inconnu. Une expression qui contient des lettres est appelee 'expression litterale'.",

      etapes: [
        {
          titre: "Ecrire une expression litterale",
          comment: "Pour ecrire le perimetre d'un carre de cote 'c', on peut ecrire 'c + c + c + c' ou '4 × c'.",
          exemple: "La formule pour l'aire d'un rectangle de longueur 'L' et de largeur 'l' est 'L × l'."
        },
        {
          titre: "Simplifier une expression",
          comment: "On peut simplifier l'ecriture en enlevant le signe '×' entre un nombre et une lettre. On ecrit '4c' au lieu de '4 × c'.",
          exemple: "L'expression '5 × a' se simplifie en '5a'. L'expression 'a × b' se simplifie en 'ab'."
        },
        {
          titre: "Calculer la valeur d'une expression",
          comment: "Pour calculer la valeur d'une expression, il suffit de remplacer la lettre par sa valeur. Ensuite, on effectue le calcul.",
          exemple: "Si l'on a l'expression '5x' et que 'x = 3', on remplace 'x' par '3', ce qui donne 5 × 3 = 15."
        }
      ],

      exemple: "Le perimetre d'un triangle equilateral (3 cotes egaux) de cote 'c' est '3c'.",

      exercices: [
        {
          type: "debutant",
          question: "Simplifie l'expression '7 × a'.",
          points: 10,
          interactif: true,
          typeExercice: "saisie",
          reponse: "7a"
        },
        {
          type: "intermediaire",
          question: "Calcule la valeur de l'expression '3x + 5' si 'x = 4'.",
          points: 15,
          interactif: true,
          typeExercice: "calcul",
          reponse: 17,
          solutionDetaillee: "3 × 4 + 5 = 12 + 5 = 17."
        },
        {
          type: "avance",
          question: "Un rectangle a une longueur 'l' et une largeur de 3 cm. Ecris l'expression simplifiee de son perimetre.",
          points: 20,
          interactif: true,
          typeExercice: "saisie",
          reponse: "2l + 6",
          solutionDetaillee: "Perimetre = (l + 3) × 2 = 2 × l + 2 × 3 = 2l + 6."
        }
      ],

      miniQuiz: [
        {
          question: "Quel signe peut-on enlever dans '6 × b' ?",
          choix: [
            {"option": "Le plus (+)", "estCorrect": false, "feedback": "Non, il n'y a pas de '+' dans l'expression."},
            {"option": "Le moins (-)", "estCorrect": false, "feedback": "Non, il n'y a pas de '-' dans l'expression."},
            {"option": "Le signe '×' (fois)", "estCorrect": true, "feedback": "Bravo ! On peut l'enlever pour simplifier."},
            {"option": "Le signe '=' (egal)", "estCorrect": false, "feedback": "Non, il n'y a pas de '='."}
          ]
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Si a = 5, que vaut l'expression '2a' ?",
            choix: ["2 + 5", "2 × 5", "5 - 2", "5 / 2"],
            reponse: "2 × 5"
          },
          {
            question: "Comment simplifie-t-on l'expression '3 × (x + y)' ?",
            choix: ["3x + 3y", "3xy", "3x + y", "3(x + y)"],
            reponse: "3(x + y)"
          },
          {
            question: "Quelle est l'expression simplifiee du perimetre d'un carre de cote 'c' ?",
            choix: ["c²", "4 + c", "4c", "2c + 2c"],
            reponse: "4c"
          }
        ]
      },

      astuce: "Pense a une lettre comme si c'etait une boite qui peut contenir n'importe quel nombre. La lettre 'x' est juste une boite vide !",

      pieges: [
        {
          titre: "Oublier la multiplication",
          description: "N'oublie pas que '3x' veut dire '3 fois x'. C'est une multiplication cachee !"
        }
      ],

      defi: {
        titre: "Le defi du programme de calcul",
        description: "Un programme de calcul dit : 'Prends un nombre, ajoute 5, puis multiplie le resultat par 2.' Ecris ce programme en une expression litterale simple si le nombre est 'n'.",
        exemples: ["n + 5 × 2", "(n + 5) × 2", "2 × (n + 5)"],
        duree: 120,
        reponse: "(n + 5) × 2",
        solutionDetaillee: "On prend le nombre 'n', on ajoute 5 pour obtenir '(n + 5)'. On multiplie ensuite le resultat par 2, ce qui donne '(n + 5) × 2'."
      },

      utilite: "L'algebre est un langage pour exprimer des regles et des formules. Elle est indispensable en sciences, en economie, en informatique et pour resoudre des problemes complexes de la vie courante.",

      funFact: "Le mot 'algebre' vient du mot arabe 'al-jabr', qui signifie 'reunion des parties brisees'. C'est l'un des premiers livres de mathematiques ecrits il y a plus de 1000 ans !",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir utiliser des lettres pour representer des nombres' ?",
            options: ["🎉 Completement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semble le plus facile ?",
            options: [
              "🔍 Comprendre que les lettres sont des nombres",
              "✏️ Simplifier les expressions",
              "🤔 Calculer la valeur d'une expression",
              "💡 Faire la difference entre une expression et une equation"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a ete la plus grande difficulte pour toi ?",
            options: [
              "🔄 Comprendre la multiplication cachee",
              "🤔 Ne pas confondre x et le signe de multiplication",
              "⚖️ Resoudre les exercices de calcul",
              "🌟 Aucune difficulte particuliere"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser l'algebre dans ta vie de tous les jours ?",
            options: [
              "📝 Pour ecrire les formules de geometrie",
              "💰 Pour calculer le prix d'objets en promo",
              "🎮 Pour comprendre les scores d'un jeu video",
              "⚽ Pour trouver un resultat dans un jeu"
            ]
          }
        ]
      },

      // Maintien de la compatibilite avec l'ancien format
      description: "Utiliser des lettres pour representer des nombres et simplifier des expressions.",
      ressources: [
        { type: "video", titre: "Introduction a l'algebre", url: "https://www.youtube.com/watch?v=algebre" },
        { type: "exercice", titre: "Expressions litterales", url: "https://www.sesamath.net/" }
      ],
      quizId: "QUIZ_6_ALGEBRE"
    },
    {
      // COMPETENCE SIMPLE
      id: "6NC-ALG-2",
      titre: "Substitution et calcul",
      description: "Remplacer une lettre par sa valeur numerique dans une expression litterale et effectuer le calcul.",
      exemple: "Ex. : Si a = 3, alors 2a + 5 = 2 × 3 + 5 = 11",
      astuce: "Remplace toujours la lettre par sa valeur entre parentheses pour eviter les erreurs",
      ressources: [
        { type: "exercice", titre: "Calculs avec substitution", url: "https://www.maths-et-tiques.fr/" }
      ],
      quizId: "QUIZ_6_SUBSTITUTION"
    }
  ]
};

// Assign to window for browser compatibility
window.data = data;
