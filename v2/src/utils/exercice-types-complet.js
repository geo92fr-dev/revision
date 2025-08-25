/**
 * 🎯 Système de Normalisation des Types d'Exercices - VERSION COMPLÈTE
 * 
 * Ce module centralise TOUS les types d'exercices trouvés dans les modules
 * et fournit des fonctions de normalisation et de rendu robustes.
 */

// 🔥 Types d'exercices reconnus - EXHAUSTIF basé sur analyse de tous les modules
export const TYPES_EXERCICES = {
    // 📚 Types de difficulté (exercices dans "exercices")
    DIFFICULTE: {
        'débutant': 'Exercice débutant',
        'debutant': 'Exercice débutant',
        'intermédiaire': 'Exercice intermédiaire', 
        'intermediaire': 'Exercice intermédiaire',
        'avancé': 'Exercice avancé',
        'avance': 'Exercice avancé'
    },
    
    // 🎮 Types d'interaction (typeExercice spécifique)
    INTERACTION: {
        'saisie': 'Saisie de réponse',
        'calcul': 'Calcul à effectuer',
        'qcm': 'Questionnaire à choix multiples',
        'vrai-faux': 'Vrai ou Faux',
        'rectangle': 'Exercice avec rectangle',
        'droite': 'Exercice avec droite',
        'tableau': 'Exercice avec tableau',
        'entrainement': 'Exercice d\'entraînement'
    },
    
    // 📊 Types principaux trouvés dans les modules (LISTE EXHAUSTIVE)
    TYPES_PRINCIPAUX: {
        // QCM et choix multiples
        'qcm': 'Questionnaire à choix multiples',
        'choix': 'Exercice à choix',
        'choix_unite': 'Choix d\'unité',
        
        // Exercices généraux
        'exercice': 'Exercice',
        'exercices': 'Exercices',
        'auto-evaluation': 'Auto-évaluation',
        'evaluation': 'Évaluation',
        
        // Types spécialisés mathématiques
        'calcul': 'Calcul',
        'saisie': 'Saisie',
        'conversion': 'Conversion',
        'conversion_masse': 'Conversion de masse',
        'conversion_capacite': 'Conversion de capacité',
        'comparaison': 'Comparaison',
        'probleme': 'Problème',
        'decomposition': 'Décomposition',
        'estimation': 'Estimation',
        'application': 'Application',
        'classement': 'Classement',
        'lecture': 'Lecture',
        'placement': 'Placement',
        
        // Types géométriques
        'construction': 'Construction géométrique',
        'reconnaissance': 'Reconnaissance',
        'verification': 'Vérification',
        'mesure': 'Mesure',
        'representation': 'Représentation',
        
        // Types spécialisés
        'visuel': 'Exercice visuel',
        'lecture_heure': 'Lecture d\'heure',
        'lecture_simple': 'Lecture simple',
        'lecture_tableau': 'Lecture de tableau',
        'lecture_barres': 'Lecture de graphique en barres',
        'association': 'Association',
        'addition': 'Addition',
        'soustraction': 'Soustraction',
        'tableau_notes': 'Tableau de notes',
        'tableau_horaires': 'Tableau d\'horaires',
        'tableau_double_entree': 'Tableau à double entrée',
        'calcul_tableau': 'Calcul dans un tableau',
        'observation': 'Observation',
        'graphique_barres': 'Graphique en barres',
        'graphique_courbes': 'Graphique en courbes',
        'graphique_secteurs': 'Graphique en secteurs',
        'pictogramme': 'Pictogramme',
        'interpretation': 'Interprétation',
        'composition': 'Composition',
        
        // Types logiques
        'vrai-faux': 'Vrai ou Faux',
        'vrai_faux': 'Vrai ou Faux',
        'true-false': 'Vrai ou Faux',
        
        // Types d'entraînement
        'entrainement': 'Entraînement',
        'training': 'Entraînement',
        'practice': 'Pratique',
        
        // Types d'activation et métacognition
        'activation': 'Activation',
        'objectif': 'Objectif',
        'facilite': 'Facilité',
        'difficulte': 'Difficulté',
        'utilite': 'Utilité',
        'strategie': 'Stratégie',
        'comprehension': 'Compréhension',
        'analyse': 'Analyse',
        'synthese': 'Synthèse'
    }
};

// 🎨 Configuration du rendu par type
export const EXERCICE_RENDERERS = {
    'qcm': {
        icon: '☑️',
        className: 'qcm-exercise',
        template: 'qcm'
    },
    'vrai-faux': {
        icon: '✅',
        className: 'vrai-faux-exercise', 
        template: 'true-false'
    },
    'saisie': {
        icon: '✏️',
        className: 'saisie-exercise',
        template: 'input'
    },
    'calcul': {
        icon: '🔢',
        className: 'calcul-exercise',
        template: 'calculation'
    },
    'tableau': {
        icon: '📊',
        className: 'tableau-exercise',
        template: 'table'
    },
    'rectangle': {
        icon: '⬜',
        className: 'rectangle-exercise',
        template: 'rectangle'
    },
    'droite': {
        icon: '📏',
        className: 'droite-exercise',
        template: 'line'
    },
    'entrainement': {
        icon: '🏃‍♂️',
        className: 'training-exercise',
        template: 'training'
    },
    'construction': {
        icon: '📐',
        className: 'construction-exercise',
        template: 'geometry'
    },
    'conversion': {
        icon: '🔄',
        className: 'conversion-exercise',
        template: 'conversion'
    },
    'probleme': {
        icon: '🧮',
        className: 'probleme-exercise',
        template: 'problem'
    },
    'graphique': {
        icon: '📈',
        className: 'graphique-exercise',
        template: 'chart'
    },
    // Fallback générique
    'default': {
        icon: '📝',
        className: 'generic-exercise',
        template: 'generic'
    }
};

