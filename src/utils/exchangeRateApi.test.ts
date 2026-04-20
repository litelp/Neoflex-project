import axios from 'axios';
import { getRequiredRates } from './exchangeRateApi';

vi.mock('axios');

describe('getRequiredRates', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('return converted required rates', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: {
        conversion_rates: {
          USD: 0.02,
          EUR: 0.01,
          CNY: 0.11,
          CHF: 0.02,
          JPY: 2.17,
          TRY: 0.29,
        },
      },
    });

    const result = await getRequiredRates();

    expect(result).toEqual({
      USD: '50.00',
      EUR: '100.00',
      CNY: '9.09',
      CHF: '50.00',
      JPY: '0.46',
      TRY: '3.45',
    });
  });

  it('return dash when currency rate is missing', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: {
        conversion_rates: {
          USD: 0.02,
          EUR: 0.01,
          CNY: 0.11,
          CHF: 0.02,
          JPY: 2.17,
        },
      },
    });

    const result = await getRequiredRates();

    expect(result.TRY).toBe('-');
  });
});
