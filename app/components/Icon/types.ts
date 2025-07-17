import type { FunctionComponent, SVGProps } from 'react';
import type { IconName } from './icons';

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}
