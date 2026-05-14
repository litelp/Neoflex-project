import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('render with default label', () => {
    render(<Loader />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('render with custom label', () => {
    render(<Loader label="Data is loading" />);

    expect(
      screen.getByRole('status', { name: 'Data is loading' })
    ).toBeInTheDocument();
  });

  it('apply custom className', () => {
    render(<Loader className="custom-loader" />);

    expect(screen.getByRole('status')).toHaveClass('custom-loader');
  });
});
