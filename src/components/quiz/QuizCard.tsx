import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '../../types/quiz';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();
  
  const handleStartQuiz = () => {
    navigate(`/quiz/${quiz.id}`);
  };
  
  const getDifficultyVariant = (difficulty: string): 'success' | 'warning' | 'error' => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'success';
    }
  };
  
  return (
    <Card hover className="h-full flex flex-col">
      <Card.Image src={quiz.image || 'https://images.pexels.com/photos/3653849/pexels-photo-3653849.jpeg'} alt={quiz.title} />
      <Card.Content className="flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Card.Title>{quiz.title}</Card.Title>
          <Badge variant={getDifficultyVariant(quiz.difficulty)}>
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </Badge>
        </div>
        <Card.Description className="mb-4">{quiz.description}</Card.Description>
        <div className="mt-auto">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>{quiz.questions.length} questions</span>
            <span>{quiz.timePerQuestion} sec per question</span>
          </div>
          <Button variant="primary" fullWidth onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default QuizCard;