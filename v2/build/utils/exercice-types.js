// SYSTÈME NORMALISÉ DES TYPES D'EXERCICES
// ======================================
// Définition complète et robuste des types d'exercices

export const TYPES_EXERCICES = {
  // Types de difficulté (champ 'type')
  DIFFICULTE: {
    DEBUTANT: 'débutant',
    INTERMEDIAIRE: 'intermédiaire', 
    AVANCE: 'avancé'
  },
  
  // Types d'interaction (champ 'typeExercice')
  INTERACTION: {
    // Exercices basiques
    SAISIE: 'saisie',           // Saisie libre de texte/nombre
    CALCUL: 'calcul',           // Calcul numérique avec méthode
    QCM: 'qcm',                 // Questions à choix multiples
    VRAI_FAUX: 'vrai-faux',     // Questions vrai/faux
    
    // Exercices géométriques
    RECTANGLE: 'rectangle',     // Colorer des rectangles/fractions
    DROITE: 'droite',          // Placer sur droite graduée
    FORME: 'forme',            // Manipulation de formes géométriques
    CONSTRUCTION: 'construction', // Construction géométrique
    
    // Exercices spécialisés
    TABLEAU: 'tableau',        // Compléter des tableaux
    GRAPHIQUE: 'graphique',    // Lire/créer des graphiques
    UNITE: 'unite',            // Conversion d'unités
    TEMPS: 'temps',            // Calculs de durée/temps
    MESURE: 'mesure',          // Exercices de mesure
    
    // Exercices avancés
    RESOLUTION: 'resolution',   // Résolution de problèmes
    DEMONSTRATION: 'demonstration', // Démonstration/preuve
    ENTRAINEMENT: 'entrainement'   // Exercices d'entraînement libre
  }
};

// Configuration des rendus d'exercices
export const EXERCICE_RENDERERS = {
  // Exercices de base
  [TYPES_EXERCICES.INTERACTION.SAISIE]: {
    icon: '✏️',
    title: 'Exercice de saisie',
    template: 'input-text',
    placeholder: 'Tapez votre réponse'
  },
  
  [TYPES_EXERCICES.INTERACTION.CALCUL]: {
    icon: '🧮',
    title: 'Calcul numérique',
    template: 'input-number',
    placeholder: 'Entrez le résultat'
  },
  
  [TYPES_EXERCICES.INTERACTION.QCM]: {
    icon: '☑️',
    title: 'Question à choix multiples',
    template: 'choice-buttons',
    placeholder: null
  },
  
  [TYPES_EXERCICES.INTERACTION.VRAI_FAUX]: {
    icon: '❓',
    title: 'Vrai ou Faux',
    template: 'true-false',
    placeholder: null
  },
  
  // Exercices géométriques
  [TYPES_EXERCICES.INTERACTION.RECTANGLE]: {
    icon: '🟦',
    title: 'Exercice rectangulaire',
    template: 'canvas-rectangle',
    placeholder: 'Cliquez sur les zones à colorier'
  },
  
  [TYPES_EXERCICES.INTERACTION.DROITE]: {
    icon: '📏',
    title: 'Droite graduée',
    template: 'canvas-line',
    placeholder: 'Cliquez pour placer le point'
  },
  
  [TYPES_EXERCICES.INTERACTION.FORME]: {
    icon: '🔺',
    title: 'Manipulation de formes',
    template: 'canvas-shapes',
    placeholder: 'Manipulez les formes'
  },
  
  [TYPES_EXERCICES.INTERACTION.CONSTRUCTION]: {
    icon: '📐',
    title: 'Construction géométrique',
    template: 'canvas-construction',
    placeholder: 'Utilisez les outils de construction'
  },
  
  // Exercices spécialisés
  [TYPES_EXERCICES.INTERACTION.TABLEAU]: {
    icon: '📊',
    title: 'Tableau à compléter',
    template: 'table-fill',
    placeholder: 'Complétez les cases vides'
  },
  
  [TYPES_EXERCICES.INTERACTION.GRAPHIQUE]: {
    icon: '📈',
    title: 'Exercice graphique',
    template: 'graph-interactive',
    placeholder: 'Interagissez avec le graphique'
  },
  
  [TYPES_EXERCICES.INTERACTION.UNITE]: {
    icon: '⚖️',
    title: 'Conversion d\'unités',
    template: 'unit-conversion',
    placeholder: 'Convertissez les unités'
  },
  
  [TYPES_EXERCICES.INTERACTION.TEMPS]: {
    icon: '⏰',
    title: 'Calcul de durée',
    template: 'time-calculation',
    placeholder: 'Calculez la durée'
  },
  
  [TYPES_EXERCICES.INTERACTION.MESURE]: {
    icon: '📏',
    title: 'Exercice de mesure',
    template: 'measurement',
    placeholder: 'Effectuez la mesure'
  },
  
  // Exercices avancés
  [TYPES_EXERCICES.INTERACTION.RESOLUTION]: {
    icon: '🧩',
    title: 'Résolution de problème',
    template: 'problem-solving',
    placeholder: 'Détaillez votre raisonnement'
  },
  
  [TYPES_EXERCICES.INTERACTION.DEMONSTRATION]: {
    icon: '💡',
    title: 'Démonstration',
    template: 'proof-steps',
    placeholder: 'Étapes de la démonstration'
  },
  
  [TYPES_EXERCICES.INTERACTION.ENTRAINEMENT]: {
    icon: '💪',
    title: 'Exercice d\'entraînement',
    template: 'training',
    placeholder: 'Exercice libre'
  }
};

