// Données de cours pour Français 6ème
export const francais6eme = [
  {
    niveau: "6ème",
    chapitre: "Lecture & compréhension",
    sousChapitre: "Textes narratifs",
    competences: [
      {
        id: "6LC-TN-1",
        titre: "Comprendre un récit simple",
        description:
          "Identifier les personnages, le cadre (lieu/temps), les événements principaux d'un récit court.",
        exemple: "Ex. : Dans 'Le Petit Prince', identifier le narrateur (aviateur), le lieu (désert), la rencontre.",
        astuce:
          "Cherche QUI (personnages), OÙ (lieu), QUAND (époque), QUOI (action principale).",
        ressources: [
          { type: "vidéo", titre: "Structure du récit", url: "https://www.youtube.com/watch?v=abc123" },
          { type: "fiches", titre: "Éléments du récit", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_6_RECIT_SIMPLE"
      },
      {
        id: "6LC-TN-2",
        titre: "Les types de narrateur",
        description:
          "Distinguer narrateur à la 1ère personne (je) et à la 3ème personne (il/elle) ; comprendre le point de vue.",
        exemple: "Ex. : 'Je marchais' vs 'Il marchait' → qui raconte l'histoire ?",
        astuce:
          "1ère personne = personnage raconte ; 3ème personne = narrateur extérieur.",
        ressources: [
          { type: "exercice", titre: "Points de vue narratifs", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_6_NARRATEUR"
      },
      {
        id: "6LC-TN-3",
        titre: "Schéma narratif (initiation)",
        description:
          "Repérer situation initiale, élément perturbateur, péripéties, résolution dans un conte simple.",
        exemple: "Ex. : Cendrillon → vie difficile, bal, fuite, pantoufle, mariage.",
        astuce:
          "Début stable → problème → actions → solution → nouvelle situation.",
        ressources: [
          { type: "vidéo", titre: "Schéma narratif", url: "https://www.youtube.com/watch?v=def456" }
        ],
        quizId: "QUIZ_6_SCHEMA_NARRATIF"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Lecture & compréhension",
    sousChapitre: "Poésie",
    competences: [
      {
        id: "6LC-P-1",
        titre: "Lire un poème à voix haute",
        description:
          "Respecter les vers, la ponctuation, le rythme ; comprendre que le retour à la ligne n'est pas forcément une pause.",
        exemple: "Ex. : 'Il était un petit navire' → compter les syllabes, respecter la mélodie.",
        astuce:
          "Lis d'abord silencieusement, repère la ponctuation, puis lis à voix haute.",
        ressources: [
          { type: "audio", titre: "Récitations célèbres", url: "https://www.radiofrance.fr/" }
        ],
        quizId: "QUIZ_6_LECTURE_POEME"
      },
      {
        id: "6LC-P-2",
        titre: "Vocabulaire poétique de base",
        description:
          "Reconnaître vers, strophe, rime ; comprendre que la poésie joue avec les mots et les sons.",
        exemple: "Ex. : strophe = groupe de vers ; rime = sons qui se répètent en fin de vers.",
        astuce:
          "Vers = une ligne ; strophe = un paragraphe ; rime = même son final.",
        ressources: [
          { type: "fiches", titre: "Lexique poétique", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_6_VOCAB_POESIE"
      },
      {
        id: "6LC-P-3",
        titre: "Sens et images simples",
        description:
          "Comprendre le sens global d'un poème court ; repérer des comparaisons simples (comme, tel que).",
        exemple: "Ex. : 'blanc comme neige' → très blanc (comparaison).",
        astuce:
          "Cherche les mots 'comme', 'tel que', 'pareil à' pour les comparaisons.",
        ressources: [
          { type: "exercice", titre: "Images poétiques", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_6_IMAGES_POESIE"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Grammaire",
    sousChapitre: "Classes de mots",
    competences: [
      {
        id: "6GR-CM-1",
        titre: "Noms et déterminants",
        description:
          "Identifier noms communs/propres, masculin/féminin, singulier/pluriel ; accorder les déterminants.",
        exemple: "Ex. : 'le chien noir' → déterminant + nom + adjectif (masculin singulier).",
        astuce:
          "Le nom désigne ; le déterminant l'accompagne (le, la, un, cette...).",
        ressources: [
          { type: "exercice", titre: "Noms et déterminants", url: "https://www.ortholud.com/" }
        ],
        quizId: "QUIZ_6_NOMS_DET"
      },
      {
        id: "6GR-CM-2",
        titre: "Verbes et temps simples",
        description:
          "Reconnaître un verbe conjugué ; distinguer présent, passé composé, futur simple à l'oral et à l'écrit.",
        exemple: "Ex. : 'je mange' (présent), 'j'ai mangé' (passé composé), 'je mangerai' (futur).",
        astuce:
          "Le verbe exprime l'action ou l'état ; il change selon le temps.",
        ressources: [
          { type: "vidéo", titre: "Les temps simples", url: "https://www.youtube.com/watch?v=ghi789" }
        ],
        quizId: "QUIZ_6_VERBES_TEMPS"
      },
      {
        id: "6GR-CM-3",
        titre: "Adjectifs qualificatifs",
        description:
          "Identifier les adjectifs qui qualifient le nom ; comprendre l'accord en genre et nombre.",
        exemple: "Ex. : 'une grande maison' → 'grande' qualifie 'maison' (féminin singulier).",
        astuce:
          "L'adjectif précise le nom : couleur, taille, caractère... Il s'accorde !",
        ressources: [
          { type: "exercice", titre: "Accords adjectifs", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_6_ADJECTIFS"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Orthographe",
    sousChapitre: "Règles de base",
    competences: [
      {
        id: "6OR-RB-1",
        titre: "Accord sujet-verbe",
        description:
          "Accorder correctement le verbe avec son sujet, même quand le sujet est éloigné.",
        exemple: "Ex. : 'Les enfants jouent' ; 'L'enfant joue' → pluriel/singulier.",
        astuce:
          "Trouve d'abord le sujet (qui fait l'action ?), puis accorde le verbe.",
        ressources: [
          { type: "exercice", titre: "Accords sujet-verbe", url: "https://www.ortholud.com/" }
        ],
        quizId: "QUIZ_6_ACCORD_SV"
      },
      {
        id: "6OR-RB-2",
        titre: "Pluriel des noms",
        description:
          "Former correctement le pluriel des noms réguliers (-s) et quelques cas particuliers (-x, -aux).",
        exemple: "Ex. : chat → chats ; cheval → chevaux ; bijou → bijoux.",
        astuce:
          "Général : +s ; -eau/-eu → +x ; -al → -aux ; mémorise les exceptions.",
        ressources: [
          { type: "fiches", titre: "Pluriels particuliers", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_6_PLURIEL"
      },
      {
        id: "6OR-RB-3",
        titre: "Homophones de base (a/à, et/est, son/sont)",
        description:
          "Distinguer et utiliser correctement les homophones les plus fréquents.",
        exemple: "Ex. : 'Il a faim' (verbe avoir) vs 'Il va à Paris' (préposition).",
        astuce:
          "Remplace par 'avait' pour a/à ; par 'était' pour et/est.",
        ressources: [
          { type: "exercice", titre: "Homophones fréquents", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_6_HOMOPHONES"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Expression écrite",
    sousChapitre: "Textes courts",
    competences: [
      {
        id: "6EE-TC-1",
        titre: "Rédiger un récit simple",
        description:
          "Écrire un court récit en respectant la chronologie ; utiliser les temps du récit (passé).",
        exemple: "Ex. : Raconter une sortie scolaire en 10 lignes avec début, milieu, fin.",
        astuce:
          "D'abord, puis, ensuite, enfin... Utilise des connecteurs temporels !",
        ressources: [
          { type: "fiches", titre: "Connecteurs temporels", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_6_RECIT_ECRIT"
      },
      {
        id: "6EE-TC-2",
        titre: "Décrire un personnage, un lieu",
        description:
          "Produire une description organisée en utilisant un vocabulaire précis (adjectifs, comparaisons).",
        exemple: "Ex. : Décrire ton animal préféré (aspect, caractère, habitudes).",
        astuce:
          "Du général au particulier : d'abord l'ensemble, puis les détails.",
        ressources: [
          { type: "exercice", titre: "Vocabulaire descriptif", url: "https://www.francaisfacile.com/" }
        ],
        quizId: "QUIZ_6_DESCRIPTION"
      },
      {
        id: "6EE-TC-3",
        titre: "Écrire une lettre simple",
        description:
          "Respecter la mise en forme d'une lettre personnelle (date, formules de politesse, signature).",
        exemple: "Ex. : Lettre à un correspondant pour se présenter.",
        astuce:
          "Date en haut à droite, 'Cher/Chère...', développement, 'Amicalement', signature.",
        ressources: [
          { type: "modèle", titre: "Modèles de lettres", url: "https://www.assistancescolaire.com/" }
        ],
        quizId: "QUIZ_6_LETTRE"
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Oral",
    sousChapitre: "Expression et écoute",
    competences: [
      {
        id: "6OR-EE-1",
        titre: "Raconter clairement",
        description:
          "Raconter un événement vécu ou une histoire lue de manière organisée et audible.",
        exemple: "Ex. : Raconter ses vacances en 2 minutes devant la classe.",
        astuce:
          "Prépare 3 points : début (quoi/où), milieu (action), fin (résultat).",
        ressources: [
          { type: "vidéo", titre: "Techniques de récit oral", url: "https://www.youtube.com/watch?v=jkl012" }
        ],
        quizId: "QUIZ_6_ORAL_RECIT"
      },
      {
        id: "6OR-EE-2",
        titre: "Écouter et comprendre",
        description:
          "Suivre des consignes orales ; reformuler ce qu'on a entendu ; poser des questions pertinentes.",
        exemple: "Ex. : Écouter une histoire et la résumer en 3 phrases.",
        astuce:
          "Regarde qui parle, note les mots-clés, n'hésite pas à demander de répéter.",
        ressources: [
          { type: "exercice", titre: "Écoute active", url: "https://www.reseau-canope.fr/" }
        ],
        quizId: "QUIZ_6_ECOUTE"
      },
      {
        id: "6OR-EE-3",
        titre: "Récitation et mise en voix",
        description:
          "Mémoriser et dire un poème court ; utiliser l'intonation pour transmettre du sens.",
        exemple: "Ex. : Réciter 'Le Corbeau et le Renard' avec le ton approprié.",
        astuce:
          "Comprends d'abord le sens, puis travaille le rythme et l'expression.",
        ressources: [
          { type: "audio", titre: "Exemples de récitations", url: "https://www.radiofrance.fr/" }
        ],
        quizId: "QUIZ_6_RECITATION"
      }
    ]
  }
];
