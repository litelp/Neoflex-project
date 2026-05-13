import { render, screen } from '@testing-library/react';
import { RatesTab } from './RatesTab';

describe('RatesTab', () => {
  it('render all rates items', () => {
    render(<RatesTab />);

    expect(screen.getAllByRole('listitem')).toHaveLength(7);
    expect(screen.getByText('Card currency')).toBeInTheDocument();
    expect(screen.getByText('Rubles, dollars, euro')).toBeInTheDocument();
    expect(screen.getByText('Interest free period')).toBeInTheDocument();
    expect(screen.getByText('0% up to 160 days')).toBeInTheDocument();
    expect(screen.getByText('Payment system')).toBeInTheDocument();
    expect(screen.getByText('Mastercard, Visa')).toBeInTheDocument();
    expect(
      screen.getByText('Maximum credit limit on the card')
    ).toBeInTheDocument();
    expect(screen.getByText('600 000 ₽')).toBeInTheDocument();
    expect(
      screen.getByText('Replenishment and withdrawal')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'At any ATM. Top up your credit card for free with cash or transfer from other cards'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Max cashback per month')).toBeInTheDocument();
    expect(screen.getByText('15 000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Transaction Alert')).toBeInTheDocument();
    expect(
      screen.getByText(/60 ₽ — SMS or push notifications/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /0 ₽ — card statement, information about transactions in the online bank/
      )
    ).toBeInTheDocument();
  });

  it('render rate conditions', () => {
    render(<RatesTab />);

    expect(screen.getByText('Card currency')).toBeInTheDocument();
    expect(screen.getByText('Interest free period')).toBeInTheDocument();
    expect(screen.getByText('Payment system')).toBeInTheDocument();
  });

  it('render rate descriptions', () => {
    render(<RatesTab />);

    expect(screen.getByText('Rubles, dollars, euro')).toBeInTheDocument();
    expect(screen.getByText('0% up to 160 days')).toBeInTheDocument();
    expect(screen.getByText('600 000 ₽')).toBeInTheDocument();
  });
});
