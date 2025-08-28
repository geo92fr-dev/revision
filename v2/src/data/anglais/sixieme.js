// Données de cours pour Anglais 6ème
export const anglais6eme = [
  {
    niveau: "6ème",
    chapitre: "Grammar Basics",
    sousChapitre: "Fundamental structures",
    competences: [
      {
        id: "6GB-FS-1",
        titre: "Present simple (be, have, verbs)",
        description:
          "Maîtriser les formes affirmative, négative et interrogative du présent simple.",
        exemple: "Ex. : I am/You are/He is ; I have/He has ; I like/He likes.",
        astuce:
          "3ème personne singulier → +s au verbe ; 'be' et 'have' sont irréguliers.",
        ressources: [
          { type: "vidéo", titre: "Present Simple", url: "https://www.youtube.com/watch?v=present123" },
          { type: "exercice", titre: "Present Simple Practice", url: "https://www.englishgrammar.org/" }
        ]
      },
      {
        id: "6GB-FS-2",
        titre: "Articles (a, an, the)",
        description:
          "Utiliser correctement les articles défini et indéfinis selon le contexte.",
        exemple: "Ex. : a book (indéfini), an apple (voyelle), the sun (unique).",
        astuce:
          "'a' devant consonne, 'an' devant voyelle, 'the' pour ce qui est connu/unique.",
        ressources: [
          { type: "fiches", titre: "Articles Usage", url: "https://www.grammarly.com/" }
        ]
      },
      {
        id: "6GB-FS-3",
        titre: "Plural forms and possessives",
        description:
          "Former le pluriel des noms et utiliser le génitif saxon pour exprimer la possession.",
        exemple: "Ex. : cat → cats ; child → children ; John's book, the children's toys.",
        astuce:
          "Pluriel général +s ; possessif : 's pour singulier, s' pour pluriel.",
        ressources: [
          { type: "exercice", titre: "Plurals & Possessives", url: "https://www.englishpage.com/" }
        ]
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Vocabulary",
    sousChapitre: "Essential topics",
    competences: [
      {
        id: "6VO-ET-1",
        titre: "Family, friends & personal info",
        description:
          "Vocabulaire familial et personnel ; se présenter et présenter quelqu'un.",
        exemple: "Ex. : My name is..., I'm 12 years old, This is my sister/brother.",
        astuce:
          "Apprends par groupes thématiques : famille proche → élargie → amis.",
        ressources: [
          { type: "vocabulaire", titre: "Family Tree", url: "https://www.vocabulary.com/" },
          { type: "jeu", titre: "Family Games", url: "https://www.eslgamesplus.com/" }
        ]
      },
      {
        id: "6VO-ET-2",
        titre: "School subjects & daily routine",
        description:
          "Matières scolaires, horaires et routine quotidienne en anglais.",
        exemple: "Ex. : I study Maths, English, Science. I get up at 7, I have lunch at 12.",
        astuce:
          "Associe vocabulary + time expressions (at, in, on) pour parler du temps.",
        ressources: [
          { type: "fiches", titre: "School Vocabulary", url: "https://www.englishclub.com/" }
        ]
      },
      {
        id: "6VO-ET-3",
        titre: "Numbers, colors & basic adjectives",
        description:
          "Nombres, couleurs et adjectifs descriptifs de base pour caractériser.",
        exemple: "Ex. : twenty-five, dark blue, tall, short, funny, intelligent.",
        astuce:
          "Nombres composés avec trait d'union ; adjectifs AVANT le nom en anglais.",
        ressources: [
          { type: "jeu", titre: "Numbers & Colors", url: "https://www.games4esl.com/" }
        ]
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Communication",
    sousChapitre: "Basic interactions",
    competences: [
      {
        id: "6CO-BI-1",
        titre: "Greetings & polite expressions",
        description:
          "Saluer, remercier, s'excuser et utiliser les formules de politesse courantes.",
        exemple: "Ex. : Hello, Good morning, Thank you, You're welcome, Excuse me, Sorry.",
        astuce:
          "Contexte formel/informel : Hi vs Good morning ; Thanks vs Thank you.",
        ressources: [
          { type: "dialogues", titre: "Polite Conversations", url: "https://www.esl-lab.com/" }
        ]
      },
      {
        id: "6CO-BI-2",
        titre: "Asking for information",
        description:
          "Poser des questions simples avec Who, What, Where, When, How.",
        exemple: "Ex. : What's your name? Where do you live? How old are you?",
        astuce:
          "Question words + auxiliary (do/does) + sujet + verbe infinitif.",
        ressources: [
          { type: "vidéo", titre: "Question Formation", url: "https://www.youtube.com/watch?v=quest123" }
        ]
      },
      {
        id: "6CO-BI-3",
        titre: "Expressing likes & dislikes",
        description:
          "Exprimer ses goûts et préférences avec like, love, hate, prefer.",
        exemple: "Ex. : I like chocolate, I love swimming, I don't like vegetables.",
        astuce:
          "Like/love/hate + nom OU + verb+ing (I like reading).",
        ressources: [
          { type: "exercice", titre: "Likes & Dislikes", url: "https://www.englishpage.com/" }
        ]
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Listening & Speaking",
    sousChapitre: "Basic skills",
    competences: [
      {
        id: "6LS-BS-1",
        titre: "Understanding simple instructions",
        description:
          "Comprendre et suivre des consignes simples en classe et dans la vie quotidienne.",
        exemple: "Ex. : Open your book, Listen and repeat, Stand up, Sit down.",
        astuce:
          "Repère les mots-clés (verbes d'action) et observe les gestes du professeur.",
        ressources: [
          { type: "audio", titre: "Classroom Instructions", url: "https://www.esl-lab.com/" }
        ]
      },
      {
        id: "6LS-BS-2",
        titre: "Simple pronunciation patterns",
        description:
          "Prononcer correctement les sons de base et l'accent de mot.",
        exemple: "Ex. : /θ/ (think), /ð/ (this), accent sur 1ère syllabe (TEAcher).",
        astuce:
          "Imite les modèles audio, exagère au début, travaille les sons difficiles.",
        ressources: [
          { type: "phonétique", titre: "English Sounds", url: "https://www.sounds-pronunciation.com/" }
        ]
      },
      {
        id: "6LS-BS-3",
        titre: "Basic conversations",
        description:
          "Participer à des échanges simples sur des sujets familiers.",
        exemple: "Ex. : Dialogue au restaurant, se présenter à un correspondant.",
        astuce:
          "Prépare tes réponses types, n'aie pas peur des erreurs, communique !",
        ressources: [
          { type: "dialogues", titre: "Simple Conversations", url: "https://www.esl-lab.com/" }
        ]
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Reading & Writing",
    sousChapitre: "Text skills",
    competences: [
      {
        id: "6RW-TS-1",
        titre: "Reading short texts",
        description:
          "Comprendre des textes courts et simples (messages, descriptions, histoires).",
        exemple: "Ex. : Carte postale, description d'animal, histoire courte illustrée.",
        astuce:
          "Devine par le contexte, utilise les images, cherche les mots connus.",
        ressources: [
          { type: "textes", titre: "Easy Reading", url: "https://www.englishclub.com/reading/" }
        ]
      },
      {
        id: "6RW-TS-2",
        titre: "Writing simple sentences",
        description:
          "Rédiger des phrases simples et courtes sur des sujets familiers.",
        exemple: "Ex. : My favorite animal is... I live in... My hobby is...",
        astuce:
          "Structure simple : Sujet + Verbe + Complément. Une idée par phrase.",
        ressources: [
          { type: "modèles", titre: "Sentence Patterns", url: "https://www.englishpage.com/" }
        ]
      },
      {
        id: "6RW-TS-3",
        titre: "Simple text organization",
        description:
          "Organiser un court texte avec connecteurs de base (and, but, because).",
        exemple: "Ex. : I like dogs and cats but I prefer dogs because they are loyal.",
        astuce:
          "And = addition ; but = opposition ; because = cause. Commence simple !",
        ressources: [
          { type: "fiches", titre: "Text Connectors", url: "https://www.grammarly.com/" }
        ]
      }
    ]
  },
  {
    niveau: "6ème",
    chapitre: "Culture & Civilization",
    sousChapitre: "English-speaking world",
    competences: [
      {
        id: "6CC-EW-1",
        titre: "UK & Ireland basics",
        description:
          "Découvrir la géographie et les symboles du Royaume-Uni et de l'Irlande.",
        exemple: "Ex. : England, Scotland, Wales, Northern Ireland ; Londres, drapeaux.",
        astuce:
          "Associe pays + capitale + drapeau + symbole (rose, chardon, poireau).",
        ressources: [
          { type: "cartes", titre: "UK Geography", url: "https://www.bbc.co.uk/education/" }
        ]
      },
      {
        id: "6CC-EW-2",
        titre: "American basics",
        description:
          "Connaître les éléments de base de la culture américaine (géographie, symboles).",
        exemple: "Ex. : 50 states, Washington DC, drapeau étoilé, Statue of Liberty.",
        astuce:
          "USA = United States of America ; capitale ≠ plus grande ville (NYC).",
        ressources: [
          { type: "vidéo", titre: "American Symbols", url: "https://www.youtube.com/watch?v=usa123" }
        ]
      },
      {
        id: "6CC-EW-3",
        titre: "Festivals & traditions",
        description:
          "Découvrir les principales fêtes et traditions anglo-saxonnes.",
        exemple: "Ex. : Christmas, Halloween, Thanksgiving, Easter, Guy Fawkes.",
        astuce:
          "Associe fête + date + traditions + pays (Thanksgiving = USA uniquement).",
        ressources: [
          { type: "fiches", titre: "British Festivals", url: "https://www.englishclub.com/culture/" }
        ]
      }
    ]
  }
];
