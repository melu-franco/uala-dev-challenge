import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        svgo: true,
        replaceAttrValues: { '#000': 'currentColor' },
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: { removeViewBox: false }
              }
            }
          ]
        }
      }
    }),
    tailwindcss(),
    tsconfigPaths(),
    reactRouter(),
    storybookTest({ configDir: path.join(dirname, '.storybook') })
  ],
  resolve: {
    alias: {
      '@components': path.resolve(dirname, './app/components')
    }
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [],
        test: {
          name: 'storybook',
          browser: { enabled: true, headless: true, provider: 'playwright', instances: [{ browser: 'chromium' }] },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  },
  server: {
    hmr: false,
    port: 3000,
    watch: { usePolling: true },
  },
  optimizeDeps: { include: ['react-router'] },
});
