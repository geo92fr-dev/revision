// Les durées - 6ème
export const durees6eme = {
  titre: "Les durées",
  niveau: "6ème",
  description: "Comprendre et calculer avec les unités de durée",
  
  phase1: {
    titre: "🧠 Que sais-je déjà ?",
    objectif: "Activer les connaissances préalables sur les durées",
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
        reponse: "14h30 ou 2h30 de l'après-midi",
        aide: "Regarde d'abord la petite aiguille (heures) puis la grande (minutes)"
      }
    ]
  },
  
  phase2: {
    titre: "📚 J'apprends",
    objectif: "Découvrir les unités de durée et leurs conversions",
    cours: {
      unites: {
        "seconde (s)": "Unité de base",
        "minute (min)": "1 min = 60 s",
        "heure (h)": "1 h = 60 min = 3600 s",
        "jour (j)": "1 j = 24 h",
        "semaine": "1 semaine = 7 j",
        "mois": "1 mois ≈ 30 j (variable)",
        "année": "1 an = 365 j (366 pour bissextile)"
      },
      conversions: {
        "Particularité": "Les conversions ne se font pas par 10 comme pour les autres unités",
        "Règles": [
          "× 60 pour passer de min à s",
          "× 60 pour passer de h à min", 
          "× 24 pour passer de j à h",
          "÷ 60, ÷ 60, ÷ 24 pour les conversions inverses"
        ]
      },
      calculs: {
        "Addition": "Additionner séparément heures, minutes, secondes puis convertir si nécessaire",
        "Soustraction": "Soustraire séparément, emprunter si nécessaire",
        "Exemple": "2h45min + 1h20min = 3h65min = 4h05min"
      },
      formats: {
        "Format 12h": "avec AM/PM (matin/après-midi)",
        "Format 24h": "de 00h00 à 23h59"
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
    titre: "✏️ Je m'entraîne",
    objectif: "Pratiquer les calculs et conversions avec les durées",
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
        question: "Un film commence à 20h15 et dure 1h45min. À quelle heure se termine-t-il ?",
        reponse: "22h00",
        aide: "20h15 + 1h45 = 21h60 = 22h00"
      },
      {
        type: "probleme",
        question: "Marie part de chez elle à 7h30 et arrive au collège à 8h05. Combien de temps a duré son trajet ?",
        reponse: "35 min",
        aide: "8h05 - 7h30 = 35 min"
      },
      {
        type: "probleme",
        question: "Un train part à 14h25 et arrive à 16h10. Quelle est la durée du voyage ?",
        reponse: "1h45min",
        aide: "16h10 - 14h25 = 1h45min"
      }
    ]
  },
  
  phase4: {
    titre: "🎯 Je réfléchis sur mes apprentissages", 
    objectif: "Développer une réflexion métacognitive sur les calculs de durées",
    questions: [
      "Quelle méthode utilises-tu pour additionner des durées ?",
      "Comment procèdes-tu quand tu dois 'emprunter' des heures ou des minutes ?",
      "Dans quelles situations calcules-tu des durées au quotidien ?",
      "Pourquoi les conversions de durées sont-elles différentes des autres unités ?",
      "Comment vérifies-tu que tes calculs de durées sont corrects ?"
    ],
    activites: [
      {
        type: "auto-evaluation",
        criteres: [
          "Je connais les relations entre les unités de durée",
          "Je sais convertir d'une unité de durée à l'autre",
          "Je sais additionner et soustraire des durées",
          "Je sais lire l'heure sur différents supports",
          "Je sais résoudre des problèmes de durées",
          "Je sais utiliser les formats 12h et 24h"
        ]
      }
    ]
  }
};

// Export par défaut
export default durees6eme;
