#!/usr/bin/env node

// Script de test automatisé pour CI/CD et monitoring continu
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutomatedTester {
    constructor() {
        this.baseDir = path.resolve(__dirname, '..');
        this.dataDir = path.join(this.baseDir, 'data');
        this.results = {
            timestamp: new Date().toISOString(),
            totalFiles: 0,
            validFiles: 0,
            invalidFiles: 0,
            errors: [],
            warnings: [],
            details: {}
        };
    }

    async runTests() {
        console.log('🔍 Démarrage des tests automatisés...');
        console.log(`📂 Répertoire de base: ${this.baseDir}`);
        
        try {
            await this.scanDataDirectory();
            this.generateSummary();
            
            if (this.results.invalidFiles > 0) {
                process.exit(1); // Échec pour CI/CD
            }
        } catch (error) {
            console.error('❌ Erreur fatale:', error.message);
            process.exit(1);
        }
    }

    async scanDataDirectory() {
        console.log('📊 Scanning du répertoire data...');
        
        const subjects = await fs.readdir(this.dataDir);
        
        for (const subject of subjects) {
            const subjectPath = path.join(this.dataDir, subject);
            const stat = await fs.stat(subjectPath);
            
            if (stat.isDirectory()) {
                this.results.details[subject] = {};
                await this.scanSubject(subject, subjectPath);
            }
        }
    }

    async scanSubject(subject, subjectPath) {
        const levels = await fs.readdir(subjectPath);
        
        for (const level of levels) {
            const levelPath = path.join(subjectPath, level);
            const stat = await fs.stat(levelPath);
            
            if (stat.isDirectory()) {
                this.results.details[subject][level] = {};
                await this.scanLevel(subject, level, levelPath);
            }
        }
    }

    async scanLevel(subject, level, levelPath) {
        const files = await fs.readdir(levelPath);
        const jsFiles = files.filter(file => file.endsWith('.js') && file !== 'index.js');
        
        this.results.details[subject][level] = {
            totalFiles: jsFiles.length,
            validFiles: 0,
            invalidFiles: 0,
            files: {}
        };

        for (const file of jsFiles) {
            const filePath = path.join(levelPath, file);
            const result = await this.validateFile(subject, level, file, filePath);
            
            this.results.details[subject][level].files[file] = result;
            this.results.totalFiles++;
            
            if (result.isValid) {
                this.results.validFiles++;
                this.results.details[subject][level].validFiles++;
            } else {
                this.results.invalidFiles++;
                this.results.details[subject][level].invalidFiles++;
            }
        }
    }

    async validateFile(subject, level, fileName, filePath) {
        const result = {
            isValid: true,
            errors: [],
            warnings: [],
            structure: null,
            exports: [],
            size: 0
        };

        try {
            // Lecture du fichier
            const content = await fs.readFile(filePath, 'utf8');
            result.size = content.length;

            // Validation syntaxique de base
            if (!content.includes('export')) {
                result.errors.push('Aucun export trouvé');
                result.isValid = false;
            }

            // Extraction des exports avec une regex plus complète
            result.exports = [];
            
            // Export const/let/var
            const exportMatches = content.match(/export\s+(?:const|let|var)\s+(\w+)/g);
            if (exportMatches) {
                result.exports.push(...exportMatches.map(match => {
                    const parts = match.replace(/\s+/g, ' ').split(' ');
                    return parts[2]; // export const [NOM]
                }));
            }

            // Export { nom } (exports nommés)
            const namedExports = content.match(/export\s*{\s*([^}]+)\s*}/g);
            if (namedExports) {
                namedExports.forEach(match => {
                    const names = match.match(/{\s*([^}]+)\s*}/)[1];
                    // Gérer les multiples exports séparés par des virgules
                    const exportNames = names.split(',').map(name => name.trim());
                    result.exports.push(...exportNames);
                });
            }

            // Aussi chercher les exports par défaut
            const defaultExports = content.match(/export\s+default\s+(\w+)/g);
            if (defaultExports) {
                result.exports.push(...defaultExports.map(match => {
                    const parts = match.replace(/\s+/g, ' ').split(' ');
                    return parts[2] + ' (default)';
                }));
            }

            // Validation de la structure
            result.structure = this.analyzeFileStructure(content);

            // Validation du nommage des exports - méthode corrigée
            const topicName = fileName.replace('.js', '');
            const expectedExport = this.getExpectedExportName(topicName, level);
            
            // Vérifier si l'export existe de manière plus flexible
            const hasExpectedExport = 
                result.exports.includes(expectedExport) ||
                content.includes(`export const ${expectedExport}`) ||
                content.includes(`export let ${expectedExport}`) ||
                content.includes(`export var ${expectedExport}`);
            
            if (!hasExpectedExport) {
                result.warnings.push(`Export attendu '${expectedExport}' non trouvé`);
            }

            // Validation du contenu minimal
            if (content.includes('competences: []') || content.includes('competences:[]')) {
                result.warnings.push('Tableau competences vide');
            }

            if (result.size < 100) {
                result.warnings.push('Fichier très petit (< 100 caractères)');
            }

        } catch (error) {
            result.errors.push(`Erreur de lecture: ${error.message}`);
            result.isValid = false;
        }

        // Collecte globale des erreurs
        this.results.errors.push(...result.errors.map(err => `${subject}/${level}/${fileName}: ${err}`));
        this.results.warnings.push(...result.warnings.map(warn => `${subject}/${level}/${fileName}: ${warn}`));

        return result;
    }

    analyzeFileStructure(content) {
        const structure = {
            hasCompetences: content.includes('competences'),
            hasPhases: content.includes('phase1') && content.includes('phase2'),
            hasExport: content.includes('export'),
            hasTitle: content.includes('titre') || content.includes('chapitre'),
            lines: content.split('\n').length
        };
        
        return structure;
    }

    getExpectedExportName(topicName, level) {
        const camelTopic = topicName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        // Normaliser le niveau: 6ieme -> 6eme (convention réelle)
        const normalizedLevel = level.replace('ieme', 'eme');
        return `${camelTopic}${normalizedLevel}`;
    }

    generateSummary() {
        console.log('\n📋 RÉSUMÉ DES TESTS');
        console.log('================');
        console.log(`📊 Total fichiers: ${this.results.totalFiles}`);
        console.log(`✅ Fichiers valides: ${this.results.validFiles}`);
        console.log(`❌ Fichiers invalides: ${this.results.invalidFiles}`);
        console.log(`⚠️  Warnings: ${this.results.warnings.length}`);
        
        const successRate = ((this.results.validFiles / this.results.totalFiles) * 100).toFixed(1);
        console.log(`📈 Taux de réussite: ${successRate}%`);

        if (this.results.errors.length > 0) {
            console.log('\n❌ ERREURS:');
            this.results.errors.forEach(error => console.log(`  • ${error}`));
        }

        if (this.results.warnings.length > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.results.warnings.forEach(warning => console.log(`  • ${warning}`));
        }

        // Détails par matière
        console.log('\n📚 DÉTAILS PAR MATIÈRE:');
        for (const [subject, levels] of Object.entries(this.results.details)) {
            console.log(`\n${subject.toUpperCase()}:`);
            for (const [level, data] of Object.entries(levels)) {
                const levelRate = ((data.validFiles / data.totalFiles) * 100).toFixed(1);
                console.log(`  ${level}: ${data.validFiles}/${data.totalFiles} (${levelRate}%)`);
            }
        }

        // Sauvegarde du rapport JSON
        this.saveReport();
    }

    async saveReport() {
        const reportPath = path.join(this.baseDir, 'monitoring', 'latest-test-report.json');
        
        try {
            await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));
            console.log(`\n💾 Rapport sauvegardé: ${reportPath}`);
        } catch (error) {
            console.error('❌ Erreur sauvegarde rapport:', error.message);
        }
    }
}

// Exécution si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
    const tester = new AutomatedTester();
    tester.runTests();
}

export default AutomatedTester;
