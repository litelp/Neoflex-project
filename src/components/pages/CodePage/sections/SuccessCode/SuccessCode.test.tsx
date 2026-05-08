import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SuccessCode } from './SuccessCode';

describe('SuccessCode', () => {
  it('render success content', () => {
    render(
      <MemoryRouter>
        <SuccessCode />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        'Congratulations! You have completed your new credit card.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Your credit card will arrive soon. Thank you for choosing us!'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /view other offers/i })
    ).toBeInTheDocument();
  });
});
