// Gestionnaire des sections modulaires - Version propre sans quiz
// Dernière mise à jour: 28/08/2025 - Ajout de normalizeSubject()
class SectionManager {
    constructor() {
        this.sections = [];
        this.courseData = null;
        this.answers = {
            preEvaluation: {},
            exercises: {},
            metacognition: {}
        };
        this.scores = {
            preEvaluation: 0,
            exercises: 0
        };
    }

    // Charger toutes les sections
    async loadSections() {
        console.log('🔧 Chargement des sections modulaires...');
        
        const sectionNames = ['pre-evaluation', 'cours', 'exercices', 'reflexion', 'ressources'];
        const container = document.querySelector('.sections-container');
        
        if (!container) {
            console.error('❌ Container .sections-container non trouvé');
            return;
        }

        container.innerHTML = '';

        for (const sectionName of sectionNames) {
            try {
                const response = await fetch(`sections/${sectionName}.html`);
                if (response.ok) {
                    const html = await response.text();
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    container.appendChild(tempDiv.firstElementChild);
                    console.log(`✅ Section ${sectionName} chargée`);
                } else {
                    console.warn(`⚠️ Section ${sectionName} non trouvée`);
                }
            } catch (error) {
                console.error(`❌ Erreur chargement ${sectionName}:`, error);
            }
        }
    }

    // Normaliser le nom de la matière (gérer les alias)
    normalizeSubject(subject) {
        const aliases = {
            'maths': 'mathematiques',
            'math': 'mathematiques',
            'français': 'francais',
            'sciences': 'sciences',
            'anglais': 'anglais'
        };
        return aliases[subject.toLowerCase()] || subject;
    }

    // Normaliser le niveau (gérer les alias de niveaux)
    normalizeLevel(level) {
        const levelAliases = {
            '6eme': '6ieme',
            '5eme': '5ieme',
            '4eme': '4ieme',
            '3eme': '3ieme',
            '2nde': '2nde',
            '1ere': '1ere',
            'terminale': 'terminale'
        };
        return levelAliases[level.toLowerCase()] || level;
    }

    // Charger les données de cours
    async loadCourseData(subject, level, topic) {
        try {
            const normalizedSubject = this.normalizeSubject(subject);
            const normalizedLevel = this.normalizeLevel(level);
            console.log(`🔄 Normalisation: "${subject}" → "${normalizedSubject}"`);
            console.log(`🔄 Normalisation niveau: "${level}" → "${normalizedLevel}"`);
            // Utiliser un chemin relatif depuis pages/cours.html vers data/
            const dataPath = `../data/${normalizedSubject}/${normalizedLevel}/${topic}.js`;
            console.log('📖 Chargement des données:', dataPath);
            console.log('🌐 URL complète:', window.location.origin + window.location.pathname.replace('/pages/cours.html', '') + '/' + dataPath);
            
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`Données non trouvées: ${dataPath}`);
            }
            
            const scriptText = await response.text();
            const script = document.createElement('script');
            script.textContent = scriptText;
            document.head.appendChild(script);
            
            this.courseData = window.data || data;
            
            if (!this.courseData) {
                throw new Error('Données de cours non trouvées dans le script');
            }
            
