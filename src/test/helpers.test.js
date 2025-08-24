import { describe, it, expect } from 'vitest'
import {
  getYouTubeEmbedUrl,
  generateCoursId,
  validateCoursData,
  findCompetence,
  formatUserName
} from '../utils/helpers'

describe('Helpers Utilities', () => {
  describe('getYouTubeEmbedUrl', () => {
    it('should convert YouTube watch URL to embed URL', () => {
      const watchUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      const result = getYouTubeEmbedUrl(watchUrl)
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
    })

    it('should convert youtu.be URL to embed URL', () => {
      const shortUrl = 'https://youtu.be/dQw4w9WgXcQ'
      const result = getYouTubeEmbedUrl(shortUrl)
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
    })

    it('should handle video ID directly', () => {
      const videoId = 'dQw4w9WgXcQ'
      const result = getYouTubeEmbedUrl(videoId)
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
    })

    it('should return same URL if already embed format', () => {
      const embedUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      const result = getYouTubeEmbedUrl(embedUrl)
      expect(result).toBe(embedUrl)
    })

    it('should return null for invalid input', () => {
      expect(getYouTubeEmbedUrl(null)).toBeNull()
      expect(getYouTubeEmbedUrl('')).toBeNull()
      expect(getYouTubeEmbedUrl(undefined)).toBeNull()
    })

    it('should handle URLs with additional parameters', () => {
      const urlWithParams = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s'
      const result = getYouTubeEmbedUrl(urlWithParams)
      expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
    })
  })

  describe('generateCoursId', () => {
    it('should convert normal text to kebab-case', () => {
      const text = 'Utiliser et représenter les grands nombres'
      const result = generateCoursId(text)
      expect(result).toBe('utiliser-et-representer-les-grands-nombres')
    })

    it('should remove accents', () => {
      const text = 'Comprendre les fractions décimales'
      const result = generateCoursId(text)
      expect(result).toBe('comprendre-les-fractions-decimales')
    })

    it('should handle special characters', () => {
      const text = 'Test & évaluation (partie 1)'
      const result = generateCoursId(text)
      expect(result).toBe('test-evaluation-partie-1')
    })

    it('should handle empty or invalid input', () => {
      expect(generateCoursId('')).toBe('')
      expect(generateCoursId(null)).toBe('')
      expect(generateCoursId(undefined)).toBe('')
      expect(generateCoursId(123)).toBe('')
    })

    it('should handle multiple spaces and dashes', () => {
      const text = 'Test   avec    espaces  multiples'
      const result = generateCoursId(text)
      expect(result).toBe('test-avec-espaces-multiples')
    })
  })

  describe('validateCoursData', () => {
    it('should validate correct structure', () => {
      const validData = [
        {
          nom: 'Mathématiques',
          niveaux: [
            {
              nom: '6ème',
              competences: [
                { nom: 'Compétence 1' },
                { nom: 'Compétence 2' }
              ]
            }
          ]
        }
      ]
      expect(validateCoursData(validData)).toBe(true)
    })

    it('should reject invalid structure', () => {
      expect(validateCoursData(null)).toBe(false)
      expect(validateCoursData(undefined)).toBe(false)
      expect(validateCoursData({})).toBe(false)
      expect(validateCoursData('string')).toBe(false)
    })

    it('should reject missing required fields', () => {
      const invalidData = [
        {
          // nom manquant
          niveaux: []
        }
      ]
      expect(validateCoursData(invalidData)).toBe(false)
    })

    it('should reject invalid competence structure', () => {
      const invalidData = [
        {
          nom: 'Math',
          niveaux: [
            {
              nom: '6ème',
              competences: [
                { /* nom manquant */ }
              ]
            }
          ]
        }
      ]
      expect(validateCoursData(invalidData)).toBe(false)
    })
  })

  describe('findCompetence', () => {
    const mockData = [
      {
        nom: 'Nombres & calculs',
        niveaux: [
          {
            nom: '6ème',
            competences: [
              { nom: 'Utiliser les nombres entiers' }
            ]
          }
        ]
      }
    ]

    it('should find competence by exact name match', () => {
      const result = findCompetence(
        mockData,
        'Utiliser les nombres entiers',
        'Mathématiques',
        '6ème'
      )
      expect(result).toBeTruthy()
      expect(result.competence.nom).toBe('Utiliser les nombres entiers')
    })

    it('should find competence by generated ID', () => {
      const result = findCompetence(
        mockData,
        'utiliser-les-nombres-entiers',
        'Mathématiques',
        '6ème'
      )
      expect(result).toBeTruthy()
      expect(result.competence.nom).toBe('Utiliser les nombres entiers')
    })

    it('should return null for missing parameters', () => {
      expect(findCompetence(null, 'id', 'subject', 'level')).toBeNull()
      expect(findCompetence(mockData, null, 'subject', 'level')).toBeNull()
      expect(findCompetence(mockData, 'id', null, 'level')).toBeNull()
      expect(findCompetence(mockData, 'id', 'subject', null)).toBeNull()
    })

    it('should return null when competence not found', () => {
      const result = findCompetence(
        mockData,
        'nonexistent-competence',
        'Mathématiques',
        '6ème'
      )
      expect(result).toBeNull()
    })
  })

  describe('formatUserName', () => {
    it('should return displayName if available', () => {
      const user = {
        displayName: 'John Doe',
        email: 'john@example.com'
      }
      expect(formatUserName(user)).toBe('John Doe')
    })

    it('should return email prefix if no displayName', () => {
      const user = {
        email: 'john.doe@example.com'
      }
      expect(formatUserName(user)).toBe('john.doe')
    })

    it('should return default for null user', () => {
      expect(formatUserName(null)).toBe('Utilisateur')
      expect(formatUserName(undefined)).toBe('Utilisateur')
    })

    it('should return default for user without name or email', () => {
      const user = { uid: '123' }
      expect(formatUserName(user)).toBe('Utilisateur')
    })
  })
})
