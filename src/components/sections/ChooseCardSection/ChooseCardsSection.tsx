import styles from './ChooseCardSection.module.scss';
import { Button } from '@components/Button/Button';
import creditCard_1 from '@assets/images/cardImage1.png';
import creditCard_2 from '@assets/images/cardImage2.png';
import creditCard_3 from '@assets/images/cardImage3.png';
import creditCard_4 from '@assets/images/cardImage4.png';

type CardItem = {
  id: string;
  src: string;
  alt: string;
};

const CARD_DATA: CardItem[] = [
  { id: 'card_1', src: creditCard_1, alt: 'Credit card design option 1' },
  { id: 'card_2', src: creditCard_2, alt: 'Credit card design option 2' },
  { id: 'card_3', src: creditCard_3, alt: 'Credit card design option 3' },
  { id: 'card_4', src: creditCard_4, alt: 'Credit card design option 4' },
];

export function ChooseCardSection() {
  return (
    <section className={styles.choose}>
      <h1 className={styles['choose__title']}>
        Choose the design you like and apply for card right now
      </h1>
      <Button className={styles['choose__button']} text="Choose the card" />
      <ul className={styles['choose__list']}>
        {CARD_DATA.map((item) => (
          <li key={item.id} className={styles['choose__card']}>
            <img
              src={item.src}
              alt={item.alt}
              className={styles['choose__card-image']}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
