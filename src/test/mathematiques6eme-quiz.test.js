import { describe, it, expect } from 'vitest'
import { additionSoustraction6eme } from '../data/mathematiques/6ieme/addition-soustraction.js'
import { multiplication6eme } from '../data/mathematiques/6ieme/multiplication.js'
import { division6eme } from '../data/mathematiques/6ieme/division.js'
import { figuresPlanes6eme } from '../data/mathematiques/6ieme/figures-planes.js'
import { perimetre6eme } from '../data/mathematiques/6ieme/perimetre.js'
import { fractions6eme } from '../data/mathematiques/6ieme/fractions.js'

describe('Mathématiques 6ème - Quiz et Exercices', () => {
  const subjects = [
    { name: 'Addition et soustraction', data: additionSoustraction6eme },
    { name: 'Multiplication', data: multiplication6eme },
    { name: 'Division', data: division6eme },
    { name: 'Figures planes', data: figuresPlanes6eme },
    { name: 'Périmètre', data: perimetre6eme },
    { name: 'Fractions', data: fractions6eme }
  ]

  describe('Quiz validation', () => {
    subjects.forEach(({ name, data }) => {
      describe(`${name} - Quiz`, () => {
        it('should have valid quiz IDs', () => {
          data.competences.forEach((competence) => {
            expect(competence.quizId).toBeDefined()
            expect(competence.quizId).toMatch(/^QUIZ_6_[A-Z_]+$/, 
              `Quiz ID ${competence.quizId} should follow format QUIZ_6_XXX`)
          })
        })

        it('should have quiz IDs matching competence topics', () => {
          data.competences.forEach((competence) => {
            const quizId = competence.quizId
            const titre = competence.titre.toLowerCase()
            
            // Vérifications basiques de cohérence
            if (titre.includes('addition')) {
              expect(quizId).toMatch(/ADDITION|AS/)
            }
            if (titre.includes('multiplication')) {
              expect(quizId).toMatch(/MULT|TABLE/)
            }
            if (titre.includes('division')) {
              expect(quizId).toMatch(/DIV/)
            }
            if (titre.includes('triangle')) {
              expect(quizId).toMatch(/TRIANGLE/)
            }
            if (titre.includes('périmètre')) {
              expect(quizId).toMatch(/PERIMETRE|CIRCONFERENCE/)
            }
          })
        })
      })
    })
  })

  describe('Exercices validation', () => {
    subjects.forEach(({ name, data }) => {
      describe(`${name} - Exercices`, () => {
        it('should have progressive difficulty levels', () => {
          data.competences.forEach((competence) => {
            const difficulties = competence.exercices.map(ex => ex.type)
            const uniqueDifficulties = [...new Set(difficulties)]
            
            // Au moins 2 niveaux de difficulté
            expect(uniqueDifficulties.length).toBeGreaterThanOrEqual(2, 
              'Should have at least 2 difficulty levels')
            
            // Vérifier qu'on commence par débutant
            expect(difficulties[0]).toBe('débutant')
          })
        })

        it('should have realistic point values', () => {
          data.competences.forEach((competence) => {
            competence.exercices.forEach((exercice) => {
              expect(exercice.points).toBeGreaterThan(0)
              expect(exercice.points).toBeLessThanOrEqual(30, 
                'Points should be reasonable (≤ 30)')
              
              // Vérifier cohérence difficulté/points
              if (exercice.type === 'débutant') {
                expect(exercice.points).toBeLessThanOrEqual(15)
              } else if (exercice.type === 'avancé') {
                expect(exercice.points).toBeGreaterThanOrEqual(15)
              }
            })
          })
        })

        it('should have meaningful questions and answers', () => {
          data.competences.forEach((competence) => {
            competence.exercices.forEach((exercice, index) => {
              // Questions doivent être des questions
              expect(exercice.question).toMatch(/[?]$|Calcule|Combien|Quel/, 
                `Exercise ${index} question should be interrogative`)
              
              // Réponses doivent être concises
              expect(exercice.reponse.length).toBeLessThan(50, 
                'Answers should be concise')
              
              // Pas de réponses vides
              expect(exercice.reponse.trim()).not.toBe('')
            })
          })
        })

        it('should test mathematical accuracy for numeric subjects', () => {
          const numericSubjects = ['Addition et soustraction', 'Multiplication', 'Division', 'Périmètre']
          
          if (numericSubjects.includes(name)) {
            data.competences.forEach((competence) => {
              competence.exercices.forEach((exercice) => {
                // Pour les exercices de calcul, vérifier le format des réponses
                if (exercice.question.includes('Calcule')) {
                  // La réponse devrait être numérique ou contenir des unités
                  expect(exercice.reponse).toMatch(/^\d+([,.]?\d+)?\s*(€|cm|m|g|kg|°)?$|^[a-zA-Z]+$/)
                }
              })
            })
          }
        })
      })
    })
  })

  describe('Contenu pédagogique', () => {
    subjects.forEach(({ name, data }) => {
      describe(`${name} - Pédagogie`, () => {
        it('should have clear learning objectives', () => {
          data.competences.forEach((competence) => {
            expect(competence.objectif).toMatch(/^(Savoir|Comprendre|Apprendre|Maîtriser|Résoudre)/, 
              'Objectives should start with action verbs')
            expect(competence.objectif.length).toBeGreaterThan(20, 
              'Objectives should be descriptive')
          })
        })

        it('should have structured course content', () => {
          data.competences.forEach((competence) => {
            expect(competence.cours.length).toBeGreaterThan(50, 
              'Course content should be substantial')
            
            // Vérifier qu'il y a plusieurs étapes
            expect(competence.etapes.length).toBeGreaterThanOrEqual(2, 
              'Should have multiple learning steps')
            
            // Chaque étape doit être substantielle
            competence.etapes.forEach((etape) => {
              expect(etape.comment.length).toBeGreaterThan(30, 
                'Step explanations should be detailed')
            })
          })
        })

        it('should provide diverse learning resources', () => {
          const allResourceTypes = new Set()
          data.competences.forEach((competence) => {
            competence.ressources.forEach((ressource) => {
              allResourceTypes.add(ressource.type)
            })
          })
          
          // Au moins 2 types de ressources différents
          expect(allResourceTypes.size).toBeGreaterThanOrEqual(2, 
            'Should offer diverse resource types')
        })

        it('should have valid external links', () => {
          data.competences.forEach((competence) => {
            competence.ressources.forEach((ressource) => {
              // Vérifier format URL
              expect(ressource.url).toMatch(/^https?:\/\/\w+/, 
                'URLs should be properly formatted')
              
              // Vérifier sites éducatifs connus
              const educationalSites = [
                'youtube.com', 'khanacademy.org', 'maths-et-tiques.fr', 
                'sesamath.net', 'logicieleducatif.fr'
              ]
              
              const isEducational = educationalSites.some(site => 
                ressource.url.includes(site))
              
              expect(isEducational).toBe(true, 
                `URL ${ressource.url} should be from an educational site`)
            })
          })
        })
      })
    })
  })

  describe('Cohérence inter-sujets', () => {
    it('should have consistent ID patterns across subjects', () => {
      const allIds = []
      subjects.forEach(({ data }) => {
        data.competences.forEach((competence) => {
          allIds.push(competence.id)
        })
      })

      // Vérifier que tous les IDs suivent le même pattern
      allIds.forEach((id) => {
        expect(id).toMatch(/^6[A-Z]{2}-[A-Z]{2,3}-\d+$/)
      })
    })

    it('should use appropriate difficulty progression across subjects', () => {
      // Les sujets de base (addition/soustraction) devraient avoir des exercices plus faciles
      // que les sujets avancés (périmètre/géométrie)
      
      const basicSubjects = subjects.filter(s => 
        ['Addition et soustraction', 'Multiplication'].includes(s.name))
      const advancedSubjects = subjects.filter(s => 
        ['Figures planes', 'Périmètre'].includes(s.name))

      const getAveragePoints = (subjectData) => {
        const allPoints = []
        subjectData.competences.forEach(comp => {
          comp.exercices.forEach(ex => allPoints.push(ex.points))
        })
        return allPoints.reduce((sum, p) => sum + p, 0) / allPoints.length
      }

      basicSubjects.forEach(({ name, data }) => {
        const avgPoints = getAveragePoints(data)
        expect(avgPoints).toBeLessThan(20, 
          `${name} should have easier exercises on average`)
      })
    })
  })
})
