import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({
  text,
  children,
  className = '',
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${styles.button} ${className}`.trim()}
      onClick={onClick}
    >
      {children ?? text}
    </button>
  );
}
