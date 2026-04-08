import axios from 'axios';
import type {
  RequiredCurrencyCode,
  RequiredRates,
  ExchangeRateApiResponse,
} from '@/types/exchangeRate';

const BASE_URL = import.meta.env.VITE_EXCHANGE_RATE_BASE_URL;
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

const CURRENCIES: RequiredCurrencyCode[] = [
  'USD',
  'CNY',
  'CHF',
  'EUR',
  'JPY',
  'TRY',
];
const BASE_CURRENCY = 'RUB';

export async function getRequiredRates(): Promise<RequiredRates> {
  const allCurrencies = await getRates();
  const data = {} as RequiredRates;

  for (let i = 0; i < CURRENCIES.length; i++) {
    const name = CURRENCIES[i];

    data[name] = allCurrencies[name]
      ? (1 / allCurrencies[name]).toFixed(2)
      : '-';
  }

  return data;
}

async function getRates(): Promise<Record<string, number>> {
  const response = await axios.get<ExchangeRateApiResponse>(
    `${BASE_URL}/${API_KEY}/latest/${BASE_CURRENCY}`
  );

  return response.data.conversion_rates;
}
