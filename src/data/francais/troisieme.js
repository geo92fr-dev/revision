// Données de cours pour Français 3ème
export const francais3eme = [
  {
    niveau: "3ème",
    chapitre: "Lecture & compréhension",
    sousChapitre: "Littérature moderne et contemporaine",
    competences: [
      {
        id: "3LC-MC-1",
        titre: "Roman du XXe siècle",
        description:
          "Analyser les innovations du roman moderne ; comprendre l'évolution des techniques narratives.",
        exemple: "Ex. : 'L'Étranger' de Camus → narrateur détaché, absurde, style neutre.",
        astuce:
          "Roman moderne = nouveau point de vue, temps éclaté, psychologie complexe.",
        ressources: [
          { type: "extraits", titre: "Romans du XXe", url: "https://www.assistancescolaire.com/" },
          { type: "vidéo", titre: "Nouveau roman", url: "https://www.youtube.com/watch?v=rom123" }
        ],
        quizId: "QUIZ_3_ROMAN_MODERNE"
      },
      {
        id: "3LC-MC-2",
        titre: "Théâtre contemporain",
        description:
          "Découvrir le théâtre de l'absurde et moderne ; analyser la remise en cause des codes.",
        exemple: "Ex. : Ionesco, Beckett → personnages perdus, dialogue éclaté, situations absurdes.",
        astuce:
          "Théâtre moderne = rupture avec logique, communication impossible, dérision.",
        ressources: [
          { type: "extraits", titre: "Théâtre de l'absurde", url: "https://www.theatre-contemporain.net/" }
        ],
        quizId: "QUIZ_3_THEATRE_CONTEMPORAIN"
      },
      {
        id: "3LC-MC-3",
        titre: "Poésie engagée et moderne",
        description:
          "Comprendre l'engagement poétique ; analyser l'évolution de la forme poétique.",
        exemple: "Ex. : Éluard (Résistance), Prévert (quotidien), vers libres vs vers traditionnels.",
        astuce:
          "Poésie moderne = liberté formelle + engagement social/politique + langage quotidien.",
        ressources: [
          { type: "anthologie", titre: "Poésie XXe siècle", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_3_POESIE_ENGAGEE"
      }
    ]
  },
  {
    niveau: "3ème",
    chapitre: "Grammaire",
    sousChapitre: "Syntaxe complexe",
    competences: [
      {
        id: "3GR-SC-1",
        titre: "Analyse logique approfondie",
        description:
          "Maîtriser l'analyse complète de phrases complexes ; identifier toutes les fonctions.",
        exemple: "Ex. : 'Je pense que l'homme qui m'a parlé hier viendra demain' → 3 propositions.",
        astuce:
          "Repère d'abord les verbes conjugués, puis les liens entre propositions.",
        ressources: [
          { type: "exercices", titre: "Analyse syntaxique", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_3_ANALYSE_LOGIQUE"
      },
      {
        id: "3GR-SC-2",
        titre: "Modalisation et énonciation",
        description:
          "Comprendre les marques de subjectivité ; analyser situation d'énonciation et registres.",
        exemple: "Ex. : 'Il me semble que...' vs 'Il est certain que...' → degré de certitude.",
        astuce:
          "Repère qui parle, à qui, quand, comment (indices de subjectivité).",
        ressources: [
          { type: "fiches", titre: "Énonciation", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_3_ENONCIATION"
      },
      {
        id: "3GR-SC-3",
        titre: "Discours rapporté",
        description:
          "Maîtriser style direct, indirect, indirect libre ; comprendre les transformations.",
        exemple: "Ex. : Il dit : 'Je viendrai' → Il dit qu'il viendra → Il viendrait, pensa-t-il.",
        astuce:
          "Direct = guillemets ; indirect = 'que' + transformation ; indirect libre = fusion.",
        ressources: [
          { type: "exercices", titre: "Discours rapporté", url: "https://www.ortholud.com/" }
        ],
        quizId: "QUIZ_3_DISCOURS_RAPPORTE"
      }
    ]
  },
  {
    niveau: "3ème",
    chapitre: "Expression écrite",
    sousChapitre: "Préparation au lycée",
    competences: [
      {
        id: "3EE-PL-1",
        titre: "Dissertation littéraire",
        description:
          "Construire une dissertation complète avec problématique, plan détaillé et exemples littéraires.",
        exemple: "Ex. : 'Le théâtre doit-il seulement divertir ?' → problématique + plan dialectique.",
        astuce:
          "Introduction (accroche, sujet, problématique, plan) → développement → conclusion.",
        ressources: [
          { type: "méthodes", titre: "Dissertation complète", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_3_DISSERTATION"
      },
      {
        id: "3EE-PL-2",
        titre: "Commentaire composé",
        description:
          "Analyser un texte littéraire avec plan structuré, procédés précis et interprétation.",
        exemple: "Ex. : Commenter un sonnet → forme, registre, thème, procédés, effets.",
        astuce:
          "Démarche : comprendre → analyser (fond/forme) → interpréter → structurer.",
        ressources: [
          { type: "exemples", titre: "Commentaires types", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_3_COMMENTAIRE"
      },
      {
        id: "3EE-PL-3",
        titre: "Écriture d'invention",
        description:
          "Rédiger des textes créatifs en respectant les contraintes de genre et de registre.",
        exemple: "Ex. : Réécrire une scène au XXIe siècle, inventer un dialogue argumentatif.",
        astuce:
          "Respecte les codes du genre demandé, adapte style et registre à la situation.",
        ressources: [
          { type: "modèles", titre: "Écritures créatives", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_3_ECRITURE_INVENTION"
      }
    ]
  },
  {
    niveau: "3ème",
    chapitre: "Oral",
    sousChapitre: "Épreuve du brevet",
    competences: [
      {
        id: "3OR-EB-1",
        titre: "Présentation d'un projet",
        description:
          "Présenter un projet personnel avec supports, gérer les questions du jury.",
        exemple: "Ex. : Projet sur les femmes de lettres → recherches, supports, présentation 5 min.",
        astuce:
          "Structure : contexte → démarche → résultats → bilan personnel + anticipation questions.",
        ressources: [
          { type: "conseils", titre: "Oral de stage", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_3_ORAL_PROJET"
      },
      {
        id: "3OR-EB-2",
        titre: "Analyse d'image et document",
        description:
          "Décrire et analyser une œuvre artistique ; établir des liens avec les textes étudiés.",
        exemple: "Ex. : Analyser une affiche de guerre → description, analyse, lien avec poésie engagée.",
        astuce:
          "Description objective → analyse (techniques, sens) → interprétation + liens culturels.",
        ressources: [
          { type: "méthodes", titre: "Analyse d'image", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_3_ANALYSE_IMAGE"
      },
      {
        id: "3OR-EB-3",
        titre: "Entretien et argumentation orale",
        description:
          "Soutenir ses idées face à des questions ; rebondir sur les remarques du jury.",
        exemple: "Ex. : Défendre son choix de lecture cursive, expliquer ses goûts littéraires.",
        astuce:
          "Écoute bien, réponds précisément, assume tes choix, donne des exemples concrets.",
        ressources: [
          { type: "simulation", titre: "Entretien oral", url: "https://www.youtube.com/watch?v=oral123" }
        ],
        quizId: "QUIZ_3_ENTRETIEN"
      }
    ]
  },
  {
    niveau: "3ème",
    chapitre: "Histoire littéraire",
    sousChapitre: "Synthèse des mouvements",
    competences: [
      {
        id: "3HL-SM-1",
        titre: "Romantisme et réalisme",
        description:
          "Comprendre l'opposition/complémentarité entre romantisme et réalisme au XIXe siècle.",
        exemple: "Ex. : Hugo (émotion, idéal) vs Zola (observation, vérité sociale).",
        astuce:
          "Romantisme = sentiment, individualité ; réalisme = observation, société.",
        ressources: [
          { type: "synthèses", titre: "XIXe littéraire", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_3_ROMANTISME_REALISME"
      },
      {
        id: "3HL-SM-2",
        titre: "Modernité littéraire",
        description:
          "Identifier les ruptures du XXe siècle ; comprendre les avant-gardes.",
        exemple: "Ex. : Surréalisme (Éluard), Nouveau Roman (Robbe-Grillet), Théâtre absurde (Ionesco).",
        astuce:
          "XXe = expérimentation, remise en cause, multiplicité des esthétiques.",
        ressources: [
          { type: "panorama", titre: "Littérature XXe", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_3_MODERNITE"
      },
      {
        id: "3HL-SM-3",
        titre: "Littérature et société",
        description:
          "Analyser les liens entre littérature et contexte social ; comprendre la fonction de l'écrivain.",
        exemple: "Ex. : Écrivain témoin (Primo Levi), engagé (Sartre), contestataire (Céline).",
        astuce:
          "Littérature = miroir et acteur du social, de l'intime au politique.",
        ressources: [
          { type: "dossiers", titre: "Littérature engagée", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_3_LITTERATURE_SOCIETE"
      }
    ]
  },
  {
    niveau: "3ème",
    chapitre: "Préparation examens",
    sousChapitre: "Méthodologie avancée",
    competences: [
      {
        id: "3PE-MA-1",
        titre: "Gestion du temps et planification",
        description:
          "Organiser son travail de révision ; gérer le temps en épreuve écrite.",
        exemple: "Ex. : Brevet français 3h → 1h questions + 1h30 rédaction + 30min relecture.",
        astuce:
          "Planifie tes révisions, entraîne-toi en temps limité, garde du temps pour relire.",
        ressources: [
          { type: "planning", titre: "Organisation révisions", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_3_GESTION_TEMPS"
      },
      {
        id: "3PE-MA-2",
        titre: "Technique de l'analyse littéraire",
        description:
          "Maîtriser la méthode d'analyse : lecture, annotation, plan, rédaction.",
        exemple: "Ex. : Grille d'analyse → registre, procédés, structure, effets, interprétation.",
        astuce:
          "Méthode systématique : plusieurs lectures, prise de notes organisée, plan détaillé.",
        ressources: [
          { type: "grilles", titre: "Outils d'analyse", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_3_TECHNIQUE_ANALYSE"
      },
      {
        id: "3PE-MA-3",
        titre: "Culture générale et ouverture",
        description:
          "Mobiliser ses connaissances culturelles ; faire des liens entre œuvres et arts.",
        exemple: "Ex. : Relier un poème de Baudelaire à une peinture impressionniste.",
        astuce:
          "Liens chronologiques, thématiques, esthétiques entre littérature et autres arts.",
        ressources: [
          { type: "synthèses", titre: "Arts et littérature", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_3_CULTURE_GENERALE"
      }
    ]
  }
];
