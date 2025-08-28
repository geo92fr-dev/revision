# Tests FunRevis V2

## 🧪 Suite de Tests Unifiée

Utilisez uniquement `test-suite-unified.js` pour tous les tests.

### Commandes

```bash
# Exécuter tous les tests
node test-suite-unified.js

# Avec serveur local (requis pour tests d'intégration)
cd src && python -m http.server 8080 &
node test-suite-unified.js
```

### Types de Tests

1. **Validation JavaScript** - Syntaxe et structure
2. **Structure des données** - Format et cohérence
3. **Intégration cours.html** - Compatibilité web
4. **Tests de chargement** - Simulation browser

### Rapports

- `test-report.json` - Rapport détaillé JSON
- Console - Résultats en temps réel

## 🧹 Nettoyage Effectué

Fichiers supprimés lors de la rationalisation :
- Anciens scripts de test redondants
- Outils de correction obsolètes
- Fichiers de diagnostic temporaires
- Dossier tests/ avec anciens tests

## 📁 Structure Actuelle

```
v2/
├── test-suite-unified.js     # 🧪 Suite de tests principale
├── src/                      # 📂 Code source
├── package.json             # 📦 Configuration
└── README.md               # 📖 Documentation
```
