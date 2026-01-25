# 📚 TECHNICAL DOCUMENTATION - SAKHI HUB

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SAKHI HUB PLATFORM                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐         ┌──────────────────┐          │
│  │   React         │◄───────►│   FastAPI        │          │
│  │   Frontend      │  HTTP   │   Backend        │          │
│  │   (Port 3000)   │         │   (Port 8000)    │          │
│  └─────────────────┘         └──────────────────┘          │
│         │                            │                      │
│         │                            │                      │
│         │                            ├──────► MongoDB       │
│         │                            │        Database      │
│         │                            │                      │
│         │                            └──────► OpenAI API    │
│         │                                     GPT-3.5       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Detailed Folder Structure

### Backend Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI app initialization & routes registration
│   ├── config/
│   │   └── settings.py         # Environment config & settings management
│   ├── models/
│   │   └── schemas.py          # Pydantic models for request/response validation
│   ├── routes/
│   │   ├── skill_hub.py        # Skill Hub API endpoints
│   │   └── health_bots.py      # Health bots API endpoints
│   ├── services/
│   │   └── ai_service.py       # OpenAI integration service
│   └── prompts/
│       ├── period_bot_prompt.py      # Period bot system prompt
│       └── pregnancy_bot_prompt.py   # Pregnancy bot system prompt
├── requirements.txt            # Python dependencies
└── .env.example               # Environment variables template
```

### Frontend Structure

```
frontend/
├── public/
│   └── index.html             # HTML template
├── src/
│   ├── components/            # Reusable React components
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── CreatorCard.jsx    # Creator profile card
│   │   ├── ProductCard.jsx    # Product card
│   │   ├── ChatUI.jsx         # Chat interface
│   │   ├── PeriodForm.jsx     # Period bot input form
│   │   └── PregnancyForm.jsx  # Pregnancy bot input form
│   ├── pages/                 # Page components
│   │   ├── HomePage.jsx       # Landing page
│   │   ├── SkillHubPage.jsx   # Skill marketplace
│   │   ├── HealthAssistantPage.jsx   # Health bot selector
│   │   ├── PeriodBotPage.jsx         # Period care bot
│   │   └── PregnancyBotPage.jsx      # Pregnancy care bot
│   ├── services/
│   │   └── api.js             # API integration service
│   ├── App.jsx                # Main app component with routing
│   ├── index.js               # React entry point
│   └── index.css              # Global styles (Tailwind)
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
└── postcss.config.js          # PostCSS configuration
```

---

## 🗄️ Database Schema

### MongoDB Collections

#### 1. **creators** Collection

```javascript
{
  _id: ObjectId("..."),
  name: String,                    // Creator's full name
  village: String,                 // Village name
  skill_category: String,          // Skill type
  experience: String,              // About/experience text
  work_samples: [String],          // Array of image URLs
  contact_number: String,          // Phone number (optional)
  email: String,                   // Email (optional)
  created_at: DateTime             // Creation timestamp
}
```

**Example:**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0",
  "name": "Radha Devi",
  "village": "Rampur",
  "skill_category": "Handicrafts",
  "experience": "I have been making traditional pottery for 10 years...",
  "work_samples": [
    "https://example.com/pottery1.jpg",
    "https://example.com/pottery2.jpg"
  ],
  "contact_number": "+91-9876543210",
  "email": "radha@example.com",
  "created_at": "2026-01-15T10:00:00Z"
}
```

#### 2. **products** Collection

```javascript
{
  _id: ObjectId("..."),
  product_name: String,            // Product name
  creator_name: String,            // Creator's name
  price: Number,                   // Price in INR
  description: String,             // Product description
  image_url: String,               // Product image URL
  category: String,                // Product category
  available: Boolean,              // Availability status
  created_at: DateTime             // Creation timestamp
}
```

**Example:**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j1",
  "product_name": "Handmade Clay Pot Set",
  "creator_name": "Radha Devi",
  "price": 450.00,
  "description": "Beautiful set of 3 traditional clay pots...",
  "image_url": "https://example.com/clay-pot.jpg",
  "category": "Handicrafts",
  "available": true,
  "created_at": "2026-01-18T10:00:00Z"
}
```

---

## 🔌 API Endpoints Documentation

### Base URL: `http://localhost:8000/api`

