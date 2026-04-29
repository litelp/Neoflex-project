import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('render text and value', () => {
    render(<Card text="Balance" value="1000 ₽" />);

    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('1000 ₽')).toBeInTheDocument();
  });
});
