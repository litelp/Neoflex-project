import { clearHtml } from './clearHtml';

describe('clearHtml', () => {
  it('remove HTML tags', () => {
    expect(clearHtml('<p>Hello <b>world</b></p>')).toBe('Hello world');
  });

  it('return same text without HTML', () => {
    expect(clearHtml('Just text')).toBe('Just text');
  });

  it('handle empty string', () => {
    expect(clearHtml('')).toBe('');
  });
});
