import { useState } from 'react';
import { ScoringFormSection } from './sections/ScoringFormSection/ScoringFormSection';
import { ScoringSuccessSection } from './sections/ScoringSuccessSection/ScoringSuccessSection';

type ApplicationIdPageStep = 'scoring-form' | 'scoring-success';

export function ApplicationIdPage() {
  const [step, setStep] = useState<ApplicationIdPageStep>('scoring-form');
  return (
    <>
      {step === 'scoring-form' && (
        <ScoringFormSection onSuccess={() => setStep('scoring-success')} />
      )}
      {step === 'scoring-success' && <ScoringSuccessSection />}
    </>
  );
}
