"""
Quick script to list available Gemini models
"""
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
print(f"API Key loaded: ********************" if api_key else "No API key found!")

genai.configure(api_key=api_key)

print("\n📋 Available Gemini models:")
print("=" * 50)

try:
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"✅ {model.name}")
            print(f"   Display Name: {model.display_name}")
            print(f"   Description: {model.description}")
            print()
except Exception as e:
    print(f"❌ Error listing models: {e}")
