import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatUI from '../components/ChatUI';
import { useLanguage } from '../context/LanguageContext';
import { sendKrishiChat } from '../services/api';

const KrishiBotPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    farm_size: '',
    crops: '',
    location: '',
    season: 'current'
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    
    // Add welcome message with correct format
    const welcomeMsg = {
      role: 'assistant',
      content: `Namaste! I'm Krishi Sakhi, your agricultural companion. I can help you with:

**Crop Selection & Planning**
**Water & Irrigation Management**  
**Organic Farming & Pest Control**
**Seasonal Guidance**
**Government Schemes for Farmers**
**Market Information**

Tell me what you'd like to know about farming! I'm here to help.`
    };
    
    setMessages([welcomeMsg]);
  };

  const handleSendMessage = async (message) => {
    // Add user message with correct format
    const userMessage = {
      role: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to backend using centralized API service
      const data = await sendKrishiChat({
        message: message,
        user_info: formData
      });

      // Add bot response with correct format
      const botMessage = {
        role: 'assistant',
        content: data.response
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message with correct format
      const errorMessage = {
        role: 'assistant',
        content: "I'm having a small technical hiccup right now. Please try again in a moment, or visit your nearest Krishi Vigyan Kendra for immediate help!"
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/health-assistant')}
            className="mb-6 flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <span className="mr-2">←</span> Back to Health Assistant
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌾</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent mb-3">
                Krishi Sakhi
              </h1>
              <p className="text-gray-600 text-lg">
                Your Agricultural Companion | आपकी कृषि सखी
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Get personalized farming guidance for sustainable agriculture
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  🏞️ Farm Size / खेत का आकार
                </label>
                <select
                  value={formData.farm_size}
                  onChange={(e) => setFormData({...formData, farm_size: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="">Select farm size</option>
                  <option value="kitchen-garden">Kitchen Garden (घरेलू बगीचा)</option>
                  <option value="less-than-1-acre">Less than 1 acre (1 एकड़ से कम)</option>
                  <option value="1-2-acres">1-2 acres (1-2 एकड़)</option>
                  <option value="2-5-acres">2-5 acres (2-5 एकड़)</option>
                  <option value="more-than-5-acres">More than 5 acres (5 एकड़ से अधिक)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  🌱 Current/Planned Crops / वर्तमान/योजनाबद्ध फसलें
                </label>
                <input
                  type="text"
                  value={formData.crops}
                  onChange={(e) => setFormData({...formData, crops: e.target.value})}
                  placeholder="e.g., Tomato, Rice, Wheat, Mixed Vegetables"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">You can mention multiple crops</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  📍 Location (State/District) / स्थान (राज्य/जिला)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Maharashtra, Punjab, UP"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  🌤️ Current Season / वर्तमान मौसम
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData({...formData, season: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="current">Current Season</option>
                  <option value="summer">Summer (गर्मी)</option>
                  <option value="monsoon">Monsoon (बरसात)</option>
                  <option value="winter">Winter (सर्दी)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-lime-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                🌾 Start Agricultural Guidance
              </button>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-800">
                  <strong>💡 What you can ask:</strong>
                </p>
                <ul className="text-xs text-green-700 mt-2 space-y-1 ml-4">
                  <li>• Best crops for my farm size</li>
                  <li>• Organic pest control methods</li>
                  <li>• Water-saving irrigation techniques</li>
                  <li>• Government schemes and subsidies</li>
                  <li>• Seasonal farming calendar</li>
                  <li>• Soil health improvement tips</li>
                </ul>
              </div>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-xs text-yellow-800">
                <strong>⚠️ Important:</strong> This AI provides general agricultural guidance. For technical issues, diseases, or major decisions, please consult your local Agricultural Extension Officer or visit Krishi Vigyan Kendra (KVK).
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 flex items-center text-green-600 hover:text-green-700 transition-colors"
        >
          <span className="mr-2">←</span> Update Farm Details
        </button>

        <ChatUI
          title="🌾 Krishi Sakhi - कृषि सखी"
          messages={messages}
          onSend={handleSendMessage}
          isLoading={isLoading}
        />

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
            <div className="text-2xl mb-2">📞</div>
            <p className="font-semibold text-gray-800 text-sm">Kisan Call Centre</p>
            <p className="text-green-600 font-bold">1800-180-1551</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
            <div className="text-2xl mb-2">🌐</div>
            <p className="font-semibold text-gray-800 text-sm">PM-KISAN Portal</p>
            <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="text-green-600 text-xs hover:underline">
              pmkisan.gov.in
            </a>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
            <div className="text-2xl mb-2">🏛️</div>
            <p className="font-semibold text-gray-800 text-sm">Find Nearest KVK</p>
            <a href="https://kvk.icar.gov.in" target="_blank" rel="noopener noreferrer" className="text-green-600 text-xs hover:underline">
              kvk.icar.gov.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrishiBotPage;
