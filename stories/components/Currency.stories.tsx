import type { Meta, StoryObj } from '@storybook/react';
import { Currency } from '@components/Currency/index';

const meta: Meta<typeof Currency> = {
  title: 'Components/Currency',
  component: Currency,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    amount: 1234.56,
  },
};

export const Large: Story = {
  args: {
    amount: 1234.56,
    size: 'lg',
  },
};

export const PositiveWithSign: Story = {
  args: {
    amount: 1234.56,
    showSign: true,
    color: 'success',
  },
};

export const Negative: Story = {
  args: {
    amount: -1234.56,
    showSign: true,
    color: 'dark',
  },
};

export const LargeThousands: Story = {
  args: {
    amount: 1234567.89,
    size: 'lg',
    showSign: true,
    color: 'success',
  },
};

export const ZeroAmount: Story = {
  args: {
    amount: 0,
    color: 'dark',
  },
};
