import { CurrencyRatesSection } from '@/components/pages/HomePage/sections/CurrencyRatesSection/CurrencyRatesSection';
import { MapSection } from '@/components/pages/HomePage/sections/MapSection/MapSection';
import { FeaturesSection } from '@/components/pages/HomePage/sections/FeaturesSection/FeaturesSection';
import { ChooseCardSection } from '@/components/pages/HomePage/sections/ChooseCardSection/ChooseCardSection';
import { SubscribeSection } from '@/components/pages/HomePage/sections/SubscribeSection/SubscribeSection';
import { NewsSection } from '@/components/pages/HomePage/sections/NewsSection/NewsSection';

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
