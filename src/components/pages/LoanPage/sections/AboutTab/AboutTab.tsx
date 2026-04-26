import styles from './AboutTab.module.scss';
import cardIcon1 from '@assets/images/cardIcon1.svg';
import cardIcon2 from '@assets/images/cardIcon2.svg';
import cardIcon3 from '@assets/images/cardIcon3.svg';
import cardIcon4 from '@assets/images/cardIcon4.svg';
import cardIcon5 from '@assets/images/cardIcon5.svg';
import { Card } from './Card';

const cardsData = [
  {
    id: 'up_to_50000',
    icon: cardIcon1,
    title: 'Up to 50 000 ₽',
    text: 'Cash and transfers without commission and percent',
  },
  {
    id: 'up_to_160_days',
    icon: cardIcon2,
    title: 'Up to 160 days',
    text: 'Without percent on the loan',
  },
  {
    id: 'free_delivery',
    icon: cardIcon3,
    title: 'Free delivery',
    text: 'We will deliver your card by courier at a convenient place and time for you',
  },
  {
    id: 'up_to_12_months',
    icon: cardIcon4,
    title: 'Up to 12 months',
    text: 'No percent. For equipment, clothes and other purchases in installments',
  },
  {
    id: 'deposit_and_withdrawal',
    icon: cardIcon5,
    title: 'Convenient deposit and withdrawal',
    text: 'At any ATM. Top up your credit card for free with cash or transfer from other cards',
  },
];

export function AboutTab() {
  return (
    <ul className={styles.about}>
      {cardsData.map((card) => (
        <li className={styles['about__item']} key={card.id}>
          <Card
            className={styles['about__card']}
            icon={card.icon}
            title={card.title}
            text={card.text}
          />
        </li>
      ))}
    </ul>
  );
}
