import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationIdPage } from './ApplicationIdPage';

vi.mock('./sections/ScoringFormSection/ScoringFormSection', () => ({
  ScoringFormSection: ({ onSuccess }: { onSuccess: () => void }) => (
    <div>
      <span>Scoring Form</span>
      <button onClick={onSuccess}>Success</button>
    </div>
  ),
}));

vi.mock('./sections/ScoringSuccessSection/ScoringSuccessSection', () => ({
  ScoringSuccessSection: () => <span>Scoring Success</span>,
}));

describe('ApplicationIdPage', () => {
  it('render scoring form by default', () => {
    render(<ApplicationIdPage />);

    expect(screen.getByText('Scoring Form')).toBeInTheDocument();
  });

  it('render success page after success callback', async () => {
    const user = userEvent.setup();

    render(<ApplicationIdPage />);

    await user.click(screen.getByRole('button', { name: /success/i }));

    expect(screen.getByText('Scoring Success')).toBeInTheDocument();
  });

  it('hide scoring form after success', async () => {
    const user = userEvent.setup();

    render(<ApplicationIdPage />);

    await user.click(screen.getByRole('button', { name: /success/i }));

    expect(screen.queryByText('Scoring Form')).not.toBeInTheDocument();
  });
});
