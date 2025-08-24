// Test de débogage spécifique pour le module "durees"
async function debugDurees() {
    console.log('🔍 DÉBOGAGE MODULE DUREES');
    console.log('=========================');
    
    try {
        // Test 1: Import direct du module
        console.log('1. Import direct du module durees...');
        const directModule = await import('../../data/mathematiques/6ieme/durees.js');
        console.log('   ✅ Import réussi:', directModule.durees6eme ? 'Export trouvé' : 'Export manquant');
        
        if (directModule.durees6eme) {
            console.log('   📊 Structure:', {
                titre: directModule.durees6eme.titre,
                hasPhase1: !!directModule.durees6eme.phase1,
                hasPhase2: !!directModule.durees6eme.phase2,
                hasPhase3: !!directModule.durees6eme.phase3,
                hasPhase4: !!directModule.durees6eme.phase4,
                keys: Object.keys(directModule.durees6eme)
            });
        }
        
        // Test 2: Import via l'index
        console.log('\n2. Import via l\'index...');
        const indexModule = await import('../../data/mathematiques/6ieme/index.js');
        console.log('   ✅ Index chargé, topics disponibles:', Object.keys(indexModule.default).length);
        
        const dureesFromIndex = indexModule.default['durees'];
        console.log('   📊 Durees via index:', dureesFromIndex ? 'Trouvé' : 'Non trouvé');
        
        if (dureesFromIndex) {
            console.log('   📊 Structure via index:', {
                titre: dureesFromIndex.titre,
                hasPhase1: !!dureesFromIndex.phase1,
                hasPhase2: !!dureesFromIndex.phase2,
                hasPhase3: !!dureesFromIndex.phase3,
                hasPhase4: !!dureesFromIndex.phase4,
                keys: Object.keys(dureesFromIndex)
            });
        }
        
        // Test 3: Vérification format phases
        console.log('\n3. Vérification format phases...');
        const data = dureesFromIndex || directModule.durees6eme;
        
        if (data) {
            const hasPhases = data.phase1 && data.phase2 && data.phase3 && data.phase4;
            console.log('   ✅ Format phases complet:', hasPhases);
            
            if (hasPhases) {
                console.log('   📋 Détails des phases:');
                ['phase1', 'phase2', 'phase3', 'phase4'].forEach(phase => {
                    const phaseData = data[phase];
                    console.log(`     ${phase}: ${phaseData ? 'OK' : 'MANQUANT'}`, 
                        phaseData ? `(${phaseData.titre})` : '');
                });
            }
        }
        
        // Test 4: Simulation de la logique page_de_cours.html
        console.log('\n4. Simulation logique page_de_cours.html...');
        if (data) {
            const hasCompetences = data.competences && data.competences.length > 0;
            const hasPhases = data.phase1 && data.phase2 && data.phase3 && data.phase4;
            
            console.log('   📊 Détection format:');
            console.log('     - Compétences:', hasCompetences);
            console.log('     - Phases:', hasPhases);
            
            if (hasPhases) {
                console.log('   ✅ → Module devrait utiliser renderPhaseBasedCourse()');
            } else if (hasCompetences) {
                console.log('   ✅ → Module devrait utiliser renderCourse()');
            } else {
                console.log('   ❌ → PROBLÈME: Aucun format reconnu !');
            }
        }
        
    } catch (error) {
        console.error('❌ Erreur lors du débogage:', error);
    }
}

// Exécution
debugDurees();
