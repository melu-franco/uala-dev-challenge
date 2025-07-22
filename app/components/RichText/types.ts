import type { IconName } from '../Icon/icons';

export interface RichTextProps {
  content: string;
  color?: 'dark' | 'white' | 'neutral' | 'primary' | 'success' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  bold?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
}
