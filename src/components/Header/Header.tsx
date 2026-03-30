import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';

export function Header() {
  return (
    <header className={styles.header}>
      <NavLink className={styles['header__title']} to="/">
        NeoBank
      </NavLink>
      <nav className={styles['header__navbar']}>
        <ul className={styles['header__list']}>
          <li>
            <NavLink className={styles['header__nav-link']} to="/">
              Credit card
            </NavLink>
          </li>
          <li>
            <NavLink className={styles['header__nav-link']} to="/">
              Product
            </NavLink>
          </li>
          <li>
            <NavLink className={styles['header__nav-link']} to="/">
              Account
            </NavLink>
          </li>
          <li>
            <NavLink className={styles['header__nav-link']} to="/">
              Resources
            </NavLink>
          </li>
        </ul>
      </nav>
      <Button className={styles['header__button']} text="Online Bank" />
    </header>
  );
}
