import type { PaymentScheduleItem } from '@/types/applicationTypes';
import styles from './TableSection.module.scss';
import { useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Checkbox } from './Checkbox';
import { Modal } from './Modal/Modal';
import { sendDocument } from '@/api/applicationApi/applicationApi';
import { useParams } from 'react-router-dom';

interface ColumnTitle {
  key: keyof PaymentScheduleItem;
  title: string;
}

const columns: ColumnTitle[] = [
  { key: 'number', title: 'NUMBER' },
  { key: 'date', title: 'DATE' },
  { key: 'totalPayment', title: 'TOTAL PAYMENT' },
  { key: 'interestPayment', title: 'INTEREST PAYMENT' },
  { key: 'debtPayment', title: 'DEBT PAYMENT' },
  { key: 'remainingDebt', title: 'REMAINING DEBT' },
];

interface TableProps {
  data: PaymentScheduleItem[];
  onSend: () => void;
}

type SortType = 'asc' | 'desc';

interface SortState {
  column: keyof PaymentScheduleItem;
  type: SortType;
}

export function TableSection({ data, onSend }: TableProps) {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [isAgree, setIsAgree] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortState>({
    column: 'number',
    type: 'asc',
  });

  function sortTable(columnName: keyof PaymentScheduleItem) {
    setSort((prev) => ({
      column: columnName,
      type: prev.column === columnName && prev.type === 'asc' ? 'desc' : 'asc',
    }));
  }

  const sortedData = [...data].sort((a, b) => {
    const left = a[sort.column];
    const right = b[sort.column];

    if (sort.column === 'date') {
      const leftDate = new Date(left).getTime();
      const rightDate = new Date(right).getTime();

      return sort.type === 'asc' ? leftDate - rightDate : rightDate - leftDate;
    }

    return sort.type === 'asc'
      ? Number(left) - Number(right)
      : Number(right) - Number(left);
  });

  const onSubmit = async () => {
    try {
      setError(null);

      await sendDocument(Number(applicationId));

      onSend();
    } catch {
      setError('Failed to send document. Please try again.');
    }
  };

  return (
    <section className={styles.table}>
      <h3 className={styles['table__title']}>Payment Schedule</h3>
      <span className={styles['table__step']}>Step 3 of 5</span>
      <table className={styles['table__table']}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className={styles['table__column-title']}
                key={column.key}
                onClick={() => sortTable(column.key)}
              >
                {column.title}
                <span
                  className={`${styles['table__sort']} ${sort.column === column.key && sort.type === 'asc' ? styles['table__sort--asc'] : styles['table__sort--desc']}`}
                ></span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.number}>
              <td className={styles['table__row-text']}>{item.number}</td>
              <td className={styles['table__row-text']}>{item.date}</td>
              <td className={styles['table__row-text']}>{item.totalPayment}</td>
              <td className={styles['table__row-text']}>
                {item.interestPayment}
              </td>
              <td className={styles['table__row-text']}>{item.debtPayment}</td>
              <td className={styles['table__row-text']}>
                {item.remainingDebt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles['table__controls']}>
        <Button
          className={styles['table__deny-btn']}
          text="Deny"
          onClick={() => setIsModalOpen(true)}
        />
        <Checkbox
          className={styles['table__checkbox']}
          text="I agree with the payment schedule"
          onChange={setIsAgree}
        />
        <Button
          className={styles['table__send-btn']}
          text="Send"
          disabled={!isAgree}
          onClick={onSubmit}
        />
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}

      {error && <p className={styles['table__error']}>{error}</p>}
    </section>
  );
}
