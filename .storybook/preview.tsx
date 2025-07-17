import React from 'react';
import type { Preview } from "@storybook/react";
import { BrowserRouter as Router } from 'react-router';
import './preview.css';
import '../app/app.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Router>
        <div className="p-4">
          <Story />
        </div>
      </Router>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#313643' },
      ],
    },
  },
};

export default preview;
