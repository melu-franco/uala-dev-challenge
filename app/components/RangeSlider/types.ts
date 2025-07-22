export type RangeValue = [number, number];

export interface RangeConfig {
  min: [number];
  max: [number];
}

export interface RangeLabels {
  minLabel?: string;
  maxLabel?: string;
  prefix?: string;
}

export interface RangeSliderProps {
  initialValues?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (values: [number, number]) => void;
  className?: string;
  showValues?: boolean;
  labels?: RangeLabels;
}
