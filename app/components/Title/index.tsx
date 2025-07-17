import type { FC } from 'react';
import type { TitleProps } from './types';

export const Title: FC<TitleProps> = ({ 
  level, 
  content, 
  color = 'dark',
  className = '' 
}) => {
  const headingMap = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
  } as const;

  const sizeClasses = {
    1: 'text-[16px] leading-[26px] font-semibold',
    2: 'text-[14px] leading-[16px] font-semibold',
    3: 'text-[12px] leading-[15px] font-medium',
    4: 'text-[10px] leading-[14px] font-medium',
  } as const;

  const colorClasses = {
    dark: 'text-dark',
    white: 'text-white',
    primary: 'text-primary',
    success: 'text-success',
    gray: 'text-gray',
  };

  const Tag = headingMap[level];
  const classes = `${sizeClasses[level]} ${colorClasses[color]} ${className}`;

  return <Tag className={classes}>{content}</Tag>;
};
