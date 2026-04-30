import { render, screen } from '@testing-library/react';
import { AboutTab } from './AboutTab';

describe('AboutTab', () => {
  it('render all about cards', () => {
    render(<AboutTab />);

    expect(screen.getByText('Up to 50 000 ₽')).toBeInTheDocument();
    expect(
      screen.getByText('Cash and transfers without commission and percent')
    ).toBeInTheDocument();

    expect(screen.getByText('Up to 160 days')).toBeInTheDocument();
    expect(screen.getByText('Without percent on the loan')).toBeInTheDocument();

    expect(screen.getByText('Free delivery')).toBeInTheDocument();
    expect(
      screen.getByText(
        'We will deliver your card by courier at a convenient place and time for you'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Up to 12 months')).toBeInTheDocument();
    expect(
      screen.getByText(
        'No percent. For equipment, clothes and other purchases in installments'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText('Convenient deposit and withdrawal')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'At any ATM. Top up your credit card for free with cash or transfer from other cards'
      )
    ).toBeInTheDocument();
  });

  it('render 5 card images', () => {
    render(<AboutTab />);

    expect(screen.getAllByRole('img')).toHaveLength(5);
  });
});
