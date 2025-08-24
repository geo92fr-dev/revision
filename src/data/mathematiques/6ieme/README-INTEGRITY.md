# Tests d'Intégrité et de Conformité - Mathématiques 6ème

Ce dossier contient un ensemble complet d'outils pour vérifier que tous les fichiers de données mathématiques respectent la structure définie dans `reference.js`.

## 📁 Structure des fichiers

```
src/data/mathematiques/6ieme/
├── reference.js                 # Fichier de référence définissant la structure
├── __tests__/
│   ├── integrity.test.js        # Tests d'intégrité structurelle
│   └── conformity.test.js       # Tests de conformité avancée
├── validate-integrity.js        # Script de validation standalone
├── analyze-conformity.js        # Script d'analyse comparative
└── README-INTEGRITY.md         # Cette documentation
```

## 🔍 Outils disponibles

### 1. Tests d'intégrité (integrity.test.js)
Tests automatisés qui vérifient :
- Structure principale des sujets (niveau, chapitre, sous-chapitre, compétences)
- Format des IDs de compétences et quiz
- Structure hybride (première compétence détaillée, suivantes simples)
- Validité des étapes, exercices et ressources
- Cohérence du contenu pédagogique

**Commande :** `npm run test:integrity`

### 2. Tests de conformité avancée (conformity.test.js)
Tests plus poussés qui vérifient :
- Conformité stricte avec le modèle reference.js
- Qualité du contenu pédagogique
- Cohérence inter-sujets
- Unicité des IDs
- Tests de régression

**Commande :** `npm run test:conformity`

### 3. Script de validation standalone (validate-integrity.js)
Script exécutable qui fournit :
- Validation en temps réel avec couleurs
- Messages d'erreur détaillés
- Statistiques de conformité
- Rapport de validation complet

**Commande :** `npm run validate:structure`

### 4. Analyseur de conformité (analyze-conformity.js)
Outil d'analyse avancée qui génère :
- Scores de conformité détaillés
- Métriques de qualité du contenu
- Analyse de la richesse pédagogique
- Recommandations d'amélioration

**Commande :** `npm run analyze:conformity`

## 📋 Structure de référence

### Modèle hybride
Tous les sujets doivent suivre le **modèle hybride** défini dans `reference.js` :

1. **Première compétence (détaillée)** :
   - `objectif` : Description de l'objectif pédagogique
   - `cours` : Contenu théorique
   - `etapes` : Étapes d'apprentissage détaillées
   - `exercices` : Exercices interactifs progressifs
   - `exemple` : Exemple global
   - Champs de compatibilité : `description`, `ressources`, `quizId`

2. **Compétences suivantes (simples)** :
   - `description` : Description complète de la compétence
   - `exemple` : Exemple illustratif (optionnel)
   - `astuce` : Conseil pratique (optionnel)
   - `ressources` : Ressources externes
   - `quizId` : Identifiant unique du quiz

### Formats standardisés

#### IDs de compétences
```
Format : 6XX-YY-Z
- 6 = Niveau (6ème)
- XX = Code chapitre (NC, GE, GM, OR)
- YY = Code sujet (2-3 lettres)
- Z = Numéro séquentiel (1, 2, 3...)

Exemples :
- 6NC-FR-1 (Nombres & Calculs - Fractions - 1)
- 6GE-FP-2 (Géométrie - Figures Planes - 2)
```

#### Quiz IDs
```
Format : QUIZ_6_DESCRIPTION_COURTE

Exemples :
- QUIZ_6_ADDITION
- QUIZ_6_FR_BASE
- QUIZ_6_TRIANGLES
```

#### Codes chapitres
- `NC` = Nombres & Calculs
- `GE` = Géométrie
- `GM` = Grandeurs & Mesures
- `OR` = Organisation & Gestion de données

## 🎯 Critères de validation

### Structure principale (25 points)
- [x] Niveau = "6ème"
- [x] Chapitre valide
- [x] Sous-chapitre présent
- [x] Compétences non vides

### Compétences (35 points)
- [x] Première compétence détaillée (20 points)
- [x] Compétences suivantes simples (15 points)

### Format des IDs (20 points)
- [x] IDs compétences conformes (10 points)
- [x] Quiz IDs conformes (10 points)

### Ressources (20 points)
- [x] Structure valide des ressources
- [x] URLs fonctionnelles
- [x] Types de ressources valides

## 📊 Scores de qualité

### Conformité structurelle (40%)
Respect de la structure définie dans reference.js

### Qualité du contenu (30%)
- Richesse des descriptions
- Qualité des étapes et exercices
- Cohérence pédagogique

### Richesse pédagogique (20%)
- Éléments enrichis (astuce, utilité, etc.)
- Variété des ressources
- Interactivité des exercices

### Modèle hybride (10%)
- Conformité au modèle hybride
- Séparation correcte détaillé/simple

## 🚀 Utilisation rapide

### Validation complète
```bash
# Tests complets
npm test

# Tests d'intégrité uniquement
npm run test:integrity

# Tests de conformité uniquement
npm run test:conformity
```

### Validation en ligne de commande
```bash
# Validation rapide
npm run validate:structure

# Analyse détaillée
npm run analyze:conformity
```

### Développement
Pour ajouter un nouveau sujet :

1. Créer le fichier `.js` en suivant la structure de `reference.js`
2. Ajouter l'import dans `__tests__/integrity.test.js`
3. Ajouter l'import dans `__tests__/conformity.test.js`
4. Exécuter `npm run validate:structure` pour vérification

## 🔧 Dépannage

### Erreurs fréquentes

#### "ID compétence incorrect"
```javascript
// ❌ Incorrect
id: "6NC-1-FR"

// ✅ Correct
id: "6NC-FR-1"
```

#### "Champ manquant pour compétence détaillée"
```javascript
// ❌ Première compétence incomplète
{
  id: "6NC-FR-1",
  titre: "Fractions",
  description: "..." // Manque objectif, cours, etapes, exercices
}

// ✅ Première compétence complète
{
  id: "6NC-FR-1",
  titre: "Fractions",
  objectif: "Savoir lire et écrire des fractions",
  cours: "Une fraction représente...",
  etapes: [...],
  exercices: [...],
  // + champs de compatibilité
}
```

#### "Format de Quiz ID incorrect"
```javascript
// ❌ Incorrect
quizId: "quiz_fractions"

// ✅ Correct
quizId: "QUIZ_6_FRACTIONS"
```

## 📈 Métriques de qualité

Les outils fournissent des métriques détaillées :

- **Score global** : Combinaison pondérée de tous les critères
- **Conformité structurelle** : Respect de la structure reference.js
- **Qualité pédagogique** : Richesse et cohérence du contenu
- **Recommandations** : Suggestions d'amélioration automatiques

### Seuils de qualité
- 🟢 **≥ 80/100** : Excellent, conforme
- 🟡 **60-79/100** : Correct, améliorations possibles  
- 🔴 **< 60/100** : Problèmes à corriger

## 🎯 Objectifs

Ces outils garantissent :
1. **Cohérence** : Tous les sujets suivent la même structure
2. **Qualité** : Contenu pédagogique riche et pertinent
3. **Maintenabilité** : Facilité de maintenance et d'évolution
4. **Fiabilité** : Détection automatique des régressions

---

*Dernière mise à jour : Août 2025*
