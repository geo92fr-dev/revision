// Index des données mathématiques - Nouveau format basé sur reference.js
import { mathematiques6eme } from './6ieme/index.js';
import { mathematiques5eme } from './5ieme/index.js';

export const mathematiques = {
  "6eme": mathematiques6eme,
  "5eme": mathematiques5eme,
  // Les autres niveaux seront ajoutés quand ils seront créés avec le nouveau format
};

// Export direct pour compatibilité
export { mathematiques6eme };
export { mathematiques5eme };

// Exposition pour compatibilité avec cours.html
if (typeof window !== 'undefined') {
    window.data = { mathematiques };
    window.mathematiques = mathematiques;
    console.log('✅ Mathématiques chargé dans window:', {
      disponible: !!window.mathematiques,
      niveaux: Object.keys(mathematiques)
    });
}