import { useState, useRef, useEffect, type FC } from 'react';
import { Button } from '../Button';
import { Container } from '../Container';
import { Link } from '../Link';
import { UalaLogo } from '../UalaLogo';
import type { HeaderProps } from './types';
import { HEADER_HEIGHT } from '../../constants';

const menuItems = [
  { text: 'Inicio', href: '/' },
  { text: 'Métricas', href: '/metrics' },
];

export const Header: FC<HeaderProps> = ({ onMenuClick, className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  const baseClasses = "fixed bg-white p-2 border-b border-light-gray rounded-bl-[32px] h-corner z-200";

  return (
    <header>
      <style dangerouslySetInnerHTML={{
        __html: `
          .h-corner::after {
            content: '';
            position: absolute;
            top: ${HEADER_HEIGHT};
            right: 0;
            width: 32px;
            height: 32px;
            background-image: url('/app/assets/icons/h-corner.svg');
            background-size: contain;
            background-repeat: no-repeat;
            pointer-events: none;
          }
        `
      }} />
      <Container className={`${baseClasses} ${className}`}>
        <Container 
          maxWidth="4xl" 
          flex 
          justify="between" 
          align="center"
          className="mx-auto relative"
        >
          <div className="absolute left-0" ref={buttonRef}>
            <Button 
              onClick={handleMenuClick}
              icon="menu"
              variant="ghost"
              aria-label="Menú"
            />
          </div>

          <Container flex justify="center" className="flex-1">
            <UalaLogo />
          </Container>

          {isMenuOpen && (
            <div 
              ref={menuRef}
              className="absolute top-full left-0 right-0 bg-white shadow-sm z-50"
            >
              <nav>
                <Container flex direction="col" padding="md" gap="4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      color="dark"
                      className="py-2"
                      onClick={handleMenuItemClick}
                    >
                      {item.text}
                    </Link>
                  ))}
                </Container>
              </nav>
            </div>
          )}
        </Container>
      </Container>
    </header>
  );
};
