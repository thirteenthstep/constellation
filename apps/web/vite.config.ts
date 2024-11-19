import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions,
  },
  define: {
    __DEV__: process.env.NODE_ENV !== 'PRODUCTION',
  },
});
