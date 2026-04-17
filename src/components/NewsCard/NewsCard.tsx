import styles from './NewsCard.module.scss';

export type NewsCardProps = {
  urlToImage: string;
  title: string;
  url: string;
  description: string;
};

export function NewsCard({
  urlToImage,
  title,
  url,
  description,
}: NewsCardProps) {
  return (
    <article className={styles.card}>
      <a
        className={styles['card__main-link']}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={styles['card__image']} src={urlToImage} alt={title} />
        <h3 className={styles['card__title']}>{title}</h3>
        <p className={styles['card__desc']}>{description}</p>
      </a>
    </article>
  );
}
