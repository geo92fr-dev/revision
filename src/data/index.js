// Index principal des données de cours - Architecture modulaire
import { mathematiques } from './mathematiques/index.js';
import { francaisData } from './francais/index.js';
import { anglaisData } from './anglais/index.js';
import { convertToLegacyFormat } from './legacyConverter.js';

// Structure organisée par matière et niveau
export const coursDataBySubjectAndLevel = {
  mathématiques: mathematiques,
  français: francaisData,
  anglais: anglaisData
};

// Nouvelle structure plate pour tous les niveaux (mathématiques uniquement pour compatibilité)
const newFormatData = [
  ...mathematiques["6ème"],
  ...mathematiques["5ème"],
  ...mathematiques["4ème"],
  ...mathematiques["3ème"]
];

// Maintien de la compatibilité avec l'ancienne structure pour les tests
export const coursData = convertToLegacyFormat(newFormatData);

// Export de la nouvelle structure pour les futurs composants
export const coursDataV2 = newFormatData;

// Export par défaut pour la compatibilité
export default coursData;
