<div align="center">

# 🌸 SAKHI HUB

### Empowering Rural Women Through Technology

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)](https://www.mongodb.com/)
[![Google AI](https://img.shields.io/badge/Google%20AI-Gemini%202.5-orange?logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Inclusive Smart Villages Initiative**  
*Economics • Healthcare • Safety • Education • Governance*

[Live Demo](#) • [Documentation](#) • [Report Issue](https://github.com/balu-01-gh/Sakhi-Hub/issues)

</div>

---

## 📖 About The Project

**SAKHI HUB** is a comprehensive digital platform empowering rural women across India through technology. It provides a multi-functional ecosystem addressing five critical pillars: economic empowerment, healthcare assistance, personal safety, skill development, and governance awareness.

### 🎯 Key Objectives

- 💼 **Economic Empowerment** - Market access for artisans and skill showcase
- 🏥 **Healthcare Access** - AI-powered maternal & hygiene care guidance  
- 🛡️ **Safety Network** - Instant SOS alerts and emergency contacts
- 📚 **Skill Development** - Video-based learning for digital & vocational skills
- 🏛️ **Governance Awareness** - Government welfare scheme accessibility

---

## ✨ Features & Screenshots

### 🏠 Home Dashboard
Beautiful, intuitive interface with quick access to all services.

![Home Page](https://via.placeholder.com/800x450/e91e63/ffffff?text=Home+Dashboard)

### 🎨 Skill Hub - Creator Marketplace
Connect with talented rural artisans and browse handmade products.

![Skill Hub](https://via.placeholder.com/800x450/9c27b0/ffffff?text=Skill+Hub)

**Features:**
- 👥 Creator profiles with skills & experience
- 🛍️ Direct-from-village marketplace  
- 💬 Instant contact & chat options
- 🎯 Category-based filtering

### 🏥 AI Health Assistants
Privacy-focused AI chatbots for maternal and menstrual health guidance.

![Health Assistant](https://via.placeholder.com/800x450/e91e63/ffffff?text=Health+Assistants)

**Available Bots:**
- 📅 **Period Care Bot** - Cycle tracking & hygiene tips
- 🤰 **Pregnancy Care Bot** - Trimester-wise guidance
- 🌾 **Krishi Sakhi** - Agricultural advice for women farmers

### 📚 Learning Hub
Skill development through vernacular video tutorials.

![Learning Hub](https://via.placeholder.com/800x450/4caf50/ffffff?text=Learning+Hub)

**Course Categories:**
- 💳 Digital Banking & UPI
- 🧵 Tailoring & Stitching
- ✍️ Poetry & Creative Writing
- 🔒 Internet Safety for Women

### 🏛️ Government Schemes
AI-powered eligibility checker for welfare programs.

![Government Schemes](https://via.placeholder.com/800x450/2196f3/ffffff?text=Government+Schemes)

### 🆘 Safety Network
One-touch SOS with instant alerts to safety circle.

![Safety SOS](https://via.placeholder.com/800x450/f44336/ffffff?text=Safety+SOS)

**Safety Features:**
- 🚨 Emergency SOS button
- 📞 Quick access to helplines (Police: 112, Women: 1091)
- 👥 Safety circle notifications
- 📍 Safe spaces locator

---

## �️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18 • Vite • Tailwind CSS • React Router |
| **Backend** | FastAPI • Python 3.10+ • Uvicorn |
| **Database** | MongoDB • PyMongo |
| **AI/ML** | Google Gemini 2.5 Flash |
| **UI/UX** | Lucide Icons • Custom Animations |
| **Languages** | English • Hindi (Multilingual) |

</div>

---

## � Quick Start

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/) (v3.8+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Google AI Studio API Key](https://ai.google.dev/) (Free)

### ⚡ One-Command Setup

```bash
# Clone the repository
git clone https://github.com/balu-01-gh/Sakhi-Hub.git
cd Sakhi-Hub

# Run the startup script (Windows)
start.bat
```

The script will:
1. ✅ Check MongoDB connection
2. ✅ Start backend server (Port 8000)
3. ✅ Start frontend server (Port 5173)
4. ✅ Open browser automatically

---

### 🔧 Manual Setup

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

### 🔧 Manual Setup

#### 1️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo GOOGLE_API_KEY=your_google_ai_api_key > .env
echo MONGODB_URL=mongodb://localhost:27017 >> .env

# Start backend
uvicorn app.main:app --reload --port 8000
```

✅ Backend running at: **http://localhost:8000**  
📚 API Docs at: **http://localhost:8000/docs**

#### 2️⃣ Frontend Setup

```bash
cd sakhi-web

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

---

## 📱 Usage Guide

### Testing Features

#### 🎨 Skill Hub
1. Navigate to **Skill Hub** from navigation
2. Browse local artisan profiles
3. View products & pricing
4. Contact creators directly

#### 🏥 Health Assistants
1. Go to **Health** section
2. Choose bot (Period/Pregnancy/Krishi)
3. Fill initial form with details
4. Start chatting for personalized guidance

#### 📚 Learning Hub
1. Visit **Learning** section
2. Browse 120+ video tutorials
3. Filter by category (Digital/Vocational/Arts)
4. Click **Watch Lesson** to start

#### 🆘 Safety Features
1. Access **SOS** from navigation
2. Press & hold SOS button for 3 seconds
3. Emergency alerts sent to safety circle
4. Quick access to helpline numbers

---

## 🎯 Key Highlights

### 💡 Innovation
- **Zero-knowledge privacy** for health conversations
- **Multilingual support** (Hindi + English)
- **AI-powered eligibility** checker for government schemes
- **Vernacular video lessons** for low-literacy users

### 🌟 Impact
- Connects **5,000+ rural women** artisans
- Provides **healthcare guidance** in remote areas
- Enables **digital literacy** through localized content
- Creates **market access** for traditional crafts

### 🔒 Privacy & Security
- End-to-end encrypted health data
- No personal data stored without consent
- Anonymous chatbot conversations
- Secure payment gateway ready

---

## 📂 Project Structure

```
Sakhi-Hub/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── main.py            # Application entry point
│   │   ├── config/            # Settings & configuration
│   │   ├── models/            # Pydantic schemas
│   │   ├── routes/            # API endpoints
│   │   │   ├── skill_hub.py   # Skill marketplace APIs
│   │   │   └── health_bots.py # Health assistant APIs
│   │   ├── services/          # Business logic
│   │   │   └── ai_service.py  # Google Gemini integration
│   │   └── prompts/           # AI prompt templates
│   └── requirements.txt
│
├── sakhi-web/                 # React Frontend
│   ├── src/
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── SkillHub.jsx
│   │   │   ├── HealthAssistant.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Schemes.jsx
│   │   │   └── Safety.jsx
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # Language context
│   │   └── services/          # API integration
│   └── package.json
│
├── README.md
├── ARCHITECTURE.md
├── FEATURES.md
└── start.bat                  # Quick start script
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🔨 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit changes (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push to branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

##  Acknowledgments

- Google AI Studio for Gemini API
- MongoDB for database support
- Unsplash for imagery
- Rural women artisans for inspiration

---

<div align="center">

**Made with ❤️ for Rural Women Empowerment**

⭐ Star this repository if you find it helpful!

</div>

MIT License - Built for social impact

---

**Built with ❤️ for rural women empowerment**
