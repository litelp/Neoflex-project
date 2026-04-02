import styles from './HomePage.module.scss';
import { CurrencyRatesSection } from '@/components/sections/CurrencyRatesSection/CurrencyRatesSection';
import { MapSection } from '@/components/sections/MapSection/MapSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection/FeaturesSection';
import { ChooseCardSection } from '@/components/sections/ChooseCardSection/ChooseCardsSection';

export function HomePage() {
  return (
    <main className={styles.home}>
      <ChooseCardSection />
      <FeaturesSection />
      <CurrencyRatesSection />
      <MapSection />
    </main>
  );
}
