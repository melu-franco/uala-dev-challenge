import type { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  maxWidth?: string;
  noBaseStyles?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  margin?: 'sm' | 'md' | 'lg' | 'none';
  flex?: boolean;
  auto?: boolean;
  direction?: 'row' | 'col';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: string;
  grid?: boolean;
  columns?: '1' | '2' | '3' | '4';
  wrap?: boolean;
  border?: boolean;
  borderColor?: 'gray' | 'primary';
}

export const baseStyles =  'w-full max-w-6xl text-align-left';

export const autoStyles = 'mx-auto';

export const columnClasses = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
} as const;

export const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  none: 'p-0',
} as const;

export const marginStyles = { 
  sm: 'm-4',
  md: 'm-6',
  lg: 'm-8',
  none: 'm-0',
} as const;

export const flexDirectionStyles = {
  row: 'flex-row',
  col: 'flex-col',
} as const;

export const justifyStyles = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

export const alignStyles = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
} as const;
