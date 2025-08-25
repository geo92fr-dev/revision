# 📋 Guide de Validation des Fichiers .js - Résumé Exécutif

## 🎯 État Actuel du Projet

### ✅ Fichiers Valides (6/10)
- `addition-soustraction.js` - ✅ 100% conforme
- `algebre.js` - ✅ 100% conforme  
- `fractions.js` - ✅ 100% conforme
- `moyenne.js` - ✅ 100% conforme
- `multiplication.js` - ✅ 100% conforme
- `proportionnalite.js` - ✅ 100% conforme

### ❌ Fichiers à Corriger (4/10)
- `division.js` - Question 4: options invalides (3 options au lieu de 4)
- `figures-planes.js` - Section métacognition manquante
- `perimetre.js` - Section métacognition manquante  
- `index.js` - Fichier d'index (structure différente, OK)

## 🚀 Commandes de Validation

### Validation Rapide d'un Fichier
```bash
npm run validate:file [nom-du-fichier.js]
```

### Validation Complète
```bash
npm run validate
```

### Tests Automatisés
```bash
npm run test:run tests/data-structure.test.js
```

## 📋 Checklist de Validation Pré-Déploiement

### 1. Structure d'Export ✅
```javascript
export const [nomVariable]6eme = { /* données */ };
export default [nomVariable]6eme;
```

### 2. Métacognition Obligatoire ⚠️
```javascript
metacognition: {
  questions: [
    {
      type: "objectif",
      question: "Question...",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"] // EXACTEMENT 4 options
    },
    // Minimum 4 questions
  ]
}
```

### 3. Types de Questions Recommandés
- `objectif` - Évaluation de l'atteinte de l'objectif
- `facilite` - Ce qui a été facile
- `difficulte` - Les difficultés rencontrées  
- `strategie` - Stratégies utilisées

### 4. Validation de Déploiement
```bash
# 1. Valider la structure
npm run validate:file [fichier.js]

# 2. Tester l'import
node --input-type=module --eval "import('./src/data/mathematiques/6ieme/[fichier].js').then(m => console.log('✅ OK')).catch(e => console.error('❌', e.message))"

# 3. Déployer
firebase deploy --only hosting

# 4. Tester en ligne
# https://funrevis.web.app/pages/page_de_cours.html?subject=mathematiques&level=6ieme&topic=[sujet]
```

## 🔧 Corrections Urgentes Nécessaires

### `division.js` - Fix Question 4
```javascript
// PROBLÈME: Question 4 n'a que 3 options
// SOLUTION: Ajouter une 4ème option
{
  type: "strategie",
  question: "Comment vérifies-tu tes divisions ?",
  options: [
    "Option 1",
    "Option 2", 
    "Option 3",
    "Option 4 à ajouter" // MANQUANT
  ]
}
```

### `figures-planes.js` et `perimetre.js` - Ajouter Métacognition
```javascript
// AJOUTER dans la première compétence:
metacognition: {
  questions: [
    {
      type: "objectif",
      question: "Penses-tu avoir atteint l'objectif : '[titre de la compétence]' ?",
      options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
    },
    // + 3 autres questions...
  ]
}
```

## 📊 Métriques de Qualité

- **Taux de conformité**: 60% (6/10 fichiers)
- **Problèmes critiques**: 3 (métacognition manquante)
- **Problèmes mineurs**: 1 (options manquantes)
- **Fichiers prêts pour production**: 6

## 🏆 Template de Référence

**Utilisez `multiplication.js` comme référence** - structure parfaite et conforme à 100%.

## ⚡ Actions Prioritaires

1. **Corriger `division.js`** - Ajouter 4ème option (5 minutes)
2. **Ajouter métacognition à `figures-planes.js`** (15 minutes)  
3. **Ajouter métacognition à `perimetre.js`** (15 minutes)
4. **Valider et déployer** (5 minutes)

**Objectif**: 100% de conformité en moins de 45 minutes.

---

*Dernière mise à jour: $(date)*
*Validation automatique disponible via `npm run validate`*
