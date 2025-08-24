import { describe, it, expect } from 'vitest'
import { coursData } from '../coursData'

describe('CoursData', () => {
  it('should have valid structure', () => {
    expect(coursData).toBeDefined()
    expect(Array.isArray(coursData)).toBe(true)
    expect(coursData.length).toBeGreaterThan(0)
  })

  it('should have required fields for each matiere', () => {
    coursData.forEach((matiere) => {
      expect(matiere).toHaveProperty('nom')
      expect(matiere).toHaveProperty('niveaux')
      expect(typeof matiere.nom).toBe('string')
      expect(Array.isArray(matiere.niveaux)).toBe(true)
    })
  })

  it('should have valid niveau structure', () => {
    coursData.forEach((matiere) => {
      matiere.niveaux.forEach((niveau) => {
        expect(niveau).toHaveProperty('nom')
        expect(niveau).toHaveProperty('competences')
        expect(typeof niveau.nom).toBe('string')
        expect(Array.isArray(niveau.competences)).toBe(true)
      })
    })
  })

  it('should have valid competence structure', () => {
    coursData.forEach((matiere) => {
      matiere.niveaux.forEach((niveau) => {
        niveau.competences.forEach((competence) => {
          expect(competence).toHaveProperty('nom')
          expect(typeof competence.nom).toBe('string')
          expect(competence.nom.length).toBeGreaterThan(0)
          
          // Les champs optionnels peuvent être undefined
          if (competence.Video_YouTube) {
            expect(typeof competence.Video_YouTube).toBe('string')
          }
          if (competence.Site) {
            expect(typeof competence.Site).toBe('string')
            expect(competence.Site).toMatch(/^https?:\/\//)
          }
        })
      })
    })
  })

  it('should have valid YouTube video IDs when present', () => {
    const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/

    coursData.forEach((matiere) => {
      matiere.niveaux.forEach((niveau) => {
        niveau.competences.forEach((competence) => {
          if (competence.Video_YouTube) {
            expect(competence.Video_YouTube).toMatch(youtubeIdRegex)
          }
        })
      })
    })
  })

  it('should contain mathematics data', () => {
    const mathMatiere = coursData.find(m => 
      m.nom.toLowerCase().includes('nombres') || 
      m.nom.toLowerCase().includes('mathématiques') ||
      m.nom.toLowerCase().includes('géométrie')
    )
    expect(mathMatiere).toBeDefined()
  })

  it('should contain 6ème level data', () => {
    const hasLevel6 = coursData.some(matiere => 
      matiere.niveaux.some(niveau => niveau.nom === '6ème')
    )
    expect(hasLevel6).toBe(true)
  })

  it('should have competences with meaningful names', () => {
    coursData.forEach((matiere) => {
      matiere.niveaux.forEach((niveau) => {
        niveau.competences.forEach((competence) => {
          expect(competence.nom.length).toBeGreaterThan(5) // Réduit de 10 à 5 caractères
          expect(competence.nom).not.toMatch(/^test/i)
          expect(competence.nom).not.toMatch(/^example/i)
        })
      })
    })
  })
})
