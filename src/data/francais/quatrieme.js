// Données de cours pour Français 4ème
export const francais4eme = [
  {
    niveau: "4ème",
    chapitre: "Lecture & compréhension",
    sousChapitre: "Littérature des siècles classiques",
    competences: [
      {
        id: "4LC-LC-1",
        titre: "Théâtre classique (Molière, Corneille)",
        description:
          "Comprendre les règles du théâtre classique ; analyser les caractères et les conflits.",
        exemple: "Ex. : 'L'Avare' → Harpagon obsédé par l'argent (caractère), conflit avec son fils.",
        astuce:
          "Théâtre classique = 3 unités (temps, lieu, action) + vraisemblance + bienséance.",
        ressources: [
          { type: "vidéo", titre: "Théâtre de Molière", url: "https://www.youtube.com/watch?v=mol123" },
          { type: "extraits", titre: "Scènes célèbres", url: "https://www.theatre-classique.fr/" }
        ],
        quizId: "QUIZ_4_THEATRE_CLASSIQUE"
      },
      {
        id: "4LC-LC-2",
        titre: "Poésie lyrique et engagée",
        description:
          "Distinguer poésie lyrique (sentiments) et engagée (idées) ; analyser registres et procédés.",
        exemple: "Ex. : Ronsard (amour) vs Hugo (politique) → registres différents.",
        astuce:
          "Lyrique = 'je' + sentiments ; engagée = critique sociale/politique + 'nous'.",
        ressources: [
          { type: "anthologie", titre: "Poèmes lyriques", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_4_POESIE_LYRIQUE"
      },
      {
        id: "4LC-LC-3",
        titre: "Épistolaire et mémoires",
        description:
          "Comprendre la lettre comme genre littéraire ; analyser l'autobiographie et les mémoires.",
        exemple: "Ex. : Lettres de Mme de Sévigné → intimité, style, témoignage d'époque.",
        astuce:
          "Lettre littéraire = vraie ou fictive, révèle caractère + époque + style personnel.",
        ressources: [
          { type: "extraits", titre: "Lettres célèbres", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_4_EPISTOLAIRE"
      }
    ]
  },
  {
    niveau: "4ème",
    chapitre: "Grammaire",
    sousChapitre: "Propositions subordonnées",
    competences: [
      {
        id: "4GR-PS-1",
        titre: "Propositions subordonnées relatives",
        description:
          "Identifier et utiliser les propositions relatives ; maîtriser les pronoms relatifs.",
        exemple: "Ex. : 'L'homme qui parle' (rel. sujet) vs 'L'homme que je vois' (rel. COD).",
        astuce:
          "Qui = sujet de la relative ; que = COD ; dont = complément du nom ('de qui/de quoi').",
        ressources: [
          { type: "exercice", titre: "Pronoms relatifs", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_4_RELATIVES"
      },
      {
        id: "4GR-PS-2",
        titre: "Propositions subordonnées conjonctives",
        description:
          "Distinguer complétives et circonstancielles ; comprendre les nuances de sens.",
        exemple: "Ex. : 'Je pense qu'il viendra' (complétive) vs 'Parce qu'il pleut' (circonstancielle).",
        astuce:
          "Complétive complète le verbe ; circonstancielle précise les circonstances (temps, cause...).",
        ressources: [
          { type: "fiches", titre: "Subordonnées conjonctives", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_4_CONJONCTIVES"
      },
      {
        id: "4GR-PS-3",
        titre: "Expression du temps et de la cause",
        description:
          "Utiliser correctement les expressions temporelles et causales ; varier les connecteurs.",
        exemple: "Ex. : temps (quand, lorsque, avant que) ; cause (parce que, puisque, car).",
        astuce:
          "Puisque = cause évidente ; parce que = cause expliquée ; car = justification.",
        ressources: [
          { type: "exercice", titre: "Connecteurs logiques", url: "https://www.ortholud.com/" }
        ],
        quizId: "QUIZ_4_TEMPS_CAUSE"
      }
    ]
  },
  {
    niveau: "4ème",
    chapitre: "Expression écrite",
    sousChapitre: "Argumentation développée",
    competences: [
      {
        id: "4EE-AD-1",
        titre: "Développer une argumentation",
        description:
          "Construire un paragraphe argumenté avec thèse, arguments, exemples et connecteurs logiques.",
        exemple: "Ex. : Faut-il interdire les téléphones au collège ? Thèse → 3 arguments + exemples.",
        astuce:
          "Plan : introduction (thèse) → arguments (d'abord, ensuite, enfin) → conclusion.",
        ressources: [
          { type: "modèles", titre: "Plans argumentatifs", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_4_ARGUMENTATION"
      },
      {
        id: "4EE-AD-2",
        titre: "Récit à visée argumentative",
        description:
          "Rédiger une fable ou un apologue ; faire passer un message à travers une histoire.",
        exemple: "Ex. : Inventer une fable moderne avec morale explicite ou implicite.",
        astuce:
          "Histoire simple + personnages typés + situation exemplaire = leçon universelle.",
        ressources: [
          { type: "exemples", titre: "Fables de La Fontaine", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_4_APOLOGUE"
      },
      {
        id: "4EE-AD-3",
        titre: "Compte-rendu et synthèse",
        description:
          "Résumer un texte en respectant les idées principales ; rédiger un compte-rendu objectif.",
        exemple: "Ex. : Résumer un article de journal en 10 lignes sans donner son avis.",
        astuce:
          "Garde les idées principales, supprime les détails, reste neutre, utilise tes mots.",
        ressources: [
          { type: "méthodes", titre: "Techniques résumé", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_4_SYNTHESE"
      }
    ]
  },
  {
    niveau: "4ème",
    chapitre: "Oral",
    sousChapitre: "Présentation et débat",
    competences: [
      {
        id: "4OR-PD-1",
        titre: "Exposé structuré",
        description:
          "Présenter un sujet de recherche avec plan clair, supports visuels et gestion du temps.",
        exemple: "Ex. : Exposé sur un auteur (10 min) : vie → œuvres → influence + diaporama.",
        astuce:
          "Introduction → plan annoncé → développement structuré → conclusion + ouverture.",
        ressources: [
          { type: "conseils", titre: "Techniques d'exposé", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_4_EXPOSE"
      },
      {
        id: "4OR-PD-2",
        titre: "Débat et discussion",
        description:
          "Participer à un débat en respectant les tours de parole ; argumenter en s'appuyant sur des faits.",
        exemple: "Ex. : Débat sur l'uniforme au collège → écouter, rebondir, argumenter.",
        astuce:
          "Écoute les autres, note les arguments, réponds précisément, reste poli et factuel.",
        ressources: [
          { type: "vidéo", titre: "Techniques de débat", url: "https://www.youtube.com/watch?v=deb123" }
        ],
        quizId: "QUIZ_4_DEBAT"
      },
      {
        id: "4OR-PD-3",
        titre: "Lecture expressive",
        description:
          "Lire un texte littéraire à voix haute en adaptant ton, rythme et intonation au sens.",
        exemple: "Ex. : Lire une scène de théâtre en différenciant les personnages par la voix.",
        astuce:
          "Comprends le texte d'abord, repère les émotions, varie ton/rythme, articule.",
        ressources: [
          { type: "audio", titre: "Lectures d'acteurs", url: "https://www.radiofrance.fr/" }
        ],
        quizId: "QUIZ_4_LECTURE_EXPRESSIVE"
      }
    ]
  },
  {
    niveau: "4ème",
    chapitre: "Histoire littéraire",
    sousChapitre: "Contextes et mouvements",
    competences: [
      {
        id: "4HL-CM-1",
        titre: "Siècle des Lumières",
        description:
          "Comprendre l'esprit des Lumières ; connaître Voltaire, Rousseau, Diderot et leurs idées.",
        exemple: "Ex. : Voltaire et la tolérance, Rousseau et l'éducation, Encyclopédie de Diderot.",
        astuce:
          "Lumières = raison contre obscurantisme, critique du pouvoir, foi dans le progrès.",
        ressources: [
          { type: "fiches", titre: "Philosophes des Lumières", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_4_LUMIERES"
      },
      {
        id: "4HL-CM-2",
        titre: "Contexte historique et littérature",
        description:
          "Relier les œuvres à leur époque ; comprendre l'influence de l'histoire sur la création.",
        exemple: "Ex. : Révolution française influence le romantisme (liberté, émotions).",
        astuce:
          "Contexte politique/social/culturel → thèmes littéraires → formes nouvelles.",
        ressources: [
          { type: "chronologie", titre: "Littérature et histoire", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_4_CONTEXTE_HISTORIQUE"
      },
      {
        id: "4HL-CM-3",
        titre: "Évolution des genres",
        description:
          "Observer l'évolution des formes littéraires ; comprendre les innovations stylistiques.",
        exemple: "Ex. : Du théâtre classique (règles strictes) au drame romantique (liberté).",
        astuce:
          "Chaque époque renouvelle les genres selon ses valeurs et ses goûts.",
        ressources: [
          { type: "comparaisons", titre: "Évolution littéraire", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_4_EVOLUTION_GENRES"
      }
    ]
  },
  {
    niveau: "4ème",
    chapitre: "Méthodologie",
    sousChapitre: "Analyse littéraire",
    competences: [
      {
        id: "4ME-AL-1",
        titre: "Commentaire de texte (initiation)",
        description:
          "Analyser un court extrait : comprendre, identifier procédés, interpréter effets.",
        exemple: "Ex. : Dans ce poème, comment le poète exprime-t-il la mélancolie ?",
        astuce:
          "1) Comprendre le sens 2) Repérer les procédés 3) Expliquer leur effet.",
        ressources: [
          { type: "méthodes", titre: "Analyse littéraire", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_4_COMMENTAIRE"
      },
      {
        id: "4ME-AL-2",
        titre: "Dissertation simple",
        description:
          "Répondre à une question littéraire en structurant sa réflexion avec des exemples précis.",
        exemple: "Ex. : La poésie doit-elle exprimer des sentiments ? (thèse, antithèse, synthèse)",
        astuce:
          "Question → problématique → plan dialectique → arguments + exemples littéraires.",
        ressources: [
          { type: "modèles", titre: "Méthode dissertation", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_4_DISSERTATION"
      },
      {
        id: "4ME-AL-3",
        titre: "Fiche de lecture approfondie",
        description:
          "Analyser une œuvre complète : résumé, personnages, thèmes, style, avis personnel.",
        exemple: "Ex. : Fiche sur 'Le Cid' : intrigue, héros cornélien, conflit honneur/amour.",
        astuce:
          "Plan type : auteur/contexte → résumé → analyse (personnages, thèmes) → avis argumenté.",
        ressources: [
          { type: "modèles", titre: "Fiches de lecture", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_4_FICHE_LECTURE"
      }
    ]
  }
];
