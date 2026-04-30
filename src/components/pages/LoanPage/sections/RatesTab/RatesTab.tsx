import styles from './RatesTab.module.scss';
import { ratesData } from './mock';

export function RatesTab() {
  return (
    <ul className={styles.rates}>
      {ratesData.map((item) => (
        <li className={styles['rates__item']} key={item.id}>
          <span className={styles['rates__condition']}>{item.condition}</span>
          <span className={styles['rates__description']}>
            {item.description}
          </span>
        </li>
      ))}
    </ul>
  );
}
