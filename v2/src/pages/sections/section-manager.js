// Gestionnaire des sections modulaires
class SectionManager {
    constructor() {
        this.sections = [];
        this.courseData = null;
        this.answers = {
            preEvaluation: {},
            exercises: {},
            quiz: {},
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
        
        const sectionNames = ['pre-evaluation', 'cours', 'exercices', 'quiz', 'reflexion', 'ressources'];
        const container = document.querySelector('.sections-container');
        
        if (!container) {
            console.error('❌ Container .sections-container non trouvé');
            return;
        }

        // Vider le container des placeholders
        container.innerHTML = '';

        // Charger chaque section
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

    // Basculer une section
    toggleSection(sectionId) {
        const sectionContent = document.getElementById(sectionId);
        const sectionHeader = sectionContent.previousElementSibling;
        
        if (!sectionContent || !sectionHeader) return;

        const isActive = sectionContent.classList.contains('active');
        
        if (isActive) {
            sectionContent.classList.remove('active');
            sectionHeader.classList.remove('active');
        } else {
            sectionContent.classList.add('active');
            sectionHeader.classList.add('active');
        }
    }

    // Charger les données du cours
    async loadCourseData(subject, level, topic) {
        return new Promise((resolve, reject) => {
            const timestamp = new Date().getTime();
            const script = document.createElement('script');
            script.src = `../data/${subject}/${level}/${topic}.js?v=${timestamp}`;
            
            script.onload = () => {
                setTimeout(() => {
                    if (window.data && window.data.competences && window.data.competences[0]) {
                        this.courseData = window.data;
                        const competence = window.data.competences[0];
                        this.populateAllSections(competence);
                        resolve(window.data);
                    } else {
                        reject('Données non trouvées');
                    }
                }, 100);
            };
            
            script.onerror = () => reject('Erreur de chargement du script');
            document.head.appendChild(script);
        });
    }

    // Peupler toutes les sections avec les données
    populateAllSections(competence) {
        console.log('🔄 Peuplement de toutes les sections...');
        
        // Titre principal
        const title = document.getElementById('mainTitle') || document.querySelector('h1');
        if (title) title.textContent = competence.titre;

        // En-tête du cours
        const courseTitle = document.getElementById('courseTitle');
        if (courseTitle) courseTitle.textContent = competence.titre;
        
        const courseSubtitle = document.getElementById('courseSubtitle');
        if (courseSubtitle && this.courseData) {
            // Créer un subtitle informatif avec les métadonnées du cours
            const subtitle = `${this.courseData.niveau} • ${this.courseData.chapitre} • ${this.courseData.sousChapitre}`;
            courseSubtitle.textContent = subtitle;
        }
        
        const courseObjective = document.getElementById('courseObjective');
        if (courseObjective && competence.objectif) {
            courseObjective.textContent = `🎯 ${competence.objectif}`;
        }

        // Pré-évaluation
        if (competence.preEvaluation) {
            this.populatePreEvaluation(competence.preEvaluation);
        }

        // Cours
        this.populateCours(competence);

        // Exercices
        if (competence.exercices) {
            this.populateExercices(competence.exercices);
        }

        // Quiz
        if (competence.quiz) {
            this.populateQuiz(competence.quiz);
        }

        // Réflexion
        if (competence.metacognition) {
            this.populateReflexion(competence.metacognition);
        }

        // Ressources
        if (competence.ressources) {
            this.populateRessources(competence.ressources);
        }
    }

    populatePreEvaluation(preEvaluation) {
        const container = document.getElementById('preEvaluationContent');
        if (!container) return;

        // Gérer les deux formats: tableau direct ou objet avec propriété questions
        let questions = Array.isArray(preEvaluation) ? preEvaluation : (preEvaluation.questions || []);
        
        let html = '';
        questions.forEach((question, index) => {
            // Gérer les questions avec choix multiples (format division) ou réponse libre (format addition-soustraction)
            if (question.choix && Array.isArray(question.choix)) {
                // Format avec choix multiples
                html += `
                    <div class="exercise-item">
                        <div class="exercise-question">${question.question}</div>
                        <div class="exercise-choices">
                            ${question.choix.map((choix, choixIndex) => `
                                <label class="choice-label">
                                    <input type="radio" name="preeval-${index}" value="${choix}" 
                                           onchange="window.sectionManager.validatePreEvaluationChoice(${index}, '${question.reponse}', '${choix}', this)">
                                    <span>${choix}</span>
                                </label>
                            `).join('')}
                        </div>
                        <div class="feedback" id="preeval-feedback-${index}" style="display: none;"></div>
                    </div>
                `;
            } else {
                // Format avec réponse libre
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
            }
        });
        container.innerHTML = html;
    }

    populateCours(competence) {
        const container = document.getElementById('coursContent');
        if (!container) return;

        let html = '';
        
        // L'objectif est maintenant affiché dans l'en-tête, pas besoin de le dupliquer ici
        // Le titre est déjà présent dans le template, pas besoin de le dupliquer
        
        if (competence.cours) {
            html += `
                <div class="course-section">
                    <div>${competence.cours}</div>
                </div>
            `;
        }

        container.innerHTML = html;
    }

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

    populateQuiz(quiz) {
        const container = document.getElementById('quizContent');
        if (!container) return;

        let html = '';
        quiz.forEach((question, index) => {
            html += `
                <div class="exercise-item">
                    <div class="exercise-question">${question.question}</div>
                    <div class="exercise-input">
                        <input type="text" class="answer-input" id="quiz-${index}" placeholder="Votre réponse">
                        <button class="validate-btn" onclick="window.sectionManager.validateQuiz(${index}, '${question.reponse}', ${question.points || 10})">Valider</button>
                    </div>
                    <div class="feedback" id="quiz-feedback-${index}" style="display: none;"></div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    populateReflexion(metacognition) {
        const container = document.getElementById('reflexionContent');
        if (!container) return;

        let html = '';
        if (metacognition.questions) {
            metacognition.questions.forEach((question, index) => {
                html += `
                    <div class="metacognition-question">
                        <h4>${question.question}</h4>
                        <div class="metacognition-options">
                `;
                
                question.options.forEach((option, optIndex) => {
                    html += `
                        <div class="metacognition-option" onclick="window.sectionManager.selectMetacognitionOption(${index}, ${optIndex}, '${option}', this)">
                            ${option}
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            });
        } else if (Array.isArray(metacognition)) {
            // Format tableau simple
            metacognition.forEach((question, index) => {
                html += `
                    <div class="course-section">
                        <p><strong>${index + 1}.</strong> ${question}</p>
                    </div>
                `;
            });
        }
        container.innerHTML = html;
    }

    populateRessources(ressources) {
        const container = document.getElementById('ressourcesContent');
        if (!container) return;

        let html = '<div class="resources-grid">';
        ressources.forEach(ressource => {
            if (typeof ressource === 'string') {
                html += `
                    <div class="resource-card">
                        <h4>📖 ${ressource}</h4>
                        <p>Type : ressource</p>
                    </div>
                `;
            } else {
                const emoji = ressource.type === 'vidéo' ? '🎬' : 
                            ressource.type === 'jeu' ? '🎮' : 
                            ressource.type === 'pdf' ? '📄' : '🔗';
                
                html += `
                    <div class="resource-card">
                        <h4>${emoji} ${ressource.titre}</h4>
                        <p>Type : ${ressource.type}</p>
                        <a href="${ressource.url}" target="_blank" class="resource-link">
                            Accéder à la ressource →
                        </a>
                    </div>
                `;
            }
        });
        html += '</div>';
        container.innerHTML = html;
    }

    // Méthodes de validation
    validatePreEvaluation(questionIndex, correctAnswer) {
        const input = document.getElementById(`preeval-${questionIndex}`);
        const feedback = document.getElementById(`preeval-feedback-${questionIndex}`);
        const userAnswer = input.value.trim().toLowerCase();
        const correct = userAnswer === correctAnswer.toLowerCase();
        
        this.answers.preEvaluation[questionIndex] = {
            userAnswer: input.value,
            correct: correct,
            correctAnswer: correctAnswer
        };
        
        this.showFeedback(feedback, correct, correctAnswer, input.value);
        this.updateProgress();
    }

    validatePreEvaluationChoice(questionIndex, correctAnswer, selectedChoice, element) {
        const feedback = document.getElementById(`preeval-feedback-${questionIndex}`);
        const correct = selectedChoice.toLowerCase() === correctAnswer.toLowerCase();
        
        this.answers.preEvaluation[questionIndex] = {
            userAnswer: selectedChoice,
            correct: correct,
            correctAnswer: correctAnswer
        };
        
        // Désactiver tous les choix pour cette question
        const radioButtons = document.querySelectorAll(`input[name="preeval-${questionIndex}"]`);
        radioButtons.forEach(radio => radio.disabled = true);
        
        this.showFeedback(feedback, correct, correctAnswer, selectedChoice);
        this.updateProgress();
    }

    validateExercise(questionIndex, correctAnswer, points = 10) {
        const input = document.getElementById(`exercise-${questionIndex}`);
        const feedback = document.getElementById(`exercise-feedback-${questionIndex}`);
        const userAnswer = input.value.trim().toLowerCase();
        const correct = userAnswer === correctAnswer.toLowerCase();
        
        this.answers.exercises[questionIndex] = {
            userAnswer: input.value,
            correct: correct,
            correctAnswer: correctAnswer,
            points: correct ? points : 0
        };
        
        this.showFeedback(feedback, correct, correctAnswer, input.value);
        this.updateProgress();
    }

    validateQuiz(questionIndex, correctAnswer, points = 10) {
        const input = document.getElementById(`quiz-${questionIndex}`);
        const feedback = document.getElementById(`quiz-feedback-${questionIndex}`);
        const userAnswer = input.value.trim().toLowerCase();
        const correct = userAnswer === correctAnswer.toLowerCase();
        
        this.answers.quiz[questionIndex] = {
            userAnswer: input.value,
            correct: correct,
            correctAnswer: correctAnswer,
            points: correct ? points : 0
        };
        
        this.showFeedback(feedback, correct, correctAnswer, input.value);
    }

    selectMetacognitionOption(questionIndex, optionIndex, option, element) {
        // Déselectionner toutes les options de cette question
        const allOptions = element.parentElement.querySelectorAll('.metacognition-option');
        allOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Sélectionner l'option cliquée
        element.classList.add('selected');
        
        // Sauvegarder la réponse
        this.answers.metacognition[questionIndex] = {
            questionIndex: questionIndex,
            optionIndex: optionIndex,
            option: option
        };
    }

    showFeedback(feedbackElement, correct, correctAnswer, userAnswer) {
        feedbackElement.style.display = 'block';
        
        if (correct) {
            feedbackElement.innerHTML = `
                <div style="color: #38a169; background: #f0fff4; padding: 1rem; border-radius: 8px; border-left: 4px solid #38a169;">
                    ✅ <strong>Correct !</strong> Bravo !
                </div>
            `;
        } else {
            feedbackElement.innerHTML = `
                <div style="color: #e53e3e; background: #fff5f5; padding: 1rem; border-radius: 8px; border-left: 4px solid #e53e3e;">
                    ❌ <strong>Incorrect.</strong> La bonne réponse est : <strong>${correctAnswer}</strong>
                    <br><small>Votre réponse : ${userAnswer}</small>
                </div>
            `;
        }
    }

    updateProgress() {
        // Calculer le progrès pour la pré-évaluation
        const preEvalTotal = Object.keys(this.answers.preEvaluation).length;
        const preEvalCorrect = Object.values(this.answers.preEvaluation).filter(a => a.correct).length;
        
        // Calculer le progrès pour les exercices
        const exerciseTotal = Object.keys(this.answers.exercises).length;
        const exerciseCorrect = Object.values(this.answers.exercises).filter(a => a.correct).length;
        
        // Mettre à jour les scores
        if (preEvalTotal > 0) {
            this.scores.preEvaluation = Math.round((preEvalCorrect / preEvalTotal) * 100);
            const progressBar = document.getElementById('preEvaluationProgress');
            const scoreDisplay = document.getElementById('preEvaluationScore');
            const scoreText = document.getElementById('preEvaluationScoreText');
            
            if (progressBar) progressBar.style.width = `${this.scores.preEvaluation}%`;
            if (scoreDisplay) scoreDisplay.style.display = 'block';
            if (scoreText) scoreText.textContent = `Score: ${preEvalCorrect}/${preEvalTotal} (${this.scores.preEvaluation}%)`;
        }
        
        if (exerciseTotal > 0) {
            this.scores.exercises = Math.round((exerciseCorrect / exerciseTotal) * 100);
            const exerciseProgressBar = document.getElementById('exercicesProgress');
            const exerciseScoreDisplay = document.getElementById('exercicesScore');
            const exerciseScoreText = document.getElementById('exercicesScoreText');
            
            if (exerciseProgressBar) exerciseProgressBar.style.width = `${this.scores.exercises}%`;
            if (exerciseScoreDisplay) exerciseScoreDisplay.style.display = 'block';
            if (exerciseScoreText) exerciseScoreText.textContent = `Score: ${exerciseCorrect}/${exerciseTotal} (${this.scores.exercises}%)`;
        }
    }
}

// Fonction globale pour la compatibilité
function toggleSection(sectionId) {
    if (window.sectionManager) {
        window.sectionManager.toggleSection(sectionId);
    } else {
        console.error('SectionManager non initialisé');
    }
}
