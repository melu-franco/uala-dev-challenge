import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite';
import tailwindConfig from './tailwind.config.js';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: true,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
    },
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'tailwindcss',
          options: tailwindConfig,
        },
        {
          postcssPlugin: 'autoprefixer',
        },
      ],
    },
  },
});