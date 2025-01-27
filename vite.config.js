import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Adjust if deploying to a subdirectory
  build: {
    outDir: 'dist', // Ensure this matches your build folder
  },
});
