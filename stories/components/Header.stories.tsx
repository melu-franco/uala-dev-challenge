import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@components/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    onMenuClick: () => console.log('Menu clicked'),
  },
};
