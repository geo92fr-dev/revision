// Test spécifique pour détecter les modules qui ne se chargent pas dans page_de_cours.html
import { TEST_CONFIG } from './config.js';

console.log('🚨 TEST DE CHARGEMENT - Détection modules défaillants');
console.log('=================================================');

async function testModuleLoading() {
    let failedModules = [];
    let passedModules = [];
    
    try {
        // Import de l'index principal
        const mathsIndex = await import(TEST_CONFIG.INDEX_PATH);
        const topics = Object.keys(mathsIndex.default);
        
        console.log(`🔍 Test de ${topics.length} modules...`);
        
        for (const topic of topics) {
            try {
                const moduleData = mathsIndex.default[topic];
                
                // Test 1: Le module a-t-il des données ?
                if (!moduleData) {
                    failedModules.push({
                        topic,
                        error: 'Données null/undefined',
                        severity: 'CRITICAL'
                    });
                    continue;
                }
                
                // Test 2: Format reconnu par page_de_cours.html ?
                const hasCompetences = moduleData.competences && moduleData.competences.length > 0;
                const hasPhases = moduleData.phase1 && moduleData.phase2 && moduleData.phase3 && moduleData.phase4;
                
                if (!hasCompetences && !hasPhases) {
                    failedModules.push({
                        topic,
                        error: 'Structure non reconnue - ni compétences ni phases',
                        severity: 'CRITICAL',
                        data: {
                            hasCompetences,
                            hasPhases,
                            keys: Object.keys(moduleData)
                        }
                    });
                    continue;
                }
                
                // Test 3: Données minimales présentes ?
                if (hasPhases) {
                    const phases = ['phase1', 'phase2', 'phase3', 'phase4'];
                    let missingPhases = [];
                    
                    phases.forEach(phase => {
                        if (!moduleData[phase] || typeof moduleData[phase] !== 'object') {
                            missingPhases.push(phase);
                        }
                    });
                    
                    if (missingPhases.length > 0) {
                        failedModules.push({
                            topic,
                            error: `Phases manquantes: ${missingPhases.join(', ')}`,
                            severity: 'WARNING'
                        });
                        continue;
                    }
                }
                
                if (hasCompetences) {
                    if (!moduleData.competences[0].cours || !moduleData.competences[0].objectif) {
                        failedModules.push({
                            topic,
                            error: 'Données compétences incomplètes',
                            severity: 'WARNING'
                        });
                        continue;
                    }
                }
                
                passedModules.push({
                    topic,
                    format: hasPhases ? 'phases' : 'competences',
                    status: 'OK'
                });
                
            } catch (error) {
                failedModules.push({
                    topic,
                    error: error.message,
                    severity: 'CRITICAL'
                });
            }
        }
        
        // Résultats
        console.log('\n📊 RÉSULTATS DU TEST DE CHARGEMENT');
        console.log('=====================================');
        console.log(`✅ Modules fonctionnels: ${passedModules.length}`);
        console.log(`❌ Modules défaillants: ${failedModules.length}`);
        
        if (passedModules.length > 0) {
            console.log('\n✅ MODULES FONCTIONNELS:');
            passedModules.forEach(module => {
                console.log(`  ${module.topic} (${module.format})`);
            });
        }
        
        if (failedModules.length > 0) {
            console.log('\n❌ MODULES DÉFAILLANTS:');
            failedModules.forEach(module => {
                console.log(`  ${module.severity === 'CRITICAL' ? '🚨' : '⚠️'} ${module.topic}: ${module.error}`);
                if (module.data) {
                    console.log(`    Clés disponibles: ${module.data.keys.join(', ')}`);
                }
            });
            
            console.log('\n🛠️ ACTIONS REQUISES:');
            const criticalIssues = failedModules.filter(m => m.severity === 'CRITICAL');
            if (criticalIssues.length > 0) {
                console.log(`  🚨 ${criticalIssues.length} modules avec erreurs critiques`);
                console.log('  → Ces modules ne se chargeront PAS dans page_de_cours.html');
            }
            
            const warnings = failedModules.filter(m => m.severity === 'WARNING');
            if (warnings.length > 0) {
                console.log(`  ⚠️ ${warnings.length} modules avec avertissements`);
                console.log('  → Ces modules peuvent avoir des problèmes d\'affichage');
            }
        }
        
        console.log('\n🎯 RECOMMANDATIONS:');
        console.log('1. Corriger les modules avec erreurs critiques');
        console.log('2. Vérifier que tous les modules suivent le format phases ou compétences');
        console.log('3. Tester manuellement les URLs problématiques');
        
        return {
            total: topics.length,
            passed: passedModules.length,
            failed: failedModules.length,
            failedModules,
            success: failedModules.length === 0
        };
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        return { success: false, error: error.message };
    }
}

// Exécution du test
testModuleLoading().then(result => {
    if (result.success) {
        console.log('\n🎉 TOUS LES MODULES SONT FONCTIONNELS !');
    } else {
        console.log('\n⚠️ MODULES DÉFAILLANTS DÉTECTÉS !');
        console.log('→ Utilisez ce rapport pour corriger les problèmes');
    }
});
