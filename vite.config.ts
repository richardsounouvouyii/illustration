import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// VITE_BASE=/illustration/ pour GitHub Pages ; laisser vide (défaut /) pour Vercel / Netlify
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/fabric')) return 'fabric'
          if (id.includes('node_modules/jspdf') || id.includes('node_modules/html2canvas')) {
            return 'export'
          }
        },
      },
    },
  },
})
