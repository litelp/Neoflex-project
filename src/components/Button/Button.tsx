import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import { Loader } from '../Loader/Loader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  loading?: boolean;
}

export function Button({
  text,
  className = '',
  type = 'button',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${styles.button} ${className}`.trim()}
      disabled={disabled || loading}
    >
      {loading ? <Loader className={styles['button__loader']} /> : text}
    </button>
  );
}
