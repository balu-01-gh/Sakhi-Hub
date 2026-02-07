"""
Quick Test Script - Google Gemini Integration
Run this to verify your AI setup is working
"""

import os
import sys

# Add the app directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

def test_google_ai():
    print("\n" + "="*50)
    print("🧪 TESTING GOOGLE AI STUDIO CONNECTION")
    print("="*50 + "\n")
    
    # Check if API key exists
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("❌ ERROR: GOOGLE_API_KEY not found in .env file!")
        print("   Please add your API key to backend/.env")
        return False
    
    print(f"✅ API Key found: ********************")
    
    try:
        # Configure Google AI
        genai.configure(api_key=api_key)
        model_name = "gemini-2.5-flash"
        print(f"📡 Configuring model: {model_name}")
        model = genai.GenerativeModel(model_name)
        
        print("\n📡 Sending test request to Google Gemini...")
        
        # Test request
        response = model.generate_content(
            "Say 'Hello! Google Gemini is working!' in a friendly way.",
            generation_config=genai.types.GenerationConfig(
                temperature=0.7,
                max_output_tokens=50
            )
        )
        
        print("\n✅ SUCCESS! Response received:")
        print("-" * 50)
        print(response.text)
        print("-" * 50)
        
        print("\n🎉 Google Gemini integration is working perfectly!")
        print("   You can now use the Period Bot and Pregnancy Bot!")
        
        return True
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        print("\nPossible issues:")
        print("1. Invalid API key")
        print("2. No internet connection")
        print("3. API quota exceeded")
        print("\nGet a new key at: https://aistudio.google.com/apikey")
        return False

if __name__ == "__main__":
    success = test_google_ai()
    
    if success:
        print("\n" + "="*50)
        print("✅ ALL TESTS PASSED - READY FOR DEMO!")
        print("="*50)
        sys.exit(0)
    else:
        print("\n" + "="*50)
        print("❌ TEST FAILED - FIX THE ISSUES ABOVE")
        print("="*50)
        sys.exit(1)
