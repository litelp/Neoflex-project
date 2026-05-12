import styles from './SuccessDocument.module.scss';

export function SuccessDocument() {
  return (
    <section className={styles['success-doc']}>
      <h3 className={styles['success-doc__title']}>Documents are formed</h3>
      <span className={styles['success-doc__text']}>
        Documents for signing will be sent to your email
      </span>
    </section>
  );
}
