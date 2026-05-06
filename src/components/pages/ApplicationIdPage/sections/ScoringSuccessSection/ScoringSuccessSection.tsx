import styles from './ScoringSuccessSection.module.scss';

export function ScoringSuccessSection() {
  return (
    <section className={styles.success}>
      <h3 className={styles['success__title']}>
        Wait for a decision on the application
      </h3>
      <span className={styles['success__text']}>
        The answer will come to your mail within 10 minutes
      </span>
    </section>
  );
}
