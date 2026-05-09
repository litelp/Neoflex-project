import { useState, type ReactElement } from 'react';
import { ScoringFormSection } from './sections/ScoringFormSection/ScoringFormSection';
import { ScoringSuccessSection } from './sections/ScoringSuccessSection/ScoringSuccessSection';

type ApplicationIdPageStep = 'scoring-form' | 'scoring-success';

export function ApplicationIdPage() {
  const [step, setStep] = useState<ApplicationIdPageStep>('scoring-form');

  const pages: Record<ApplicationIdPageStep, ReactElement> = {
    'scoring-form': (
      <ScoringFormSection onSuccess={() => setStep('scoring-success')} />
    ),
    'scoring-success': <ScoringSuccessSection />,
  };
  return pages[step];
}
