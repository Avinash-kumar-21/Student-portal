import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Splits vendor libraries into a separate chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (optional)
  },
});
