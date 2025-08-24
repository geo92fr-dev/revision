// Constructions géométriques - 6ème
export const constructionsGeometriques6eme = {
  titre: "Constructions géométriques",
  niveau: "6ème",
  description: "Apprendre à utiliser les instruments de géométrie pour construire des figures",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur les instruments de géométrie",
    exercices: [
      {
        type: "qcm",
        question: "Quel instrument utilise-t-on pour tracer une droite ?",
        options: [
          "Le compas",
          "La règle graduée",
          "L'équerre",
          "Le rapporteur"
        ],
        correct: 1,
        explication: "La règle graduée permet de tracer des droites et de mesurer des longueurs"
      },
      {
        type: "reconnaissance",
        question: "Quels instruments reconnais-tu ? Donne leur nom et leur utilité",
        elements: ["règle", "compas", "équerre", "rapporteur"],
        aide: "Chaque instrument a une fonction spécifique en géométrie"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les instruments de géométrie et leurs utilisations",
    cours: {
      instruments: {
        "Règle graduée": {
          utilisation: "Tracer des droites, mesurer des longueurs",
          conseils: "Bien placer la règle, tracer d'un trait continu"
        },
        "Compas": {
          utilisation: "Tracer des cercles, reporter des longueurs",
          conseils: "Bien tenir la tête, ne pas faire glisser les branches"
        },
        "Équerre": {
          utilisation: "Tracer des perpendiculaires, vérifier les angles droits",
          conseils: "Bien aligner avec la droite de référence"
        },
        "Rapporteur": {
          utilisation: "Mesurer et tracer des angles",
          conseils: "Centrer sur le sommet, lire la bonne graduation"
        }
      },
      constructions_de_base: [
        "Tracer une droite passant par deux points",
        "Tracer la perpendiculaire à une droite passant par un point",
        "Tracer la parallèle à une droite passant par un point",
        "Construire un cercle de centre et rayon donnés",
        "Reporter une longueur avec le compas"
      ],
      precision: "En géométrie, la précision est importante : traits fins, points marqués clairement, constructions soignées"
    },
    exercices: [
      {
        type: "construction",
        question: "Trace un cercle de centre O et de rayon 3 cm",
        aide: "Écarte le compas de 3 cm, pique en O, trace le cercle"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer les constructions géométriques avec les instruments",
    exercices: [
      {
        type: "construction",
        question: "Construis un triangle ABC avec AB = 5 cm, BC = 4 cm et AC = 6 cm",
        etapes: [
          "Trace le segment [AB] de 5 cm",
          "Du point A, trace un arc de cercle de rayon 6 cm",
          "Du point B, trace un arc de cercle de rayon 4 cm", 
          "Les arcs se coupent en C",
          "Trace les segments [AC] et [BC]"
        ]
      },
      {
        type: "construction",
        question: "Trace la perpendiculaire à une droite (d) passant par un point M sur cette droite",
        aide: "Utilise l'équerre : place un côté sur la droite (d) et trace l'autre côté passant par M"
      },
      {
        type: "construction",
        question: "Construis un carré ABCD de côté 4 cm",
        etapes: [
          "Trace le segment [AB] de 4 cm",
          "En A, trace la perpendiculaire à (AB)",
          "Sur cette perpendiculaire, place D à 4 cm de A",
          "En B, trace la perpendiculaire à (AB)",
          "Sur cette perpendiculaire, place C à 4 cm de B",
          "Vérifie que ABCD est bien un carré"
        ]
      },
      {
        type: "mesure",
        question: "Mesure les angles du triangle que tu as construit précédemment",
        aide: "Utilise le rapporteur en centrant bien sur chaque sommet"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages",
    objectif: "Développer une réflexion métacognitive sur les constructions géométriques",
    questions: [
      "Quel instrument choisis-tu selon le type de construction à réaliser ?",
      "Comment t'assures-tu de la précision de tes constructions ?",
      "Quelles difficultés rencontres-tu le plus souvent et comment les résous-tu ?",
      "Pourquoi est-il important de soigner ses constructions géométriques ?",
      "Comment expliques-tu à un camarade l'utilisation d'un compas ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais utiliser la règle pour tracer et mesurer",
          "Je sais utiliser le compas pour tracer des cercles",
          "Je sais utiliser l'équerre pour tracer des perpendiculaires",
          "Je sais construire des triangles à partir de leurs côtés",
          "Je sais construire des figures simples (carré, rectangle)",
          "Mes constructions sont précises et soignées"
        ]
      }
    ]
  }
};

// Export par défaut
export default constructionsGeometriques6eme;
