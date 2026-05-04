import type { CreditOffer } from '@/types/applicationTypes';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type ApplicationStatus = 'form' | 'offers' | 'sent';

interface ApplicationState {
  offers: CreditOffer[];
  status: ApplicationStatus;
}

function getInitialState(): ApplicationState {
  const savedOffers = localStorage.getItem('creditOffers');

  if (!savedOffers) {
    return {
      offers: [],
      status: 'form',
    };
  }

  const parsedOffers = JSON.parse(savedOffers);

  return {
    offers: parsedOffers.offers,
    status: parsedOffers.status,
  };
}

const applicationSlice = createSlice({
  name: 'application',
  initialState: getInitialState,
  reducers: {
    setOffers: (state, action: PayloadAction<CreditOffer[]>) => {
      state.offers = action.payload;
      state.status = 'offers';

      localStorage.setItem(
        'creditOffers',
        JSON.stringify({ offers: action.payload, status: 'offers' })
      );
    },
    removeOffers: (state) => {
      state.offers = [];
      state.status = 'form';

      localStorage.removeItem('creditOffers');
    },
    offerSent: (state) => {
      state.offers = [];
      state.status = 'sent';

      localStorage.setItem(
        'creditOffers',
        JSON.stringify({ offers: [], status: 'sent' })
      );
    },
  },
});

export const { setOffers, removeOffers, offerSent } = applicationSlice.actions;
export default applicationSlice.reducer;
