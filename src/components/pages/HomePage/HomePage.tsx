import styles from './HomePage.module.scss';
import { CurrencyRatesSection } from '@/components/sections/CurrencyRatesSection/CurrencyRatesSection';
import { MapSection } from '@/components/sections/MapSection/MapSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection/FeaturesSection';
import { ChooseCardSection } from '@/components/sections/ChooseCardSection/ChooseCardsSection';
import { SubscribeSection } from '@/components/sections/SubscribeSection/SubscribeSection';

export function HomePage() {
  return (
    <main className={styles.home}>
      <ChooseCardSection />
      <FeaturesSection />
      <CurrencyRatesSection />
      <MapSection />
      <SubscribeSection />
    </main>
  );
}
