#!/usr/bin/env python3
"""
🔧 TEST AUTOMATIQUE DE VALIDATION LOCALE
========================================

Ce script teste automatiquement que tous les modules sont accessibles
et que le serveur local fonctionne correctement.
"""

import requests
import time
import sys

# Configuration
BASE_URL = "http://localhost:8000"
MODULES = [
    'mathematiques-6ieme-nombres-entiers',
    'mathematiques-6ieme-nombres-decimaux', 
    'mathematiques-6ieme-fractions',
    'mathematiques-6ieme-fractions-simples',
    'mathematiques-6ieme-addition-soustraction',
    'mathematiques-6ieme-multiplication',
    'mathematiques-6ieme-division',
    'mathematiques-6ieme-figures-planes',
    'mathematiques-6ieme-perimetre',
    'mathematiques-6ieme-aires-figures',
    'mathematiques-6ieme-symetrie-axiale',
    'mathematiques-6ieme-constructions-geometriques',
    'mathematiques-6ieme-unites-longueur',
    'mathematiques-6ieme-unites-masse-capacite',
    'mathematiques-6ieme-durees',
    'mathematiques-6ieme-lecture-tableaux',
    'mathematiques-6ieme-graphiques',
    'mathematiques-6ieme-proportionnalite',
    'mathematiques-6ieme-algebre',
    'mathematiques-6ieme-moyenne',
    'mathematiques-6ieme-pourcentages'
]

def test_server_health():
    """Test que le serveur local répond"""
    try:
        response = requests.get(f"{BASE_URL}/src/index.html", timeout=5)
        if response.status_code == 200:
            print("✅ Serveur local actif et fonctionnel")
            return True
        else:
            print(f"❌ Serveur répond avec le code {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"💥 Erreur de connexion au serveur: {e}")
        return False

def test_module(module):
    """Test qu'un module spécifique se charge"""
    url = f"{BASE_URL}/src/pages/page_de_cours.html?module={module}"
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            # Vérification basique du contenu
            content = response.text.lower()
            if "erreur" in content and "type d'exercice non reconnu" in content:
                return False, "Erreur de type d'exercice"
            elif "error" in content and "404" in content:
                return False, "Page non trouvée"
            else:
                return True, "OK"
        else:
            return False, f"Code {response.status_code}"
    except requests.exceptions.RequestException as e:
        return False, f"Erreur: {str(e)[:50]}"

def main():
    print("🚀 DÉMARRAGE DU TEST DE VALIDATION LOCALE")
    print("=" * 50)
    
    start_time = time.time()
    
    # Test de santé du serveur
    if not test_server_health():
        print("💥 Le serveur local n'est pas accessible!")
        print("💡 Vérifiez que le serveur est démarré avec: python -m http.server 8000")
        sys.exit(1)
    
    print(f"\n📊 Test de {len(MODULES)} modules...")
    print("-" * 50)
    
    succès = 0
    erreurs = []
    
    for i, module in enumerate(MODULES, 1):
        print(f"🔍 {i:2d}/{len(MODULES)} {module:<40}", end=" ")
        
        success, message = test_module(module)
        
        if success:
            print("✅ OK")
            succès += 1
        else:
            print(f"❌ {message}")
            erreurs.append(f"{module}: {message}")
        
        # Petite pause pour ne pas surcharger
        time.sleep(0.2)
    
    end_time = time.time()
    duration = end_time - start_time
    
    # Résultats finaux
    print("\n" + "=" * 50)
    print("📊 RÉSULTATS FINAUX")
    print("=" * 50)
    print(f"✅ Modules OK: {succès}")
    print(f"❌ Modules en erreur: {len(erreurs)}")
    print(f"📈 Taux de réussite: {(succès/len(MODULES)*100):.1f}%")
    print(f"⏱️  Durée du test: {duration:.1f}s")
    
    if erreurs:
        print(f"\n⚠️  MODULES EN ERREUR:")
        for erreur in erreurs:
            print(f"   - {erreur}")
    
    print("\n🔗 LIENS RAPIDES:")
    print(f"   🏠 Accueil: {BASE_URL}/src/index.html")
    print(f"   🧪 Test exercices: {BASE_URL}/src/pages/test-exercices.html")
    print(f"   🔧 Validation: {BASE_URL}/src/pages/validation-locale.html")
    
    print("\n🏆 TEST TERMINÉ!")
    
    # Code de sortie
    return 0 if len(erreurs) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())
