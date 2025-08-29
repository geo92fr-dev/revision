// Index principal des données de cours - Architecture modulaire
import { mathematiques } from './mathematiques/index.js';
// import { francaisData } from './francais/index.js';
// import { anglaisData } from './anglais/index.js';
// import { convertToLegacyFormat } from './legacyConverter.js';

// Structure organisée par matière et niveau
export const coursDataBySubjectAndLevel = {
  mathématiques: mathematiques,
  // français: francaisData,
  // anglais: anglaisData
};

// Nouvelle structure plate pour la 6eme uniquement (nouveau format basé sur reference.js)
const newFormatData6eme = Object.values(mathematiques["6eme"] || {});
const newFormatData5eme = Object.values(mathematiques["5eme"] || {});

// Maintien de la compatibilité avec l'ancienne structure pour les tests
// export const coursData = convertToLegacyFormat(newFormatData);

// Export de la nouvelle structure pour les futurs composants
export const coursDataV2 = {
  "6eme": newFormatData6eme,
  "5eme": newFormatData5eme
};

// Export par défaut pour la compatibilité
export default coursDataBySubjectAndLevel;

// Exposition pour compatibilité avec cours.html
if (typeof window !== 'undefined') {
    window.data = coursDataBySubjectAndLevel;
    window.coursDataV2 = coursDataV2;
    console.log('✅ coursDataBySubjectAndLevel chargé dans window.data:', {
      mathematiques: !!coursDataBySubjectAndLevel.mathématiques,
      niveaux: Object.keys(coursDataBySubjectAndLevel.mathématiques || {})
    });
}