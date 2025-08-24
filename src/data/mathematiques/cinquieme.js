// Données de cours pour Mathématiques 5ème
export const mathematiques5eme = [
  {
    niveau: "5ème",
    chapitre: "Nombres & Calculs",
    sousChapitre: "Relatifs, fractions & proportions",
    competences: [
      {
        id: "5NC-REL-1",
        titre: "Nombres relatifs : addition/soustraction",
        description:
          "Utiliser la droite graduée signée ; additionner/soustraire des relatifs (même signe/ signe différent).",
        exemple: "Ex. : (−5) + 7 = 2 ; 3 − (−4) = 7.",
        astuce:
          "Même signe → on additionne les valeurs ; signes opposés → on soustrait la plus petite de la plus grande et on garde le signe du plus grand en valeur absolue.",
        ressources: [
          { type: "vidéo", titre: "Relatifs – calculs", url: "https://www.youtube.com/watch?v=3Fq9h2bq7nY" }
        ],
        quizId: "QUIZ_5_RELATIFS"
      },
      {
        id: "5NC-FR-1",
        titre: "Fractions : addition/soustraction",
        description:
          "Additionner/soustraire des fractions de même puis de différents dénominateurs en passant au dénominateur commun.",
        exemple: "Ex. : 1/4 + 3/4 = 1 ; 2/3 − 1/6 = 1/2.",
        astuce:
          "Cherche le PPCM des dénominateurs pour aller plus vite.",
        ressources: [
          { type: "exercice", titre: "Sommes de fractions", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_5_FR_SOMMES"
      },
      {
        id: "5NC-PROP-1",
        titre: "Proportionnalité : pourcentages & échelles",
        description:
          "Utiliser coefficient de proportionnalité ; calculer des pourcentages ; lire une échelle de carte.",
        exemple: "Ex. : 15 % de 240 = 36 ; échelle 1:50 000 → 1 cm = 500 m.",
        astuce:
          "% → fraction sur 100 ; échelle → règle de trois.",
        ressources: [
          { type: "fiches", titre: "Pourcentages/echelles", url: "https://www.maths-et-tiques.fr/" }
        ],
        quizId: "QUIZ_5_PCT_ECHELLE"
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Géométrie",
    sousChapitre: "Triangles & quadrilatères",
    competences: [
      {
        id: "5GEO-T-1",
        titre: "Triangles particuliers et propriétés",
        description:
          "Reconnaître équilatéral, isocèle, rectangle ; propriétés d'angles et de côtés ; médiatrices/hauteurs (initiation).",
        exemple: "Ex. : triangle rectangle → un angle = 90°.",
        astuce:
          "Repère les indices (côtés égaux, angle droit) à l'équerre et au compas.",
        ressources: [
          { type: "outil", titre: "Construction triangles", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_5_TRIANGLES"
      },
      {
        id: "5GEO-Q-1",
        titre: "Quadrilatères : rectangle, losange, parallélogramme",
        description:
          "Propriétés (parallélisme, perpendiculaires, diagonales) ; critères de reconnaissance et de construction.",
        exemple: "Ex. : diagonales d'un rectangle se coupent en leur milieu et sont égales.",
        astuce:
          "Table mémo : 'RLPP' pour Rectangle/Losange/Parallélogramme/Propriétés.",
        ressources: [
          { type: "fiches", titre: "Quadrilatères – propriétés", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_5_QUAD"
      },
      {
        id: "5GEO-A-1",
        titre: "Aires usuelles (triangle, parallélogramme, disque)",
        description:
          "Consolider L×l, c² ; triangle = b×h/2 ; parallélogramme = b×h ; disque = πr².",
        exemple: "Ex. : disque r=3 → Aire = 9π.",
        astuce:
          "Repère la base et la hauteur perpendiculaire : c'est la clé des aires.",
        ressources: [
          { type: "vidéo", titre: "Aires – 5e", url: "https://www.youtube.com/watch?v=7kz8cU2tQbY" }
        ],
        quizId: "QUIZ_5_AIRES"
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Grandeurs & Mesures",
    sousChapitre: "Volumes & vitesses",
    competences: [
      {
        id: "5GM-V-1",
        titre: "Volumes : cube et pavé droit",
        description:
          "Calculer V = L×l×h ; unités de volume (cm³, m³) et lien capacités (1 L = 1 dm³).",
        exemple: "Ex. : 5×3×2 = 30 cm³ ; 2 L = 2 dm³.",
        astuce:
          "'Boîte' = produit des 3 dimensions.",
        ressources: [
          { type: "exercice", titre: "Volumes simples", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_5_VOLUMES"
      },
      {
        id: "5GM-V-2",
        titre: "Vitesses moyennes",
        description:
          "v = d/t ; conversions d'unités (km/h ↔ m/s).",
        exemple: "Ex. : 90 km en 1,5 h → 60 km/h ; 36 km/h = 10 m/s.",
        astuce:
          "×3,6 pour passer m/s → km/h ; ÷3,6 pour l'inverse.",
        ressources: [
          { type: "fiches", titre: "Vitesse/temps/distance", url: "https://www.maths-et-tiques.fr/" }
        ],
        quizId: "QUIZ_5_VITESSE"
      },
      {
        id: "5GM-P-1",
        titre: "Proportionnalité en mesures",
        description:
          "Résoudre des problèmes de recettes, échelles, agrandissements par proportionnalité.",
        exemple: "Ex. : Recette ×1,5 : multiplier chaque ingrédient par 1,5.",
        astuce:
          "Dresse un tableau 'quantité – coefficient'.",
        ressources: [
          { type: "exercice", titre: "Problèmes de proportionnalité", url: "https://www.mathenpoche.net/" }
        ],
        quizId: "QUIZ_5_PROP_MESURES"
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Organisation des données",
    sousChapitre: "Statistiques (bases)",
    competences: [
      {
        id: "5OD-S-1",
        titre: "Effectifs, fréquences, diagrammes",
        description:
          "Lire/produire tableaux d'effectifs, fréquences ; tracer diagrammes en barres et circulaires.",
        exemple: "Ex. : 12/30 → fréquence = 40 %.",
        astuce:
          "Fréquence = effectif ÷ total ; ×100 pour le %.",
        ressources: [
          { type: "outil", titre: "Traceur de diagrammes", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_5_STATS_BASE"
      },
      {
        id: "5OD-S-2",
        titre: "Moyenne pondérée",
        description:
          "Calculer une moyenne avec coefficients (notes/coefficients).",
        exemple: "Ex. : (12×2 + 15×1)/(2+1) = 13.",
        astuce:
          "Pense 'tout mettre au même dénominateur' : somme pondérée ÷ somme des poids.",
        ressources: [
          { type: "fiches", titre: "Moyenne pondérée", url: "https://fr.khanacademy.org/" }
        ],
        quizId: "QUIZ_5_MOY_POND"
      },
      {
        id: "5OD-P-1",
        titre: "Probabilités simples",
        description:
          "Expériences aléatoires, issues, événements ; probabilité d'un événement simple (cas équiprobables).",
        exemple: "Ex. : pile ou face → 1/2 ; dé équilibré → P(6) = 1/6.",
        astuce:
          "Compte les cas favorables / cas possibles.",
        ressources: [
          { type: "jeu", titre: "Simuler des dés", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_5_PROBA_BASE"
      }
    ]
  }
];
