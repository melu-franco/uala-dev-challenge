import React from 'react';
import type { ContainerProps } from './types';
import { 
  baseStyles, 
  columnClasses, 
  paddingStyles, 
  marginStyles,
  flexDirectionStyles,
  justifyStyles,
  alignStyles
} from './types';

const Container: React.FC<ContainerProps> = ({
  children,
  padding = 'none',
  margin = 'none',
  grid = false,
  flex = false,
  columns = '1',
  gap = '4',
  maxWidth,
  direction = 'row',
  justify = 'start',
  align = 'start',
  wrap = false,
  className = "",
}) => {
  const gridStyles = grid ? `grid gap-${gap}` : '';
  const maxWidthStyle = maxWidth ? `max-w-[${maxWidth}]` : '';
  const flexStyles = flex ? `flex ${flexDirectionStyles[direction]} ${justifyStyles[justify]} ${alignStyles[align]} ${wrap ? 'flex-wrap' : ''}` : '';

  return (
    <div
      className={`${className} ${baseStyles} ${paddingStyles[padding]} ${marginStyles[margin]} ${gridStyles} ${flexStyles} ${grid ? columnClasses[columns] : ''} ${maxWidthStyle}`.trim()}
    >
      {children}
    </div>
  );
};

export default Container;
