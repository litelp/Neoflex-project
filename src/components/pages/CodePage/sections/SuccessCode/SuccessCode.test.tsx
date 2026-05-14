import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SuccessCode } from './SuccessCode';

function renderComponent() {
  render(
    <MemoryRouter>
      <SuccessCode />
    </MemoryRouter>
  );
}

describe('SuccessCode', () => {
  it('render success title', () => {
    renderComponent();

    expect(
      screen.getByText(
        'Congratulations! You have completed your new credit card.'
      )
    ).toBeInTheDocument();
  });

  it('render success description', () => {
    renderComponent();

    expect(
      screen.getByText(
        'Your credit card will arrive soon. Thank you for choosing us!'
      )
    ).toBeInTheDocument();
  });

  it('render link to main page', () => {
    renderComponent();

    const link = screen.getByRole('link', { name: /view other offers/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
