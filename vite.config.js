import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // UI build setup: compiles the existing TailwindCSS v4 directives and utilities.
  plugins: [react(), tailwindcss()],
})
