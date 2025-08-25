# Structure Modulaire des Données de Cours

## Organisation

La nouvelle architecture divise les données par **matière** et **niveau** pour une meilleure maintenabilité :

```
src/data/
├── index.js                    # Point d'entrée principal
└── mathematiques/
    ├── index.js               # Index de la matière
    └── sixieme.js             # Données spécifiques 6ème
```

## Utilisation

### Import traditionnel (compatibilité)
```javascript
import { coursData } from './coursData.js';
```

### Import modulaire (nouveau)
```javascript
import { coursDataBySubjectAndLevel } from './coursData.js';
import { mathematiques6eme } from './data/mathematiques/sixieme.js';
```

### Accès par matière et niveau
```javascript
// Accès direct aux mathématiques 6ème
const math6 = coursDataBySubjectAndLevel.mathématiques["6ème"];

// Accès spécifique à une compétence
const competences = math6[0].niveaux[0].competences;
```

## Avantages

✅ **Maintenabilité** : Chaque fichier gère un seul niveau/matière
✅ **Performance** : Import sélectif possible  
✅ **Évolutivité** : Ajout facile de nouveaux niveaux/matières
✅ **Compatibilité** : Aucun breaking change pour l'existant

## Prochaines étapes

1. **Ajout de nouveaux niveaux** : Créer `cinquieme.js`, `quatrieme.js`, etc.
2. **Nouvelles matières** : Créer dossiers `francais/`, `histoire/`, etc.
3. **Structure enrichie** : Intégrer la nouvelle structure avec IDs, astuces, ressources multiples

## Structure de données actuelle

Chaque compétence contient :
- `nom` : Titre de la compétence
- `chapitre` : Numéro de chapitre (ex: "1.1")
- `description` : Explication détaillée
- `exemple` : Exemples concrets
- `Video_YouTube` : ID de la vidéo YouTube
- `Site` : Lien vers ressource externe

## Migration vers la nouvelle structure

Pour implémenter votre structure enrichie avec IDs, astuces et ressources multiples :

1. Créer `src/data/mathematiques/fractionsV2.js` avec la nouvelle structure
2. Adapter les composants pour supporter les deux formats
3. Migrer progressivement les données existantes
