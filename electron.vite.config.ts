// electron.vite.config.ts

// ! lib
import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        // ? main
        '@main': resolve('src/main'),
        '@window': resolve('src/main/window'),

        // ? shared
        '@shared': resolve('src/shared'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    assetsInclude: 'src/renderer/shared/assets/**',
    resolve: {
      alias: {
        // ? renderer
        '@renderer': resolve('src/renderer'),
        // ? shared
        '@shared': resolve('src/shared'),
      },
    },
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    build: {
      rollupOptions: {
        input: {
          "main": resolve('src/renderer/app/index.html'),
        }
      }
    }
  },
});
