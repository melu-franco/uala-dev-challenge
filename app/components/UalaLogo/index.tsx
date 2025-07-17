import React from 'react';
import type { UalaLogoProps } from './types';

export const UalaLogo: React.FC<UalaLogoProps> = ({
  className = '',
  width = 120,
  height = 40
}) => {
  return (
    <img
      src="/images/logos/uala-logo.svg"
      alt="Ualá Logo"
      className={className}
      width={width}
      height={height}
    />
  );
};
