import type { FC } from 'react';
import type { IconProps } from './types';
import { icons } from './icons';

export const Icon: FC<IconProps> = ({ 
  name, 
  className = '', 
  size = 24 
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: IconComponent }}
    />
  );
};
