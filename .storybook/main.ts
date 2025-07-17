import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.storybook.js',
      },
    },
  },
  docs: {
    defaultName: 'Documentation',
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [...(config.optimizeDeps?.include ?? []), 'react-router', 'react-router-dom'],
      },
    };
  },
};

export default config;