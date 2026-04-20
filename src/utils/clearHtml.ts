export function clearHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}
