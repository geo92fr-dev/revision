// Utilitaire de migration des données - compatibilité ancienne structure
export function convertToLegacyFormat(newFormatData) {
  const legacyData = [];
  
  // Protection contre les données vides ou invalides
  if (!newFormatData || !Array.isArray(newFormatData)) {
    return legacyData;
  }
  
  // Grouper par chapitre principal
  const groupedByChapter = {};
  
  newFormatData.forEach(item => {
    const chapterKey = item.chapitre;
    if (!groupedByChapter[chapterKey]) {
      groupedByChapter[chapterKey] = {
        nom: chapterKey,
        niveaux: []
      };
    }
    
    // Chercher ou créer le niveau
    let niveauData = groupedByChapter[chapterKey].niveaux.find(n => n.nom === item.niveau);
    if (!niveauData) {
      niveauData = {
        nom: item.niveau,
        competences: []
      };
      groupedByChapter[chapterKey].niveaux.push(niveauData);
    }
    
    // Ajouter les compétences avec mapping de propriétés
    if (item.competences && Array.isArray(item.competences)) {
      item.competences.forEach(comp => {
      // Extraire l'ID YouTube de l'URL
      let youtubeId = "";
      const videoResource = comp.ressources?.find(r => r.type === "vidéo");
      if (videoResource?.url) {
        const url = videoResource.url;
        if (url.includes('watch?v=')) {
          youtubeId = url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
          youtubeId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('/embed/')) {
          youtubeId = url.split('/embed/')[1].split('?')[0];
        }
      }
      
      niveauData.competences.push({
        nom: comp.titre,
        chapitre: comp.id,
        description: comp.description,
        exemple: comp.exemple,
        Video_YouTube: youtubeId,
        Site: comp.ressources?.find(r => r.type !== "vidéo")?.url || 
              (videoResource && !youtubeId ? videoResource.url : "") // Si vidéo non-YouTube, mettre dans Site
      });
    });
    } // Fermeture du if pour les compétences
  });
  
  // Convertir en tableau
  Object.values(groupedByChapter).forEach(chapter => {
    legacyData.push(chapter);
  });
  
  return legacyData;
}
