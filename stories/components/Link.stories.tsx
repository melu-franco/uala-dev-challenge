import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../app/components/Link';
import { Container } from '../../app/components/Container';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the link',
    },
    href: {
      control: 'text',
      description: 'URL for external or regular links',
    },
    to: {
      control: 'text',
      description: 'Route path for internal navigation',
    },
    external: {
      control: 'boolean',
      description: 'Whether to open external links in new tab',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
    color: {
      control: 'select',
      options: ['dark', 'white', 'neutral', 'primary', 'success', 'gray'],
      description: 'Text color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Text size variant',
    },
    bold: {
      control: 'boolean',
      description: 'Whether text should be bold',
    },
    icon: {
      control: 'select',
      options: ['filter', 'menu', 'calendar', 'download', 'close', 'chevron'],
      description: 'Optional icon to display',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InternalLink: Story = {
  args: {
    children: 'Go to Home',
    to: '/',
    color: 'primary',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'Visit Google',
    href: 'https://google.com',
    external: true,
    color: 'primary',
  },
};
 
export const RegularLink: Story = {
  args: {
    children: 'Regular Link',
    href: '#',
    color: 'dark',
  },
};

export const ClickableLink: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('Link clicked!'),
    color: 'primary',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Download File',
    href: '#',
    icon: 'download',
    iconPosition: 'left',
    color: 'primary',
  },
};

export const Colors: Story = {
  render: () => (
    <Container flex direction="col" gap="4" className="p-4">
      <Link href="#" color="dark">Dark Link</Link>
      <Link href="#" color="primary">Primary Link</Link>
      <Link href="#" color="success">Success Link</Link>
      <Link href="#" color="gray">Gray Link</Link>
      <Link href="#" color="neutral">Neutral Link</Link>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container flex direction="col" gap="4" className="p-4">
      <Link href="#" size="sm" color="primary">Small Link</Link>
      <Link href="#" size="md" color="primary">Medium Link</Link>
      <Link href="#" size="lg" color="primary">Large Link</Link>
    </Container>
  ),
};
