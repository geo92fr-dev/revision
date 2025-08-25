// Données de quiz générées automatiquement depuis Excel
// Version simplifiée pour les tests

export const quizData = {
  "mathematiques": {
    "6eme-nombres-calculs": [
      {
        "id": 1,
        "question": "Quel est le plus grand nombre parmi ces nombres ?",
        "reponses": [
          "1,45",
          "1,5", 
          "1,055",
          "1,6"
        ],
        "bonneReponse": 3,
        "explication": "1,6 est le plus grand car 1,6 > 1,5 > 1,45 > 1,055",
        "difficulte": "Facile",
        "points": 1
      },
      {
        "id": 2,
        "question": "Combien vaut 3/4 ?",
        "reponses": [
          "0,25",
          "0,75",
          "0,34", 
          "0,43"
        ],
        "bonneReponse": 1,
        "explication": "3/4 = 3 ÷ 4 = 0,75",
        "difficulte": "Moyen",
        "points": 2
      }
    ],
    "6eme-fractions": [
      {
        "id": 1,
        "question": "Quelle fraction est égale à 1/2 ?",
        "reponses": [
          "2/4",
          "3/5",
          "1/3",
          "2/3"
        ],
        "bonneReponse": 0,
        "explication": "2/4 = 1/2 car 2 ÷ 4 = 0,5 et 1 ÷ 2 = 0,5",
        "difficulte": "Facile",
        "points": 1
      }
    ]
  }
};

export const availableQuizzes = Object.keys(quizData.mathematiques);

// Functions pour la compatibilité
export const getUserQuizScores = (userId) => {
  return {};
};

export const getBestScore = (userId, quizId) => {
  return 0;
};

export const saveQuizScore = (userId, quizId, score) => {
  console.log(`Score sauvegardé: ${userId}, ${quizId}, ${score}`);
  return Promise.resolve();
};

export default quizData;
