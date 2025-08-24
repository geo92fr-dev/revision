import '@testing-library/jest-dom'

// Mock Firebase
vi.mock('firebase/auth', () => ({
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}))

// Mock Firebase pour les tests
vi.mock('../firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  },
  db: {},
}))

// Mock des fonctions d'authentification
vi.mock('../authService', () => ({
  signInWithGoogle: vi.fn(() => Promise.resolve({ uid: 'test-user', email: 'test@example.com' })),
  logOut: vi.fn(() => Promise.resolve()),
  onAuthChange: vi.fn(() => vi.fn()), // Return unsubscribe function
}))

// Globals pour les tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

global.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))
