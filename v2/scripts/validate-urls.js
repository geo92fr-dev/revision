#!/usr/bin/env node

/**
 * 🔗 Validation des URLs FunRevis V2
 * Teste que toutes les pages sont accessibles
 */

const http = require('http');

class URLValidator {
    constructor() {
        this.baseUrl = 'http://localhost:8080';
        this.results = [];
    }
    
    async validateURLs() {
        console.log('🔗 VALIDATION DES URLs FUNREVIS V2');
        console.log('='.repeat(40));
        
        const urls = [
            '/src/index.html',
            '/src/test-simple.html',
            '/src/pages/mathematiques/index.html',
            '/src/pages/page_de_cours.html?subject=mathematiques&level=6ieme&topic=fractions',
            '/src/pages/page_de_cours.html?subject=mathematiques&level=6ieme&topic=nombres-entiers',
            '/src/components/ModuleLoader.js',
            '/src/components/CourseRenderer.js',
            '/src/components/NavigationManager.js',
            '/src/data/mathematiques/6ieme/fractions.js',
            '/src/config/courses.js'
        ];
        
        console.log(`\n🧪 Test de ${urls.length} URLs...\n`);
        
        for (const url of urls) {
            await this.testURL(url);
        }
        
        this.generateReport();
    }
    
    async testURL(path) {
        return new Promise((resolve) => {
            const url = `${this.baseUrl}${path}`;
            
            const req = http.get(url, (res) => {
                const success = res.statusCode === 200;
                const result = {
                    path,
                    status: res.statusCode,
                    success,
                    size: res.headers['content-length'] || 'unknown'
                };
                
                this.results.push(result);
                
                const icon = success ? '✅' : '❌';
                const name = path.split('/').pop() || 'index';
                console.log(`${icon} ${name} (${res.statusCode}) - ${result.size} bytes`);
                
                resolve(result);
            });
            
            req.on('error', (error) => {
                const result = {
                    path,
                    status: 'ERROR',
                    success: false,
                    error: error.message
                };
                
                this.results.push(result);
                console.log(`❌ ${path} - ERREUR: ${error.message}`);
                resolve(result);
            });
            
            req.setTimeout(5000, () => {
                req.destroy();
                const result = {
                    path,
                    status: 'TIMEOUT',
                    success: false,
                    error: 'Timeout'
                };
                
                this.results.push(result);
                console.log(`⏰ ${path} - TIMEOUT`);
                resolve(result);
            });
        });
    }
    
    generateReport() {
        console.log('\n📊 RAPPORT DE VALIDATION');
        console.log('='.repeat(40));
        
        const successful = this.results.filter(r => r.success).length;
        const total = this.results.length;
        const successRate = Math.round((successful / total) * 100);
        
        console.log(`\nRésultats: ${successful}/${total} URLs accessibles (${successRate}%)`);
        
        if (successRate === 100) {
            console.log('🎉 Toutes les URLs sont accessibles !');
        } else {
            console.log('\n❌ URLs en échec:');
            this.results.filter(r => !r.success).forEach(result => {
                console.log(`  - ${result.path} (${result.status})`);
            });
        }
        
        console.log('\n🌐 Serveur de test: http://localhost:8080');
        console.log('📋 Interface de test: http://localhost:8080/src/test-simple.html');
        
        return successRate === 100;
    }
}

// Exécution
if (require.main === module) {
    new URLValidator().validateURLs()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Erreur de validation:', error);
            process.exit(1);
        });
}

module.exports = URLValidator;
