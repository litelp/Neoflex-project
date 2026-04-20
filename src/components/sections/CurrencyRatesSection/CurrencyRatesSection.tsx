import { useEffect, useState } from 'react';
import styles from './CurrencyRatesSection.module.scss';
import { Link } from 'react-router-dom';
import { getRequiredRates } from '@/utils/exchangeRateApi';
import type { RequiredRates } from '@/types/exchangeRate';
import { formatDate } from '@/utils/formatDate';
import { Loader } from '@/components/Loader/Loader';

const MINUTES = 15;
const SECONDS = 60;
const MILLISECONDS = 1000;

const TIME_ZONE = 'MSK';

export function CurrencyRatesSection() {
  const [rates, setRates] = useState<RequiredRates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<Date | null>(null);

  async function getCurrencies(isMounted: () => boolean) {
    try {
      const data = await getRequiredRates();

      if (!isMounted()) return;

      setRates(data);
      setDate(new Date());
      setError(null);
    } catch {
      if (!isMounted()) return;

      setError('Error loading currency rates');
      setRates(null);
    } finally {
      if (isMounted()) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    let mounted = true;

    const isMounted = () => mounted;

    getCurrencies(isMounted);

    const intervalId = window.setInterval(
      () => {
        getCurrencies(isMounted);
      },
      MINUTES * SECONDS * MILLISECONDS
    );

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const currentDate = date ? formatDate(date, TIME_ZONE) : null;

  return (
    <section className={styles.currency}>
      <h2 className={styles['currency__title']}>
        Exchange rate in internet bank
      </h2>
      {currentDate && (
        <time
          className={styles['currency__date']}
          dateTime={currentDate.dateTime}
        >
          {currentDate.text}
        </time>
      )}

      <h3 className={styles['currency__subtitle']}>Currency</h3>
      {isLoading ? (
        <Loader
          label="Loading currency rates"
          className={styles['currency__loader']}
        />
      ) : error ? (
        <p className={styles['currency__error']} role="alert">
          {error}
        </p>
      ) : (
        <ul className={styles['currency__list']}>
          {Object.entries(rates ?? {}).map(([currency, value]) => (
            <li className={styles['currency__item']} key={currency}>
              <span className={styles['currency__name']}>{currency}:</span>
              <span className={styles['currency__value']}>{value}</span>
            </li>
          ))}
        </ul>
      )}

      <Link className={styles['currency__all-courses-link']} to="/">
        All courses
      </Link>
    </section>
  );
}
