import styles from './MapSection.module.scss';
import map from '@assets/images/map.svg';

export function MapSection() {
  return (
    <section className={styles.map}>
      <h2 className={styles['map__title']}>
        You can use our services anywhere in the world
      </h2>
      <p className={styles['map__text']}>
        Withdraw and transfer money online through our application
      </p>
      <img className={styles['map__image']} src={map} alt="map" />
    </section>
  );
}
