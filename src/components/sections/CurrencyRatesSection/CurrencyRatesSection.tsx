import { useEffect, useState } from 'react';
import styles from './CurrencyRatesSection.module.scss';
import { Link } from 'react-router-dom';
import { getRequiredRates } from '@/utils/exchangeRateApi';
import type { RequiredRates } from '@/types/exchangeRate';

const MINUTES = 15;
const SECONDS = 60;
const MILLISECONDS = 1000;

const TIME_ZONE = 'MSC';

function getDate(date: Date, zone: string): { dateTime: string; text: string } {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return {
    dateTime: `${year}-${month}-${day}`,
    text: `Updated every 15 minutes, ${zone} ${day}.${month}.${year}`,
  };
}

export function CurrencyRatesSection() {
  const [rates, setRates] = useState<RequiredRates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    async function getCurrencies() {
      try {
        const data = await getRequiredRates();

        setRates(data);
        setDate(new Date());
        setError(null);
      } catch {
        setError('Error loading currency rates. Try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    getCurrencies();
    const intervalId = window.setInterval(
      () => {
        getCurrencies();
      },
      MINUTES * SECONDS * MILLISECONDS
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const currentDate = date ? getDate(date, TIME_ZONE) : null;

  if (!rates) {
    return (
      <section className={styles.currency}>
        <p>Error receiving data</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.currency}>
        <p>{error}</p>
      </section>
    );
  }

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
      {isloading ? (
        <span>Loading...</span>
      ) : (
        <ul className={styles['currency__list']}>
          {Object.entries(rates).map(([currency, value]) => (
            <li className={styles['currency__item']} key={currency}>
              <span className={styles['currency__name']}>{currency}:</span>
              <span className={styles['currency__value']}>{value}</span>
            </li>
          ))}
        </ul>
      )}
      <Link className={styles['currency__link']} to="/">
        All courses
      </Link>
    </section>
  );
}
