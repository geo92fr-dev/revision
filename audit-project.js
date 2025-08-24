// Script d'audit complet pour identifier tous les problèmes du projet
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;

class ProjectAuditor {
  constructor() {
    this.results = {
      fileCount: 0,
      issues: [],
      duplicates: [],
      obsoleteFiles: [],
      incompleteFiles: [],
      structureProblems: [],
      recommendations: []
    };
  }

  async audit() {
    console.log('🔍 AUDIT COMPLET DU PROJET\n');
    
    await this.auditFileStructure();
    await this.auditDataFiles();
    await this.auditTestFiles();
    await this.auditDocumentation();
    await this.auditObsoleteFiles();
    
    this.generateReport();
    return this.results;
  }

  async auditFileStructure() {
    console.log('📁 Audit de la structure des fichiers...');
    
    const allFiles = await this.getAllFiles(projectRoot);
    this.results.fileCount = allFiles.length;
    
    // Analyser la dispersion des fichiers
    const filesByType = {};
    const filesByLocation = {};
    
    for (const file of allFiles) {
      const ext = path.extname(file);
      const dir = path.dirname(file).replace(projectRoot, '');
      
      filesByType[ext] = (filesByType[ext] || 0) + 1;
      filesByLocation[dir] = (filesByLocation[dir] || 0) + 1;
    }
    
    console.log(`   📊 Total fichiers: ${allFiles.length}`);
    console.log(`   📝 Fichiers .js: ${filesByType['.js'] || 0}`);
    console.log(`   📄 Fichiers .md: ${filesByType['.md'] || 0}`);
    
    // Identifier les problèmes de structure
    if (filesByType['.js'] > 100) {
      this.results.issues.push({
        type: 'STRUCTURE',
        severity: 'HIGH',
        message: `Trop de fichiers JavaScript (${filesByType['.js']}) - architecture dispersée`
      });
    }
    
    if (filesByType['.md'] > 10) {
      this.results.issues.push({
        type: 'DOCUMENTATION',
        severity: 'MEDIUM',
        message: `Documentation éparpillée (${filesByType['.md']} fichiers .md)`
      });
    }
  }

  async auditDataFiles() {
    console.log('📊 Audit des fichiers de données...');
    
    const dataFiles = await this.getDataFiles();
    const referenceStructure = await this.getReferenceStructure();
    
    for (const file of dataFiles) {
      try {
        const content = await fs.readFile(file, 'utf-8');
        const structure = await this.analyzeDataStructure(file, content);
        
        // Vérifier conformité avec reference.js
        const compliance = this.checkCompliance(structure, referenceStructure);
        
        if (!compliance.isCompliant) {
          this.results.incompleteFiles.push({
            file: file.replace(projectRoot, ''),
            issues: compliance.issues,
            completeness: compliance.completeness
          });
        }
        
      } catch (error) {
        this.results.issues.push({
          type: 'DATA_FILE_ERROR',
          severity: 'HIGH',
          file: file.replace(projectRoot, ''),
          message: error.message
        });
      }
    }
    
    console.log(`   📄 Fichiers de données analysés: ${dataFiles.length}`);
    console.log(`   ❌ Fichiers non conformes: ${this.results.incompleteFiles.length}`);
  }

  async auditTestFiles() {
    console.log('🧪 Audit des fichiers de tests...');
    
    const testLocations = [
      'src/test',
      'tests',
      'src/test/data'
    ];
    
    const testFiles = [];
    for (const location of testLocations) {
      const fullPath = path.join(projectRoot, location);
      try {
        const files = await this.getAllFiles(fullPath);
        testFiles.push(...files.filter(f => f.endsWith('.test.js') || f.endsWith('.spec.js')));
      } catch (error) {
        // Directory might not exist
      }
    }
    
    // Identifier les tests dispersés
    const testsByLocation = {};
    for (const file of testFiles) {
      const dir = path.dirname(file).replace(projectRoot, '');
      testsByLocation[dir] = (testsByLocation[dir] || 0) + 1;
    }
    
    if (Object.keys(testsByLocation).length > 2) {
      this.results.issues.push({
        type: 'TEST_STRUCTURE',
        severity: 'MEDIUM',
        message: `Tests dispersés dans ${Object.keys(testsByLocation).length} répertoires différents`,
        details: testsByLocation
      });
    }
    
    console.log(`   🧪 Fichiers de tests: ${testFiles.length}`);
    console.log(`   📁 Répertoires de tests: ${Object.keys(testsByLocation).length}`);
  }

