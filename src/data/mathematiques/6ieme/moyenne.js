// Données spécifiques aux moyennes pour la classe de 6ème
export const moyenne6eme = {
  niveau: "6ème",
  chapitre: "Organisation et gestion de données",
  sousChapitre: "Calcul de la moyenne",
  competences: [
    {
      id: "6OGD-MOY-1",
      titre: "Calculer et interpréter une moyenne",
      objectif: "Savoir calculer la moyenne d'une série de données et l'utiliser pour représenter un ensemble de nombres.",

      cours: "La moyenne d'une série de nombres est le résultat du partage de leur somme totale de manière équitable. C'est un nombre qui 'résume' la série de données.",

      etapes: [
        {
          titre: "Additionner les valeurs",
          comment: "Pour calculer la moyenne, il faut d'abord additionner tous les nombres de la série.",
          exemple: "Pour les notes 12, 15 et 9, on calcule 12 + 15 + 9 = 36."
        },
        {
          titre: "Compter le nombre de valeurs",
          comment: "Ensuite, on compte combien il y a de nombres dans la série.",
          exemple: "Pour les notes 12, 15 et 9, il y a 3 notes."
        },
        {
          titre: "Effectuer la division",
          comment: "Pour trouver la moyenne, on divise la somme totale par le nombre de valeurs.",
          exemple: "Pour les notes 12, 15 et 9, on divise 36 par 3, ce qui donne 12. La moyenne est donc 12."
        }
      ],

      exemple: "Si tu as eu 10, 15 et 14 à trois contrôles, ta moyenne est (10 + 15 + 14) / 3 = 39 / 3 = 13. C'est la note que tu aurais eue si tu avais eu la même note à chaque contrôle.",

      exercices: [
        {
          type: "débutant",
          question: "Calcule la moyenne de ces nombres : 5, 8, 2.",
          points: 10,
          interactif: true,
          typeExercice: "saisie",
          reponse: 5,
          solutionDetaillee: "(5 + 8 + 2) / 3 = 15 / 3 = 5"
        },
        {
          type: "intermédiaire",
          question: "Tom a marqué 12 points au premier match, 18 au deuxième et 15 au troisième. Quelle est sa moyenne de points par match ?",
          points: 15,
          interactif: true,
          typeExercice: "saisie",
          reponse: 15,
          solutionDetaillee: "(12 + 18 + 15) / 3 = 45 / 3 = 15"
        },
        {
          type: "avancé",
          question: "Léa veut avoir une moyenne de 14 en maths. Elle a déjà eu 12 et 16. Quelle note doit-elle avoir au prochain contrôle pour atteindre 14 de moyenne ?",
          points: 20,
          interactif: true,
          typeExercice: "calcul",
          reponse: 14,
          solutionDetaillee: "La somme des 3 notes doit être 14 × 3 = 42. Les deux premières notes font 12 + 16 = 28. Il lui manque donc 42 - 28 = 14."
        }
      ],

      miniQuiz: [
        {
          question: "Pour calculer la moyenne de 5 nombres, je dois :",
          choix: [
            {"option": "Diviser la somme par 5", "estCorrect": true, "feedback": "Bravo ! On divise toujours la somme par le nombre de valeurs."},
            {"option": "Multiplier la somme par 5", "estCorrect": false, "feedback": "Non, on divise, on ne multiplie pas."},
            {"option": "Soustraire 5 à la somme", "estCorrect": false, "feedback": "Non, ça ne donnerait pas une moyenne."},
            {"option": "Faire la moyenne de la moyenne", "estCorrect": false, "feedback": "Non, c'est un piège !"}
          ]
        }
      ],

      preEvaluation: {
        questions: [
          {
            question: "La moyenne de 10 et 20 est :",
            choix: ["10", "15", "20", "30"],
            reponse: "15"
          },
          {
            question: "L'opération (3 + 5 + 4) ÷ 3 donne :",
            choix: ["12", "4", "3", "5"],
            reponse: "4"
          },
          {
            question: "La moyenne est-elle toujours un nombre entier ?",
            choix: ["Oui", "Non"],
            reponse: "Non"
          }
        ]
      },

      astuce: "La moyenne est un bon moyen de vérifier ton travail : si ta moyenne est de 10, il est probable que tu aies eu des notes autour de 10, pas 20 ou 5 !",

      pieges: [
        {
          titre: "Oublier de compter une valeur",
          description: "Si tu as 4 notes à additionner, n'oublie pas de diviser par 4, pas par 3 !"
        }
      ],

      defi: {
        titre: "Le défi du cuisinier",
        description: "Un chef a pesé les pommes de terre pour sa recette : 150g, 210g, 180g, 200g, 160g. Quelle est la masse moyenne d'une pomme de terre ?",
        exemples: ["(150 + 210 + 180 + 200 + 160) ÷ 5", "900 ÷ 5", "180g"],
        duree: 120,
        reponse: 180,
        solutionDetaillee: "La somme des masses est 150 + 210 + 180 + 200 + 160 = 900g. Il y a 5 pommes de terre. Donc la masse moyenne est 900 / 5 = 180g."
      },

      utilite: "La moyenne est utilisée partout : pour calculer une note, une température moyenne sur un mois, le nombre de buts marqués par un joueur, ou le budget moyen d'une dépense.",

      funFact: "Le mot 'moyenne' est lié au mot 'milieu'. Il signifie le milieu des valeurs ou la valeur centrale.",

      metacognition: {
        questions: [
          {
            type: "objectif",
            question: "Penses-tu avoir atteint l'objectif : 'Savoir calculer la moyenne' ?",
            options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
          },
          {
            type: "facilite",
            question: "Qu'est-ce qui t'a semblé le plus facile ?",
            options: [
              "🔍 Additionner les nombres",
              "✏️ Compter le nombre de valeurs",
              "🤔 Effectuer la division",
              "💡 Utiliser la moyenne dans un problème"
            ]
          },
          {
            type: "difficulte",
            question: "Quelle a été la plus grande difficulté pour toi ?",
            options: [
              "🔄 Comprendre ce qu'est la moyenne",
              "🤔 Faire le calcul de tête",
              "⚖️ Résoudre les problèmes avec une valeur manquante",
              "🌟 Aucune difficulté particulière"
            ]
          },
          {
            type: "utilite",
            question: "Comment pourrais-tu utiliser la moyenne dans ta vie de tous les jours ?",
            options: [
              "📝 Pour calculer la moyenne de mes notes",
              "💰 Pour estimer le prix moyen d'un article",
              "🎮 Pour suivre mon score moyen à un jeu vidéo",
              "🏃‍♀️ Pour calculer la vitesse moyenne en course à pied"
            ]
          }
        ]
      }
    }
  ]
};

export default moyenne6eme;