import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />)
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument()
  })

  it('should show loading state initially', () => {
    render(<App />)
    
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument()
  })

  it('should render App with className', () => {
    const { container } = render(<App />)
    expect(container.firstChild).toHaveClass('App')
  })

  it('should handle component mounting', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('should have proper component structure', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.App')).toBeInTheDocument()
  })

  it('should initialize component state', () => {
    render(<App />)
    // Just test that component renders without state errors
    expect(screen.getByText(/Chargement/i)).toBeVisible()
  })
})
