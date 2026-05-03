import styles from './NotFoundPage.module.scss';
import errorImage from '@assets/images/404-Error.png';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className={styles.error}>
      <div className={styles['error__text-wrapper']}>
        <h3 className={styles['error__title']}>Oops....</h3>
        <p className={styles['error__paragraph']}>Page not found</p>
        <span className={styles['error__text']}>
          This Page doesn`t exist or was removed! We suggest you go back.
        </span>
        <Link className={styles['error__link']} to="/">
          Go back
        </Link>
      </div>
      <img
        className={styles['error__image']}
        src={errorImage}
        alt="OOps! Error 404"
      />
    </section>
  );
}
