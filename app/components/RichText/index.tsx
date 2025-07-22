import type { FC } from 'react';
import { Icon } from '../Icon';
import type { RichTextProps } from './types';

export const RichText: FC<RichTextProps> = ({ 
  content,
  color = 'dark',
  size = 'md',
  className = '',
  bold = false,
  icon,
  iconPosition = 'left',
  iconSize,
}) => {
  const sizeClasses = {
    sm: 'text-[12px] leading-[16px]',
    md: 'text-[14px] leading-[18px] font-thin',
    lg: 'text-[16px] leading-[24px]',
  };

  const defaultIconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const baseColorClasses = {
    dark: 'text-dark',
    white: 'text-white',
    primary: 'text-primary',
    success: 'text-success',
    gray: 'text-gray',
    neutral: 'text-neutral'
  };

  const colorClass = baseColorClasses[color];

  const baseClasses = `${icon && 'flex items-center'} font-public-sans ${sizeClasses[size]} ${colorClass} ${bold ? 'font-semibold' : ''} ${className}`;

  const iconComponent = icon ? (
    <Icon
      name={icon}
      size={iconSize || defaultIconSizes[size]}
      className={content ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''}
    />
  ) : null;

  const contentWithIcon = (
    <>
      {iconPosition === 'left' && iconComponent}
      {content}
      {iconPosition === 'right' && iconComponent}
    </>
  );

  return <p className={baseClasses}>{contentWithIcon}</p>;
};
