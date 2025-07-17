import type { Meta, StoryObj } from '@storybook/react';
import { RichText } from '../../app/components/RichText/index';

const meta = {
  title: 'Components/RichText',
  component: RichText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RichText>;

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

export const IconLinkLeft: Story = {
  args: {
    content: 'Link con ícono a la izquierda',
    color: 'primary',
    size: 'md',
    icon: 'analyze',
    iconPosition: 'left',
    href: '#',
  },
};

export const IconLink: Story = {
  args: {
    content: 'Link con ícono a la derecha',
    color: 'primary',
    size: 'md',
    icon: 'chevron',
    iconPosition: 'right',
    href: '#',
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
      <RichText {...args} content="Link con ícono" size="md" icon="chevron" iconPosition="right" href="#" color="primary" />
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

export const Links: Story = {
  args: {
    content: 'Link de ejemplo',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <RichText 
        {...args} 
        content="Link interno" 
        href="#"
        color="primary"
        icon="analyze"
        iconPosition="left"
      />
      <RichText 
        {...args} 
        content="Link externo" 
        href="https://example.com"
        external
        color="primary"
        icon="chevron"
        iconPosition="right"
      />
    </div>
  ),
};