// Icônes pour les niveaux de difficulté
export const DIFFICULTY_ICONS = {
  [TYPES_EXERCICES.DIFFICULTE.DEBUTANT]: '🟢',
  [TYPES_EXERCICES.DIFFICULTE.INTERMEDIAIRE]: '🟡',
  [TYPES_EXERCICES.DIFFICULTE.AVANCE]: '🔴'
};

// Fonction utilitaire pour valider un type d'exercice
export function validateExerciceType(exercice) {
  const errors = [];
  
  // Vérifier le type de difficulté
  if (!exercice.type || !Object.values(TYPES_EXERCICES.DIFFICULTE).includes(exercice.type)) {
    errors.push(`Type de difficulté invalide: "${exercice.type}". Attendu: ${Object.values(TYPES_EXERCICES.DIFFICULTE).join(', ')}`);
  }
  
  // Vérifier le type d'interaction (optionnel)
  if (exercice.typeExercice && !Object.values(TYPES_EXERCICES.INTERACTION).includes(exercice.typeExercice)) {
    errors.push(`Type d'interaction invalide: "${exercice.typeExercice}". Attendu: ${Object.values(TYPES_EXERCICES.INTERACTION).join(', ')}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Fonction pour obtenir la configuration de rendu
export function getExerciceRenderer(typeExercice) {
  return EXERCICE_RENDERERS[typeExercice] || EXERCICE_RENDERERS[TYPES_EXERCICES.INTERACTION.SAISIE];
}

// Fonction pour normaliser un type d'exercice
export function normalizeExerciceType(type) {
  if (!type) return TYPES_EXERCICES.INTERACTION.SAISIE;
  
  // Mappings pour compatibilité avec anciens types
  const typeMapping = {
    'exercices': TYPES_EXERCICES.INTERACTION.ENTRAINEMENT,
    'entrainement': TYPES_EXERCICES.INTERACTION.ENTRAINEMENT,
    'Exercices d\'entraînement': TYPES_EXERCICES.INTERACTION.ENTRAINEMENT,
    'input': TYPES_EXERCICES.INTERACTION.SAISIE,
    'text': TYPES_EXERCICES.INTERACTION.SAISIE,
    'number': TYPES_EXERCICES.INTERACTION.CALCUL
  };
  
  return typeMapping[type] || type;
}

export default {
  TYPES_EXERCICES,
  EXERCICE_RENDERERS,
  DIFFICULTY_ICONS,
  validateExerciceType,
  getExerciceRenderer,
  normalizeExerciceType
};
