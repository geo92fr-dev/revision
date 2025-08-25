import React from 'react';
import { logOut } from '../authService';
// import { addTestDoc, getTestDocs } from '../firestoreTest';
import './Dashboard.css';

const Dashboard = ({ user, onLogout, onBackToHome }) => {
  const [docs, setDocs] = React.useState([]);

  const handleAdd = async () => {
    try {
      // await addTestDoc();
      alert('Fonctionnalité temporairement désactivée');
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert('Erreur: ' + error.message);
    }
  };

  const handleGet = async () => {
    try {
      // const data = await getTestDocs();
      // setDocs(data);
      console.log('Fonctionnalité temporairement désactivée');
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      alert('Erreur: ' + error.message);
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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <button 
            className="back-btn"
            onClick={onBackToHome}
          >
            ← Retour à l'accueil
          </button>
        </div>
        <div className="user-info">
          <img 
            src={user.photoURL} 
            alt={user.displayName}
            className="user-avatar"
          />
          <span className="user-name">Bonjour, {user.displayName}</span>
        </div>
        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </header>

      <main className="dashboard-main">
        <h1>Tableau de bord - Administrateur</h1>
        <p className="admin-notice">Accès réservé à l'administrateur ({user.email})</p>
        
        <div className="actions-section">
          <h2>Actions Firestore</h2>
          <div className="action-buttons">
            <button 
              className="action-btn primary"
              onClick={handleAdd}
            >
              Ajouter un document Firestore
            </button>
            <button 
              className="action-btn secondary"
              onClick={handleGet}
            >
              Afficher les documents
            </button>
          </div>
        </div>

        {docs.length > 0 && (
          <div className="documents-section">
            <h3>Documents récupérés :</h3>
            <ul className="documents-list">
              {docs.map(doc => (
                <li key={doc.id} className="document-item">
                  <strong>{doc.message}</strong>
                  {doc.date && (
                    <span className="document-date">
                      {new Date(doc.date.seconds ? doc.date.seconds * 1000 : doc.date).toLocaleString()}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
