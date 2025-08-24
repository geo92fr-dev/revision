import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Revisions from '../components/Revisions'

describe('Revisions Component', () => {
  const mockProps = {
    onBack: vi.fn(),
    onQuiz: vi.fn(),
    onCours: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render revisions title', () => {
    render(<Revisions {...mockProps} />)
    
    expect(screen.getByText(/Révisions/i)).toBeInTheDocument()
  })

  it('should render back button', () => {
    render(<Revisions {...mockProps} />)
    
    expect(screen.getByText(/← Retour/i)).toBeInTheDocument()
  })

  it('should call onBack when back button is clicked', () => {
    render(<Revisions {...mockProps} />)
    
    const backButton = screen.getByText(/← Retour/i)
    fireEvent.click(backButton)
    
    expect(mockProps.onBack).toHaveBeenCalled()
  })

  it('should render subject selection', () => {
    render(<Revisions {...mockProps} />)
    
    expect(screen.getByText(/Mathématiques/i)).toBeInTheDocument()
  })

  it('should render level selection when subject is selected', () => {
    render(<Revisions {...mockProps} />)
    
    // Sélectionner Mathématiques
    const mathButton = screen.getByText(/Mathématiques/i)
    fireEvent.click(mathButton)
    
    expect(screen.getByText(/6ème/i)).toBeInTheDocument()
  })

  it('should render competences when level is selected', () => {
    render(<Revisions {...mockProps} />)
    
    // Sélectionner Mathématiques
    const mathButton = screen.getByText(/Mathématiques/i)
    fireEvent.click(mathButton)
    
    // Sélectionner 6ème
    const level6Button = screen.getByText(/6ème/i)
    fireEvent.click(level6Button)
    
    // Vérifier qu'au moins une compétence est affichée
    expect(screen.getByText(/Voir le cours/i)).toBeInTheDocument()
    expect(screen.getByText(/Faire le quiz/i)).toBeInTheDocument()
  })

  it('should call onCours when "Voir le cours" is clicked', () => {
    render(<Revisions {...mockProps} />)
    
    // Naviguer jusqu'aux compétences
    fireEvent.click(screen.getByText(/Mathématiques/i))
    fireEvent.click(screen.getByText(/6ème/i))
    
    // Cliquer sur "Voir le cours"
    const coursButton = screen.getAllByText(/Voir le cours/i)[0]
    fireEvent.click(coursButton)
    
    expect(mockProps.onCours).toHaveBeenCalled()
  })

  it('should call onQuiz when "Faire le quiz" is clicked', () => {
    render(<Revisions {...mockProps} />)
    
    // Naviguer jusqu'aux compétences
    fireEvent.click(screen.getByText(/Mathématiques/i))
    fireEvent.click(screen.getByText(/6ème/i))
    
    // Cliquer sur "Faire le quiz"
    const quizButton = screen.getAllByText(/Faire le quiz/i)[0]
    fireEvent.click(quizButton)
    
    expect(mockProps.onQuiz).toHaveBeenCalled()
  })

  it('should show breadcrumb navigation', () => {
    render(<Revisions {...mockProps} />)
    
    // Naviguer jusqu'aux compétences
    fireEvent.click(screen.getByText(/Mathématiques/i))
    fireEvent.click(screen.getByText(/6ème/i))
    
    // Vérifier le breadcrumb
    expect(screen.getByText(/Mathématiques/i)).toBeInTheDocument()
    expect(screen.getByText(/6ème/i)).toBeInTheDocument()
  })

  it('should allow navigation back through breadcrumb', () => {
    render(<Revisions {...mockProps} />)
    
    // Naviguer jusqu'aux compétences
    fireEvent.click(screen.getByText(/Mathématiques/i))
    fireEvent.click(screen.getByText(/6ème/i))
    
    // Retourner en arrière via breadcrumb
    const breadcrumbMath = screen.getAllByText(/Mathématiques/i)[0]
    fireEvent.click(breadcrumbMath)
    
    // Vérifier qu'on est revenu à la sélection de niveau
    expect(screen.getByText(/6ème/i)).toBeInTheDocument()
  })
})
