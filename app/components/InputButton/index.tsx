import { type FC } from 'react';
import { Icon } from '../Icon';
import type { InputButtonProps } from './types';

export const InputButton: FC<InputButtonProps> = ({ 
  label, 
  checked, 
  onChange,
  className = ''
}) => {
  return (
    <label className={`
      relative inline-flex items-center justify-between px-4 py-2 rounded-full
      border border-primary text-sm font-medium cursor-pointer
      ${checked 
        ? 'bg-primary-lighter text-primary' 
        : 'bg-transparent text-primary hover:bg-primary-lighter'
      }
      transition-colors duration-200
      ${className}
    `}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 w-0 h-0"
      />
      <span>{label}</span>
      {checked && (
        <Icon 
          name="close" 
          size={16} 
          className="ml-2 text-primary"
        />
      )}
    </label>
  );
};
