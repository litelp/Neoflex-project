import styles from './Loader.module.scss';

type LoaderProps = {
  label?: string;
  className?: string;
};

export function Loader({ label = 'Loading', className = '' }: LoaderProps) {
  return (
    <div
      role="status"
      className={`${styles.loader} ${className}`}
      aria-label={label}
    />
  );
}
