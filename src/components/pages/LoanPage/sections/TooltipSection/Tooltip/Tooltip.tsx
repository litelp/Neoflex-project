import { useState, type ReactNode } from 'react';
import styles from './Tooltip.module.scss';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.tooltip}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}

      {isOpen && <div className={styles['tooltip__text']}>{text}</div>}
    </div>
  );
}
