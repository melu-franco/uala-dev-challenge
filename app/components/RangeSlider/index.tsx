import { type FC } from 'react';
import Nouislider from "nouislider-react";
import { Container } from '../Container';
import { RichText } from '../RichText';
import { useState } from 'react';
import type { RangeLabels, RangeSliderProps } from './types';
import './styles.css';

const defaultLabels: RangeLabels = {
  minLabel: 'Monto mínimo',
  maxLabel: 'Monto máximo',
  prefix: '$'
};

export const RangeSlider: FC<RangeSliderProps> = ({
  initialValues = [540, 1020],
  min = 10,
  max = 2000,
  step = 15,
  onChange,
  className = '',
  showValues = true,
  labels: userLabels = {}
}) => {
  const [currentValues, setCurrentValues] = useState<[number, number]>(initialValues);
  
  const range = {
    min: [min],
    max: [max]
  };

  const handleUpdate = (values: string[]) => {
    const newValues: [number, number] = [
      Math.round(parseFloat(values[0])),
      Math.round(parseFloat(values[1]))
    ];
    setCurrentValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const finalLabels = {
    ...defaultLabels,
    ...userLabels
  };

  const createFormatter = (prefix: string) => ({
    to: (value: number) => `${prefix}${Math.round(value)}`,
    from: (value: string) => {
      const numStr = value.replace(/[^\d.-]/g, '');
      return parseInt(numStr);
    }
  });

  const numberFormatter = createFormatter(finalLabels.prefix || defaultLabels.prefix || '$');

  const ValueDisplay = ({ label, value }: { label: string; value: string }) => (
    <Container flex noBaseStyles className='py-1 px-4' direction='col' border borderColor="primary">
      <RichText content={label} size="sm" color="gray" />
      <RichText content={value} size="lg" color="dark" />
    </Container>
  );

  return (
    <Container className={className}>
      <Nouislider
        start={initialValues}
        range={range}
        step={step}
        connect
        tooltips={[numberFormatter, numberFormatter]}
        onUpdate={handleUpdate}
      />
      {showValues && (
        <Container flex direction="row" justify="between" className='my-4'>
          <ValueDisplay
            label={finalLabels.minLabel || ""}
            value={numberFormatter.to(currentValues[0])}
          />
          <ValueDisplay
            label={finalLabels.maxLabel || ""}
            value={numberFormatter.to(currentValues[1])}
          />
        </Container>
      )}
    </Container>
  );
};
