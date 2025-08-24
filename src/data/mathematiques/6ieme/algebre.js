// Données spécifiques à l'algèbre pour la classe de 6ème
export const algebre6eme = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Expressions littérales",
  competences: [
    {
      id: "6NC-AL-1",
      titre: "Découvrir l'algèbre",
      objectif: "Comprendre ce qu'est une expression littérale et savoir la calculer.",

      cours: "Une expression littérale utilise des lettres pour représenter des nombres. Par exemple : 3x + 5 où x peut prendre différentes valeurs.",

      etapes: [
        {
          titre: "Comprendre les variables",
          comment: "Une lettre (comme x, y, a) représente un nombre que l'on ne connaît pas encore ou qui peut changer.",
          exemple: "dans 2x, si x = 3, alors 2x = 2 × 3 = 6."
        },
        {
          titre: "Calculer une expression",
          comment: "Pour calculer une expression littérale, on remplace chaque lettre par sa valeur et on fait les calculs.",
          exemple: "si x = 4, alors 3x + 1 = 3 × 4 + 1 = 12 + 1 = 13."
        },
        {
          titre: "Simplifier une expression",
          comment: "On peut regrouper les termes semblables pour simplifier l'écriture.",
          exemple: "2x + 3x = 5x (on additionne les coefficients)."
        }
      ],

      exemple: "Si tu achètes x bonbons à 2€ pièce, tu paies 2x euros au total.",

      exercices: [
        { 
          type: "débutant", 
          question: "Calcule 2x + 3 pour x = 5",
          points: 15,
          interactif: true,
          typeExercice: "calcul",
          reponse: 13,
          methode: "2 × 5 + 3"
        },
        { 
          type: "intermédiaire", 
          question: "Simplifie l'expression : 3a + 2a",
          points: 15,
          interactif: false
        },
        { 
          type: "avancé", 
          question: "Calcule 3x + 2y pour x = 4 et y = 1",
          points: 10,
          interactif: true,
          typeExercice: "calcul",
          reponse: 14,
          methode: "3 × 4 + 2 × 1"
        }
      ],

      miniQuiz: [
        {
          question: "Si x = 3, que vaut 4x ?",
          choix: ["7", "12", "4", "3"],
          reponse: "12",
          points: 20
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Dans l'expression 5y, que représente y ?",
            choix: ["Un nombre fixe", "Une variable", "Un résultat", "Une opération"],
            reponse: "Une variable"
          },
          {
            question: "Que vaut 2x si x = 6 ?",
            choix: ["8", "12", "2", "6"],
            reponse: "12"
          },
          {
            question: "Comment écrit-on 'trois fois un nombre n' ?",
            choix: ["3 + n", "3n", "n + 3", "n × n × n"],
            reponse: "3n"
          }
        ]
      },

      astuce: "Quand on écrit 3x, cela veut dire 3 × x. On ne met pas le signe × entre un nombre et une lettre.",
      
      pieges: [
        {
          titre: "Piège fréquent",
          description: "Attention ! 2x + 3x = 5x, mais 2x × 3x = 6x² (x au carré), pas 6x !"
        }
      ],

      defi: {
        titre: "Défi expressions équivalentes",
        description: "Tu as 30 secondes pour trouver 3 expressions équivalentes à 2x + 2x.",
        exemples: ["4x", "2(2x)", "x + x + x + x", "2x × 2"],
        duree: 30
      },

      utilite: "L'algèbre est partout : calculer le prix d'achats multiples, comprendre des formules scientifiques, programmer des jeux vidéo.",

      funFact: "Le mot 'algèbre' vient de l'arabe 'al-jabr' qui signifie 'réunion de parties brisées'. C'est aussi le nom d'un mathématicien perse du 9ème siècle ! 🧮✨",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Comprendre ce qu'est une expression littérale et savoir la calculer' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semblé le plus facile ?",
            options: [
              "🔍 Comprendre ce qu'est une variable",
              "🧮 Calculer des expressions simples", 
              "📝 Simplifier des expressions",
              "💡 Voir l'utilité de l'algèbre"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a été la plus grande difficulté pour toi ?",
            options: [
              "🔤 Comprendre le rôle des lettres",
              "🧮 Faire les calculs avec les variables",
              "📝 Simplifier les expressions",
              "🌟 Aucune difficulté particulière"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser l'algèbre dans ta vie de tous les jours ?",
            options: [
              "🛒 Calculer le prix de plusieurs objets identiques",
              "🎮 Comprendre les formules dans les jeux vidéo",
              "⚡ Utiliser des formules scientifiques",
              "💰 Calculer des économies ou des intérêts"
            ]
          }
        ],
        defispratiques: {
          shopping: {
            scenario: "🛒 Tu achètes x cahiers à 3€ pièce et y stylos à 2€ pièce. Si x = 5 et y = 3, combien paies-tu au total ?",
            aide: "Prix total = 3x + 2y",
            reponse: 21
          },
          jeu: {
            scenario: "🎮 Dans un jeu, tu gagnes 2n points par niveau et tu as 5 points de bonus. Si tu as fait 4 niveaux, combien as-tu de points ?",
            aide: "Points = 2n + 5 avec n = 4",
            reponse: 13
          },
          science: {
            scenario: "⚡ La distance parcourue est d = v × t. Si v = 15 m/s et t = 6 s, quelle distance parcours-tu ?",
            aide: "d = v × t",
            reponse: 90
          },
          argent: {
            scenario: "💰 Tu économises 5€ par semaine pendant s semaines. Après 8 semaines, combien as-tu économisé ?",
            aide: "Économies = 5s avec s = 8",
            reponse: 40
          }
        }
      }
    }
  ]
};

export default algebre6eme;
