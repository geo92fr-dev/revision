// Données spécifiques aux additions et soustractions pour la classe de 6ème
const data = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Addition et soustraction",
  competences: [{
    id: "6NC-AS-1",
    titre: "Maîtriser l'addition et la soustraction des nombres entiers et décimaux",
    objectif: "Savoir effectuer des additions et soustractions, y compris avec des nombres décimaux, et comprendre les techniques de calcul.",
    
    cours: "L'addition et la soustraction sont les opérations de base en mathématiques. Pour les nombres décimaux, il faut bien aligner les virgules pour poser correctement l'opération.",

    exercices: [
      {
        type: "débutant",
        question: "Calcule 25 + 17",
        reponse: "42",
        points: 10
      },
      {
        type: "intermédiaire", 
        question: "Calcule 12,5 - 7,8",
        reponse: "4,7",
        points: 15
      },
      {
        type: "avancé",
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
          question: "Penses-tu avoir atteint l'objectif : 'Savoir additionner et soustraire des nombres entiers et décimaux' ?",
          options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
        },
        {
          type: "facilite",
          question: "Qu'est-ce qui t'a semblé le plus facile ?",
          options: [
            "➕ Additionner des nombres entiers",
            "➖ Soustraire des nombres entiers", 
            "🔢 Additionner des nombres décimaux",
            "📐 Aligner correctement les chiffres"
          ]
        },
        {
          type: "difficulte", 
          question: "Quelle a été la plus grande difficulté pour toi ?",
          options: [
            "🔄 Gérer les retenues",
            "📍 Placer correctement la virgule",
            "🤔 Aligner les chiffres",
            "🌟 Aucune difficulté particulière"
          ]
        },
        {
          type: "strategie",
          question: "Quelle stratégie utilises-tu pour calculer plus rapidement ?",
          options: [
            "🧮 Calcul mental avec décomposition",
            "📝 Je pose toujours l'opération",
            "🔢 J'utilise des nombres ronds",
            "💡 Je vérifie avec l'opération inverse"
          ]
        }
      ]
    },

    description: "Maîtriser l'addition et la soustraction des nombres entiers et décimaux.",
    ressources: [
      { type: "vidéo", titre: "Addition et soustraction", url: "https://www.youtube.com/watch?v=addition" },
      { type: "jeu", titre: "Calcul mental", url: "https://www.logicieleducatif.fr/" }
    ],
    quizId: "QUIZ_6_ADDITION_SOUSTRACTION"
  }]
};

export const additionSoustraction6eme = data;
export default data;
