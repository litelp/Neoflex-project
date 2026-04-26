import styles from './Card.module.scss';

interface CardProps {
  text: string;
  value: string;
  className?: string;
}

export function Card({ text, value, className }: CardProps) {
  return (
    <article className={`${styles.card} ${className ?? ''}`}>
      <span className={styles['card__text']}>{text}</span>
      <span className={styles['card__value']}>{value}</span>
    </article>
  );
}
