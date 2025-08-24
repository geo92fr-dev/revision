import { describe, it, expect } from 'vitest'
import mathematiques6emeData from '../data/mathematiques/6ieme/index.js'

describe('Mathématiques 6ème - Index', () => {
  it('should export all new subjects', () => {
    expect(mathematiques6emeData).toBeDefined()
    expect(typeof mathematiques6emeData).toBe('object')
    
    // Vérifier que les nouveaux sujets sont exportés
    expect(mathematiques6emeData).toHaveProperty('addition-soustraction')
    expect(mathematiques6emeData).toHaveProperty('multiplication')
    expect(mathematiques6emeData).toHaveProperty('division')
    expect(mathematiques6emeData).toHaveProperty('figures-planes')
    expect(mathematiques6emeData).toHaveProperty('perimetre')
    expect(mathematiques6emeData).toHaveProperty('fractions')
  })

  it('should have valid data structure for each subject', () => {
    Object.entries(mathematiques6emeData).forEach(([key, subjectData]) => {
      expect(subjectData).toBeDefined()
      expect(subjectData).toHaveProperty('niveau')
      expect(subjectData).toHaveProperty('chapitre')
      expect(subjectData).toHaveProperty('sousChapitre')
      expect(subjectData).toHaveProperty('competences')
      
      expect(subjectData.niveau).toBe('6ème')
      expect(Array.isArray(subjectData.competences)).toBe(true)
      expect(subjectData.competences.length).toBeGreaterThan(0)
    })
  })

  it('should have unique quiz IDs across all subjects', () => {
    const allQuizIds = []
    
    Object.values(mathematiques6emeData).forEach((subjectData) => {
      subjectData.competences.forEach((competence) => {
        if (competence.quizId) {
          allQuizIds.push(competence.quizId)
        }
      })
    })
    
    const uniqueQuizIds = [...new Set(allQuizIds)]
    expect(allQuizIds.length).toBe(uniqueQuizIds.length, 
      'All quiz IDs should be unique across subjects')
  })

  it('should have consistent chapter organization', () => {
    const chapitres = Object.values(mathematiques6emeData).map(s => s.chapitre)
    const uniqueChapitres = [...new Set(chapitres)]
    
    // Vérifier qu'on a les chapitres attendus pour la 6ème
    expect(uniqueChapitres).toContain('Nombres & Calculs')
    expect(uniqueChapitres).toContain('Géométrie')
    expect(uniqueChapitres).toContain('Grandeurs & Mesures')
  })

  it('should maintain data integrity for all subjects', () => {
    // Vérifier que tous les sujets disponibles ont une structure cohérente
    const availableSubjects = Object.keys(mathematiques6emeData)
    expect(availableSubjects.length).toBeGreaterThan(0)
    
    availableSubjects.forEach(subject => {
      const subjectData = mathematiques6emeData[subject]
      expect(subjectData).toBeDefined()
      expect(subjectData.niveau).toBe('6ème')
      expect(subjectData.competences).toBeDefined()
      expect(Array.isArray(subjectData.competences)).toBe(true)
    })
  })
})
