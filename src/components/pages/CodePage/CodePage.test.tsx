import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodePage } from './CodePage';

vi.mock('./sections/EnterCodeSection/EnterCodeSection', () => ({
  EnterCodeSection: ({ onSend }: { onSend: () => void }) => (
    <div>
      <span>Enter Code</span>
      <button onClick={onSend}>Send code</button>
    </div>
  ),
}));

vi.mock('./sections/SuccessCode/SuccessCode', () => ({
  SuccessCode: () => <span>Success Page</span>,
}));

describe('CodePage', () => {
  it('render enter code page by default', () => {
    render(<CodePage />);

    expect(screen.getByText('Enter Code')).toBeInTheDocument();
  });

  it('render success page after sending code', async () => {
    const user = userEvent.setup();

    render(<CodePage />);

    await user.click(screen.getByRole('button', { name: /send code/i }));

    expect(screen.getByText('Success Page')).toBeInTheDocument();
  });

  it('hide enter code page after success', async () => {
    const user = userEvent.setup();

    render(<CodePage />);

    await user.click(screen.getByRole('button', { name: /send code/i }));

    expect(screen.queryByText('Enter Code')).not.toBeInTheDocument();
  });
});
