import type { PaymentScheduleItem } from '@/types/applicationTypes';
import styles from './TableSection.module.scss';
import { useState } from 'react';

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
}

type SortType = 'asc' | 'desc';

interface SortState {
  column: keyof PaymentScheduleItem;
  type: SortType;
}

export function TableSection({ data }: TableProps) {
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
    </section>
  );
}
