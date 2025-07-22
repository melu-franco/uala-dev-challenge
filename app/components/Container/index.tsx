import type { FC } from 'react';
import type { ContainerProps } from './types';
import { 
  baseStyles, 
  paddingStyles, 
  marginStyles,
  flexDirectionStyles,
  justifyStyles,
  alignStyles,
  columnClasses,
  autoStyles
} from './types';

export const Container: FC<ContainerProps> = ({ 
  children,
  className = '',
  maxWidth,
  padding = 'none',
  margin = 'none',
  flex,
  direction = 'row',
  justify = 'start',
  align = 'start',
  gap,
  grid,
  columns = '1',
  wrap,
  border = false,
  borderColor = 'gray',
  noBaseStyles = false,
  auto = false,
  ...props
}) => {
  const gridStyles = grid ? `grid gap-${gap} ${columnClasses[columns]}` : '';
  const maxWidthStyle = maxWidth ? `max-w-${maxWidth}` : '';
  const flexStyles = flex ? `flex ${flexDirectionStyles[direction]} ${justifyStyles[justify]} ${alignStyles[align]} ${wrap ? 'flex-wrap' : ''}` : '';
  const borderStyles = border ? `rounded-[8px] border ${borderColor === 'primary' ? 'border-primary' : 'border-light-gray'}` : '';

  const classes = [
    className,
    !noBaseStyles && baseStyles,
    paddingStyles[padding],
    marginStyles[margin],
    gridStyles,
    flexStyles,
    auto && autoStyles,
    maxWidthStyle,
    borderStyles,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
