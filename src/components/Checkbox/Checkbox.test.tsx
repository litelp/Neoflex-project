import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('render checkbox text', () => {
    render(<Checkbox text="I agree" onChange={vi.fn()} />);

    expect(screen.getByText('I agree')).toBeInTheDocument();
  });

  it('call onChange after click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox text="I agree" onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('call onChange with false after second click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox text="I agree" onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    await user.click(checkbox);

    expect(onChange).toHaveBeenLastCalledWith(false);
  });
});
