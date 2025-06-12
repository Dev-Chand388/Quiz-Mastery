import React from 'react';
import { Link } from 'react-router-dom';
import { Github as GitHub, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">QuizMaster</h3>
            <p className="text-gray-600 mb-4">Test your knowledge with our interactive quizzes. Learn, challenge yourself, and track your progress.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <GitHub size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-600 hover:text-blue-600 transition-colors">Leaderboard</Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">Stay updated with our latest quizzes and features.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;