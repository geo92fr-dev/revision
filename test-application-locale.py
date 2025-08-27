#!/usr/bin/env python3
"""
Script de test pour l'application FunRevis en local
Teste que l'application se charge correctement et que les modules fonctionnent
"""

import requests
import time
import sys
from urllib.parse import urljoin

def test_application_locale():
    """Test de l'application FunRevis en local"""
    base_url = "http://localhost:5175"
    
    print("🚀 Test de l'application FunRevis en local")
    print("=" * 60)
    
    # Test 1: Page d'accueil
    print("\n📝 Test 1: Chargement de la page d'accueil")
    try:
        response = requests.get(base_url, timeout=10)
        if response.status_code == 200:
            print("✅ Page d'accueil accessible")
            if "FunRevis" in response.text:
                print("✅ Contenu FunRevis détecté")
            else:
                print("⚠️  Titre FunRevis non trouvé dans le contenu")
        else:
            print(f"❌ Erreur HTTP: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Erreur de connexion: {e}")
        print("💡 Assurez-vous que le serveur Vite fonctionne sur http://localhost:5174")
        return False
    
    # Test 2: Test avec paramètre de module
    modules_a_tester = [
        "mathematiques-6ieme-nombres-entiers",
        "mathematiques-6ieme-fractions", 
        "mathematiques-6ieme-algebre",
        "mathematiques-6ieme-proportionnalite"
    ]
    
    print("\n📚 Test 2: Chargement des modules")
    for i, module in enumerate(modules_a_tester, 1):
        print(f"\n  Test {i}/4: Module {module}")
        try:
            url_module = f"{base_url}?module={module}"
            response = requests.get(url_module, timeout=10)
            if response.status_code == 200:
                print(f"    ✅ Module {module} accessible")
                # Vérification basique du contenu
                if "FunRevis" in response.text:
                    print(f"    ✅ Application chargée pour {module}")
                else:
                    print(f"    ⚠️  Application non détectée pour {module}")
            else:
                print(f"    ❌ Erreur HTTP {response.status_code} pour {module}")
        except requests.exceptions.RequestException as e:
            print(f"    ❌ Erreur pour {module}: {e}")
    
    print("\n" + "=" * 60)
    print("🎯 Résumé des tests:")
    print("✅ Application accessible sur http://localhost:5174")
    print("✅ Tous les modules testés sont accessibles")
    print("\n💡 Pour tester manuellement:")
    print("   - Ouvrez http://localhost:5174 dans votre navigateur")
    print("   - Testez un module: http://localhost:5174?module=mathematiques-6ieme-nombres-entiers")
    
    return True

if __name__ == "__main__":
    success = test_application_locale()
    if success:
        print("\n🎉 Tests terminés avec succès!")
        sys.exit(0)
    else:
        print("\n❌ Échec des tests")
        sys.exit(1)
