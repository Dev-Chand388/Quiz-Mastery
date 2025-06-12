import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Quiz, QuizProgress, QuizResult, UserAnswer } from '../types/quiz';

interface QuizState {
  currentQuiz: Quiz | null;
  quizProgress: QuizProgress | null;
  quizResults: QuizResult[];
  isLoading: boolean;
}

type QuizAction =
  | { type: 'SET_QUIZ'; payload: Quiz }
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_QUESTION'; payload: UserAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: QuizState = {
  currentQuiz: null,
  quizProgress: null,
  quizResults: [],
  isLoading: false,
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SET_QUIZ':
      return {
        ...state,
        currentQuiz: action.payload,
        quizProgress: null,
      };
    case 'START_QUIZ':
      if (!state.currentQuiz) return state;
      return {
        ...state,
        quizProgress: {
          currentQuestionIndex: 0,
          answers: [],
          startTime: new Date(),
          isCompleted: false,
        },
      };
    case 'ANSWER_QUESTION':
      if (!state.quizProgress || !state.currentQuiz) return state;
      
      const updatedAnswers = [...state.quizProgress.answers, action.payload];
      return {
        ...state,
        quizProgress: {
          ...state.quizProgress,
          answers: updatedAnswers,
        },
      };
    case 'NEXT_QUESTION':
      if (!state.quizProgress || !state.currentQuiz) return state;
      
      const nextIndex = state.quizProgress.currentQuestionIndex + 1;
      return {
        ...state,
        quizProgress: {
          ...state.quizProgress,
          currentQuestionIndex: nextIndex,
        },
      };
    case 'COMPLETE_QUIZ':
      if (!state.quizProgress || !state.currentQuiz) return state;
      
      const correctAnswers = state.quizProgress.answers.filter(a => a.isCorrect);
      
      const newResult: QuizResult = {
        quizId: state.currentQuiz.id,
        score: Math.round((correctAnswers.length / state.currentQuiz.questions.length) * 100),
        totalQuestions: state.currentQuiz.questions.length,
        timeTaken: Math.round((new Date().getTime() - state.quizProgress.startTime.getTime()) / 1000),
        answeredCorrectly: state.quizProgress.answers.filter(a => a.isCorrect).map(a => a.questionId),
        answeredIncorrectly: state.quizProgress.answers.filter(a => !a.isCorrect).map(a => a.questionId),
        date: new Date(),
      };
      
      return {
        ...state,
        quizProgress: {
          ...state.quizProgress,
          isCompleted: true,
        },
        quizResults: [...state.quizResults, newResult],
      };
    case 'RESET_QUIZ':
      return {
        ...state,
        currentQuiz: null,
        quizProgress: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

interface QuizContextType {
  state: QuizState;
  selectQuiz: (quiz: Quiz) => void;
  startQuiz: () => void;
  answerQuestion: (answer: UserAnswer) => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  getCurrentQuestion: () => { question: any; index: number } | null;
  getQuizResult: () => QuizResult | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const selectQuiz = (quiz: Quiz) => {
    dispatch({ type: 'SET_QUIZ', payload: quiz });
  };

  const startQuiz = () => {
    dispatch({ type: 'START_QUIZ' });
  };

  const answerQuestion = (answer: UserAnswer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const completeQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const getCurrentQuestion = () => {
    if (!state.currentQuiz || !state.quizProgress) return null;
    
    const { currentQuestionIndex } = state.quizProgress;
    if (currentQuestionIndex >= state.currentQuiz.questions.length) return null;
    
    return {
      question: state.currentQuiz.questions[currentQuestionIndex],
      index: currentQuestionIndex
    };
  };

  const getQuizResult = () => {
    if (!state.quizProgress?.isCompleted || state.quizResults.length === 0) return null;
    return state.quizResults[state.quizResults.length - 1];
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        selectQuiz,
        startQuiz,
        answerQuestion,
        nextQuestion,
        completeQuiz,
        resetQuiz,
        getCurrentQuestion,
        getQuizResult
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};