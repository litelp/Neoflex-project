import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EnterCodeSection } from './EnterCodeSection';
import { sendCode } from '@/api/applicationApi/applicationApi';

vi.mock('@/api/applicationApi/applicationApi', () => ({
  sendCode: vi.fn(),
}));

const mockedSendCode = vi.mocked(sendCode);

function renderComponent(onSend = vi.fn()) {
  render(
    <MemoryRouter initialEntries={['/document/1']}>
      <Routes>
        <Route
          path="/document/:applicationId"
          element={<EnterCodeSection onSend={onSend} />}
        />
      </Routes>
    </MemoryRouter>
  );

  return { onSend };
}

describe('EnterCodeSection', () => {
  it('render code inputs', () => {
    renderComponent();

    const inputs = screen.getAllByRole('textbox');

    expect(inputs).toHaveLength(4);
  });

  it('send code after entering 4 digits', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();

    mockedSendCode.mockResolvedValue();

    renderComponent(onSend);

    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], '1');
    await user.type(inputs[1], '2');
    await user.type(inputs[2], '3');
    await user.type(inputs[3], '4');
    await waitFor(() => expect(mockedSendCode).toHaveBeenCalledWith(1, 1234));

    expect(onSend).toHaveBeenCalled();
  });
});
