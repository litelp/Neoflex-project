import styles from './RatesTab.module.scss';

const ratesData = [
  {
    id: 'currency',
    condition: 'Card currency',
    description: 'Rubles, dollars, euro',
  },
  {
    id: 'free_period',
    condition: 'Interest free period',
    description: '0% up to 160 days',
  },
  {
    id: 'payment',
    condition: 'Payment system',
    description: 'Mastercard, Visa',
  },
  {
    id: 'limits',
    condition: 'Maximum credit limit on the card',
    description: '600 000 ₽',
  },
  {
    id: 'cash_flow',
    condition: 'Replenishment and withdrawal',
    description:
      'At any ATM. Top up your credit card for free with cash or transfer from other cards',
  },
  {
    id: 'cashback',
    condition: 'Max cashback per month',
    description: '15 000 ₽',
  },
  {
    id: 'alert',
    condition: 'Transaction Alert',
    description: `60 ₽ — SMS or push notifications\n0 ₽ — card statement, information about transactions in the online bank`,
  },
];

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
