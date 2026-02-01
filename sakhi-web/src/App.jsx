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
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import HealthDashboard from './pages/HealthDashboard';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import OfflineIndicator from './components/OfflineIndicator';
import Safety from './pages/Safety';
import Education from './pages/Education';
import Schemes from './pages/Schemes';
import Community from './pages/Community';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <OfflineIndicator />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 flex flex-col transition-colors">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/health-dashboard" element={<HealthDashboard />} />
              <Route path="/skill-hub" element={<SkillHub />} />
              <Route path="/health-assistant" element={<HealthAssistant />} />
              <Route path="/period-bot" element={<PeriodBot />} />
              <Route path="/pregnancy-bot" element={<PregnancyBot />} />
              <Route path="/krishi-bot" element={<KrishiBot />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/education" element={<Education />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/community" element={<Community />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
