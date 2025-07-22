import type { Meta, StoryObj } from '@storybook/react';
import { RichText } from '../../app/components/RichText';

const meta: Meta<typeof RichText> = {
  title: 'Components/RichText',
  component: RichText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Este es un texto normal',
    color: 'dark',
    size: 'md',
  },
};

export const Bold: Story = {
  args: {
    content: 'Este es un texto en negrita',
    color: 'dark',
    size: 'md',
    bold: true,
  },
};

export const WithIconLeft: Story = {
  args: {
    content: 'Texto con ícono a la izquierda',
    color: 'dark',
    size: 'md',
    icon: 'analyze',
    iconPosition: 'left',
  },
};

export const WithIconRight: Story = {
  args: {
    content: 'Texto con ícono a la derecha',
    color: 'dark',
    size: 'md',
    icon: 'chevron',
    iconPosition: 'right',
  },
};

export const Sizes: Story = {
  args: {
    content: 'Texto de ejemplo',
    color: 'dark',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <RichText {...args} content="Texto pequeño" size="sm" />
      <RichText {...args} content="Texto mediano" size="md" />
      <RichText {...args} content="Texto grande" size="lg" />
      <RichText {...args} content="Texto mediano negrita" size="md" bold />
      <RichText {...args} content="Texto con ícono" size="md" icon="analyze" />
      <RichText {...args} content="Texto con ícono derecha" size="md" icon="chevron" iconPosition="right" color="primary" />
    </div>
  ),
};

export const Colors: Story = {
  args: {
    content: 'Texto de ejemplo',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <RichText {...args} content="Texto oscuro" color="dark" />
      <RichText {...args} content="Texto primario" color="primary" />
      <RichText {...args} content="Texto gris" color="gray" />
      <RichText {...args} content="Texto success" color="success" />
      <div className="bg-dark p-4">
        <RichText {...args} content="Texto blanco" color="white" />
      </div>
    </div>
  ),
};


