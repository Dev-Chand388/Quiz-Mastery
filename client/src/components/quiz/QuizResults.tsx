import React from 'react';
import { motion } from 'framer-motion';
import { QuizResult } from '../../types/quiz';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { Award, Clock, Check, X, Share2 } from 'lucide-react';

interface QuizResultsProps {
  result: QuizResult;
  quizTitle: string;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, quizTitle }) => {
  const navigate = useNavigate();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent!';
    if (score >= 80) return 'Great job!';
    if (score >= 70) return 'Good work!';
    if (score >= 60) return 'Not bad!';
    if (score >= 40) return 'Keep practicing!';
    return 'Try again!';
  };
  
  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: `My ${quizTitle} Quiz Result`,
        text: `I scored ${result.score}% on the ${quizTitle} quiz!`,
        url: window.location.href,
      });
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(
        `I scored ${result.score}% on the ${quizTitle} quiz! Try it yourself!`
      );
      alert('Result copied to clipboard!');
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-8 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-blue-100">{quizTitle}</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative mb-4">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
              <circle
                className={`${result.score >= 70 ? 'text-green-500' : result.score >= 40 ? 'text-yellow-500' : 'text-red-500'}`}
                strokeWidth="8"
                strokeDasharray={365}
                strokeDashoffset={365 - (365 * result.score) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
                style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className={`text-4xl font-bold ${getScoreColor(result.score)}`}>{result.score}%</p>
            </div>
          </div>
          <p className="text-xl font-medium text-gray-800">{getScoreMessage(result.score)}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Award className="text-blue-500 mb-2" size={24} />
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-lg font-semibold text-gray-800">
              {result.answeredCorrectly.length} / {result.totalQuestions}
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Clock className="text-blue-500 mb-2" size={24} />
            <p className="text-sm text-gray-500">Time Taken</p>
            <p className="text-lg font-semibold text-gray-800">{formatTime(result.timeTaken)}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center">
            <div className="flex space-x-2 mb-2">
              <Check className="text-green-500" size={20} />
              <X className="text-red-500" size={20} />
            </div>
            <p className="text-sm text-gray-500">Correct/Wrong</p>
            <p className="text-lg font-semibold text-gray-800">
              <span className="text-green-500">{result.answeredCorrectly.length}</span> / 
              <span className="text-red-500">{result.answeredIncorrectly.length}</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" onClick={() => navigate('/')}>
            Back to Quizzes
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={shareResult}
            className="flex items-center justify-center"
          >
            <Share2 size={18} className="mr-2" />
            Share Result
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizResults;