import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DocumentPage } from './DocumentPage';
import { getApplication } from '@/api/applicationApi/applicationApi';
import type { ApplicationResponse } from '@/types/applicationTypes';

vi.mock('@/api/applicationApi/applicationApi', () => ({
  getApplication: vi.fn(),
}));

vi.mock('./sections/TableSection/TableSection', () => ({
  TableSection: ({
    data,
    onSend,
  }: {
    data: { date: string }[];
    onSend: () => void;
  }) => (
    <div>
      <span>TableSection</span>
      <span>{data[0]?.date}</span>
      <button onClick={onSend}>Send document</button>
    </div>
  ),
}));

vi.mock('./sections/SuccessDocument/SuccessDocument', () => ({
  SuccessDocument: () => <div>SuccessDocument</div>,
}));

const mockedGetApplication = vi.mocked(getApplication);

function renderComponent() {
  render(
    <MemoryRouter initialEntries={['/document/1']}>
      <Routes>
        <Route path="/document/:applicationId" element={<DocumentPage />} />
      </Routes>
    </MemoryRouter>
  );
}

const applicationMock = {
  credit: {
    paymentSchedule: [
      {
        number: 1,
        date: '2026-01-01',
        totalPayment: 1000,
        interestPayment: 100,
        debtPayment: 900,
        remainingDebt: 5000,
      },
    ],
  },
} as ApplicationResponse;

describe('DocumentPage', () => {
  it('load payment schedule and render table', async () => {
    mockedGetApplication.mockResolvedValue(applicationMock);

    renderComponent();

    expect(mockedGetApplication).toHaveBeenCalledWith(1);
    expect(await screen.findByText('2026-01-01')).toBeInTheDocument();
  });

  it('show success document after send', async () => {
    const user = userEvent.setup();

    mockedGetApplication.mockResolvedValue(applicationMock);

    renderComponent();

    await screen.findByText('TableSection');
    await user.click(screen.getByText('Send document'));

    expect(await screen.findByText('SuccessDocument')).toBeInTheDocument();
  });
});
