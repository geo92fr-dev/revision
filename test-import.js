// Test simple d'import du module addition-soustraction
import { additionSoustraction6eme } from './addition-soustraction.js';

console.log('Module chargé avec succès:', additionSoustraction6eme);
console.log('Compétences:', additionSoustraction6eme.competences.length);
console.log('Defi présent:', !!additionSoustraction6eme.defi);
console.log('PreEvaluation présente:', !!additionSoustraction6eme.competences[0].preEvaluation);