### 1. Skill Hub Endpoints

#### **POST** `/skill-hub/create-profile`
Create a new creator profile

**Request Body:**
```json
{
  "name": "Sunita Kumari",
  "village": "Bhopal Khurd",
  "skill_category": "Tailoring",
  "experience": "Experienced tailor...",
  "work_samples": ["url1", "url2"],
  "contact_number": "+91-9876543211",
  "email": "sunita@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile created successfully!",
  "data": {
    "profile_id": "65a1b2c3d4e5f6g7h8i9j0",
    "name": "Sunita Kumari"
  }
}
```

#### **GET** `/skill-hub/creators`
Get all creators

**Response:**
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0",
    "name": "Radha Devi",
    "village": "Rampur",
    "skill_category": "Handicrafts",
    ...
  }
]
```

#### **POST** `/skill-hub/add-product`
Add a new product

**Request Body:**
```json
{
  "product_name": "Handmade Clay Pot",
  "creator_name": "Radha Devi",
  "price": 250.00,
  "description": "Beautiful traditional clay pot...",
  "image_url": "https://example.com/pot.jpg",
  "category": "Handicrafts"
}
```

#### **GET** `/skill-hub/products`
Get all available products

---

### 2. Health Bots Endpoints

#### **POST** `/health-bots/period-chat`
Send message to Period Care Bot

**Request Body:**
```json
{
  "age": 25,
  "last_period_date": "2026-01-10",
  "message": "I have severe cramps. What can I do?"
}
```

**Response:**
```json
{
  "response": "For menstrual cramps, try these natural remedies...",
  "prediction": "Next period expected: 2026-02-07 (in 13 days)",
  "additional_info": {
    "next_period_date": "2026-02-07",
    "days_since_last": 15,
    "days_until_next": 13,
    "current_cycle_day": 15,
    "cycle_phase": "Ovulation Phase"
  }
}
```

#### **POST** `/health-bots/pregnancy-chat`
Send message to Pregnancy Care Bot

**Request Body:**
```json
{
  "pregnancy_confirmation_date": "2025-11-01",
  "message": "What foods should I eat?"
}
```

**Response:**
```json
{
  "response": "During your second trimester, focus on these nutritious foods...",
  "prediction": "Week 16 - Second Trimester (Weeks 13-26) | Due date: 2026-08-08 (186 days)",
  "additional_info": {
    "weeks_pregnant": 16,
    "trimester": "Second Trimester (Weeks 13-26)",
    "due_date": "2026-08-08",
    "days_until_due": 186
  }
}
```

---

## 🤖 AI Integration Details

### OpenAI Configuration

**Model:** GPT-3.5-turbo
**Temperature:** 0.7 (balanced creativity and consistency)
**Max Tokens:** 500 (cost optimization)

### System Prompts

Both chatbots use comprehensive system prompts that define:
- Role and behavior
- Communication style
- Topics they can/cannot help with
- Safety guidelines
- Cultural sensitivity

### Context Injection

Each chat request includes:
- User's specific information (age, dates, etc.)
- Calculated predictions (period dates, trimester info)
- Dynamic context based on user data

**Example Flow:**
```
User Input → Backend API → Calculate Dates → Build Context Prompt 
→ Send to OpenAI → Parse Response → Return to Frontend
```

---

## 🎨 Frontend Components Breakdown

### Component Hierarchy

```
App
├── Navbar
└── Routes
    ├── HomePage
    ├── SkillHubPage
    │   ├── CreatorCard (multiple)
    │   └── ProductCard (multiple)
    ├── HealthAssistantPage
    ├── PeriodBotPage
    │   ├── PeriodForm
    │   └── ChatUI
    └── PregnancyBotPage
        ├── PregnancyForm
        └── ChatUI
