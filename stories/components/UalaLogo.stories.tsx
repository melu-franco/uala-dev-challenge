import type { Meta, StoryObj } from '@storybook/react';
import { UalaLogo } from '../../app/components/UalaLogo';

const meta: Meta<typeof UalaLogo> = {
  title: 'Components/UalaLogo',
  component: UalaLogo,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 60, max: 300, step: 20 },
    },
    height: {
      control: { type: 'number', min: 20, max: 100, step: 10 },
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UalaLogo>;

export const Default: Story = {
  args: {
    width: 120,
    height: 40,
  },
};

export const Large: Story = {
  args: {
    width: 240,
    height: 80,
  },
};

export const Small: Story = {
  args: {
    width: 60,
    height: 20,
  },
};

export const WithBackground: Story = {
  args: {
    width: 120,
    height: 40,
    className: 'bg-gray-100 p-2 rounded',
  },
};
