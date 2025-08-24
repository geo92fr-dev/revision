import React from 'react';
import { coursData } from '../coursData';
import './Cours.css';

const CoursComponent = ({ coursId, subject, level, onBack, onQuiz }) => {
  // Chercher les données du cours
  // Pour les mathématiques, on cherche dans toutes les matières du coursData
  let matiereData = null;
  let competenceData = null;
  
  if (subject.toLowerCase() === 'mathématiques') {
    // Chercher dans toutes les matières mathématiques
    for (const matiere of coursData) {
      const niveauData = matiere.niveaux.find(n => 
        n.nom.toLowerCase() === level.toLowerCase()
      );
      
      if (niveauData) {
        const comp = niveauData.competences.find(c => 
          c.nom.toLowerCase().replace(/\s+/g, '-') === coursId ||
          c.nom === coursId
        );
        
        if (comp) {
          matiereData = matiere;
          competenceData = comp;
          break;
        }
      }
    }
  } else {
    // Pour les autres matières, recherche normale
    matiereData = coursData.find(m => 
      m.nom.toLowerCase() === subject.toLowerCase()
    );
  }
  
  if (!matiereData) {
    return (
      <div className="cours-container">
        <div className="error-message">
          <h2>Matière non trouvée</h2>
          <button onClick={onBack} className="btn-retour">Retour</button>
        </div>
      </div>
    );
  }
  
  if (subject.toLowerCase() !== 'mathématiques') {
    const niveauData = matiereData.niveaux.find(n => 
      n.nom.toLowerCase() === level.toLowerCase()
    );
    
    if (!niveauData) {
      return (
        <div className="cours-container">
          <div className="error-message">
            <h2>Niveau non trouvé</h2>
            <button onClick={onBack} className="btn-retour">Retour</button>
          </div>
        </div>
      );
    }
    
    // Chercher la compétence par son identifiant
    competenceData = niveauData.competences.find(c => 
      c.nom.toLowerCase().replace(/\s+/g, '-') === coursId ||
      c.nom === coursId
    );
  }
  
  if (!competenceData) {
    return (
      <div className="cours-container">
        <div className="error-message">
          <h2>Cours non trouvé</h2>
          <p>ID: {coursId}</p>
          <p>Matière: {subject} | Niveau: {level}</p>
          <button onClick={onBack} className="btn-retour">Retour</button>
        </div>
      </div>
    );
  }
  
  // Fonction pour convertir URL YouTube en URL d'embed
  const getYouTubeEmbedUrl = (url) => {
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
  
  const embedUrl = getYouTubeEmbedUrl(competenceData.Video_YouTube);
  
  return (
    <div className="cours-container">
      <div className="cours-header">
        <button className="back-btn" onClick={onBack}>
          ← Retour
        </button>
        <h1>{competenceData.nom}</h1>
        <p className="cours-meta">{subject} - {level}</p>
      </div>
      
      <div className="cours-content">
        {embedUrl ? (
          <div className="video-section">
            <h2>Vidéo du cours</h2>
            <div className="video-container">
              <iframe
                src={embedUrl}
                title={`Cours: ${competenceData.nom}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="no-video">
            <h2>Cours : {competenceData.nom}</h2>
            <p>Vidéo en cours de préparation...</p>
          </div>
        )}
        
        {competenceData.Site && (
          <div className="site-reference">
            <h3>📚 Cours en ligne complémentaire</h3>
            <div className="site-link-container">
              <p>Pour approfondir ce chapitre, consultez ce cours en ligne :</p>
              <a 
                href={competenceData.Site} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="site-link"
              >
                <span className="link-icon">🔗</span>
                <span className="link-text">Accéder au cours en ligne</span>
                <span className="external-icon">↗</span>
              </a>
              <p className="site-description">
                <small>Exercices interactifs, exemples détaillés et explications supplémentaires</small>
              </p>
            </div>
          </div>
        )}
        
        <div className="cours-actions">
          <button onClick={onBack} className="btn-retour">
            ← Retour aux compétences
          </button>
          {onQuiz && (
            <button onClick={() => onQuiz(coursId, subject, level)} className="btn-quiz">
              Faire le quiz →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursComponent;
