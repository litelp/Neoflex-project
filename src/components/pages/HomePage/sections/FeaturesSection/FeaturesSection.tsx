import styles from './FeaturesSection.module.scss';
import featuresImg from '@assets/images/Illustration.svg';

export function FeaturesSection() {
  return (
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
          <li className={styles['features__item']}>Cashback without borders</li>
          <li className={styles['features__item']}>Personal design</li>
          <li className={styles['features__item']}>
            Work anywhere in the world
          </li>
        </ul>
      </div>
    </section>
  );
}
