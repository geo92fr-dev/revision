// Données spécifiques à la multiplication pour la classe de 6ème
export const multiplication6eme = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Multiplication",
  competences: [
    {
      id: "6NC-MUL-1",
      titre: "Maîtriser la multiplication des nombres entiers et décimaux",
      objectif: "Savoir effectuer une multiplication, y compris avec des nombres décimaux, et comprendre la notion d'ordre de grandeur.",

      cours: "La multiplication est une addition répétée. Par exemple, 4 × 3, c'est comme 4 + 4 + 4. Quand on multiplie des nombres décimaux, il faut bien compter les chiffres après la virgule pour placer la virgule au bon endroit dans le résultat.",

      etapes: [
        {
          titre: "Multiplier des nombres entiers",
          comment: "Pour multiplier des nombres entiers, on peut poser l'opération en colonne ou utiliser sa calculatrice. Il faut bien connaître ses tables de multiplication !",
          exemple: "54 × 23 = 1242"
        },
        {
          titre: "Multiplier des nombres décimaux",
          comment: "On effectue la multiplication comme s'il n'y avait pas de virgule. Une fois le résultat obtenu, on compte le nombre total de chiffres après la virgule dans les deux nombres de départ pour placer la virgule au bon endroit.",
          exemple: "Pour 2,5 × 1,3, on calcule 25 × 13 = 325. Comme il y a 2 chiffres après la virgule au total (un dans 2,5 et un dans 1,3), on place la virgule dans le résultat pour avoir 2 chiffres après elle : 3,25."
        },
        {
          titre: "Estimer un ordre de grandeur",
          comment: "Pour vérifier ton résultat, tu peux estimer un ordre de grandeur en arrondissant les nombres. Par exemple, pour 2,5 × 1,3, on peut faire 3 × 1 = 3. Le résultat 3,25 est proche de 3, donc c'est plausible.",
          exemple: "L'ordre de grandeur de 49 × 11 est 50 × 10 = 500."
        }
      ],

      exemple: "Si un cahier coûte 2,50€, 3 cahiers coûteront 2,50 × 3 = 7,50€.",

      exercices: [
        {
          type: "débutant",
          question: "Calcule 15 × 6 ?",
          reponse: "90",
          points: 10
        },
        {
          type: "intermédiaire",
          question: "Calcule 3,2 × 4,1 ?",
          reponse: "13,12",
          points: 15
        },
        {
          type: "avancé",
          question: "Combien de mètres y a-t-il dans 3,5 kilomètres ?",
          reponse: "3500",
          points: 20
        }
      ],

      miniQuiz: [
        {
          question: "L'ordre de grandeur de 4,8 × 9,9 est :",
          choix: [
            {"option": "40", "estCorrect": false, "feedback": "Non, 4,8 est proche de 5 et 9,9 est proche de 10."},
            {"option": "50", "estCorrect": true, "feedback": "Bravo ! C'est bien 5 × 10 = 50."},
            {"option": "500", "estCorrect": false, "feedback": "Non, cela serait 50 × 10. Il faut bien regarder les ordres de grandeur."},
            {"option": "15", "estCorrect": false, "feedback": "Non, ce serait une addition, pas une multiplication."}
          ]
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Que vaut 9 × 7 ?",
            choix: ["56", "63", "72", "81"],
            reponse: "63"
          },
          {
            question: "Combien y a-t-il de chiffres après la virgule dans le résultat de 0,5 × 0,3 ?",
            choix: ["0", "1", "2", "3"],
            reponse: "2"
          },
          {
            question: "L'opération 6 + 6 + 6 est la même chose que :",
            choix: ["6 × 3", "6 × 6", "6 + 3", "18"],
            reponse: "6 × 3"
          }
        ]
      },

      astuce: "Pour multiplier par 10, 100, 1000..., on déplace la virgule vers la droite du nombre de zéros. Pour multiplier par 0,1, 0,01..., on la déplace vers la gauche.",

      pieges: [
        {
          titre: "Oublier la virgule",
          description: "Ne te précipite pas ! Compte bien le nombre total de chiffres après la virgule avant de placer la tienne. C'est l'erreur la plus courante."
        }
      ],

      defi: {
        titre: "Le défi du supermarché",
        description: "Achète 3,5 kg de pommes à 2,40€ le kg. Calcule le prix total sans utiliser de calculatrice.",
        reponse: 8.40,
        solutionDetaillee: "On calcule 35 × 24 = 840. Il y a 2 chiffres après la virgule au total (un dans 3,5 et un dans 2,4). On place donc la virgule : 8,40€."
      },

      utilite: "La multiplication est un raccourci pour l'addition. Elle te sert au quotidien pour faire tes courses, calculer un prix, ou convertir des unités de mesure.",

      funFact: "Le signe '×' pour la multiplication a été introduit par le mathématicien William Oughtred en 1631. Auparavant, les mathématiciens utilisaient des lettres ou des points pour indiquer une multiplication.",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir multiplier des nombres entiers et décimaux' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semblé le plus facile ?",
            options: [
              "🔍 Multiplier des nombres entiers",
              "✏️ Multiplier des nombres décimaux",
              "🤔 Estimer un ordre de grandeur",
              "💡 Revoir les tables de multiplication"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a été la plus grande difficulté pour toi ?",
            options: [
              "🔄 Placer la virgule dans les nombres décimaux",
              "🤔 Poser l'opération",
              "⚖️ Mémoriser les tables de multiplication",
              "🌟 Aucune difficulté particulière"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser la multiplication dans ta vie de tous les jours ?",
            options: [
              "💰 Pour faire les courses",
              "📏 Pour calculer une surface",
              "🎮 Pour comprendre les scores d'un jeu vidéo",
              "🏃‍♂️ Pour estimer une distance parcourue"
            ]
          }
        ]
      },

      // Maintien de la compatibilité avec l'ancien format
      description: "Maîtriser la multiplication des nombres entiers et décimaux, estimer des ordres de grandeur.",
      ressources: [
        { type: "vidéo", titre: "Tables de multiplication", url: "https://www.youtube.com/watch?v=multiplication" },
        { type: "jeu", titre: "Multiplication interactive", url: "https://www.logicieleducatif.fr/" }
      ],
      quizId: "QUIZ_6_MULTIPLICATION"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6NC-MUL-2",
      titre: "Tables de multiplication",
      description: "Mémoriser et utiliser les tables de multiplication de 1 à 10 pour des calculs rapides.",
      exemple: "Ex. : 7 × 8 = 56, 9 × 6 = 54",
      astuce: "Apprends d'abord les tables de 2, 5 et 10, puis les autres progressivement",
      ressources: [
        { type: "jeu", titre: "Tables en chanson", url: "https://www.youtube.com/watch?v=tables" }
      ],
      quizId: "QUIZ_6_TABLES"
    }
  ]
};

export default multiplication6eme;