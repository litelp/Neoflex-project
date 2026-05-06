import type { PaymentScheduleItem } from '@/types/applicationTypes';
import styles from './TableSection.module.scss';

const columns = [
  { key: 'number', title: 'NUMBER' },
  { key: 'date', title: 'DATE' },
  { key: 'total_payment', title: 'TOTAL PAYMENT' },
  { key: 'interest_paymnet', title: 'INTEREST PAYMENT' },
  { key: 'debt_payment', title: 'DEBT PAYMENT' },
  { key: 'remaining_debt', title: 'REMAINING DEBT' },
];

interface TableProps {
  data: PaymentScheduleItem[];
}

export function TableSection({ data }: TableProps) {
  return (
    <section className={styles.table}>
      <h3 className={styles['table__title']}>Payment Schedule</h3>
      <span className={styles['table__step']}>Step 3 of 5</span>
      <table className={styles['table__table']}>
        <thead>
          <tr>
            {columns.map((column) => (
              <>
                <th className={styles['table__column-title']} key={column.key}>
                  {column.title}
                </th>
                <span className={`${styles['table__sort']}`}></span>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.number}>
              <td>{item.number}</td>
              <td>{item.date}</td>
              <td>{item.totalPayment}</td>
              <td>{item.interestPayment}</td>
              <td>{item.debtPayment}</td>
              <td>{item.remainingDebt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
