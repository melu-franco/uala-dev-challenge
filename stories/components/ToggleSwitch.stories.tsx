import type { Meta, StoryObj } from '@storybook/react';
import { ToggleSwitch } from '@components/ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    onChange: (checked: boolean) => console.log('Toggle changed:', checked),
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: (checked: boolean) => console.log('Toggle changed:', checked),
  },
};
