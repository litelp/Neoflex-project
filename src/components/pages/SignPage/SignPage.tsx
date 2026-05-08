import { useState, type ReactElement } from 'react';
import { InformationSection } from './sections/InformationSection/InformationSection';
import { SuccessInformation } from './sections/SuccessInformation/SuccessInformation';

type SignPageStep = 'info' | 'success-info';

export function SignPage() {
  const [step, setStep] = useState<SignPageStep>('info');

    const pages: Record<SignPageStep, ReactElement> = {
        'info': <InformationSection onSend={() => setStep('success-info')} />,
        'success-info': <SuccessInformation />
    }

  return pages[step];
}
