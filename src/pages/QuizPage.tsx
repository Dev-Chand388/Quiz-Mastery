import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzes } from '../data/quizData';
import { useQuiz } from '../context/QuizContext';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResults from '../components/quiz/QuizResults';
import Button from '../components/ui/Button';
import { ArrowLeft, Timer, AlertCircle } from 'lucide-react';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    state, 
    selectQuiz, 
    startQuiz, 
    answerQuestion, 
    nextQuestion, 
    completeQuiz, 
    resetQuiz, 
    getCurrentQuestion, 
    getQuizResult 
  } = useQuiz();
  
  // Find the quiz by ID
  const quiz = quizzes.find(q => q.id === Number(id));
  
  useEffect(() => {
    if (!quiz) {
      navigate('/');
      return;
    }
    
    // Set the current quiz
    selectQuiz(quiz);
    
    // Cleanup on unmount
    return () => {
      resetQuiz();
    };
  }, [quiz, id]);
  
  // Start quiz on first render
  useEffect(() => {
    if (state.currentQuiz && !state.quizProgress) {
      startQuiz();
    }
  }, [state.currentQuiz, state.quizProgress]);
  
  // Handle navigation
  const handleBackToHome = () => {
    resetQuiz();
    navigate('/');
  };
  
  // Handle answer submission
  const handleAnswer = (answer: any) => {
    answerQuestion(answer);
    
    // Wait a bit to show the correct answer before moving to next question
    setTimeout(() => {
      const currentQuestion = getCurrentQuestion();
      
      if (currentQuestion && currentQuestion.index < quiz!.questions.length - 1) {
        nextQuestion();
      } else {
        completeQuiz();
      }
    }, 2000);
  };
  
  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz not found</h2>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    );
  }
  
  // Get current question
  const currentQuestionData = getCurrentQuestion();
  const result = getQuizResult();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Quiz header */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackToHome}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
      </div>
      
      {/* Quiz content */}
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResults result={result} quizTitle={quiz.title} />
          </motion.div>
        ) : currentQuestionData ? (
          <motion.div
            key={`question-${currentQuestionData.index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizQuestion
              question={currentQuestionData.question}
              questionIndex={currentQuestionData.index}
              totalQuestions={quiz.questions.length}
              timeLimit={quiz.timePerQuestion}
              onAnswer={handleAnswer}
            />
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-96"
          >
            <Timer className="animate-pulse text-blue-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Quiz</h2>
            <p className="text-gray-600">Please wait while we prepare your questions...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;