// Données de cours pour Français 5ème
export const francais5eme = [
  {
    niveau: "5ème",
    chapitre: "Lecture & compréhension",
    sousChapitre: "Littérature médiévale",
    competences: [
      {
        id: "5LC-LM-1",
        titre: "Héros de la littérature médiévale",
        description:
          "Découvrir les figures héroïques du Moyen Âge (chevaliers, héros épiques) ; comprendre les valeurs chevaleresques.",
        exemple: "Ex. : Roland, Lancelot, Perceval → courage, loyauté, quête.",
        astuce:
          "Chevalier = guerrier noble avec code d'honneur (protect. faibles, loyauté au roi).",
        ressources: [
          { type: "vidéo", titre: "Héros médiévaux", url: "https://www.youtube.com/watch?v=med123" },
          { type: "fiches", titre: "Littérature courtoise", url: "https://www.reseau-canope.fr/" }
        ]
      },
      {
        id: "5LC-LM-2",
        titre: "Le roman de chevalerie",
        description:
          "Comprendre la structure du roman courtois ; identifier quête, épreuves, merveilleux.",
        exemple: "Ex. : Perceval cherche le Graal → départ, aventures, révélation.",
        astuce:
          "Schéma : héros part en quête → épreuves (physiques/morales) → révélation/échec.",
        ressources: [
          { type: "extraits", titre: "Chrétien de Troyes", url: "https://www.assistancescolaire.com/" }
        ]
      },
      {
        id: "5LC-LM-3",
        titre: "Comprendre le français ancien",
        description:
          "Lire des extraits en français ancien avec aide ; comprendre l'évolution de la langue.",
        exemple: "Ex. : 'moult' = beaucoup ; 'sire' = seigneur.",
        astuce:
          "Compare avec le français moderne, devine par le contexte, aide-toi des notes.",
        ressources: [
          { type: "lexique", titre: "Français ancien-moderne", url: "https://www.francaisfacile.com/" }
        ]
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Grammaire",
    sousChapitre: "Analyse de phrases",
    competences: [
      {
        id: "5GR-AP-1",
        titre: "Fonctions dans la phrase",
        description:
          "Identifier sujet, verbe, COD, COI, CC dans des phrases complexes ; différencier nature et fonction.",
        exemple: "Ex. : 'Pierre donne un livre à Marie' → Pierre (suj), donne (v), livre (COD), à Marie (COI).",
        astuce:
          "Nature = ce que c'est (nom, verbe...) ; Fonction = rôle dans la phrase (sujet, complément...).",
        ressources: [
          { type: "exercice", titre: "Analyse grammaticale", url: "https://www.francaisfacile.com/" }
        ]
      },
      {
        id: "5GR-AP-2",
        titre: "Propositions (initiation)",
        description:
          "Distinguer phrase simple et phrase complexe ; repérer proposition principale et subordonnée.",
        exemple: "Ex. : 'Je pense que tu as raison' → principale + subordonnée.",
        astuce:
          "Une proposition = un verbe conjugué ; 'que' introduit souvent une subordonnée.",
        ressources: [
          { type: "fiches", titre: "Phrases complexes", url: "https://www.assistancescolaire.com/" }
        ]
      },
      {
        id: "5GR-AP-3",
        titre: "Voix active et passive",
        description:
          "Transformer une phrase active en phrase passive et inversement ; comprendre le sens.",
        exemple: "Ex. : 'Le chat mange la souris' ↔ 'La souris est mangée par le chat'.",
        astuce:
          "Actif : sujet fait l'action ; Passif : sujet subit l'action (auxiliaire être + participe passé).",
        ressources: [
          { type: "exercice", titre: "Voix active/passive", url: "https://www.ortholud.com/" }
        ]
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Conjugaison",
    sousChapitre: "Temps composés",
    competences: [
      {
        id: "5CO-TC-1",
        titre: "Passé composé et plus-que-parfait",
        description:
          "Maîtriser la formation et l'emploi du passé composé et du plus-que-parfait ; choisir l'auxiliaire.",
        exemple: "Ex. : 'Il a mangé' (passé composé) vs 'Il avait mangé' (plus-que-parfait = antériorité).",
        astuce:
          "Être ou avoir + participe passé ; plus-que-parfait = action avant une autre action passée.",
        ressources: [
          { type: "vidéo", titre: "Temps composés", url: "https://www.youtube.com/watch?v=comp123" }
        ]
      },
      {
        id: "5CO-TC-2",
        titre: "Subjonctif présent (initiation)",
        description:
          "Reconnaître le subjonctif après certaines expressions ; former le subjonctif présent des verbes courants.",
        exemple: "Ex. : 'Il faut que tu viennes' → subjonctif après 'il faut que'.",
        astuce:
          "Subjonctif exprime doute, émotion, volonté... Souvent après 'que'.",
        ressources: [
          { type: "fiches", titre: "Subjonctif présent", url: "https://www.francaisfacile.com/" }
        ]
      },
      {
        id: "5CO-TC-3",
        titre: "Concordance des temps (base)",
        description:
          "Comprendre les relations temporelles entre propositions ; choisir le temps approprié.",
        exemple: "Ex. : 'Il dit qu'il viendra' vs 'Il a dit qu'il viendrait'.",
        astuce:
          "Principale au présent → futur dans subordonnée ; principale au passé → conditionnel.",
        ressources: [
          { type: "exercice", titre: "Concordance temps", url: "https://www.assistancescolaire.com/" }
        ]
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Expression écrite",
    sousChapitre: "Textes structurés",
    competences: [
      {
        id: "5EE-TS-1",
        titre: "Récit complexe et dialogue",
        description:
          "Intégrer du dialogue dans un récit ; utiliser correctement la ponctuation du dialogue.",
        exemple: "Ex. : – Bonjour, dit-il en souriant. – Bonjour, répondit-elle.",
        astuce:
          "Tiret pour chaque prise de parole, verbe de parole + façon de parler.",
        ressources: [
          { type: "fiches", titre: "Dialogue dans récit", url: "https://www.reseau-canope.fr/" }
        ]
      },
      {
        id: "5EE-TS-2",
        titre: "Portrait et description",
        description:
          "Rédiger un portrait nuancé (physique et moral) ; utiliser des figures de style simples.",
        exemple: "Ex. : 'Ses yeux brillaient comme des étoiles' (comparaison).",
        astuce:
          "Organise : aspect général → détails → caractère ; varie les expressions.",
        ressources: [
          { type: "exercice", titre: "Techniques descriptives", url: "https://www.francaisfacile.com/" }
        ]
      },
      {
        id: "5EE-TS-3",
        titre: "Argumentation simple",
        description:
          "Défendre une opinion avec des arguments et des exemples ; structurer sa pensée.",
        exemple: "Ex. : Pourquoi faut-il lire ? Arguments : culture, plaisir, vocabulaire...",
        astuce:
          "Thèse + 2-3 arguments + exemples + conclusion qui reprend l'idée principale.",
        ressources: [
          { type: "modèle", titre: "Plan argumentatif", url: "https://www.assistancescolaire.com/" }
        ]
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Vocabulaire",
    sousChapitre: "Enrichissement lexical",
    competences: [
      {
        id: "5VO-EL-1",
        titre: "Formation des mots",
        description:
          "Comprendre préfixes, suffixes, radicaux ; deviner le sens de mots nouveaux.",
        exemple: "Ex. : pré-voir, re-voir, prévi-sible → radical 'voir' + affixes.",
        astuce:
          "Décompose le mot : préfixe (avant) + radical (base) + suffixe (après).",
        ressources: [
          { type: "fiches", titre: "Morphologie lexicale", url: "https://www.francaisfacile.com/" }
        ]
      },
      {
        id: "5VO-EL-2",
        titre: "Champs lexicaux",
        description:
          "Identifier et utiliser les champs lexicaux ; enrichir son expression par la variété du vocabulaire.",
        exemple: "Ex. : champ lexical de la peur : angoisse, terreur, effroi, crainte...",
        astuce:
          "Groupe de mots autour d'un thème ; évite les répétitions en variant.",
        ressources: [
          { type: "exercice", titre: "Champs lexicaux", url: "https://www.ortholud.com/" }
        ]
      },
      {
        id: "5VO-EL-3",
        titre: "Figures de style courantes",
        description:
          "Identifier métaphore, comparaison, personnification ; comprendre leur effet.",
        exemple: "Ex. : 'La vie est un voyage' (métaphore) vs 'La vie comme un voyage' (comparaison).",
        astuce:
          "Comparaison = avec 'comme/tel que' ; métaphore = sans mot de comparaison.",
        ressources: [
          { type: "fiches", titre: "Figures de style", url: "https://www.assistancescolaire.com/" }
        ]
      }
    ]
  },
  {
    niveau: "5ème",
    chapitre: "Culture littéraire",
    sousChapitre: "Genres et références",
    competences: [
      {
        id: "5CL-GR-1",
        titre: "Genres littéraires",
        description:
          "Distinguer récit, théâtre, poésie ; connaître les caractéristiques de chaque genre.",
        exemple: "Ex. : théâtre = dialogue + didascalies ; poésie = vers + rimes.",
        astuce:
          "Récit = raconte ; théâtre = représente ; poésie = évoque par les mots/sons.",
        ressources: [
          { type: "vidéo", titre: "Genres littéraires", url: "https://www.youtube.com/watch?v=genre123" }
        ]
      },
      {
        id: "5CL-GR-2",
        titre: "Auteurs et œuvres patrimoniales",
        description:
          "Connaître quelques auteurs classiques et leurs œuvres principales adaptées au niveau.",
        exemple: "Ex. : Molière (théâtre), La Fontaine (fables), Chrétien de Troyes (romans).",
        astuce:
          "Associe auteur + époque + genre principal + œuvre célèbre.",
        ressources: [
          { type: "fiches", titre: "Auteurs patrimoniaux", url: "https://www.reseau-canope.fr/" }
        ]
      },
      {
        id: "5CL-GR-3",
        titre: "Mythes et légendes",
        description:
          "Découvrir les grands mythes (grec, romain) et légendes ; comprendre leur influence.",
        exemple: "Ex. : Odyssée d'Homère, légendes arthuriennes, mythe de Pandore.",
        astuce:
          "Mythe = récit fondateur d'une culture ; légende = histoire merveilleuse transmise.",
        ressources: [
          { type: "vidéo", titre: "Mythologie grecque", url: "https://www.youtube.com/watch?v=myth123" }
        ]
      }
    ]
  }
];
