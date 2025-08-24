// Script de validation complète de toutes les URLs
import https from 'https';
import { URL } from 'url';

const baseUrl = 'https://funrevis.web.app';

// Toutes les URLs à valider
const urlsToTest = [
    // Pages principales
    '/',
    '/index.html',
    
    // Pages de navigation
    '/pages/page_de_cours.html',
    '/pages/quiz.html',
    '/pages/profile.html',
    
    // Tous les sujets de mathématiques 6ème
    '/pages/page_de_cours.html?topic=addition-soustraction',
    '/pages/page_de_cours.html?topic=aires-figures',
    '/pages/page_de_cours.html?topic=algebre',
    '/pages/page_de_cours.html?topic=constructions-geometriques',
    '/pages/page_de_cours.html?topic=division',
    '/pages/page_de_cours.html?topic=durees',
    '/pages/page_de_cours.html?topic=figures-planes',
    '/pages/page_de_cours.html?topic=fractions-simples',
    '/pages/page_de_cours.html?topic=fractions',
    '/pages/page_de_cours.html?topic=graphiques',
    '/pages/page_de_cours.html?topic=lecture-tableaux',
    '/pages/page_de_cours.html?topic=moyenne',
    '/pages/page_de_cours.html?topic=multiplication',
    '/pages/page_de_cours.html?topic=nombres-decimaux',
    '/pages/page_de_cours.html?topic=nombres-entiers',
    '/pages/page_de_cours.html?topic=perimetre',
    '/pages/page_de_cours.html?topic=proportionnalite',
    '/pages/page_de_cours.html?topic=symetrie-axiale',
    '/pages/page_de_cours.html?topic=unites-longueur',
    '/pages/page_de_cours.html?topic=unites-masse-capacite',
    
    // Assets critiques
    '/src/data/index.js',
    '/src/data/mathematiques/index.js',
    '/src/data/mathematiques/6ieme/index.js',
    '/src/monitoring/dashboard.html'
];

// Fonction pour tester une URL
function testUrl(url) {
    return new Promise((resolve) => {
        const fullUrl = `${baseUrl}${url}`;
        const urlObj = new URL(fullUrl);
        
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || 443,
            path: urlObj.pathname + urlObj.search,
            method: 'GET',
            timeout: 10000
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    url: url,
                    status: res.statusCode,
                    success: res.statusCode >= 200 && res.statusCode < 400,
                    size: data.length,
                    contentType: res.headers['content-type'] || 'unknown'
                });
            });
        });

        req.on('error', (err) => {
            resolve({
                url: url,
                status: 0,
                success: false,
                error: err.message,
                size: 0
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                url: url,
                status: 0,
                success: false,
                error: 'Timeout',
                size: 0
            });
        });

        req.end();
    });
}

// Fonction principale
async function validateAllUrls() {
    console.log('🚀 Validation complète des URLs en cours...\n');
    console.log(`🎯 Base URL: ${baseUrl}`);
    console.log(`📊 Total URLs à tester: ${urlsToTest.length}\n`);

    const results = [];
    const batchSize = 5; // Tester 5 URLs en parallèle
    
    for (let i = 0; i < urlsToTest.length; i += batchSize) {
        const batch = urlsToTest.slice(i, i + batchSize);
        console.log(`🔄 Test du lot ${Math.floor(i/batchSize) + 1}/${Math.ceil(urlsToTest.length/batchSize)}...`);
        
        const batchPromises = batch.map(url => testUrl(url));
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Afficher les résultats du lot
        batchResults.forEach(result => {
            const status = result.success ? '✅' : '❌';
            const size = result.size > 0 ? `(${Math.round(result.size/1024)}KB)` : '';
            console.log(`  ${status} ${result.status} - ${result.url} ${size}`);
            if (result.error) {
                console.log(`    ⚠️  ${result.error}`);
            }
        });
        
        // Petite pause entre les lots pour éviter de surcharger le serveur
        if (i + batchSize < urlsToTest.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Analyse des résultats
    console.log('\n📋 RÉSUMÉ DE LA VALIDATION:\n');
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ URLs réussies: ${successful.length}/${results.length}`);
    console.log(`❌ URLs échouées: ${failed.length}/${results.length}`);
    console.log(`📊 Taux de réussite: ${Math.round(successful.length/results.length*100)}%\n`);
    
    // Détails des catégories
    const categories = {
        'Pages principales': results.filter(r => r.url.includes('.html') && !r.url.includes('topic=')),
        'Sujets mathématiques': results.filter(r => r.url.includes('topic=')),
        'Fichiers JS/Assets': results.filter(r => r.url.includes('.js') || r.url.includes('dashboard'))
    };
    
    Object.entries(categories).forEach(([category, categoryResults]) => {
        const categorySuccess = categoryResults.filter(r => r.success).length;
        console.log(`📁 ${category}: ${categorySuccess}/${categoryResults.length} ✅`);
    });
    
    // Échecs détaillés
    if (failed.length > 0) {
        console.log('\n❌ URLS ÉCHOUÉES:');
        failed.forEach(result => {
            console.log(`  • ${result.url} - Status: ${result.status} - ${result.error || 'Erreur inconnue'}`);
        });
    }
    
    // URLs critiques
    const criticalUrls = [
        '/',
        '/pages/page_de_cours.html?topic=moyenne',
        '/pages/page_de_cours.html?topic=addition-soustraction',
        '/pages/page_de_cours.html?topic=figures-planes'
    ];
    
    const criticalResults = results.filter(r => criticalUrls.includes(r.url));
    const criticalSuccess = criticalResults.filter(r => r.success).length;
    
    console.log(`\n🎯 URLs CRITIQUES: ${criticalSuccess}/${criticalUrls.length} ✅`);
    criticalResults.forEach(result => {
        const status = result.success ? '✅' : '❌';
        console.log(`  ${status} ${result.url}`);
    });
    
    // Statut final
    const overallSuccess = successful.length === results.length;
    const criticalOk = criticalSuccess === criticalUrls.length;
    
    console.log('\n🏆 STATUT FINAL:');
    if (overallSuccess) {
        console.log('🎉 TOUTES LES URLs SONT FONCTIONNELLES !');
    } else if (criticalOk && successful.length / results.length >= 0.9) {
        console.log('✅ DÉPLOIEMENT OPÉRATIONNEL (URLs critiques OK)');
    } else {
        console.log('⚠️  PROBLÈMES DÉTECTÉS - Vérification requise');
    }
    
    console.log(`\n📅 Validation effectuée: ${new Date().toLocaleString('fr-FR')}`);
    
    return {
        total: results.length,
        successful: successful.length,
        failed: failed.length,
        criticalOk: criticalOk,
        overallSuccess: overallSuccess
    };
}

// Exécution
validateAllUrls().catch(console.error);
