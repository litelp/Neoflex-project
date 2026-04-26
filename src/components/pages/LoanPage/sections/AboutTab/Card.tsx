import styles from './Card.module.scss';

interface CardProps {
  icon: string;
  title: string;
  text: string;
  className?: string;
}

export function Card({ icon, title, text, className }: CardProps) {
  return (
    <article className={`${styles.card} ${className ?? ''}`}>
      <img className={styles['card__icon']} src={icon} alt={title} />
      <p className={styles['card__title']}>{title}</p>
      <span className={styles['card__text']}>{text}</span>
    </article>
  );
}
