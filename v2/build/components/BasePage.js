/**
 * 🏛️ BasePage - Classe de base pour toutes les pages
 * 
 * Fonctionnalités communes et gestion d'erreurs centralisée
 */

export class BasePage {
    constructor(config = {}) {
        this.config = {
            debug: false,
            autoInit: true,
            errorContainer: 'courseContent',
            loadingContainer: 'courseContent',
            ...config
        };
        
        this.setupErrorHandling();
        
        if (this.config.autoInit) {
            this.init().catch(error => this.handleError(error));
        }
    }

    /**
     * Configuration globale de la gestion d'erreurs
     */
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('🚨 Erreur globale:', event.error);
            if (this.config.debug) {
                this.showDebugError(event.error);
            }
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('🚨 Promise rejetée:', event.reason);
            if (this.config.debug) {
                this.showDebugError(event.reason);
            }
        });
    }

    /**
     * Méthode d'initialisation à surcharger
     */
    async init() {
        this.log('Initialisation de la page base');
    }

    /**
     * Gestion centralisée des erreurs
     */
    handleError(error, container = null) {
        console.error('❌ Erreur dans la page:', error);
        
        const targetContainer = container || this.config.errorContainer;
        const element = document.getElementById(targetContainer);
        
        if (element) {
            element.innerHTML = `
                <div class="error-message">
                    <h3>❌ Une erreur s'est produite</h3>
                    <p>${error.message || 'Erreur inconnue'}</p>
                    ${this.config.debug ? `<details><summary>Détails techniques</summary><pre>${error.stack}</pre></details>` : ''}
                    <button class="btn btn-primary" onclick="location.reload()">Recharger la page</button>
                </div>
            `;
        }
    }

    /**
     * Affichage de l'état de chargement
     */
    showLoading(message = 'Chargement...', container = null) {
        const targetContainer = container || this.config.loadingContainer;
        const element = document.getElementById(targetContainer);
        
        if (element) {
            element.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    /**
     * Logging conditionnel
     */
    log(message, level = 'info') {
        if (this.config.debug) {
            console[level](`🔍 [${this.constructor.name}] ${message}`);
        }
    }

    /**
     * Utilitaires pour les paramètres URL
     */
    getUrlParams() {
        return new URLSearchParams(window.location.search);
    }

    getUrlParam(name, defaultValue = null) {
        return this.getUrlParams().get(name) || defaultValue;
    }

    /**
     * Capitalisation des chaînes
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Mise à jour du titre de page
     */
    updatePageTitle(title) {
        document.title = title;
        this.log(`Titre mis à jour: ${title}`);
    }

    /**
     * Mise à jour du breadcrumb
     */
    updateBreadcrumb(items) {
        const breadcrumbElement = document.getElementById('breadcrumb');
        if (!breadcrumbElement) return;

        items.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) {
                element.textContent = item.text;
            }
        });
        
        this.log('Breadcrumb mis à jour');
    }

    /**
     * Animation simple pour les éléments
     */
    animateElements(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }

    /**
     * Affichage d'erreur de debug
     */
    showDebugError(error) {
        const debugDiv = document.createElement('div');
        debugDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #fee2e2;
            border: 2px solid #fecaca;
            color: #dc2626;
            padding: 1rem;
            border-radius: 8px;
            max-width: 400px;
            z-index: 9999;
            font-family: monospace;
            font-size: 0.8rem;
        `;
        debugDiv.innerHTML = `
            <strong>Debug Error:</strong><br>
            ${error.message}<br>
            <button onclick="this.parentElement.remove()" style="margin-top: 0.5rem;">Fermer</button>
        `;
        document.body.appendChild(debugDiv);
        
        // Auto-suppression après 10 secondes
        setTimeout(() => {
            if (debugDiv.parentElement) {
                debugDiv.remove();
            }
        }, 10000);
    }
}

// Export global
window.BasePage = BasePage;
