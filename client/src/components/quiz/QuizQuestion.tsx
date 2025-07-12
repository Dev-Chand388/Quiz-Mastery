import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question, UserAnswer } from '../../types/quiz';
import Button from '../ui/Button';
import { Clock } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  timeLimit: number;
  onAnswer: (answer: UserAnswer) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionIndex,
  totalQuestions,
  timeLimit,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [answered, setAnswered] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  
  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !answered) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
        setTimeTaken(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !answered) {
      handleSubmit();
    }
  }, [timeRemaining, answered]);
  
  const handleOptionSelect = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
  };
  
  const handleSubmit = () => {
    if (answered || selectedOption === null) return;
    
    const isCorrect = selectedOption === question.correctAnswer;
    
    onAnswer({
      questionId: question.id,
      selectedOption,
      isCorrect,
      timeTaken
    });
    
    setAnswered(true);
  };
  
  const getProgressPercentage = () => {
    return ((questionIndex + 1) / totalQuestions) * 100;
  };
  
  const getTimePercentage = () => {
    return (timeRemaining / timeLimit) * 100;
  };
  
  const getOptionClasses = (index: number) => {
    if (!answered) {
      return selectedOption === index 
        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-400 ring-opacity-50' 
        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50';
    }
    
    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50 ring-2 ring-green-400 ring-opacity-50';
    }
    
    if (selectedOption === index && index !== question.correctAnswer) {
      return 'border-red-500 bg-red-50 ring-2 ring-red-400 ring-opacity-50';
    }
    
    return 'border-gray-200 opacity-60';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Question {questionIndex + 1} of {totalQuestions}</span>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{timeRemaining}s</span>
          </div>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>
      
      {/* Timer bar */}
      <div className="mb-8">
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              timeRemaining < timeLimit * 0.25 ? 'bg-red-500' : 
              timeRemaining < timeLimit * 0.5 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${getTimePercentage()}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.text}</h2>
      
      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.98 }}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${getOptionClasses(index)}`}
            onClick={() => handleOptionSelect(index)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 mr-3 rounded-full border-2 border-gray-400 flex items-center justify-center">
                {String.fromCharCode(65 + index)}
              </div>
              <p className="text-gray-800">{option}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Explanation (shown after answering) */}
      {answered && question.explanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <h3 className="font-semibold text-blue-800 mb-1">Explanation:</h3>
          <p className="text-blue-700">{question.explanation}</p>
        </motion.div>
      )}
      
      {/* Submit button */}
      <div className="flex justify-end">
        <Button 
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={selectedOption === null || answered}
        >
          {answered ? 'Answered' : 'Submit Answer'}
        </Button>
      </div>
    </motion.div>
  );
};

export default QuizQuestion;