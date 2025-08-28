// Test simple de chargement pour diagnostiquer le problème SectionManager

console.log('🔍 Test de diagnostic - SectionManager');

// Test 1: Vérifier que nous sommes bien dans le bon environnement
console.log('✅ Script de diagnostic chargé');
console.log('URL actuelle:', window.location.href);

// Test 2: Vérifier les paramètres URL
const urlParams = new URLSearchParams(window.location.search);
console.log('Paramètres URL:', {
    subject: urlParams.get('subject'),
    level: urlParams.get('level'), 
    topic: urlParams.get('topic')
});

// Test 3: Vérifier si SectionManager existe quelque part
if (typeof SectionManager !== 'undefined') {
    console.log('✅ SectionManager est défini');
} else {
    console.log('❌ SectionManager n\'est PAS défini');
    
    // Chercher des traces de SectionManager dans le DOM
    const scripts = document.querySelectorAll('script');
    console.log('Scripts trouvés:', scripts.length);
    
    scripts.forEach((script, index) => {
        if (script.src) {
            console.log(`Script ${index}: ${script.src}`);
        } else if (script.textContent && script.textContent.includes('SectionManager')) {
            console.log(`Script ${index} contient SectionManager (inline)`);
        }
    });
}

// Test 4: Vérifier le DOM
console.log('Container sections:', document.querySelector('.sections-container'));
console.log('Main content:', document.querySelector('.main-content'));

// Test 5: Essayer de charger les données 
const subject = urlParams.get('subject') || 'mathematiques';
const level = urlParams.get('level') || '6ieme'; 
const topic = urlParams.get('topic') || 'addition-soustraction';

console.log(`Tentative de chargement: ${subject}/${level}/${topic}`);

// Simuler le chargement de données
const dataPath = `../data/${subject}/${level}/${topic}.js`;
console.log('Chemin des données:', dataPath);

// Fonction de test pour diagnostiquer
function diagnosticTest() {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #fff;
        border: 2px solid #007bff;
        border-radius: 8px;
        padding: 15px;
        max-width: 400px;
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: monospace;
        font-size: 12px;
    `;
    
    errorDiv.innerHTML = `
        <h4 style="color: #007bff; margin: 0 0 10px 0;">🔍 Diagnostic SectionManager</h4>
        <div><strong>Status:</strong> ${typeof SectionManager !== 'undefined' ? '✅ Défini' : '❌ NON défini'}</div>
        <div><strong>URL:</strong> ${window.location.pathname}</div>
        <div><strong>Params:</strong> ${subject}/${level}/${topic}</div>
        <div><strong>Scripts:</strong> ${document.querySelectorAll('script').length}</div>
        <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 5px 10px;">Fermer</button>
    `;
    
    document.body.appendChild(errorDiv);
}

// Lancer le diagnostic
setTimeout(diagnosticTest, 1000);
