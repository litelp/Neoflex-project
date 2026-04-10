export function formatDate(
  date: Date,
  zone: string
): { dateTime: string; text: string } {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return {
    dateTime: `${year}-${month}-${day}`,
    text: `Update every 15 minutes, ${zone} ${day}.${month}.${year}`,
  };
}
