import type { RequiredCurrencyCode } from './types/exchangeRate';

export const BASE_URL = import.meta.env.VITE_EXCHANGE_RATE_BASE_URL;
export const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export const CURRENCIES: RequiredCurrencyCode[] = [
  'USD',
  'CNY',
  'CHF',
  'EUR',
  'JPY',
  'TRY',
];

export const BASE_CURRENCY = 'RUB';
