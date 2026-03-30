import styles from './App.module.scss';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { HomePage } from './components/pages/HomePage/HomePage';

function App() {
  return (
    <>
      <div className={styles.app}>
        <Header></Header>
        <HomePage />
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
