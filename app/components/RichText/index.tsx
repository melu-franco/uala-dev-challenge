import type { FC } from 'react';
import { Link } from 'react-router';
import { Icon } from '../Icon';
import type { RichTextProps } from './types';

export const RichText: FC<RichTextProps> = ({ 
  content,
  color = 'dark',
  size = 'md',
  href,
  className = '',
  external = false,
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

  const colorClasses = {
    dark: 'text-dark',
    white: 'text-white',
    primary: 'text-primary hover:text-primary/80',
    success: 'text-success hover:text-success/80',
    gray: 'text-gray hover:text-gray/80',
    neutral: 'text-neutral',
  };

  const baseClasses = `font-public-sans ${sizeClasses[size]} ${colorClasses[color]} ${bold ? 'font-semibold' : ''} ${className}`;

  const linkClasses = 'transition-colors duration-200 inline-flex items-center no-underline'

  const renderContent = () => {
    if (!icon) return content;

    const iconElement = (
      <Icon 
        name={icon} 
        size={iconSize || defaultIconSizes[size]} 
        className={content ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''}
      />
    );

    return (
      <span className="inline-flex items-center">
        {iconPosition === 'left' && iconElement}
        {content}
        {iconPosition === 'right' && iconElement}
      </span>
    );
  };

  if (href) {
    if (external) {
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${linkClasses}`}
        >
          {renderContent()}
        </a>
      );
    }
    
    return (
      <Link 
        to={href}
        className={`${baseClasses} ${linkClasses}`}
      >
        {renderContent()}
      </Link>
    );
  }

  return (
    <p className={baseClasses}>
      {renderContent()}
    </p>
  );
};
