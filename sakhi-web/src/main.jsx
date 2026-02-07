import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
      throw new Error("Root element not found");
  }

  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>,
  );
  console.log("React mounted successfully");
} catch (error) {
  console.error("Failed to mount React app:", error);
  document.body.innerHTML = `<div style="color:red; padding: 20px;"><h1>Failed to mount App</h1><pre>${error.message}\n${error.stack}</pre></div>`;
}
