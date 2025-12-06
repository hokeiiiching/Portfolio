import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to Deezer for local development
      // In production, Vercel serverless functions handle this
      '/api/deezer/search': {
        target: 'https://api.deezer.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deezer\/search/, '/search/track'),
      },
      '/api/deezer/charts': {
        target: 'https://api.deezer.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deezer\/charts/, '/chart/0/tracks'),
      },
      '/api/deezer/track': {
        target: 'https://api.deezer.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deezer\/track/, '/track'),
      },
    },
  },
})
