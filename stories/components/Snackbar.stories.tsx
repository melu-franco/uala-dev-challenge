import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Snackbar } from '../../app/components/Snackbar';
import { Button } from '../../app/components/Button';
import { Container } from '../../app/components/Container';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'The message to display in the snackbar',
    },
    isVisible: {
      control: 'boolean',
      description: 'Whether the snackbar is visible',
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before auto-hide',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is a default snackbar message',
    type: 'error',
    isVisible: true,
    duration: 5000,
  },
};

export const LongMessage: Story = {
  args: {
    message: 'Este es un mensaje muy largo que demuestra cómo el Snackbar maneja contenido extenso y se adapta al ancho máximo configurado manteniendo la legibilidad del texto.',
    isVisible: true,
    duration: 8000,
  },
};

export const QuickDismiss: Story = {
  args: {
    message: 'Este mensaje se oculta rápidamente',
    isVisible: true,
    duration: 2000,
  },
};
