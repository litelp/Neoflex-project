import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import logoNeoflex from '@/assets/images/logo_Neoflex.svg';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer__info']}>
        <img
          className={styles['footer__logo']}
          src={logoNeoflex}
          alt="logo_Neoflex"
        />
        <address className={styles['footer__contact']}>
          <a className={styles['footer__tel']} href="tel:+74959842513">
            +7 (495) 984 25 13
          </a>
          <a className={styles['footer__mail']} href="mailto:info@neoflex.ru">
            info@neoflex.ru
          </a>
        </address>
      </div>
      <nav className={styles['footer__nav']}>
        <ul className={styles['footer__nav-list']}>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              About bank
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Ask a Question
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Quality of service
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Requisites
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Press center
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Bank career
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Investors
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Analytics
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Business and processes
            </Link>
          </li>
          <li>
            <Link className={styles['footer__nav-item']} to="/">
              Compliance and business ethics
            </Link>
          </li>
        </ul>
      </nav>
      <p className={styles['footer__text']}>
        We use cookies to personalize our services and improve the user
        experience of our website. Cookies are small files containing
        information about previous visits to a website. If you do not want to
        use cookies, please change your browser settings
      </p>
    </footer>
  );
}
