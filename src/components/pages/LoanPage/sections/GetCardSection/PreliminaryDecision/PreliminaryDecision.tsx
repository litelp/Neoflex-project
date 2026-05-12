import styles from './PreliminaryDecision.module.scss';

export function PreliminaryDecision() {
  return (
    <div className={styles.preliminary}>
      <h3 className={styles['preliminary__title']}>
        The preliminary decision has been sent to your email.
      </h3>
      <span className={styles['preliminary__text']}>
        In the letter you can get acquainted with the preliminary decision on
        the credit card.
      </span>
    </div>
  );
}
