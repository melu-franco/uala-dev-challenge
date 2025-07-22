export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export interface DatePickerProps {
  mode?: 'always-open' | 'button-toggle';
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
  buttonText?: string;
  buttonIcon?: boolean;
  showActionButtons?: boolean;
  onClose?: () => void;
  onDownload?: () => void;
}
