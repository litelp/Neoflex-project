import styles from './DocumentPage.module.scss';
import { useEffect, useState } from 'react';
import { TableSection } from './sections/TableSection/TableSection';
import type { PaymentScheduleItem } from '@/types/applicationTypes';
import { useParams } from 'react-router-dom';
import { getApplication } from '@/api/applicationApi/applicationApi';

export function DocumentPage() {
  const { applicationId } = useParams<{ applicationId: string }>();

  const [schedule, setSchedule] = useState<PaymentScheduleItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplication() {
      try {
        if (!applicationId) return;

        const application = await getApplication(Number(applicationId));

        setSchedule(application.credit.paymentSchedule);
      } catch {
        setError('Failed to load payment schedule');
      }
    }
    loadApplication();
  }, [applicationId]);

  return (
    <>
      <TableSection data={schedule} />
      {error && <p className={styles['document__error']}>{error}</p>}
    </>
  );
}
