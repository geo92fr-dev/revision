#!/usr/bin/env node

/**
 * Script de build pour FunRevis V2
 * Prépare l'application pour le déploiement
 */

const fs = require('fs');
const path = require('path');

class BuildScript {
    constructor() {
        this.srcDir = path.join(__dirname, '..', 'src');
        this.buildDir = path.join(__dirname, '..', 'build');
        this.distDir = path.join(__dirname, '..', 'dist');
    }
    
    async build() {
        console.log('🚀 Début du build FunRevis V2...');
        
        try {
            // 1. Nettoyage
            await this.cleanup();
            
            // 2. Validation des modules
            await this.validateModules();
            
            // 3. Optimisation des assets
            await this.optimizeAssets();
            
            // 4. Génération du build
            await this.generateBuild();
            
            // 5. Validation finale
            await this.validateBuild();
            
            console.log('✅ Build terminé avec succès !');
            
        } catch (error) {
            console.error('❌ Erreur lors du build:', error.message);
            process.exit(1);
        }
    }
    
    async cleanup() {
        console.log('🧹 Nettoyage des builds précédents...');
        
        if (fs.existsSync(this.buildDir)) {
            fs.rmSync(this.buildDir, { recursive: true, force: true });
        }
        
        if (fs.existsSync(this.distDir)) {
            fs.rmSync(this.distDir, { recursive: true, force: true });
        }
        
        fs.mkdirSync(this.buildDir, { recursive: true });
        fs.mkdirSync(this.distDir, { recursive: true });
    }
    
    async validateModules() {
        console.log('🔍 Validation des modules...');
        
        const dataDir = path.join(this.srcDir, 'data');
        const componentsDir = path.join(this.srcDir, 'components');
        
        // Vérifier que les dossiers existent
        if (!fs.existsSync(dataDir)) {
            throw new Error('Dossier data manquant');
        }
        
        if (!fs.existsSync(componentsDir)) {
            throw new Error('Dossier components manquant');
        }
        
        // Vérifier les composants essentiels
        const essentialComponents = [
            'ModuleLoader.js',
            'CourseRenderer.js',
            'NavigationManager.js'
        ];
        
        for (const component of essentialComponents) {
            const componentPath = path.join(componentsDir, component);
            if (!fs.existsSync(componentPath)) {
                throw new Error(`Composant manquant: ${component}`);
            }
        }
        
        console.log('✅ Tous les modules sont présents');
    }
    
    async optimizeAssets() {
        console.log('⚡ Optimisation des assets...');
        
        // Pour une V2 simple, on copie simplement les fichiers
        // Dans une version plus avancée, on pourrait :
        // - Minifier le CSS/JS
        // - Optimiser les images
        // - Concaténer les fichiers
        
        await this.copyDirectory(this.srcDir, this.buildDir);
        console.log('✅ Assets copiés');
    }
    
    async generateBuild() {
        console.log('📦 Génération du build...');
        
        // Créer un fichier de version
        const versionInfo = {
            version: '2.0.0',
            buildDate: new Date().toISOString(),
            environment: 'production'
        };
        
        fs.writeFileSync(
            path.join(this.buildDir, 'version.json'),
            JSON.stringify(versionInfo, null, 2)
        );
        
        // Ajouter un service worker basique
        const swContent = `
// Service Worker FunRevis V2
const CACHE_NAME = 'funrevis-v2-${versionInfo.version}';
const urlsToCache = [
    '/',
    '/index.html',
    '/pages/mathematiques/index.html',
    '/components/ModuleLoader.js',
    '/components/CourseRenderer.js',
    '/components/NavigationManager.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
        `;
        
        fs.writeFileSync(path.join(this.buildDir, 'sw.js'), swContent.trim());
        
        console.log('✅ Build généré');
    }
    
    async validateBuild() {
        console.log('🔍 Validation du build...');
        
        const requiredFiles = [
            'index.html',
            'pages/page_de_cours.html',
            'pages/mathematiques/index.html',
            'components/ModuleLoader.js',
            'data/mathematiques/6ieme/fractions.js',
            'version.json',
            'sw.js'
        ];
        
        for (const file of requiredFiles) {
            const filePath = path.join(this.buildDir, file);
            if (!fs.existsSync(filePath)) {
                throw new Error(`Fichier manquant dans le build: ${file}`);
            }
        }
        
        console.log('✅ Build validé');
    }
    
    async copyDirectory(src, dest) {
        await fs.promises.mkdir(dest, { recursive: true });
        
        const entries = await fs.promises.readdir(src, { withFileTypes: true });
        
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
                await this.copyDirectory(srcPath, destPath);
            } else {
                await fs.promises.copyFile(srcPath, destPath);
            }
        }
    }
}

// Exécution
if (require.main === module) {
    new BuildScript().build();
}

module.exports = BuildScript;
