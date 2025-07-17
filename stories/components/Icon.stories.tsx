import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../app/components/Icon/index';
import { icons } from '../../app/components/Icon/icons';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(icons),
    },
    size: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'filter',
    size: 24,
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-4">
      {Object.keys(icons).map((name) => (
        <div key={name} className="flex flex-col items-center gap-4 p-4">
          <Icon name={name as keyof typeof icons} size={24} />
          <span className="text-sm text-gray">{name}</span>
        </div>
      ))}
    </div>
  ),
};
