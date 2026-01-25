import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SkillHub from './pages/SkillHub';
import HealthAssistant from './pages/HealthAssistant';
import PeriodBot from './pages/PeriodBot';
import PregnancyBot from './pages/PregnancyBot';
import KrishiBot from './pages/KrishiBot';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Safety from './pages/Safety';
import Education from './pages/Education';
import Schemes from './pages/Schemes';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skill-hub" element={<SkillHub />} />
            <Route path="/health-assistant" element={<HealthAssistant />} />
            <Route path="/period-bot" element={<PeriodBot />} />
            <Route path="/pregnancy-bot" element={<PregnancyBot />} />
            <Route path="/krishi-bot" element={<KrishiBot />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/education" element={<Education />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
