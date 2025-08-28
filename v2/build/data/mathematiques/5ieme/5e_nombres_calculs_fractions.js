// Donnees specifiques aux fractions pour la classe de 5eme
const fractions5eme = {
  niveau: "5eme",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Fractions",
  competences: [
    {
      id: "5NC-FR-1",
      titre: "Maitriser les operations avec les fractions",
      objectif: "Savoir additionner, soustraire, multiplier et diviser des fractions, les simplifier et les comparer.",

      cours: "Une fraction est un nombre qui s'ecrit sous la forme a/b ou a est le numerateur et b le denominateur. Pour additionner ou soustraire des fractions, il faut qu'elles aient le meme denominateur.",

      etapes: [
        {
          titre: "Simplifier une fraction",
          comment: "Pour simplifier une fraction, on divise le numerateur et le denominateur par leur PGCD.",
          exemple: "12/18 = 12÷6 / 18÷6 = 2/3"
        },
        {
          titre: "Additionner des fractions",
          comment: "Si les denominateurs sont identiques, on additionne les numerateurs. Sinon, on met au meme denominateur d'abord.",
          exemple: "1/4 + 1/6 = 3/12 + 2/12 = 5/12"
        },
        {
          titre: "Multiplier des fractions",
          comment: "On multiplie les numerateurs entre eux et les denominateurs entre eux.",
          exemple: "2/3 × 4/5 = 8/15"
        }
      ],

      exemple: "Si j'ai mange 1/4 d'une pizza et mon ami 1/3, ensemble nous avons mange 1/4 + 1/3 = 3/12 + 4/12 = 7/12 de la pizza.",

      exercices: [
        {
          type: "debutant",
          question: "Simplifie la fraction 6/9",
          reponse: "2/3",
          points: 10
        },
        {
          type: "intermediaire",
          question: "Calcule : 1/4 + 1/6",
          reponse: "5/12",
          points: 15
        },
        {
          type: "avance",
          question: "Calcule : 2/3 × 3/4",
          reponse: "1/2",
          points: 20
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "Le PPCM de 4 et 6 est...",
            choix: ["8", "10", "12", "24"],
            reponse: "12"
          },
          {
            question: "3/4 + 5/6 = (forme irreductible)",
            choix: ["13/12", "19/12", "23/24", "1 7/12"],
            reponse: "19/12"
          }
        ]
      },

      astuce: "Pour verifier ton calcul avec les fractions, tu peux les convertir en decimaux quand c'est possible.",

      pieges: [
        {
          titre: "Addition directe",
          description: "Attention ! On n'additionne pas 1/4 + 1/3 = 2/7. Il faut d'abord mettre au meme denominateur."
        }
      ],

      defi: {
        titre: "Le defi du patissier",
        description: "Un patissier utilise 2/3 de farine pour un gateau et 1/4 pour des cookies. Quelle fraction de farine utilise-t-il au total ?",
        reponse: "11/12",
        solutionDetaillee: "2/3 + 1/4 = 8/12 + 3/12 = 11/12"
      },

      utilite: "Les fractions sont partout : en cuisine pour les recettes, en musique pour les durees des notes, en geometrie pour les echelles...",

      funFact: "Le mot 'fraction' vient du latin 'fractus' qui signifie 'brise'. Une fraction, c'est comme un nombre 'brise' en morceaux !",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif sur les operations avec les fractions ?",
            options: ["Completement", "En grande partie", "Partiellement", "Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semble le plus facile ?",
            options: [
              "Simplifier les fractions",
              "Additionner/soustraire",
              "Multiplier",
              "Comparer les fractions"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a ete la plus grande difficulte ?",
            options: [
              "Trouver le meme denominateur",
              "Simplifier le resultat",
              "Memoriser les regles",
              "Aucune difficulte particuliere"
            ]
          },
          {
            type: "utilite",
            question: "Ou penses-tu utiliser les fractions ?",
            options: [
              "Recettes de cuisine",
              "Echelles et plans",
              "Musique (durees des notes)",
              "Proportions en sciences"
            ]
          }
        ]
      }
    }
  ]
};

// Exposition des donnees pour usage global (protection environnement navigateur)
if (typeof window !== "undefined") {
  window.fractions5eme = fractions5eme;
  // Debug
  console.log("Donnees 5e Fractions exposees :", {
    disponible: !!window.fractions5eme,
    titre: fractions5eme.competences?.[0]?.titre
  });
}

export default fractions5eme;
