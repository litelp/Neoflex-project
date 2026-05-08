import { render, screen } from '@testing-library/react';
import { SuccessDocument } from './SuccessDocument';

describe('SuccessDocument', () => {
  it('render success message', () => {
    render(<SuccessDocument />);

    expect(screen.getByText('Documents are formed')).toBeInTheDocument();
    expect(
      screen.getByText('Documents for signing will be sent to your email')
    ).toBeInTheDocument();
  });
});
