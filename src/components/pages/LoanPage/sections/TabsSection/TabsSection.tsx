import { useState } from 'react';
import styles from './TabsSection.module.scss';
import { AboutTab } from '../AboutTab/AboutTab';
import { RatesTab } from '../RatesTab/RatesTab';

const tabs = [
  { name: 'About card', component: AboutTab },
  { name: 'Rates and conditions', component: RatesTab },
  { name: 'Cashback', component: 'Cashback' },
  { name: 'FAQ', component: 'FAQ' },
];

export function TabsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const ActiveContent = tabs[activeTab].component;

  return (
    <section className={styles.tabs}>
      <div className={styles['tabs__buttons']}>
        {tabs.map((tab, index) => (
          <button
            className={`${styles['tabs__button']} ${activeTab === index ? styles['tabs__button--active'] : ''}`}
            key={tab.name}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className={styles['tabs__content']}>
        <ActiveContent />
      </div>
    </section>
  );
}
