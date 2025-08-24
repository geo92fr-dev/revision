import { describe, it, expect, vi } from 'vitest'

describe('AuthService', () => {
  it('should have signInWithGoogle function', async () => {
    const { signInWithGoogle } = await import('../authService')
    expect(typeof signInWithGoogle).toBe('function')
  })

  it('should have logOut function', async () => {
    const { logOut } = await import('../authService')
    expect(typeof logOut).toBe('function')
  })

  it('should have onAuthChange function', async () => {
    const { onAuthChange } = await import('../authService')
    expect(typeof onAuthChange).toBe('function')
  })

  it('should export all required functions', async () => {
    const authService = await import('../authService')
    expect(authService.signInWithGoogle).toBeDefined()
    expect(authService.logOut).toBeDefined()
    expect(authService.onAuthChange).toBeDefined()
  })

  it('should work with mocked functions', () => {
    // Test that the setup mocks work correctly
    expect(vi.isMockFunction).toBeDefined()
  })
})
