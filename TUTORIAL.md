# 🎓 COMPLETE STEP-BY-STEP TUTORIAL

This guide explains everything from scratch. Perfect for beginners!

---

## 📚 Table of Contents

1. [Understanding the Project](#understanding-the-project)
2. [Prerequisites Installation](#prerequisites-installation)
3. [Project Setup](#project-setup)
4. [Backend Deep Dive](#backend-deep-dive)
5. [Frontend Deep Dive](#frontend-deep-dive)
6. [Running the Application](#running-the-application)
7. [Testing Features](#testing-features)
8. [Troubleshooting](#troubleshooting)
9. [Demo Preparation](#demo-preparation)

---

## 🎯 Understanding the Project

### What is SAKHI HUB?

SAKHI HUB is a web platform with TWO main parts:

**Part 1: Skill & Market Hub**
- Like an online shop + LinkedIn for rural women
- Women can create profiles showing their skills
- They can sell handmade products
- Customers can discover and buy products

**Part 2: Health Care Assistant**
- Two AI chatbots for women's health
- Period Care Bot: Track periods, get health tips
- Pregnancy Care Bot: Get trimester-specific guidance

### How Does It Work?

```
User's Browser (Frontend - React)
         ↓
     Internet
         ↓
Our Server (Backend - FastAPI)
         ↓
    Database (MongoDB)
         ↓
    AI Service (OpenAI)
```

**Simple Explanation:**
1. User opens website in browser (React shows pretty pages)
2. User clicks button (React sends request to our server)
3. Server processes request (FastAPI does the work)
4. Server saves/gets data from database (MongoDB)
5. For chatbots, server asks AI for response (OpenAI)
6. Server sends response back to browser
7. Browser shows result to user

---

## 💻 Prerequisites Installation

### Step 1: Install Python

**What is Python?**
Programming language we use for the backend server.

**How to Install:**
1. Go to https://www.python.org/downloads/
2. Download latest Python 3.8+ version
3. Run installer
4. ✅ IMPORTANT: Check "Add Python to PATH" during installation
5. Click "Install Now"

**Verify Installation:**
```powershell
python --version
# Should show: Python 3.x.x
```

### Step 2: Install Node.js

**What is Node.js?**
JavaScript runtime we use to run React and build frontend.

**How to Install:**
1. Go to https://nodejs.org/
2. Download LTS version (recommended)
3. Run installer
4. Click "Next" through all steps (default settings are fine)

**Verify Installation:**
```powershell
node --version
# Should show: v18.x.x or similar

npm --version
# Should show: 9.x.x or similar
```

### Step 3: Install MongoDB

**What is MongoDB?**
Database where we store creator profiles and products.

**Option A: Local Installation (Recommended for learning)**
1. Go to https://www.mongodb.com/try/download/community
2. Download Community Edition for Windows
3. Run installer
4. Choose "Complete" installation
5. Install MongoDB as a Service (check this option)

**Option B: MongoDB Atlas (Cloud - Easier)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create free cluster
4. Get connection string (we'll use this later)

**Verify Local MongoDB:**
```powershell
# Check if MongoDB service is running
sc query MongoDB
# Should show "RUNNING"
```

### Step 4: Get OpenAI API Key

**What is OpenAI?**
AI service that powers our chatbots.

**How to Get API Key:**
1. Go to https://platform.openai.com/
2. Sign up for account
3. Go to API Keys section
4. Click "Create new secret key"
5. **IMPORTANT:** Copy the key immediately (you can't see it again!)
6. Save it in a safe place

**Cost:** OpenAI charges per use, but they give $5 free credit for new accounts. Perfect for hackathons!

---

## 🚀 Project Setup

### Step 1: Understand Folder Structure

```
WOMEN-EMPOWERMENT/
├── backend/          ← Python server code
│   ├── app/          ← Main application code
│   └── requirements.txt  ← List of Python packages needed
│
├── frontend/         ← React application code
│   ├── src/          ← Source code
│   │   ├── components/  ← Reusable UI pieces
│   │   ├── pages/       ← Full pages
│   │   └── services/    ← Code that talks to backend
│   └── package.json     ← List of Node packages needed
│
├── README.md         ← Project overview
├── DEMO-GUIDE.md     ← How to demo
└── setup.bat         ← Automated setup script
```

### Step 2: Quick Setup with Script (Windows)

**Easiest Way:**
1. Open PowerShell in the `WOMEN-EMPOWERMENT` folder
2. Run: `.\setup.bat`
3. Follow the prompts
4. Edit `backend\.env` file with your OpenAI key

### Step 3: Manual Setup (Understanding Each Step)

#### Backend Setup:

```powershell
# 1. Go to backend folder
cd backend

# 2. Create virtual environment
# (This creates isolated Python environment)
python -m venv venv

# 3. Activate virtual environment
# (This switches to using our isolated environment)
venv\Scripts\activate

# You'll see (venv) at start of command line now

# 4. Install Python packages
# (This downloads all libraries we need)
pip install -r requirements.txt

# Takes 1-2 minutes, installs:
# - FastAPI (web framework)
# - Uvicorn (server)
# - pymongo (MongoDB driver)
# - openai (AI integration)
# - etc.

# 5. Create .env file
copy .env.example .env

# 6. Edit .env file
# Open backend\.env in Notepad
# Change this line:
OPENAI_API_KEY=your_openai_api_key_here
# To:
OPENAI_API_KEY=sk-your-actual-key-from-openai
```

#### Frontend Setup:

```powershell
# Open NEW PowerShell window

# 1. Go to frontend folder
cd frontend

# 2. Install Node packages
# (This downloads all libraries we need)
npm install

# Takes 2-3 minutes, installs:
# - React (UI library)
# - React Router (navigation)
# - Tailwind CSS (styling)
# - Axios (API calls)
# - etc.

# You'll see node_modules/ folder created
```

---

## 🔧 Backend Deep Dive

### Understanding Backend Structure

```
backend/app/
├── main.py                 # Entry point - starts server
├── config/settings.py      # Configuration - loads .env
├── models/schemas.py       # Data structures - what data looks like
├── routes/
│   ├── skill_hub.py       # Skill Hub endpoints
│   └── health_bots.py     # Chatbot endpoints
├── services/ai_service.py  # OpenAI integration
└── prompts/
    ├── period_bot_prompt.py    # Period bot instructions
    └── pregnancy_bot_prompt.py # Pregnancy bot instructions
```

### Key Backend Concepts

**1. FastAPI App (`main.py`)**
```python
app = FastAPI()  # Create web application

@app.get("/")    # When user visits root URL
def root():
    return {"message": "Welcome"}  # Send back this
```

**2. Database Connection**
- MongoDB stores data in "collections" (like Excel sheets)
- We have 2 collections: `creators` and `products`
- PyMongo connects Python to MongoDB

**3. API Endpoints**
Think of endpoints as "actions" users can do:
- `/api/skill-hub/creators` - Get all creators
- `/api/skill-hub/add-product` - Add new product
- `/api/health-bots/period-chat` - Chat with period bot

**4. AI Integration**
```python
# We send:
1. System Prompt (tells AI how to behave)
2. User's message (their question)

# AI sends back:
Response (helpful answer)
```

### Starting Backend Server

```powershell
# Make sure you're in backend folder
cd backend

# Activate virtual environment
venv\Scripts\activate

# Start server
uvicorn app.main:app --reload --port 8000

# You'll see:
# INFO:     Uvicorn running on http://127.0.0.1:8000
# This means server is ready!
```

**What `--reload` does:**
Auto-restarts server when you change code (helpful for development)

**Testing Backend:**
1. Keep server running
2. Open browser
3. Go to: http://localhost:8000
4. Should see welcome message!
5. Go to: http://localhost:8000/docs
6. See interactive API documentation (very cool!)

---

## 🎨 Frontend Deep Dive

### Understanding Frontend Structure

```
frontend/src/
├── index.js              # Entry point - starts React
├── App.jsx               # Main component - has routing
├── index.css             # Global styles
├── components/           # Reusable pieces
│   ├── Navbar.jsx       # Top navigation bar
│   ├── CreatorCard.jsx  # Shows one creator
│   ├── ProductCard.jsx  # Shows one product
│   ├── ChatUI.jsx       # Chat interface
│   ├── PeriodForm.jsx   # Period bot input form
│   └── PregnancyForm.jsx # Pregnancy bot input form
└── pages/                # Full pages
    ├── HomePage.jsx
    ├── SkillHubPage.jsx
    ├── HealthAssistantPage.jsx
    ├── PeriodBotPage.jsx
    └── PregnancyBotPage.jsx
```

### Key Frontend Concepts

**1. React Components**
Think of components as building blocks:
```jsx
// A simple component
function Button() {
  return <button>Click Me</button>;
}

// Component with data
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

**2. React Router**
Handles navigation between pages:
```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/skill-hub" element={<SkillHubPage />} />
</Routes>
```

**3. State Management**
Data that changes:
```jsx
const [messages, setMessages] = useState([]);
// messages = current chat messages
// setMessages = function to update messages
```

**4. API Calls**
Talking to backend:
```jsx
// Send GET request
const creators = await getAllCreators();

// Send POST request
await sendPeriodChatMessage({
  age: 25,
  message: "Hello"
});
```

**5. Tailwind CSS**
Utility classes for styling:
```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  {/* bg-blue-500 = blue background */}
  {/* text-white = white text */}
  {/* p-4 = padding */}
  {/* rounded-lg = rounded corners */}
</div>
```

### Starting Frontend Server

```powershell
# Make sure you're in frontend folder
cd frontend

# Start development server
npm start

# You'll see:
# Compiled successfully!
# Browser will open automatically at http://localhost:3000
```

---

## ▶️ Running the Application

### Method 1: Automatic (Windows)

```powershell
# In WOMEN-EMPOWERMENT folder
.\start.bat

# This opens 2 terminal windows:
# Window 1: Backend server
# Window 2: Frontend server
```

### Method 2: Manual (Step by Step)

**Terminal 1 - Backend:**
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

**Terminal 3 - MongoDB (if using local):**
```powershell
# Check if running
sc query MongoDB

# If not running, start it
net start MongoDB
```

### Checking Everything Works

1. **Backend Check:**
   - Open browser
   - Go to http://localhost:8000
   - Should see welcome message
   - Go to http://localhost:8000/docs
   - Should see API documentation

2. **Frontend Check:**
   - Browser should auto-open to http://localhost:3000
   - Should see SAKHI HUB home page
   - Should see two big buttons

3. **Database Check:**
   - In browser, go to http://localhost:8000/health
   - Should see `"database": "connected"`

---

## 🧪 Testing Features

### Test 1: Home Page

1. Should see welcome message
2. Two feature cards visible
3. Click "Explore Skill Hub" → Goes to skill hub page
4. Click back, then "Get Health Support" → Goes to health page

### Test 2: Skill Hub

1. Navigate to Skill Hub
2. Click "Load Demo Data" button
3. Wait 2 seconds
4. Should see 3 creator cards appear
5. Scroll down, should see 3 product cards
6. Click "View Profile" on any creator
7. Click "Order Now" on any product
8. Enter location, click Confirm
9. Should see success message

### Test 3: Period Care Bot

1. Go to Home → Health Assistant
2. Click "Period Care Bot"
3. Fill form:
   - Age: 25
   - Last Period Date: [Select date 15 days ago]
4. Click "Start Chat"
5. Should see:
   - Next period prediction at top
   - Welcome message in chat
6. Type: "What can I eat for cramps?"
7. Wait 3-5 seconds
8. Should see AI response with food suggestions
9. Click a quick tip button
10. Should get another response

### Test 4: Pregnancy Care Bot

1. Go back to Health Assistant
2. Click "Pregnancy Care Bot"
3. Fill form:
   - Pregnancy Date: [Select date 3 months ago]
4. Click "Start Chat"
5. Should see:
   - Trimester info at top
   - Welcome message with disclaimer
6. Type: "What foods should I eat?"
7. Wait 3-5 seconds
8. Should see trimester-specific nutrition advice
9. Try other quick questions

---

## 🐛 Troubleshooting

### Problem: "Python not found"

**Solution:**
1. Reinstall Python
2. CHECK "Add Python to PATH" during installation
3. Restart computer
4. Try again

### Problem: "npm not found"

**Solution:**
1. Reinstall Node.js
2. Use default settings
3. Restart computer
4. Try again

### Problem: Backend won't start

**Error:** "MongoDB connection failed"
**Solution:**
1. Check if MongoDB is running: `sc query MongoDB`
2. If not running: `net start MongoDB`
3. OR use MongoDB Atlas connection string in .env

**Error:** "OpenAI API key not found"
**Solution:**
1. Check backend\.env file exists
2. Make sure line looks like: `OPENAI_API_KEY=sk-xxxxx`
3. No spaces around `=`
4. Restart backend server

### Problem: Frontend shows "Connection Error"

**Solution:**
1. Check if backend is running (should see terminal with server logs)
2. Visit http://localhost:8000/health in browser
3. Should see "status": "healthy"
4. If not, restart backend

### Problem: Chatbots not responding

**Possible Causes:**
1. **No OpenAI API key** - Check .env file
2. **Out of credits** - Check OpenAI account
3. **Backend not running** - Check terminal
4. **Wrong API key** - Get new key from OpenAI

**Check OpenAI Credits:**
1. Go to https://platform.openai.com/account/usage
2. Check if you have credits left
3. New accounts get $5 free

### Problem: "Port already in use"

**Error:** "Address already in use: 8000"
**Solution:**
```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill that process (use PID from above)
taskkill /PID [PID_NUMBER] /F

# Or change port:
uvicorn app.main:app --reload --port 8001
```

---

## 🎬 Demo Preparation

### Day Before Hackathon

1. **Test Everything:**
   - Run complete setup
   - Test all features
   - Note any issues

2. **Prepare Backup:**
   - Take screenshots of working app
   - Record screen video of demo
   - Save OpenAI API key separately

3. **Practice Demo:**
   - Practice 2-3 times
   - Time yourself (should be 5-7 minutes)
   - Prepare answers to likely questions

### Morning of Presentation

1. **Fresh Setup:**
   ```powershell
   # Close all terminals
   # Restart computer (fresh start!)
   # Start MongoDB
   net start MongoDB
   
   # Start backend
   cd backend
   venv\Scripts\activate
   uvicorn app.main:app --reload --port 8000
   
   # Start frontend (new terminal)
   cd frontend
   npm start
   ```

2. **Load Demo Data:**
   - Open http://localhost:3000
   - Go to Skill Hub
   - Click "Load Demo Data"

3. **Test Chatbots:**
   - Quick test with both bots
   - Make sure OpenAI is responding

### During Presentation

1. **Confidence:**
   - You built this!
   - You understand every part
   - You can explain any piece

2. **If Something Breaks:**
   - Stay calm
   - Have backup video ready
   - Explain the architecture instead
   - Show the code

3. **Key Points to Emphasize:**
   - Social impact (helping rural women)
   - Technical complexity (multiple technologies)
   - Scalability (can reach millions)
   - Attention to detail (disclaimers, validation)

---

## 📝 Understanding the Code

### Example: Period Bot Flow

**User fills form:**
```jsx
// frontend/src/pages/PeriodBotPage.jsx
const handleFormSubmit = (formData) => {
  setSessionData({
    age: formData.age,
    lastPeriodDate: formData.lastPeriodDate
  });
  setSessionStarted(true);
};
```

**User sends message:**
```jsx
const handleSendMessage = async (message) => {
  // Call API
  const response = await sendPeriodChatMessage({
    age: sessionData.age,
    last_period_date: sessionData.lastPeriodDate,
    message: message
  });
  
  // Show response
  setMessages([...messages, botMessage]);
};
```

**Backend processes:**
```python
# backend/app/routes/health_bots.py
@router.post("/period-chat")
async def period_chat(request: PeriodChatRequest):
    # Calculate next period
    period_info = calculate_next_period(request.last_period_date)
    
    # Get AI response
    ai_response = await ai_service.get_period_chat_response(
        user_message=request.message,
        age=request.age,
        next_period_prediction=period_info["next_period_date"]
    )
    
    return ChatResponse(
        response=ai_response,
        prediction=f"Next period: {period_info['next_period_date']}"
    )
```

**AI service:**
```python
# backend/app/services/ai_service.py
async def get_period_chat_response(user_message, age, ...):
    # Call OpenAI
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": PERIOD_CARE_SYSTEM_PROMPT},
            {"role": "user", "content": user_message}
        ]
    )
    
    return response.choices[0].message.content
```

---

## 🎓 Learning Resources

### Want to Learn More?

**React:**
- Official Tutorial: https://react.dev/learn
- FreeCodeCamp: https://www.freecodecamp.org/

**FastAPI:**
- Official Docs: https://fastapi.tiangolo.com/
- Tutorial: https://fastapi.tiangolo.com/tutorial/

**MongoDB:**
- University: https://university.mongodb.com/
- Docs: https://docs.mongodb.com/

**OpenAI:**
- API Docs: https://platform.openai.com/docs

### Next Steps After Hackathon

1. **Add Authentication:**
   - User login/signup
   - JWT tokens
   - Protected routes

2. **Improve AI:**
   - Add conversation history
   - Multi-turn conversations
   - Better context management

3. **Mobile App:**
   - React Native
   - Same backend, different frontend

4. **More Features:**
   - Payment integration
   - Real-time chat
   - Video calls
   - Community forums

---

## 🏆 You Did It!

Congratulations! You now understand:
- Full-stack web development
- Frontend (React)
- Backend (FastAPI)
- Database (MongoDB)
- AI Integration (OpenAI)
- RESTful APIs
- Deployment

**Most importantly:**
You built something with real social impact! 🌸

---

## 💬 Final Tips

1. **Understand, Don't Memorize:**
   - Know WHY, not just HOW
   - Be able to explain your choices

2. **Embrace Questions:**
   - Questions mean they're interested!
   - "Great question! Let me explain..."

3. **Show Passion:**
   - This helps real people
   - You care about the impact
   - Technology for good

4. **Be Honest:**
   - Don't know something? Say so!
   - "That's a great idea for future work"

5. **Have Fun:**
   - You worked hard
   - Enjoy the presentation
   - Be proud of what you built

---

**Good luck with your hackathon! You're going to do great! 🚀**

---

## 📞 Quick Reference

**Start Backend:**
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Start Frontend:**
```powershell
cd frontend
npm start
```

**Key URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

**Emergency Fixes:**
- Backend not starting? Check .env file
- Frontend errors? Try `npm install` again
- MongoDB issues? Use MongoDB Atlas
- Port in use? Change to 8001

---

**You've got this! 💪 Now go change the world! 🌍**
