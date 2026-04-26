import { Card } from './Card';
import styles from './Cashback.module.scss';

const cashbackData = [
  { id: 'food', text: 'For food delivery, cafes and restaurants', value: '5%' },
  { id: 'markets', text: 'In supermarkets with our subscription', value: '5%' },
  {
    id: 'stores',
    text: `In clothing stores and children's goods`,
    value: '2%',
  },
  {
    id: 'other',
    text: 'Other purchases and payment of services andfines',
    value: '1%',
  },
  { id: 'online', text: 'Shopping in online stores', value: 'up to 3%' },
  { id: 'partners', text: 'Purchases from our partners', value: '30%' },
];

export function CashbackTab() {
  return (
    <ul className={styles.cashback}>
      {cashbackData.map((item) => (
        <li className={styles['cashback__item']} key={item.id}>
          <Card
            className={styles['cashback__card']}
            text={item.text}
            value={item.value}
          />
        </li>
      ))}
    </ul>
  );
}
