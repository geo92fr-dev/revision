import React, { useState } from 'react';
import { coursData } from '../coursData';
import './Revisions.css';

const Revisions = ({ onBack, onQuiz, onCours }) => {
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [selectedNiveau, setSelectedNiveau] = useState(null);

  // Fonction pour générer les compétences à partir de coursData
  const generateCompetences = (matiere, niveau) => {
    // Pour les mathématiques, on récupère toutes les matières du coursData
    if (matiere.toLowerCase() === "mathématiques") {
      const allCompetences = [];
      coursData.forEach(matiereData => {
        const niveauData = matiereData.niveaux.find(n => n.nom.toLowerCase() === niveau.toLowerCase());
        if (niveauData) {
          niveauData.competences.forEach(comp => {
            allCompetences.push({
              icone: "📚", // Icône par défaut
              titre: comp.nom,
              savoirFaire: comp.nom, // Utilise le nom de la compétence comme description
              exemple: comp.description || "Exemple à venir...",
              hasQuiz: true,
              quizId: comp.nom.toLowerCase().replace(/\s+/g, '-'),
              hasCours: !!(comp.Video_YouTube || comp.Site), // Active le cours s'il y a une vidéo ou un site
              coursId: comp.nom.toLowerCase().replace(/\s+/g, '-')
            });
          });
        }
      });
      return allCompetences;
    }
    
    // Pour les autres matières, recherche normale
    const matiereData = coursData.find(m => m.nom.toLowerCase() === matiere.toLowerCase());
    if (!matiereData) return [];
    
    const niveauData = matiereData.niveaux.find(n => n.nom.toLowerCase() === niveau.toLowerCase());
    if (!niveauData) return [];
    
    return niveauData.competences.map(comp => ({
      icone: "📚", // Icône par défaut
      titre: comp.nom,
      savoirFaire: comp.nom, // Utilise le nom de la compétence comme description
      exemple: comp.description || "Exemple à venir...",
      hasQuiz: true,
      quizId: comp.nom.toLowerCase().replace(/\s+/g, '-'),
      hasCours: !!(comp.Video_YouTube || comp.Site), // Active le cours s'il y a une vidéo ou un site
      coursId: comp.nom.toLowerCase().replace(/\s+/g, '-')
    }));
  };

  const niveaux = {
    "6eme": { nom: "6ème", couleur: "#3498db" },
    "5eme": { nom: "5ème", couleur: "#2ecc71" },
    "4eme": { nom: "4ème", couleur: "#f39c12" },
    "3eme": { nom: "3ème", couleur: "#e74c3c" }
  };

  const matieres = {
    francais: {
      nom: "Français",
      icone: "📖",
      color: "#e74c3c",
      niveaux: {
        "6eme": {
          competences: [
            {
              icone: "📖",
              titre: "Lecture et compréhension",
              savoirFaire: "Identifier idées principales, personnages, lieux et événements",
              exemple: "Lire un conte et résumer l'histoire",
              hasQuiz: false
            },
            {
              icone: "✍️",
              titre: "Expression écrite",
              savoirFaire: "Rédiger un paragraphe structuré avec connecteurs logiques",
              exemple: "Décrire sa journée ou rédiger un petit texte narratif",
              hasQuiz: false
            },
            {
              icone: "📝",
              titre: "Grammaire et vocabulaire",
              savoirFaire: "Conjuguer verbes au présent, passé composé, futur proche ; enrichir le vocabulaire",
              exemple: "Écrire 5 phrases correctement en utilisant de nouveaux mots",
              hasQuiz: false
            }
          ]
        },
        "5eme": {
          competences: [
            {
              icone: "📚",
              titre: "Étude de textes littéraires",
              savoirFaire: "Analyser des extraits de romans, nouvelles et poèmes",
              exemple: "Étudier un passage d'un roman d'aventures",
              hasQuiz: false
            },
            {
              icone: "✍️",
              titre: "Rédaction structurée",
              savoirFaire: "Rédiger des textes narratifs et descriptifs organisés",
              exemple: "Écrire un récit d'aventure de 2 pages",
              hasQuiz: false
            },
            {
              icone: "🎭",
              titre: "Théâtre et expression orale",
              savoirFaire: "Lire et jouer des scènes de théâtre",
              exemple: "Interpréter un dialogue de Molière",
              hasQuiz: false
            }
          ]
        },
        "4eme": {
          competences: [
            {
              icone: "📰",
              titre: "Presse et information",
              savoirFaire: "Analyser articles de presse et distinguer faits/opinions",
              exemple: "Comparer le traitement d'un événement dans deux journaux",
              hasQuiz: false
            },
            {
              icone: "💬",
              titre: "Argumentation",
              savoirFaire: "Construire et défendre un point de vue avec des arguments",
              exemple: "Rédiger une lettre de réclamation argumentée",
              hasQuiz: false
            }
          ]
        },
        "3eme": {
          competences: [
            {
              icone: "🎓",
              titre: "Préparation au lycée",
              savoirFaire: "Maîtriser l'analyse littéraire et la dissertation",
              exemple: "Analyser un poème et rédiger un commentaire structuré",
              hasQuiz: false
            },
            {
              icone: "🗣️",
              titre: "Oral du brevet",
              savoirFaire: "Présenter un projet à l'oral avec support",
              exemple: "Soutenir un projet sur l'histoire des arts",
              hasQuiz: false
            }
          ]
        }
      }
    },
    mathematiques: {
      nom: "Mathématiques",
      icone: "➗",
      color: "#3498db",
      niveaux: {
        "6eme": {
          competences: generateCompetences("Mathématiques", "6ème")
        },
        "5eme": {
          competences: [
            {
              icone: "➕➖",
              titre: "Nombres et calculs",
              savoirFaire: "Puissances d'exposant positif, nombres relatifs, proportionnalité, fractions avancées",
              exemple: "Calculer (-5) + (+3) = -2 ou résoudre un tableau de proportionnalité",
              hasQuiz: true,
              quizId: "5eme-nombres-calculs",
              hasCours: true,
              coursId: "5eme-nombres-calculs"
            },
            {
              icone: "�",
              titre: "Géométrie",
              savoirFaire: "Triangles, quadrilatères, symétrie centrale, aires complexes, agrandissements",
              exemple: "Calculer l'aire d'un triangle : A = (base × hauteur) ÷ 2",
              hasQuiz: true,
              quizId: "5eme-geometrie",
              hasCours: true,
              coursId: "5eme-geometrie"
            },
            {
              icone: "📦",
              titre: "Grandeurs et mesures",
              savoirFaire: "Volumes du cube et pavé droit, conversions volume/capacité, proportionnalité",
              exemple: "Volume cube = côté³ = 5³ = 125 cm³",
              hasQuiz: true,
              quizId: "5eme-grandeurs-mesures",
              hasCours: true,
              coursId: "5eme-grandeurs-mesures"
            },
            {
              icone: "�",
              titre: "Organisation et gestion de données",
              savoirFaire: "Diagrammes complexes, pourcentages, initiation aux probabilités",
              exemple: "Calculer 15% de 80 : 80 × 0,15 = 12",
              hasQuiz: true,
              quizId: "5eme-donnees",
              hasCours: true,
              coursId: "5eme-donnees"
            }
          ]
        },
        "4eme": {
          competences: [
            {
              icone: "📈",
              titre: "Nombres et calculs",
              savoirFaire: "Puissances exposants négatifs, développement/factorisation, équations du 1er degré",
              exemple: "Développer (x + 2)(x - 3) = x² - x - 6",
              hasQuiz: true,
              quizId: "4eme-nombres-calculs",
              hasCours: true,
              coursId: "4eme-nombres-calculs"
            },
            {
              icone: "📐",
              titre: "Géométrie",
              savoirFaire: "Théorème de Pythagore et réciproque, Thalès, triangles particuliers, cercles",
              exemple: "Dans un triangle rectangle : a² + b² = c²",
              hasQuiz: true,
              quizId: "4eme-geometrie",
              hasCours: true,
              coursId: "4eme-geometrie"
            },
            {
              icone: "🌐",
              titre: "Grandeurs et mesures",
              savoirFaire: "Pythagore pour calculer longueurs, aires et volumes complexes (cylindre, cône, sphère)",
              exemple: "Volume cylindre = π × r² × h",
              hasQuiz: true,
              quizId: "4eme-grandeurs-mesures",
              hasCours: true,
              coursId: "4eme-grandeurs-mesures"
            },
            {
              icone: "📊",
              titre: "Organisation et gestion de données",
              savoirFaire: "Graphiques avancés, probabilités combinées, médiane et quartiles",
              exemple: "Médiane de 2, 5, 7, 9, 12 est 7 (valeur centrale)",
              hasQuiz: true,
              quizId: "4eme-donnees",
              hasCours: true,
              coursId: "4eme-donnees"
            }
          ]
        },
        "3eme": {
          competences: [
            {
              icone: "√",
              titre: "Nombres et calculs",
              savoirFaire: "Racines carrées, équations/inéquations, systèmes, fonctions linéaires et affines",
              exemple: "√25 = 5 ou résoudre 2x + 3 = 11 donc x = 4",
              hasQuiz: true,
              quizId: "3eme-nombres-calculs",
              hasCours: true,
              coursId: "3eme-nombres-calculs"
            },
            {
              icone: "📐",
              titre: "Géométrie",
              savoirFaire: "Pythagore/Thalès complexes, trigonométrie, géométrie analytique, volumes",
              exemple: "sin(30°) = 0,5 dans un triangle rectangle",
              hasQuiz: true,
              quizId: "3eme-geometrie",
              hasCours: true,
              coursId: "3eme-geometrie"
            },
            {
              icone: "📊",
              titre: "Statistiques et probabilités",
              savoirFaire: "Moyenne, médiane, étendue, histogrammes, événements composés",
              exemple: "P(A et B) = P(A) × P(B) si A et B indépendants",
              hasQuiz: true,
              quizId: "3eme-statistiques",
              hasCours: true,
              coursId: "3eme-statistiques"
            },
            {
              icone: "🎯",
              titre: "Raisonnement et logique",
              savoirFaire: "Démarche rigoureuse, démonstrations, vérification de cohérence",
              exemple: "Rédiger une démonstration du théorème de Pythagore",
              hasQuiz: true,
              quizId: "3eme-raisonnement",
              hasCours: true,
              coursId: "3eme-raisonnement"
            }
          ]
        }
      }
    },
    anglais: {
      nom: "Anglais",
      icone: "🇬🇧",
      color: "#9b59b6",
      niveaux: {
        "6eme": {
          competences: [
            {
              icone: "👋",
              titre: "Se présenter",
              savoirFaire: "Dire son nom, âge, nationalité, hobbies",
              exemple: "Hi! My name is... I'm 11 years old. I like football.",
              hasQuiz: false
            },
            {
              icone: "🏠",
              titre: "Vocabulaire de base",
              savoirFaire: "Connaître famille, couleurs, nombres, école",
              exemple: "This is my brother. He has brown hair.",
              hasQuiz: false
            }
          ]
        },
        "5eme": {
          competences: [
            {
              icone: "🕰️",
              titre: "Temps et habitudes",
              savoirFaire: "Parler d'habitudes, dire l'heure, les jours",
              exemple: "I usually wake up at 7 o'clock on Monday.",
              hasQuiz: false
            },
            {
              icone: "🌍",
              titre: "Pays et cultures",
              savoirFaire: "Découvrir pays anglophones et leurs traditions",
              exemple: "In England, people drink tea at 5 pm.",
              hasQuiz: false
            }
          ]
        },
        "4eme": {
          competences: [
            {
              icone: "📰",
              titre: "Actualité et médias",
              savoirFaire: "Comprendre articles simples et donner son opinion",
              exemple: "I think this article about climate is interesting.",
              hasQuiz: false
            }
          ]
        },
        "3eme": {
          competences: [
            {
              icone: "🎓",
              titre: "Préparation lycée",
              savoirFaire: "Comprendre textes complexes et s'exprimer clairement",
              exemple: "Analyser un texte littéraire en anglais",
              hasQuiz: false
            }
          ]
        }
      }
    },
    sciences: {
      nom: "Sciences",
      icone: "🔬",
      color: "#27ae60",
      niveaux: {
        "6eme": {
          competences: [
            {
              icone: "🌱",
              titre: "Êtres vivants",
              savoirFaire: "Classer animaux/plantes, comprendre besoins vitaux",
              exemple: "Classer mammifères, oiseaux, reptiles",
              hasQuiz: false
            },
            {
              icone: "💧",
              titre: "États de la matière",
              savoirFaire: "Distinguer solide/liquide/gaz et changements d'état",
              exemple: "Expliquer pourquoi la glace fond au soleil",
              hasQuiz: false
            }
          ]
        },
        "5eme": {
          competences: [
            {
              icone: "🫁",
              titre: "Corps humain",
              savoirFaire: "Connaître respiration, circulation, digestion",
              exemple: "Schéma du système respiratoire",
              hasQuiz: false
            },
            {
              icone: "⚡",
              titre: "Électricité",
              savoirFaire: "Circuits simples, notion de courant électrique",
              exemple: "Allumer une ampoule avec une pile et des fils",
              hasQuiz: false
            }
          ]
        },
        "4eme": {
          competences: [
            {
              icone: "⚗️",
              titre: "Réactions chimiques",
              savoirFaire: "Comprendre transformations chimiques simples",
              exemple: "Combustion, oxydation du fer",
              hasQuiz: false
            }
          ]
        },
        "3eme": {
          competences: [
            {
              icone: "🧬",
              titre: "Génétique",
              savoirFaire: "Hérédité, transmission caractères, ADN",
              exemple: "Expliquer pourquoi on ressemble à ses parents",
              hasQuiz: false
            }
          ]
        }
      }
    }
  };

  return (
    <div className="revisions-container">
      <header className="revisions-header">
        <button className="back-btn" onClick={onBack}>
          ← Retour à l'accueil
        </button>
        <h1>📚 Révisions efficaces - Niveau Collège</h1>
        <p className="subtitle">Prérequis essentiels pour réussir au collège</p>
      </header>

      {!selectedMatiere ? (
        // Vue des matières
        <div className="matieres-grid">
          {Object.entries(matieres).map(([key, matiere]) => (
            <div 
              key={key}
              className="matiere-card"
              style={{ borderLeftColor: matiere.color }}
              onClick={() => setSelectedMatiere(key)}
            >
              <div className="matiere-header">
                <span className="matiere-icone">{matiere.icone}</span>
                <h3>{matiere.nom}</h3>
              </div>
              <p className="competences-count">
                4 niveaux disponibles
              </p>
              <div className="niveaux-preview">
                {Object.entries(niveaux).map(([niveauKey, niveau]) => (
                  <span key={niveauKey} className="niveau-badge" style={{ backgroundColor: niveau.couleur }}>
                    {niveau.nom}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : !selectedNiveau ? (
        // Vue des niveaux pour une matière
        <div className="matiere-detail">
          <div className="detail-header">
            <button 
              className="back-to-list"
              onClick={() => setSelectedMatiere(null)}
            >
              ← Retour aux matières
            </button>
            <div className="matiere-title">
              <span className="matiere-icone-large">
                {matieres[selectedMatiere].icone}
              </span>
              <h2>{matieres[selectedMatiere].nom}</h2>
            </div>
          </div>

          <div className="niveaux-grid">
            {Object.entries(niveaux).map(([niveauKey, niveau]) => {
              const competencesCount = matieres[selectedMatiere].niveaux[niveauKey]?.competences?.length || 0;
              return (
                <div 
                  key={niveauKey}
                  className="niveau-card"
                  style={{ borderLeftColor: niveau.couleur }}
                  onClick={() => setSelectedNiveau(niveauKey)}
                >
                  <div className="niveau-header">
                    <span className="niveau-icone">🎓</span>
                    <h3>{niveau.nom}</h3>
                  </div>
                  <p className="competences-count">
                    {competencesCount} compétence{competencesCount > 1 ? 's' : ''} 
                  </p>
                  <div className="niveau-description">
                    Cliquez pour voir les compétences
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Vue des compétences pour un niveau spécifique
        <div className="matiere-detail">
          <div className="detail-header">
            <button 
              className="back-to-list"
              onClick={() => setSelectedNiveau(null)}
            >
              ← Retour aux niveaux
            </button>
            <div className="matiere-title">
              <span className="matiere-icone-large">
                {matieres[selectedMatiere].icone}
              </span>
              <h2>{matieres[selectedMatiere].nom} - {niveaux[selectedNiveau].nom}</h2>
            </div>
          </div>

          <div className="competences-list">
            {matieres[selectedMatiere].niveaux[selectedNiveau]?.competences?.map((competence, index) => (
              <div key={index} className="competence-card">
                <div className="competence-header">
                  <span className="competence-icone-large">
                    {competence.icone}
                  </span>
                  <h3>{competence.titre}</h3>
                </div>
                
                <div className="competence-content">
                  <div className="savoir-faire">
                    <h4>🎯 Savoir-faire attendus</h4>
                    <p>{competence.savoirFaire}</p>
                  </div>
                  
                  <div className="exemple">
                    <h4>💡 Exemple concret</h4>
                    <p>{competence.exemple}</p>
                  </div>
                  
                  <div className="actions-competence">
                    {competence.hasCours && (
                      <button 
                        className="cours-btn"
                        onClick={() => onCours(competence.coursId, matieres[selectedMatiere].nom, niveaux[selectedNiveau].nom)}
                      >
                        📖 Voir le cours
                      </button>
                    )}
                    
                    {competence.hasQuiz && (
                      <button 
                        className="quiz-btn"
                        onClick={() => onQuiz(competence.quizId, matieres[selectedMatiere].nom, niveaux[selectedNiveau].nom)}
                      >
                        🎯 Faire le quiz
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )) || (
              <div className="no-competences">
                <p>Aucune compétence disponible pour ce niveau actuellement.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Revisions;
