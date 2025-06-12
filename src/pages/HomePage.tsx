import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { quizzes } from '../data/quizData';
import QuizCard from '../components/quiz/QuizCard';
import { Search, Filter } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('');
  
  // Get unique categories
  const categories = Array.from(new Set(quizzes.map(quiz => quiz.category)));
  const difficulties = ['easy', 'medium', 'hard'];
  
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === '' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero section */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Test Your Knowledge with Interactive Quizzes</h1>
            <p className="text-xl mb-6 text-blue-100">Challenge yourself with our diverse range of quizzes. Learn, grow, and track your progress!</p>
            <button
              onClick={() => {
                const element = document.getElementById('quiz-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Browse Quizzes
            </button>
          </div>
        </motion.div>
      </section>
      
      {/* Quiz section */}
      <section id="quiz-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Available Quizzes</h2>
          
          {/* Search */}
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            {/* Filters */}
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Difficulties</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
              
              {(searchQuery || selectedCategory || selectedDifficulty) && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Quiz grid */}
        {filteredQuizzes.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredQuizzes.map(quiz => (
              <motion.div key={quiz.id} variants={item}>
                <QuizCard quiz={quiz} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
            <Filter className="text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No quizzes found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={handleClearFilters}
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;