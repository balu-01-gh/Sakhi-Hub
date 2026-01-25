# 🌸 SAKHI HUB - Empowering Rural Women Through Technology

## 🎯 Hackathon Project
**Theme:** Inclusive Smart Villages – Economic Empowerment + Health Awareness

## 📋 Project Overview

SAKHI HUB is a comprehensive web platform designed to empower rural women through:
1. **Skill & Market Hub** - Showcase skills, find work, sell handmade products
2. **Health Care Assistant** - AI-powered period and pregnancy care guidance

## 🚀 Tech Stack

- **Frontend:** React + Tailwind CSS + React Router
- **Backend:** Python FastAPI
- **Database:** MongoDB
- **AI:** Google AI Studio (Gemini)

## 📁 Project Structure

```
SAKHI-HUB/
├── frontend/          # React application
└── backend/           # FastAPI server
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB (local or Atlas)
- Google AI Studio API Key (Free)

### 🔧 Backend Setup (sakhi-backend)

1. Navigate to backend folder:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```env
GOOGLE_API_KEY=your_google_ai_api_key_here
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=sakhi_hub
```

5. Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

Backend will run on: http://localhost:8000

### 🎨 Frontend Setup (sakhi-web)

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run on: http://localhost:3000

## 🎬 Demo Instructions

### Testing Skill Hub:
1. Navigate to "Skill Hub" from home page
2. Browse creator profiles
3. Click "View Profile" to see creator details
4. Scroll down to see products
5. Click "Order Now" on any product (demo only)

### Testing Period Care Bot:
1. Go to "Health Assistant" from home page
2. Click "Period Care Bot"
3. Enter age and last period date
4. See predicted next period date
5. Chat with the bot for advice on:
   - Nutrition tips
   - Exercise suggestions
   - Pain relief methods
   - Hygiene awareness

### Testing Pregnancy Care Bot:
1. Go to "Health Assistant" from home page
2. Click "Pregnancy Care Bot"
3. Enter pregnancy confirmation date
4. Bot calculates trimester automatically
5. Get trimester-specific guidance on:
   - Nutrition
   - Safe exercises
   - Emotional support
   - General wellness

## 🎯 Key Features

### Skill & Market Hub
- ✅ Creator profiles with skills and experience
- ✅ Work sample galleries
- ✅ Contact and chat options
- ✅ Product marketplace
- ✅ Order placement (demo)

### Health Care Assistant
- ✅ Period tracking and prediction
- ✅ Trimester-based pregnancy guidance
- ✅ AI-powered conversational support
- ✅ Simple, accessible language
- ✅ Privacy-focused design

## 🔒 Important Notes

- Health bots are for **educational purposes only**
- Not a replacement for professional medical advice
- Always consult healthcare providers for medical decisions

## 👥 Target Users

- Rural women artisans and entrepreneurs
- Women seeking accessible health information
- Communities with limited healthcare access

## 📧 Support

This is a hackathon prototype built to demonstrate technological solutions for rural women empowerment.

## 📜 License

MIT License - Built for social impact

---

**Built with ❤️ for rural women empowerment**
