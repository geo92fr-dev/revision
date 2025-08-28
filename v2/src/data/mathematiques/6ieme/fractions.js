// Donnees specifiques aux fractions pour la classe de 6eme
const data = {
  niveau: "6eme",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Fractions (bases)",
  competences: [
    {
      id: "6NC-FR-1",
      titre: "Comprendre les fractions",
      objectif: "Savoir lire, ecrire et representer une fraction.",

      cours: "Une fraction represente une partie d'un tout. Exemple : 3/4 signifie 3 parts sur 4 au total.",

      etapes: [
        {
          titre: "Identifier le numerateur et le denominateur",
          comment: "Dans une fraction a/b, le nombre du haut (a) est le numerateur (parts prises), le nombre du bas (b) est le denominateur (total de parts).",
          exemple: "dans 3/5, le numerateur est 3 et le denominateur est 5."
        },
        {
          titre: "Representer une fraction sur un schema", 
          comment: "Dessine une figure (cercle, rectangle, barre) et divise-la en autant de parts egales que le denominateur, puis colorie le nombre de parts indique par le numerateur.",
          exemple: "pour 2/3, divise en 3 parts et colorie 2 parts."
        },
        {
          titre: "Comparer et classer des fractions",
          comment: "Si meme denominateur, compare les numerateurs. Sinon, convertis au meme denominateur ou utilise les decimaux.",
          exemple: "2/5 < 3/5 car 2 < 3. Pour 1/2 vs 2/3, convertis : 3/6 vs 4/6, donc 1/2 < 2/3."
        }
      ],

      exemple: "Si tu manges 2 parts sur 8 d'un gâteau, tu as mange 2/8, soit 1/4.",

      exercices: [
        { 
          type: "debutant", 
          question: "Dans 3/5, quel est le numerateur ?",
          reponse: "3",
          points: 10
        },
        { 
          type: "intermediaire", 
          question: "Quelle fraction represente 3 parts sur 8 ?",
          reponse: "3/8",
          points: 15
        },
        { 
          type: "avance", 
          question: "Calcule les 2/5 de 30 ?",
          reponse: "12",
          points: 20
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Dans la fraction 7/9, quel est le denominateur ?",
            choix: ["7", "9", "16", "2"],
            reponse: "9"
          },
          {
            question: "Que represente la fraction 3/4 ?",
            choix: ["3 + 4", "3 parts sur 4", "4 parts sur 3", "3 × 4"],
            reponse: "3 parts sur 4"
          },
          {
            question: "Si je colorie 2 carres sur 5, quelle fraction cela represente-t-il ?",
            choix: ["5/2", "2/5", "3/5", "2/3"],
            reponse: "2/5"
          }
        ]
      },

      astuce: "Pour bien identifier une fraction, souviens-toi que le numerateur (en haut) indique combien de parts on prend, et le denominateur (en bas) indique en combien de parts egales on divise le tout.",
      
      pieges: [
        {
          titre: "Piege classique",
          description: "Ne confonds pas 3/4 avec 4/3 ! Dans 3/4, on prend 3 parts sur 4. Dans 4/3, on prend 4 parts sur 3 (plus que le tout !)."
        }
      ],

      defi: {
        titre: "Defi fractions equivalentes",
        description: "Tu as 30 secondes pour trouver 3 fractions equivalentes a 2/3.",
        exemples: ["4/6", "6/9", "8/12", "10/15", "12/18", "14/21"],
        duree: 30
      },

      utilite: "Les fractions sont essentielles pour cuisiner, partager des objets, calculer des remises, comprendre les pourcentages et gerer son budget.",

      funFact: "Dans une etude americaine, 3 adultes sur 5 ont avoue qu'ils preferaient partager une pizza plutot que des bonbons… mais 2 sur 5 ne savaient pas calculer 3/8 d'une pizza ! 🍕😂",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir lire, ecrire et representer une fraction' ?",
            options: ["🎉 Completement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semble le plus facile ?",
            options: [
              "🔍 Identifier le numerateur et le denominateur",
              "🎨 Representer une fraction sur un schema", 
              "💪 Faire les exercices interactifs",
              "💡 Comprendre le concept general"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a ete la plus grande difficulte pour toi ?",
            options: [
              "🔄 Confondre numerateur et denominateur",
              "🎨 Representer visuellement les fractions",
              "⚖️ Comprendre les fractions equivalentes",
              "🌟 Aucune difficulte particuliere"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser les fractions dans ta vie de tous les jours ?",
            options: [
              "🍕 Partager une pizza ou decouper un gâteau",
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
            scenario: "🍫 Marie a une tablette de 24 carreaux. Son petit frere a mange 1/4 de la tablette. Combien de carreaux a-t-il manges ?",
            aide: "1/4 de 24 = ?",
            reponse: 6
          },
          temps: {
            scenario: "⏰ Lisa fait ses devoirs pendant 3/4 d'heure. Combien cela fait-il en minutes ?",
            aide: "1 heure = 60 minutes",
            reponse: 45
          },
          sport: {
            scenario: "⚽ Dans un match, Paul tire 15 fois au but et marque 2/5 de ses tirs. Combien de buts a-t-il marques ?",
            aide: "2/5 de 15 = ?",
            reponse: 6
          }
        }
      },

      // Maintien de la compatibilite avec l'ancien format
      description: "Interpreter a/b comme 'a parts sur b parts egales' ; relier fraction, partage et reperage sur une demi-droite graduee.",
      ressources: [
        { type: "video", titre: "Decouvrir les fractions", url: "https://www.youtube.com/watch?v=QY1G1Yr4gkI" },
        { type: "jeu", titre: "Fraction – parts de pizza", url: "https://www.logicieleducatif.fr/" }
      ]
    },
    {
      id: "6NC-FR-2",
      titre: "Fractions equivalentes et simplification",
      description: "Produire des fractions equivalentes en multipliant/divisant haut et bas par un meme nombre. Reduire une fraction irreductible.",
      exemple: "Ex. : 6/8 = 3/4 ; 25/100 = 1/4.",
      astuce: "Divise par le plus grand facteur commun (PGCD) pour simplifier rapidement.",
      ressources: [
        { type: "exercice", titre: "Simplifier des fractions", url: "https://www.sesamath.net/" }
      ]
    },
    {
      id: "6NC-FR-3",
      titre: "Passer fraction ↔ decimal",
      description: "Convertir certaines fractions en ecriture decimale (denominateur 2, 4, 5, 10, 20, 25, 50, 100…) et inversement.",
      exemple: "Ex. : 3/4 = 0,75 ; 0,2 = 1/5.",
      astuce: "Cherche un denominateur 10, 100, 1000… pour ecrire en decimal facilement.",
      ressources: [
        { type: "video", titre: "Fractions ↔ decimaux", url: "https://www.youtube.com/watch?v=Omc8Nxnz3tE" }
      ]
    }
  ]
};

// Assign to window for browser compatibility
window.data = data;
