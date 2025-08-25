#!/usr/bin/env node

/**
 * Script de déploiement pour FunRevis V2
 * Déploie sur Firebase Hosting
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class DeployScript {
    constructor() {
        this.projectRoot = path.join(__dirname, '..');
        this.firebaseConfig = path.join(this.projectRoot, 'firebase.json');
    }
    
    async deploy() {
        console.log('🚀 Début du déploiement FunRevis V2...');
        
        try {
            // 1. Vérifications préalables
            await this.preDeployChecks();
            
            // 2. Build du projet
            await this.buildProject();
            
            // 3. Tests de déploiement
            await this.runDeploymentTests();
            
            // 4. Déploiement Firebase
            await this.deployToFirebase();
            
            // 5. Tests post-déploiement
            await this.postDeploymentTests();
            
            console.log('✅ Déploiement terminé avec succès !');
            console.log('🌐 Application disponible sur: https://funrevis.web.app/');
            
        } catch (error) {
            console.error('❌ Erreur lors du déploiement:', error.message);
            process.exit(1);
        }
    }
    
    async preDeployChecks() {
        console.log('🔍 Vérifications préalables...');
        
        // Vérifier que Firebase CLI est installé
        try {
            execSync('firebase --version', { stdio: 'ignore' });
        } catch (error) {
            throw new Error('Firebase CLI non installé. Exécutez: npm install -g firebase-tools');
        }
        
        // Vérifier la configuration Firebase
        if (!fs.existsSync(this.firebaseConfig)) {
            throw new Error('Configuration Firebase manquante');
        }
        
        // Vérifier l'authentification Firebase
        try {
            execSync('firebase projects:list', { stdio: 'ignore' });
        } catch (error) {
            throw new Error('Non authentifié Firebase. Exécutez: firebase login');
        }
        
        console.log('✅ Vérifications passées');
    }
    
    async buildProject() {
        console.log('📦 Build du projet...');
        
        try {
            // Exécuter le script de build
            execSync('node scripts/build.js', { 
                cwd: this.projectRoot,
                stdio: 'inherit'
            });
        } catch (error) {
            throw new Error('Échec du build');
        }
    }
    
    async runDeploymentTests() {
        console.log('🧪 Tests de déploiement...');
        
        // Vérifier que les fichiers critiques existent
        const criticalFiles = [
            'src/index.html',
            'src/pages/page_de_cours.html',
            'src/components/ModuleLoader.js',
            'src/data/mathematiques/6ieme/fractions.js'
        ];
        
        for (const file of criticalFiles) {
            const filePath = path.join(this.projectRoot, file);
            if (!fs.existsSync(filePath)) {
                throw new Error(`Fichier critique manquant: ${file}`);
            }
        }
        
        console.log('✅ Tests de déploiement passés');
    }
    
    async deployToFirebase() {
        console.log('🚀 Déploiement sur Firebase...');
        
        try {
            // Déploiement sur Firebase Hosting
            execSync('firebase deploy --only hosting', {
                cwd: this.projectRoot,
                stdio: 'inherit'
            });
        } catch (error) {
            throw new Error('Échec du déploiement Firebase');
        }
    }
    
    async postDeploymentTests() {
        console.log('🔍 Tests post-déploiement...');
        
        // Attendre un peu que le déploiement soit actif
        await this.sleep(5000);
        
        // Tester l'accès à l'application
        const testUrls = [
            'https://funrevis.web.app/',
            'https://funrevis.web.app/pages/mathematiques/index.html'
        ];
        
        for (const url of testUrls) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`URL inaccessible: ${url} (${response.status})`);
                }
                console.log(`✅ ${url} - OK`);
            } catch (error) {
                console.warn(`⚠️ ${url} - ${error.message}`);
            }
        }
        
        console.log('✅ Tests post-déploiement terminés');
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Exécution
if (require.main === module) {
    new DeployScript().deploy();
}

module.exports = DeployScript;
