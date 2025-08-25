/**
 * 🧭 NavigationManager - Gestionnaire de navigation modulaire
 * 
 * Ce module gère la navigation entre les cours et modules,
 * la génération d'URLs, et les liens de retour.
 */

export class NavigationManager {
    constructor() {
        this.history = [];
        this.currentCourse = null;
    }

    /**
     * Génère l'URL pour un cours spécifique
     */
    generateCourseUrl(subject, level, topic, baseUrl = 'page_de_cours.html') {
        const params = new URLSearchParams({
            subject: subject,
            level: level,
            topic: topic
        });
        
        return `${baseUrl}?${params.toString()}`;
    }

    /**
     * Navigue vers un cours
     */
    navigateToCourse(subject, level, topic) {
        const url = this.generateCourseUrl(subject, level, topic);
        
        // Ajouter à l'historique
        this.history.push({
            subject,
            level, 
            topic,
            timestamp: Date.now(),
            url
        });
        
        // Naviguer
        window.location.href = url;
    }

    /**
     * Retourne à la page précédente
     */
    goBack() {
        if (this.history.length > 1) {
            // Supprimer la page actuelle de l'historique
            this.history.pop();
            // Récupérer la page précédente
            const previous = this.history[this.history.length - 1];
            window.location.href = previous.url;
        } else {
            // Retour à l'index des matières
            this.goToSubjectIndex();
        }
    }

    /**
     * Retourne à l'index des matières
     */
    goToSubjectIndex() {
        window.location.href = '../index.html';
    }

    /**
     * Retourne à l'index d'un niveau spécifique
     */
    goToLevelIndex(subject, level) {
        window.location.href = `../${subject}/${level}/index.html`;
    }

