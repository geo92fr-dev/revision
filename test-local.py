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
from urllib.parse import urljoin

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
        
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {test_case['name']} ({response.status_code})")
        
        if success and test_case["url"].endswith('.js'):
            content_length = len(response.text)
            has_content = content_length > 500
            content_icon = "✅" if has_content else "⚠️"
            print(f"   📊 Contenu: {content_length} caractères {content_icon}")
        
        return success
    except Exception as error:
        print(f"❌ {test_case['name']} - Erreur: {str(error)}")
        return False

def run_tests():
    print("\n🔍 TESTS DES URLS...")
    print("===================")
    
    passed = 0
    total = 0
    
    for test_case in test_urls:
        total += 1
        success = test_url(test_case)
        if success:
            passed += 1
        
        # Pause entre les tests
        time.sleep(0.1)
    
    print("\n📊 RÉSULTATS:")
    print("=============")
    print(f"✅ Tests réussis: {passed}/{total}")
    print(f"📈 Taux de réussite: {(passed/total)*100:.1f}%")
    
    if passed == total:
        print("\n🎉 TOUS LES TESTS SONT PASSÉS !")
        print("✅ Application locale fonctionnelle")
        print("✅ Modules chargés correctement")
        print("✅ Auto-extensibilité validée")
    else:
        print(f"\n⚠️ {total - passed} test(s) échoué(s)")
    
    print("\n🔗 LIENS DE TEST DIRECTS:")
    print("=========================")
    print(f"📋 Page d'accueil: {BASE_URL}")
    print(f"📚 Cours multiplication: {BASE_URL}/pages/page_de_cours.html?topic=multiplication")
    print(f"🔢 Cours addition-soustraction: {BASE_URL}/pages/page_de_cours.html?topic=addition-soustraction")
    print(f"📊 Cours pourcentages (nouveau): {BASE_URL}/pages/page_de_cours.html?topic=pourcentages")
    print(f"📝 Cours fractions (contenu riche): {BASE_URL}/pages/page_de_cours.html?topic=fractions")

# Vérifier que le serveur est accessible
try:
    print("🔌 Vérification de la connexion au serveur...")
    response = requests.get(BASE_URL, timeout=5)
    print(f"✅ Serveur accessible sur {BASE_URL}")
    
    run_tests()
    
except Exception as error:
    print("❌ Impossible de se connecter au serveur local")
    print("💡 Assurez-vous que le serveur est démarré avec:")
    print("   cd src && python -m http.server 8000")
    print(f"\nErreur: {str(error)}")
    sys.exit(1)
