import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CurrencyRatesSection } from './CurrencyRatesSection';
import { getRequiredRates } from '@/utils/exchangeRateApi';

vi.mock('@/utils/exchangeRateApi', () => ({
  getRequiredRates: vi.fn(),
}));

function renderCurrencyRatesSection() {
  return render(
    <MemoryRouter>
      <CurrencyRatesSection />
    </MemoryRouter>
  );
}

describe('CurrencyRatesSection', () => {
  it('show loader while data is loading', () => {
    vi.mocked(getRequiredRates).mockReturnValue(new Promise(() => {}));

    renderCurrencyRatesSection();

    expect(
      screen.getByRole('status', { name: /loading currency rates/i })
    ).toBeInTheDocument();
  });

  it('render currency rates after successful request', async () => {
    vi.mocked(getRequiredRates).mockResolvedValue({
      USD: '60.78',
      EUR: '90.34',
      CNY: '9.08',
      CHF: '64.78',
      JPY: '0.46',
      TRY: '3.39',
    });

    renderCurrencyRatesSection();

    expect(
      screen.getByRole('status', { name: /loading currency rates/i })
    ).toBeInTheDocument();
    expect(await screen.findByText('USD:')).toBeInTheDocument();
    expect(screen.getByText('60.78')).toBeInTheDocument();
    expect(screen.getByText('EUR:')).toBeInTheDocument();
    expect(screen.getByText('90.34')).toBeInTheDocument();
    expect(screen.getByText('CNY:')).toBeInTheDocument();
    expect(screen.getByText('9.08')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByRole('status', { name: /loading currency rates/i })
      ).not.toBeInTheDocument();
    });
  });

  it('render error message when request fails', async () => {
    vi.mocked(getRequiredRates).mockRejectedValue(new Error('Request failed'));

    renderCurrencyRatesSection();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Error loading currency rates'
    );
  });
});
