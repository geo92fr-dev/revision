// Nettoyage spécifique du section-manager.js pour supprimer les références quiz
const fs = require('fs');
const path = require('path');

const filePath = './src/pages/sections/section-manager.js';

console.log('🧹 Nettoyage du section-manager.js...');

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Compter les références avant
    const beforeQuiz = (content.match(/quiz/gi) || []).length;
    const beforeMiniQuiz = (content.match(/miniQuiz/gi) || []).length;
    const beforeQuizId = (content.match(/quizId/gi) || []).length;
    
    console.log(`📊 Références avant: quiz=${beforeQuiz}, miniQuiz=${beforeMiniQuiz}, quizId=${beforeQuizId}`);
    
    // Supprimer les lignes qui contiennent des références quiz problématiques
    const lines = content.split('\n');
    const cleanedLines = lines.filter(line => {
        // Garder les lignes qui ne contiennent pas de références quiz problématiques
        return !(
            line.includes('quiz-${index}') ||
            line.includes('quiz-feedback') ||
            line.includes('this.answers.quiz') ||
            line.includes('validateQuiz') ||
            line.includes('window.sectionManager.validateQuiz') ||
            (line.includes('quiz') && line.includes('onclick'))
        );
    });
    
    // Corriger les références restantes
    let cleanedContent = cleanedLines.join('\n');
    
    // Remplacer les références quiz restantes dans la structure answers
    cleanedContent = cleanedContent.replace(/quiz:/g, 'exercises:');
    cleanedContent = cleanedContent.replace(/\.quiz\[/g, '.exercises[');
    
    // Corriger les méthodes cassées
    cleanedContent = cleanedContent.replace(
        /window\.sectionManager\.\, /g, 
        'window.sectionManager.validateExercise('
    );
    
    // Écrire le fichier nettoyé
    fs.writeFileSync(filePath, cleanedContent);
    
    // Compter les références après
    const afterQuiz = (cleanedContent.match(/quiz/gi) || []).length;
    const afterMiniQuiz = (cleanedContent.match(/miniQuiz/gi) || []).length;
    const afterQuizId = (cleanedContent.match(/quizId/gi) || []).length;
    
    console.log(`📊 Références après: quiz=${afterQuiz}, miniQuiz=${afterMiniQuiz}, quizId=${afterQuizId}`);
    console.log(`✅ Section-manager.js nettoyé ! Supprimé: ${beforeQuiz - afterQuiz} références quiz`);
    
    // Vérifier qu'il n'y a pas d'erreurs de syntaxe
    try {
        const vm = require('vm');
        const context = { 
            window: {}, 
            document: { 
                querySelector: () => null,
                querySelectorAll: () => [],
                createElement: () => ({ innerHTML: '', appendChild: () => {} }),
                getElementById: () => null
            },
            fetch: () => Promise.resolve({ ok: true, text: () => '' }),
            console: console
        };
        vm.createContext(context);
        vm.runInContext(cleanedContent, context);
        console.log('✅ Syntaxe JavaScript valide');
    } catch (error) {
        console.log('⚠️ Erreur de syntaxe détectée:', error.message);
    }
    
} else {
    console.log('❌ Fichier section-manager.js non trouvé');
}
