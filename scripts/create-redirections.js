#!/usr/bin/env node

/**
 * Script de génération de redirections pour l'architecture simplifiée
 * Crée des pages de redirection vers page_de_cours.html pour maintenir
 * la compatibilité des URLs existantes
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const redirections = [
  { topic: 'addition-soustraction', title: 'Addition et soustraction' },
  { topic: 'multiplication', title: 'Multiplication' },
  { topic: 'division', title: 'Division' },
  { topic: 'figures-planes', title: 'Figures planes' },
  { topic: 'perimetre', title: 'Périmètre' },
  { topic: 'fractions', title: 'Fractions' },
  { topic: 'proportionnalite', title: 'Proportionnalité' },
  { topic: 'aires-figures', title: 'Aires des figures' },
  { topic: 'unites-longueur', title: 'Unités de longueur' },
  { topic: 'algebre', title: 'Algèbre' },
  { topic: 'moyenne', title: 'Moyennes' },
  { topic: 'nombres-entiers', title: 'Nombres entiers naturels' },
  { topic: 'nombres-decimaux', title: 'Nombres décimaux' },
  { topic: 'fractions-simples', title: 'Les fractions simples' },
  { topic: 'symetrie-axiale', title: 'Symétrie axiale' },
  { topic: 'constructions-geometriques', title: 'Constructions géométriques' },
  { topic: 'unites-masse-capacite', title: 'Les unités de masse et capacité' },
  { topic: 'durees', title: 'Les durées' },
  { topic: 'lecture-tableaux', title: 'Lecture de tableaux' },
  { topic: 'graphiques', title: 'Graphiques' }
];

const basePath = 'src/pages/mathematiques/6ieme';

redirections.forEach(({ topic, title }) => {
  const dirPath = join(basePath, topic);
  const filePath = join(dirPath, 'index.html');
  
  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 6ème</title>
    <script>
        // Redirection vers la page générique avec le bon fichier de données
        window.location.href = '../../page_de_cours.html?matiere=mathematiques&niveau=6ieme&competence=${topic}';
    </script>
    <noscript>
        <meta http-equiv="refresh" content="0; url=../../page_de_cours.html?matiere=mathematiques&niveau=6ieme&competence=${topic}">
    </noscript>
</head>
<body>
    <p>Redirection en cours vers le cours de ${title.toLowerCase()}...</p>
</body>
</html>`;

  try {
    mkdirSync(dirPath, { recursive: true });
    writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`✅ Redirection créée: ${topic}`);
  } catch (error) {
    console.error(`❌ Erreur pour ${topic}:`, error.message);
  }
});

console.log('\n🎉 Toutes les redirections ont été créées !');
console.log('📋 Architecture simplifiée:');
console.log('   - Dossiers vides supprimés');
console.log('   - Pages complexes remplacées par des redirections');
console.log('   - Source de vérité: fichiers .js dans /data');
console.log('   - Rendu: page_de_cours.html universelle');
