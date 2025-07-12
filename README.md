# 🧠 Quiz App

A full-stack, responsive quiz application built with **React**, **Node.js**, **Express**, and **TypeScript**. The app allows users to take quizzes, view leaderboards, and track their performance.

## 🚀 Features

- 🏠 Home Page with quiz selection
- ❓ Quiz Page with dynamic questions based on selected quiz
- 🏆 Leaderboard Page to track top scores
- 📦 State management using React Context API
- 🎨 Styled with Tailwind CSS
- 🌐 Client-side routing using React Router
- 🔧 Express.js backend API
- 📁 Organized folder structure (client/server/public)

## 🛠️ Tech Stack

### Frontend (Client)
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Framer Motion** for animations
- **Context API** for state management

### Backend (Server)
- **Node.js** with Express.js
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Morgan** for logging

## 📂 Project Structure

```
quiz-app/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context for state management
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── data/           # Static data and mock data
│   ├── index.html
│   └── package.json
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── config/         # Configuration files
│   │   └── index.js        # Server entry point
│   └── package.json
├── public/                 # Static assets served by server
│   ├── images/             # Image assets
│   └── assets/             # Other static files
└── package.json            # Root package.json for scripts
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/quiz-app.git
cd quiz-app

# Install all dependencies (root, client, and server)
npm run install:all

# Start both client and server in development mode
npm run dev
```

## 🔧 Development

### Start Development Servers
```bash
# Start both client and server concurrently
npm run dev

# Or start them separately:
npm run dev:client    # Starts React dev server on http://localhost:5173
npm run dev:server    # Starts Express server on http://localhost:3001
```

### Build for Production
```bash
# Build the client application
npm run build

# Start the production server
npm start
```

## 🌐 API Endpoints

The server provides the following API endpoints:

- `GET /api/health` - Health check endpoint
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get specific quiz
- `POST /api/quiz-results` - Submit quiz results
- `GET /api/results/leaderboard` - Get leaderboard data

## 🔒 Environment Variables

Copy `.env.example` to `.env` in the server directory and configure:

```bash
cd server
cp .env.example .env
```

## 🚀 Deployment

### Client (Frontend)
The client can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages

### Server (Backend)
The server can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.