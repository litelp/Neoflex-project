import type { CreditOffer } from '@/types/applicationTypes';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type ApplicationStatus = 'form' | 'offers';

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

  return {
    offers: JSON.parse(savedOffers),
    status: 'offers',
  };
}

const applicationSlice = createSlice({
  name: 'application',
  initialState: getInitialState,
  reducers: {
    setOffers: (state, action: PayloadAction<CreditOffer[]>) => {
      state.offers = action.payload;
      state.status = 'offers';

      localStorage.setItem('creditOffers', JSON.stringify(action.payload));
    },
    removeOffers: (state) => {
      state.offers = [];
      state.status = 'form';

      localStorage.removeItem('creditOffers');
    },
  },
});

export const { setOffers } = applicationSlice.actions;
export default applicationSlice.reducer;
