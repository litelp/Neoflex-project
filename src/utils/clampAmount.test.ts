import { describe, it, expect } from 'vitest';
import { clampAmount } from './clampAmount';
import { MIN_AMOUNT, MAX_AMOUNT } from './prescoringValidation';

describe('clampAmount', () => {
  it('return MIN_AMOUNT when value is less than minimum', () => {
    expect(clampAmount(MIN_AMOUNT - 1)).toBe(MIN_AMOUNT);
  });

  it('return MAX_AMOUNT when value is greater than maximum', () => {
    expect(clampAmount(MAX_AMOUNT + 1)).toBe(MAX_AMOUNT);
  });

  it('return the same value when it is within the allowed range', () => {
    const value = (MIN_AMOUNT + MAX_AMOUNT) / 2;

    expect(clampAmount(value)).toBe(value);
  });

  it('return MIN_AMOUNT when value equals minimum', () => {
    expect(clampAmount(MIN_AMOUNT)).toBe(MIN_AMOUNT);
  });

  it('return MAX_AMOUNT when value equals maximum', () => {
    expect(clampAmount(MAX_AMOUNT)).toBe(MAX_AMOUNT);
  });
});
