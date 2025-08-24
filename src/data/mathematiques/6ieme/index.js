// Index des données de mathématiques pour la 6ème
import { additionSoustraction6eme } from './addition-soustraction.js';
import { multiplication6eme } from './multiplication.js';
import { division6eme } from './division.js';
import { figuresPlanes6eme } from './figures-planes.js';
import { perimetre6eme } from './perimetre.js';
import { fractions6eme } from './fractions.js';

// Export par défaut regroupant tout le niveau 6ème
export default {
  'addition-soustraction': additionSoustraction6eme,
  multiplication: multiplication6eme,
  division: division6eme,
  'figures-planes': figuresPlanes6eme,
  perimetre: perimetre6eme,
  fractions: fractions6eme
};

// Exports nommés pour compatibilité
export { additionSoustraction6eme, multiplication6eme, division6eme, figuresPlanes6eme, perimetre6eme, fractions6eme };
