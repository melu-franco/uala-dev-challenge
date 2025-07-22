import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from '../../app/components/DatePicker';
import type { DateRange } from '../../app/components/DatePicker/types';
import { Container } from '../../app/components/Container';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'DatePicker component with two simplified modes: always-open and button-toggle using React Aria Components.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['always-open', 'button-toggle'],
      description: 'Display mode for the DatePicker',
    },
    buttonText: {
      control: 'text',
      description: 'Text for calendar button in button-toggle mode',
    },
    buttonIcon: {
      control: 'boolean',
      description: 'Show icon in calendar button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const AlwaysOpenMode: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange>({ startDate: null, endDate: null });

    const handleChange = (range: DateRange) => {
      setSelectedRange(range);
      console.log('Changed range:', range);
    };

    return (
      <Container flex direction="col" gap="4" align="center">
        <DatePicker
          mode="always-open"
          value={selectedRange}
          onChange={handleChange}
        />
        
        {selectedRange.startDate && selectedRange.endDate && (
          <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
            <strong>Rango seleccionado:</strong><br />
            Desde: {selectedRange.startDate.toLocaleDateString()}<br />
            Hasta: {selectedRange.endDate.toLocaleDateString()}
          </div>
        )}
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with calendar always visible. Perfect for when you want the calendar to be immediately accessible.',
      },
    },
  },
};

export const ButtonToggleMode: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<DateRange>({ startDate: null, endDate: null });

    const handleChange = (range: DateRange) => {
      setSelectedRange(range);
      console.log('Changed range:', range);
    };

    return (
      <Container flex direction="col" gap="4" className="w-96">
        <DatePicker
          mode="button-toggle"
          value={selectedRange}
          onChange={handleChange}
          buttonIcon={true}
          className="w-full"
        />
        
        {selectedRange.startDate && selectedRange.endDate && (
          <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
            <strong>Rango seleccionado:</strong><br />
            Desde: {selectedRange.startDate.toLocaleDateString()}<br />
            Hasta: {selectedRange.endDate.toLocaleDateString()}
          </div>
        )}
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with button toggle mode. Click the button to show/hide the calendar.',
      },
    },
  },
};


export const BothModes: Story = {
  render: () => {
    const [alwaysRange, setAlwaysRange] = useState<DateRange>({ startDate: null, endDate: null });
    const [buttonRange, setButtonRange] = useState<DateRange>({ startDate: null, endDate: null });

    const handleAlwaysChange = (range: DateRange) => {
      setAlwaysRange(range);
      console.log('Always changed range:', range);
    };

    const handleButtonChange = (range: DateRange) => {
      setButtonRange(range);
      console.log('Button changed range:', range);
    };

    return (
      <Container flex direction="col" gap="8" className="p-6 max-w-4xl mx-auto">

        <Container flex gap="8" className="w-full flex-wrap">
          <Container flex direction="col" gap="4" className="flex-1 min-w-80">            
            <DatePicker
              mode="always-open"
              value={alwaysRange}
              onChange={handleAlwaysChange}
            />
            
            {alwaysRange.startDate && alwaysRange.endDate && (
              <div className="text-xs text-gray-600 p-2 bg-blue-50 rounded">
                <strong>Fechas seleccionadas:</strong><br />
                {alwaysRange.startDate.toLocaleDateString()} - {alwaysRange.endDate.toLocaleDateString()}
              </div>
            )}
          </Container>

          <Container flex direction="col" gap="4" className="flex-1 min-w-80">
            <DatePicker
              mode="button-toggle"
              value={buttonRange}
              onChange={handleButtonChange}
              buttonIcon={true}
            />
            
            {buttonRange.startDate && buttonRange.endDate && (
              <div className="text-xs text-gray-600 p-2 bg-green-50 rounded">
                <strong>Botón Toggle:</strong><br />
                {buttonRange.startDate.toLocaleDateString()} - {buttonRange.endDate.toLocaleDateString()}
              </div>
            )}
          </Container>
        </Container>
      </Container>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comparison of both DatePicker modes to showcase their different use cases and behaviors.',
      },
    },
  },
};
