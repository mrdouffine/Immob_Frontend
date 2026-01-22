import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false, // Ne pas ouvrir automatiquement
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks pour meilleur caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'state-vendor': ['zustand'],
          'validation-vendor': ['zod'],
          'crypto-vendor': ['crypto-js'],
          'ui-vendor': ['react-error-boundary', 'react-hot-toast'],
        },
      },
    },
    // Optimisations
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Retirer console.log en production
        drop_debugger: true,
      },
    },
    // Taille des chunks
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Pas de sourcemaps en production par défaut
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
});
