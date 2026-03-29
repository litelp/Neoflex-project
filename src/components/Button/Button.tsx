import type React from 'react';
import styles from './Button.module.scss';

interface iButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export function Button({
  text,
  className = '',
  type = 'button',
  ...props
}: iButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      {...props}
    >
      {text}
    </button>
  );
}
