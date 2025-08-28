// Les durees - 6eme
const durees6eme = {
  titre: "Les durees",
  niveau: "6eme",
  description: "Comprendre et calculer avec les unites de duree",
  
  phase1: {
    titre: "🧠 Que sais-je deja ?",
    objectif: "Activer les connaissances prealables sur les durees",
    exercices: [
      {
        type: "qcm",
        question: "Combien y a-t-il de minutes dans une heure ?",
        options: [
          "100 minutes",
          "60 minutes",
          "24 minutes", 
          "30 minutes"
        ],
        correct: 1,
        explication: "Une heure contient 60 minutes"
      },
      {
        type: "lecture_heure",
        question: "Quelle heure indique cette horloge ? [horloge montrant 14h30]",
        reponse: "14h30 ou 2h30 de l'apres-midi",
        aide: "Regarde d'abord la petite aiguille (heures) puis la grande (minutes)"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Decouvrir les unites de duree et leurs conversions",
    cours: {
      unites: {
        "seconde (s)": "Unite de base",
        "minute (min)": "1 min = 60 s",
        "heure (h)": "1 h = 60 min = 3600 s",
        "jour (j)": "1 j = 24 h",
        "semaine": "1 semaine = 7 j",
        "mois": "1 mois ≈ 30 j (variable)",
        "annee": "1 an = 365 j (366 pour bissextile)"
      },
      conversions: {
        "Particularite": "Les conversions ne se font pas par 10 comme pour les autres unites",
        "Regles": [
          "× 60 pour passer de min a s",
          "× 60 pour passer de h a min", 
          "× 24 pour passer de j a h",
          "÷ 60, ÷ 60, ÷ 24 pour les conversions inverses"
        ]
      },
      calculs: {
        "Addition": "Additionner separement heures, minutes, secondes puis convertir si necessaire",
        "Soustraction": "Soustraire separement, emprunter si necessaire",
        "Exemple": "2h45min + 1h20min = 3h65min = 4h05min"
      },
      formats: {
        "Format 12h": "avec AM/PM (matin/apres-midi)",
        "Format 24h": "de 00h00 a 23h59"
      }
    },
    exercices: [
      {
        type: "conversion",
        question: "Convertis 3h15min en minutes",
        reponse: "195 min",
        aide: "3h = 180 min, donc 180 + 15 = 195 min"
      }
    ]
  },
  
  phase3: {
    titre: "✏️ Je m'entraine",
    objectif: "Pratiquer les calculs et conversions avec les durees",
    exercices: [
      {
        type: "conversion",
        question: "Convertis 2h30min en secondes",
        reponse: "9000 s",
        aide: "2h30min = 150 min = 150 × 60 s = 9000 s"
      },
      {
        type: "conversion",
        question: "Convertis 450 secondes en minutes et secondes",
        reponse: "7 min 30 s",
        aide: "450 ÷ 60 = 7 min et 30 s de reste"
      },
      {
        type: "addition",
        question: "Calcule : 2h45min + 1h35min",
        reponse: "4h20min",
        aide: "2h + 1h = 3h et 45min + 35min = 80min = 1h20min, donc 3h + 1h20min = 4h20min"
      },
      {
        type: "soustraction", 
        question: "Calcule : 5h10min - 2h25min",
        reponse: "2h45min",
        aide: "5h10min = 4h70min, donc 4h70min - 2h25min = 2h45min"
      },
      {
        type: "probleme",
        question: "Un film commence a 20h15 et dure 1h45min. A quelle heure se termine-t-il ?",
        reponse: "22h00",
        aide: "20h15 + 1h45 = 21h60 = 22h00"
      },
      {
        type: "probleme",
        question: "Marie part de chez elle a 7h30 et arrive au college a 8h05. Combien de temps a dure son trajet ?",
        reponse: "35 min",
        aide: "8h05 - 7h30 = 35 min"
      },
      {
        type: "probleme",
        question: "Un train part a 14h25 et arrive a 16h10. Quelle est la duree du voyage ?",
        reponse: "1h45min",
        aide: "16h10 - 14h25 = 1h45min"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je reflechis sur mes apprentissages", 
    objectif: "Developper une reflexion metacognitive sur les calculs de durees",
    questions: [
      "Quelle methode utilises-tu pour additionner des durees ?",
      "Comment procedes-tu quand tu dois 'emprunter' des heures ou des minutes ?",
      "Dans quelles situations calcules-tu des durees au quotidien ?",
      "Pourquoi les conversions de durees sont-elles differentes des autres unites ?",
      "Comment verifies-tu que tes calculs de durees sont corrects ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je connais les relations entre les unites de duree",
          "Je sais convertir d'une unite de duree a l'autre",
          "Je sais additionner et soustraire des durees",
          "Je sais lire l'heure sur differents supports",
          "Je sais resoudre des problemes de durees",
          "Je sais utiliser les formats 12h et 24h"
        ]
      }
    ]
  }
};

// Assign to window for browser compatibility
window.data = durees6eme;
