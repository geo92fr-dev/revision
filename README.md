# 🎓 FunRevis - Application Éducative

Application web éducative moderne pour réviser les mathématiques, français et anglais niveau collège avec une architecture modulaire et des ressources pédagogiques enrichies.

## 🚀 Déploiement

**Application en ligne :** https://funrevis.web.app

## 🏗️ Architecture Moderne

L'application utilise maintenant une **architecture modulaire JavaScript** (migration depuis Excel) :

```
src/data/
├── 📁 mathematiques/
│   ├── 📄 sixieme.js      # 18 compétences 6ème
│   ├── 📄 cinquieme.js    # 18 compétences 5ème  
│   ├── 📄 quatrieme.js    # 18 compétences 4ème
│   └── 📄 troisieme.js    # 18 compétences 3ème
├── 📁 francais/
│   ├── 📄 sixieme.js      # 18 compétences 6ème
│   ├── 📄 cinquieme.js    # 18 compétences 5ème
│   ├── 📄 quatrieme.js    # 18 compétences 4ème
│   └── 📄 troisieme.js    # 18 compétences 3ème
├── 📁 anglais/
│   ├── 📄 sixieme.js      # 18 compétences 6ème
│   └── 📄 cinquieme.js    # En cours...
└── 📄 legacyConverter.js  # Compatibilité tests
```

## 📋 Structure du Projet

```
Revision/
├── 📁 src/                          # Code source React
│   ├── 📄 App.jsx                   # Composant principal
│   ├── � data/                     # Données modulaires (NEW!)
│   │   ├── 📁 mathematiques/        # Programme complet collège
│   │   ├── � francais/             # Programme complet collège
│   │   ├── 📁 anglais/              # Programme partiel
│   │   └── 📄 legacyConverter.js    # Compatibilité
│   ├── 📁 components/               # Composants React
│   │   ├── 📄 HomePage.jsx          # Page d'accueil
│   │   ├── 📄 Revisions.jsx         # Sélection des compétences
│   │   ├── 📄 CoursComponent.jsx    # Affichage des cours
│   │   ├── 📄 Quiz.jsx              # Système de quiz
│   │   └── 📄 QuizDashboard.jsx     # Statistiques
│   └── 📁 test/                     # Suite de tests (74 tests)
│
├── 📁 public/                       # Fichiers publics
├── 📁 dist/                         # Build de production
├──  package.json                  # Dependencies npm
├── 📄 firebase.json                 # Config Firebase Hosting
└── 📄 vite.config.js                # Configuration Vite
```

## 🛠️ Technologies

- **Frontend :** React 18 + Vite
- **Styling :** CSS3 avec animations
- **Déploiement :** Firebase Hosting
- **Données :** Architecture modulaire JavaScript (ex-Excel)
- **Vidéos :** YouTube iframe intégré
- **Tests :** Vitest (74 tests - 100% succès)

## ⚡ Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement

# Build & Déploiement  
npm run build        # Build de production
npm run preview      # Prévisualiser le build
firebase deploy      # Déployer sur Firebase
```

## 📚 Fonctionnalités

### 🎥 **Cours Vidéo**
- Vidéos YouTube éducatives intégrées
- Interface responsive (mobile + desktop)
- Sites de cours complémentaires

### 📊 **Système de Quiz**
- Questions interactives
- Suivi des scores
- Tableau de bord des résultats

### 🗂️ **Matières Disponibles**
- **Nombres & calculs** : Entiers, décimaux, fractions
- **Géométrie** : Figures, symétrie
- **Grandeurs & mesures** : Unités, conversions
- **Organisation des données** : Tableaux, graphiques

## 📱 Interface

### 🏠 **Page d'Accueil**
Navigation principale vers :
- Révisions (cours + quiz)
- Tableau de bord personnel

### 🎯 **Section Révisions**
1. Sélection matière (ex: Mathématiques)
2. Choix du niveau (6ème, 5ème, 4ème, 3ème)
3. Liste des compétences disponibles
4. Actions : "Voir le cours" | "Faire le quiz"

### 🎬 **Cours Vidéo**
- Vidéo YouTube en grand format
- Lien vers cours complémentaire
- Navigation vers quiz associé

## 🗃️ Structure des Données

### coursData.js
```javascript
const coursData = [
  {
    "nom": "Nombres & calculs",
    "niveaux": [
      {
        "nom": "6ème", 
        "competences": [
          {
            "nom": "Comprendre les nombres décimaux",
            "description": "Exemple : 125 ÷ 5 = 25",
            "Video_YouTube": "Ryy9nmQxeY0",
            "Site": "https://fr.khanacademy.org/..."
          }
        ]
      }
    ]
  }
]
```

## 🎨 Design

- **Theme :** Gradients colorés (bleu/violet)
- **Responsive :** Adapté mobile/tablette/desktop
- **Animations :** Transitions fluides
- **Accessibilité :** Contrastes optimisés

## 🔧 Développement

### Installation
```bash
npm install
```

### Développement Local
```bash
npm run dev
# ➜ http://localhost:5173
```

### Build Production
```bash
npm run build
firebase deploy
```

## 📈 Évolutions Futures

- [ ] Ajout d'autres matières (Français, Anglais, Sciences)
- [ ] Système d'authentification utilisateur
- [ ] Progression personnalisée
- [ ] Mode hors ligne
- [ ] API backend pour données dynamiques

## 🤝 Contribution

Pour ajouter du contenu :
1. Modifier `src/coursData.js` pour les cours
2. Modifier `src/quizData.js` pour les quiz
3. Tester localement avec `npm run dev`
4. Déployer avec `firebase deploy`

---

**Développé avec ❤️ pour l'éducation**
