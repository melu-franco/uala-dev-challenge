import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterMenu } from '../../app/components/FilterMenu';
import { Button } from '../../app/components/Button';
import { Container } from '../../app/components/Container';
import type { FilterState } from '../../app/components/FilterMenu/types';

const meta: Meta<typeof FilterMenu> = {
  title: 'Components/FilterMenu',
  component: FilterMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'FilterMenu is a comprehensive filtering component that allows users to filter transactions by date range, cards, installments, amount, and payment methods.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the filter menu is open/visible',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when the menu is closed',
    },
    onApplyFilters: {
      action: 'onApplyFilters',
      description: 'Callback when filters are applied',
    },
    onClearFilters: {
      action: 'onClearFilters',
      description: 'Callback when filters are cleared',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    
    const handleApplyFilters = (filters: FilterState) => {
      console.log('Applied filters:', filters);
      setIsOpen(false);
    };

    const handleClearFilters = () => {
      console.log('Filters cleared');
    };

    return (
      <Container className="h-screen bg-gray-100">
        <Container className="p-4">
          <Button
            icon="filter"
            variant="ghost"
            onClick={() => setIsOpen(true)}
          />
        </Container>
        
        <FilterMenu
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </Container>
    );
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    
    const handleApplyFilters = (filters: FilterState) => {
      console.log('Applied filters:', filters);
      setIsOpen(false);
    };

    const handleClearFilters = () => {
      console.log('Filters cleared');
    };

    return (
      <Container className="h-screen bg-gray-100">
        <FilterMenu
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </Container>
    );
  },
};
