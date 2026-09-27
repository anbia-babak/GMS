import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  // UI build setup: compiles the existing TailwindCSS v4 directives and utilities.
  plugins: [react(), tailwindcss(),nodePolyfills()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: "http://localhost:5000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/,""),
      }
    }
  }
})
