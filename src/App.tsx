import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';

// Pages
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderboardPage';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;