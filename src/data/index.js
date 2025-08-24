// Index principal des données de cours
import { mathematiques } from './mathematiques/index.js';

// Structure organisée par matière et niveau
export const coursDataBySubjectAndLevel = {
  mathématiques: mathematiques
};

// Maintien de la compatibilité avec l'ancienne structure
export const coursData = [
  ...mathematiques["6ème"]
];

// Export par défaut pour la compatibilité
export default coursData;
