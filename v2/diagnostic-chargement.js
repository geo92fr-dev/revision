#!/usr/bin/env node

/**
 * 🔧 DIAGNOSTIC RAPIDE DES CHARGEMENTS - FunRevis V2
 * =================================================
 * 
 * Vérifie que tous les fichiers critiques sont accessibles
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 DIAGNOSTIC DES CHARGEMENTS FUNREVIS V2');
console.log('==========================================');

const srcDir = path.join(__dirname, 'src');

// Vérifications critiques
const checks = [
    {
        name: '📄 Page cours.html',
        path: path.join(srcDir, 'pages', 'cours.html'),
        critical: true
    },
    {
        name: '📄 Page index.html',
        path: path.join(srcDir, 'index.html'),
        critical: true
    },
    {
        name: '📊 Addition-soustraction 6ème',
        path: path.join(srcDir, 'data', 'mathematiques', '6ieme', 'addition-soustraction.js'),
        critical: true
    },
    {
        name: '🎨 Styles CSS',
        path: path.join(srcDir, 'styles'),
        critical: false
    },
    {
        name: '⚙️ Components JS',
        path: path.join(srcDir, 'components'),
        critical: false
    }
];

let allOk = true;

checks.forEach(check => {
    const exists = fs.existsSync(check.path);
    const status = exists ? '✅' : '❌';
    const priority = check.critical ? '[CRITIQUE]' : '[OPTIONNEL]';
    
    console.log(`${status} ${check.name} ${priority}`);
    
    if (!exists && check.critical) {
        allOk = false;
        console.log(`   ⚠️  MANQUANT: ${check.path}`);
    }
    
    if (exists && check.path.endsWith('.js')) {
        // Vérifier la validité du JS
        try {
            const content = fs.readFileSync(check.path, 'utf8');
            if (content.includes('export') && (content.includes('const data') || content.includes('export const'))) {
                console.log(`   ✅ Export détecté dans ${path.basename(check.path)}`);
            }
        } catch (e) {
            console.log(`   ⚠️  Erreur lecture: ${e.message}`);
        }
    }
});

console.log('\n📊 RÉSULTAT DU DIAGNOSTIC');
console.log('==========================');

if (allOk) {
    console.log('🎉 TOUS LES FICHIERS CRITIQUES SONT PRÉSENTS !');
    console.log('✅ L\'application devrait se charger correctement');
    console.log('🌐 URL de test: http://localhost:8080/pages/cours.html?subject=mathematiques&level=6ieme&topic=addition-soustraction');
} else {
    console.log('❌ DES FICHIERS CRITIQUES SONT MANQUANTS !');
    console.log('⚠️  L\'application pourrait ne pas fonctionner correctement');
}

console.log('\n🔧 Pour lancer l\'application:');
console.log('cd src && python -m http.server 8080');
