# 🎓 FunRevis V2

Plateforme d'apprentissage interactive - Version 2.0

## 🚀 Démarrage Rapide

### Installation
```bash
cd v2
npm install
```

### Développement Local
```bash
npm run dev
# Ouvre http://localhost:8080
```

### Tests
```bash
npm run test
```

### Build & Déploiement
```bash
npm run build
npm run deploy
```

## 📁 Structure du Projet

```
v2/
├── src/                    # Code source
│   ├── index.html         # Page d'accueil
│   ├── components/        # Composants modulaires
│   │   ├── ModuleLoader.js
│   │   ├── CourseRenderer.js
│   │   └── NavigationManager.js
│   ├── data/             # Données des cours
│   │   └── mathematiques/
│   │       └── 6ieme/
│   ├── pages/            # Pages de l'application
│   │   ├── page_de_cours.html
│   │   └── mathematiques/
│   └── config/           # Configuration
├── scripts/              # Scripts de build/deploy
│   ├── build.js
│   ├── deploy.js
│   └── test.js
├── firebase.json         # Configuration Firebase
└── package.json          # Configuration npm
```

## 🔧 Architecture V2

### Composants Principaux

#### ModuleLoader.js
- Chargement intelligent des modules de cours
- Validation et normalisation des données
- Cache pour optimiser les performances

#### CourseRenderer.js
- Rendu adaptatif selon le format des données
- Support des phases pédagogiques (4 phases)
- Gestion des compétences

#### NavigationManager.js
- Gestion de la navigation entre cours
- Génération d'URLs
- Fil d'Ariane automatique

### Formats de Données Supportés

#### Format 4 Phases (Recommandé)
```javascript
export default {
    title: "Les Fractions",
    description: "Découverte des fractions",
    phases: {
        introduction: { ... },
        exploration: { ... },
        structuration: { ... },
        reinvestissement: { ... }
    }
}
```

#### Format Legacy Compétences
```javascript
export default {
    title: "Les Fractions",
    competences: [
        { nom: "Comprendre", description: "..." }
    ]
}
```

## 🌐 Déploiement

L'application est déployée sur Firebase Hosting :
- **Production** : https://funrevis.web.app/

### Processus de Déploiement

1. **Tests automatiques** : Validation de la structure et des modules
2. **Build** : Optimisation des assets et génération du build
3. **Déploiement Firebase** : Mise en ligne sur l'hosting
4. **Tests post-déploiement** : Vérification de l'accessibilité

## 📊 Tests et Validation

### Types de Tests

- **Tests de Structure** : Vérification des fichiers et dossiers
- **Tests de Modules** : Validation de la syntaxe ES6
- **Tests de Données** : Contrôle des formats de cours
- **Tests de Pages** : Validation HTML et intégration

### Commandes de Test

```bash
# Tests complets
npm run test

# Validation pour déploiement
npm run validate

# Tests en mode développement
npm run dev-test
```

## 🎯 Fonctionnalités V2

### ✅ Implémenté
- Architecture modulaire ES6
- Support multi-formats de données
- Interface responsive
- Navigation intelligente
- Système de cache
- Tests automatisés
- Déploiement automatisé

### 🔄 En Cours
- Service Worker pour mode offline
- Analytics et tracking
- Système de feedback utilisateur

### 📋 Prévu
- Mode sombre
- Recherche globale
- Favoris et progression
- Mode collaboratif

## 🛠️ Développement

### Ajouter un Nouveau Cours

1. Créer le fichier de données dans `src/data/[matiere]/[niveau]/`
2. Suivre le format 4 phases ou legacy
3. Ajouter l'entrée dans la configuration des cours
4. Tester avec `npm run test`

### Ajouter une Nouvelle Matière

1. Créer la structure dans `src/data/[nouvelle-matiere]/`
2. Créer l'index dans `src/pages/[nouvelle-matiere]/`
3. Mettre à jour la page d'accueil
4. Configurer la navigation

## 🚀 Performance

### Optimisations V2
- Modules ES6 natifs (pas de bundler lourd)
- Chargement à la demande des données
- Cache intelligent des modules
- Images optimisées
- CSS minimal et efficace

### Métriques Cibles
- **Temps de chargement** : < 2s
- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 3s
- **Accessibilité** : Score A

## 🔒 Sécurité

- Validation côté client des données
- Sanitisation des contenus
- Headers de sécurité configurés
- Pas de données sensibles exposées

## 📞 Support

Pour toute question ou problème :
- Consulter les logs de test
- Vérifier la structure des données
- Utiliser les outils de validation intégrés

---

**Version** : 2.0.0  
**Dernière mise à jour** : Août 2025  
**Environnement** : Production sur Firebase Hosting
