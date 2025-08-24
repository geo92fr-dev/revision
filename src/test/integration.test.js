import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { coursData } from '../coursData'
import { validateCoursData, findCompetence } from '../utils/helpers'

describe('Integration Tests', () => {
  describe('Data Integrity', () => {
    it('should have valid course data structure', () => {
      expect(validateCoursData(coursData)).toBe(true)
    })

    it('should be able to find competences in real data', () => {
      // Tester avec des données réelles
      const mathData = coursData.filter(m => 
        m.nom.toLowerCase().includes('nombres') || 
        m.nom.toLowerCase().includes('géométrie')
      )
      
      expect(mathData.length).toBeGreaterThan(0)
      
      mathData.forEach(matiere => {
        matiere.niveaux.forEach(niveau => {
          niveau.competences.forEach(competence => {
            const found = findCompetence(
              coursData,
              competence.nom,
              'Mathématiques',
              niveau.nom
            )
            expect(found).toBeTruthy()
            expect(found.competence.nom).toBe(competence.nom)
          })
        })
      })
    })

    it('should have valid YouTube IDs in course data', () => {
      const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/
      let videoCount = 0
      
      coursData.forEach(matiere => {
        matiere.niveaux.forEach(niveau => {
          niveau.competences.forEach(competence => {
            if (competence.Video_YouTube) {
              videoCount++
              expect(competence.Video_YouTube).toMatch(youtubeIdRegex)
            }
          })
        })
      })
      
      // S'assurer qu'il y a au moins quelques vidéos
      expect(videoCount).toBeGreaterThan(0)
    })

    it('should have valid site URLs in course data', () => {
      const urlRegex = /^https?:\/\/.+/
      let siteCount = 0
      
      coursData.forEach(matiere => {
        matiere.niveaux.forEach(niveau => {
          niveau.competences.forEach(competence => {
            if (competence.Site) {
              siteCount++
              expect(competence.Site).toMatch(urlRegex)
            }
          })
        })
      })
      
      // S'assurer qu'il y a au moins quelques sites
      expect(siteCount).toBeGreaterThan(0)
    })
  })

  describe('Component Integration', () => {
    it('should handle complete user flow from data to display', () => {
      // Cette test simule un flux complet avec de vraies données
      const firstMatiere = coursData[0]
      const firstNiveau = firstMatiere.niveaux[0]
      const firstCompetence = firstNiveau.competences[0]
      
      expect(firstMatiere.nom).toBeDefined()
      expect(firstNiveau.nom).toBeDefined()
      expect(firstCompetence.nom).toBeDefined()
      
      // Test de recherche de compétence
      const found = findCompetence(
        coursData,
        firstCompetence.nom,
        'Mathématiques',
        firstNiveau.nom
      )
      
      expect(found).toBeTruthy()
      expect(found.competence).toEqual(firstCompetence)
    })
  })

  describe('Error Handling', () => {
    it('should handle missing data gracefully', () => {
      const emptyData = []
      expect(validateCoursData(emptyData)).toBe(true) // Empty array is valid
      
      const result = findCompetence(emptyData, 'test', 'Math', '6ème')
      expect(result).toBeNull()
    })

    it('should handle malformed data', () => {
      const malformedData = [
        {
          nom: 'Test',
          // niveaux manquant
        }
      ]
      
      expect(validateCoursData(malformedData)).toBe(false)
    })
  })

  describe('Performance', () => {
    it('should handle large datasets efficiently', () => {
      const startTime = performance.now()
      
      // Simuler une recherche dans toutes les compétences
      let foundCount = 0
      coursData.forEach(matiere => {
        matiere.niveaux.forEach(niveau => {
          niveau.competences.forEach(competence => {
            const found = findCompetence(
              coursData,
              competence.nom,
              'Mathématiques',
              niveau.nom
            )
            if (found) foundCount++
          })
        })
      })
      
      const endTime = performance.now()
      const duration = endTime - startTime
      
      // La recherche devrait prendre moins de 100ms
      expect(duration).toBeLessThan(100)
      expect(foundCount).toBeGreaterThan(0)
    })
  })
})
