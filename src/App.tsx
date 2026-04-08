import styles from './App.module.scss';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { HomePage } from '@/components/pages/HomePage/HomePage';

function App() {
  return (
    <>
      <Header />
      <main className={styles.app}>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}

export default App;