  async auditDocumentation() {
    console.log('📚 Audit de la documentation...');
    
    const mdFiles = await this.getAllFiles(projectRoot);
    const docFiles = mdFiles.filter(f => f.endsWith('.md'));
    
    // Identifier les documentations obsolètes/redondantes
    const docTypes = {};
    for (const file of docFiles) {
      const name = path.basename(file, '.md').toLowerCase();
      
      if (name.includes('architecture') || name.includes('structure') || name.includes('migration')) {
        docTypes.architecture = (docTypes.architecture || 0) + 1;
      }
      if (name.includes('validation') || name.includes('test')) {
        docTypes.validation = (docTypes.validation || 0) + 1;
      }
      if (name.includes('optimization') || name.includes('optimisation')) {
        docTypes.optimization = (docTypes.optimization || 0) + 1;
      }
    }
    
    // Identifier les redondances
    for (const [type, count] of Object.entries(docTypes)) {
      if (count > 2) {
        this.results.issues.push({
          type: 'DOCUMENTATION_REDUNDANCY',
          severity: 'LOW',
          message: `Documentation redondante pour ${type}: ${count} fichiers`
        });
      }
    }
    
    console.log(`   📄 Fichiers documentation: ${docFiles.length}`);
  }

  async auditObsoleteFiles() {
    console.log('🗑️ Audit des fichiers obsolètes...');
    
    const obsoletePatterns = [
      'test-*.js',
      'structure-*.js',
      '*-old.*',
      '*-backup.*',
      'coursData.js',
      'quizData.js'
    ];
    
    const allFiles = await this.getAllFiles(projectRoot);
    
    for (const file of allFiles) {
      const basename = path.basename(file);
      
      for (const pattern of obsoletePatterns) {
        if (this.matchesPattern(basename, pattern)) {
          this.results.obsoleteFiles.push(file.replace(projectRoot, ''));
        }
      }
    }
    
    console.log(`   🗑️ Fichiers obsolètes détectés: ${this.results.obsoleteFiles.length}`);
  }

