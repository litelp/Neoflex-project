import { useState } from 'react';
import styles from './TabsSection.module.scss';

export function TabsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['About card', 'Rates and conditions', 'Cashback', 'FAQ'];
  const contents = ['About card', 'Rates and conditions', 'Cashback', 'FAQ'];

  return (
    <section className={styles.tabs}>
      <div className={styles['tabs__buttons']}>
        {tabs.map((tab, index) => (
          <button
            className={`${styles['tabs__button']} ${activeTab === index ? styles['tabs__button--active'] : ''}`}
            key={tab}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles['tabs__content']}>{contents[activeTab]}</div>
    </section>
  );
}
