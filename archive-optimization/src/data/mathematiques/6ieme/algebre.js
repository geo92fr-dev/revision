// Données spécifiques à l'Algèbre pour la classe de 6ème
export const algebre6eme = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Initiation à l'Algèbre",
  competences: [
    {
      id: "6NC-ALG-1",
      titre: "Comprendre les expressions littérales",
      objectif: "Savoir utiliser des lettres pour représenter des nombres et simplifier des expressions.",

      cours: "En algèbre, on utilise des lettres comme 'x' ou 'y' pour remplacer un nombre inconnu. Une expression qui contient des lettres est appelée 'expression littérale'.",

      etapes: [
        {
          titre: "Écrire une expression littérale",
          comment: "Pour écrire le périmètre d'un carré de côté 'c', on peut écrire 'c + c + c + c' ou '4 × c'.",
          exemple: "La formule pour l'aire d'un rectangle de longueur 'L' et de largeur 'l' est 'L × l'."
        },
        {
          titre: "Simplifier une expression",
          comment: "On peut simplifier l'écriture en enlevant le signe '×' entre un nombre et une lettre. On écrit '4c' au lieu de '4 × c'.",
          exemple: "L'expression '5 × a' se simplifie en '5a'. L'expression 'a × b' se simplifie en 'ab'."
        },
        {
          titre: "Calculer la valeur d'une expression",
          comment: "Pour calculer la valeur d'une expression, il suffit de remplacer la lettre par sa valeur. Ensuite, on effectue le calcul.",
          exemple: "Si l'on a l'expression '5x' et que 'x = 3', on remplace 'x' par '3', ce qui donne 5 × 3 = 15."
        }
      ],

      exemple: "Le périmètre d'un triangle équilatéral (3 côtés égaux) de côté 'c' est '3c'.",

      exercices: [
        {
          type: "débutant",
          question: "Simplifie l'expression '7 × a'.",
          points: 10,
          interactif: true,
          typeExercice: "saisie",
          reponse: "7a"
        },
        {
          type: "intermédiaire",
          question: "Calcule la valeur de l'expression '3x + 5' si 'x = 4'.",
          points: 15,
          interactif: true,
          typeExercice: "calcul",
          reponse: 17,
          solutionDetaillee: "3 × 4 + 5 = 12 + 5 = 17."
        },
        {
          type: "avancé",
          question: "Un rectangle a une longueur 'l' et une largeur de 3 cm. Écris l'expression simplifiée de son périmètre.",
          points: 20,
          interactif: true,
          typeExercice: "saisie",
          reponse: "2l + 6",
          solutionDetaillee: "Périmètre = (l + 3) × 2 = 2 × l + 2 × 3 = 2l + 6."
        }
      ],

      miniQuiz: [
        {
          question: "Quel signe peut-on enlever dans '6 × b' ?",
          choix: [
            {"option": "Le plus (+)", "estCorrect": false, "feedback": "Non, il n'y a pas de '+' dans l'expression."},
            {"option": "Le moins (-)", "estCorrect": false, "feedback": "Non, il n'y a pas de '-' dans l'expression."},
            {"option": "Le signe '×' (fois)", "estCorrect": true, "feedback": "Bravo ! On peut l'enlever pour simplifier."},
            {"option": "Le signe '=' (égal)", "estCorrect": false, "feedback": "Non, il n'y a pas de '='."}
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
            question: "Quelle est l'expression simplifiée du périmètre d'un carré de côté 'c' ?",
            choix: ["c²", "4 + c", "4c", "2c + 2c"],
            reponse: "4c"
          }
        ]
      },

      astuce: "Pense à une lettre comme si c'était une boîte qui peut contenir n'importe quel nombre. La lettre 'x' est juste une boîte vide !",

      pieges: [
        {
          titre: "Oublier la multiplication",
          description: "N'oublie pas que '3x' veut dire '3 fois x'. C'est une multiplication cachée !"
        }
      ],

      defi: {
        titre: "Le défi du programme de calcul",
        description: "Un programme de calcul dit : 'Prends un nombre, ajoute 5, puis multiplie le résultat par 2.' Écris ce programme en une expression littérale simple si le nombre est 'n'.",
        exemples: ["n + 5 × 2", "(n + 5) × 2", "2 × (n + 5)"],
        duree: 120,
        reponse: "(n + 5) × 2",
        solutionDetaillee: "On prend le nombre 'n', on ajoute 5 pour obtenir '(n + 5)'. On multiplie ensuite le résultat par 2, ce qui donne '(n + 5) × 2'."
      },

      utilite: "L'algèbre est un langage pour exprimer des règles et des formules. Elle est indispensable en sciences, en économie, en informatique et pour résoudre des problèmes complexes de la vie courante.",

      funFact: "Le mot 'algèbre' vient du mot arabe 'al-jabr', qui signifie 'réunion des parties brisées'. C'est l'un des premiers livres de mathématiques écrits il y a plus de 1000 ans !",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir utiliser des lettres pour représenter des nombres' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semblé le plus facile ?",
            options: [
              "🔍 Comprendre que les lettres sont des nombres",
              "✏️ Simplifier les expressions",
              "🤔 Calculer la valeur d'une expression",
              "💡 Faire la différence entre une expression et une équation"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a été la plus grande difficulté pour toi ?",
            options: [
              "🔄 Comprendre la multiplication cachée",
              "🤔 Ne pas confondre x et le signe de multiplication",
              "⚖️ Résoudre les exercices de calcul",
              "🌟 Aucune difficulté particulière"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser l'algèbre dans ta vie de tous les jours ?",
            options: [
              "📝 Pour écrire les formules de géométrie",
              "💰 Pour calculer le prix d'objets en promo",
              "🎮 Pour comprendre les scores d'un jeu vidéo",
              "⚽ Pour trouver un résultat dans un jeu"
            ]
          }
        ]
      },

      // Maintien de la compatibilité avec l'ancien format
      description: "Utiliser des lettres pour représenter des nombres et simplifier des expressions.",
      ressources: [
        { type: "vidéo", titre: "Introduction à l'algèbre", url: "https://www.youtube.com/watch?v=algebre" },
        { type: "exercice", titre: "Expressions littérales", url: "https://www.sesamath.net/" }
      ],
      quizId: "QUIZ_6_ALGEBRE"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6NC-ALG-2",
      titre: "Substitution et calcul",
      description: "Remplacer une lettre par sa valeur numérique dans une expression littérale et effectuer le calcul.",
      exemple: "Ex. : Si a = 3, alors 2a + 5 = 2 × 3 + 5 = 11",
      astuce: "Remplace toujours la lettre par sa valeur entre parenthèses pour éviter les erreurs",
      ressources: [
        { type: "exercice", titre: "Calculs avec substitution", url: "https://www.maths-et-tiques.fr/" }
      ],
      quizId: "QUIZ_6_SUBSTITUTION"
    }
  ]
};

export default algebre6eme;