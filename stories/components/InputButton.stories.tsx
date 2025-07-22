import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputButton } from '@components/InputButton';

const meta: Meta<typeof InputButton> = {
  title: 'Components/InputButton',
  component: InputButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Link de pago',
    checked: false,
    onChange: () => {},
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(false);
    return (
      <InputButton
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

export const Checked: Story = {
  args: {
    label: 'Link de pago',
    checked: true,
    onChange: () => {},
  },
};

export const Group: Story = {
  args: {
    label: 'Link de pago',
    checked: false,
    onChange: () => {},
  },
  render: function Render() {
    const [selected, setSelected] = useState<string[]>([]);

    const options = [
      'Link de pago',
      'Código QR',
      'mPOS',
      'POS Pro'
    ];

    const toggleOption = (option: string) => {
      setSelected(prev => 
        prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option]
      );
    };

    return (
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <InputButton
            key={option}
            label={option}
            checked={selected.includes(option)}
            onChange={() => toggleOption(option)}
          />
        ))}
      </div>
    );
  }
};
