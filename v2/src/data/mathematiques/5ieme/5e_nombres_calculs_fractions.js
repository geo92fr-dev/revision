// Données spécifiques aux fractions pour la classe de 5ème
const fractions5eme = {
  niveau: "5eme",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Fractions",
  competences: [
    {
      id: "5NC-FR-1",
      titre: "Maîtriser le calcul avec les fractions",
      objectif:
        "Savoir simplifier, comparer, additionner et soustraire des fractions (mêmes et différents dénominateurs), multiplier une fraction par un entier, et passer d’une fraction à un décimal quand c’est possible.",

      cours:
        "Une fraction a la forme a/b (b ≠ 0). Deux fractions sont équivalentes si elles représentent la même quantité (ex. 1/2 = 2/4). " +
        "Pour comparer ou additionner/soustraire des fractions, on les met souvent au même dénominateur (PPCM). " +
        "On simplifie une fraction en divisant numérateur et dénominateur par un même nombre. " +
        "La multiplication d’une fraction par un entier consiste à multiplier le numérateur par cet entier. " +
        "Certaines fractions s’écrivent en décimal exact (ex. 1/4 = 0,25), d’autres non (ex. 1/3).",

      etapes: [
        {
          titre: "Simplifier une fraction",
          comment:
            "Chercher un diviseur commun au numérateur et au dénominateur et diviser les deux par ce nombre.",
          exemple: "Simplifier 12/18 : diviser par 6 → 2/3."
        },
        {
          titre: "Mettre au même dénominateur",
          comment:
            "Trouver le PPCM des dénominateurs et transformer chaque fraction en une fraction équivalente avec ce dénominateur.",
          exemple: "Pour 3/4 et 5/6 : PPCM(4,6)=12 → 3/4=9/12 et 5/6=10/12."
        },
        {
          titre: "Additionner / soustraire",
          comment:
            "Une fois au même dénominateur, additionner (ou soustraire) les numérateurs. Simplifier si possible.",
          exemple: "9/12 + 10/12 = 19/12 = 1 7/12."
        },
        {
          titre: "Multiplier par un entier",
          comment:
            "Multiplier le numérateur par l’entier, garder le dénominateur, puis simplifier si possible.",
          exemple: "3 × (5/8) = 15/8 = 1 7/8."
        },
        {
          titre: "Passer en décimal (si possible)",
          comment:
            "Effectuer la division numérateur ÷ dénominateur quand elle est finie (dénominateur de la forme 2^a × 5^b).",
          exemple: "1/8 = 0,125 ; 1/3 n’a pas d’écriture décimale finie."
        }
      ],

      exemple:
        "Recette : pour 6 personnes, il faut 3/4 de litre de lait. Pour 9 personnes (×1,5), il faut 1,5 × 3/4 = 3/8 × 3 ? Non → 3/4 × 1,5 = 9/8 = 1,125 L.",

      exercices: [
        {
          type: "débutant",
          question: "Simplifie la fraction 14/21",
          reponse: "2/3",
          points: 10
        },
        {
          type: "débutant",
          question: "Écris 1/4 en écriture décimale",
          reponse: "0,25",
          points: 10
        },
        {
          type: "intermédiaire",
          question: "Calcule : 3/5 + 2/5",
          reponse: "1",
          points: 15
        },
        {
          type: "intermédiaire",
          question: "Calcule : 5/6 − 1/4 (réponse simplifiée)",
          reponse: "7/12",
          points: 15
        },
        {
          type: "avancé",
          question: "Calcule : 2/3 + 3/10 (réponse simplifiée)",
          reponse: "29/30",
          points: 20
        },
        {
          type: "avancé",
          question: "Calcule : 4 × (7/12) (réponse simplifiée)",
          reponse: "7/3",
          points: 20
        }
      ],

      miniQuiz: [
        {
          question: "La fraction 12/18 simplifiée donne…",
          choix: ["4/6", "2/3", "3/5", "6/9"],
          reponse: "2/3",
          points: 10
        },
        {
          question: "Le PPCM de 4 et 6 est…",
          choix: ["8", "10", "12", "24"],
          reponse: "12",
          points: 10
        },
        {
          question: "3/4 + 5/6 = (forme irréductible)",
          choix: ["13/12", "19/12", "23/24", "1 2/3"],
          reponse: "19/12",
          points: 10
        },
        {
          question: "1/8 en écriture décimale vaut…",
          choix: ["0,8", "0,125", "0,18", "0,0125"],
          reponse: "0,125",
          points: 10
        },
        {
          question: "2/3 − 1/6 =",
          choix: ["1/2", "1/3", "2/9", "5/6"],
          reponse: "1/2",
          points: 10
        },
        {
          question: "On peut additionner 2/7 et 3/7 directement car…",
          choix: [
            "les numérateurs sont premiers",
            "les dénominateurs sont égaux",
            "les fractions sont déjà simplifiées",
            "2/7 = 3/7"
          ],
          reponse: "les dénominateurs sont égaux",
          points: 10
        },
        {
          question: "Multiplier 5/9 par 3 revient à…",
          choix: ["(5×3)/9", "5/(9×3)", "9/5 × 3", "5/9 + 3"],
          reponse: "(5×3)/9",
          points: 10
        },
        {
          question: "Laquelle n’a PAS d’écriture décimale finie ?",
          choix: ["1/2", "3/4", "1/5", "1/3"],
          reponse: "1/3",
          points: 10
        },
        {
          question: "7/10 − 1/2 =",
          choix: ["1/5", "1/10", "2/5", "1/2"],
          reponse: "1/5",
          points: 10
        },
        {
          question: "La forme irréductible de 15/35 est…",
          choix: ["3/7", "5/7", "3/5", "1/7"],
          reponse: "3/7",
          points: 10
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "La fraction 6/9 simplifiée vaut…",
            choix: ["2/3", "3/2", "1/3", "3/6"],
            reponse: "2/3"
          },
          {
            question:
              "Pour additionner 2/5 et 1/2, la première étape est de…",
            choix: [
              "multiplier les numérateurs",
              "mettre au même dénominateur",
              "additionner directement les numérateurs",
              "passer en décimal"
            ],
            reponse: "mettre au même dénominateur"
          },
          {
            question: "1/4 + 1/4 + 1/4 =",
            choix: ["1/2", "3/4", "1", "2/4"],
            reponse: "3/4"
          }
        ]
      },

      astuce:
        "Toujours simplifier le résultat final. Pense à vérifier la cohérence : une somme de deux fractions proches de 1/2 doit être proche de 1.",

      pieges: [
        {
          titre: "Addition sans même dénominateur",
          description:
            "Éviter d’additionner les numérateurs et dénominateurs séparément (ex. 1/2 + 1/3 ≠ 2/5)."
        },
        {
          titre: "Oublier de simplifier",
          description:
            "19/12 est correct, mais si possible, simplifie toujours. Parfois, le résultat peut être écrit en fraction mixte (1 7/12)."
        }
      ],

      defi: {
        titre: "Défi – Mélange de calculs",
        description:
          "Calcule en 60 s (réponse simplifiée) : 3/8 + 1/3 − 1/4",
        reponse: "13/24",
        duree: 60
      },

      utilite:
        "Les fractions modélisent des parts, des dosages, des échelles et interviennent en physique, cuisine, musique et informatique.",

      funFact:
        "Le mot 'fraction' vient du latin 'frangere' qui signifie 'briser'. Une fraction, c’est un nombre 'brisé' en parts !",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question:
              "As-tu atteint l’objectif : 'Calculer correctement avec des fractions' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas encore"]
          },
          {
            type: "facilite",
            question: "Qu’as-tu trouvé le plus facile ?",
            options: [
              "🔹 Simplifier",
              "🔹 Mettre au même dénominateur",
              "🔹 Additionner/Soustraire",
              "🔹 Passer en décimal"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a été ta plus grande difficulté ?",
            options: [
              "⚠️ Trouver le PPCM",
              "⚠️ Gérer plusieurs étapes",
              "⚠️ Vérifier/simplifier",
              "🌟 Aucune difficulté"
            ]
          },
          {
            type: "utilite",
            question: "Où penses-tu utiliser les fractions ?",
            options: [
              "🍰 Recettes de cuisine",
              "📏 Échelles et plans",
              "🎵 Musique (durées des notes)",
              "🧪 Proportions en sciences"
            ]
          }
        ]
      },

      description:
        "Maîtriser la simplification, la mise au même dénominateur et les opérations de base avec les fractions. Savoir passer en décimal quand c’est possible.",

      ressources: [
        {
          type: "vidéo",
          titre: "Addition et soustraction de fractions (pas à pas)",
          url: "https://www.youtube.com/watch?v=fractions-add-sub"
        },
        {
          type: "jeu",
          titre: "Jeu – Simplifier des fractions",
          url: "https://www.logicieleducatif.fr/"
        },
        {
          type: "fiche",
          titre: "Fiche d’exercices – Fractions (PDF)",
          url: "https://www.maths-et-tiques.fr/telechargement/fractions.pdf"
        }
      ],

      quizId: "QUIZ_5_FRACTIONS"
    }
  ]
};

// Exposition des données pour usage global (protection environnement navigateur)
if (typeof window !== "undefined") {
  window.fractions5eme = fractions5eme;
  // Debug
  console.log("🎯 Données 5e Fractions exposées :", {
    disponible: !!window.fractions5eme,
    titre: fractions5eme.competences?.[0]?.titre
  });
}

export default fractions5eme;
