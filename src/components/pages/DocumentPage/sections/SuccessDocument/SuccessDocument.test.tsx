import { render, screen } from '@testing-library/react';
import { SuccessDocument } from './SuccessDocument';

describe('SuccessDocument', () => {
  it('render title', () => {
    render(<SuccessDocument />);

    expect(screen.getByText('Documents are formed')).toBeInTheDocument();
  });

  it('render description', () => {
    render(<SuccessDocument />);

    expect(
      screen.getByText('Documents for signing will be sent to your email')
    ).toBeInTheDocument();
  });

  it('render heading', () => {
    render(<SuccessDocument />);

    expect(
      screen.getByRole('heading', { name: /documents are formed/i })
    ).toBeInTheDocument();
  });
});
