import { describe, it, expect } from 'vitest'
import { additionSoustraction6eme } from '../data/mathematiques/6ieme/addition-soustraction.js'
import { multiplication6eme } from '../data/mathematiques/6ieme/multiplication.js'
import { division6eme } from '../data/mathematiques/6ieme/division.js'
import { figuresPlanes6eme } from '../data/mathematiques/6ieme/figures-planes.js'
import { perimetre6eme } from '../data/mathematiques/6ieme/perimetre.js'
import { fractions6eme } from '../data/mathematiques/6ieme/fractions.js'

describe('Mathématiques 6ème - Nouveaux sujets', () => {
  const subjects = [
    { name: 'Addition et soustraction', data: additionSoustraction6eme },
    { name: 'Multiplication', data: multiplication6eme },
    { name: 'Division', data: division6eme },
    { name: 'Figures planes', data: figuresPlanes6eme },
    { name: 'Périmètre', data: perimetre6eme },
    { name: 'Fractions', data: fractions6eme }
  ]

  describe('Structure générale', () => {
    subjects.forEach(({ name, data }) => {
      describe(`${name}`, () => {
        it('should have required top-level properties', () => {
          expect(data).toBeDefined()
          expect(data).toHaveProperty('niveau')
          expect(data).toHaveProperty('chapitre')
          expect(data).toHaveProperty('sousChapitre')
          expect(data).toHaveProperty('competences')
          
          expect(data.niveau).toBe('6ème')
          expect(typeof data.chapitre).toBe('string')
          expect(typeof data.sousChapitre).toBe('string')
          expect(Array.isArray(data.competences)).toBe(true)
          expect(data.competences.length).toBeGreaterThan(0)
        })

        it('should have valid competences structure', () => {
          data.competences.forEach((competence, index) => {
            expect(competence, `competence ${index} should have id`).toHaveProperty('id')
            expect(competence, `competence ${index} should have titre`).toHaveProperty('titre')
            
            // Première compétence : structure détaillée
            if (index === 0) {
              expect(competence, `competence ${index} should have objectif`).toHaveProperty('objectif')
              expect(competence, `competence ${index} should have cours`).toHaveProperty('cours')
              expect(competence, `competence ${index} should have etapes`).toHaveProperty('etapes')
              expect(competence, `competence ${index} should have exemple`).toHaveProperty('exemple')
              expect(competence, `competence ${index} should have exercices`).toHaveProperty('exercices')
              // Champs de compatibilité
              expect(competence, `competence ${index} should have description`).toHaveProperty('description')
              expect(competence, `competence ${index} should have ressources`).toHaveProperty('ressources')
              expect(competence, `competence ${index} should have quizId`).toHaveProperty('quizId')
            } else {
              // Compétences suivantes : structure simple
              expect(competence, `competence ${index} should have description`).toHaveProperty('description')
              expect(competence, `competence ${index} should have ressources`).toHaveProperty('ressources')
              expect(competence, `competence ${index} should have quizId`).toHaveProperty('quizId')
            }
            expect(competence, `competence ${index} should have ressources`).toHaveProperty('ressources')
            expect(competence, `competence ${index} should have quizId`).toHaveProperty('quizId')

            // Vérification des types
            expect(typeof competence.id).toBe('string')
            expect(typeof competence.titre).toBe('string')
            if (index === 0) {
              expect(typeof competence.objectif).toBe('string')
              expect(typeof competence.cours).toBe('string')
              expect(typeof competence.exemple).toBe('string')
              expect(Array.isArray(competence.etapes)).toBe(true)
              expect(Array.isArray(competence.exercices)).toBe(true)
            } else {
              expect(typeof competence.description).toBe('string')
            }
            expect(typeof competence.quizId).toBe('string')
            expect(Array.isArray(competence.ressources)).toBe(true)
          })
        })

        it('should have valid etapes structure', () => {
          data.competences.forEach((competence, compIndex) => {
            // Les étapes ne sont obligatoires que pour la première compétence (détaillée)
            if (compIndex === 0 && competence.etapes) {
              competence.etapes.forEach((etape, etapeIndex) => {
                expect(etape, `competence ${compIndex}, etape ${etapeIndex} should have titre`).toHaveProperty('titre')
                expect(etape, `competence ${compIndex}, etape ${etapeIndex} should have comment`).toHaveProperty('comment')
                expect(etape, `competence ${compIndex}, etape ${etapeIndex} should have exemple`).toHaveProperty('exemple')

                expect(typeof etape.titre).toBe('string')
                expect(typeof etape.comment).toBe('string')
                expect(typeof etape.exemple).toBe('string')
                expect(etape.titre.length).toBeGreaterThan(0)
                expect(etape.comment.length).toBeGreaterThan(0)
                expect(etape.exemple.length).toBeGreaterThan(0)
              })
            }
          })
        })

        it('should have valid exercices structure', () => {
          data.competences.forEach((competence, compIndex) => {
            // Les exercices ne sont obligatoires que pour la première compétence (détaillée)
            if (compIndex === 0 && competence.exercices) {
              expect(competence.exercices.length).toBeGreaterThan(0, `competence ${compIndex} should have at least one exercice`)
              
              competence.exercices.forEach((exercice, exIndex) => {
                expect(exercice, `competence ${compIndex}, exercice ${exIndex} should have type`).toHaveProperty('type')
                expect(exercice, `competence ${compIndex}, exercice ${exIndex} should have question`).toHaveProperty('question')
                expect(exercice, `competence ${compIndex}, exercice ${exIndex} should have reponse`).toHaveProperty('reponse')
                expect(exercice, `competence ${compIndex}, exercice ${exIndex} should have points`).toHaveProperty('points')

                expect(typeof exercice.type).toBe('string')
                expect(typeof exercice.question).toBe('string')
                expect(typeof exercice.reponse).toBe('string')
                expect(typeof exercice.points).toBe('number')
                
                expect(['débutant', 'intermédiaire', 'avancé']).toContain(exercice.type)
                expect(exercice.points).toBeGreaterThan(0)
                expect(exercice.question.length).toBeGreaterThan(0)
                expect(exercice.reponse.length).toBeGreaterThan(0)
              })
            }
          })
        })

        it('should have valid ressources structure', () => {
          data.competences.forEach((competence, compIndex) => {
            competence.ressources.forEach((ressource, resIndex) => {
              expect(ressource, `competence ${compIndex}, ressource ${resIndex} should have type`).toHaveProperty('type')
              expect(ressource, `competence ${compIndex}, ressource ${resIndex} should have titre`).toHaveProperty('titre')
              expect(ressource, `competence ${compIndex}, ressource ${resIndex} should have url`).toHaveProperty('url')

              expect(typeof ressource.type).toBe('string')
              expect(typeof ressource.titre).toBe('string')
              expect(typeof ressource.url).toBe('string')
              
              expect(['vidéo', 'exercice', 'fiches', 'jeu']).toContain(ressource.type)
              expect(ressource.url).toMatch(/^https?:\/\//)
            })
          })
        })

        it('should have unique competence IDs', () => {
          const ids = data.competences.map(comp => comp.id)
          const uniqueIds = [...new Set(ids)]
          expect(ids.length).toBe(uniqueIds.length, 'All competence IDs should be unique')
        })

        it('should have consistent ID format', () => {
          data.competences.forEach((competence) => {
            // Format attendu : 6XX-YY-Z (6ème, code chapitre, numéro)
            expect(competence.id).toMatch(/^6[A-Z]{2}-[A-Z]{2,3}-\d+$/, 
              `ID ${competence.id} should follow format 6XX-YY-Z`)
          })
        })
      })
    })
  })

  describe('Contenu spécifique par sujet', () => {
    it('Addition et soustraction - should have calculation-focused content', () => {
      expect(additionSoustraction6eme.sousChapitre).toBe('Addition et soustraction')
      expect(additionSoustraction6eme.chapitre).toBe('Nombres & Calculs')
      
      // Vérifier qu'il y a des compétences sur addition, soustraction et problèmes
      const titres = additionSoustraction6eme.competences.map(c => c.titre.toLowerCase())
      expect(titres.some(t => t.includes('addition'))).toBe(true)
      expect(titres.some(t => t.includes('soustraction'))).toBe(true)
      expect(titres.some(t => t.includes('problème'))).toBe(true)
    })

    it('Multiplication - should have multiplication-focused content', () => {
      expect(multiplication6eme.sousChapitre).toBe('Multiplication')
      expect(multiplication6eme.chapitre).toBe('Nombres & Calculs')
      
      const titres = multiplication6eme.competences.map(c => c.titre.toLowerCase())
      expect(titres.some(t => t.includes('table'))).toBe(true)
      expect(titres.some(t => t.includes('multiplication'))).toBe(true)
    })

    it('Division - should have division-focused content', () => {
      expect(division6eme.sousChapitre).toBe('Division')
      expect(division6eme.chapitre).toBe('Nombres & Calculs')
      
      const titres = division6eme.competences.map(c => c.titre.toLowerCase())
      expect(titres.some(t => t.includes('division'))).toBe(true)
      expect(titres.some(t => t.includes('euclidienne') || t.includes('décimale'))).toBe(true)
    })

    it('Figures planes - should have geometry-focused content', () => {
      expect(figuresPlanes6eme.sousChapitre).toBe('Figures planes')
      expect(figuresPlanes6eme.chapitre).toBe('Géométrie')
      
      const titres = figuresPlanes6eme.competences.map(c => c.titre.toLowerCase())
      expect(titres.some(t => t.includes('triangle'))).toBe(true)
      expect(titres.some(t => t.includes('quadrilatère') || t.includes('carré') || t.includes('rectangle'))).toBe(true)
      expect(titres.some(t => t.includes('cercle'))).toBe(true)
    })

    it('Périmètre - should have measurement-focused content', () => {
      expect(perimetre6eme.sousChapitre).toBe('Périmètre')
      expect(perimetre6eme.chapitre).toBe('Grandeurs & Mesures')
      
      const titres = perimetre6eme.competences.map(c => c.titre.toLowerCase())
      expect(titres.some(t => t.includes('périmètre'))).toBe(true)
      expect(titres.some(t => t.includes('polygone') || t.includes('carré') || t.includes('rectangle'))).toBe(true)
      expect(titres.some(t => t.includes('cercle') || t.includes('circonférence'))).toBe(true)
    })
  })

  describe('Cohérence pédagogique', () => {
    subjects.forEach(({ name, data }) => {
      describe(`${name}`, () => {
        it('should have progressive difficulty in exercises', () => {
          data.competences.forEach((competence) => {
            const types = competence.exercices.map(ex => ex.type)
            const typeOrder = ['débutant', 'intermédiaire', 'avancé']
            
            // Vérifier qu'on a au moins débutant
            expect(types).toContain('débutant')
            
            // Si on a plusieurs niveaux, vérifier l'ordre des points
            if (types.length > 1) {
              const points = competence.exercices.map(ex => ex.points)
              for (let i = 1; i < points.length; i++) {
                expect(points[i]).toBeGreaterThanOrEqual(points[i-1], 
                  'Exercise points should increase with difficulty')
              }
            }
          })
        })

        it('should have meaningful examples', () => {
          data.competences.forEach((competence) => {
            expect(competence.exemple).not.toBe('')
            expect(competence.exemple.length).toBeGreaterThan(10, 'Examples should be descriptive')
            
            competence.etapes.forEach((etape) => {
              expect(etape.exemple).not.toBe('')
              expect(etape.exemple.length).toBeGreaterThan(5, 'Step examples should be concrete')
            })
          })
        })

        it('should have diverse resource types', () => {
          const allResourceTypes = new Set()
          data.competences.forEach((competence) => {
            competence.ressources.forEach((ressource) => {
              allResourceTypes.add(ressource.type)
            })
          })
          
          expect(allResourceTypes.size).toBeGreaterThan(1, 
            'Should have multiple types of resources')
        })
      })
    })
  })
})
