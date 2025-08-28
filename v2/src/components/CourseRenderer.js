/**
 * 🎭 CourseRenderer - Moteur de rendu modulaire pour les cours
 * 
 * Ce module centralise la logique de rendu des différents formats de cours
 * et coordonne l'affichage avec les composants pédagogiques existants.
 */

export class CourseRenderer {
    constructor() {
        this.components = new Map();
        this.currentFormat = null;
    }

    /**
     * Rend un cours selon son format
     */
    async renderCourse(moduleData) {
        console.log('🎨 Début du rendu du cours:', moduleData.titre);
        
        // Déterminer le format et appliquer le rendu approprié
        switch (moduleData.format) {
            case '4-phases':
                return await this._render4Phases(moduleData);
            case 'competences':
                return await this._renderCompetences(moduleData);
            default:
                console.warn('⚠️ Format non reconnu, tentative de rendu générique');
                return await this._renderGeneric(moduleData);
        }
    }

    /**
     * Rendu pour le format 4-phases (nouveau format)
     */
    async _render4Phases(data) {
        console.log('📚 Rendu format 4-phases');
        this.currentFormat = '4-phases';
        
        // Mise à jour des informations générales
        this._updateGeneralInfo(data);
        
        // Afficher la section d'informations
        this._showInfoSection();
        
        // Rendre chaque phase disponible
        await this._renderAvailablePhases(data);
        
        // Masquer les sections non utilisées dans ce format
        this._hideUnusedSections(['coursSection', 'exercicesSection', 'evaluationSection', 'metacognitionSection']);
    }

    /**
     * Rendu pour le format compétences (ancien format)
     */
    async _renderCompetences(data) {
        console.log('🏛️ Rendu format compétences (ancien)');
        this.currentFormat = 'competences';
        
        const competence = data.competence;
        
        // Mise à jour des informations générales
        this._updateGeneralInfo({
            titre: data.titre,
            niveau: data.niveau,
            description: competence.objectif,
            utilite: competence.utilite,
            funFact: competence.funFact
        });
        
        // Afficher la section d'informations
        this._showInfoSection();
        
        // Rendre les sections de l'ancien format
        await this._renderLegacySections(competence);
    }

    /**
     * Met à jour les informations générales de la page
     */
    _updateGeneralInfo(data) {
        console.log('📝 Mise à jour des informations générales:', data);
        
        // Titre de la page et principal
        const pageTitle = document.getElementById('pageTitle');
        const mainTitle = document.getElementById('mainTitle');
        
        if (pageTitle) pageTitle.textContent = `${data.titre} - ${data.niveau}`;
        if (mainTitle) mainTitle.textContent = `📚 ${data.titre}`;
        
        // Objectif
        const objectifText = data.description || data.objectif || 'Apprentissage des concepts fondamentaux';
        const objectifElement = document.getElementById('objectifText');
        if (objectifElement) {
            objectifElement.textContent = objectifText;
            console.log('✅ Objectif mis à jour:', objectifText);
        }
        
        // Utilité
        const utiliteText = data.utilite || 'Cette compétence est essentielle pour votre progression.';
        const utiliteElement = document.getElementById('utiliteText');
        if (utiliteElement) {
            utiliteElement.textContent = utiliteText;
            console.log('✅ Utilité mise à jour:', utiliteText);
        }
        
        // Fun fact
        const funFactText = data.funFact || 'Saviez-vous que l\'apprentissage actif améliore la rétention de 60% ? 🧠✨';
        const funFactElement = document.getElementById('funFactText');
        if (funFactElement) {
            funFactElement.innerHTML = funFactText;
            console.log('✅ Fun fact mis à jour:', funFactText);
        }
        
        console.log('✅ Informations générales mises à jour avec succès');
    }

    /**
     * Affiche la section d'informations
     */
    _showInfoSection() {
        const infoSection = document.getElementById('infoSection');
        if (infoSection) {
            infoSection.style.display = 'block';
            console.log('✅ Section info affichée');
        }
    }

    /**
     * Rend les phases disponibles (format 4-phases)
     */
    async _renderAvailablePhases(data) {
        const phaseRenderers = {
            phase1: () => this._renderPhase1(data.phase1),
            phase2: () => this._renderPhase2(data.phase2),
            phase3: () => this._renderPhase3(data.phase3),
            phase4: () => this._renderPhase4(data.phase4)
        };

        for (const [phaseKey, renderer] of Object.entries(phaseRenderers)) {
            if (data[phaseKey]) {
                console.log(`🔄 Rendu de ${phaseKey}:`, data[phaseKey].titre);
                try {
                    await renderer();
                } catch (error) {
                    console.error(`❌ Erreur lors du rendu de ${phaseKey}:`, error);
                }
            }
        }
    }

    /**
     * Rend la Phase 1 - Que sais-je déjà ?
     */
    async _renderPhase1(phase1Data) {
        if (!phase1Data || !phase1Data.exercices) {
            console.log('⚠️ Phase 1 non disponible ou sans exercices');
            return;
        }

        console.log('🔍 Rendu Phase 1 - Pré-évaluation');
        
        // Importer et utiliser le composant QuizPreEvaluation existant
        const questions = phase1Data.exercices.map(exercice => ({
            question: exercice.question,
            options: exercice.options || [],
            correct: exercice.correct,
            explication: exercice.explication || exercice.aide,
            type: exercice.type
        }));

        // Utiliser les composants existants de page_de_cours.html
        if (typeof window.renderPreEvaluation === 'function') {
            window.renderPreEvaluation(questions);
        } else {
            console.warn('⚠️ Fonction renderPreEvaluation non disponible');
        }
    }

