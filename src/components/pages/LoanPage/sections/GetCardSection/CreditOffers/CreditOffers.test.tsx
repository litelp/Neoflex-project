import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import { CreditOffers } from './CreditOffers';
import { applyOffer } from '@/api/applicationApi/applicationApi';
import { offerSent } from '@/store/slice';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('@/api/applicationApi/applicationApi', () => ({
  applyOffer: vi.fn(),
}));

vi.mock('@/store/slice', () => ({
  offerSent: vi.fn((applicationId: number) => ({
    type: 'application/offerSent',
    payload: applicationId,
  })),
}));

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedApplyOffer = vi.mocked(applyOffer);
const mockedOfferSent = vi.mocked(offerSent);

const dispatch = vi.fn();

const offers = [
  {
    applicationId: 1,
    requestedAmount: 15000,
    totalAmount: 16000,
    term: 6,
    monthlyPayment: 3000,
    rate: 10,
    isInsuranceEnabled: true,
    isSalaryClient: false,
  },
];

describe('CreditOffers', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseDispatch.mockReturnValue(dispatch);
    mockedUseSelector.mockReturnValue(offers);
  });

  it('render credit offer', () => {
    render(<CreditOffers />);

    expect(screen.getByText('Requested amount: 15000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Total amount: 16000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Your rate: 10%')).toBeInTheDocument();
  });

  it('apply offer after click select', async () => {
    const user = userEvent.setup();

    mockedApplyOffer.mockResolvedValue();

    render(<CreditOffers />);

    await user.click(screen.getByRole('button', { name: 'Select' }));
    await waitFor(() =>
      expect(mockedApplyOffer).toHaveBeenCalledWith(offers[0])
    );

    expect(mockedOfferSent).toHaveBeenCalledWith(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'application/offerSent',
      payload: 1,
    });
  });

  it('show error when apply offer fails', async () => {
    const user = userEvent.setup();

    mockedApplyOffer.mockRejectedValue(new Error('Request failed'));

    render(<CreditOffers />);

    await user.click(screen.getByRole('button', { name: 'Select' }));

    expect(
      await screen.findByText('Failed to apply offer')
    ).toBeInTheDocument();
  });
});
