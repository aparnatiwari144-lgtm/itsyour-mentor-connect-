import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset paths so production build works in any directory or static server
  server: {
    port: 5173,
    host: true
  }
});
