import { Link } from 'react-router-dom';
import styles from './SuccessCode.module.scss';
import congratulationImg from '@assets/images/offer.png';

export function SuccessCode() {
  return (
    <section className={styles['success-code']}>
      <img className={styles['success-code__image']} src={congratulationImg} />
      <h3 className={styles['success-code__title']}>
        Congratulations! You have completed your new credit card.
      </h3>
      <span className={styles['success-code__text']}>
        Your credit card will arrive soon. Thank you for choosing us!
      </span>
      <Link className={styles['success-code__link']} to="/">
        View other offers of our bank
      </Link>
    </section>
  );
}
