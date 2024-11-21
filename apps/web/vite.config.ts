import {tamaguiPlugin} from '@tamagui/vite-plugin';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';


const extensions = [
  '.web.js',
  '.web.jsx',
  '.web.ts',
  '.web.tsx',
  '.mjs',
  '.js',
  '.mts',
  '.ts',
  '.jsx',
  '.tsx',
  '.json',
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin({
      config: 'src/tamagui.config.ts',
      components: ['tamagui'],
      optimize: true,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions,
  },
  define: {
    __DEV__: `${process.env.NODE_ENV === 'development'}`,
    DEV: `${process.env.NODE_ENV === 'development'}`,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
});
