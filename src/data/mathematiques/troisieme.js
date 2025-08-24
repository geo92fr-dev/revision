// Données de cours pour Mathématiques 3ème
export const mathematiques3eme = [
  {
    niveau: "3ème",
    chapitre: "Algèbre & Fonctions",
    sousChapitre: "Équations, systèmes, fonctions affines",
    competences: [
      {
        id: "3ALG-EQ-1",
        titre: "Équations et inéquations du 1er degré",
        description:
          "Résoudre ax+b=c, a≠0 ; résoudre des inéquations simples et représenter leur ensemble de solutions sur une droite.",
        exemple: "Ex. : 3x−5>7 → x>4.",
        astuce:
          "On 'défait' les opérations autour de x dans l'ordre inverse ; attention au sens de l'inégalité si on multiplie/divise par un négatif.",
        ressources: [
          { type: "vidéo", titre: "Inéquations – rappel", url: "https://www.youtube.com/watch?v=N3F0g7V9j8k" }
        ],
        quizId: "QUIZ_3_INEQ"
      },
      {
        id: "3ALG-SYS-1",
        titre: "Systèmes de deux équations",
        description:
          "Résoudre un système 2×2 par substitution, combinaison ou lecture graphique.",
        exemple: "Ex. : {x+y=7 ; x−y=1} → x=4, y=3.",
        astuce:
          "Cherche la méthode qui simplifie le plus vite (éliminer une inconnue).",
        ressources: [
          { type: "fiches", titre: "Systèmes – méthodes", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_3_SYSTEMES"
      },
      {
        id: "3ALG-FCT-1",
        titre: "Fonctions linéaires et affines",
        description:
          "Reconnaître y=mx (linéaire) et y=mx+p (affine) ; lire pente et ordonnée à l'origine ; tracer et interpréter.",
        exemple: "Ex. : y=2x+3 : pente 2, coupe l'axe des ordonnées en 3.",
        astuce:
          "La pente m = 'variation verticale' / 'variation horizontale'.",
        ressources: [
          { type: "outil", titre: "Traceur graphique", url: "https://www.geogebra.org/graphing" }
        ],
        quizId: "QUIZ_3_FONCTIONS"
      }
    ]
  },
  {
    niveau: "3ème",
    chapitre: "Géométrie",
    sousChapitre: "Thalès, similitudes & trigonométrie",
    competences: [
      {
        id: "3GEO-THA-1",
        titre: "Thalès (configurations et applications)",
        description:
          "Utiliser la configuration de Thalès pour calculer des longueurs inconnues ; réciproque pour démontrer le parallélisme.",
        exemple: "Ex. : AB/AD = AC/AE = BC/DE si (BC)//(DE).",
        astuce:
          "Repère les triangles 'emboîtés' ; écris les rapports dans le même ordre.",
        ressources: [
          { type: "exercice", titre: "Thalès – 3e", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_3_THALES"
      },
      {
        id: "3GEO-SIM-1",
        titre: "Triangles semblables",
        description:
          "Critères de similitude ; utiliser le rapport de similitude pour calculer longueurs et aires.",
        exemple: "Ex. : si k=1,5 → longueurs ×1,5 ; aires ×(1,5)².",
        astuce:
          "Similitude = mêmes angles, côtés proportionnels.",
        ressources: [
          { type: "vidéo", titre: "Triangles semblables", url: "https://www.youtube.com/watch?v=8v7Y1p7dJ_8" }
        ],
        quizId: "QUIZ_3_SIMILITUDE"
      },
      {
        id: "3GEO-TRIGO-1",
        titre: "Trigonométrie dans le triangle rectangle",
        description:
          "Utiliser sin, cos, tan pour relier angles et côtés ; trouver un côté/angle ; passer par la calculatrice.",
        exemple: "Ex. : sin(θ)=opposé/hypoténuse ; cos(θ)=adjacent/hypoténuse ; tan(θ)=opposé/adjacent.",
        astuce:
          "'SOH-CAH-TOA' comme mémo : Sin=Opp/Hyp ; Cos=Adj/Hyp ; Tan=Opp/Adj.",
        ressources: [
          { type: "outil", titre: "Triangle interactif", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_3_TRIGO"
      }
    ]
  },
  {
    niveau: "3ème",
    chapitre: "Grandeurs & Mesures",
    sousChapitre: "Volumes & solides usuels",
    competences: [
      {
        id: "3GM-PR-1",
        titre: "Prismes et pyramides",
        description:
          "Calculer volumes/prismes droits (aire de base × hauteur) et pyramides (1/3 aire base × hauteur).",
        exemple: "Ex. : prisme base 8 cm², h=10 → V=80 cm³ ; pyramide même base → V=26,7 cm³.",
        astuce:
          "Pyramide = '1/3' du prisme de même base et hauteur.",
        ressources: [
          { type: "fiches", titre: "Volumes – prismes/pyramides", url: "https://www.maths-et-tiques.fr/" }
        ],
        quizId: "QUIZ_3_VOLS_PRYM"
      },
      {
        id: "3GM-CONV-1",
        titre: "Unités et conversions complexes",
        description:
          "Maîtriser conversions mixtes (aires/volumes/capacités) dans des problèmes concrets (débits, densités simples).",
        exemple: "Ex. : 2,3 m² = 23 000 cm² ; 1,5 L/min pendant 8 min → 12 L.",
        astuce:
          "Dessine une échelle d'unités et annote les '×10, ×100, ×1000'.",
        ressources: [
          { type: "exercice", titre: "Conversions – 3e", url: "https://www.sesamath.net/" }
        ],
        quizId: "QUIZ_3_CONV_COMPLEXES"
      },
      {
        id: "3GM-PCT-1",
        titre: "Pourcentages composés et intérêts simples",
        description:
          "Appliquer des pourcentages successifs ; calculer un intérêt simple sur une durée donnée.",
        exemple: "Ex. : +10 % puis −10 % ≠ 0 % ; I = C×t×n.",
        astuce:
          "Utilise le coefficient multiplicateur (1±t) pour enchaîner les variations.",
        ressources: [
          { type: "fiches", titre: "Variations & intérêts", url: "https://fr.khanacademy.org/" }
        ],
        quizId: "QUIZ_3_PCT_INTERETS"
      }
    ]
  },
  {
    niveau: "3ème",
    chapitre: "Organisation des données",
    sousChapitre: "Statistiques & probabilités",
    competences: [
      {
        id: "3OD-STAT-1",
        titre: "Statistiques : moyenne, médiane, écart-type (init)",
        description:
          "Réviser moyenne/médiane ; découvrir l'idée de dispersion (écart-type, sans formalisme lourd).",
        exemple: "Ex. : deux séries de même moyenne peuvent être plus ou moins 'étalées'.",
        astuce:
          "Regarde centre (tendance) et étalement (dispersion) pour comparer.",
        ressources: [
          { type: "vidéo", titre: "Médiane & dispersion", url: "https://www.youtube.com/watch?v=3b8Q9Bv3wAw" }
        ],
        quizId: "QUIZ_3_STAT_AVANCE"
      },
      {
        id: "3OD-PROBA-1",
        titre: "Probabilités : événements composés",
        description:
          "Calculer des probabilités d'événements avec 'et/ou', indépendance/schémas en arbre ; somme/produit selon les cas.",
        exemple: "Ex. : P(A et B indép.) = P(A)×P(B) ; P(A ou B) = P(A)+P(B)−P(A∩B).",
        astuce:
          "Fais un arbre de probabilités : tout devient plus clair.",
        ressources: [
          { type: "outil", titre: "Arbres de proba", url: "https://www.geogebra.org/" }
        ],
        quizId: "QUIZ_3_PROBA_COMPOSEES"
      },
      {
        id: "3OD-GRAPH-1",
        titre: "Lire/interpréter des graphiques complexes",
        description:
          "Interpréter des courbes, choisir la représentation adaptée (barres/histogrammes/secteurs) selon le type de données.",
        exemple: "Ex. : évolution d'une grandeur dans le temps → courbe.",
        astuce:
          "Toujours lire le titre, les axes et les unités avant d'interpréter.",
        ressources: [
          { type: "fiches", titre: "Choisir un graphique", url: "https://fr.khanacademy.org/" }
        ],
        quizId: "QUIZ_3_GRAPHIQUES"
      }
    ]
  }
];
