// Données de cours pour Anglais 5ème
export const anglais5eme = [
  {
    niveau: "5ème",
    chapitre: "Grammar Intermediate",
    sousChapitre: "Tenses & structures",
    competences: [
      {
        id: "5GI-TS-1",
        titre: "Past simple & continuous",
        description: "Maîtriser le prétérit simple et progressif ; exprimer des actions passées.",
        exemple: "Ex. : I went to London (simple) vs I was walking when it started raining (continuous).",
        astuce: "Past simple = action terminée ; past continuous = action en cours dans le passé.",
        ressources: [
          { type: "vidéo", titre: "Past Tenses", url: "https://www.youtube.com/watch?v=past123" }
        ],
        quizId: "QUIZ_5_PAST_TENSES"
      },
      {
        id: "5GI-TS-2",
        titre: "Future forms (will, going to)",
        description: "Utiliser will et going to pour exprimer le futur selon le contexte.",
        exemple: "Ex. : I will help you (décision spontanée) vs I'm going to study (intention).",
        astuce: "Will = prédiction/promesse ; going to = intention/évidence.",
        ressources: [
          { type: "exercice", titre: "Future Forms", url: "https://www.englishpage.com/" }
        ],
        quizId: "QUIZ_5_FUTURE"
      },
      {
        id: "5GI-TS-3",
        titre: "Comparative & superlative",
        description: "Comparer et exprimer le superlatif avec les adjectifs courts et longs.",
        exemple: "Ex. : tall → taller → the tallest ; beautiful → more beautiful → the most beautiful.",
        astuce: "Court (+er/est) vs long (more/most) ; exceptions : good/better/best.",
        ressources: [
          { type: "fiches", titre: "Comparisons", url: "https://www.grammarly.com/" }
        ],
        quizId: "QUIZ_5_COMPARATIVES"
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Vocabulary Expansion",
    sousChapitre: "Thematic fields",
    competences: [
      {
        id: "5VE-TF-1",
        titre: "Travel & transportation",
        description: "Vocabulaire des voyages, transports et directions pour se déplacer.",
        exemple: "Ex. : plane, train, bus, car ; turn left, go straight, take the second right.",
        astuce: "Groupe les moyens de transport par environnement (air, land, sea).",
        ressources: [
          { type: "vocabulaire", titre: "Travel Words", url: "https://www.vocabulary.com/" }
        ],
        quizId: "QUIZ_5_TRAVEL"
      },
      {
        id: "5VE-TF-2",
        titre: "Food & restaurants",
        description: "Nourriture, boissons et expressions pour commander au restaurant.",
        exemple: "Ex. : I'd like a burger, please. What would you recommend? The bill, please.",
        astuce: "Apprends par catégories : starter, main course, dessert, drinks.",
        ressources: [
          { type: "dialogues", titre: "Restaurant English", url: "https://www.esl-lab.com/" }
        ],
        quizId: "QUIZ_5_FOOD"
      },
      {
        id: "5VE-TF-3",
        titre: "Hobbies & leisure activities",
        description: "Activités de loisir et expression des préférences détaillées.",
        exemple: "Ex. : I'm interested in photography. I enjoy playing basketball. I'm good at singing.",
        astuce: "Structures : be interested in + ing ; enjoy + ing ; be good at + ing.",
        ressources: [
          { type: "jeu", titre: "Hobbies Vocabulary", url: "https://www.eslgamesplus.com/" }
        ],
        quizId: "QUIZ_5_HOBBIES"
      }
    ]
  }
  // ... Autres chapitres (18 compétences au total)
];
