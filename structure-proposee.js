// Structure enrichie proposée avec améliorations suggérées
export const structureEnrichie = {
  id: "6NC-FR-1",
  titre: "Comprendre les fractions",
  objectif: "Savoir lire, écrire et représenter une fraction.",

  // Contenu pédagogique principal
  cours: "Une fraction représente une partie d'un tout. Exemple : 3/4 signifie 3 parts sur 4 au total.",
  
  prerequisites: ["Division", "Partages équitables"], // Nouveauté : prérequis
  
  etapes: [
    "Identifier le numérateur et le dénominateur",
    "Représenter une fraction sur un schéma", 
    "Comparer et classer des fractions"
  ],

  exemple: "Si tu manges 2 parts sur 8 d'un gâteau, tu as mangé 2/8, soit 1/4.",

  // Pratique graduée
  exercices: [
    { 
      type: "débutant", 
      question: "Colorie 1/2 d'un rectangle.",
      duree: "2min", // Nouveauté : estimation temps
      competence: "représentation" // Nouveauté : type de compétence
    },
    { 
      type: "intermédiaire", 
      question: "Repère 3/4 sur une droite graduée.",
      duree: "3min",
      competence: "placement"
    },
    { 
      type: "avancé", 
      question: "Calcule : 5/8 d'un gâteau de 32 parts.",
      duree: "5min",
      competence: "calcul"
    }
  ],

  // Évaluation rapide
  miniQuiz: [
    {
      question: "Quelle fraction représente 2 parts sur 5 ?",
      choix: ["2/3", "5/2", "2/5", "1/2"],
      reponse: "2/5",
      explication: "2 parts prises sur 5 parts totales = 2/5" // Nouveauté
    }
  ],

  // Mémorisation et erreurs
  astuce: "Numérateur = parts prises. Dénominateur = parts totales.",
  pieges: [
    "Confondre numérateur et dénominateur",
    "Oublier que 4/4 = 1 entier" // Piège supplémentaire
  ],
  
  // Motivation
  defi: "Trouve 3 fractions équivalentes à 2/3.",
  
  // Contextualisation
  utilite: "Les fractions sont essentielles pour cuisiner, partager des objets, calculer des remises, comprendre les pourcentages et gérer son budget.",
  consequence: "Sans la maîtrise des fractions, tu auras des difficultés à suivre des recettes, gérer ton argent, calculer des remises ou comprendre des statistiques.",
  
  // Engagement émotionnel
  funFact: "Dans une étude américaine, 3 adultes sur 5 ont avoué qu'ils préféraient partager une pizza plutôt que des bonbons… mais 2 sur 5 ne savaient pas calculer 3/8 d'une pizza ! 🍕😂",

  // NOUVELLES SECTIONS SUGGÉRÉES :

  // Différenciation pédagogique
  adaptations: {
    dyslexie: "Utiliser des couleurs pour distinguer numérateur/dénominateur",
    dyspraxie: "Privilégier les manipulations d'objets concrets",
    hautsCapacités: "Proposer l'étude des fractions égyptiennes"
  },

  // Liens interdisciplinaires
  transversal: {
    sciences: "Concentrations en chimie (1/3 de solution)",
    arts: "Proportions en dessin (règle des 1/3)",
    sport: "Temps de parcours (3/4 de tour de piste)"
  },

  // Ressources numériques
  ressources: [
    { 
      type: "vidéo", 
      titre: "Fractions visuelles", 
      url: "https://example.com",
      duree: "4min",
      niveau: "débutant"
    },
    { 
      type: "simulation", 
      titre: "Partage de pizza", 
      url: "https://phet.colorado.edu/",
      interactif: true,
      niveau: "tous"
    },
    { 
      type: "jeu", 
      titre: "Course aux fractions", 
      url: "https://example.com",
      multijoueur: true,
      niveau: "intermédiaire"
    }
  ],

  // Évaluation et suivi
  evaluation: {
    autoEvaluation: "Je sais représenter 3/4 d'un cercle",
    critereReussite: ["Identifie numérateur/dénominateur", "Représente graphiquement", "Compare deux fractions"],
    indicateursProgres: {
      bronze: "Comprend la notion de partie/tout",
      argent: "Représente des fractions simples", 
      or: "Compare et ordonne les fractions"
    }
  },

  // Métacognition
  reflexion: {
    questionAvant: "Que sais-je déjà sur le partage ?",
    questionApres: "Comment vais-je utiliser les fractions demain ?",
    strategiesApprises: ["Visualisation par schémas", "Comparaison par dénominateur commun"]
  }
};
