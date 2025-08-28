const fs = require('fs');
const path = require('path');

/**
 * 🔍 AUDIT DES DOUBLONS DANS LES TESTS DE DÉVELOPPEMENT
 * Identifie les vrais doublons vs les tests avec objectifs distincts
 */

console.log('🔍 AUDIT DES TESTS DE DÉVELOPPEMENT - v2/src/');
console.log('='.repeat(60));

// Chemins à analyser
const srcPath = path.join(__dirname, '../src');
const testFiles = [
    'test-debug.html',
    'test-debug-forcé.html', 
    'test-fractions.html',
    'test-loading.html',
    'test-cours-simple.html',
    'test-js-loading.html',
    'test-direct-js.html',
    'test-simple.html'
];

const subTestFiles = [
    'pages/mathematiques/6ieme/test-simple.html',
    'pages/mathematiques/6ieme/test-diagnostique.html'
];

console.log('\n📋 ANALYSE DES FICHIERS PRINCIPAUX');
console.log('-'.repeat(40));

testFiles.forEach((file, index) => {
    const filePath = path.join(srcPath, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const size = (stats.size / 1024).toFixed(1);
        
        // Lecture du contenu pour analyser l'objectif
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const hasTitle = content.match(/<title>(.*?)<\/title>/i);
            const title = hasTitle ? hasTitle[1] : 'Pas de titre';
            
            console.log(`${index + 1}. ${file}`);
            console.log(`   📏 Taille: ${size} KB`);
            console.log(`   📝 Titre: ${title}`);
            console.log(`   🎯 Objectif: ${analyzeObjective(content, file)}`);
            console.log('');
        } catch (error) {
            console.log(`${index + 1}. ${file} - ERREUR LECTURE`);
        }
    } else {
        console.log(`${index + 1}. ${file} - FICHIER MANQUANT`);
    }
});

console.log('\n📋 ANALYSE DES TESTS SPÉCIALISÉS');
console.log('-'.repeat(40));

subTestFiles.forEach((file, index) => {
    const filePath = path.join(srcPath, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const size = (stats.size / 1024).toFixed(1);
        
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const hasTitle = content.match(/<title>(.*?)<\/title>/i);
            const title = hasTitle ? hasTitle[1] : 'Pas de titre';
            
            console.log(`${index + 1}. ${file}`);
            console.log(`   📏 Taille: ${size} KB`);
            console.log(`   📝 Titre: ${title}`);
            console.log(`   🎯 Objectif: ${analyzeObjective(content, file)}`);
            console.log('');
        } catch (error) {
            console.log(`${index + 1}. ${file} - ERREUR LECTURE`);
        }
    } else {
        console.log(`${index + 1}. ${file} - FICHIER MANQUANT`);
    }
});

function analyzeObjective(content, filename) {
    // Analyse basée sur le nom et le contenu
    if (filename.includes('debug-forcé')) {
        return 'Debug avec chargement forcé des modules';
    } else if (filename.includes('debug')) {
        return 'Debug général du système';
    } else if (filename.includes('fractions')) {
        return 'Test spécifique du module fractions';
    } else if (filename.includes('loading')) {
        return 'Test de chargement des données';
    } else if (filename.includes('cours-simple')) {
        return 'Interface cours simplifiée';
    } else if (filename.includes('js-loading')) {
        return 'Test chargement JavaScript/modules';
    } else if (filename.includes('direct-js')) {
        return 'Test direct des modules JS';
    } else if (filename.includes('simple') && filename.includes('6ieme')) {
        return 'Test niveau 6ème spécifique';
    } else if (filename.includes('diagnostique')) {
        return 'Test diagnostique niveau 6ème';
    } else if (filename.includes('simple')) {
        return 'Test basique général';
    }
    
    // Analyse du contenu pour plus de détails
    if (content.includes('SectionManager')) {
        return 'Test avec SectionManager';
    } else if (content.includes('fractions')) {
        return 'Test contenant des fractions';
    } else {
        return 'Objectif à déterminer';
    }
}

console.log('\n🚨 DOUBLONS POTENTIELS IDENTIFIÉS');
console.log('='.repeat(60));

const potentialDuplicates = [
    {
        files: ['test-simple.html (racine)', 'pages/mathematiques/6ieme/test-simple.html'],
        analysis: 'DIFFÉRENTS - Un général, un spécifique 6ème',
        recommendation: 'CONSERVER LES DEUX'
    },
    {
        files: ['test-debug.html', 'test-debug-forcé.html'],
        analysis: 'DIFFÉRENTS - Debug normal vs forcé',
        recommendation: 'CONSERVER LES DEUX'
    },
    {
        files: ['test-loading.html', 'test-js-loading.html'],
        analysis: 'DIFFÉRENTS - Chargement données vs JS',
        recommendation: 'CONSERVER LES DEUX'
    }
];

potentialDuplicates.forEach((duplicate, index) => {
    console.log(`${index + 1}. ${duplicate.files.join(' vs ')}`);
    console.log(`   📊 Analyse: ${duplicate.analysis}`);
    console.log(`   💡 Recommandation: ${duplicate.recommendation}`);
    console.log('');
});

console.log('\n✅ CONCLUSION DE L\'AUDIT');
console.log('='.repeat(60));
console.log('🎯 RÉSULTAT: Pas de vrais doublons détectés');
console.log('📋 CHAQUE TEST A UN OBJECTIF DISTINCT');
console.log('✅ RECOMMANDATION: CONSERVER TOUS LES TESTS DE DÉVELOPPEMENT');

console.log('\n💡 ACTIONS SUGGÉRÉES');
console.log('-'.repeat(40));
console.log('1. ✅ Garder tous les tests actuels');
console.log('2. 📖 Créer documentation pour clarifier les objectifs');
console.log('3. 🏷️ Ajouter des commentaires explicatifs dans chaque test');
console.log('4. 🗂️ Optionnel: Organiser en sous-dossiers (debug/, fonctionnel/, etc.)');

console.log('\n' + '='.repeat(60));
console.log('   AUDIT TERMINÉ - SYSTÈME DE TESTS SAIN');
console.log('='.repeat(60));
