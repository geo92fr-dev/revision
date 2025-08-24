# Tests de données - Mathématiques 6ème

> **Note**: Ces tests sont maintenant organisés dans `src/test/data/` pour une meilleure structure du projet.

## 📁 Nouvelle organisation

## 📁 Nouvelle organisation
```
src/test/
├── data/                    # Tests spécifiques aux données mathématiques
│   ├── config.js           # Configuration et utilitaires partagés
│   ├── index.js            # Point d'entrée principal pour les tests de données
│   ├── test-simple.js      # Tests de base rapides
│   ├── test-exports.js     # Validation des exports
│   ├── test-integrite.js   # Tests de structure des données
│   ├── test-moyenne.js     # Tests spécifiques au topic "moyenne"
│   ├── test-index.js       # Tests du système d'index
│   ├── test-complet.js     # Suite de tests intermédiaire
│   └── test-final.js       # Suite de tests complète
├── *.test.js               # Tests unitaires des composants React
└── setup.js                # Configuration Jest/Vitest
```

## 🚀 Commandes mises à jour

### Tests via npm
```bash
# Test principal des données mathématiques
npm run test:data

# Suite complète de tous les tests de données
npm run test:data:all

# Tests rapides
npm run test:data:simple

# Tests des exports uniquement
npm run test:data:exports

# Tests unitaires classiques (composants React)
npm test
```

### Tests directs
```bash
# Test complet (recommandé)
node src/test/data/test-final.js

# Suite complète avec résumé
node src/test/data/index.js

# Tests individuels
node src/test/data/test-simple.js
node src/test/data/test-exports.js
```

## 📊 Que testent les suites ?

### 🔍 test-final.js (Principal)
- ✅ Import de l'index principal
- ✅ Nombre de topics (20 attendus)
- ✅ Cohérence des exports
- ✅ Validation des structures de données
- ✅ Support dual format (compétences/phases)
- ✅ Tests de cas spécifiques
- ✅ Validation des URLs

### 🎯 test-simple.js (Rapide)
- ✅ Tests de base uniquement
- ✅ Import de l'index
- ✅ Nombre de topics

### 📤 test-exports.js (Exports)
- ✅ Validation des noms d'exports
- ✅ Cohérence kebab-case → camelCase
- ✅ Présence dans l'index

### 🏗️ test-integrite.js (Structure)
- ✅ Structure des objets de données
- ✅ Présence des propriétés requises
- ✅ Validation des formats compétences/phases

## 📈 Résultats attendus

Tous les tests doivent afficher **100% de réussite** :
```
✅ Tests réussis: 9/9
❌ Tests échoués: 0/9
📈 Taux de réussite: 100%
```

## 🎯 Topics validés

### Format "compétences" (9 topics)
- addition-soustraction
- multiplication  
- division
- figures-planes
- perimetre
- fractions
- proportionnalite
- algebre
- moyenne

### Format "phases" (11 topics)
- nombres-entiers
- nombres-decimaux
- fractions-simples
- symetrie-axiale
- aires-figures
- constructions-geometriques
- unites-longueur
- unites-masse-capacite
- durees
- lecture-tableaux
- graphiques

## 🔧 Configuration

La configuration est centralisée dans `config.js` :
- Chemins relatifs
- Liste des topics attendus
- Utilitaires de test partagés
- Configuration des suites de tests

## 🚨 Résolution de problèmes

Si un test échoue :
1. Vérifiez que tous les fichiers de données existent
2. Validez les noms d'exports (format camelCase + "6eme")
3. Contrôlez la structure des données
4. Vérifiez l'index principal

## 🎉 Déploiement

Après validation complète des tests :
```bash
npm run build
firebase deploy
```

Le système est déployé sur : https://funrevis.web.app