            console.log('✅ Données de cours chargées:', this.courseData);
            return this.courseData;
            
        } catch (error) {
            console.error('❌ Erreur chargement données:', error);
            throw error;
        }
    }

    // Remplir toutes les sections avec les données
    populateAllSections(competence) {
        console.log('📝 Remplissage des sections avec:', competence);
        
        this.populatePreEvaluation(competence.preEvaluation);
        this.populateCours(competence);
        this.populateExercices(competence.exercices);
        this.populateReflexion(competence.metacognition);
        this.populateRessources(competence);
    }

    // Remplir la section pré-évaluation
    populatePreEvaluation(preEvaluation) {
        const container = document.getElementById('preEvaluationContent');
        if (!container || !preEvaluation) return;

        let html = '';
        if (preEvaluation.questions) {
            preEvaluation.questions.forEach((question, index) => {
                html += `
                    <div class="exercise-item">
                        <div class="exercise-question">${question.question}</div>
                        <div class="exercise-input">
                            <input type="text" class="answer-input" id="preeval-${index}" placeholder="Votre réponse">
                            <button class="validate-btn" onclick="window.sectionManager.validatePreEvaluation(${index}, '${question.reponse}')">Valider</button>
                        </div>
                        <div class="feedback" id="preeval-feedback-${index}" style="display: none;"></div>
                    </div>
                `;
            });
        }
        container.innerHTML = html;
    }

    // Remplir la section cours
    populateCours(competence) {
        const container = document.getElementById('coursContent');
        if (!container) return;

        let html = '';
        if (competence.cours) {
            html = `
                <div class="course-content">
                    <h3>${competence.titre}</h3>
                    <div>${competence.cours}</div>
                </div>
            `;
        }
        container.innerHTML = html;
    }

    // Remplir la section exercices
    populateExercices(exercices) {
        const container = document.getElementById('exercicesContent');
        if (!container) return;

        let html = '';
        exercices.forEach((exercice, index) => {
            const typeLabel = exercice.type ? exercice.type.toUpperCase() : 'EXERCICE';
            html += `
                <div class="exercise-item">
                    <div class="exercise-question">
                        <span style="background: #667eea; color: white; padding: 0.3rem 0.8rem; border-radius: 12px; font-size: 0.8rem; margin-right: 0.5rem;">${typeLabel}</span>
                        ${exercice.question}
                    </div>
                    <div class="exercise-input">
                        <input type="text" class="answer-input" id="exercise-${index}" placeholder="Votre réponse">
                        <button class="validate-btn" onclick="window.sectionManager.validateExercise(${index}, '${exercice.reponse}', ${exercice.points || 10})">Valider</button>
                    </div>
                    <div class="feedback" id="exercise-feedback-${index}" style="display: none;"></div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    // Remplir la section réflexion
    populateReflexion(metacognition) {
        const container = document.getElementById('reflexionContent');
        if (!container) return;

        let html = '';
        if (metacognition && metacognition.questions) {
            metacognition.questions.forEach((question, index) => {
                html += `
                    <div class="metacognition-item">
                        <div class="metacognition-question">${question.question}</div>
                        <div class="metacognition-options">
                `;
                
                if (question.options) {
                    question.options.forEach((option, optIndex) => {
                        html += `
                            <div class="metacognition-option" onclick="window.sectionManager.selectMetacognitionOption(${index}, ${optIndex}, '${option}', this)">
                                ${option}
                            </div>
                        `;
                    });
                }
                
                html += `
                        </div>
                        <div class="feedback" id="metacognition-feedback-${index}" style="display: none;"></div>
                    </div>
                `;
            });
        }
        container.innerHTML = html;
    }

    // Remplir la section ressources
    populateRessources(competence) {
        const container = document.getElementById('ressourcesContent');
        if (!container) return;

        let html = `
            <div class="resources-content">
                <h3>📚 Ressources complémentaires</h3>
                <p>Voici des ressources pour approfondir vos connaissances sur : <strong>${competence.titre}</strong></p>
                <ul>
                    <li>📖 Manuel de référence</li>
                    <li>🎥 Vidéos explicatives</li>
                    <li>✏️ Exercices supplémentaires</li>
                    <li>🔗 Liens utiles</li>
                </ul>
            </div>
        `;
        container.innerHTML = html;
    }

    // Valider une réponse de pré-évaluation
    validatePreEvaluation(index, correctAnswer) {
        const input = document.getElementById(`preeval-${index}`);
        const feedback = document.getElementById(`preeval-feedback-${index}`);
        
        if (!input || !feedback) return;
        
        const userAnswer = input.value.trim();
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        
        feedback.style.display = 'block';
        
        if (isCorrect) {
            feedback.innerHTML = `
                <div style="color: #38a169; background: #f0fff4; padding: 1rem; border-radius: 8px;">
                    ✅ <strong>Correct !</strong>
                </div>
            `;
            this.answers.preEvaluation[index] = { correct: true, answer: userAnswer };
        } else {
            feedback.innerHTML = `
                <div style="color: #e53e3e; background: #fff5f5; padding: 1rem; border-radius: 8px;">
                    ❌ <strong>Incorrect.</strong> La bonne réponse est : <strong>${correctAnswer}</strong>
                </div>
            `;
            this.answers.preEvaluation[index] = { correct: false, answer: userAnswer };
        }
    }

    // Valider un exercice
    validateExercise(index, correctAnswer, points = 10) {
        const input = document.getElementById(`exercise-${index}`);
        const feedback = document.getElementById(`exercise-feedback-${index}`);
        
        if (!input || !feedback) return;
        
        const userAnswer = input.value.trim();
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        
        feedback.style.display = 'block';
        
        if (isCorrect) {
            feedback.innerHTML = `
                <div style="color: #38a169; background: #f0fff4; padding: 1rem; border-radius: 8px;">
                    ✅ <strong>Correct !</strong> (+${points} points)
                </div>
            `;
            this.answers.exercises[index] = { correct: true, answer: userAnswer, points };
            this.scores.exercises += points;
        } else {
            feedback.innerHTML = `
                <div style="color: #e53e3e; background: #fff5f5; padding: 1rem; border-radius: 8px;">
                    ❌ <strong>Incorrect.</strong> La bonne réponse est : <strong>${correctAnswer}</strong>
                </div>
            `;
            this.answers.exercises[index] = { correct: false, answer: userAnswer, points: 0 };
        }
    }

    // Sélectionner une option de métacognition
    selectMetacognitionOption(questionIndex, optionIndex, optionText, element) {
        const siblings = element.parentNode.querySelectorAll('.metacognition-option');
        siblings.forEach(sibling => sibling.classList.remove('selected'));
        
        element.classList.add('selected');
        
        this.answers.metacognition[questionIndex] = {
            selectedOption: optionIndex,
            optionText: optionText
        };
        
        const feedback = document.getElementById(`metacognition-feedback-${questionIndex}`);
        if (feedback) {
            feedback.style.display = 'block';
            feedback.innerHTML = `
                <div style="color: #2b6cb0; background: #ebf4ff; padding: 0.8rem; border-radius: 6px;">
                    💭 Réflexion enregistrée : "${optionText}"
                </div>
            `;
        }
    }

    // Basculer l'affichage d'une section
    toggleSection(sectionId) {
        document.querySelectorAll('.section-content').forEach(section => {
            section.style.display = 'none';
        });
        
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        const activeButton = document.querySelector(`[onclick*="${sectionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
}

// Fonction globale pour basculer les sections
function toggleSection(sectionId) {
    if (window.sectionManager) {
        window.sectionManager.toggleSection(sectionId);
    } else {
        console.error('SectionManager non initialisé');
    }
}

// Export pour les modules ES6 si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SectionManager;
}