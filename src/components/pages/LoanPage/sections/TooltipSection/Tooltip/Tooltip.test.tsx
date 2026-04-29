import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('show tooltip text on hover and hides on unhover', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip text="Tooltip text">
        <button type="button">Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
    await user.hover(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
    await user.unhover(screen.getByText('Hover me'));
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });
});
