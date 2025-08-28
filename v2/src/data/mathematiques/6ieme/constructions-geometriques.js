// Constructions geometriques - 6eme
const constructionsgeometriques6eme = {
  titre: "Constructions geometriques",
  niveau: "6eme",
  description: "Apprendre a utiliser les instruments de geometrie pour construire des figures",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur les instruments de geometrie",
    exercices: [
      {
        type: "qcm",
        question: "Quel instrument utilise-t-on pour tracer une droite ?",
        options: [
          "Le compas",
          "La regle graduee",
          "L'equerre",
          "Le rapporteur"
        ],
        correct: 1,
        explication: "La regle graduee permet de tracer des droites et de mesurer des longueurs"
      },
      {
        type: "reconnaissance",
        question: "Quels instruments reconnais-tu ? Donne leur nom et leur utilite",
        elements: ["regle", "compas", "equerre", "rapporteur"],
        aide: "Chaque instrument a une fonction specifique en geometrie"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir les instruments de geometrie et leurs utilisations",
    cours: {
      instruments: {
        "Regle graduee": {
          utilisation: "Tracer des droites, mesurer des longueurs",
          conseils: "Bien placer la regle, tracer d'un trait continu"
        },
        "Compas": {
          utilisation: "Tracer des cercles, reporter des longueurs",
          conseils: "Bien tenir la tete, ne pas faire glisser les branches"
        },
        "Equerre": {
          utilisation: "Tracer des perpendiculaires, verifier les angles droits",
          conseils: "Bien aligner avec la droite de reference"
        },
        "Rapporteur": {
          utilisation: "Mesurer et tracer des angles",
          conseils: "Centrer sur le sommet, lire la bonne graduation"
        }
      },
      constructions_de_base: [
        "Tracer une droite passant par deux points",
        "Tracer la perpendiculaire a une droite passant par un point",
        "Tracer la parallele a une droite passant par un point",
        "Construire un cercle de centre et rayon donnes",
        "Reporter une longueur avec le compas"
      ],
      precision: "En geometrie, la precision est importante : traits fins, points marques clairement, constructions soignees"
    },
    exercices: [
      {
        type: "construction",
        question: "Trace un cercle de centre O et de rayon 3 cm",
        aide: "Ecarte le compas de 3 cm, pique en O, trace le cercle"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer les constructions geometriques avec les instruments",
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
        question: "Trace la perpendiculaire a une droite (d) passant par un point M sur cette droite",
        aide: "Utilise l'equerre : place un cote sur la droite (d) et trace l'autre cote passant par M"
      },
      {
        type: "construction",
        question: "Construis un carre ABCD de cote 4 cm",
        etapes: [
          "Trace le segment [AB] de 4 cm",
          "En A, trace la perpendiculaire a (AB)",
          "Sur cette perpendiculaire, place D a 4 cm de A",
          "En B, trace la perpendiculaire a (AB)",
          "Sur cette perpendiculaire, place C a 4 cm de B",
          "Verifie que ABCD est bien un carre"
        ]
      },
      {
        type: "mesure",
        question: "Mesure les angles du triangle que tu as construit precedemment",
        aide: "Utilise le rapporteur en centrant bien sur chaque sommet"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages",
    objectif: "Developper une reflexion metacognitive sur les constructions geometriques",
    questions: [
      "Quel instrument choisis-tu selon le type de construction a realiser ?",
      "Comment t'assures-tu de la precision de tes constructions ?",
      "Quelles difficultes rencontres-tu le plus souvent et comment les resous-tu ?",
      "Pourquoi est-il important de soigner ses constructions geometriques ?",
      "Comment expliques-tu a un camarade l'utilisation d'un compas ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je sais utiliser la regle pour tracer et mesurer",
          "Je sais utiliser le compas pour tracer des cercles",
          "Je sais utiliser l'equerre pour tracer des perpendiculaires",
          "Je sais construire des triangles a partir de leurs cotes",
          "Je sais construire des figures simples (carre, rectangle)",
          "Mes constructions sont precises et soignees"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = constructionsgeometriques6eme;
