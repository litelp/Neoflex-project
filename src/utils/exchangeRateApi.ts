import axios from 'axios';
import type {
  RequiredRates,
  ExchangeRateApiResponse,
} from '@/types/exchangeRate';
import { API_KEY, BASE_URL, BASE_CURRENCY, CURRENCIES } from '@/constants';

export async function getRequiredRates(): Promise<RequiredRates> {
  const allCurrencies = await getAllRates();
  const data = {} as RequiredRates;

  for (let i = 0; i < CURRENCIES.length; i++) {
    const name = CURRENCIES[i];

    data[name] = allCurrencies[name]
      ? (1 / allCurrencies[name]).toFixed(2)
      : '-';
  }

  return data;
}

async function getAllRates(): Promise<Record<string, number>> {
  const response = await axios.get<ExchangeRateApiResponse>(
    `${BASE_URL}/${API_KEY}/latest/${BASE_CURRENCY}`
  );

  return response.data.conversion_rates;
}
