import React from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { quizzes } from '../data/quizData';
import { Award, Trophy, Clock, Calendar } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const { state } = useQuiz();
  const { quizResults } = state;
  
  // Sort results by score (highest first)
  const sortedResults = [...quizResults].sort((a, b) => b.score - a.score);
  
  const getQuizTitleById = (id: number) => {
    const quiz = quizzes.find(q => q.id === id);
    return quiz?.title || 'Unknown Quiz';
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-yellow-500'; // Gold
    if (index === 1) return 'text-gray-400'; // Silver
    if (index === 2) return 'text-amber-700'; // Bronze
    return 'text-blue-500'; // Others
  };
  
  const getMedalIcon = (index: number) => {
    if (index < 3) {
      return <Trophy className={`${getMedalColor(index)}`} size={24} />;
    }
    return <Award className="text-blue-500" size={24} />;
  };
  
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center mb-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-full mb-4"
        >
          <Trophy className="text-white" size={40} />
        </motion.div>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Quiz Leaderboard
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-center max-w-2xl"
        >
          See how your quiz scores compare. Complete more quizzes to rise up the ranks!
        </motion.p>
      </div>
      
      {sortedResults.length > 0 ? (
        <motion.div
          variants={tableVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      Time
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Date
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedResults.map((result, index) => (
                  <motion.tr key={index} variants={rowVariants}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 mr-2">
                          {getMedalIcon(index)}
                        </span>
                        <span className="text-gray-900 font-medium">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{getQuizTitleById(result.quizId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        result.score >= 80 ? 'text-green-600' :
                        result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {result.score}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.answeredCorrectly.length}/{result.totalQuestions} correct
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(result.timeTaken)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(result.date)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg"
        >
          <Trophy className="text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No quiz results yet</h3>
          <p className="text-gray-500 mb-4">Complete some quizzes to see your scores here!</p>
          <a href="/" className="text-blue-600 font-medium hover:text-blue-700">
            Try a quiz now
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default LeaderboardPage;