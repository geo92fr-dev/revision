// Donnees specifiques aux additions et soustractions pour la classe de 6eme
const data = {
  niveau: "6eme",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Addition et soustraction",
  competences: [{
    id: "6NC-AS-1",
    titre: "Maitriser l'addition et la soustraction des nombres entiers et decimaux",
    objectif: "Savoir effectuer des additions et soustractions, y compris avec des nombres decimaux, et comprendre les techniques de calcul.",
    
    cours: "L'addition et la soustraction sont les operations de base en mathematiques. Pour les nombres decimaux, il faut bien aligner les virgules pour poser correctement l'operation.",

    exercices: [
      {
        type: "debutant",
        question: "Calcule 25 + 17",
        reponse: "42",
        points: 10
      },
      {
        type: "intermediaire", 
        question: "Calcule 12,5 - 7,8",
        reponse: "4,7",
        points: 15
      },
      {
        type: "avance",
        question: "Un livre coûte 12,50€ et un stylo 2,75€. Combien coûtent-ils ensemble ?",
        reponse: "15,25",
        points: 20
      }
    ],

    preEvaluation: [
      { question: "Combien font 25 + 15 ?", reponse: "40" },
      { question: "Combien font 100 - 37 ?", reponse: "63" },
      { question: "Combien font 4,5 + 2,3 ?", reponse: "6,8" }
    ],

    metacognition: {
      questions: [
        {
          type: "objectif",
          question: "Penses-tu avoir atteint l'objectif : 'Savoir additionner et soustraire des nombres entiers et decimaux' ?",
          options: ["🎉 Completement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
        },
        {
          type: "facilite",
          question: "Qu'est-ce qui t'a semble le plus facile ?",
          options: [
            "➕ Additionner des nombres entiers",
            "➖ Soustraire des nombres entiers", 
            "🔢 Additionner des nombres decimaux",
            "📐 Aligner correctement les chiffres"
          ]
        },
        {
          type: "difficulte", 
          question: "Quelle a ete la plus grande difficulte pour toi ?",
          options: [
            "🔄 Gerer les retenues",
            "📍 Placer correctement la virgule",
            "🤔 Aligner les chiffres",
            "🌟 Aucune difficulte particuliere"
          ]
        },
        {
          type: "strategie",
          question: "Quelle strategie utilises-tu pour calculer plus rapidement ?",
          options: [
            "🧮 Calcul mental avec decomposition",
            "📝 Je pose toujours l'operation",
            "🔢 J'utilise des nombres ronds",
            "💡 Je verifie avec l'operation inverse"
          ]
        }
      ]
    },

    description: "Maitriser l'addition et la soustraction des nombres entiers et decimaux.",
    ressources: [
      { type: "video", titre: "Addition et soustraction", url: "https://www.youtube.com/watch?v=addition" },
      { type: "jeu", titre: "Calcul mental", url: "https://www.logicieleducatif.fr/" }
    ],
    quizId: "QUIZ_6_ADDITION_SOUSTRACTION"
  }]
};

// Assign to window for browser compatibility
window.data = data;
