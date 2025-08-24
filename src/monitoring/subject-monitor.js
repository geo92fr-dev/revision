// Système de monitoring et tests automatisés pour toutes les matières
class SubjectMonitor {
    constructor() {
        this.baseUrl = window.location.origin;
        this.subjects = {
            'mathematiques': {
                '6ieme': [
                    'addition-soustraction', 'multiplication', 'division', 'fractions-simples',
                    'nombres-entiers', 'nombres-decimaux', 'symetrie-axiale', 'aires-figures',
                    'constructions-geometriques', 'figures-planes', 'unites-longueur',
                    'unites-masse-capacite', 'durees', 'lecture-tableaux', 'graphiques',
                    'algebre', 'moyenne', 'proportionnalite', 'geometrie-espace', 'problemes'
                ]
            }
        };
        this.testResults = {};
        this.startTime = Date.now();
    }

    async runCompleteTest() {
        console.log('🚀 Démarrage du monitoring complet des matières...');
        
        const results = {
            timestamp: new Date().toISOString(),
            totalSubjects: 0,
            passedSubjects: 0,
            failedSubjects: 0,
            details: {},
            duration: 0
        };

        for (const [subject, levels] of Object.entries(this.subjects)) {
            results.details[subject] = {};
            
            for (const [level, topics] of Object.entries(levels)) {
                console.log(`📚 Test ${subject} - ${level}...`);
                results.details[subject][level] = await this.testLevel(subject, level, topics);
                
                // Calcul des statistiques globales
                const levelStats = results.details[subject][level];
                results.totalSubjects += levelStats.totalTopics;
                results.passedSubjects += levelStats.passedTopics;
                results.failedSubjects += levelStats.failedTopics;
            }
        }

        results.duration = Date.now() - this.startTime;
        this.testResults = results;
        
        console.log('✅ Monitoring terminé !', results);
        return results;
    }

    async testLevel(subject, level, topics) {
        const levelResults = {
            totalTopics: topics.length,
            passedTopics: 0,
            failedTopics: 0,
            topics: {}
        };

        for (const topic of topics) {
            console.log(`  🔍 Test ${topic}...`);
            const topicResult = await this.testTopic(subject, level, topic);
            levelResults.topics[topic] = topicResult;
            
            if (topicResult.status === 'pass') {
                levelResults.passedTopics++;
            } else {
                levelResults.failedTopics++;
            }
        }

        return levelResults;
    }

    async testTopic(subject, level, topic) {
        const result = {
            topic,
            status: 'fail',
            loadTime: 0,
            errors: [],
            warnings: [],
            structure: null,
            exports: []
        };

        const startTime = performance.now();

        try {
            // Test 1: Chargement du module
            const modulePath = `../data/${subject}/${level}/${topic}.js`;
            const module = await import(modulePath);
            
            result.exports = Object.keys(module);
            result.loadTime = performance.now() - startTime;

            // Test 2: Vérification de la structure des données
            const expectedExportName = this.getExpectedExportName(topic, level);
            const data = module[expectedExportName] || module.default;

            if (!data) {
                result.errors.push(`Export manquant: ${expectedExportName}`);
                return result;
            }

            result.structure = this.analyzeStructure(data);

            // Test 3: Validation du contenu
            const validation = this.validateContent(data);
            result.errors.push(...validation.errors);
            result.warnings.push(...validation.warnings);

            // Test 4: Test de rendu (simulation)
            const renderTest = await this.testRendering(subject, level, topic);
            if (!renderTest.success) {
                result.errors.push(`Erreur de rendu: ${renderTest.error}`);
            }

            // Déterminer le statut final
            result.status = result.errors.length === 0 ? 'pass' : 'fail';

        } catch (error) {
            result.errors.push(`Erreur de chargement: ${error.message}`);
            result.loadTime = performance.now() - startTime;
        }

        return result;
    }

    getExpectedExportName(topic, level) {
        const camelTopic = topic.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        return `${camelTopic}${level}`;
    }

    analyzeStructure(data) {
        const structure = {
            type: 'unknown',
            hasContent: false,
            fields: Object.keys(data)
        };

        if (data.competences && Array.isArray(data.competences)) {
            structure.type = 'competences';
            structure.hasContent = data.competences.length > 0;
        } else if (data.phase1 && data.phase2 && data.phase3 && data.phase4) {
            structure.type = 'phases';
            structure.hasContent = true;
        }

        return structure;
    }

