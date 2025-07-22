import { type FC } from 'react';
import type { ToggleSwitchProps } from './types';

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className = '',
  label,
  id,
}) => {
  return (
    <label className={`
      inline-flex items-center cursor-pointer
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}
    `}>
      <input id={id} type="checkbox" value="" className="sr-only peer" onChange={(e) => onChange(e.target.checked)} disabled={disabled} checked={checked}/>
      <div className="relative w-11 h-6 bg-neutral peer-focus:outline-none rounded-full peer dark:bg-neutral peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral peer-checked:bg-primary dark:peer-checked:bg-primary"></div>
      {label && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>}
    </label>
  );
};
