import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from '../../app/components/RangeSlider';
import { Container } from '../../app/components/Container';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialValues: { 
      control: 'object',
      description: 'Initial values for the range slider',
      table: {
        type: { summary: '[number, number]' },
      },
    },
    min: { 
      control: 'number',
      description: 'Minimum value'
    },
    max: { 
      control: 'number',
      description: 'Maximum value'
    },
    step: { 
      control: 'number',
      description: 'Step size between values'
    },
    onChange: { 
      action: 'changed',
      description: 'Callback when values change'
    },
    showValues: {
      control: 'boolean',
      description: 'Show or hide the value labels'
    },
    labels: {
      control: 'object',
      description: 'Custom labels for the values',
      table: {
        type: { summary: '{ minLabel?: string; maxLabel?: string; prefix?: string }' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const RangeSliderWrapper = (args: any) => {
  return (
    <Container maxWidth="md" padding="lg" margin="lg">
      <RangeSlider {...args} />
    </Container>
  );
};

const render = (args: any) => <RangeSliderWrapper {...args} />;

export const Default: Story = {
  render,
  args: {
    initialValues: [540, 1020],
    min: 10,
    max: 2000,
    step: 15,
  },
};

export const CustomRange: Story = {
  render,
  args: {
    initialValues: [25, 75],
    min: 0,
    max: 100,
    step: 5,
    labels: {
      minLabel: 'Min Value',
      maxLabel: 'Max Value',
      prefix: '#'
    }
  },
};

export const WithoutValues: Story = {
  render,
  args: {
    initialValues: [1000, 5000],
    min: 0,
    max: 10000,
    step: 1,
    showValues: false
  },
};
