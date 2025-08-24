import React from 'react';
import { signInWithGoogle, logOut } from '../authService';
import QuizDashboard from './QuizDashboard';
import './HomePage.css';

const HomePage = ({ user, onLogin, onLogout, onDashboard, onRevisions, onQuiz }) => {
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      onLogin(user);
    } catch (error) {
      alert('Erreur lors de la connexion: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      onLogout();
    } catch (error) {
      alert('Erreur lors de la déconnexion: ' + error.message);
    }
  };

  const isAdmin = user && user.email === 'geo92fr@gmail.com';

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenue sur FunRevis</h1>
        <p className="home-subtitle">Votre plateforme de révision interactive</p>
        
        <div className="features">
          <div className="feature clickable" onClick={onRevisions}>
            <h3>📚 Révisions efficaces</h3>
            <p>Organisez vos sessions de révision de manière optimale</p>
            <span className="feature-action">Commencer →</span>
          </div>
          <div className="feature">
            <h3>🎯 Suivi des progrès</h3>
            <p>Visualisez vos performances et votre évolution</p>
          </div>
          <div className="feature">
            <h3>🤝 Collaboration</h3>
            <p>Partagez vos connaissances avec d'autres utilisateurs</p>
          </div>
        </div>

        <QuizDashboard user={user} onStartQuiz={onQuiz} />

        {!user ? (
          <div className="login-section">
            <h2>Connectez-vous pour commencer</h2>
            <button 
              className="google-login-btn"
              onClick={handleGoogleLogin}
            >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google"
                className="google-icon"
              />
              Se connecter avec Google
            </button>
          </div>
        ) : (
          <div className="user-section">
            <div className="user-welcome">
              <img 
                src={user.photoURL} 
                alt={user.displayName}
                className="user-avatar-large"
              />
              <h2>Bonjour {user.displayName} !</h2>
              <p>Vous êtes maintenant connecté(e)</p>
            </div>
            
            <div className="user-actions">
              {isAdmin && (
                <button 
                  className="dashboard-btn"
                  onClick={onDashboard}
                >
                  🛠️ Tableau de bord
                </button>
              )}
              
              <button 
                className="logout-btn-home"
                onClick={handleLogout}
              >
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
