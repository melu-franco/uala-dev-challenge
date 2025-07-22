import type { FC } from 'react';
import type { CurrencyProps } from './types';

export const Currency: FC<CurrencyProps> = ({ 
  amount, 
  className = '',
  size = 'sm',
  showSign = false,
  color = 'dark',
  bold = false,
}) => {
  const formatAmount = (num: number) => {
    const [int, dec = '00'] = num.toFixed(2).split('.');
    const digits = int.split('').reverse();
    const withSeparators = digits
      .reduce((acc, digit, i) => {
        if (i > 0 && i % 3 === 0) {
          return [...acc, '.', digit];
        }
        return [...acc, digit];
      }, [] as string[])
      .reverse()
      .join('');
    
    return { integerPart: withSeparators, decimalPart: dec };
  };

  const { integerPart, decimalPart } = formatAmount(amount);
  const isPositive = amount > 0;
  const isNotZero = amount !== 0;

  const sizeClasses = {
    sm: 'text-[14px]',
    lg: 'text-[34px]',
  };

  const colorClasses = {
    dark: 'text-dark',
    success: 'text-success',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${bold ? 'font-bold' : ''} ${className}`;
  const decimalClasses = size === 'lg' ? 'text-[24px]' : '';

  return (
    <p className={baseClasses}>
      {showSign && isPositive && isNotZero && '+'}
      {showSign && !isPositive && isNotZero && '-'}
      ${integerPart}
      <span className={decimalClasses}>
        ,{decimalPart}
      </span>
    </p>
  );
};
