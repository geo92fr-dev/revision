import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../App'

// Mock des composants
vi.mock('../components/HomePage', () => ({
  default: ({ user, onLogin, onRevisions }) => (
    <div data-testid="homepage">
      HomePage - User: {user ? user.email : 'Not logged in'}
      <button onClick={onLogin}>Login</button>
      <button onClick={onRevisions}>Revisions</button>
    </div>
  )
}))

vi.mock('../components/Revisions', () => ({
  default: ({ onBack, onCours }) => (
    <div data-testid="revisions">
      Revisions Page
      <button onClick={onBack}>Back</button>
      <button onClick={() => onCours('test-cours', 'Math', '6ème')}>View Course</button>
    </div>
  )
}))

vi.mock('../components/CoursComponent', () => ({
  default: ({ coursId, subject, level, onBack }) => (
    <div data-testid="cours">
      Course: {coursId} - {subject} - {level}
      <button onClick={onBack}>Back to Revisions</button>
    </div>
  )
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render HomePage by default', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByTestId('homepage')).toBeInTheDocument()
    })
  })

  it('should show loading state initially', () => {
    render(<App />)
    
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument()
  })

  it('should navigate to revisions page', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByTestId('homepage')).toBeInTheDocument()
    })
    
    const revisionsButton = screen.getByText('Revisions')
    fireEvent.click(revisionsButton)
    
    expect(screen.getByTestId('revisions')).toBeInTheDocument()
  })

  it('should navigate to course page', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByTestId('homepage')).toBeInTheDocument()
    })
    
    // Aller aux révisions
    const revisionsButton = screen.getByText('Revisions')
    fireEvent.click(revisionsButton)
    
    // Aller au cours
    const courseButton = screen.getByText('View Course')
    fireEvent.click(courseButton)
    
    expect(screen.getByTestId('cours')).toBeInTheDocument()
    expect(screen.getByText(/Course: test-cours - Math - 6ème/)).toBeInTheDocument()
  })

  it('should navigate back from course to revisions', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByTestId('homepage')).toBeInTheDocument()
    })
    
    // Naviguer vers cours
    fireEvent.click(screen.getByText('Revisions'))
    fireEvent.click(screen.getByText('View Course'))
    
    // Retourner aux révisions
    const backButton = screen.getByText('Back to Revisions')
    fireEvent.click(backButton)
    
    expect(screen.getByTestId('revisions')).toBeInTheDocument()
  })

  it('should navigate back from revisions to home', async () => {
    render(<App />)
    
    await waitFor(() => {
      expect(screen.getByTestId('homepage')).toBeInTheDocument()
    })
    
    // Aller aux révisions
    fireEvent.click(screen.getByText('Revisions'))
    
    // Retourner à l'accueil
    const backButton = screen.getByText('Back')
    fireEvent.click(backButton)
    
    expect(screen.getByTestId('homepage')).toBeInTheDocument()
  })
})
