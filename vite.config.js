import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Azure Static Web Apps requires relative base path
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper hashing for cache busting
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})