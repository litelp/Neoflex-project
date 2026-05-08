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
});
