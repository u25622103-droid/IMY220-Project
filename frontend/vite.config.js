import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  
    port: 5173,
    proxy: {
      '/login': {
        target: 'http://backend:5000',
        changeOrigin: true
      },
      '/signup': {
        target: 'http://backend:5000',
        changeOrigin: true
      },
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true
      }
    }
  }
})