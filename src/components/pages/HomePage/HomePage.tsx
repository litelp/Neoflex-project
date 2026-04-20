import { CurrencyRatesSection } from '@/components/sections/CurrencyRatesSection/CurrencyRatesSection';
import { MapSection } from '@/components/sections/MapSection/MapSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection/FeaturesSection';
import { ChooseCardSection } from '@/components/sections/ChooseCardSection/ChooseCardSection';
import { SubscribeSection } from '@/components/sections/SubscribeSection/SubscribeSection';
import { NewsSection } from '@/components/sections/NewsSection/NewsSection';

export function HomePage() {
  return (
    <>
      <ChooseCardSection />
      <FeaturesSection />
      <CurrencyRatesSection />
      <MapSection />
      <NewsSection />
      <SubscribeSection />
    </>
  );
}
