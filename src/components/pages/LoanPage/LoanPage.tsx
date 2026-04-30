import { GetCardSection } from './sections/GetCardSection/GetCardSection';
import { TabsSection } from './sections/TabsSection/TabsSection';
import { TooltipSection } from './sections/TooltipSection/TooltipSection';

export function LoanPage() {
  return (
    <>
      <TooltipSection />
      <TabsSection />
      <GetCardSection />
    </>
  );
}
