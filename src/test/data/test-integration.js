// Test d'intégration spécifique à page_de_cours.html
// Simule exactement la logique de chargement de page_de_cours.html

console.log('🔬 TEST D\'INTÉGRATION PAGE_DE_COURS.HTML');
console.log('==========================================');

// Simulation de la fonction loadMaths6eme de page_de_cours.html
async function simulateLoadMaths6eme(topic) {
    console.log(`🔢 Simulation chargement maths 6ème pour: ${topic}`);
    
    try {
        // Import statique de l'index pour mathématiques 6ème (comme dans page_de_cours.html)
        const mathsIndex = await import('../../data/mathematiques/6ieme/index.js');
        
        if (mathsIndex.default && mathsIndex.default[topic]) {
            console.log(`✅ Topic '${topic}' trouvé dans l'index maths 6ème`);
            return mathsIndex.default[topic];
        }
        
        console.log(`⚠️ Topic '${topic}' non trouvé. Topics disponibles:`, Object.keys(mathsIndex.default || {}));
        return null;
        
    } catch (error) {
        console.error(`❌ Erreur lors du chargement de l'index maths 6ème:`, error);
        return null;
    }
}

// Simulation de la logique de détection de format de page_de_cours.html
function simulateFormatDetection(courseData) {
    if (!courseData) {
        return { error: 'Données de cours null ou undefined' };
    }
    
    console.log('📚 Données de cours chargées:', {
        titre: courseData.titre,
        niveau: courseData.niveau,
        hasCompetences: !!(courseData.competences && courseData.competences.length > 0),
        hasPhases: !!(courseData.phase1 && courseData.phase2 && courseData.phase3 && courseData.phase4),
        keys: Object.keys(courseData)
    });
    
    // Gérer les deux types de structures de données (comme dans page_de_cours.html)
    if (courseData.competences && courseData.competences.length > 0) {
        // Structure type "compétences" (ancien format)
        return { 
            format: 'competences', 
            renderFunction: 'renderCourse',
            data: courseData.competences[0]
        };
    } else if (courseData.phase1 && courseData.phase2 && courseData.phase3 && courseData.phase4) {
        // Structure type "phases" (nouveau format)
        return { 
            format: 'phases', 
            renderFunction: 'renderPhaseBasedCourse',
            data: courseData
        };
    } else {
        return { error: 'Structure de données non reconnue - ni compétences ni phases' };
    }
}

// Test sur tous les sujets problématiques
async function testProblematicTopics() {
    const problematicTopics = [
        'durees',
        'nombres-entiers', 
        'unites-longueur',
        'aires-figures',
        'lecture-tableaux'
    ];
    
    console.log(`\n🧪 Test de ${problematicTopics.length} sujets problématiques...`);
    
    for (const topic of problematicTopics) {
        console.log(`\n--- TEST: ${topic} ---`);
        
        try {
            // Étape 1: Chargement
            const courseData = await simulateLoadMaths6eme(topic);
            
            if (!courseData) {
                console.log(`❌ ${topic}: Échec du chargement`);
                continue;
            }
            
            // Étape 2: Détection du format
            const formatResult = simulateFormatDetection(courseData);
            
            if (formatResult.error) {
                console.log(`❌ ${topic}: ${formatResult.error}`);
                continue;
            }
            
            console.log(`✅ ${topic}: ${formatResult.format} → ${formatResult.renderFunction}`);
            
            // Étape 3: Vérification des données minimales
            if (formatResult.format === 'phases') {
                const phases = ['phase1', 'phase2', 'phase3', 'phase4'];
                let missingPhases = [];
                
                phases.forEach(phase => {
                    if (!courseData[phase] || typeof courseData[phase] !== 'object') {
                        missingPhases.push(phase);
                    }
                });
                
                if (missingPhases.length > 0) {
                    console.log(`⚠️ ${topic}: Phases incomplètes: ${missingPhases.join(', ')}`);
                } else {
                    console.log(`✅ ${topic}: Toutes les phases présentes`);
                }
            }
            
        } catch (error) {
            console.log(`❌ ${topic}: Exception: ${error.message}`);
        }
    }
}

// Exécution du test
testProblematicTopics().then(() => {
    console.log('\n🎯 CONCLUSION:');
    console.log('Si tous les tests passent ici mais que la page web ne fonctionne pas,');
    console.log('le problème est probablement dans le JavaScript de page_de_cours.html lui-même.');
    console.log('Vérifiez les logs de la console du navigateur pour plus de détails.');
});
