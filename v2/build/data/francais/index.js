// Export des données Français par niveau
export { francais6eme } from './sixieme.js';
export { francais5eme } from './cinquieme.js';
export { francais4eme } from './quatrieme.js';
export { francais3eme } from './troisieme.js';

// Export groupé pour faciliter l'import
export const francaisData = {
  sixieme: () => import('./sixieme.js').then(m => m.francais6eme),
  cinquieme: () => import('./cinquieme.js').then(m => m.francais5eme),
  quatrieme: () => import('./quatrieme.js').then(m => m.francais4eme),
  troisieme: () => import('./troisieme.js').then(m => m.francais3eme)
};
