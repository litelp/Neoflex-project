import { MAX_AMOUNT, MIN_AMOUNT } from './prescoringValidation';

export const clampAmount = (value: number) => {
  if (value < MIN_AMOUNT) return MIN_AMOUNT;
  if (value > MAX_AMOUNT) return MAX_AMOUNT;

  return value;
};
