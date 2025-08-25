/**
 * 🏗️ PageBuilder - Générateur de pages modulaire
 * 
 * Système de templates réutilisables pour éliminer la duplication de code
 */

export class PageBuilder {
    constructor() {
        this.defaultConfig = {
            title: "🎓 FunRevis V2",
            description: "Plateforme d'apprentissage interactive",
            viewport: "width=device-width, initial-scale=1.0",
            charset: "UTF-8"
        };
    }

    /**
     * Génère le HTML de base d'une page
     */
    buildPage(config = {}) {
        const pageConfig = { ...this.defaultConfig, ...config };
        
        return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="${pageConfig.charset}">
    <meta name="viewport" content="${pageConfig.viewport}">
    <title>${pageConfig.title}</title>
    <meta name="description" content="${pageConfig.description}">
    ${this.buildFavicon(pageConfig.icon)}
    ${this.buildStylesheets(pageConfig.cssDepth || '')}
    ${pageConfig.customStyles || ''}
</head>
<body>
    ${pageConfig.body || ''}
    ${pageConfig.scripts || ''}
</body>
</html>`;
    }

    /**
     * Génère le favicon avec l'icône spécifiée
     */
    buildFavicon(icon = '🎓') {
        return `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>">`;
    }

    /**
     * Génère les liens CSS avec le bon chemin relatif
     */
    buildStylesheets(depth = '') {
        const basePath = depth ? `${depth}/styles/` : 'styles/';
        
        return `
    <!-- Intégration des styles CSS -->
    <link rel="stylesheet" href="${basePath}base.css">
    <link rel="stylesheet" href="${basePath}educational.css">
    <link rel="stylesheet" href="${basePath}components.css">
    <link rel="stylesheet" href="${basePath}modern.css">
    <link rel="stylesheet" href="${basePath}v2-custom.css">`;
    }

    /**
     * Génère la structure du container de cours
     */
    buildCourseContainer(config = {}) {
        return `
    <div class="course-container">
        <div class="course-header">
            ${this.buildBreadcrumb(config.breadcrumb)}
            <h1 class="course-title" id="courseTitle">${config.title || 'Chargement...'}</h1>
            <p class="course-subtitle" id="courseSubtitle">${config.subtitle || 'Préparation en cours...'}</p>
        </div>
        
        <div class="course-content" id="courseContent">
            ${config.content || this.buildLoadingState()}
        </div>
        
        <div class="course-navigation">
            ${this.buildNavigationButtons(config.navigation)}
        </div>
    </div>`;
    }

    /**
     * Génère le breadcrumb
     */
    buildBreadcrumb(config = {}) {
        const homeUrl = config.homeUrl || '../../index.html';
        const items = config.items || [];
        
        let breadcrumb = `<div class="breadcrumb" id="breadcrumb">
            <a href="${homeUrl}">🏠 Accueil</a>`;
        
        items.forEach(item => {
            if (item.url) {
                breadcrumb += ` › <a href="${item.url}">${item.text}</a>`;
            } else {
                breadcrumb += ` › <span id="${item.id || ''}">${item.text}</span>`;
            }
        });
        
        breadcrumb += '</div>';
        return breadcrumb;
    }

    /**
     * Génère l'état de chargement
     */
    buildLoadingState() {
        return `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>Chargement du contenu...</p>
            </div>`;
    }

    /**
     * Génère les boutons de navigation
     */
    buildNavigationButtons(config = {}) {
        const buttons = config.buttons || [
            { text: '← Retour', url: 'javascript:history.back()', class: 'btn-secondary' },
            { text: '🏠 Accueil', url: '../index.html', class: 'btn-primary' }
        ];
        
        return buttons.map(btn => 
            `<a href="${btn.url}" class="btn ${btn.class}">${btn.text}</a>`
        ).join('\n            ');
    }

    /**
     * Génère la grille de cartes de matières
     */
    buildSubjectsGrid(subjects = []) {
        const cards = subjects.map(subject => `
            <a href="${subject.url}" class="subject-card">
                <div class="subject-icon">${subject.icon}</div>
                <div class="subject-title">${subject.title}</div>
                <div class="subject-description">${subject.description}</div>
            </a>`).join('');
        
        const innerHTML = `<div class="subjects-grid">${cards}</div>`;
        return innerHTML;
    }

    /**
     * Génère le container home
     */
    buildHomeContainer(config = {}) {
        return `
    <div class="home-container">
        <div class="hero-section">
            <div class="logo">${config.logo || '🎓'}</div>
            <h1 class="hero-title">${config.title || 'FunRevis'}</h1>
            <p class="hero-subtitle">${config.subtitle || 'Plateforme d\'apprentissage interactive'}</p>
        </div>
        
        ${config.content || ''}
    </div>`;
    }

    /**
     * Génère les scripts de base avec gestion d'erreurs
     */
    buildBaseScript(moduleImports = [], initFunction = '') {
        const imports = moduleImports.map(imp => 
            `import { ${imp.name} } from '${imp.path}';`
        ).join('\n        ');
        
        return `
    <script type="module">
        ${imports}
        
        // Gestion globale des erreurs
        window.addEventListener('error', (e) => {
            console.error('🚨 Erreur globale:', e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('🚨 Promise rejetée:', e.reason);
        });
        
        ${initFunction}
    </script>`;
    }
}

// Export global pour utilisation dans les pages
window.PageBuilder = PageBuilder;
