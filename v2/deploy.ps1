# 🚀 Script de déploiement FunRevis V2
# Usage: ./deploy.ps1

Write-Host "🚀 DÉPLOIEMENT FUNREVIS V2" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

# Fonction pour afficher les étapes
function Write-Step {
    param($StepNumber, $Message)
    Write-Host "`n📋 Étape $StepNumber : $Message..." -ForegroundColor Yellow
}

# Fonction pour afficher les succès
function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

# Fonction pour afficher les erreurs
function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

try {
    # Étape 1: Vérification des prérequis
    Write-Step 1 "Vérification des prérequis"
    
    # Vérifier Firebase CLI
    try {
        $firebaseVersion = firebase --version 2>$null
        Write-Success "Firebase CLI trouvé: $firebaseVersion"
    }
    catch {
        Write-Error "Firebase CLI non trouvé"
        Write-Host "Installez avec: npm install -g firebase-tools" -ForegroundColor White
        exit 1
    }
    
    # Vérifier Node.js
    try {
        $nodeVersion = node --version 2>$null
        Write-Success "Node.js trouvé: $nodeVersion"
    }
    catch {
        Write-Error "Node.js non trouvé"
        exit 1
    }
    
    # Étape 2: Tests de validation
    Write-Step 2 "Tests de validation"
    $testResult = node scripts/test.js
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Tests échoués - arrêt du déploiement"
        exit 1
    }
    Write-Success "Tests passés avec succès"
    
    # Étape 3: Build du projet
    Write-Step 3 "Build du projet"
    try {
        node scripts/build.js
        if ($LASTEXITCODE -ne 0) {
            throw "Build échoué"
        }
        Write-Success "Build terminé"
    }
    catch {
        Write-Error "Erreur lors du build: $_"
        exit 1
    }
    
    # Étape 4: Vérification de l'authentification Firebase
    Write-Step 4 "Vérification de l'authentification Firebase"
    try {
        firebase projects:list | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "Non authentifié"
        }
        Write-Success "Authentification Firebase OK"
    }
    catch {
        Write-Error "Non authentifié sur Firebase"
        Write-Host "Exécutez: firebase login" -ForegroundColor White
        exit 1
    }
    
    # Étape 5: Déploiement
    Write-Step 5 "Déploiement sur Firebase"
    try {
        firebase deploy --only hosting
        if ($LASTEXITCODE -ne 0) {
            throw "Déploiement échoué"
        }
        Write-Success "Déploiement terminé avec succès"
    }
    catch {
        Write-Error "Erreur lors du déploiement: $_"
        exit 1
    }
    
    # Succès final
    Write-Host "`n🎉 DÉPLOIEMENT TERMINÉ AVEC SUCCÈS !" -ForegroundColor Green
    Write-Host "🌐 Application disponible sur: https://funrevis.web.app/" -ForegroundColor Cyan
    
    # Optionnel: ouvrir le navigateur
    $openBrowser = Read-Host "`nOuvrir l'application dans le navigateur ? (o/n)"
    if ($openBrowser -eq "o" -or $openBrowser -eq "O") {
        Start-Process "https://funrevis.web.app/"
    }
}
catch {
    Write-Error "Erreur critique: $_"
    exit 1
}

Write-Host "`nAppuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
