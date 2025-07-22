import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '@components/Title/index';

const meta: Meta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4],
      description: 'Heading level (h1 or h2)',
    },
    color: {
      control: 'select',
      options: ['dark', 'primary', 'white', 'gray', 'success'],
      description: 'Text color variant',
    },
    content: {
      control: 'text',
      description: 'Title content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Heading1: Story = {
  args: {
    level: 1,
    content: 'Heading 1',
    color: "dark",
  },
};

export const Heading2: Story = {
  args: {
    level: 2,
    content: 'Heading 2',
    color: 'dark',
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Title level={2} content="Dark Title" color="dark" />
      <Title level={2} content="Primary Title" color="primary" />
      <div className="bg-dark p-4">
        <Title level={2} content="White Title" color="white" />
      </div>
      <Title level={2} content="Gray Title" color="gray" />
      <Title level={2} content="Success Title" color="success" />
    </div>
  ),
};
