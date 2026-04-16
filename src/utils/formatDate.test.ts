import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('format date correctly', () => {
    const date = new Date(2026, 3, 15);

    const result = formatDate(date, 'MSK');

    expect(result).toEqual({
      dateTime: '2026-04-15',
      text: 'Update every 15 minutes, MSK 15.04.2026',
    });
  });

  it('add leading zeros to day and month', () => {
    const date = new Date(2026, 0, 1);

    const result = formatDate(date, 'MSK');

    expect(result.dateTime).toBe('2026-01-01');
    expect(result.text).toContain('01.01.2026');
  });
});
