import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { InformationSection } from './InformationSection';
import { sendInfo } from '@/api/applicationApi/applicationApi';

vi.mock('@/api/applicationApi/applicationApi', () => ({
  sendInfo: vi.fn(),
}));

const mockedSendInfo = vi.mocked(sendInfo);

function renderComponent(onSend = vi.fn()) {
  render(
    <MemoryRouter initialEntries={['/document/1']}>
      <Routes>
        <Route
          path="/document/:applicationId"
          element={<InformationSection onSend={onSend} />}
        />
      </Routes>
    </MemoryRouter>
  );

  return { onSend };
}

describe('InformationSection', () => {
  it('render information section', () => {
    renderComponent();

    expect(screen.getByText('Signing of documents')).toBeInTheDocument();
    expect(screen.getByText('Information on your card')).toBeInTheDocument();
  });

  it('send information after agreement', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();

    mockedSendInfo.mockResolvedValue();

    renderComponent(onSend);

    await user.click(screen.getByText('I agree'));
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await waitFor(() => expect(mockedSendInfo).toHaveBeenCalledWith(1));
    expect(onSend).toHaveBeenCalled();
  });

  it('disable send button before agreement', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });
});
