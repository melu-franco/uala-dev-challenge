import { useEffect, useState } from 'react';
import { Container } from '../Container';
import { RichText } from '../RichText';
import { Icon } from '../Icon';
import type { SnackbarProps } from './types.ts';

export function Snackbar({ 
  message, 
  isVisible, 
  onClose, 
  duration = 5000,
}: SnackbarProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999]">
      <Container
        className={`
          bg-primary text-white
          px-4 py-3 rounded-lg shadow-lg
          transition-all duration-300 ease-in-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          min-w-[300px] max-w-[500px]
        `}
      >
        <Container flex align="center" gap="3">
          <RichText 
            content={message} 
            className="text-white font-medium"
          />
          <button
            onClick={onClose}
            className="ml-auto flex-shrink-0 hover:opacity-75 transition-opacity"
          >
            <Icon name="close" size={16} className="text-white" />
          </button>
        </Container>
      </Container>
    </div>
  );
}
