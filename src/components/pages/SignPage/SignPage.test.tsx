import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignPage } from './SignPage';

vi.mock('./sections/InformationSection/InformationSection', () => ({
  InformationSection: ({ onSend }: { onSend: () => void }) => (
    <button onClick={onSend}>Send info</button>
  ),
}));

vi.mock('./sections/SuccessInformation/SuccessInformation', () => ({
  SuccessInformation: () => <div>Success information</div>,
}));

describe('SignPage', () => {
  it('render information section by default', () => {
    render(<SignPage />);

    expect(
      screen.getByRole('button', { name: /send info/i })
    ).toBeInTheDocument();
  });

  it('render success section after send', async () => {
    const user = userEvent.setup();

    render(<SignPage />);

    await user.click(screen.getByRole('button', { name: /send info/i }));

    expect(screen.getByText('Success information')).toBeInTheDocument();
  });

  it('remove information section after step change', async () => {
    const user = userEvent.setup();

    render(<SignPage />);

    await user.click(screen.getByRole('button', { name: /send info/i }));

    expect(
      screen.queryByRole('button', { name: /send info/i })
    ).not.toBeInTheDocument();
  });
});
