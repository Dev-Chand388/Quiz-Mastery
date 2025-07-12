import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, '../../public')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Quiz App Server is running' });
});

// Quiz API endpoints (placeholder for future implementation)
app.get('/api/quizzes', (req, res) => {
  res.json({ message: 'Quiz API endpoint - to be implemented' });
});

app.get('/api/quizzes/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Quiz ${id} API endpoint - to be implemented` });
});

app.post('/api/quiz-results', (req, res) => {
  res.json({ message: 'Quiz results submission - to be implemented' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving public files from /public`);
});