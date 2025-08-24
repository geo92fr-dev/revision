/**
 * Utilitaires pour l'application FunRevis
 */

/**
 * Convertit une URL YouTube en URL d'embed
 * @param {string} url - URL YouTube
 * @returns {string|null} - URL d'embed ou null si invalide
 */
export const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  
  // Si c'est déjà une URL d'embed, la retourner
  if (url.includes('embed/')) {
    return url;
  }
  
  // Extraire l'ID de la vidéo
  let videoId = null;
  
  if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else {
    // Si c'est juste un ID de vidéo (pas d'URL complète)
    videoId = url;
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

/**
 * Génère un ID de cours à partir du nom de la compétence
 * @param {string} competenceName - Nom de la compétence
 * @returns {string} - ID du cours
 */
export const generateCoursId = (competenceName) => {
  if (!competenceName || typeof competenceName !== 'string') {
    return '';
  }
  
  return competenceName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, '') // Garder seulement lettres, chiffres, espaces et tirets
    .replace(/\s+/g, '-') // Remplacer espaces par tirets
    .replace(/-+/g, '-') // Supprimer tirets multiples
    .replace(/^-|-$/g, ''); // Supprimer tirets en début/fin
};

/**
 * Valide une structure de données de cours
 * @param {Object} coursData - Données du cours
 * @returns {boolean} - True si valide
 */
export const validateCoursData = (coursData) => {
  if (!coursData || !Array.isArray(coursData)) {
    return false;
  }
  
  return coursData.every(matiere => {
    if (!matiere.nom || !Array.isArray(matiere.niveaux)) {
      return false;
    }
    
    return matiere.niveaux.every(niveau => {
      if (!niveau.nom || !Array.isArray(niveau.competences)) {
        return false;
      }
      
      return niveau.competences.every(competence => {
        return competence.nom && typeof competence.nom === 'string';
      });
    });
  });
};

/**
 * Trouve une compétence dans les données de cours
 * @param {Array} coursData - Données des cours
 * @param {string} coursId - ID du cours
 * @param {string} subject - Matière
 * @param {string} level - Niveau
 * @returns {Object|null} - Compétence trouvée ou null
 */
export const findCompetence = (coursData, coursId, subject, level) => {
  if (!coursData || !coursId || !subject || !level) {
    return null;
  }
  
  // Pour les mathématiques, chercher dans toutes les matières
  if (subject.toLowerCase() === 'mathématiques') {
    for (const matiere of coursData) {
      const niveauData = matiere.niveaux.find(n => 
        n.nom.toLowerCase() === level.toLowerCase()
      );
      
      if (niveauData) {
        const competence = niveauData.competences.find(c => 
          generateCoursId(c.nom) === coursId || c.nom === coursId
        );
        
        if (competence) {
          return { matiere, niveau: niveauData, competence };
        }
      }
    }
  } else {
    // Pour les autres matières
    const matiere = coursData.find(m => 
      m.nom.toLowerCase() === subject.toLowerCase()
    );
    
    if (matiere) {
      const niveau = matiere.niveaux.find(n => 
        n.nom.toLowerCase() === level.toLowerCase()
      );
      
      if (niveau) {
        const competence = niveau.competences.find(c => 
          generateCoursId(c.nom) === coursId || c.nom === coursId
        );
        
        if (competence) {
          return { matiere, niveau, competence };
        }
      }
    }
  }
  
  return null;
};

/**
 * Formate un nom d'utilisateur pour l'affichage
 * @param {Object} user - Objet utilisateur Firebase
 * @returns {string} - Nom formaté
 */
export const formatUserName = (user) => {
  if (!user) return 'Utilisateur';
  
  if (user.displayName) {
    return user.displayName;
  }
  
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  return 'Utilisateur';
};
