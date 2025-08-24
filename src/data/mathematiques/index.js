// Index des données mathématiques
import { mathematiques6eme } from './sixieme.js';
import { mathematiques5eme } from './cinquieme.js';
import { mathematiques4eme } from './quatrieme.js';
import { mathematiques3eme } from './troisieme.js';

export const mathematiques = {
  "6ème": mathematiques6eme,
  "5ème": mathematiques5eme,
  "4ème": mathematiques4eme,
  "3ème": mathematiques3eme
};

// Exports individuels pour un accès direct
export { 
  mathematiques6eme, 
  mathematiques5eme, 
  mathematiques4eme, 
  mathematiques3eme 
};
