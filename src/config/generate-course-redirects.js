/**
 * Script utilitaire pour créer des pages de redirection vers le système générique
 * Usage: node generate-course-redirects.js
 */

import { coursesConfig } from './courses.js';
import fs from 'fs';
import path from 'path';

// Template pour les pages de redirection
function createRedirectTemplate(title, courseDataPath) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - FunRevis</title>
    <script>
        // Redirection vers la page générique avec le bon fichier de données
        window.location.href = '../page_de_cours.html?course=${courseDataPath}';
    </script>
    <noscript>
        <meta http-equiv="refresh" content="0; url=../page_de_cours.html?course=${courseDataPath}">
    </noscript>
</head>
<body>
    <div style="text-align: center; padding: 2rem; font-family: Arial, sans-serif;">
        <h1>🔄 Redirection en cours...</h1>
        <p>Vous allez être redirigé vers <strong>${title}</strong></p>
        <p><a href="../page_de_cours.html?course=${courseDataPath}">Cliquez ici si la redirection ne fonctionne pas</a></p>
    </div>
</body>
</html>`;
}

// Fonction pour générer toutes les pages de redirection
function generateRedirectPages() {
    console.log('🚀 Génération des pages de redirection...\n');
    
    Object.entries(coursesConfig).forEach(([subject, levels]) => {
        Object.entries(levels).forEach(([level, courses]) => {
            Object.entries(courses).forEach(([courseKey, courseInfo]) => {
                // Ignorer les cours qui ne sont pas encore disponibles
                if (courseInfo.status === 'coming-soon') {
                    console.log(`⏳ Ignoré (bientôt): ${subject}/${level}/${courseKey}`);
                    return;
                }
                
                // Créer le contenu de la page de redirection
                const redirectContent = createRedirectTemplate(courseInfo.title, courseInfo.dataPath);
                
                // Déterminer le chemin du fichier
                const filePath = path.join(
                    process.cwd(),
                    'src',
                    'pages',
                    subject,
                    level,
                    `${courseKey}.html`
                );
                
                // Créer le répertoire s'il n'existe pas
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                
                // Écrire le fichier
                fs.writeFileSync(filePath, redirectContent);
                console.log(`✅ Créé: ${subject}/${level}/${courseKey}.html`);
            });
        });
    });
    
    console.log('\n🎉 Génération terminée !');
}

// Fonction pour mettre à jour les liens dans les pages existantes
function updateNavigationLinks() {
    console.log('\n🔗 Mise à jour des liens de navigation...\n');
    
    // Liste des fichiers à mettre à jour avec leurs patterns de remplacement
    const filesToUpdate = [
        {
            path: 'src/pages/mathematiques/index.html',
            replacements: [
                {
                    from: 'href="6ieme/fractions.html"',
                    to: 'href="../page_de_cours.html?course=../data/mathematiques/6ieme/fractions.js"'
                }
            ]
        }
        // Ajouter d'autres fichiers ici si nécessaire
    ];
    
    filesToUpdate.forEach(file => {
        const filePath = path.join(process.cwd(), file.path);
        
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            file.replacements.forEach(replacement => {
                if (content.includes(replacement.from)) {
                    content = content.replace(new RegExp(replacement.from, 'g'), replacement.to);
                    console.log(`✅ Mis à jour: ${file.path}`);
                } else {
                    console.log(`⚠️  Pattern non trouvé dans ${file.path}: ${replacement.from}`);
                }
            });
            
            fs.writeFileSync(filePath, content);
        } else {
            console.log(`❌ Fichier non trouvé: ${file.path}`);
        }
    });
}

// Exécution du script
if (import.meta.url === `file://${process.argv[1]}`) {
    generateRedirectPages();
    updateNavigationLinks();
}

export { generateRedirectPages, updateNavigationLinks };
