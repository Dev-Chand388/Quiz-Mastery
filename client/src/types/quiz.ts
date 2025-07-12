export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  questions: Question[];
  timePerQuestion: number; // in seconds
  image?: string;
}

export interface QuizResult {
  quizId: number;
  score: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  answeredCorrectly: number[];
  answeredIncorrectly: number[];
  date: Date;
}

export interface UserAnswer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  timeTaken: number;
}

export interface QuizProgress {
  currentQuestionIndex: number;
  answers: UserAnswer[];
  startTime: Date;
  isCompleted: boolean;
}