import type { Meta, StoryObj } from '@storybook/react';
import Container from '../../app/components/Container/index';

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be rendered inside the container',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'none'],
    },
    margin: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'none'],
    },
    columns: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
    direction: {
      control: 'select',
      options: ['row', 'col'],
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
    },
    gap: {
      control: 'text',
    },
    maxWidth: {
      control: 'text',
    },
    grid: {
      control: 'boolean',
    },
    flex: {
      control: 'boolean',
    },
    wrap: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent = (
  <div className="bg-gray-200 p-4 text-center">Example Content</div>
);

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      {defaultContent}
      {defaultContent}
      {defaultContent}
    </Container>
  ),
  args: {
    padding: 'md',
  },
};

export const WithGrid: Story = {
  render: (args) => (
    <Container {...args}>
      {defaultContent}
      {defaultContent}
      {defaultContent}
    </Container>
  ),
  args: {
    grid: true,
    columns: '3',
    gap: '4',
    padding: 'md',
  },
};

export const WithFlex: Story = {
  render: (args) => (
    <Container {...args}>
      {defaultContent}
      {defaultContent}
      {defaultContent}
    </Container>
  ),
  args: {
    flex: true,
    justify: 'between',
    align: 'center',
    padding: 'md',
    gap: "4\n"
  },
};

export const FlexColumn: Story = {
  render: (args) => (
    <Container {...args}>
      {defaultContent}
      {defaultContent}
      {defaultContent}
    </Container>
  ),
  args: {
    flex: true,
    direction: 'col',
    justify: 'center',
    align: 'center',
    gap: '4',
    padding: 'md',
  },
};

export const CustomMaxWidth: Story = {
  render: (args) => (
    <Container {...args}>
      {defaultContent}
      {defaultContent}
      {defaultContent}
    </Container>
  ),
  args: {
    maxWidth: '400px',
    padding: 'md',
  },
};
