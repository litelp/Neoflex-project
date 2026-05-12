import type {
  ApplicationUIStatus,
  CreditOffer,
} from '@/types/applicationTypes';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ApplicationState {
  applicationId: number | null;
  offers: CreditOffer[];
  status: ApplicationUIStatus;
}

function getInitialState(): ApplicationState {
  const savedOffers = localStorage.getItem('creditOffers');

  if (!savedOffers) {
    return {
      applicationId: null,
      offers: [],
      status: 'form',
    };
  }

  const parsedOffers = JSON.parse(savedOffers);

  return {
    applicationId: parsedOffers.applicationId,
    offers: parsedOffers.offers,
    status: parsedOffers.status,
  };
}

const applicationSlice = createSlice({
  name: 'application',
  initialState: getInitialState,
  reducers: {
    setOffers: (state, action: PayloadAction<CreditOffer[]>) => {
      state.applicationId = action.payload[0].applicationId;
      state.offers = action.payload;
      state.status = 'offers';

      localStorage.setItem(
        'creditOffers',
        JSON.stringify({
          applicationId: state.applicationId,
          offers: action.payload,
          status: 'offers',
        })
      );
    },
    removeOffers: (state) => {
      state.applicationId = null;
      state.offers = [];
      state.status = 'form';

      localStorage.removeItem('creditOffers');
    },
    offerSent: (state, action: PayloadAction<number>) => {
      state.applicationId = action.payload;
      state.offers = [];
      state.status = 'sent';

      localStorage.setItem(
        'creditOffers',
        JSON.stringify({
          applicationId: state.applicationId,
          offers: [],
          status: 'sent',
        })
      );
    },
    setApplicationStatus: (
      state,
      action: PayloadAction<ApplicationUIStatus>
    ) => {
      state.status = action.payload;

      localStorage.setItem(
        'creditOffers',
        JSON.stringify({
          applicationId: state.applicationId,
          offers: state.offers,
          status: state.status,
        })
      );
    },
  },
});

export const { setOffers, removeOffers, offerSent, setApplicationStatus } =
  applicationSlice.actions;
export default applicationSlice.reducer;
