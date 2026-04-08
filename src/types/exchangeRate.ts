export interface ExchangeRateApiResponse {
  result: string;
  base_code: string;
  conversion_rates: Record<string, number>;
}

export type RequiredCurrencyCode =
  | 'USD'
  | 'CNY'
  | 'CHF'
  | 'EUR'
  | 'JPY'
  | 'TRY';

export type RequiredRates = Record<RequiredCurrencyCode, string>;
