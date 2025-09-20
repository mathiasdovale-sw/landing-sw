'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface SmoothScrollButtonProps {
  href: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  targetSection?: string; // ID of the section to scroll to (without #)
}

export default function SmoothScrollButton({ 
  href, 
  onClick, 
  className = '', 
  children, 
  targetSection 
}: SmoothScrollButtonProps) {
  const { handleSmoothScroll } = useSmoothScroll();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (targetSection) {
      handleSmoothScroll(e, targetSection);
    } else if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}