import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Analytics from './pages/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-soft-pink via-white to-soft-purple text-gray-800">
      <ScrollToTop />
      <OfflineIndicator />
      <Navbar />
      
      <main className="flex-grow pt-24 px-4 pb-12">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <PageTransition><Profile /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute>
              <PageTransition><Analytics /></PageTransition>
            </ProtectedRoute>
          } />

          {/* Feature Routes */}
          <Route path="/skill-hub" element={<PageTransition><SkillHub /></PageTransition>} />
          <Route path="/health" element={<PageTransition><HealthAssistant /></PageTransition>} />
          <Route path="/health/period-bot" element={<PageTransition><PeriodBot /></PageTransition>} />
          <Route path="/health/pregnancy-bot" element={<PageTransition><PregnancyBot /></PageTransition>} />
          <Route path="/health/krishi-bot" element={<PageTransition><KrishiBot /></PageTransition>} />
          <Route path="/health-dashboard" element={<PageTransition><HealthDashboard /></PageTransition>} />
          
          <Route path="/safety" element={<PageTransition><Safety /></PageTransition>} />
          <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
          <Route path="/schemes" element={<PageTransition><Schemes /></PageTransition>} />
          <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
          
          {/* 404 Route */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
