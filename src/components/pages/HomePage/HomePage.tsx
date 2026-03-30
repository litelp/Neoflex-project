import styles from './HomePage.module.scss';
import { Button } from '../../Button/Button';
import creditCard_1 from '@assets/images/cardImage1.png';
import creditCard_2 from '@assets/images/cardImage2.png';
import creditCard_3 from '@assets/images/cardImage3.png';
import creditCard_4 from '@assets/images/cardImage4.png';
import featuresImg from '@assets/images/Illustration.svg';

export function HomePage() {
  return (
    <main className={styles.home}>
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
      <section className={styles.features}>
        <img
          className={styles['features__icon']}
          src={featuresImg}
          alt="Features"
        />
        <div className={styles['features__text']}>
          <h2 className={styles['features__title']}>
            We Provide Many Features You Can Use
          </h2>
          <p className={styles['features__paragraph']}>
            You can explore the features that we provide with fun and have their
            own functions each feature
          </p>
          <ul className={styles['features__list']}>
            <li className={styles['features__item']}>
              Powerfull online protection
            </li>
            <li className={styles['features__item']}>
              Cashback without borders
            </li>
            <li className={styles['features__item']}>Personal design</li>
            <li className={styles['features__item']}>
              Work anywhere in the world
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
