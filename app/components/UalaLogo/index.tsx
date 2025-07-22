import type { FC } from 'react';
import type { UalaLogoProps } from './types';

export const UalaLogo: FC<UalaLogoProps> = ({
  className = '',
  width = 80,
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
