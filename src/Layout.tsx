import styles from './App.module.scss';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.app}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
