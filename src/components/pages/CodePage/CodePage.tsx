import { useState, type ReactElement } from 'react';
import { EnterCodeSection } from './sections/EnterCodeSection/EnterCodeSection';
import { SuccessCode } from './sections/SuccessCode/SuccessCode';

type SignPageStep = 'enter' | 'congratulations';

export function CodePage() {
  const [step, setStep] = useState<SignPageStep>('enter');
  const [isLoading, setIsLoading] = useState(false);

  const pages: Record<SignPageStep, ReactElement> = {
    enter: (
      <EnterCodeSection
        onSend={() => setStep('congratulations')}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    ),
    congratulations: <SuccessCode />,
  };
  return pages[step];
}
