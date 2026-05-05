import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://r84zf4x2-8000.use.devtunnels.ms',
        changeOrigin: 'true'
      }
    }
  }
})
