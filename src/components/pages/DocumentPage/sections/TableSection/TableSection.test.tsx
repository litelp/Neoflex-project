import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { TableSection } from './TableSection';
import { sendDocument } from '@/api/applicationApi/applicationApi';

vi.mock('@/api/applicationApi/applicationApi', () => ({
  sendDocument: vi.fn(),
}));

vi.mock('./Modal/Modal', () => ({
  Modal: () => <div>Deny modal</div>,
}));

const mockedSendDocument = vi.mocked(sendDocument);

const data = [
  {
    number: 1,
    date: '2026-01-01',
    totalPayment: 1000,
    interestPayment: 100,
    debtPayment: 900,
    remainingDebt: 5000,
  },
];

function renderComponent(onSend = vi.fn()) {
  render(
    <MemoryRouter initialEntries={['/document/1']}>
      <Routes>
        <Route
          path="/document/:applicationId"
          element={<TableSection data={data} onSend={onSend} />}
        />
      </Routes>
    </MemoryRouter>
  );

  return { onSend };
}

describe('TableSection', () => {
  it('render payment schedule table', () => {
    renderComponent();

    expect(screen.getByText('Payment Schedule')).toBeInTheDocument();
    expect(screen.getByText('TOTAL PAYMENT')).toBeInTheDocument();
    expect(screen.getByText('2026-01-01')).toBeInTheDocument();
  });

  it('send document after agreement', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();

    mockedSendDocument.mockResolvedValue();

    renderComponent(onSend);

    await user.click(screen.getByText('I agree with the payment schedule'));
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await waitFor(() => expect(mockedSendDocument).toHaveBeenCalledWith(1));

    expect(onSend).toHaveBeenCalled();
  });

  it('open deny modal after click', async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole('button', { name: 'Deny' }));

    expect(screen.getByText('Deny modal')).toBeInTheDocument();
  });
});
