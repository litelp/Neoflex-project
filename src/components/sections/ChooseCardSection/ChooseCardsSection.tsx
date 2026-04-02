import styles from './ChooseCardSection.module.scss';
import { Button } from '../../Button/Button';
import creditCard_1 from '@assets/images/cardImage1.png';
import creditCard_2 from '@assets/images/cardImage2.png';
import creditCard_3 from '@assets/images/cardImage3.png';
import creditCard_4 from '@assets/images/cardImage4.png';

export function ChooseCardSection() {
  return (
    <section className={styles.choose}>
      <h1 className={styles['choose__title']}>
        Choose the design you like and apply for card right now
      </h1>
      <Button className={styles['choose__button']} text="Choose the card" />
      <ul className={styles['choose__list']}>
        <li className={styles['choose__card']}>
          <img src={creditCard_1} alt="Credit card design option 1" />
        </li>
        <li className={styles['choose__card']}>
          <img src={creditCard_2} alt="Credit card design option 2" />
        </li>
        <li className={styles['choose__card']}>
          <img src={creditCard_3} alt="Credit card design option 3" />
        </li>
        <li className={styles['choose__card']}>
          <img src={creditCard_4} alt="Credit card design option 4" />
        </li>
      </ul>
    </section>
  );
}
