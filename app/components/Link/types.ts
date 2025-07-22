import type { IconName } from '../Icon/icons';

export interface LinkProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  color?: 'dark' | 'white' | 'neutral' | 'primary' | 'success' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  bold?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
}