    /**
     * Obtient les informations de navigation actuelles
     */
    getCurrentNavInfo() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            subject: urlParams.get('subject'),
            level: urlParams.get('level'),
            topic: urlParams.get('topic')
        };
    }

    /**
     * Génère les boutons de navigation
     */
    generateNavigationButtons() {
        const navInfo = this.getCurrentNavInfo();
        
        if (!navInfo.subject || !navInfo.level) {
            return '';
        }

        const buttons = [];
        
        // Bouton retour à l'index des matières
        buttons.push(`
            <button class="nav-btn nav-btn-home" onclick="navigationManager.goToSubjectIndex()">
                🏠 Accueil
            </button>
        `);

        // Bouton retour au niveau
        buttons.push(`
            <button class="nav-btn nav-btn-level" onclick="navigationManager.goToLevelIndex('${navInfo.subject}', '${navInfo.level}')">
                📚 ${this.formatSubjectName(navInfo.subject)} ${navInfo.level}
            </button>
        `);

        // Bouton retour historique
        if (this.history.length > 1) {
            buttons.push(`
                <button class="nav-btn nav-btn-back" onclick="navigationManager.goBack()">
                    ← Retour
                </button>
            `);
        }

        return `
            <div class="navigation-container">
                <div class="navigation-buttons">
                    ${buttons.join('')}
                </div>
            </div>
        `;
    }

    /**
     * Formate le nom d'une matière pour l'affichage
     */
    formatSubjectName(subject) {
        const subjectNames = {
            'mathematiques': 'Mathématiques',
            'francais': 'Français',
            'histoire': 'Histoire',
            'sciences': 'Sciences'
        };
        
        return subjectNames[subject] || subject;
    }

    /**
     * Formate le nom d'un niveau pour l'affichage
     */
    formatLevelName(level) {
        return level.replace('ieme', 'ème');
    }

    /**
     * Formate le nom d'un topic pour l'affichage
     */
    formatTopicName(topic) {
        return topic
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Obtient la liste des cours disponibles pour un niveau
     */
    async getAvailableCourses(subject, level) {
        try {
            // Importer la configuration des cours
            const { coursesConfig } = await import('../config/courses.js');
            
            if (coursesConfig[subject] && coursesConfig[subject][level]) {
                return Object.entries(coursesConfig[subject][level]).map(([key, course]) => ({
                    id: key,
                    title: course.title,
                    description: course.description,
                    icon: course.icon,
                    status: course.status,
                    url: this.generateCourseUrl(subject, level, key)
                }));
            }
            
            return [];
        } catch (error) {
            console.error('Erreur lors du chargement des cours disponibles:', error);
            return [];
        }
    }

    /**
     * Génère un breadcrumb de navigation
     */
    generateBreadcrumb() {
        const navInfo = this.getCurrentNavInfo();
        
        if (!navInfo.subject) {
            return '';
        }

        const breadcrumbItems = [];

        // Accueil
        breadcrumbItems.push(`
            <a href="../index.html" class="breadcrumb-item">
                🏠 Accueil
            </a>
        `);

        // Matière
        if (navInfo.subject) {
            breadcrumbItems.push(`
                <span class="breadcrumb-separator">></span>
                <a href="../${navInfo.subject}/index.html" class="breadcrumb-item">
                    ${this.formatSubjectName(navInfo.subject)}
                </a>
            `);
        }

        // Niveau
        if (navInfo.level) {
            breadcrumbItems.push(`
                <span class="breadcrumb-separator">></span>
                <a href="../${navInfo.subject}/${navInfo.level}/index.html" class="breadcrumb-item">
                    ${this.formatLevelName(navInfo.level)}
                </a>
            `);
        }

        // Topic actuel
        if (navInfo.topic) {
            breadcrumbItems.push(`
                <span class="breadcrumb-separator">></span>
                <span class="breadcrumb-item breadcrumb-current">
                    ${this.formatTopicName(navInfo.topic)}
                </span>
            `);
        }

        return `
            <nav class="breadcrumb">
                ${breadcrumbItems.join('')}
            </nav>
        `;
    }

    /**
     * Initialise la navigation pour la page actuelle
     */
    initializeNavigation() {
        const navInfo = this.getCurrentNavInfo();
        
        if (navInfo.subject && navInfo.level && navInfo.topic) {
            this.currentCourse = navInfo;
            
            // Ajouter à l'historique si ce n'est pas déjà fait
            if (this.history.length === 0 || 
                this.history[this.history.length - 1].topic !== navInfo.topic) {
                this.history.push({
                    ...navInfo,
                    timestamp: Date.now(),
                    url: window.location.href
                });
            }
        }

        // Injecter les styles de navigation si nécessaire
        this.injectNavigationStyles();
    }

    /**
     * Injecte les styles CSS pour la navigation
     */
    injectNavigationStyles() {
        if (document.getElementById('navigation-styles')) {
            return; // Styles déjà injectés
        }

        const styles = document.createElement('style');
        styles.id = 'navigation-styles';
        styles.textContent = `
            .navigation-container {
                margin: 1rem 0;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .navigation-buttons {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }

            .nav-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 8px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
            }

            .nav-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }

            .nav-btn-home {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            }

            .nav-btn-level {
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            }

            .nav-btn-back {
                background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            }

            .breadcrumb {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin: 1rem 0;
                padding: 0.75rem 1rem;
                background: rgba(243, 244, 246, 0.8);
                border-radius: 8px;
                font-size: 0.9rem;
            }

            .breadcrumb-item {
                color: #4b5563;
                text-decoration: none;
                transition: color 0.2s ease;
            }

            .breadcrumb-item:hover {
                color: #1f2937;
            }

            .breadcrumb-current {
                color: #1f2937;
                font-weight: 600;
            }

            .breadcrumb-separator {
                color: #9ca3af;
            }
        `;
        
        document.head.appendChild(styles);
    }

    /**
     * Obtient l'historique de navigation
     */
    getHistory() {
        return [...this.history];
    }

    /**
     * Efface l'historique de navigation
     */
    clearHistory() {
        this.history = [];
    }
}

// Instance singleton
export const navigationManager = new NavigationManager();
