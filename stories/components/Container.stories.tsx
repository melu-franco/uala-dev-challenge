import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@components/Container/index';

const meta: Meta<typeof Container> = {
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
    border: {
      control: 'boolean',
      description: 'Add a rounded border to the container',
    },
    borderColor: {
      control: 'select',
      options: ['gray', 'primary'],
      description: 'Color of the border when border is true',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent = (
  <div className="p-4 text-center">Example Content</div>
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
    gap: '4',
  },
};

export const WithFlexColumn: Story = {
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

export const WithMaxWidth: Story = {
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

export const WithBorder: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Container {...args} border borderColor="gray">
        {defaultContent}
      </Container>
      <Container {...args} border borderColor="primary">
        {defaultContent}
      </Container>
    </div>
  ),
  args: {
    padding: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Container can have a rounded border with gray or primary color.',
      },
    },
  },
};
