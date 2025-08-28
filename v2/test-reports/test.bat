@echo off
REM Script de lancement des tests FunRevis V2 pour Windows
REM Usage: test.bat [categorie]

setlocal

echo ==========================================
echo     TESTS FUNREVIS V2 - WINDOWS
echo ==========================================
echo.

REM Vérification de Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Node.js n'est pas installe ou non disponible dans le PATH
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

REM Changement vers le répertoire des tests
cd /d "%~dp0"

REM Paramètre optionnel
set CATEGORY=%1
if "%CATEGORY%"=="" set CATEGORY=all

echo Execution des tests: %CATEGORY%
echo.

REM Exécution des tests
if "%CATEGORY%"=="help" (
    node run-tests-quick.js help
) else (
    node run-tests-quick.js %CATEGORY%
)

REM Gestion du code de sortie
if %errorlevel% neq 0 (
    echo.
    echo Tests termines avec des erreurs
    pause
    exit /b %errorlevel%
) else (
    echo.
    echo Tests termines avec succes
    pause
)

endlocal
