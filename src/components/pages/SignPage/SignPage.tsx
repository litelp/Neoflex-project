import { useState } from 'react';
import { InformationSection } from './sections/InformationSection/InformationSection';
import { SuccessInformation } from './sections/SuccessInformation/SuccessInformation';

type SignPageStep = 'info' | 'success-info';

export function SignPage() {
  const [step, setStep] = useState<SignPageStep>('info');
  return (
    <>
      {step === 'info' && (
        <InformationSection onSend={() => setStep('success-info')} />
      )}
      {step === 'success-info' && <SuccessInformation />}
    </>
  );
}