    /**
     * Rend la Phase 2 - J'apprends
     */
    async _renderPhase2(phase2Data) {
        if (!phase2Data) {
            console.log('⚠️ Phase 2 non disponible');
            return;
        }

        console.log('📖 Rendu Phase 2 - Cours');
        
        // Construire les données de compétence pour le composant ModuleLecon
        const competenceData = {
            titre: phase2Data.titre,
            objectif: phase2Data.objectif,
            cours: phase2Data.cours,
            definition: phase2Data.cours?.definition,
            proprietes: phase2Data.cours?.proprietes,
            exemples: phase2Data.cours?.exemples,
            exercices: phase2Data.exercices || []
        };

        // Utiliser les composants existants
        if (typeof window.renderCoursSection === 'function') {
            window.renderCoursSection(competenceData);
        } else {
            console.warn('⚠️ Fonction renderCoursSection non disponible');
        }
    }

    /**
     * Rend la Phase 3 - Je m'entraîne
     */
    async _renderPhase3(phase3Data) {
        if (!phase3Data) {
            console.log('⚠️ Phase 3 non disponible');
            return;
        }

        console.log('💪 Rendu Phase 3 - Exercices');
        
        const competenceData = {
            titre: phase3Data.titre,
            objectif: phase3Data.objectif,
            exercices: phase3Data.exercices || [],
            defi: phase3Data.defi
        };

        // Utiliser les composants existants
        if (typeof window.renderExercices === 'function') {
            window.renderExercices(competenceData);
        } else {
            console.warn('⚠️ Fonction renderExercices non disponible');
        }
    }

    /**
     * Rend la Phase 4 - Je réfléchis
     */
    async _renderPhase4(phase4Data) {
        if (!phase4Data) {
            console.log('⚠️ Phase 4 non disponible');
            return;
        }

        console.log('🤔 Rendu Phase 4 - Métacognition');
        
        const metacognitionData = {
            questions: phase4Data.questions || [],
            defis: phase4Data.defis || []
        };

        // Utiliser les composants existants
        if (typeof window.renderMetacognition === 'function') {
            window.renderMetacognition(metacognitionData);
        } else {
            console.warn('⚠️ Fonction renderMetacognition non disponible');
        }
    }

    /**
     * Rend les sections de l'ancien format (compétences)
     */
    async _renderLegacySections(competence) {
        console.log('🏛️ Rendu sections format ancien');

        // Pré-évaluation
        if (competence.preEvaluation?.questions) {
            if (typeof window.renderPreEvaluation === 'function') {
                window.renderPreEvaluation(competence.preEvaluation.questions);
            }
        }

        // Cours
        if (typeof window.renderCoursSection === 'function') {
            window.renderCoursSection(competence);
        }

        // Exercices
        if (typeof window.renderExercices === 'function') {
            window.renderExercices(competence);
        }

        // Métacognition
        if (competence.metacognition?.questions) {
            if (typeof window.renderMetacognition === 'function') {
                window.renderMetacognition(competence.metacognition);
            }
        }
    }

    /**
     * Masque les sections non utilisées
     */
    _hideUnusedSections(sectionIds) {
        sectionIds.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
            }
        });
        console.log('🙈 Sections non utilisées masquées:', sectionIds);
    }

    /**
     * Rendu générique pour formats non reconnus
     */
    async _renderGeneric(data) {
        console.log('🔧 Rendu générique pour format non reconnu');
        
        this._updateGeneralInfo({
            titre: data.titre || 'Cours',
            niveau: data.niveau || 'Niveau non spécifié',
            description: 'Ce cours est en cours de développement.',
            utilite: 'Le contenu sera bientôt disponible.',
            funFact: 'Patience ! Notre équipe travaille sur ce contenu 🚧✨'
        });

        this._showInfoSection();
        this._hideUnusedSections(['coursSection', 'exercicesSection', 'evaluationSection', 'metacognitionSection']);
        
        // Afficher un message de développement en cours
        this._showDevelopmentMessage(data);
    }

    /**
     * Affiche un message de développement
     */
    _showDevelopmentMessage(data) {
        const infoSection = document.getElementById('infoSection');
        if (infoSection) {
            const devMessage = document.createElement('div');
            devMessage.innerHTML = `
                <div class="section">
                    <h3>🚧 Contenu en développement</h3>
                    <p>Ce module sera bientôt disponible avec un contenu complet.</p>
                    <details>
                        <summary>Informations de débogage</summary>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    </details>
                </div>
            `;
            infoSection.appendChild(devMessage);
        }
    }

    /**
     * Nettoie les composants actifs
     */
    cleanup() {
        this.components.clear();
        this.currentFormat = null;
        console.log('🧹 CourseRenderer nettoyé');
    }

    /**
     * Obtient des informations sur l'état actuel
     */
    getStatus() {
        return {
            format: this.currentFormat,
            componentCount: this.components.size,
            activeComponents: Array.from(this.components.keys())
        };
    }
}

// Instance singleton
export const courseRenderer = new CourseRenderer();
