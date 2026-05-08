import { render, screen } from '@testing-library/react';
import { PreliminaryDecision } from './PreliminaryDecision';

describe('PreliminaryDecision', () => {
  it('render preliminary decision message', () => {
    render(<PreliminaryDecision />);

    expect(
      screen.getByText('The preliminary decision has been sent to your email.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'In the letter you can get acquainted with the preliminary decision on the credit card.'
      )
    ).toBeInTheDocument();
  });
});
