@echo off
REM ============================================================================
REM    LAUNCHER UNIFIÉ FUNREVIS V2 - TOUS LES TESTS
REM ============================================================================
REM 
REM Ce script lance les deux types de tests :
REM 1. Tests automatisés (test-reports/)
REM 2. Tests de développement (v2/src/)
REM
REM Usage: 
REM   test-launcher.bat                    - Menu interactif
REM   test-launcher.bat auto               - Tests automatisés seulement  
REM   test-launcher.bat dev                - Tests développement seulement
REM   test-launcher.bat all                - Tous les tests
REM ============================================================================

setlocal

echo.
echo ============================================================================
echo                   LAUNCHER UNIFIE TESTS FUNREVIS V2
echo ============================================================================
echo.

REM Verification de Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Node.js n'est pas installe ou non disponible
    echo    Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

REM Changement vers le répertoire racine v2
cd /d "%~dp0"

REM Paramètre optionnel
set MODE=%1
if "%MODE%"=="" goto :MENU

REM Exécution directe selon le paramètre
if /i "%MODE%"=="auto" goto :AUTO_TESTS
if /i "%MODE%"=="dev" goto :DEV_TESTS  
if /i "%MODE%"=="all" goto :ALL_TESTS
if /i "%MODE%"=="help" goto :HELP

echo Parametre invalide: %MODE%
goto :HELP

:MENU
echo TYPES DE TESTS DISPONIBLES:
echo.
echo    1. Tests Automatises (test-reports/)
echo       - Validation systeme, CI/CD, rapports
echo       - 12 tests: Structure, Syntaxe, Donnees, Architecture, Performance, Integration
echo.
echo    2. Tests de Developpement (src/)  
echo       - Debug, developpement, tests visuels
echo       - 10 fichiers: debug, fractions, loading, cours, etc.
echo.
echo    3. Tous les Tests
echo       - Automatises + Guide developpement
echo.
echo    4. Aide
echo.
set /p choice="Votre choix (1-4): "

if "%choice%"=="1" goto :AUTO_TESTS
if "%choice%"=="2" goto :DEV_TESTS
if "%choice%"=="3" goto :ALL_TESTS
if "%choice%"=="4" goto :HELP
echo ❌ Choix invalide
goto :MENU

:AUTO_TESTS
echo.
echo 🤖 LANCEMENT DES TESTS AUTOMATISÉS
echo ============================================================================
cd test-reports
echo 📂 Répertoire: test-reports/
echo 🚀 Commande: node run-tests-quick.js all
echo.
node run-tests-quick.js all
set AUTO_RESULT=%errorlevel%
cd ..
echo.
echo 📊 Tests automatisés terminés (Code: %AUTO_RESULT%)
if "%MODE%"=="auto" (
    pause
    exit /b %AUTO_RESULT%
)
goto :END

:DEV_TESTS
echo.
echo 🛠️ TESTS DE DÉVELOPPEMENT DISPONIBLES
echo ============================================================================
echo 📂 Répertoire: src/
echo 🌐 Serveur local requis: http://localhost:8080
echo.
echo 📋 FICHIERS DE TESTS DISPONIBLES:
echo.
echo    🐛 DEBUG:
echo       • test-debug.html           - Debug général du système
echo       • test-debug-forcé.html     - Debug avec chargement forcé
echo.
echo    ⚙️ FONCTIONNELS:
echo       • test-fractions.html       - Test module fractions
echo       • test-loading.html         - Test chargement données
echo       • test-js-loading.html      - Test chargement JavaScript
echo       • test-direct-js.html       - Test direct modules JS
echo.
echo    📚 INTERFACE:
echo       • test-cours-simple.html    - Interface cours simplifiée
echo.
echo    📍 SPÉCIALISÉS:
echo       • pages/mathematiques/6ieme/test-simple.html      - Test niveau 6ème
echo       • pages/mathematiques/6ieme/test-diagnostique.html - Test diagnostique
echo.
echo 🚀 COMMENT UTILISER:
echo    1. Démarrer serveur: python -m http.server 8080 (dans src/)
echo    2. Ouvrir: http://localhost:8080/[nom-du-test].html
echo    3. Tester visuellement dans le navigateur
echo.
echo 💡 SERVEUR AUTO? (y/n)
set /p start_server="Démarrer automatiquement le serveur local? "
if /i "%start_server%"=="y" (
    echo 🚀 Démarrage du serveur sur http://localhost:8080
    echo 📂 Racine: src/
    echo 🔗 Exemple: http://localhost:8080/test-debug.html
    echo.
    echo ⚠️  Appuyez sur Ctrl+C pour arrêter le serveur
    cd src
    python -m http.server 8080
    cd ..
) else (
    echo 📖 Consultez src/TESTS-README.md pour plus de détails
)
if "%MODE%"=="dev" (
    pause
    exit /b 0
)
goto :END

:ALL_TESTS
echo.
echo 🚀 LANCEMENT DE TOUS LES TESTS
echo ============================================================================
call :AUTO_TESTS
echo.
echo ⏸️  Appuyez sur une touche pour continuer vers les tests de développement...
pause > nul
call :DEV_TESTS
goto :END

:HELP
echo.
echo ❓ AIDE - LAUNCHER TESTS FUNREVIS V2
echo ============================================================================
echo.
echo 📖 USAGE:
echo    test-launcher.bat             - Menu interactif
echo    test-launcher.bat auto        - Tests automatisés uniquement
echo    test-launcher.bat dev         - Guide tests développement
echo    test-launcher.bat all         - Tous les tests
echo    test-launcher.bat help        - Cette aide
echo.
echo 🤖 TESTS AUTOMATISÉS (test-reports/):
echo    • Validation système automatique
echo    • 6 catégories: Structure, Syntaxe, Données, Architecture, Performance, Intégration  
echo    • Rapports JSON automatiques
echo    • Utilisés pour CI/CD et validation qualité
echo.
echo 🛠️ TESTS DE DÉVELOPPEMENT (src/):
echo    • Tests manuels dans le navigateur
echo    • Debug interactif et tests visuels
echo    • 10 fichiers pour différents besoins de développement
echo    • Utilisés pendant le développement
echo.
echo 📚 DOCUMENTATION:
echo    • src/TESTS-README.md - Guide complet
echo    • test-reports/README.md - Tests automatisés
echo.
if "%MODE%"=="help" (
    pause
    exit /b 0
)
goto :MENU

:END
echo.
echo ✅ LAUNCHER TERMINÉ
echo 📚 Documentation: src/TESTS-README.md et test-reports/README.md
echo.
pause

endlocal
