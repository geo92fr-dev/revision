// Données spécifiques aux additions et soustractions pour la classe de 6ème
export const additionSoustraction6eme = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "Addition et soustraction",
  competences: [
    {
      // COMPÉTENCE DÉTAILLÉE (première compétence)
      id: "6NC-AS-1",
      titre: "Addition d'entiers et de décimaux",
      objectif: "Savoir additionner des nombres entiers et décimaux en posant l'opération.",

      cours: "L'addition consiste à calculer la somme de plusieurs nombres. Pour bien poser une addition, il faut aligner les chiffres de même rang (unités sous unités, dizaines sous dizaines, etc.).",

      etapes: [
        {
          titre: "Poser l'addition d'entiers",
          comment: "Aligne les nombres par la droite, en plaçant unités sous unités, dizaines sous dizaines, etc.",
          exemple: "Pour 356 + 247 : place 6 sous 7, 5 sous 4, 3 sous 2."
        },
        {
          titre: "Gérer les retenues",
          comment: "Quand une somme dépasse 9, écris le chiffre des unités et reporte la dizaine au rang suivant.",
          exemple: "6 + 7 = 13, j'écris 3 et je retiens 1."
        },
        {
          titre: "Addition de décimaux",
          comment: "Aligne les virgules pour que les rangs décimaux correspondent (dixièmes sous dixièmes, etc.).",
          exemple: "Pour 12,5 + 7,38 : place 5 sous 8, puis 2 sous 3, virgule sous virgule."
        }
      ],

      exemple: "Pour additionner 123 + 456 : 123 + 456 = 579 (3+6=9, 2+5=7, 1+4=5)",

      exercices: [
        { 
          type: "débutant", 
          question: "Calcule 25 + 34 ?",
          reponse: "59",
          points: 10
        },
        { 
          type: "intermédiaire", 
          question: "Calcule 156 + 289 ?",
          reponse: "445", 
          points: 15
        },
        { 
          type: "avancé", 
          question: "Calcule 12,7 + 5,83 ?",
          reponse: "18,53",
          points: 20
        }
      ],

      astuce: "Pour vérifier ton addition, tu peux changer l'ordre des nombres : 25 + 34 = 34 + 25",
      
      utilite: "L'addition sert tous les jours : calculer ses courses, ses notes, compter sa monnaie, etc.",

      // Maintien de la compatibilité avec l'ancien format
      description: "Additionner des nombres entiers et décimaux en alignant correctement les chiffres et en gérant les retenues.",
      ressources: [
        { type: "vidéo", titre: "Poser une addition", url: "https://www.youtube.com/watch?v=addition" },
        { type: "exercice", titre: "Additions en ligne", url: "https://www.calculatice.net/" }
      ],
      quizId: "QUIZ_6_ADDITION"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6NC-AS-2", 
      titre: "Soustraction d'entiers et de décimaux",
      description: "Effectuer des soustractions en posant l'opération et en gérant les emprunts.",
      exemple: "Ex. : 543 - 278 = 265",
      astuce: "Vérifie ton résultat en faisant l'addition : 265 + 278 = 543",
      ressources: [
        { type: "vidéo", titre: "Poser une soustraction", url: "https://www.youtube.com/watch?v=soustraction" }
      ],
      quizId: "QUIZ_6_SOUSTRACTION"
    },
    {
      // COMPÉTENCE SIMPLE
      id: "6NC-AS-3",
      titre: "Résolution de problèmes",
      description: "Résoudre des problèmes de la vie courante impliquant additions et soustractions.",
      exemple: "Ex. : Pierre a 35 € et achète un livre à 12 €. Combien lui reste-t-il ?",
      astuce: "Identifie bien ce que tu cherches et quelle opération utiliser : ajouter ou retirer ?",
      ressources: [
        { type: "exercice", titre: "Problèmes du quotidien", url: "https://www.sesamath.net/" }
      ],
      quizId: "QUIZ_6_PROBLEMES_AS"
    }
  ]
};

export default additionSoustraction6eme;
