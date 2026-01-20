# Chat-Based Personal Fitness Trainer

A full-stack fitness coaching application with AI-powered personalized workout plans and nutrition advice using Google Gemini API.

## 🚀 Features

- **AI-Powered Chat Interface**: Get personalized fitness advice and workout plans from Google Gemini
- **User Profiles**: Store your fitness goals, body metrics, and preferences
- **Workout Logging**: Track your workouts with calories burned, duration, and notes
- **Progress Tracking**: Visualize your progress with interactive charts (Recharts)
- **Session History**: View your chat history with the AI coach

## 🛠️ Technologies

- **Frontend**: React.js, Recharts, Lucide React Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **AI**: Google Gemini API

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd fitness-ai-project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env` and replace `your_api_key_here` with your actual Google Gemini API key.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Start MongoDB

If using local MongoDB:

```bash
# Start MongoDB service (Linux/Mac)
sudo systemctl start mongod

# Or run MongoDB manually
mongod --dbpath /path/to/data/directory
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## 🎯 Usage

1. **Set Up Your Profile**: Fill in your name, age, height, weight, activity level, and fitness goals
2. **Log Workouts**: Use the "Quick Log" section to record your workouts
3. **Chat with Coach**: Ask the AI coach questions like:
   - "Create a workout plan for weight loss"
   - "What should I eat after a workout?"
   - "I want to build muscle, help me plan"
4. **View Progress**: Check the "Weekly Calories Burned" chart to track your progress

## ⚙️ Configuration

### Environment Variables

Ensure your `backend/.env` file contains:
- `MONGO_URI` - MongoDB connection string
- `GEMINI_API_KEY` - Your Google Gemini API key
- `PORT` - Backend server port (default: 5000)
- `GEMINI_MODEL` - Optional: Gemini model name (default: gemini-2.0-flash)

### API Key Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to `backend/.env` as `GEMINI_API_KEY=your_key_here`
3. Restart the backend server after updating `.env`

## 📸 Demo

### Demo Chat Session

Try asking the coach:
```
"Create a 3-day workout plan for a beginner who wants to lose weight"
```

### Progress Chart Screenshot

After logging workouts, the "Weekly Calories Burned" chart will display your progress over time.

## 📁 Project Structure

```
fitness-ai-project/
├── backend/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   ├── UserProfile.js # User profile schema
│   │   ├── WorkoutLog.js  # Workout log schema
│   │   └── ChatSession.js # Chat session schema
│   ├── routes/
│   │   ├── profile.js     # Profile CRUD endpoints
│   │   ├── workouts.js    # Workout logging endpoints
│   │   ├── chat.js        # AI chat endpoint
│   │   └── sessions.js    # Chat history endpoints
│   ├── server.js          # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   ├── api.js         # API client
│   │   └── index.js       # React entry point
│   └── package.json
└── README.md
```

## 🔐 Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in your values:

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env` with your actual MongoDB URI and Gemini API key.

## 📝 API Endpoints

- `GET /api/health` - Health check
- `GET /api/profile/:userId` - Get user profile
- `POST /api/profile` - Create/update profile
- `POST /api/workouts` - Log a workout
- `GET /api/workouts/weekly/:userId` - Get weekly workout stats
- `POST /api/chat` - Chat with AI coach
- `GET /api/sessions/:userId` - Get chat history
- `DELETE /api/sessions/:userId` - Clear chat history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

ISC

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Recharts for beautiful data visualization
- Lucide React for icons
# fitness-ai-project
