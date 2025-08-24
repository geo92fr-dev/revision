// Configuration des tests - Mathématiques 6ème
export const TEST_CONFIG = {
    // Chemins relatifs depuis le dossier test/data
    DATA_PATH: '../../data/mathematiques/6ieme',
    INDEX_PATH: '../../data/mathematiques/6ieme/index.js',
    
    // Topics attendus
    EXPECTED_TOPICS: [
        'addition-soustraction', 'multiplication', 'division', 'figures-planes', 
        'perimetre', 'fractions', 'proportionnalite', 'nombres-entiers', 
        'nombres-decimaux', 'fractions-simples', 'symetrie-axiale', 'aires-figures',
        'constructions-geometriques', 'unites-longueur', 'unites-masse-capacite', 
        'durees', 'lecture-tableaux', 'graphiques', 'algebre', 'moyenne'
    ],
    
    // Nombre total attendu
    EXPECTED_COUNT: 20,
    
    // Suites de tests disponibles
    TEST_SUITES: {
        BASIC: 'test-simple.js',
        STRUCTURE: 'test-integrite.js', 
        EXPORTS: 'test-exports.js',
        MOYENNE: 'test-moyenne.js',
        INDEX: 'test-index.js',
        COMPLETE: 'test-complet.js',
        FINAL: 'test-final.js'
    }
};

// Utilitaires pour les tests
export class TestUtils {
    static logTest(name, passed, details = '') {
        const status = passed ? '✅' : '❌';
        console.log(`${status} ${name}${details ? ': ' + details : ''}`);
        return passed;
    }
    
    static async importModule(path) {
        try {
            return await import(path);
        } catch (error) {
            throw new Error(`Import failed for ${path}: ${error.message}`);
        }
    }
    
    static formatResults(passed, total) {
        const percentage = Math.round((passed/total)*100);
        return {
            passed,
            total,
            failed: total - passed,
            percentage,
            success: passed === total
        };
    }
}
