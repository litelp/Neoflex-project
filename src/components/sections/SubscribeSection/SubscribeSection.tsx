import { useState, type SubmitEventHandler } from 'react';
import styles from './SubscribeSection.module.scss';
import { Link } from 'react-router-dom';

export function SubscribeSection() {
  const [value, setValue] = useState('');

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
      <form className={styles['subscribe__form']} onSubmit={handleSubmit}>
        <label className={styles['subscribe__field']} htmlFor="email">
          <input
            className={styles['subscribe__input']}
            value={value}
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            autoComplete="email"
            aria-label="Email"
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <button className={styles['subscribe__button']} type="submit">
          Subscribe
        </button>
      </form>
    </section>
  );
}
