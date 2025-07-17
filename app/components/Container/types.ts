export interface ContainerProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  margin?: 'sm' | 'md' | 'lg' | 'none';
  maxWidth?: string;
  grid?: boolean;
  flex?: boolean;
  columns?: '1' | '2' | '3' | '4';
  gap?: string;
  className?: string;
  direction?: 'row' | 'col';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: boolean;
}

export const baseStyles = 'mx-auto w-full max-w-6xl text-align-left';

export const columnClasses = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
};

export const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  none: 'p-0',
}

export const marginStyles = { 
  sm: 'm-4',
  md: 'm-6',
  lg: 'm-8',
  none: 'm-0',
}

export const flexDirectionStyles = {
  row: 'flex-row',
  col: 'flex-col',
};

export const justifyStyles = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const alignStyles = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};
