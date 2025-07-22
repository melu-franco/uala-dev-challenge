import { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  Button as AriaButton,
  CalendarCell,
  CalendarGrid,
  Heading,
  RangeCalendar
} from 'react-aria-components';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "@react-types/datepicker";
import type { RangeValue } from "@react-types/shared";
import { Button } from '../Button';
import { Container } from '../Container';
import { Icon } from '../Icon';
import type { DatePickerProps, DateRange } from './types';
import './styles.css';

export const DatePicker: FC<DatePickerProps> = ({ 
  mode = 'always-open',
  value,
  onChange,
  className = '',
  buttonText = '',
  buttonIcon = true,
  showActionButtons = false,
  onClose,
  onDownload
}) => {
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(mode === 'always-open');

  useEffect(() => {
    if (value?.startDate && value?.endDate) {
      setDateRange({
        start: parseDate(value.startDate.toISOString().split('T')[0]),
        end: parseDate(value.endDate.toISOString().split('T')[0])
      });
    } else {
      setDateRange(null);
    }
  }, [value]);

  useEffect(() => {
    setIsCalendarVisible(mode === 'always-open');
  }, [mode]);

  const handleClear = () => {
    setDateRange(null);
    const emptyRange = { startDate: null, endDate: null };
    onChange?.(emptyRange);
  };

  const handleDateRangeChange = (value: RangeValue<DateValue> | null) => {
    setDateRange(value);
    
    if (onChange && value?.start && value?.end) {
      const startDate = value.start.toDate(getLocalTimeZone());
      const endDate = value.end.toDate(getLocalTimeZone());
      onChange({ startDate, endDate });
    }
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const renderCalendar = () => (
    <div className="bg-white rounded-lg p-4" style={{ boxShadow: '0px 2px 24px 0px #55555514' }}>
      <RangeCalendar 
        value={dateRange}
        onChange={handleDateRangeChange}
        className="w-fit"
      >
        <header className="flex items-center justify-between mb-4">
          <AriaButton
            slot="previous"
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md outline-none focus:ring-2 focus:ring-primary transition-colors"
          >
            <Icon name="chevron-left" />
          </AriaButton>
          <Heading className="text-sm font-semi-bold text-dark" />
          <AriaButton
            slot="next"
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md outline-none focus:ring-2 focus:ring-primary transition-colors"
          >
            <Icon name="chevron" />
          </AriaButton>
        </header>
        <CalendarGrid className="border-separate border-spacing-1">
          {(date) => (
            <CalendarCell
              date={date}
              className="w-9 h-9 text-sm cursor-default rounded-md flex items-center justify-center outside-month:text-gray-300 hover:bg-gray-100 pressed:bg-gray-200 selected:bg-primary selected:text-white invalid:text-gray-300 invalid:cursor-not-allowed forced-color-adjust-none outline-none focus:ring-2 focus:ring-primary transition-colors"
            />
          )}
        </CalendarGrid>
      </RangeCalendar>
      
      <Container flex justify="end" gap="2" className="w-full mx-0 mt-4">
        {showActionButtons ? (
          <>
            <Button text="Cerrar" size="sm" variant="outline" onClick={onClose} />
            <Button 
              text="Descargar" 
              size="sm" 
              className='ml-2'
              variant="primary" 
              onClick={onDownload}
              disabled={!dateRange?.start || !dateRange?.end}
            />
          </>
        ) : (
          dateRange && (
            <Button text="Limpiar" className="ml-2" size="sm" variant="outline" onClick={handleClear} />
          )
        )}
      </Container>
    </div>
  );

  if (mode === 'always-open') {
    return (
      <div className={`w-fit ${className}`}>
        {renderCalendar()}
      </div>
    );
  }

  if (mode === 'button-toggle') {
    return (
      <div className={`w-fit ${className}`}>
        <div className="relative">
          <Button
            text={buttonText}
            variant="ghost"
            icon={buttonIcon ? "calendar" : undefined}
            onClick={toggleCalendar}
          />
          
          {isCalendarVisible && (
            <div className="absolute top-full left-0 mt-2 z-50">
              {renderCalendar()}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
