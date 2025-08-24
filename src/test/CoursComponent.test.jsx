import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CoursComponent from '../components/CoursComponent'

// Mock coursData
vi.mock('../coursData', () => ({
  coursData: [
    {
      nom: "Nombres & calculs",
      niveaux: [
        {
          nom: "6ème",
          competences: [
            {
              nom: "Utiliser et représenter les grands nombres entiers",
              Video_YouTube: "s_LDca9LEJE",
              Site: "https://example.com/cours"
            }
          ]
        }
      ]
    }
  ]
}))

describe('CoursComponent', () => {
  const mockProps = {
    coursId: "utiliser-et-représenter-les-grands-nombres-entiers",
    subject: "Mathématiques",
    level: "6ème",
    onBack: vi.fn(),
    onQuiz: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render course title', () => {
    render(<CoursComponent {...mockProps} />)
    
    expect(screen.getAllByText(/Utiliser et représenter les grands nombres entiers/i)[0]).toBeInTheDocument()
  })

  it('should render video section when YouTube ID is provided', () => {
    render(<CoursComponent {...mockProps} />)
    
    expect(screen.getByText(/Vidéo du cours/i)).toBeInTheDocument()
    const iframe = screen.getByTitle(/Cours:/i)
    expect(iframe).toBeInTheDocument()
    expect(iframe.src).toContain('youtube.com/embed/s_LDca9LEJE')
  })

  it('should render site reference when Site URL is provided', () => {
    render(<CoursComponent {...mockProps} />)
    
    expect(screen.getByText(/Cours en ligne complémentaire/i)).toBeInTheDocument()
    expect(screen.getByText(/Accéder au cours en ligne/i)).toBeInTheDocument()
  })

  it('should render back button', () => {
    render(<CoursComponent {...mockProps} />)
    
    const backButtons = screen.getAllByText(/Retour/i)
    expect(backButtons.length).toBeGreaterThan(0)
  })

  it('should render quiz button when onQuiz is provided', () => {
    render(<CoursComponent {...mockProps} />)
    
    expect(screen.getByText(/Faire le quiz/i)).toBeInTheDocument()
  })

  it('should show error when course is not found', () => {
    const invalidProps = {
      ...mockProps,
      coursId: "invalid-course-id"
    }
    
    render(<CoursComponent {...invalidProps} />)
    
    expect(screen.getByText(/Matière non trouvée/i)).toBeInTheDocument()
  })

  it('should show error when subject is not found', () => {
    const invalidProps = {
      ...mockProps,
      subject: "Invalid Subject"
    }
    
    render(<CoursComponent {...invalidProps} />)
    
    expect(screen.getByText(/Matière non trouvée/i)).toBeInTheDocument()
  })

  it('should handle YouTube URL conversion correctly', () => {
    render(<CoursComponent {...mockProps} />)
    
    const iframe = screen.getByTitle(/Cours:/i)
    expect(iframe.src).toBe('https://www.youtube.com/embed/s_LDca9LEJE')
  })
})
