import type { FC } from 'react';

export interface CurrencyProps {
  amount: number;
  className?: string;
  size?: 'sm' | 'lg';
  showSign?: boolean;
  color?: 'dark' | 'success';
  bold?: boolean;
}