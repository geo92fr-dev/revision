@echo off
echo 🚀 DEPLOIEMENT FUNREVIS V2
echo =============================

echo.
echo 📋 Etape 1: Verification des prerequis...
where firebase >nul 2>&1
if errorlevel 1 (
    echo ❌ Firebase CLI non trouve
    echo Installez avec: npm install -g firebase-tools
    pause
    exit /b 1
)
echo ✅ Firebase CLI trouve

echo.
echo 🧪 Etape 2: Tests de validation...
node scripts/test.js
if errorlevel 1 (
    echo ❌ Tests echoues - arrêt du deploiement
    pause
    exit /b 1
)
echo ✅ Tests passes

echo.
echo 📦 Etape 3: Build du projet...
node scripts/build.js
if errorlevel 1 (
    echo ❌ Build echoue
    pause
    exit /b 1
)
echo ✅ Build termine

echo.
echo 🔐 Etape 4: Verification de l'authentification Firebase...
firebase projects:list >nul 2>&1
if errorlevel 1 (
    echo ❌ Non authentifie sur Firebase
    echo Executez: firebase login
    pause
    exit /b 1
)
echo ✅ Authentification OK

echo.
echo 🚀 Etape 5: Deploiement sur Firebase...
firebase deploy --only hosting
if errorlevel 1 (
    echo ❌ Deploiement echoue
    pause
    exit /b 1
)

echo.
echo ✅ DEPLOIEMENT TERMINE AVEC SUCCES !
echo 🌐 Application disponible sur: https://funrevis.web.app/
echo.
pause
