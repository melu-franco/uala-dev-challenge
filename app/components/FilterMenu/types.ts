import type { DateRange } from '../DatePicker/types';
import type { Card, PaymentMethod, Installment } from '../../constants';

export interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters?: () => void;
}

export interface FilterState {
  dateRange: DateRange;
  cards: Card[];
  installments: Installment[];
  amount: { min: number; max: number };
  paymentMethods: PaymentMethod[];
}

export interface ExpandedSections {
  date: boolean;
  cards: boolean;
  installments: boolean;
  amount: boolean;
  paymentMethods: boolean;
}

export type FilterSection = keyof ExpandedSections;
