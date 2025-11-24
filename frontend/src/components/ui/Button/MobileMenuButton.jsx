import React from 'react';
import Button from './Button';

const MobileMenuButton = ({
  isOpen = false,
  onClick,
  className = '',
  variant = 'minimal',
  size = 'medium'
}) => {
  const HamburgerIcon = () => (
    <div className="flex flex-col items-center justify-center w-6 h-6">
      <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${
        isOpen ? 'rotate-45 translate-y-2' : ''
      }`} />
      <div className={`w-6 h-0.5 bg-current my-1.5 transition-all duration-300 ${
        isOpen ? 'opacity-0' : ''
      }`} />
      <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${
        isOpen ? '-rotate-45 -translate-y-2' : ''
      }`} />
    </div>
  );

  return (
    <Button
      variant={variant}
      size={size}
      iconOnly
      onClick={onClick}
      className={`lg:hidden ${className}`} // Changed from md:hidden to lg:hidden to match navbar
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <HamburgerIcon />
    </Button>
  );
};

export default MobileMenuButton;