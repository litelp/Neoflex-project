import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import logoNeoflex from '@/assets/images/logo_Neoflex.svg';
import type { NavItem } from '@/types/navTypes';

const FOOTER_DATA: NavItem[] = [
  { id: 'about', text: 'About bank', link: '/' },
  { id: 'question', text: 'Ask a Question', link: '/' },
  { id: 'quality', text: 'Quality of service', link: '/' },
  { id: 'requisites', text: 'Requisites', link: '/' },
  { id: 'press', text: 'Press center', link: '/' },
  { id: 'career', text: 'Bank career', link: '/' },
  { id: 'investors', text: 'Investors', link: '/' },
  { id: 'analytics', text: 'Analytics', link: '/' },
  { id: 'processes', text: 'Business and processes', link: '/' },
  { id: 'compliance', text: 'Compliance and business ethics', link: '/' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer__info']}>
        <img
          className={styles['footer__logo']}
          src={logoNeoflex}
          alt="Neoflex"
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
      <nav className={styles['footer__nav']} aria-label="Footer navigation">
        <ul className={styles['footer__nav-list']}>
          {FOOTER_DATA.map((item) => (
            <li key={item.id}>
              <Link className={styles['footer__nav-item']} to={item.link}>
                {item.text}
              </Link>
            </li>
          ))}
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
