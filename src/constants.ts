import type { RequiredCurrencyCode } from './types/exchangeRate';

export const EXCHANGE_RATE_BASE_URL = import.meta.env
  .VITE_EXCHANGE_RATE_BASE_URL;
export const EXCHANGE_RATE_API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export const CURRENCIES: RequiredCurrencyCode[] = [
  'USD',
  'CNY',
  'CHF',
  'EUR',
  'JPY',
  'TRY',
];

export const BASE_CURRENCY = 'RUB';

export const NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const NUMBER_OF_NEWS = 20;

export const APPLICATION_API_BASE_URL = import.meta.env
  .VITE_APPLICATION_API_BASE_URL;
