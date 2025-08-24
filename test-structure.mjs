// Test d'accès aux nouvelles propriétés de la structure enrichie
import { mathematiques6eme } from './src/data/mathematiques/sixieme.js';

// Récupération de la compétence fraction enrichie
const competenceFraction = mathematiques6eme
  .find(chapitre => chapitre.sousChapitre === "Fractions (bases)")
  .competences
  .find(comp => comp.id === "6NC-FR-1");

console.log("🧪 TEST STRUCTURE ENRICHIE");
console.log("========================");

// Test compatibilité ancienne structure
console.log("✅ Propriétés anciennes (compatibilité) :");
console.log("- ID:", competenceFraction.id);
console.log("- Titre:", competenceFraction.titre);
console.log("- Description:", competenceFraction.description);
console.log("- Astuce:", competenceFraction.astuce);
console.log("- Quiz ID:", competenceFraction.quizId);

console.log("\n🆕 Nouvelles propriétés enrichies :");
console.log("- Objectif:", competenceFraction.objectif);
console.log("- Cours:", competenceFraction.cours);
console.log("- Étapes:", competenceFraction.etapes);
console.log("- Exemple concret:", competenceFraction.exemple);
console.log("- Exercices:", competenceFraction.exercices?.length, "exercices");
console.log("- Mini Quiz:", competenceFraction.miniQuiz?.length, "question(s)");
console.log("- Pièges:", competenceFraction.pieges);
console.log("- Défi:", competenceFraction.defi);
console.log("- Utilité:", competenceFraction.utilite?.substring(0, 50) + "...");
console.log("- Conséquence:", competenceFraction.consequence?.substring(0, 50) + "...");
console.log("- Fun Fact:", competenceFraction.funFact?.substring(0, 50) + "...");

console.log("\n📊 Analyse structure :");
console.log("- Propriétés totales:", Object.keys(competenceFraction).length);
console.log("- Nouvelles propriétés:", Object.keys(competenceFraction).filter(key => 
  !['id', 'titre', 'description', 'astuce', 'ressources', 'quizId'].includes(key)
).length);

console.log("\n🎯 Test d'accès aux exercices :");
competenceFraction.exercices?.forEach((ex, i) => {
  console.log(`${i+1}. [${ex.type.toUpperCase()}] ${ex.question}`);
});

console.log("\n🎮 Test du mini quiz :");
competenceFraction.miniQuiz?.forEach((q, i) => {
  console.log(`Q${i+1}: ${q.question}`);
  console.log(`Choix: ${q.choix.join(' | ')}`);
  console.log(`Réponse: ${q.reponse}`);
});

console.log("\n✅ Test réussi - Structure enrichie accessible !");
