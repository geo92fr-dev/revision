/**
 * 🚀 ModuleLoader - Gestionnaire de chargement modulaire
 * 
 * Ce module centralise le chargement dynamique des données de cours
 * et coordonne l'affichage avec les composants pédagogiques.
 */

export class ModuleLoader {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    /**
     * Charge un module avec mise en cache intelligente
     */
    async loadModule(subject, level, topic) {
        const cacheKey = `${subject}-${level}-${topic}`;
        
        // Vérifier le cache
        if (this.cache.has(cacheKey)) {
            console.log(`📦 Module ${cacheKey} trouvé dans le cache`);
            return this.cache.get(cacheKey);
        }

        // Éviter les chargements multiples simultanés
        if (this.loadingPromises.has(cacheKey)) {
            console.log(`⏳ Attente du chargement en cours pour ${cacheKey}`);
            return await this.loadingPromises.get(cacheKey);
        }

        // Créer la promesse de chargement
        const loadingPromise = this._performLoad(subject, level, topic);
        this.loadingPromises.set(cacheKey, loadingPromise);

        try {
            const result = await loadingPromise;
            this.cache.set(cacheKey, result);
            return result;
        } finally {
            this.loadingPromises.delete(cacheKey);
        }
    }

    /**
     * Effectue le chargement réel du module
     */
    async _performLoad(subject, level, topic) {
        console.log(`🔄 Chargement du module: ${subject}/${level}/${topic}`);

        try {
            // Stratégie de chargement par matière
            switch (subject) {
                case 'mathematiques':
                    return await this._loadMathematiques(level, topic);
                case 'francais':
                    return await this._loadFrancais(level, topic);
                case 'sciences':
                    return await this._loadSciences(level, topic);
                default:
                    return await this._loadGeneric(subject, level, topic);
            }
        } catch (error) {
            console.error(`❌ Erreur de chargement pour ${subject}/${level}/${topic}:`, error);
            throw new Error(`Module ${subject}/${level}/${topic} non disponible`);
        }
    }

    /**
     * Chargement spécialisé pour les mathématiques
     */
    async _loadMathematiques(level, topic) {
        console.log(`🔢 Chargement mathématiques: ${level}/${topic}`);
        
        if (level === '6ieme') {
            // Essayer d'abord le chargement direct pour éviter les problèmes d'index
            try {
                const result = await this._loadDirectFile('mathematiques', level, topic);
                if (result) {
                    console.log(`✅ Chargement direct réussi pour maths/${level}/${topic}`);
                    return result;
                }
            } catch (directError) {
                console.warn(`⚠️ Chargement direct échoué, essai via index:`, directError);
                
                // Fallback vers l'index si le direct échoue
                try {
                    const mathsIndex = await import(`../data/mathematiques/6ieme/index.js`);
                    
                    if (mathsIndex.mathematiques6eme && mathsIndex.mathematiques6eme[topic]) {
                        console.log(`✅ Chargement via index réussi pour maths/${level}/${topic}`);
                        return mathsIndex.mathematiques6eme[topic];
                    }
                } catch (indexError) {
                    console.error(`❌ Échec chargement via index:`, indexError);
                }
                
                // Re-lancer l'erreur directe si tout échoue
                throw directError;
            }
        }
        
        return await this._loadDirectFile('mathematiques', level, topic);
    }

    /**
     * Chargement générique pour autres matières
     */
    async _loadGeneric(subject, level, topic) {
        return await this._loadDirectFile(subject, level, topic);
    }

    /**
     * Chargement d'un fichier spécifique
     */
    async _loadDirectFile(subject, level, topic) {
        const filePath = `../data/${subject}/${level}/${topic}.js`;
        console.log(`📄 Chargement direct: ${filePath}`);
        
        const module = await import(/* @vite-ignore */ filePath);
        
        // Stratégies de récupération de données
        const strategies = [
            // Export par défaut
            () => module.default,
            // Convention camelCase + niveau
            () => {
                const camelTopic = this._toCamelCase(topic);
                const levelSuffix = level.replace('ieme', '') + 'eme';
                return module[camelTopic + levelSuffix];
            },
            // Nom direct du topic
            () => module[topic],
            // Clé avec tirets
            () => module[topic.replace(/-/g, '')],
        ];

        for (const strategy of strategies) {
            try {
                const result = strategy();
                if (result) {
                    console.log(`✅ Données trouvées avec stratégie`);
                    return result;
                }
            } catch (e) {
                // Continuer avec la stratégie suivante
            }
        }

        throw new Error(`Aucune donnée trouvée pour ${subject}/${level}/${topic}`);
    }

