// Import des données modulaires
import { coursData as coursDataFromModules, coursDataBySubjectAndLevel } from './data/index.js';

// Export de la structure modulaire pour accès direct par matière/niveau
export { coursDataBySubjectAndLevel };

// Maintien de la compatibilité avec l'ancienne structure
export const coursData = coursDataFromModules;

// Export par défaut pour la compatibilité
export default coursData;
