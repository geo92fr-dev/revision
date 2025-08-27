# 🔧 SCRIPT DE TEST POWERSHELL - Sans interférence serveur
# ===========================================================

Write-Host "🚀 LANCEMENT DES TESTS FUNREVIS" -ForegroundColor Cyan
Write-Host "=" * 50

$baseUrl = "http://localhost:8000"
$modules = @(
    "mathematiques-6ieme-nombres-entiers",
    "mathematiques-6ieme-nombres-decimaux", 
    "mathematiques-6ieme-fractions",
    "mathematiques-6ieme-algebre",
    "mathematiques-6ieme-proportionnalite",
    "mathematiques-6ieme-unites-masse-capacite",
    "mathematiques-6ieme-pourcentages"
)

# Test serveur de santé
Write-Host "🔍 Test de santé du serveur..." -NoNewline
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/src/index.html" -TimeoutSec 5 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host " ✅ OK" -ForegroundColor Green
        $serverOK = $true
    } else {
        Write-Host " ❌ Code $($response.StatusCode)" -ForegroundColor Red
        $serverOK = $false
    }
} catch {
    Write-Host " 💥 Erreur de connexion" -ForegroundColor Red
    $serverOK = $false
}

if (-not $serverOK) {
    Write-Host "💥 Serveur local inaccessible!" -ForegroundColor Red
    Write-Host "💡 Vérifiez que le serveur tourne: python -m http.server 8000" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n📊 Test des modules..." -ForegroundColor Cyan
Write-Host "-" * 50

$succes = 0
$erreurs = @()

foreach ($module in $modules) {
    $url = "$baseUrl/src/pages/page_de_cours.html?module=$module"
    Write-Host "🔍 $module" -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $url -TimeoutSec 8 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            # Verification basique du contenu
            $content = $response.Content.ToLower()
            if ($content -match "type d'exercice non reconnu") {
                Write-Host " ❌ Erreur exercice" -ForegroundColor Red
                $erreurs += "$module : Erreur de type d'exercice"
            } else {
                Write-Host " ✅ OK" -ForegroundColor Green
                $succes++
            }
        } else {
            Write-Host " ❌ Code $($response.StatusCode)" -ForegroundColor Red
            $erreurs += "$module : Code $($response.StatusCode)"
        }
    } catch {
        Write-Host " 💥 Erreur" -ForegroundColor Red
        $erreurs += "$module : $($_.Exception.Message.Substring(0, [Math]::Min(50, $_.Exception.Message.Length)))"
    }
    
    Start-Sleep -Milliseconds 300
}

# Resultats finaux
Write-Host "`n" + "=" * 50
Write-Host "📊 RESULTATS FINAUX" -ForegroundColor Cyan
Write-Host "=" * 50
Write-Host "✅ Modules OK: $succes" -ForegroundColor Green
Write-Host "❌ Modules erreur: $($erreurs.Count)" -ForegroundColor Red
$tauxReussite = [Math]::Round(($succes / $modules.Count) * 100, 1)
Write-Host "📈 Taux reussite: $tauxReussite%" -ForegroundColor Cyan

if ($erreurs.Count -gt 0) {
    Write-Host "`n⚠️ MODULES EN ERREUR:" -ForegroundColor Yellow
    foreach ($erreur in $erreurs) {
        Write-Host "   - $erreur" -ForegroundColor Red
    }
}

Write-Host "`n🔗 LIENS RAPIDES:" -ForegroundColor Cyan
Write-Host "   🏠 Accueil: $baseUrl/src/index.html"
Write-Host "   🧪 Test exercices: $baseUrl/src/pages/test-exercices.html"
Write-Host "   🔧 Validation: $baseUrl/src/pages/validation-locale.html"

Write-Host "`n🏆 TEST TERMINE!" -ForegroundColor Green

# Code de sortie
if ($erreurs.Count -eq 0) {
    Write-Host "🎉 TOUS LES TESTS PASSES!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️ Certains tests ont echoue" -ForegroundColor Yellow
    exit 1
}
