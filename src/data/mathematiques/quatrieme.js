// Données de cours pour Mathématiques 4ème
export const mathematiques4eme = [
  {
    niveau: "4ème",
    chapitre: "Nombres & Calculs",
    sousChapitre: "Puissances, expressions, équations",
    competences: [
      {
        id: "4NC-PUI-1",
        titre: "Puissances d'un nombre (entier) – exposants ±",
        description:
          "Écrire avec 10^n, utiliser 10^−n pour les décimaux ; appliquer règles de calcul (produit/quotient de puissances).",
        exemple: "Ex. : 10^3 = 1000 ; 10^−2 = 0,01 ; 10^3×10^2 = 10^5.",
        astuce:
          "Même base → on additionne/soustrait les exposants (produit/quotient).",
        ressources: [
          { type: "vidéo", titre: "Puissances – rappel", url: "https://www.youtube.com/watch?v=K8y8mQ0b6F8" }
        ],
        quizId: "QUIZ_4_PUISSANCES"
      },
      {
        id: "4NC-EXP-1",
        titre: "Développer et factoriser",
        description:
          "Utiliser la distributivité simple et double pour développer ; repérer un facteur commun pour factoriser.",
        exemple: "Ex. : 3(x+2)=3x+6 ; ax+ay=a(x+y).",
        astuce:
          "Cherche d'abord les 'choses en commun' pour factoriser.",
        ressources: [
          { type: "exercice", titre: "Développer/factoriser", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_4_DEV_FACTO"
      },
      {
        id: "4NC-EQ-1",
        titre: "Équations du 1er degré (simples)",
        description:
          "Résoudre ax + b = c en isolant x par opérations inverses ; vérifier la solution.",
        exemple: "Ex. : 2x+5=15 → x=5.",
        astuce:
          "Fais 'l'inverse de ce qui est fait à x', dans l'ordre inverse.",
        ressources: [
          { type: "fiches", titre: "Équations – méthode", url: "https://fr.khanacademy.org/" }
        ],
        quizId: "QUIZ_4_EQUATIONS"
      }
    ]
  },
  {
    niveau: "4ème",
    chapitre: "Géométrie",
    sousChapitre: "Pythagore & Thalès (initiation)",
    competences: [
      {
        id: "4GEO-PYT-1",
        titre: "Théorème de Pythagore et réciproque",
        description:
          "Dans un triangle rectangle : a² + b² = c² (c côté opposé à l'angle droit). Réciproque pour reconnaître un triangle rectangle.",
        exemple: "Ex. : 3-4-5 → 3²+4²=5².",
        astuce:
          "Toujours identifier l'hypoténuse (côté le plus long, en face de 90°).",
        ressources: [
          { type: "outil", titre: "Triangulateur", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_4_PYTHAGORE"
      },
      {
        id: "4GEO-THA-1",
        titre: "Thalès (configurations de base)",
        description:
          "Reconnaître triangles en configuration de Thalès ; utiliser les rapports de longueurs pour calculs simples.",
        exemple: "Ex. : AB/AD = AC/AE si (BC)//(DE).",
        astuce:
          "Trace les parallèles en couleur pour 'voir' les triangles semblables.",
        ressources: [
          { type: "fiches", titre: "Thalès – bases", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_4_THALES"
      },
      {
        id: "4GEO-AG-1",
        titre: "Agrandissements et réductions",
        description:
          "Utiliser le coefficient d'agrandissement/réduction sur longueurs, périmètres, aires.",
        exemple: "Ex. : ×k → longueurs ×k ; aires ×k².",
        astuce:
          "Aire 'double dimension' → facteur au carré.",
        ressources: [
          { type: "vidéo", titre: "Homothéties – idées", url: "https://www.youtube.com/watch?v=pq8k9m_1wZQ" }
        ],
        quizId: "QUIZ_4_AGRANDIR"
      }
    ]
  },
  {
    niveau: "4ème",
    chapitre: "Grandeurs & Mesures",
    sousChapitre: "Cylindre, cône, sphère",
    competences: [
      {
        id: "4GM-1",
        titre: "Aire latérale et volume du cylindre",
        description:
          "Formules : V = πr²h ; Aire totale = 2πrh + 2πr² (selon contexte).",
        exemple: "Ex. : r=3, h=5 → V = 45π.",
        astuce:
          "Déroule la surface latérale : c'est un rectangle de dimensions 2πr par h.",
        ressources: [
          { type: "exercice", titre: "Cylindre – calculs", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_4_CYLINDRE"
      },
      {
        id: "4GM-2",
        titre: "Cône et sphère : formules clés",
        description:
          "V(cône) = (1/3)πr²h ; V(sphère) = 4/3 πr³ ; Aire(sphère) = 4πr².",
        exemple: "Ex. : r=2, h=9 → V(cône) = 12π ; V(sphère,r=3) = 36π.",
        astuce:
          "Le '1/3' du cône vient de la pyramide (même idée).",
        ressources: [
          { type: "fiches", titre: "Cône/Sphère – mémo", url: "https://www.maths-et-tiques.fr/" }
        ],
        quizId: "QUIZ_4_CONE_SPHERE"
      },
      {
        id: "4GM-3",
        titre: "Conversions de volumes et capacités",
        description:
          "Passer m³ ↔ dm³ ↔ cm³ et L ↔ mL ; relier 1 L = 1 dm³.",
        exemple: "Ex. : 0,75 L = 0,75 dm³ = 750 cm³.",
        astuce:
          "Tableau des unités cubiques : chaque 'pas' multiplie/divise par 1000.",
        ressources: [
          { type: "exercice", titre: "Conversions 3D", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_4_CONV_VOL"
      }
    ]
  },
  {
    niveau: "4ème",
    chapitre: "Organisation des données",
    sousChapitre: "Statistiques descriptives",
    competences: [
      {
        id: "4OD-1",
        titre: "Médiane, quartiles et étendue",
        description:
          "Ordonner des données ; déterminer Q1, médiane, Q3 ; calculer l'étendue.",
        exemple: "Ex. : médiane = valeur centrale ; étendue = max – min.",
        astuce:
          "Compter les effectifs cumulés aide à repérer les 25 %, 50 %, 75 %.",
        ressources: [
          { type: "outil", titre: "Boîtes à moustaches", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_4_STAT_CENTRALES"
      },
      {
        id: "4OD-2",
        titre: "Lire/produire histogrammes (initiation)",
        description:
          "Regrouper en classes ; lire/produire un histogramme simple (bases).",
        exemple: "Ex. : classes de tailles 5 unités ; aire des barres ∝ effectif.",
        astuce:
          "Vérifie l'échelle horizontale (bornes de classes) et verticale (effectifs).",
        ressources: [
          { type: "fiches", titre: "Histogrammes – bases", url: "https://fr.khanacademy.org/" }
        ],
        quizId: "QUIZ_4_HISTO"
      },
      {
        id: "4OD-3",
        titre: "Probabilités composées (bases)",
        description:
          "Expériences successives indépendantes ; produit des probabilités.",
        exemple: "Ex. : deux lancers de dé : P(6 puis 6) = 1/36.",
        astuce:
          "'Et' indépendant → on multiplie les probabilités.",
        ressources: [
          { type: "jeu", titre: "Simulateur multi-lancers", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_4_PROBA"
      }
    ]
  }
];
