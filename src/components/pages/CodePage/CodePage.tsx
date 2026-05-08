import { useState } from 'react';
import { EnterCodeSection } from './sections/EnterCodeSection/EnterCodeSection';
import { SuccessCode } from './sections/SuccessCode/SuccessCode';

type SignPageStep = 'enter' | 'congratulations';

export function CodePage() {
  const [step, setStep] = useState<SignPageStep>('enter');
  return (
    <>
      {step === 'enter' && (
        <EnterCodeSection onSend={() => setStep('congratulations')} />
      )}
      {step === 'congratulations' && <SuccessCode />}
    </>
  );
}
