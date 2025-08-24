import { useState, useEffect } from 'react'
import { onAuthChange } from './authService'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import Revisions from './components/Revisions'
import Quiz from './components/Quiz'
import CoursComponent from './components/CoursComponent'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('home')
  const [currentCours, setCurrentCours] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user)
      setLoading(false)
      if (!user) {
        setCurrentView('home')
      }
    })

    return () => unsubscribe()
  }, [])

  const [currentQuizSubject, setCurrentQuizSubject] = useState('');
  const [currentQuizLevel, setCurrentQuizLevel] = useState('');

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('home')
  }

  const handleDashboard = () => {
    setCurrentView('dashboard')
  }

  const handleRevisions = () => {
    setCurrentView('revisions')
  }

  const handleQuiz = (subject, level) => {
    setCurrentQuizSubject(subject);
    setCurrentQuizLevel(level);
    setCurrentView('quiz')
  }

  const handleCours = (coursId, subject, level) => {
    setCurrentCours({ coursId, subject, level })
    setCurrentView('cours')
  }

  const handleHome = () => {
    setCurrentView('home')
  }

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <h2>Chargement...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {currentView === 'home' && (
        <HomePage
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onDashboard={handleDashboard}
          onRevisions={handleRevisions}
          onQuiz={handleQuiz}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onBackToHome={handleHome}
        />
      )}
      {currentView === 'revisions' && (
        <Revisions
          user={user}
          onBackToHome={handleHome}
          onCours={handleCours}
          onQuiz={handleQuiz}
        />
      )}
      {currentView === 'quiz' && (
        <Quiz
          quizId={`${currentQuizSubject.toLowerCase()}_${currentQuizLevel}`}
          subject={currentQuizSubject}
          level={currentQuizLevel}
          onBack={handleRevisions}
        />
      )}
      {currentView === 'cours' && (
        <CoursComponent
          coursId={currentCours?.coursId}
          subject={currentCours?.subject}
          level={currentCours?.level}
          onBack={handleRevisions}
          onQuiz={handleQuiz}
        />
      )}
    </div>
  )
}

export default App
