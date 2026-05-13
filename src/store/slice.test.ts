import reducer, { setOffers, removeOffers } from './slice';

const offersMock = [
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

describe('applicationSlice', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('return initial state', () => {
    const state = reducer(undefined, { type: '' });

    expect(state).toEqual({
      applicationId: null,
      offers: [],
      status: 'form',
    });
  });

  it('set offers and update state', () => {
    const state = reducer(undefined, setOffers(offersMock));

    expect(state.applicationId).toBe(1);
    expect(state.offers).toEqual(offersMock);
    expect(state.status).toBe('offers');
  });

  it('remove offers and reset state', () => {
    const stateWithOffers = reducer(undefined, setOffers(offersMock));

    const state = reducer(stateWithOffers, removeOffers());

    expect(state).toEqual({
      applicationId: null,
      offers: [],
      status: 'form',
    });
  });
});
