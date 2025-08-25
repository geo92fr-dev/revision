import React, { useState } from 'react';
import { saveQuizScore } from '../quizData';
import { quizData } from '../quizData';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import './Quiz.css';

const Quiz = ({ quizId, subject = "Mathématiques", level = "6eme", onBack }) => {
  const [user] = useAuthState(auth);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  // Récupérer les questions depuis la nouvelle structure
  const questions = quizData[subject?.toLowerCase()]?.[quizId] || [];
  
  const quiz = {
    title: `${level} - ${quizId.replace('-', ' ').replace('_', ' ')}`,
    subject: subject,
    level: level,
    description: `Quiz sur ${quizId.replace('-', ' ').replace('_', ' ')}`,
    questions: questions
  };

  // Timer effect
  React.useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleFinish();
    }
  }, [timeLeft, quizStarted, showResult]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleFinish(newAnswers);
    }
  };

  const handleFinish = (finalAnswers = answers) => {
    const finalScore = quiz.questions.reduce((score, question, index) => {
      return score + (finalAnswers[index] === question.bonneReponse ? (question.points || 1) : 0);
    }, 0);
    
    setScore(finalScore);
    setShowResult(true);

    // Sauvegarder le score
    if (user) {
      saveQuizScore(user.uid, {
        quizId: quizId,
        subject: quiz.subject,
        level: quiz.level,
        score: finalScore,
        maxScore: quiz.questions.reduce((sum, q) => sum + (q.points || 1), 0),
        answers: finalAnswers,
        timestamp: new Date()
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
    setTimeLeft(300);
    setQuizStarted(false);
  };

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button onClick={onBack} className="back-button">
            ← Retour
          </button>
          <h1>Quiz non disponible</h1>
        </div>
        <div className="quiz-unavailable">
          <h2>🚧 Quiz en cours de développement</h2>
          <p>Ce quiz sera disponible prochainement.</p>
          <button onClick={onBack} className="back-button-large">
            Retourner aux révisions
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button onClick={onBack} className="back-button">
            ← Retour
          </button>
          <h1>{quiz.title}</h1>
        </div>
        
        <div className="quiz-intro">
          <div className="quiz-info">
            <h2>📋 Informations du quiz</h2>
            <div className="quiz-details">
              <div className="detail-item">
                <span className="detail-label">Matière :</span>
                <span className="detail-value">{quiz.subject}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Niveau :</span>
                <span className="detail-value">{quiz.level}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Questions :</span>
                <span className="detail-value">{quiz.questions.length}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Durée :</span>
                <span className="detail-value">5 minutes</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Points total :</span>
                <span className="detail-value">{quiz.questions.reduce((sum, q) => sum + (q.points || 1), 0)}</span>
              </div>
            </div>
          </div>

          <div className="quiz-description">
            <h3>🎯 Description</h3>
            <p>{quiz.description}</p>
          </div>

          <div className="quiz-instructions">
            <h3>📝 Instructions</h3>
            <ul>
              <li>Lisez attentivement chaque question</li>
              <li>Sélectionnez une seule réponse par question</li>
              <li>Vous ne pouvez pas revenir en arrière</li>
              <li>Le temps est limité à 5 minutes</li>
              <li>Votre score sera sauvegardé automatiquement</li>
            </ul>
          </div>

          <button onClick={handleStartQuiz} className="start-quiz-button">
            🚀 Commencer le quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const maxScore = quiz.questions.reduce((sum, q) => sum + (q.points || 1), 0);
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button onClick={onBack} className="back-button">
            ← Retour aux révisions
          </button>
          <h1>Résultats du quiz</h1>
        </div>

        <div className="quiz-results">
          <div className="score-display">
            <div className="score-circle">
              <span className="score-text">{score}/{maxScore}</span>
              <span className="score-percentage">{percentage}%</span>
            </div>
          </div>

          <div className="score-message">
            {percentage >= 80 && <div className="success-message">🎉 Excellent ! Vous maîtrisez bien ce sujet.</div>}
            {percentage >= 60 && percentage < 80 && <div className="good-message">👍 Bien ! Quelques points à revoir.</div>}
            {percentage >= 40 && percentage < 60 && <div className="average-message">📚 Moyen. Il faut réviser ce chapitre.</div>}
            {percentage < 40 && <div className="poor-message">📖 Il faut retravailler ce sujet en profondeur.</div>}
          </div>

          <div className="detailed-results">
            <h3>📊 Détail des réponses</h3>
            {quiz.questions.map((question, index) => (
              <div key={index} className={`result-item ${answers[index] === question.bonneReponse ? 'correct' : 'incorrect'}`}>
                <div className="result-question">
                  <span className="question-number">Q{index + 1}</span>
                  <span className="question-text">{question.question}</span>
                </div>
                <div className="result-answer">
                  <div className="your-answer">
                    Votre réponse : <span className={answers[index] === question.bonneReponse ? 'correct' : 'incorrect'}>
                      {question.reponses[answers[index]] || 'Pas de réponse'}
                    </span>
                  </div>
                  {answers[index] !== question.bonneReponse && (
                    <div className="correct-answer">
                      Bonne réponse : <span className="correct">{question.reponses[question.bonneReponse]}</span>
                    </div>
                  )}
                  <div className="explanation">
                    💡 {question.explication}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button onClick={handleRestart} className="restart-button">
              🔄 Refaire le quiz
            </button>
            <button onClick={onBack} className="back-to-revisions">
              📚 Retour aux révisions
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button onClick={onBack} className="back-button">
          ← Quitter
        </button>
        <h1>{quiz.title}</h1>
        <div className="timer">
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} sur {quiz.questions.length}
        </span>
      </div>

      <div className="quiz-content">
        <div className="question-container">
          <div className="question-header">
            <span className="question-number">Question {currentQuestion + 1}</span>
            <span className="question-points">
              {currentQ.points || 1} point{(currentQ.points || 1) > 1 ? 's' : ''}
            </span>
          </div>
          <h2 className="question-text">{currentQ.question}</h2>
        </div>

        <div className="answers-container">
          {currentQ.reponses.map((option, index) => (
            <button
              key={index}
              className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="next-button"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Terminer le quiz' : 'Question suivante'} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
