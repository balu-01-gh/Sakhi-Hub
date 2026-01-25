import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/creators': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/products': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/create-profile': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/add-product': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/period-chat': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/pregnancy-chat': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
})
