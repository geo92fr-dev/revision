/**
 * 🧪 TEST DE ROBUSTESSE DU SYSTÈME D'EXERCICES
 * 
 * Ce script teste que notre système de normalisation gère bien
 * TOUS les types d'exercices trouvés dans les modules.
 */

import { normalizeExerciceType, getExerciceRenderer, validateExerciceType, TOUS_LES_TYPES } from './exercice-types-complet.js';

// 📊 Types trouvés dans l'analyse des modules (échantillon représentatif)
const TYPES_TROUVÉS_DANS_MODULES = [
    // Types de difficulté
    'débutant', 'intermédiaire', 'avancé',
    
    // Types d'interaction (typeExercice)
    'saisie', 'calcul', 'rectangle', 'droite', 'tableau',
    
    // Types principaux
    'qcm', 'exercice', 'auto-evaluation', 'conversion', 'conversion_masse', 'conversion_capacite',
    'comparaison', 'probleme', 'decomposition', 'estimation', 'application', 'classement',
    'lecture', 'placement', 'construction', 'reconnaissance', 'verification', 'mesure',
    'representation', 'visuel', 'lecture_heure', 'lecture_simple', 'lecture_tableau', 
    'lecture_barres', 'association', 'addition', 'soustraction', 'tableau_notes',
    'tableau_horaires', 'tableau_double_entree', 'calcul_tableau', 'observation',
    'graphique_barres', 'graphique_courbes', 'graphique_secteurs', 'pictogramme',
    'interpretation', 'composition', 'vrai-faux', 'entrainement', 'activation',
    'objectif', 'facilite', 'difficulte', 'utilite', 'strategie', 'comprehension',
    'analyse', 'synthese', 'choix_unite'
];

// 🎯 Fonction de test
function testerSystemeExercices() {
    console.log('🧪 DÉBUT DU TEST DE ROBUSTESSE');
    console.log('===============================');
    
    let testsReussis = 0;
    let testsEchoues = 0;
    const erreurs = [];
    
    TYPES_TROUVÉS_DANS_MODULES.forEach(type => {
        try {
            const normalizedType = normalizeExerciceType(type);
            const renderer = getExerciceRenderer(type);
            const validation = validateExerciceType(type);
            
            if (normalizedType && renderer && validation.isValid) {
                console.log(`✅ ${type} → ${normalizedType} (${validation.title})`);
                testsReussis++;
            } else {
                console.log(`❌ ${type} → ÉCHEC (normalized: ${normalizedType}, valid: ${validation.isValid})`);
                erreurs.push(type);
                testsEchoues++;
            }
        } catch (error) {
            console.log(`💥 ${type} → ERREUR: ${error.message}`);
            erreurs.push(type);
            testsEchoues++;
        }
    });
    
    console.log('\n📊 RÉSULTATS DU TEST');
    console.log('====================');
    console.log(`✅ Tests réussis: ${testsReussis}`);
    console.log(`❌ Tests échoués: ${testsEchoues}`);
    console.log(`📈 Taux de réussite: ${((testsReussis / (testsReussis + testsEchoues)) * 100).toFixed(1)}%`);
    console.log(`🎯 Types reconnus dans le système: ${Object.keys(TOUS_LES_TYPES).length}`);
    
    if (erreurs.length > 0) {
        console.log('\n⚠️ TYPES NON GÉRÉS:');
        erreurs.forEach(type => console.log(`   - ${type}`));
    }
    
    console.log('\n🏆 TEST TERMINÉ!');
    
    return {
        reussis: testsReussis,
        echoues: testsEchoues,
        tauxReussite: (testsReussis / (testsReussis + testsEchoues)) * 100,
        erreurs
    };
}

// Exécuter le test
const resultats = testerSystemeExercices();

// 🎯 Test de cas limites
console.log('\n🔬 TEST DES CAS LIMITES');
console.log('========================');

const casLimites = [
    null, undefined, '', '   ', 'type_inexistant', 'MAJUSCULES', 
    'avec-tirets', 'avec_underscores', 'ÇaractèresSpéciaux'
];

casLimites.forEach(cas => {
    const resultat = normalizeExerciceType(cas);
    console.log(`🧪 ${JSON.stringify(cas)} → "${resultat}"`);
});

export { testerSystemeExercices };
