#!/usr/bin/env node

/**
 * 🎯 Résumé complet FunRevis V2
 * Génère un rapport de validation final
 */

const fs = require('fs');
const path = require('path');

class V2Summary {
    constructor() {
        this.v2Dir = __dirname;
        this.srcDir = path.join(this.v2Dir, 'src');
        this.buildDir = path.join(this.v2Dir, 'build');
    }
    
    async generateSummary() {
        console.log('🎯 RÉSUMÉ FUNREVIS V2');
        console.log('='.repeat(50));
        
        try {
            // 1. Informations générales
            this.showGeneralInfo();
            
            // 2. Structure du projet
            this.showProjectStructure();
            
            // 3. Composants disponibles
            this.showComponents();
            
            // 4. Modules de données
            this.showDataModules();
            
            // 5. Tests et validation
            this.showTestResults();
            
            // 6. Build information
            this.showBuildInfo();
            
            // 7. Instructions de déploiement
            this.showDeploymentInstructions();
            
            console.log('\\n🎉 RÉSUMÉ TERMINÉ !');
            
        } catch (error) {
            console.error('❌ Erreur lors de la génération du résumé:', error.message);
        }
    }
    
    showGeneralInfo() {
        console.log('\\n📋 INFORMATIONS GÉNÉRALES');
        console.log('-'.repeat(30));
        
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.v2Dir, 'package.json'), 'utf8'));
            console.log(`Version: ${packageJson.version}`);
            console.log(`Nom: ${packageJson.name}`);
            console.log(`Description: ${packageJson.description}`);
        } catch (error) {
            console.log('❌ Impossible de lire package.json');
        }
        
        console.log(`Dossier V2: ${this.v2Dir}`);
        console.log(`Date de génération: ${new Date().toLocaleString()}`);
    }
    
    showProjectStructure() {
        console.log('\\n🏗️ STRUCTURE DU PROJET');
        console.log('-'.repeat(30));
        
        const structure = [
            'v2/',
            '├── src/',
            '│   ├── index.html (Page d\\'accueil)',
            '│   ├── components/ (3 composants ES6)',
            '│   ├── data/ (22 modules de cours)',
            '│   ├── pages/ (Pages de navigation)',
            '│   └── config/ (Configuration)',
            '├── scripts/',
            '│   ├── build.js (Script de build)',
            '│   ├── test.js (Tests automatisés)',
            '│   └── validate.js (Validation)',
            '├── firebase.json (Config Firebase)',
            '├── package.json (Configuration npm)',
            '├── deploy.ps1 (Script de déploiement)',
            '└── README.md (Documentation)'
        ];
        
        structure.forEach(line => console.log(line));
    }
    
    showComponents() {
        console.log('\\n🔧 COMPOSANTS ES6');
        console.log('-'.repeat(30));
        
        const componentsDir = path.join(this.srcDir, 'components');
        
        if (fs.existsSync(componentsDir)) {
            const components = fs.readdirSync(componentsDir).filter(f => f.endsWith('.js'));
            
            components.forEach(component => {
                const componentPath = path.join(componentsDir, component);
                const stats = fs.statSync(componentPath);
                const sizeKB = Math.round(stats.size / 1024 * 100) / 100;
                
                console.log(`✅ ${component} (${sizeKB} KB)`);
                
                // Lire les premières lignes pour la description
                try {
                    const content = fs.readFileSync(componentPath, 'utf8');
                    const lines = content.split('\\n');
                    const commentLine = lines.find(line => line.includes('*') && line.length > 10);
                    if (commentLine) {
                        const description = commentLine.replace(/\\/\\*\\*?|\\*\\/?/g, '').trim();
                        console.log(`   ${description}`);
                    }
                } catch (error) {
                    // Ignorer les erreurs de lecture
                }
            });
            
            console.log(`\\nTotal: ${components.length} composants`);
        } else {
            console.log('❌ Dossier components non trouvé');
        }
    }
    
    showDataModules() {
        console.log('\\n📚 MODULES DE DONNÉES');
        console.log('-'.repeat(30));
        
        const dataDir = path.join(this.srcDir, 'data', 'mathematiques', '6ieme');
        
        if (fs.existsSync(dataDir)) {
            const modules = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') && f !== 'index.js');
            
            console.log('Mathématiques 6ème :');
            modules.forEach(module => {
                const moduleName = module.replace('.js', '').replace(/-/g, ' ');
                const capitalizedName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
                console.log(`  📖 ${capitalizedName}`);
            });
            
            console.log(`\\nTotal: ${modules.length} modules de cours disponibles`);
        } else {
            console.log('❌ Dossier de données non trouvé');
        }
    }
    
    showTestResults() {
        console.log('\\n🧪 RÉSULTATS DES TESTS');
        console.log('-'.repeat(30));
        
        const testReportPath = path.join(this.v2Dir, 'test-report.json');
        
        if (fs.existsSync(testReportPath)) {
            try {
                const testReport = JSON.parse(fs.readFileSync(testReportPath, 'utf8'));
                
                console.log(`Tests exécutés: ${testReport.timestamp}`);
                console.log(`Tests réussis: ${testReport.successfulTests}/${testReport.totalTests}`);
                console.log(`Taux de réussite: ${testReport.successRate}%`);
                
                if (testReport.successRate === 100) {
                    console.log('🎉 Tous les tests passent !');
                } else {
                    console.log('⚠️ Certains tests ont échoué');
                }
            } catch (error) {
                console.log('❌ Impossible de lire le rapport de tests');
            }
        } else {
            console.log('⚠️ Aucun rapport de tests trouvé');
            console.log('Exécutez: node scripts/test.js');
        }
    }
    
    showBuildInfo() {
        console.log('\\n📦 INFORMATIONS DE BUILD');
        console.log('-'.repeat(30));
        
        const versionPath = path.join(this.buildDir, 'version.json');
        
        if (fs.existsSync(versionPath)) {
            try {
                const versionInfo = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
                
                console.log(`Version: ${versionInfo.version}`);
                console.log(`Build: ${new Date(versionInfo.buildDate).toLocaleString()}`);
                console.log(`Environnement: ${versionInfo.environment}`);
                console.log('✅ Build disponible et validé');
            } catch (error) {
                console.log('❌ Impossible de lire les informations de build');
            }
        } else {
            console.log('⚠️ Aucun build trouvé');
            console.log('Exécutez: node scripts/build.js');
        }
    }
    
    showDeploymentInstructions() {
        console.log('\\n🚀 INSTRUCTIONS DE DÉPLOIEMENT');
        console.log('-'.repeat(30));
        
        console.log('1. Vérifiez que Firebase CLI est installé:');
        console.log('   npm install -g firebase-tools');
        console.log('');
        console.log('2. Authentifiez-vous sur Firebase:');
        console.log('   firebase login');
        console.log('');
        console.log('3. Déployez avec le script automatique:');
        console.log('   ./deploy.ps1');
        console.log('');
        console.log('4. Ou manuellement:');
        console.log('   firebase deploy --only hosting');
        console.log('');
        console.log('🌐 URL de production: https://funrevis.web.app/');
        console.log('');
        console.log('📋 Pour plus de détails, consultez DEPLOIEMENT.md');
    }
}

// Exécution
if (require.main === module) {
    new V2Summary().generateSummary();
}

module.exports = V2Summary;
