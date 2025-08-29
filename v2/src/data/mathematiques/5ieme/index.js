// INDEX MAÎTRE 5ème - Mathématiques
// ⚠️ Ce fichier sera auto-généré - Configuration initiale manuelle

import fractions5eme from './5e_nombres_calculs_fractions.js';

// Export consolidé avec clés quoted pour compatibilité
export const mathematiques5eme = {
  'nombres-calculs-fractions': fractions5eme,
  // Les autres chapitres seront ajoutés au fur et à mesure
};

// Export des modules individuels en camelCase pour compatibilité
export {
  fractions5eme,
};

// Export par défaut pour compatibilité
export default mathematiques5eme;

// Exposition pour compatibilité avec cours.html
if (typeof window !== 'undefined') {
  window.mathematiques5eme = mathematiques5eme;
  console.log('✅ Mathématiques 5ème chargé:', {
    disponible: !!window.mathematiques5eme,
    chapitres: Object.keys(mathematiques5eme)
  });
}
