import React, { useState, useEffect } from 'react';
import { getUserQuizScores, getBestScore, availableQuizzes } from '../quizData';
import './QuizDashboard.css';

const QuizDashboard = ({ user, onStartQuiz }) => {
  const [userScores, setUserScores] = useState([]);
  const [bestScores, setBestScores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Charger tous les scores de l'utilisateur
      const scores = await getUserQuizScores(user.uid);
      setUserScores(scores);

      // Charger le meilleur score pour chaque quiz
      const bestScoresData = {};
      for (const quiz of availableQuizzes) {
        const bestScore = await getBestScore(user.uid, quiz.id);
        if (bestScore) {
          bestScoresData[quiz.id] = bestScore;
        }
      }
      setBestScores(bestScoresData);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 80) return "🏆";
    if (percentage >= 60) return "🥈";
    if (percentage >= 40) return "🥉";
    return "📚";
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "#27ae60";
    if (percentage >= 60) return "#f39c12";
    if (percentage >= 40) return "#e67e22";
    return "#e74c3c";
  };

  if (!user) {
    return (
      <div className="quiz-dashboard">
        <div className="quiz-dashboard-header">
          <h3>🎯 Tableau de bord des Quiz</h3>
          <p>Connectez-vous pour suivre vos progrès !</p>
        </div>
        
        <div className="available-quizzes">
          <h4>Quiz disponibles</h4>
          <div className="quiz-grid">
            {availableQuizzes.map(quiz => (
              <div key={quiz.id} className="quiz-card locked">
                <div className="quiz-header">
                  <span className="quiz-icon">{quiz.icon}</span>
                  <div>
                    <h5>{quiz.title}</h5>
                    <p>{quiz.subject} • {quiz.level}</p>
                  </div>
                </div>
                <p className="quiz-description">{quiz.description}</p>
                <div className="quiz-info">
                  <span>🔒 Connexion requise</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="quiz-dashboard">
        <div className="loading-quiz">
          <div className="loading-spinner-small"></div>
          <p>Chargement de vos données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-dashboard">
      <div className="quiz-dashboard-header">
        <h3>🎯 Tableau de bord des Quiz</h3>
        <p>Suivez vos progrès et améliorez vos scores !</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div>
            <span className="stat-number">{userScores.length}</span>
            <span className="stat-label">Quiz terminés</span>
          </div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <span className="stat-number">
              {Object.values(bestScores).filter(score => score.percentage >= 80).length}
            </span>
            <span className="stat-label">Excellents scores</span>
          </div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <div>
            <span className="stat-number">
              {userScores.length > 0 
                ? Math.round(userScores.reduce((acc, score) => acc + score.percentage, 0) / userScores.length)
                : 0}%
            </span>
            <span className="stat-label">Moyenne générale</span>
          </div>
        </div>
      </div>

      <div className="available-quizzes">
        <h4>Quiz disponibles</h4>
        <div className="quiz-grid">
          {availableQuizzes.map(quiz => {
            const bestScore = bestScores[quiz.id];
            const hasAttempted = !!bestScore;
            
            return (
              <div key={quiz.id} className="quiz-card">
                <div className="quiz-header">
                  <span className="quiz-icon">{quiz.icon}</span>
                  <div>
                    <h5>{quiz.title}</h5>
                    <p>{quiz.subject} • {quiz.level}</p>
                  </div>
                  {hasAttempted && (
                    <div className="best-score">
                      <span className="score-icon">
                        {getScoreIcon(bestScore.percentage)}
                      </span>
                      <span 
                        className="score-percentage"
                        style={{ color: getScoreColor(bestScore.percentage) }}
                      >
                        {bestScore.percentage}%
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="quiz-description">{quiz.description}</p>
                
                <div className="quiz-info">
                  <span className="quiz-questions">📝 {quiz.totalQuestions} questions</span>
                  {hasAttempted && (
                    <span className="last-attempt">
                      Dernier essai : {new Date(bestScore.completedAt.seconds * 1000).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <button 
                  className="start-quiz-btn"
                  onClick={() => onStartQuiz(quiz.id)}
                  style={{ borderColor: quiz.color }}
                >
                  {hasAttempted ? "🔄 Refaire le quiz" : "▶️ Commencer"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {userScores.length > 0 && (
        <div className="recent-scores">
          <h4>Derniers résultats</h4>
          <div className="scores-list">
            {userScores.slice(0, 5).map(score => {
              const quiz = availableQuizzes.find(q => q.id === score.quizId);
              return (
                <div key={score.id} className="score-item">
                  <div className="score-quiz-info">
                    <span className="quiz-icon">{quiz?.icon || "📝"}</span>
                    <div>
                      <strong>{quiz?.title || score.quizId}</strong>
                      <p>{new Date(score.completedAt.seconds * 1000).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="score-result">
                    <span className="score-icon">{getScoreIcon(score.percentage)}</span>
                    <div>
                      <strong style={{ color: getScoreColor(score.percentage) }}>
                        {score.score}/{score.totalQuestions}
                      </strong>
                      <p>{score.percentage}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDashboard;
