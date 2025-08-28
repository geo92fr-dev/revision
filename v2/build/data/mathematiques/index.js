// Index des données mathématiques - Nouveau format basé sur reference.js
// import mathematiques6emeData from './6ieme/index.js';
// export const mathematiques = {
  "6eme": mathematiques6emeData,
  // Les autres niveaux seront ajoutés quand ils seront créés avec le nouveau format
};
// Export direct pour compatibilité
// export const mathematiques6eme = mathematiques6emeData;
// Exposition pour compatibilité avec cours.html
if (typeof window !== 'undefined') {
    window.data = mathematiques;
    console.log('✅ mathematiques chargé dans window.data')
}