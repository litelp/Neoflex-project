import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EnterCodeSection } from './EnterCodeSection';
import { sendCode } from '@/api/applicationApi/applicationApi';

vi.mock('@/api/applicationApi/applicationApi', () => ({
  sendCode: vi.fn(),
}));

vi.mock('@/components/Loader/Loader', () => ({
  Loader: ({ className }: { className?: string }) => (
    <div className={className} role="status">
      Loading...
    </div>
  ),
}));

const mockedSendCode = vi.mocked(sendCode);

interface RenderComponentOptions {
  onSend?: () => void;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

function renderComponent({onSend = vi.fn(), isLoading = false, setIsLoading = vi.fn()}: RenderComponentOptions = {}) {
  render(
    <MemoryRouter initialEntries={['/document/1']}>
      <Routes>
        <Route
          path="/document/:applicationId"
            element={<EnterCodeSection onSend={onSend} isLoading={isLoading} setIsLoading={setIsLoading} />}
        />
      </Routes>
    </MemoryRouter>
  );

  return { onSend, setIsLoading };
}

describe('EnterCodeSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render code inputs', () => {
    renderComponent();

    const inputs = screen.getAllByRole('textbox');

    expect(inputs).toHaveLength(4);
  });

  it('send code after entering 4 digits', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    const setIsLoading = vi.fn();

    mockedSendCode.mockResolvedValue();

    renderComponent({onSend, setIsLoading});

    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], '1');
    await user.type(inputs[1], '2');
    await user.type(inputs[2], '3');
    await user.type(inputs[3], '4');
    await waitFor(() => expect(mockedSendCode).toHaveBeenCalledWith(1, 1234));

    expect(onSend).toHaveBeenCalled();
  });
});
