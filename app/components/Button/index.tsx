import type { FC, MouseEvent } from 'react';
import { Icon } from '../Icon';
import type { ButtonProps } from './types';

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

const variantClasses = {
  primary: 'bg-primary text-white hover:shadow-lg',
  secondary: 'bg-gray-100 text-gray-900 hover:shadow-lg',
  ghost: 'bg-transparent',
  outline: 'bg-transparent text-primary border border-primary hover:shadow-lg'
};

const disabledClasses = {
  primary: 'disabled:bg-neutral-lighter disabled:text-white disabled:hover:shadow-none',
  secondary: 'disabled:bg-neutral-lighter disabled:text-white disabled:hover:shadow-none',
  ghost: 'disabled:bg-neutral-lighter disabled:text-white disabled:hover:shadow-none',
  outline: 'disabled:bg-transparent disabled:text-neutral-lighter disabled:border-neutral-lighter disabled:hover:shadow-none'
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24
};

export const Button: FC<ButtonProps> = ({
  text,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  onClick,
  children,
  ...props
}) => {
  const baseClasses = 'rounded-[24px] inline-flex items-center justify-center cursor-pointer transition-shadow disabled:cursor-not-allowed';
  
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <Icon 
          name={icon} 
          size={iconSizes[size]} 
          className={text ? 'mr-2' : ''} 
        />
      )}
      {text || children}
      {icon && iconPosition === 'right' && (
        <Icon 
          name={icon} 
          size={iconSizes[size]} 
          className={text ? 'ml-2' : ''} 
        />
      )}
    </>
  );
  
  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};