```

### Key React Patterns Used

1. **State Management:** `useState` for local state
2. **Side Effects:** `useEffect` for data fetching
3. **Routing:** `react-router-dom` for navigation
4. **API Calls:** Axios with centralized service
5. **Form Handling:** Controlled components with validation
6. **Error Handling:** Try-catch with user-friendly messages

---

## 🔒 Security Considerations

### Current Implementation

1. **API Keys:** Stored in `.env` files (not committed to git)
2. **CORS:** Configured to allow frontend origin only
3. **Input Validation:** Pydantic models validate all inputs
4. **Error Handling:** Generic error messages to avoid info leakage
5. **No Auth:** Demo purposes only

### Production Recommendations

- Implement JWT authentication
- Add rate limiting
- Use HTTPS only
- Encrypt sensitive data
- Add CAPTCHA for forms
- Implement user sessions
- Add audit logging

---

## ⚡ Performance Optimizations

### Implemented

1. **MongoDB Indexes:** Created on frequently queried fields
2. **API Timeout:** 10 second timeout for external calls
3. **Error Boundaries:** Graceful error handling
4. **Loading States:** User feedback during async operations
5. **Lazy Loading:** Images with error fallbacks

### Future Optimizations

- Redis caching for frequently accessed data
- CDN for static assets
- Image optimization and compression
- Backend response pagination
- React code splitting

---

## 🧪 Testing Strategy

### Manual Testing Checklist

**Skill Hub:**
- [ ] Create profile works
- [ ] View all creators
- [ ] Product listing displays
- [ ] Order flow works

**Period Bot:**
- [ ] Form validation works
- [ ] Date calculation accurate
- [ ] Chat responses relevant
- [ ] Prediction displays correctly

**Pregnancy Bot:**
- [ ] Form validation works
- [ ] Trimester calculation correct
- [ ] Chat responses trimester-specific
- [ ] Due date calculation accurate

### Automated Testing (Future)

```python
# Backend: pytest
pytest tests/

# Frontend: Jest + React Testing Library
npm test
```

---

## 📊 Sample Data Generator

The `/seed-demo-data` endpoint creates:
- 3 sample creators (Radha Devi, Sunita Kumari, Meera Bai)
- 3 sample products (Clay Pot Set, Embroidered Kurta, Madhubani Art)

This is useful for quick demos and testing.

---

## 🚀 Deployment Guide

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create sakhi-hub-backend

# Add MongoDB addon
heroku addons:create mongodb:sandbox

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key_here

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Environment Variables for Production

Backend:
- `OPENAI_API_KEY`
- `MONGODB_URL`
- `DATABASE_NAME`
- `API_HOST`
- `API_PORT`
- `CORS_ORIGINS` (update with production frontend URL)

---

## 🔧 Development Workflow

### Adding a New Feature

1. **Backend:**
   - Add model in `schemas.py`
   - Create endpoint in appropriate route file
   - Test with FastAPI docs (`/docs`)

2. **Frontend:**
   - Create component in `components/`
   - Add page if needed in `pages/`
   - Update API service in `services/api.js`
   - Add route in `App.jsx`

### Code Style

- **Backend:** Follow PEP 8 (Python style guide)
- **Frontend:** ESLint + Prettier
- **Comments:** Explain "why", not "what"

---

## 📈 Future Enhancements

### Phase 1 (Immediate)
- [ ] User authentication
- [ ] Multi-language support (Hindi, regional)
- [ ] Voice input for low-literacy users
- [ ] WhatsApp integration

### Phase 2 (3-6 months)
- [ ] Video tutorials
- [ ] Community forums
- [ ] Payment gateway integration
- [ ] Delivery tracking

### Phase 3 (6-12 months)
- [ ] Mobile app (React Native)
- [ ] Telemedicine integration
- [ ] Government scheme integration
- [ ] Analytics dashboard

---

## 📞 Support & Contact

For technical questions or contributions:
- Create an issue on GitHub
- Email: [your-email]
- Documentation: This file

---

## 📜 License

MIT License - Free to use and modify

---

**Built with ❤️ for rural women empowerment**
