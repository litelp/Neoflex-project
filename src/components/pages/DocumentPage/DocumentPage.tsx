import styles from './DocumentPage.module.scss';
import { useEffect, useState } from 'react';
import { TableSection } from './sections/TableSection/TableSection';
import type { PaymentScheduleItem } from '@/types/applicationTypes';
import { useParams } from 'react-router-dom';
import { getApplication } from '@/api/applicationApi/applicationApi';
import { SuccessDocument } from './sections/SuccessDocument/SuccessDocument';

type DocumentPageStep = 'table' | 'success-document';

export function DocumentPage() {
  const { applicationId } = useParams<{ applicationId: string }>();

  const [schedule, setSchedule] = useState<PaymentScheduleItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<DocumentPageStep>('table');

  useEffect(() => {
    async function loadApplication() {
      try {
        if (!applicationId) return;

        const application = await getApplication(Number(applicationId));

        const paymentSchedule = application.credit?.paymentSchedule;

        if (!paymentSchedule) {
          setError('Payment schedule is not available for this application');
          return;
        }

        setSchedule(paymentSchedule);
      } catch {
        setError('Failed to load payment schedule');
      }
    }
    loadApplication();
  }, [applicationId]);

  return (
    <>
      {step === 'table' && (
        <TableSection
          data={schedule}
          onSend={() => setStep('success-document')}
        />
      )}
      {step === 'success-document' && <SuccessDocument />}
      {error && <p className={styles['document__error']}>{error}</p>}
    </>
  );
}
