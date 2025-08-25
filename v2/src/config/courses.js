// Configuration centralisée des cours disponibles
export const coursesConfig = {
  mathematiques: {
    "6ieme": {
      fractions: {
        title: "Comprendre les fractions",
        dataPath: "../../data/mathematiques/6ieme/fractions.js",
        icon: "🔢",
        description: "Apprendre à lire, écrire et représenter les fractions"
      },
      algebre: {
        title: "Découvrir l'algèbre",
        dataPath: "../../data/mathematiques/6ieme/algebre.js", 
        icon: "🔤",
        description: "Introduction aux expressions littérales"
      },
      geometrie: {
        title: "Géométrie plane",
        dataPath: "../../data/mathematiques/6ieme/geometrie.js",
        icon: "📐",
        description: "Figures planes et constructions",
        status: "coming-soon"
      }
    },
    "5ieme": {
      relatifs: {
        title: "Nombres relatifs",
        dataPath: "../../data/mathematiques/5ieme/relatifs.js",
        icon: "➕➖",
        description: "Addition et soustraction des nombres relatifs",
        status: "coming-soon"
      },
      priorites: {
        title: "Priorités opératoires",
        dataPath: "../../data/mathematiques/5ieme/priorites.js",
        icon: "🔄",
        description: "Ordre des opérations dans les calculs",
        status: "coming-soon"
      }
    }
  },
  francais: {
    "6ieme": {
      grammaire: {
        title: "Grammaire fondamentale",
        dataPath: "../../data/francais/6ieme/grammaire.js",
        icon: "📝",
        description: "Classes de mots et fonctions grammaticales",
        status: "coming-soon"
      }
    }
  },
  histoire: {
    "6ieme": {
      antiquite: {
        title: "L'Antiquité",
        dataPath: "../../data/histoire/6ieme/antiquite.js",
        icon: "🏛️",
        description: "Civilisations antiques et leurs héritages",
        status: "coming-soon"
      }
    }
  },
  sciences: {
    "6ieme": {
      corps_humain: {
        title: "Le corps humain",
        dataPath: "../../data/sciences/6ieme/corps_humain.js",
        icon: "🧬",
        description: "Fonctionnement du corps et santé",
        status: "coming-soon"
      }
    }
  }
};

// Fonction utilitaire pour générer l'URL vers la page de cours générique
export function getCourseUrl(subject, level, topic) {
  const course = coursesConfig[subject]?.[level]?.[topic];
  if (!course) {
    console.error(`Cours non trouvé: ${subject}/${level}/${topic}`);
    return '#';
  }
  
  // Calculer le chemin relatif vers page_de_cours.html depuis la page courante
  const baseUrl = "../page_de_cours.html";
  return `${baseUrl}?course=${course.dataPath}`;
}

// Fonction pour obtenir la liste des cours d'un niveau
export function getCoursesByLevel(subject, level) {
  return coursesConfig[subject]?.[level] || {};
}

// Fonction pour obtenir tous les niveaux d'une matière
export function getLevelsBySubject(subject) {
  return Object.keys(coursesConfig[subject] || {});
}

export default coursesConfig;
