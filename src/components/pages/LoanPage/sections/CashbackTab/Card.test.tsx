import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('render text and value', () => {
    render(<Card text="Balance" value="1000 ₽" />);

    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('1000 ₽')).toBeInTheDocument();
  });

  it('render as article', () => {
    render(<Card text="Balance" value="1000 ₽" />);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('apply custom className', () => {
    render(<Card text="Balance" value="1000 ₽" className="custom-class" />);

    expect(screen.getByRole('article')).toHaveClass('custom-class');
  });
});
