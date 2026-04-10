import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useEffect, useState } from 'react';
import type { NavItem } from '@/types/navTypes';

const HEADER_DATA: NavItem[] = [
  { id: 'card', text: 'Credit card', link: '/' },
  { id: 'product', text: 'Product', link: '/' },
  { id: 'account', text: 'Account', link: '/' },
  { id: 'resources', text: 'Resources', link: '/' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClose(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth > 920) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleClose);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleClose);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      {isMenuOpen && (
        <div
          className={styles['header__overlay']}
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}

      <header
        className={`${styles.header} ${isMenuOpen ? styles['header--open'] : ''}`}
      >
        <NavLink className={styles['header__title']} to="/" onClick={closeMenu}>
          NeoBank
        </NavLink>
        <nav
          id="header-navigation"
          className={`${styles['header__navbar']} ${isMenuOpen ? styles['header__navbar--open'] : ''}`}
        >
          <ul className={styles['header__list']}>
            {HEADER_DATA.map((item) => (
              <li key={item.id}>
                <NavLink
                  className={styles['header__nav-link']}
                  to={item.link}
                  onClick={closeMenu}
                >
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button
            className={styles['header__button-in-burger']}
            text="Online Bank"
          />
        </nav>
        <Button className={styles['header__button']} text="Online Bank" />

        <button
          className={`${styles['header__burger']} ${isMenuOpen ? styles['header__burger--open'] : ''}`}
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="header-navigation"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
    </>
  );
}
