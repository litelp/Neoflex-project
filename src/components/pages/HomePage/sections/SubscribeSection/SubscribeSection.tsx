import { useState, type SubmitEventHandler } from 'react';
import styles from './SubscribeSection.module.scss';
import { Link } from 'react-router-dom';
import { subscribeToNews } from '@/api/emailApi/emailApi';

function getInitialSubscribeState(): boolean {
  const saved = localStorage.getItem('isSubscribed');
  return saved === 'true';
}

export function SubscribeSection() {
  const [value, setValue] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(getInitialSubscribeState);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!value.trim()) {
      setError('Please enter your email');
      return;
    }

    try {
      setError(null);

      await subscribeToNews(value);

      localStorage.setItem('isSubscribed', 'true');
      setIsSubscribed(true);
    } catch {
      setError('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className={styles.subscribe}>
      <Link className={styles['subscribe__support-link']} to="/">
        Support
      </Link>
      <h2 className={styles['subscribe__title']}>
        Subscribe Newsletter & get
        <span className={styles['subscribe__subtitle']}>Bank News</span>
      </h2>

      {isSubscribed ? (
        <p className={styles['subscribe__success-message']}>
          You are already subscribed to the bank&apos;s newsletter
        </p>
      ) : (
        <form className={styles['subscribe__form']} onSubmit={handleSubmit}>
          <label
            className={styles['subscribe__field']}
            htmlFor="subscribe-email"
          >
            <input
              className={styles['subscribe__input']}
              value={value}
              type="email"
              name="email"
              id="subscribe-email"
              placeholder="Your email"
              autoComplete="email"
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
          <button className={styles['subscribe__button']} type="submit">
            Subscribe
          </button>

          {error && <span className={styles['subscribe__error']}>{error}</span>}
        </form>
      )}
    </section>
  );
}
