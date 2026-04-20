import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('render text', () => {
    render(<Button text="Click me" />);

    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button text="Click me" onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: /click me/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('apply type attribute', () => {
    render(<Button text="Submit" type="submit" />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
