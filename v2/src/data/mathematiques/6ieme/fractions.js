// Données spécifiques aux fractions pour la classe de 6ème
export const fractions6eme = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Fractions (bases)",
  competences: [
    {
      id: "6NC-FR-1",
      titre: "Comprendre les fractions",
      objectif: "Savoir lire, écrire et représenter une fraction.",

      cours: "Une fraction représente une partie d'un tout. Exemple : 3/4 signifie 3 parts sur 4 au total.",

      etapes: [
        {
          titre: "Identifier le numérateur et le dénominateur",
          comment: "Dans une fraction a/b, le nombre du haut (a) est le numérateur (parts prises), le nombre du bas (b) est le dénominateur (total de parts).",
          exemple: "dans 3/5, le numérateur est 3 et le dénominateur est 5."
        },
        {
          titre: "Représenter une fraction sur un schéma", 
          comment: "Dessine une figure (cercle, rectangle, barre) et divise-la en autant de parts égales que le dénominateur, puis colorie le nombre de parts indiqué par le numérateur.",
          exemple: "pour 2/3, divise en 3 parts et colorie 2 parts."
        },
        {
          titre: "Comparer et classer des fractions",
          comment: "Si même dénominateur, compare les numérateurs. Sinon, convertis au même dénominateur ou utilise les décimaux.",
          exemple: "2/5 < 3/5 car 2 < 3. Pour 1/2 vs 2/3, convertis : 3/6 vs 4/6, donc 1/2 < 2/3."
        }
      ],

      exemple: "Si tu manges 2 parts sur 8 d'un gâteau, tu as mangé 2/8, soit 1/4.",

      exercices: [
        { 
          type: "débutant", 
          question: "Dans 3/5, quel est le numérateur ?",
          reponse: "3",
          points: 10
        },
        { 
          type: "intermédiaire", 
          question: "Quelle fraction représente 3 parts sur 8 ?",
          reponse: "3/8",
          points: 15
        },
        { 
          type: "avancé", 
          question: "Calcule les 2/5 de 30 ?",
          reponse: "12",
          points: 20
        }
      ],

      miniQuiz: [
        {
          question: "Quelle fraction représente 2 parts sur 5 ?",
          choix: ["2/3", "5/2", "2/5", "1/2"],
          reponse: "2/5",
          points: 20
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Dans la fraction 7/9, quel est le dénominateur ?",
            choix: ["7", "9", "16", "2"],
            reponse: "9"
          },
          {
            question: "Que représente la fraction 3/4 ?",
            choix: ["3 + 4", "3 parts sur 4", "4 parts sur 3", "3 × 4"],
            reponse: "3 parts sur 4"
          },
          {
            question: "Si je colorie 2 carrés sur 5, quelle fraction cela représente-t-il ?",
            choix: ["5/2", "2/5", "3/5", "2/3"],
            reponse: "2/5"
          }
        ]
      },

      astuce: "Pour bien identifier une fraction, souviens-toi que le numérateur (en haut) indique combien de parts on prend, et le dénominateur (en bas) indique en combien de parts égales on divise le tout.",
      
      pieges: [
        {
          titre: "Piège classique",
          description: "Ne confonds pas 3/4 avec 4/3 ! Dans 3/4, on prend 3 parts sur 4. Dans 4/3, on prend 4 parts sur 3 (plus que le tout !)."
        }
      ],

      defi: {
        titre: "Défi fractions équivalentes",
        description: "Tu as 30 secondes pour trouver 3 fractions équivalentes à 2/3.",
        exemples: ["4/6", "6/9", "8/12", "10/15", "12/18", "14/21"],
        duree: 30
      },

      utilite: "Les fractions sont essentielles pour cuisiner, partager des objets, calculer des remises, comprendre les pourcentages et gérer son budget.",

      funFact: "Dans une étude américaine, 3 adultes sur 5 ont avoué qu'ils préféraient partager une pizza plutôt que des bonbons… mais 2 sur 5 ne savaient pas calculer 3/8 d'une pizza ! 🍕😂",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir lire, écrire et représenter une fraction' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semblé le plus facile ?",
            options: [
              "🔍 Identifier le numérateur et le dénominateur",
              "🎨 Représenter une fraction sur un schéma", 
              "💪 Faire les exercices interactifs",
              "💡 Comprendre le concept général"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a été la plus grande difficulté pour toi ?",
            options: [
              "🔄 Confondre numérateur et dénominateur",
              "🎨 Représenter visuellement les fractions",
              "⚖️ Comprendre les fractions équivalentes",
              "🌟 Aucune difficulté particulière"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser les fractions dans ta vie de tous les jours ?",
            options: [
              "🍕 Partager une pizza ou découper un gâteau",
              "🍫 Partager une tablette de chocolat",
              "⏰ Comprendre les heures (1/2 heure, 1/4 d'heure)",
              "⚽ Compter les buts dans un match (2 buts sur 3 tentatives)"
            ]
          }
        ],
        defispratiques: {
          cuisine: {
            scenario: "🍕 Tom commande une pizza de 12 parts. Il en mange 1/4 et sa sœur en mange 1/3. Combien de parts reste-t-il ?",
            aide: "1/4 de 12 = 3 parts, 1/3 de 12 = 4 parts",
            reponse: 5
          },
          chocolat: {
            scenario: "🍫 Marie a une tablette de 24 carreaux. Son petit frère a mangé 1/4 de la tablette. Combien de carreaux a-t-il mangés ?",
            aide: "1/4 de 24 = ?",
            reponse: 6
          },
          temps: {
            scenario: "⏰ Lisa fait ses devoirs pendant 3/4 d'heure. Combien cela fait-il en minutes ?",
            aide: "1 heure = 60 minutes",
            reponse: 45
          },
          sport: {
            scenario: "⚽ Dans un match, Paul tire 15 fois au but et marque 2/5 de ses tirs. Combien de buts a-t-il marqués ?",
            aide: "2/5 de 15 = ?",
            reponse: 6
          }
        }
      },

      // Maintien de la compatibilité avec l'ancien format
      description: "Interpréter a/b comme 'a parts sur b parts égales' ; relier fraction, partage et repérage sur une demi-droite graduée.",
      ressources: [
        { type: "vidéo", titre: "Découvrir les fractions", url: "https://www.youtube.com/watch?v=QY1G1Yr4gkI" },
        { type: "jeu", titre: "Fraction – parts de pizza", url: "https://www.logicieleducatif.fr/" }
      ],
      quizId: "QUIZ_6_FR_BASE"
    },
    {
      id: "6NC-FR-2",
      titre: "Fractions équivalentes et simplification",
      description: "Produire des fractions équivalentes en multipliant/divisant haut et bas par un même nombre. Réduire une fraction irréductible.",
      exemple: "Ex. : 6/8 = 3/4 ; 25/100 = 1/4.",
      astuce: "Divise par le plus grand facteur commun (PGCD) pour simplifier rapidement.",
      ressources: [
        { type: "exercice", titre: "Simplifier des fractions", url: "https://www.sesamath.net/" }
      ],
      quizId: "QUIZ_6_FR_EQUIV"
    },
    {
      id: "6NC-FR-3",
      titre: "Passer fraction ↔ décimal",
      description: "Convertir certaines fractions en écriture décimale (dénominateur 2, 4, 5, 10, 20, 25, 50, 100…) et inversement.",
      exemple: "Ex. : 3/4 = 0,75 ; 0,2 = 1/5.",
      astuce: "Cherche un dénominateur 10, 100, 1000… pour écrire en décimal facilement.",
      ressources: [
        { type: "vidéo", titre: "Fractions ↔ décimaux", url: "https://www.youtube.com/watch?v=Omc8Nxnz3tE" }
      ],
      quizId: "QUIZ_6_FR_DEC"
    }
  ]
};

export default fractions6eme;
