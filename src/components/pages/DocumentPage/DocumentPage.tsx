import styles from './DocumentPage.module.scss';
import { useEffect, useState, type ReactElement } from 'react';
import { TableSection } from './sections/TableSection/TableSection';
import type { PaymentScheduleItem } from '@/types/applicationTypes';
import { useParams } from 'react-router-dom';
import { getApplication } from '@/api/applicationApi/applicationApi';
import { SuccessDocument } from './sections/SuccessDocument/SuccessDocument';
import { Loader } from '@/components/Loader/Loader';

type DocumentPageStep = 'table' | 'success-document';

export function DocumentPage() {
  const { applicationId } = useParams<{ applicationId: string }>();

  const [schedule, setSchedule] = useState<PaymentScheduleItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<DocumentPageStep>('table');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadApplication() {
      try {
        setError(null);
        setIsLoading(true);

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
      } finally {
        setIsLoading(false);
      }
    }
    loadApplication();
  }, [applicationId]);

  const pages: Record<DocumentPageStep, ReactElement> = {
    table: (
      <TableSection
        data={schedule}
        onSend={() => setStep('success-document')}
      />
    ),
    'success-document': <SuccessDocument />,
  };

  if (isLoading) return <Loader className={styles['document__loader']} />;

  if (error) return <p className={styles['document__error']}>{error}</p>;

  return pages[step];
}