    /**
     * Valide la structure des données chargées
     */
    validateModuleData(data) {
        console.log('🔍 Validation des données du module:', data);
        
        if (!data) {
            console.warn('⚠️ Données nulles ou undefined');
            return false;
        }
        
        // Validation pour le format 4-phases
        const hasPhases = ['phase1', 'phase2', 'phase3', 'phase4'].some(phase => data[phase]);
        if (hasPhases) {
            console.log('✅ Format 4-phases détecté');
            return true;
        }
        
        // Validation pour l'ancien format avec compétences
        const hasCompetences = data.competences && Array.isArray(data.competences) && data.competences.length > 0;
        if (hasCompetences) {
            console.log('✅ Format compétences détecté');
            return true;
        }
        
        // Validation pour l'export direct d'une compétence
        if (data.titre || data.objectif || data.cours) {
            console.log('✅ Format compétence directe détecté');
            return true;
        }
        
        // Si on a au moins un niveau et un titre, on accepte
        if (data.niveau || data.titre) {
            console.log('✅ Format minimal accepté');
            return true;
        }
        
        console.warn('⚠️ Structure de données non reconnue:', Object.keys(data));
        return false;
    }

    /**
     * Normalise les données selon le format attendu par les composants
     */
    normalizeModuleData(data) {
        console.log('🔄 Normalisation des données:', data);
        
        // Si c'est déjà une structure 4-phases, enrichir avec les informations nécessaires
        if (data.phase1 || data.phase2 || data.phase3 || data.phase4) {
            const normalized = {
                ...data,
                format: '4-phases',
                // S'assurer que les informations de base sont présentes
                titre: data.titre || 'Cours sans titre',
                niveau: data.niveau || '6ème',
                description: data.description || data.objectif || 'Découvrez ce module d\'apprentissage',
                utilite: data.utilite || 'Cette compétence développe vos connaissances fondamentales.',
                funFact: data.funFact || 'L\'apprentissage par phases améliore la mémorisation ! 🧠✨'
            };
            console.log('✅ Données normalisées (format 4-phases):', normalized);
            return normalized;
        }

        // Si c'est une ancienne structure avec compétences, la convertir
        if (data.competences && data.competences[0]) {
            const competence = data.competences[0];
            const normalized = {
                titre: competence.titre || data.titre || 'Cours sans titre',
                niveau: data.niveau || '6ème',
                description: competence.objectif || data.description || 'Découvrez ce module d\'apprentissage',
                utilite: competence.utilite || 'Cette compétence développe vos connaissances fondamentales.',
                funFact: competence.funFact || 'L\'apprentissage actif améliore la rétention ! 🧠✨',
                format: 'competences',
                competence: competence
            };
            console.log('✅ Données normalisées (format compétences):', normalized);
            return normalized;
        }

        // Si c'est une compétence directe (sans wrapper competences)
        if (data.objectif || data.cours) {
            const normalized = {
                titre: data.titre || 'Cours sans titre',
                niveau: data.niveau || '6ème',
                description: data.objectif || 'Découvrez ce module d\'apprentissage',
                utilite: data.utilite || 'Cette compétence développe vos connaissances fondamentales.',
                funFact: data.funFact || 'L\'apprentissage actif améliore la rétention ! 🧠✨',
                format: 'competences',
                competence: data
            };
            console.log('✅ Données normalisées (compétence directe):', normalized);
            return normalized;
        }

        // Structure inconnue - créer une structure minimale
        const normalized = {
            ...data,
            format: 'unknown',
            titre: data.titre || 'Cours en développement',
            niveau: data.niveau || '6ème',
            description: data.description || 'Ce cours est en cours de développement.',
            utilite: data.utilite || 'Le contenu sera bientôt disponible.',
            funFact: data.funFact || 'Patience ! Notre équipe travaille sur ce contenu 🚧✨'
        };
        console.log('✅ Données normalisées (format générique):', normalized);
        return normalized;
    }

    /**
     * Convertit une chaîne en camelCase
     */
    _toCamelCase(str) {
        return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
                  .replace(/\s+([a-z])/g, (match, letter) => letter.toUpperCase())
                  .replace(/[^a-zA-Z0-9]/g, '');
    }

    /**
     * Charge les mathématiques 6ème
     */
    async _loadMathematiques(level, topic) {
        // Déjà implémenté ci-dessus
        return await this._loadDirectFile('mathematiques', level, topic);
    }

    /**
     * Charge les modules de français
     */
    async _loadFrancais(level, topic) {
        return await this._loadDirectFile('francais', level, topic);
    }

    /**
     * Charge les modules de sciences
     */
    async _loadSciences(level, topic) {
        return await this._loadDirectFile('sciences', level, topic);
    }

    /**
     * Convertit une chaîne en camelCase
     */
    _toCamelCase(str) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    /**
     * Nettoie le cache (utile pour le développement)
     */
    clearCache() {
        this.cache.clear();
        console.log('🧹 Cache ModuleLoader nettoyé');
    }

    /**
     * Obtient les statistiques du cache
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Instance singleton
export const moduleLoader = new ModuleLoader();
