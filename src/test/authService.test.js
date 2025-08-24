import { describe, it, expect, vi, beforeEach } from 'vitest'
import { signInWithGoogle, logOut, onAuthChange } from '../authService'

// Mock Firebase auth
vi.mock('../firebase', () => ({
  auth: {
    currentUser: null,
  }
}))

vi.mock('firebase/auth', () => ({
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}))

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signInWithGoogle', () => {
    it('should successfully sign in with Google', async () => {
      const mockUser = { uid: 'test-user', email: 'test@example.com' }
      const { signInWithPopup } = await import('firebase/auth')
      signInWithPopup.mockResolvedValue({ user: mockUser })

      const result = await signInWithGoogle()
      
      expect(result).toEqual(mockUser)
      expect(signInWithPopup).toHaveBeenCalledTimes(1)
    })

    it('should handle sign in error', async () => {
      const mockError = new Error('Sign in failed')
      const { signInWithPopup } = await import('firebase/auth')
      signInWithPopup.mockRejectedValue(mockError)

      await expect(signInWithGoogle()).rejects.toThrow('Sign in failed')
    })
  })

  describe('logOut', () => {
    it('should successfully log out', async () => {
      const { signOut } = await import('firebase/auth')
      signOut.mockResolvedValue()

      await logOut()
      
      expect(signOut).toHaveBeenCalledTimes(1)
    })

    it('should handle logout error', async () => {
      const mockError = new Error('Logout failed')
      const { signOut } = await import('firebase/auth')
      signOut.mockRejectedValue(mockError)

      await expect(logOut()).rejects.toThrow('Logout failed')
    })
  })

  describe('onAuthChange', () => {
    it('should set up auth state listener', async () => {
      const { onAuthStateChanged } = await import('firebase/auth')
      const mockCallback = vi.fn()
      
      onAuthChange(mockCallback)
      
      expect(onAuthStateChanged).toHaveBeenCalledWith(
        expect.anything(),
        mockCallback
      )
    })
  })
})
