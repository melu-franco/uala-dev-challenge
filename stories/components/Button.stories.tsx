import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Text: Story = {
  args: {
    text: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'filter',
    variant: 'ghost',
    size: 'md',
    'aria-label': 'Filter',
  },
};

export const Outline: Story = {
  args: {
    text: 'Outline Button',
    variant: 'outline',
    size: 'md',
  },
};

export const FullWidth: Story = {
  args: {
    text: 'Full Width Button',
    fullWidth: true,
    variant: 'primary',
    size: 'md',
  },
};

export const WithClick: Story = {
  args: {
    text: 'Click me!',
    variant: 'primary',
    size: 'md',
    onClick: () => alert('Button clicked!'),
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
    onClick: () => alert('This should not show!'),
  },
};