/**
 * 🔍 Normalise un type d'exercice vers un type reconnu
 */
export function normalizeExerciceType(type) {
    if (!type) return 'exercice';
    
    const typeStr = String(type).toLowerCase().trim();
    
    // Vérification directe dans les types principaux
    if (TYPES_EXERCICES.TYPES_PRINCIPAUX[typeStr]) {
        return typeStr;
    }
    
    // Vérification dans les types de difficulté
    if (TYPES_EXERCICES.DIFFICULTE[typeStr]) {
        return typeStr;
    }
    
    // Vérification dans les types d'interaction
    if (TYPES_EXERCICES.INTERACTION[typeStr]) {
        return typeStr;
    }
    
    // Normalisation des variantes communes
    const normalizations = {
        'true-false': 'vrai-faux',
        'true_false': 'vrai-faux',
        'trueFalse': 'vrai-faux',
        'choixMultiple': 'qcm',
        'choix-multiple': 'qcm',
        'choix_multiple': 'qcm',
        'multipleChoice': 'qcm',
        'input': 'saisie',
        'text': 'saisie',
        'number': 'calcul',
        'math': 'calcul',
        'table': 'tableau',
        'grid': 'tableau',
        'geometry': 'construction',
        'geo': 'construction',
        'graph': 'graphique',
        'chart': 'graphique'
    };
    
    if (normalizations[typeStr]) {
        return normalizations[typeStr];
    }
    
    // Détection par mots-clés
    if (typeStr.includes('qcm') || typeStr.includes('choix')) {
        return 'qcm';
    }
    if (typeStr.includes('vrai') || typeStr.includes('faux')) {
        return 'vrai-faux';
    }
    if (typeStr.includes('saisie') || typeStr.includes('input')) {
        return 'saisie';
    }
    if (typeStr.includes('calcul') || typeStr.includes('math')) {
        return 'calcul';
    }
    if (typeStr.includes('tableau') || typeStr.includes('table')) {
        return 'tableau';
    }
    if (typeStr.includes('graphique') || typeStr.includes('graph')) {
        return 'graphique';
    }
    if (typeStr.includes('construction') || typeStr.includes('geo')) {
        return 'construction';
    }
    if (typeStr.includes('conversion') || typeStr.includes('convert')) {
        return 'conversion';
    }
    if (typeStr.includes('probleme') || typeStr.includes('problem')) {
        return 'probleme';
    }
    
    // Fallback: retourner le type original ou 'exercice'
    return typeStr || 'exercice';
}

/**
 * 🎨 Obtient la configuration de rendu pour un type d'exercice
 */
export function getExerciceRenderer(type) {
    const normalizedType = normalizeExerciceType(type);
    
    // Mapper vers les types de base pour le rendu
    const renderingMap = {
        'qcm': 'qcm',
        'choix': 'qcm',
        'choix_unite': 'qcm',
        'vrai-faux': 'vrai-faux',
        'vrai_faux': 'vrai-faux',
        'true-false': 'vrai-faux',
        'saisie': 'saisie',
        'calcul': 'calcul',
        'tableau': 'tableau',
        'tableau_notes': 'tableau',
        'tableau_horaires': 'tableau',
        'tableau_double_entree': 'tableau',
        'lecture_tableau': 'tableau',
        'calcul_tableau': 'tableau',
        'rectangle': 'rectangle',
        'droite': 'droite',
        'entrainement': 'entrainement',
        'training': 'entrainement',
        'construction': 'construction',
        'reconnaissance': 'construction',
        'verification': 'construction',
        'conversion': 'conversion',
        'conversion_masse': 'conversion',
        'conversion_capacite': 'conversion',
        'probleme': 'probleme',
        'graphique_barres': 'graphique',
        'graphique_courbes': 'graphique',
        'graphique_secteurs': 'graphique',
        'lecture_barres': 'graphique'
    };
    
    const rendererType = renderingMap[normalizedType] || 'default';
    return EXERCICE_RENDERERS[rendererType] || EXERCICE_RENDERERS.default;
}

/**
 * 🏷️ Obtient le titre formaté d'un type d'exercice
 */
export function getExerciceTitle(type) {
    const normalizedType = normalizeExerciceType(type);
    
    // Chercher dans tous les groupes de types
    return TYPES_EXERCICES.TYPES_PRINCIPAUX[normalizedType] ||
           TYPES_EXERCICES.DIFFICULTE[normalizedType] ||
           TYPES_EXERCICES.INTERACTION[normalizedType] ||
           'Exercice';
}

/**
 * ✅ Valide qu'un type d'exercice est reconnu
 */
export function validateExerciceType(type) {
    const normalizedType = normalizeExerciceType(type);
    
    const isValid = normalizedType && (
        TYPES_EXERCICES.TYPES_PRINCIPAUX[normalizedType] ||
        TYPES_EXERCICES.DIFFICULTE[normalizedType] ||
        TYPES_EXERCICES.INTERACTION[normalizedType]
    );
    
    return {
        isValid: !!isValid,
        normalizedType,
        title: getExerciceTitle(normalizedType),
        renderer: getExerciceRenderer(normalizedType)
    };
}

// Debug: exporter la liste complète pour inspection
export const TOUS_LES_TYPES = {
    ...TYPES_EXERCICES.TYPES_PRINCIPAUX,
    ...TYPES_EXERCICES.DIFFICULTE,
    ...TYPES_EXERCICES.INTERACTION
};

console.log('🎯 Système de types d\'exercices chargé avec', Object.keys(TOUS_LES_TYPES).length, 'types reconnus');
