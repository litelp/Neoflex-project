import { useState, type ReactElement } from 'react';
import { EnterCodeSection } from './sections/EnterCodeSection/EnterCodeSection';
import { SuccessCode } from './sections/SuccessCode/SuccessCode';

type SignPageStep = 'enter' | 'congratulations';

export function CodePage() {
  const [step, setStep] = useState<SignPageStep>('enter');

  const pages: Record<SignPageStep, ReactElement> = {
    'enter': <EnterCodeSection onSend={() => setStep('congratulations')} />,
    'congratulations': <SuccessCode />
  }
  return pages[step];
}
