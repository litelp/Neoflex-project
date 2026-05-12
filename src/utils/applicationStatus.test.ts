import { convertBackToFrontStatus } from './applicationStatus';

describe('convertBackToFrontStatus', () => {
  it('return form for REQUEST_DENIED', () => {
    const result = convertBackToFrontStatus('REQUEST_DENIED');
    expect(result).toBe('form');
  });

  it('return offers for PREAPPROVAL', () => {
    const result = convertBackToFrontStatus('PREAPPROVAL');
    expect(result).toBe('offers');
  });

  it('return sent for APPROVED', () => {
    const result = convertBackToFrontStatus('APPROVED');
    expect(result).toBe('sent');
  });
});
