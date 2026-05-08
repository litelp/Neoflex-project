import styles from './SuccessInformation.module.scss';

export function SuccessInformation() {
  return (
    <section className={styles['success-info']}>
      <h3 className={styles['success-info__title']}>
        Documents have been successfully signed and sent for approval
      </h3>
      <span className={styles['success-info__text']}>
        Within 10 minutes you will be sent a PIN code to your email for
        confirmation
      </span>
    </section>
  );
}
