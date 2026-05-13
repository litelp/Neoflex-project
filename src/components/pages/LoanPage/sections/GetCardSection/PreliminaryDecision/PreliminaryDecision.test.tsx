import { render, screen } from '@testing-library/react';
import { PreliminaryDecision } from './PreliminaryDecision';

describe('PreliminaryDecision', () => {
  it('render title', () => {
    render(<PreliminaryDecision />);

    expect(
      screen.getByText('The preliminary decision has been sent to your email.')
    ).toBeInTheDocument();
  });

  it('render description', () => {
    render(<PreliminaryDecision />);

    expect(
      screen.getByText(
        'In the letter you can get acquainted with the preliminary decision on the credit card.'
      )
    ).toBeInTheDocument();
  });

  it('render heading', () => {
    render(<PreliminaryDecision />);

    expect(
      screen.getByRole('heading', {
        name: /the preliminary decision has been sent to your email/i,
      })
    ).toBeInTheDocument();
  });
});
