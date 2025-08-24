// Données de cours pour Mathématiques 6ème
export const mathematiques6eme = [
  {
    niveau: "6ème",
    chapitre: "Nombres & Calculs",
    sousChapitre: "Entiers & Décimaux",
    competences: [
      {
        id: "6NC-ED-1",
        titre: "Lire/écrire/comparer des nombres entiers",
        description:
          "Savoir lire, écrire en chiffres et en lettres et comparer des entiers en utilisant les ordres de grandeur (unités, dizaines, centaines…).",
        exemple: "Ex. : 4 582 < 45 820 car 4 582 a 4 milliers contre 45 820 qui en a 45.",
        astuce:
          "Compare d'abord le nombre de chiffres, puis les chiffres de gauche à droite.",
        ressources: [
          { type: "vidéo", titre: "Lire les grands nombres", url: "https://www.youtube.com/watch?v=uQKq0Urs1FQ" },
          { type: "exercice", titre: "Entiers – exercices", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_6_ED_COMPARER"
      },
      {
        id: "6NC-ED-2",
        titre: "Nombres décimaux : lecture et écriture",
        description:
          "Comprendre la virgule, distinguer partie entière et décimale, écrire un décimal sous différentes formes.",
        exemple: "Ex. : 12,45 = 12 + 0,45 = 12 + 45/100.",
        astuce:
          "La virgule sépare l'entier (à gauche) des dixièmes, centièmes… (à droite).",
        ressources: [
          { type: "vidéo", titre: "Décimaux (base)", url: "https://fr.khanacademy.org/math/arithmetic/arith-decimals" }
        ],
        quizId: "QUIZ_6_DEC_BASE"
      },
      {
        id: "6NC-ED-3",
        titre: "Arrondir et encadrer un nombre",
        description:
          "Savoir encadrer entre deux nombres consécutifs (entiers ou dixièmes, centièmes…) et arrondir au rang demandé.",
        exemple: "Ex. : 3,478 ≈ 3,48 au centième ; 3,478 ∈ [3,47 ; 3,48[ au centième.",
        astuce:
          "Regarde le chiffre juste à droite du rang demandé : 0–4 → on garde ; 5–9 → on augmente.",
        ressources: [
          { type: "fiches", titre: "Encadrement/arrondi", url: "https://www.maths-et-tiques.fr/" }
        ],
        quizId: "QUIZ_6_ARRONDIR"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Nombres & Calculs",
    sousChapitre: "Fractions (bases)",
    competences: [
      {
        id: "6NC-FR-1",
        titre: "Comprendre les fractions",
        objectif: "Savoir lire, écrire et représenter une fraction.",

        cours: "Une fraction représente une partie d'un tout. Exemple : 3/4 signifie 3 parts sur 4 au total.",

        etapes: [
          {
            titre: "Identifier le numérateur et le dénominateur",
            comment: "Dans une fraction a/b, le nombre du haut (a) est le numérateur (parts prises), le nombre du bas (b) est le dénominateur (total de parts).",
            exemple: "dans 3/5, le numérateur est 3 et le dénominateur est 5."
          },
          {
            titre: "Représenter une fraction sur un schéma", 
            comment: "Dessine une figure (cercle, rectangle, barre) et divise-la en autant de parts égales que le dénominateur, puis colorie le nombre de parts indiqué par le numérateur.",
            exemple: "pour 2/3, divise en 3 parts et colorie 2 parts."
          },
          {
            titre: "Comparer et classer des fractions",
            comment: "Si même dénominateur, compare les numérateurs. Sinon, convertis au même dénominateur ou utilise les décimaux.",
            exemple: "2/5 < 3/5 car 2 < 3. Pour 1/2 vs 2/3, convertis : 3/6 vs 4/6, donc 1/2 < 2/3."
          }
        ],

        exemple: "Si tu manges 2 parts sur 8 d'un gâteau, tu as mangé 2/8, soit 1/4.",

        exercices: [
          { type: "débutant", question: "Colorie 1/2 d'un rectangle." },
          { type: "intermédiaire", question: "Repère 3/4 sur une droite graduée." },
          { type: "avancé", question: "Calcule : 5/8 d'un gâteau de 32 parts." }
        ],

        miniQuiz: [
          {
            question: "Quelle fraction représente 2 parts sur 5 ?",
            choix: ["2/3", "5/2", "2/5", "1/2"],
            reponse: "2/5"
          }
        ],

        astuce: "Numérateur = parts prises. Dénominateur = parts totales.",
        pieges: ["Confondre numérateur et dénominateur"],

        defi: "Tu as 30 secondes pour trouver 3 fractions équivalentes à 2/3.",

        utilite: "Les fractions sont essentielles pour cuisiner, partager des objets, calculer des remises, comprendre les pourcentages et gérer son budget. Sans la maîtrise des fractions, tu auras des difficultés à suivre des recettes, gérer ton argent, calculer des remises ou comprendre des statistiques.",

        funFact: "Dans une étude américaine, 3 adultes sur 5 ont avoué qu'ils préféraient partager une pizza plutôt que des bonbons… mais 2 sur 5 ne savaient pas calculer 3/8 d'une pizza ! 🍕😂",

        // Maintien de la compatibilité avec l'ancien format
        description: "Interpréter a/b comme 'a parts sur b parts égales' ; relier fraction, partage et repérage sur une demi-droite graduée.",
        ressources: [
          { type: "vidéo", titre: "Découvrir les fractions", url: "https://www.youtube.com/watch?v=QY1G1Yr4gkI" },
          { type: "jeu", titre: "Fraction – parts de pizza", url: "https://www.logicieleducatif.fr/" }
        ],
        quizId: "QUIZ_6_FR_BASE"
      },
      {
        id: "6NC-FR-2",
        titre: "Fractions équivalentes et simplification",
        description:
          "Produire des fractions équivalentes en multipliant/divisant haut et bas par un même nombre. Réduire une fraction irréductible.",
        exemple: "Ex. : 6/8 = 3/4 ; 25/100 = 1/4.",
        astuce:
          "Divise par le plus grand facteur commun (PGCD) pour simplifier rapidement.",
        ressources: [
          { type: "exercice", titre: "Simplifier des fractions", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_6_FR_EQUIV"
      },
      {
        id: "6NC-FR-3",
        titre: "Passer fraction ↔ décimal",
        description:
          "Convertir certaines fractions en écriture décimale (dénominateur 2, 4, 5, 10, 20, 25, 50, 100…) et inversement.",
        exemple: "Ex. : 3/4 = 0,75 ; 0,2 = 1/5.",
        astuce:
          "Cherche un dénominateur 10, 100, 1000… pour écrire en décimal facilement.",
        ressources: [
          { type: "vidéo", titre: "Fractions ↔ décimaux", url: "https://www.youtube.com/watch?v=Omc8Nxnz3tE" }
        ],
        quizId: "QUIZ_6_FR_DEC"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Proportionnalité",
    sousChapitre: "Situations et tableaux",
    competences: [
      {
        id: "6PRO-1",
        titre: "Reconnaître une situation proportionnelle",
        description:
          "Identifier la proportionnalité (doublement, échelle constante, recette…); utiliser le raisonnement 'si je multiplie l'un, je multiplie l'autre'.",
        exemple: "Ex. : 2 kg → 6 € ; 5 kg → 15 € (×2,5).",
        astuce:
          "Teste le coefficient multiplicateur entre colonnes : s'il est constant, c'est proportionnel.",
        ressources: [
          { type: "exercice", titre: "Tableaux de proportionnalité", url: "https://www.mathenpoche.net/" }
        ],
        quizId: "QUIZ_6_PROP_BASE"
      },
      {
        id: "6PRO-2",
        titre: "Compléter un tableau de proportionnalité",
        description:
          "Utiliser le passage à l'unité ou le coefficient de proportionnalité pour compléter les cases manquantes.",
        exemple: "Ex. : 3 carnets → 9 € ; 1 carnet → 3 € ; 7 carnets → 21 €.",
        astuce:
          "Toujours chercher le prix/valeur pour 1 unité : c'est le plus simple.",
        ressources: [
          { type: "fiches", titre: "Passage à l'unité", url: "https://www.maths-et-tiques.fr/" }
        ],
        quizId: "QUIZ_6_PROP_TABLEAU"
      },
      {
        id: "6PRO-3",
        titre: "Pourcentages (initiation)",
        description:
          "Relier pourcentage et fraction de 100 ; calculer un pourcentage simple d'une quantité.",
        exemple: "Ex. : 20 % de 150 = 0,20 × 150 = 30.",
        astuce:
          "% = 'sur 100'. 15 % = 15/100 = 0,15.",
        ressources: [
          { type: "vidéo", titre: "Comprendre %", url: "https://www.youtube.com/watch?v=0o1b2w2o4ik" }
        ],
        quizId: "QUIZ_6_PROP_PCT"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Géométrie",
    sousChapitre: "Figures, périmètres, aires",
    competences: [
      {
        id: "6GEO-F-1",
        titre: "Reconnaître les figures planes usuelles",
        description:
          "Identifier triangle, carré, rectangle, losange, disque ; connaître quelques propriétés (angles droits, côtés parallèles…).",
        exemple: "Ex. : le rectangle a 4 angles droits et côtés opposés parallèles.",
        astuce:
          "Repère les indices 'angles droits' (équerre) et 'parallèles' (double flèche).",
        ressources: [
          { type: "outil", titre: "Géogebra – figures", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_6_FIGURES"
      },
      {
        id: "6GEO-F-2",
        titre: "Périmètres de figures simples",
        description:
          "Calculer le périmètre en additionnant les longueurs des côtés ; formules du carré et du rectangle.",
        exemple: "Ex. : P(rect) = 2×(L + l) ; P(carré) = 4×c.",
        astuce:
          "Le périmètre, c'est la 'bordure' de la figure : on fait le tour !",
        ressources: [
          { type: "fiches", titre: "Périmètres – entraînement", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_6_PERIMETRE"
      },
      {
        id: "6GEO-F-3",
        titre: "Aires de figures simples",
        description:
          "Utiliser les formules d'aire du rectangle (L×l), du carré (c×c) et du triangle (b×h÷2).",
        exemple: "Ex. : Aire d'un rectangle 5×3 = 15 cm².",
        astuce:
          "L'aire mesure la surface 'couverte' : s'exprime en unités carrées (cm², m²).",
        ressources: [
          { type: "vidéo", titre: "Aires – bases", url: "https://www.youtube.com/watch?v=0L3xZl1qfsc" }
        ],
        quizId: "QUIZ_6_AIRE"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Grandeurs & Mesures",
    sousChapitre: "Unités et conversions",
    competences: [
      {
        id: "6GM-1",
        titre: "Longueurs : unités et conversions",
        description:
          "Connaître mm, cm, dm, m, dam, hm, km ; convertir en utilisant ×10 ou ÷10 selon le passage d'une unité à l'autre.",
        exemple: "Ex. : 2,5 m = 250 cm ; 1 km = 1 000 m.",
        astuce:
          "Utilise une 'règle d'échelle' (tableau des unités) pour te déplacer d'un cran à l'autre.",
        ressources: [
          { type: "fiches", titre: "Conversions – longueurs", url: "https://www.maths-et-tiques.fr/" }
        ],
        quizId: "QUIZ_6_CONV_LONG"
      },
      {
        id: "6GM-2",
        titre: "Masses & capacités",
        description:
          "Convertir g, kg, t et mL, cL, dL, L ; relier 1 L = 1 dm³ ; résoudre de petits problèmes de recettes.",
        exemple: "Ex. : 1,25 kg = 1 250 g ; 750 mL = 0,75 L.",
        astuce:
          "Pense 'mille' : 1 kg = 1 000 g ; 1 L = 1 000 mL.",
        ressources: [
          { type: "exercice", titre: "Masses/Capacités", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_6_CONV_MC"
      },
      {
        id: "6GM-3",
        titre: "Durées et calculs d'horaires",
        description:
          "Lire l'heure, convertir heures ↔ minutes ↔ secondes, calculer des durées (départs/arrivées).",
        exemple: "Ex. : de 14h35 à 16h10 → 1h35.",
        astuce:
          "60 min = 1 h ; fais une frise du temps pour éviter les erreurs.",
        ressources: [
          { type: "outil", titre: "Frises temporelles", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_6_DUREES"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Organisation des données",
    sousChapitre: "Tableaux & graphiques",
    competences: [
      {
        id: "6OD-1",
        titre: "Lire et compléter un tableau",
        description:
          "Organiser des données en lignes/colonnes ; repérer des effectifs et des totaux ; compléter des cases manquantes.",
        exemple: "Ex. : tableau des notes d'une classe (effectif par note).",
        astuce:
          "Surligne la ligne et la colonne de la case pour bien viser l'information.",
        ressources: [
          { type: "fiches", titre: "Lire un tableau", url: "https://www.mathenpoche.net/" }
        ],
        quizId: "QUIZ_6_TABLEAU"
      },
      {
        id: "6OD-2",
        titre: "Lire un graphique (barres, secteurs)",
        description:
          "Interpréter hauteurs d'un diagramme en barres, parts d'un diagramme circulaire ; comparer des catégories.",
        exemple: "Ex. : sport préféré : 12 basket, 8 foot, 5 danse.",
        astuce:
          "Lis l'échelle et l'unité d'abord : évite les contresens !",
        ressources: [
          { type: "vidéo", titre: "Lire des graphiques", url: "https://www.youtube.com/watch?v=8K0fK2xJ2rM" }
        ],
        quizId: "QUIZ_6_GRAPHIQUES"
      },
      {
        id: "6OD-3",
        titre: "Moyenne (initiation)",
        description:
          "Calculer la moyenne simple d'une liste de valeurs numériques ; interpréter le résultat.",
        exemple: "Ex. : (12 + 15 + 10 + 13)/4 = 12,5.",
        astuce:
          "Somme d'abord, divise ensuite par le nombre de valeurs.",
        ressources: [
          { type: "exercice", titre: "Moyennes – bases", url: "https://fr.khanacademy.org/" }
        ],
        quizId: "QUIZ_6_MOYENNE"
      }
    ]
  }
];
