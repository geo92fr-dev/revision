# Tests - Projet de révision

Ce dossier contient l'ensemble des tests du projet, organisés par catégories.

## 📁 Structure

```
src/test/
├── data/                    # Tests de validation des données
│   ├── README.md           # Documentation spécifique aux tests de données
│   └── *.js                # Suites de tests pour les données mathématiques
├── *.test.js               # Tests unitaires (Jest/Vitest)
└── setup.js                # Configuration des tests
```

## 🧪 Types de tests

### 📊 Tests de données (`data/`)
- **Objectif** : Valider l'intégrité des données mathématiques
- **Scope** : 20 topics de mathématiques 6ème, exports, structure
- **Framework** : Node.js natif avec modules ES6
- **Commandes** : `npm run test:data:*`

### ⚛️ Tests unitaires (racine)
- **Objectif** : Valider les composants React et services
- **Scope** : Composants UI, services, intégrations
- **Framework** : Jest/Vitest avec Testing Library
- **Commandes** : `npm test`, `npm run test:ui`

## 🚀 Commandes principales

```bash
# Tests de données mathématiques
npm run test:data              # Principal
npm run test:data:all          # Suite complète

# Tests unitaires classiques
npm test                       # Mode watch
npm run test:run              # Une seule fois
npm run test:coverage         # Avec couverture

# Tests combinés
npm run test:run && npm run test:data
```

## 📈 Validation complète

Pour une validation complète du projet :

1. **Tests unitaires** : `npm run test:run`
2. **Tests de données** : `npm run test:data`
3. **Linting** : `npm run lint`
4. **Build** : `npm run build`

## 🔧 Configuration

- **Jest/Vitest** : Configuration dans `setup.js` et `vite.config.js`
- **Tests de données** : Configuration dans `data/config.js`
- **ESLint** : `.eslintrc.js` pour les règles de qualité
