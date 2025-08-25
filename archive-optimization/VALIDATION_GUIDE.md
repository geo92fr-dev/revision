# Guide de Validation des Fichiers de Données .js

## Structure Attendue pour les Fichiers de Données

### 1. Structure Générale du Module

Chaque fichier de données doit respecter cette structure :

```javascript
// Commentaire descriptif du fichier
export const [nomVariable] = {
  niveau: "6ème",
  chapitre: "Nom du chapitre",
  sousChapitre: "Nom du sous-chapitre",
  competences: [
    {
      // Structure de compétence (voir ci-dessous)
    }
  ]
};

export default [nomVariable];
```

### 2. Points de Contrôle Obligatoires

#### ✅ **Export et Nommage**
- [ ] Le fichier doit avoir un `export const` avec un nom descriptif
- [ ] Le fichier doit avoir un `export default` 
- [ ] Le nom de la variable suit la convention : `[sujet][niveau]` (ex: `multiplication6eme`)
- [ ] Le nom du fichier correspond au sujet (ex: `multiplication.js`)

#### ✅ **Métadonnées de Base**
- [ ] `niveau` : String indiquant le niveau scolaire (ex: "6ème")
- [ ] `chapitre` : String du chapitre principal
- [ ] `sousChapitre` : String du sous-chapitre spécifique
- [ ] `competences` : Array contenant au moins une compétence

#### ✅ **Structure des Compétences**
Chaque compétence doit contenir :
- [ ] `id` : Identifiant unique (format: "6NC-[INITIALES]-[NUMERO]")
- [ ] `titre` : Titre descriptif de la compétence
- [ ] `objectif` ou `description` : Description de l'objectif d'apprentissage

#### ✅ **Contenu Pédagogique Obligatoire**
- [ ] `cours` : Contenu théorique (string ou objet structuré)
- [ ] `exercices` : Array d'exercices avec structure complète
- [ ] `preEvaluation` : Array de questions d'évaluation rapide

#### ✅ **Structure des Exercices**
Chaque exercice doit avoir :
- [ ] `type` : "débutant", "intermédiaire", ou "avancé"
- [ ] `question` : String de la question
- [ ] `reponse` : String de la réponse attendue
- [ ] `points` : Number de points attribués

#### ✅ **Structure de Métacognition (CRITIQUE)**
La métacognition est obligatoire pour la Phase 4 :
- [ ] `metacognition.questions` : Array de 4 questions minimum
- [ ] Chaque question doit avoir :
  - [ ] `type` : String identifiant unique
  - [ ] `question` : String de la question
  - [ ] `options` : Array de 4 options de réponse

### 3. Structure de Métacognition Détaillée

```javascript
metacognition: {
  questions: [
    {
      type: "objectif",
      question: "Penses-tu avoir atteint l'objectif : '[objectif]' ?",
      options: ["🎉 Complètement", "👍 En grande partie", "🤔 Partiellement", "😔 Pas vraiment"]
    },
    {
      type: "facilite",
      question: "Qu'est-ce qui t'a semblé le plus facile ?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    {
      type: "difficulte",
      question: "Quelle a été la plus grande difficulté pour toi ?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    {
      type: "strategie",
      question: "Quelle stratégie utilises-tu pour [action spécifique] ?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    }
  ]
}
```

### 4. Exemple de Structure Complète

```javascript
// Données spécifiques à [sujet] pour la classe de [niveau]
export const [sujet][niveau] = {
  niveau: "6ème",
  chapitre: "Nombres & Calculs",
  sousChapitre: "[Nom du sujet]",
  competences: [
    {
      id: "6NC-[INIT]-1",
      titre: "Titre de la compétence",
      objectif: "Description de l'objectif",
      
      cours: "Contenu théorique...",
      
      exercices: [
        {
          type: "débutant",
          question: "Question simple",
          reponse: "Réponse",
          points: 10
        }
      ],
      
      preEvaluation: [
        { question: "Question rapide", reponse: "Réponse" }
      ],
      
      metacognition: {
        questions: [
          // 4 questions structurées (voir structure ci-dessus)
        ]
      },
      
      description: "Description courte",
      ressources: [
        { type: "vidéo", titre: "Titre", url: "URL" }
      ],
      quizId: "QUIZ_ID_UNIQUE"
    }
  ]
};

export default [sujet][niveau];
```

### 5. Points de Contrôle pour l'Import/Export

#### ✅ **Test d'Import**
```javascript
// Le module doit s'importer sans erreur
import('./[fichier].js').then(m => {
  console.log('Keys:', Object.keys(m)); // Doit contenir ['default', '[nomVariable]']
}).catch(e => console.error('Erreur:', e.message));
```

#### ✅ **Validation des Exports**
- [ ] `Object.keys(module)` contient exactement 2 clés : `'default'` et `'[nomVariable]'`
- [ ] `module.default` est identique à `module.[nomVariable]`
- [ ] Les deux exports pointent vers le même objet

### 6. Erreurs Communes à Éviter

❌ **Erreur de Structure de Métacognition**
```javascript
// INCORRECT - Questions en string simple
metacognition: {
  questions: [
    "Question 1?",
    "Question 2?"
  ]
}

// CORRECT - Questions structurées
metacognition: {
  questions: [
    {
      type: "objectif",
      question: "Question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    }
  ]
}
```

❌ **Erreur d'Export**
```javascript
// INCORRECT - Manque export const
export default data;

// CORRECT - Double export
export const multiplication6eme = data;
export default multiplication6eme;
```

### 7. Checklist de Validation Finale

Avant de déployer un fichier :

1. **Import Test** : `node --input-type=module --eval "import('./[fichier].js').then(m => console.log('✅ OK:', Object.keys(m))).catch(e => console.error('❌ Erreur:', e.message))"`

2. **Structure Test** : Vérifier que `data.competences[0].metacognition.questions[0].options` existe

3. **Métacognition Test** : Vérifier que chaque question a `type`, `question`, et `options`

4. **Deploy Test** : Tester l'URL complète après déploiement

### 8. Commandes de Validation Rapide

```bash
# Test d'import
cd src/data/mathematiques/6ieme
node --input-type=module --eval "import('./[fichier].js').then(m => { const data = m.default; console.log('✅ Import:', !!data); console.log('🧠 Métacognition:', data?.competences?.[0]?.metacognition?.questions?.length, 'questions'); console.log('📝 Structure OK:', data?.competences?.[0]?.metacognition?.questions?.[0]?.options?.length === 4); }).catch(e => console.error('❌', e.message))"

# Déploiement
firebase deploy --only hosting

# Test final
# Ouvrir: https://funrevis.web.app/pages/page_de_cours.html?subject=mathematiques&level=6ieme&topic=[sujet]
```

---

## Templates de Référence

- **Fichier fonctionnel** : `multiplication.js`
- **Structure minimale** : `addition-soustraction.js`

En cas de doute, toujours se référer à un fichier qui fonctionne comme `multiplication.js` et reproduire sa structure exacte.
