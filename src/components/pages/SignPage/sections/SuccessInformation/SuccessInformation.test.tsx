import { render, screen } from '@testing-library/react';
import { SuccessInformation } from './SuccessInformation';

describe('SuccessInformation', () => {
  it('render success message', () => {
    render(<SuccessInformation />);

    expect(
      screen.getByText(
        'Documents have been successfully signed and sent for approval'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Within 10 minutes you will be sent a PIN code to your email for confirmation'
      )
    ).toBeInTheDocument();
  });

  it('render title', () => {
    render(<SuccessInformation />);

    expect(
      screen.getByRole('heading', {
        name: /documents have been successfully signed/i,
      })
    ).toBeInTheDocument();
  });

  it('render confirmation text', () => {
    render(<SuccessInformation />);

    expect(
      screen.getByText(/within 10 minutes you will be sent a pin code/i)
    ).toBeInTheDocument();
  });
});
