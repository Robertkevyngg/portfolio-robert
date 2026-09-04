import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base '/' serve para Vercel, Netlify e usuario.github.io
// Para GitHub Pages em subpasta, o workflow define VITE_BASE=/nome-do-repo/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', sourcemap: false },
})
