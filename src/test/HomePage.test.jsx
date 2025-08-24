import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '../components/HomePage'

describe('HomePage Component', () => {
  const mockProps = {
    user: null,
    onLogin: vi.fn(),
    onLogout: vi.fn(),
    onDashboard: vi.fn(),
    onRevisions: vi.fn(),
    onQuiz: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render welcome message when user is not logged in', () => {
    render(<HomePage {...mockProps} />)
    
    expect(screen.getByText(/Bienvenue sur FunRevis/i)).toBeInTheDocument()
    expect(screen.getByText(/Se connecter avec Google/i)).toBeInTheDocument()
  })

  it('should render user dashboard when user is logged in', () => {
    const userProps = {
      ...mockProps,
      user: { uid: 'test-user', email: 'test@example.com', displayName: 'Test User' }
    }
    
    render(<HomePage {...userProps} />)
    
    expect(screen.getByText(/Test User/i)).toBeInTheDocument()
    expect(screen.getByText(/Révisions/i)).toBeInTheDocument()
    expect(screen.getByText(/Quiz/i)).toBeInTheDocument()
  })

  it('should call onLogin when login button is clicked', async () => {
    render(<HomePage {...mockProps} />)
    
    const loginButton = screen.getByText(/Se connecter avec Google/i)
    fireEvent.click(loginButton)
    
    expect(mockProps.onLogin).toHaveBeenCalled()
  })

  it('should call onRevisions when Révisions button is clicked', () => {
    const userProps = {
      ...mockProps,
      user: { uid: 'test-user', email: 'test@example.com' }
    }
    
    render(<HomePage {...userProps} />)
    
    const revisionsButton = screen.getByText(/Révisions/i)
    fireEvent.click(revisionsButton)
    
    expect(mockProps.onRevisions).toHaveBeenCalled()
  })

  it('should call onQuiz when Quiz button is clicked', () => {
    const userProps = {
      ...mockProps,
      user: { uid: 'test-user', email: 'test@example.com' }
    }
    
    render(<HomePage {...userProps} />)
    
    const quizButton = screen.getByText(/Quiz/i)
    fireEvent.click(quizButton)
    
    expect(mockProps.onQuiz).toHaveBeenCalled()
  })

  it('should display logout option when user is logged in', () => {
    const userProps = {
      ...mockProps,
      user: { uid: 'test-user', email: 'test@example.com' }
    }
    
    render(<HomePage {...userProps} />)
    
    expect(screen.getByText(/Déconnexion/i)).toBeInTheDocument()
  })
})
