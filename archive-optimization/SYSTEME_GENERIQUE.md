# 🎓 Système de Page de Cours Générique

## 📋 Vue d'ensemble

Ce projet utilise maintenant un **système de page de cours générique** qui permet de créer dynamiquement des pages de cours interactives à partir de fichiers de données JavaScript.

## 🏗️ Architecture

### 📄 Composants principaux

1. **`src/pages/page_de_cours.html`** - Template HTML générique
2. **`src/data/`** - Fichiers de données des cours (JS)
3. **`src/config/courses.js`** - Configuration centralisée
4. **Pages de redirection** - Fichiers HTML légers qui redirigent vers le système générique

### 🔄 Flux de fonctionnement

```
Page spécifique (ex: fractions.html)
        ↓ (redirection)
page_de_cours.html?course=../data/mathematiques/6ieme/fractions.js
        ↓ (chargement dynamique)
Contenu généré à partir des données JS
```

## 🚀 Cours disponibles

### ✅ Mathématiques 6ème
- **Fractions** : `fractions.js` ✅ Disponible
- **Algèbre** : `algebre.js` ✅ Disponible  
- **Géométrie** : `geometrie.js` 🚧 En développement

### 🔮 À venir
- Mathématiques 5ème (nombres relatifs, priorités)
- Français 6ème (grammaire)
- Histoire 6ème (antiquité)
- Sciences 6ème (corps humain)

## 📝 Créer un nouveau cours

### 1. Créer le fichier de données

Créez un fichier dans `src/data/[matiere]/[niveau]/[cours].js` :

```javascript
export const nouveauCours = {
  niveau: "6ème",
  chapitre: "Matière",
  sousChapitre: "Sous-chapitre",
  competences: [
    {
      id: "unique-id",
      titre: "Titre du cours",
      objectif: "Objectif pédagogique",
      cours: "Contenu du cours...",
      etapes: [
        {
          titre: "Étape 1",
          comment: "Explication...",
          exemple: "Exemple concret"
        }
      ],
      exercices: [...],
      preEvaluation: {...},
      metacognition: {...}
      // ... voir fractions.js pour la structure complète
    }
  ]
};

export default nouveauCours;
```

### 2. Ajouter à la configuration

Modifiez `src/config/courses.js` :

```javascript
export const coursesConfig = {
  mathematiques: {
    "6ieme": {
      nouveauCours: {
        title: "Titre du cours",
        dataPath: "../../data/mathematiques/6ieme/nouveauCours.js",
        icon: "🎯",
        description: "Description du cours"
      }
    }
  }
};
```

### 3. Créer la page de redirection

Créez `src/pages/mathematiques/6ieme/nouveauCours.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau Cours - 6ème</title>
    <script>
        window.location.href = '../page_de_cours.html?course=../../data/mathematiques/6ieme/nouveauCours.js';
    </script>
</head>
<body>
    <p>Redirection en cours...</p>
</body>
</html>
```

### 4. Mettre à jour la navigation

Ajoutez les liens dans les pages d'index appropriées.

## 🎨 Structure des données

### 📚 Compétence complète
```javascript
{
  id: "identifiant-unique",
  titre: "Titre de la compétence",
  objectif: "Ce que l'élève doit savoir faire",
  cours: "Explication théorique",
  etapes: [/* étapes d'apprentissage */],
  exercices: [/* exercices progressifs */],
  preEvaluation: {/* test initial */},
  metacognition: {/* réflexion sur l'apprentissage */},
  astuce: "Conseil pratique",
  pieges: [/* erreurs fréquentes */],
  defi: {/* défi chronométré */},
  utilite: "Pourquoi c'est important",
  funFact: "Anecdote intéressante"
}
```

### 🏋️ Types d'exercices supportés
- `rectangle` : Coloriage de parties
- `droite` : Placement sur droite graduée
- `calcul` : Calculs avec validation automatique

## 🔧 Fonctionnalités

### ✨ Avantages du système
- **Réutilisabilité** : Un template pour tous les cours
- **Maintenabilité** : Code centralisé
- **Consistance** : Interface uniforme
- **Extensibilité** : Ajout facile de nouveaux cours
- **Performance** : Chargement dynamique optimisé

### 🎯 Fonctionnalités pédagogiques
- Pré-évaluation adaptative
- Apprentissage par étapes
- Exercices interactifs
- Quiz de validation
- Défis chronométrés
- Métacognition guidée
- Défis pratiques personnalisés

## 🛠️ Développement

### Scripts utiles
```bash
# Générer les pages de redirection automatiquement
node src/config/generate-course-redirects.js
```

### CSS
Le système utilise le CSS modulaire centralisé dans `src/styles/index.css`.

### JavaScript
Le code JavaScript est organisé en modules ES6 avec import/export.

## 🚀 Déploiement

Le système est compatible avec Firebase Hosting et tout serveur web statique. Les modules ES6 sont supportés par tous les navigateurs modernes.

## 📱 Compatibilité

- ✅ Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Mobile et tablette (responsive design)
- ✅ Fonctionnement offline (après premier chargement)

---

🎉 **Le système est opérationnel et prêt pour l'expansion !**