    validateContent(data) {
        const validation = { errors: [], warnings: [] };

        // Validation basique
        if (!data.niveau) validation.warnings.push('Niveau manquant');
        if (!data.chapitre && !data.titre) validation.warnings.push('Titre/chapitre manquant');

        // Validation selon le type
        if (data.competences && Array.isArray(data.competences)) {
            if (data.competences.length === 0) {
                validation.warnings.push('Tableau competences vide');
            } else {
                // Valider la première compétence
                const comp = data.competences[0];
                if (!comp.titre) validation.errors.push('Titre de compétence manquant');
                if (!comp.description) validation.warnings.push('Description de compétence manquante');
            }
        }

        return validation;
    }

    async testRendering(subject, level, topic) {
        try {
            // Simuler le chargement comme le fait l'application
            const url = `${this.baseUrl}/pages/page_de_cours.html?subject=${subject}&level=${level}&topic=${topic}`;
            
            // Test de l'URL (ne charge pas la page complète, juste vérifie l'accessibilité)
            const response = await fetch(url, { method: 'HEAD' });
            
            return {
                success: response.ok,
                error: response.ok ? null : `HTTP ${response.status}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    generateReport() {
        if (!this.testResults) {
            return '<p>Aucun test exécuté</p>';
        }

        const results = this.testResults;
        const successRate = ((results.passedSubjects / results.totalSubjects) * 100).toFixed(1);
        
        let html = `
            <div class="monitoring-report">
                <h2>📊 Rapport de Monitoring - ${new Date(results.timestamp).toLocaleString()}</h2>
                
                <div class="summary-stats">
                    <div class="stat-box success">
                        <h3>✅ ${results.passedSubjects}</h3>
                        <p>Sujets OK</p>
                    </div>
                    <div class="stat-box error">
                        <h3>❌ ${results.failedSubjects}</h3>
                        <p>Sujets KO</p>
                    </div>
                    <div class="stat-box info">
                        <h3>📈 ${successRate}%</h3>
                        <p>Taux de réussite</p>
                    </div>
                    <div class="stat-box info">
                        <h3>⏱️ ${results.duration}ms</h3>
                        <p>Durée totale</p>
                    </div>
                </div>

                <div class="detailed-results">
        `;

        // Détails par matière/niveau
        for (const [subject, levels] of Object.entries(results.details)) {
            html += `<h3>📚 ${subject.toUpperCase()}</h3>`;
            
            for (const [level, levelData] of Object.entries(levels)) {
                const levelSuccessRate = ((levelData.passedTopics / levelData.totalTopics) * 100).toFixed(1);
                
                html += `
                    <div class="level-section">
                        <h4>${level} - ${levelData.passedTopics}/${levelData.totalTopics} (${levelSuccessRate}%)</h4>
                        <div class="topics-grid">
                `;

                // Grille des sujets
                for (const [topic, topicData] of Object.entries(levelData.topics)) {
                    const statusClass = topicData.status === 'pass' ? 'topic-pass' : 'topic-fail';
                    const statusIcon = topicData.status === 'pass' ? '✅' : '❌';
                    
                    html += `
                        <div class="topic-card ${statusClass}" title="${topicData.errors.join(', ') || 'OK'}">
                            <span class="topic-icon">${statusIcon}</span>
                            <span class="topic-name">${topic}</span>
                            <span class="topic-time">${Math.round(topicData.loadTime)}ms</span>
                        </div>
                    `;
                }

                html += `
                        </div>
                    </div>
                `;
            }
        }

        html += `
                </div>
            </div>
            
            <style>
                .monitoring-report {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .summary-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin: 20px 0;
                }
                
                .stat-box {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    border-left: 5px solid #ccc;
                }
                
                .stat-box.success { border-left-color: #48bb78; }
                .stat-box.error { border-left-color: #f56565; }
                .stat-box.info { border-left-color: #4299e1; }
                
                .stat-box h3 {
                    font-size: 2rem;
                    margin: 0 0 5px 0;
                    font-weight: bold;
                }
                
                .stat-box p {
                    margin: 0;
                    color: #666;
                    font-size: 0.9rem;
                }
                
                .level-section {
                    margin: 30px 0;
                    background: #f8f9fa;
                    border-radius: 12px;
                    padding: 20px;
                }
                
                .topics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 12px;
                    margin-top: 15px;
                }
                
                .topic-card {
                    background: white;
                    border-radius: 8px;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    transition: transform 0.2s;
                }
                
                .topic-card:hover {
                    transform: translateY(-2px);
                }
                
                .topic-card.topic-pass {
                    border-left: 4px solid #48bb78;
                }
                
                .topic-card.topic-fail {
                    border-left: 4px solid #f56565;
                }
                
                .topic-name {
                    flex: 1;
                    font-weight: 500;
                    font-size: 0.9rem;
                }
                
                .topic-time {
                    font-size: 0.8rem;
                    color: #666;
                }
            </style>
        `;

        return html;
    }
}

// API globale pour l'utilisation
window.SubjectMonitor = SubjectMonitor;
