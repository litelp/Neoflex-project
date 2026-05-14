import { render, screen } from '@testing-library/react';
import { CashbackTab } from './CashbackTab';

describe('CashbackTab', () => {
  it('render all cashback items', () => {
    render(<CashbackTab />);

    expect(screen.getAllByRole('listitem')).toHaveLength(6);

    expect(
      screen.getByText('For food delivery, cafes and restaurants')
    ).toBeInTheDocument();
    expect(
      screen.getByText('In supermarkets with our subscription')
    ).toBeInTheDocument();
    expect(
      screen.getByText("In clothing stores and children's goods")
    ).toBeInTheDocument();
    expect(
      screen.getByText('Other purchases and payment of services andfines')
    ).toBeInTheDocument();
    expect(screen.getByText('Shopping in online stores')).toBeInTheDocument();
    expect(screen.getByText('Purchases from our partners')).toBeInTheDocument();

    expect(screen.getAllByText('5%')).toHaveLength(2);
    expect(screen.getByText('2%')).toBeInTheDocument();
    expect(screen.getByText('1%')).toBeInTheDocument();
    expect(screen.getByText('up to 3%')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('render 6 cashback items', () => {
    render(<CashbackTab />);

    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  it('render cashback values', () => {
    render(<CashbackTab />);

    expect(screen.getAllByText('5%')).toHaveLength(2);
    expect(screen.getByText('2%')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
  });
});
