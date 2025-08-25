// Export des données Anglais par niveau
export { anglais6eme } from './sixieme.js';
export { anglais5eme } from './cinquieme.js';

// Export groupé pour faciliter l'import (seuls les niveaux implémentés)
export const anglaisData = {
  sixieme: () => import('./sixieme.js').then(m => m.anglais6eme),
  cinquieme: () => import('./cinquieme.js').then(m => m.anglais5eme)
  // quatrieme et troisieme seront ajoutés plus tard
};
