#!/usr/bin/env node

/**
 * 🧹 SUPPRESSION DES RÉFÉRENCES QUIZ - FunRevis V2
 * ===============================================
 * 
 * Script pour supprimer toutes les références aux quiz dans le projet
 * pour éviter les doublons avec les exercices
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 SUPPRESSION DES RÉFÉRENCES QUIZ');
console.log('===================================');

class QuizRemover {
    constructor() {
        this.srcDir = path.join(__dirname, 'src');
        this.removedCount = 0;
        this.modifiedFiles = [];
        this.errors = [];
    }

    // 🔍 Trouver tous les fichiers JS à traiter
    findJSFiles(dir = this.srcDir) {
        const files = [];
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
                files.push(...this.findJSFiles(itemPath));
            } else if (item.endsWith('.js')) {
                files.push(itemPath);
            }
        }
        
        return files;
    }

    // 🧹 Nettoyer un fichier des références quiz
    cleanFile(filePath) {
        try {
            const originalContent = fs.readFileSync(filePath, 'utf8');
            let content = originalContent;
            let hasChanges = false;

            // Supprimer les propriétés miniQuiz
            const miniQuizRegex = /,?\s*miniQuiz:\s*\[[^\]]*\],?/gs;
            if (miniQuizRegex.test(content)) {
                content = content.replace(miniQuizRegex, '');
                hasChanges = true;
                console.log(`  ✂️  Supprimé miniQuiz dans ${path.basename(filePath)}`);
            }

            // Supprimer les propriétés quizId
            const quizIdRegex = /,?\s*quizId:\s*"[^"]*",?/g;
            if (quizIdRegex.test(content)) {
                content = content.replace(quizIdRegex, '');
                hasChanges = true;
                console.log(`  ✂️  Supprimé quizId dans ${path.basename(filePath)}`);
            }

            // Supprimer les sections quiz dans les gestionnaires
            const quizSectionRegex = /\/\/ Quiz[\s\S]*?this\.populateQuiz\([^)]*\);\s*}/g;
            if (quizSectionRegex.test(content)) {
                content = content.replace(quizSectionRegex, '');
                hasChanges = true;
                console.log(`  ✂️  Supprimé section quiz dans ${path.basename(filePath)}`);
            }

            // Supprimer les méthodes populateQuiz
            const populateQuizRegex = /populateQuiz\([^{]*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/gs;
            if (populateQuizRegex.test(content)) {
                content = content.replace(populateQuizRegex, '');
                hasChanges = true;
                console.log(`  ✂️  Supprimé méthode populateQuiz dans ${path.basename(filePath)}`);
            }

            // Supprimer les méthodes validateQuiz
            const validateQuizRegex = /validateQuiz\([^{]*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/gs;
            if (validateQuizRegex.test(content)) {
                content = content.replace(validateQuizRegex, '');
                hasChanges = true;
                console.log(`  ✂️  Supprimé méthode validateQuiz dans ${path.basename(filePath)}`);
            }

            // Supprimer 'quiz' des tableaux sectionNames
            const sectionNamesRegex = /(const sectionNames = \[[^\]]*)'quiz',?\s*([^\]]*\])/g;
            if (sectionNamesRegex.test(content)) {
                content = content.replace(sectionNamesRegex, '$1$2');
                hasChanges = true;
                console.log(`  ✂️  Supprimé 'quiz' des sectionNames dans ${path.basename(filePath)}`);
            }

            // Supprimer quiz des objets answers
            const quizAnswersRegex = /quiz:\s*\{\},?\s*/g;
            if (quizAnswersRegex.test(content)) {
                content = content.replace(quizAnswersRegex, '');
                hasChanges = true;
                console.log(`  ✂️  Supprimé quiz des answers dans ${path.basename(filePath)}`);
            }

            // Nettoyer les virgules en double et les espaces
            content = content.replace(/,(\s*,)+/g, ','); // Virgules multiples
            content = content.replace(/,(\s*[\]\}])/g, '$1'); // Virgules avant fermeture
            content = content.replace(/\[\s*,/g, '['); // Virgule en début de tableau
            content = content.replace(/\{\s*,/g, '{'); // Virgule en début d'objet

            if (hasChanges) {
                fs.writeFileSync(filePath, content, 'utf8');
                this.modifiedFiles.push(filePath);
                this.removedCount++;
                console.log(`✅ Modifié: ${path.basename(filePath)}`);
            }

        } catch (error) {
            this.errors.push(`❌ Erreur dans ${path.basename(filePath)}: ${error.message}`);
            console.error(`❌ Erreur dans ${path.basename(filePath)}: ${error.message}`);
        }
    }

    // 🧹 Nettoyer les fichiers HTML
    cleanHTMLFiles() {
        const htmlFiles = [
            path.join(this.srcDir, 'pages', 'cours.html'),
            path.join(this.srcDir, 'pages', 'sections', 'quiz.html')
        ];

        for (const htmlPath of htmlFiles) {
            if (fs.existsSync(htmlPath)) {
                try {
                    const content = fs.readFileSync(htmlPath, 'utf8');
                    let newContent = content;

                    // Supprimer les sections quiz complètes
                    const quizSectionRegex = /<!-- Section Quiz -->[\s\S]*?<!-- \/Section Quiz -->/g;
                    newContent = newContent.replace(quizSectionRegex, '');

                    // Supprimer les éléments avec id="quiz"
                    const quizElementRegex = /<div[^>]*id="quiz"[^>]*>[\s\S]*?<\/div>/g;
                    newContent = newContent.replace(quizElementRegex, '');

                    // Supprimer les fonctions JavaScript quiz
                    const quizJSRegex = /function\s+.*Quiz.*\([^}]*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/gs;
                    newContent = newContent.replace(quizJSRegex, '');

                    if (newContent !== content) {
                        fs.writeFileSync(htmlPath, newContent, 'utf8');
                        this.modifiedFiles.push(htmlPath);
                        console.log(`✅ HTML modifié: ${path.basename(htmlPath)}`);
                    }

                } catch (error) {
                    this.errors.push(`❌ Erreur HTML ${path.basename(htmlPath)}: ${error.message}`);
                }
            }
        }
    }

    // 🚀 Exécuter le nettoyage complet
    async runCleanup() {
        console.log('🔍 Recherche des fichiers à nettoyer...\n');

        // Nettoyer les fichiers JS
        const jsFiles = this.findJSFiles();
        console.log(`📁 ${jsFiles.length} fichiers JS trouvés\n`);

        for (const file of jsFiles) {
            console.log(`🔧 Traitement: ${path.relative(__dirname, file)}`);
            this.cleanFile(file);
        }

        // Nettoyer les fichiers HTML
        console.log('\n🔧 Nettoyage des fichiers HTML...');
        this.cleanHTMLFiles();

        // Rapport final
        console.log(`\n📊 RAPPORT FINAL`);
        console.log(`================`);
        console.log(`✅ ${this.removedCount} fichiers modifiés`);
        console.log(`📝 ${this.modifiedFiles.length} fichiers total affectés`);
        
        if (this.errors.length > 0) {
            console.log(`❌ ${this.errors.length} erreurs:`);
            this.errors.forEach(error => console.log(`   ${error}`));
        } else {
            console.log(`🎉 Aucune erreur ! Toutes les références quiz supprimées !`);
        }

        console.log(`\n🎯 NETTOYAGE TERMINÉ - Quiz supprimés du projet !`);
    }
}

// 🚀 Exécution
const remover = new QuizRemover();
remover.runCleanup();
