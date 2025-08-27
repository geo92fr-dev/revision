import requests
import time

print("🔧 TEST RAPIDE DE L'APPLICATION LOCALE")
print("=" * 45)

BASE_URL = "http://localhost:8000"

# Pages clés à tester
pages = [
    ("Accueil", "src/index.html"),
    ("Module fractions", "src/pages/page_de_cours.html?module=mathematiques-6ieme-fractions"),
    ("Module algèbre", "src/pages/page_de_cours.html?module=mathematiques-6ieme-algebre"),
    ("Test exercices", "src/pages/test-exercices.html"),
    ("Validation locale", "src/pages/validation-locale.html")
]

succès = 0
total = len(pages)

for nom, chemin in pages:
    try:
        url = f"{BASE_URL}/{chemin}"
        print(f"🔍 {nom:<20}", end=" ")
        
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print("✅ OK")
            succès += 1
        else:
            print(f"❌ Code {response.status_code}")
    except Exception as e:
        print(f"💥 Erreur: {str(e)[:30]}")
    
    time.sleep(0.5)

print(f"\n📊 Résultat: {succès}/{total} tests réussis")
print(f"📈 Taux de réussite: {(succès/total*100):.0f}%")

if succès == total:
    print("🎉 TOUS LES TESTS PASSÉS!")
else:
    print("⚠️ Certains tests ont échoué")
