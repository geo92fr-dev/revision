# 🔍 Système de Monitoring FunRevis

Ce système de monitoring automatisé valide en continu la qualité et la disponibilité de tous les contenus pédagogiques.

## 🎯 Objectifs

- ✅ **Validation automatique** de tous les sujets (20 en mathématiques 6ème)
- ✅ **Détection précoce** des erreurs de structure ou de contenu
- ✅ **Monitoring continu** de la disponibilité des cours
- ✅ **Rapports détaillés** sur l'état du système
- ✅ **Intégration CI/CD** pour prévenir les régressions

## 🛠️ Composants

### 1. Système de Tests Automatisés (`subject-monitor.js`)
Classe JavaScript qui :
- Charge dynamiquement tous les modules de données
- Valide la structure et le contenu
- Mesure les performances de chargement
- Génère des rapports détaillés

### 2. Dashboard Web (`dashboard.html`)
Interface utilisateur pour :
- Lancer des tests en temps réel
- Visualiser les résultats avec graphiques
- Exporter des rapports
- Monitoring continu avec auto-refresh

### 3. Tests CLI (`automated-tester.js`)
Script Node.js pour :
- Validation hors-ligne des fichiers
- Intégration dans les workflows CI/CD
- Génération de rapports JSON
- Tests de non-régression

### 4. Workflow GitHub Actions (`monitoring.yml`)
Automatisation pour :
- Tests automatiques à chaque push
- Tests programmés quotidiens
- Création d'issues en cas d'échec
- Déploiement automatique

## 🚀 Utilisation

### Dashboard Web
```bash
npm run monitor:dashboard
```
Puis ouvrir : http://localhost:5173/src/monitoring/dashboard.html

### Tests en ligne de commande
```bash
# Test complet
npm run monitor

# Test avec surveillance continue
npm run monitor:watch
```

### Tests dans l'application
```javascript
// Import du système de monitoring
import { SubjectMonitor } from './monitoring/subject-monitor.js';

// Création d'une instance
const monitor = new SubjectMonitor();

// Lancement des tests
const results = await monitor.runCompleteTest();

// Génération du rapport HTML
const reportHtml = monitor.generateReport();
```

## 📊 Types de Validation

### 1. **Validation Structurelle**
- Présence des exports requis
- Format des données (compétences vs phases)
- Cohérence des propriétés obligatoires

### 2. **Validation de Contenu**
- Contenu non vide
- Structures minimales présentes
- Cohérence des références

### 3. **Tests de Performance**
- Temps de chargement des modules
- Détection des goulots d'étranglement
- Métriques de performance

### 4. **Tests d'Intégration**
- Chargement via l'application
- Rendu des interfaces
- Navigation entre les sujets

## 📈 Métriques Surveillées

| Métrique | Description | Seuil d'Alerte |
|----------|-------------|----------------|
| **Taux de Réussite** | % sujets sans erreur | < 95% |
| **Temps de Chargement** | Temps moyen d'import | > 500ms |
| **Erreurs Critiques** | Erreurs bloquantes | > 0 |
| **Couverture** | % sujets avec contenu | < 90% |

## 🔧 Configuration

### Ajout d'une Nouvelle Matière
1. Ajouter dans `subject-monitor.js` :
```javascript
this.subjects = {
    'mathematiques': { '6ieme': [...] },
    'francais': { '6ieme': [...] },  // Nouvelle matière
};
```

2. Créer la structure de dossiers :
```
src/data/francais/6ieme/
├── index.js
├── lecture.js
├── grammaire.js
└── ...
```

### Personnalisation des Tests
Modifier `validateContent()` dans `subject-monitor.js` pour ajouter des règles spécifiques.

## 🚨 Alertes et Notifications

### Types d'Alertes
- **🔴 Critique** : Sujet non chargeable (bloque l'utilisateur)
- **🟡 Warning** : Contenu incomplet (dégradation)
- **🔵 Info** : Amélioration possible (optimisation)

### Canaux de Notification
- **GitHub Issues** : Création automatique d'issues
- **Console Dashboard** : Alertes en temps réel
- **Rapports JSON** : Pour intégration externe
- **Logs CI/CD** : Dans les workflows

## 📋 Checklist Maintenance

### Quotidien
- [ ] Vérifier le dashboard de monitoring
- [ ] Consulter les alertes GitHub
- [ ] Valider les déploiements automatiques

### Hebdomadaire
- [ ] Analyser les tendances de performance
- [ ] Réviser les sujets avec warnings
- [ ] Mettre à jour la documentation

### Mensuel
- [ ] Audit complet du système
- [ ] Révision des seuils d'alerte
- [ ] Optimisation des performances

## 🔗 Liens Utiles

- **Dashboard Prod** : https://funrevis.web.app/src/monitoring/dashboard.html
- **GitHub Actions** : https://github.com/geo92fr-dev/revision/actions
- **Firebase Console** : https://console.firebase.google.com/project/funrevis

## 🆘 Dépannage

### Erreur "Module not found"
```bash
# Vérifier la structure des fichiers
npm run monitor

# Reconstruire l'index
node scripts/rebuild-index.js
```

### Tests qui échouent en CI/CD
```bash
# Tester localement
npm run monitor

# Vérifier les logs GitHub Actions
# Consulter les artifacts uploadés
```

### Dashboard ne charge pas
```bash
# Vérifier le serveur de développement
npm run dev

# Tester les imports
node -e "import('./src/monitoring/subject-monitor.js')"
```

---

💡 **Astuce** : Utilisez le dashboard web pour un monitoring interactif, et les scripts CLI pour l'automatisation et l'intégration continue.
