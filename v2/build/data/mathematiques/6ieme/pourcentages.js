// Test nouveau cours - Pourcentages
// Cours de mathématiques 6ème

export const pourcentages6eme = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Pourcentages (initiation)",
  competences: [
    {
      id: "6NC-PC-1",
      titre: "Comprendre les pourcentages simples",
      objectif: "Savoir calculer et représenter des pourcentages de base (10%, 25%, 50%).",

      cours: "Un pourcentage exprime une proportion sur 100. Par exemple, 25% signifie 25 sur 100, soit 1/4.",

      etapes: [
        {
          titre: "Comprendre la notion de pourcentage",
          comment: "Un pourcentage est une fraction dont le dénominateur est 100. 25% = 25/100 = 1/4.",
          exemple: "25% de 200 = 25/100 × 200 = 50"
        },
        {
          titre: "Calculer des pourcentages simples",
          comment: "Pour les pourcentages courants, on peut utiliser des fractions : 50% = 1/2, 25% = 1/4, 10% = 1/10.",
          exemple: "50% de 60 = 60 ÷ 2 = 30"
        }
      ],

      exemple: "Dans une classe de 20 élèves, 25% sont absents. Cela fait 20 × 25/100 = 5 élèves absents.",

      exercices: [
        {
          type: "débutant",
          question: "Calcule 10% de 50 ?",
          reponse: "5",
          points: 10
        },
        {
          type: "intermédiaire", 
          question: "Calcule 25% de 80 ?",
          reponse: "20",
          points: 15
        },
        {
          type: "avancé",
          question: "Dans un magasin, un article coûte 60€. Il y a 20% de réduction. Quel est le nouveau prix ?",
          reponse: "48",
          points: 20
        }
      ],

      astuce: "Pour calculer rapidement : 10% = divise par 10, 25% = divise par 4, 50% = divise par 2.",

      utilite: "Les pourcentages sont partout : remises, notes, statistiques, taux d'intérêt...",

      funFact: "Le symbole % vient de l'italien 'per cento' qui signifie 'pour cent' ! 💯",

      description: "Calculer des pourcentages simples de quantités.",
      ressources: [
        { type: "vidéo", titre: "Les pourcentages", url: "https://www.youtube.com/watch?v=example" }
      ],
      quizId: "QUIZ_6_POURCENTAGES"
    }
  ]
};

export default pourcentages6eme;
