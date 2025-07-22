import type { FC } from 'react';
import { Link as RouterLink } from 'react-router';
import { Icon } from '../Icon';
import type { LinkProps } from './types';

export const Link: FC<LinkProps> = ({ 
  children,
  href,
  to,
  external = false,
  onClick,
  className = '',
  color = 'dark',
  size = 'md',
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

  const hoverColorClasses = {
    dark: 'hover:text-dark/80',
    white: 'hover:text-white/80',
    primary: 'hover:text-primary/80',
    success: 'hover:text-success/80',
    gray: 'hover:text-gray/80',
    neutral: 'hover:text-neutral/80'
  };

  const colorClass = `${baseColorClasses[color]} ${hoverColorClasses[color]}`.trim();
  const baseClasses = `${icon ? 'flex items-center' : ''} font-public-sans ${sizeClasses[size]} ${colorClass} ${bold ? 'font-semibold' : ''} cursor-pointer transition-colors duration-200 ${className}`;

  const iconComponent = icon ? (
    <Icon
      name={icon}
      size={iconSize || defaultIconSizes[size]}
      className={children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''}
    />
  ) : null;

  const contentWithIcon = (
    <>
      {iconPosition === 'left' && iconComponent}
      {children}
      {iconPosition === 'right' && iconComponent}
    </>
  );

  // External link
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        onClick={onClick}
      >
        {contentWithIcon}
      </a>
    );
  }

  // Internal router link
  if (to) {
    return (
      <RouterLink 
        to={to} 
        className={baseClasses}
        onClick={onClick}
      >
        {contentWithIcon}
      </RouterLink>
    );
  }

  // Regular link
  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
      >
        {contentWithIcon}
      </a>
    );
  }

  // Clickable span (for onClick only)
  if (onClick) {
    return (
      <span
        className={baseClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        {contentWithIcon}
      </span>
    );
  }

  // Default span (no interaction)
  return <span className={baseClasses}>{contentWithIcon}</span>;
};