  async getAllFiles(dir) {
    const files = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          files.push(...await this.getAllFiles(fullPath));
        } else if (entry.isFile()) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory might not exist or be inaccessible
    }
    
    return files;
  }

  async getDataFiles() {
    const dataDir = path.join(projectRoot, 'src', 'data');
    const files = await this.getAllFiles(dataDir);
    return files.filter(f => f.endsWith('.js') && !f.includes('index.js') && !f.includes('reference.js'));
  }

  async getReferenceStructure() {
    // Analyser le fichier de référence pour comprendre la structure attendue
    const refPath = path.join(projectRoot, 'src', 'data', 'mathematiques', '6ieme', 'reference.js');
    try {
      const content = await fs.readFile(refPath, 'utf-8');
      return this.extractReferenceStructure(content);
    } catch (error) {
      return null;
    }
  }

  extractReferenceStructure(content) {
    return {
      requiredFields: ['niveau', 'chapitre', 'sousChapitre', 'competences'],
      competenceFields: ['id', 'titre', 'objectif', 'cours'],
      coursStructure: ['activation', 'apprentissage', 'pratique', 'metacognition']
    };
  }

  async analyzeDataStructure(filePath, content) {
    // Analyser la structure d'un fichier de données
    try {
      // Simple analyse basée sur les patterns trouvés
      const hasNiveau = content.includes('niveau:');
      const hasChapitre = content.includes('chapitre:');
      const hasCompetences = content.includes('competences:');
      const hasCoursObject = content.includes('cours: {');
      const hasCoursString = content.includes('cours: "') || content.includes("cours: '");
      
      return {
        hasNiveau,
        hasChapitre,
        hasCompetences,
        coursType: hasCoursObject ? 'object' : hasCoursString ? 'string' : 'unknown'
      };
    } catch (error) {
      return null;
    }
  }

  checkCompliance(structure, reference) {
    if (!structure || !reference) {
      return { isCompliant: false, issues: ['Structure non analysable'], completeness: 0 };
    }
    
    const issues = [];
    let score = 0;
    const maxScore = 4;
    
    if (structure.hasNiveau) score++;
    else issues.push('Champ "niveau" manquant');
    
    if (structure.hasChapitre) score++;
    else issues.push('Champ "chapitre" manquant');
    
    if (structure.hasCompetences) score++;
    else issues.push('Champ "competences" manquant');
    
    if (structure.coursType === 'object') score++;
    else if (structure.coursType === 'string') issues.push('Structure "cours" simplifiée (string au lieu d\'objet)');
    else issues.push('Structure "cours" manquante ou invalide');
    
    return {
      isCompliant: score === maxScore && structure.coursType === 'object',
      issues,
      completeness: Math.round((score / maxScore) * 100)
    };
  }

  matchesPattern(filename, pattern) {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(filename);
  }

  generateReport() {
    console.log('\n📋 RAPPORT D\'AUDIT\n');
    console.log('=' .repeat(50));
    
    // Résumé général
    console.log(`📊 STATISTIQUES GÉNÉRALES:`);
    console.log(`   • Total fichiers: ${this.results.fileCount}`);
    console.log(`   • Problèmes détectés: ${this.results.issues.length}`);
    console.log(`   • Fichiers obsolètes: ${this.results.obsoleteFiles.length}`);
    console.log(`   • Fichiers non conformes: ${this.results.incompleteFiles.length}`);
    
    // Problèmes par sévérité
    const severityCounts = {};
    for (const issue of this.results.issues) {
      severityCounts[issue.severity] = (severityCounts[issue.severity] || 0) + 1;
    }
    
    console.log(`\n🚨 PROBLÈMES PAR SÉVÉRITÉ:`);
    if (severityCounts.HIGH) console.log(`   • Critiques: ${severityCounts.HIGH}`);
    if (severityCounts.MEDIUM) console.log(`   • Moyens: ${severityCounts.MEDIUM}`);
    if (severityCounts.LOW) console.log(`   • Mineurs: ${severityCounts.LOW}`);
    
    // Détail des problèmes
    if (this.results.issues.length > 0) {
      console.log(`\n❌ DÉTAIL DES PROBLÈMES:`);
      for (const issue of this.results.issues) {
        console.log(`   • [${issue.severity}] ${issue.message}`);
      }
    }
    
    // Fichiers non conformes
    if (this.results.incompleteFiles.length > 0) {
      console.log(`\n📄 FICHIERS NON CONFORMES:`);
      for (const file of this.results.incompleteFiles) {
        console.log(`   • ${file.file} (${file.completeness}% conforme)`);
        for (const issue of file.issues) {
          console.log(`     - ${issue}`);
        }
      }
    }
    
    // Fichiers obsolètes
    if (this.results.obsoleteFiles.length > 0) {
      console.log(`\n🗑️ FICHIERS OBSOLÈTES À SUPPRIMER:`);
      for (const file of this.results.obsoleteFiles) {
        console.log(`   • ${file}`);
      }
    }
    
    // Recommandations
    console.log(`\n💡 RECOMMANDATIONS PRIORITAIRES:`);
    console.log(`   1. Restructurer l'architecture (${this.results.fileCount} fichiers dispersés)`);
    console.log(`   2. Standardiser ${this.results.incompleteFiles.length} fichiers de données`);
    console.log(`   3. Supprimer ${this.results.obsoleteFiles.length} fichiers obsolètes`);
    console.log(`   4. Centraliser les tests et la documentation`);
    console.log(`   5. Implémenter le système auto-extensible`);
    
    console.log(`\n🎯 SCORE DE QUALITÉ: ${this.calculateQualityScore()}%`);
    console.log('=' .repeat(50));
  }

  calculateQualityScore() {
    let score = 100;
    
    // Pénalités
    score -= this.results.issues.filter(i => i.severity === 'HIGH').length * 20;
    score -= this.results.issues.filter(i => i.severity === 'MEDIUM').length * 10;
    score -= this.results.issues.filter(i => i.severity === 'LOW').length * 5;
    score -= this.results.obsoleteFiles.length * 2;
    score -= this.results.incompleteFiles.length * 5;
    
    return Math.max(0, score);
  }
}

// Exécution
const auditor = new ProjectAuditor();
auditor.audit().then(results => {
  console.log('\n✅ Audit terminé. Résultats sauvegardés dans audit-results.json');
  
  // Sauvegarder les résultats
  fs.writeFile('audit-results.json', JSON.stringify(results, null, 2));
}).catch(console.error);
