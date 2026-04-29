import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsSection } from './TabsSection';

vi.mock('../AboutTab/AboutTab', () => ({
  AboutTab: () => <div>About content</div>,
}));

vi.mock('../RatesTab/RatesTab', () => ({
  RatesTab: () => <div>Rates content</div>,
}));

vi.mock('../CashbackTab/CashbackTab', () => ({
  CashbackTab: () => <div>Cashback content</div>,
}));

vi.mock('../FaqTab/FaqTab', () => ({
  FaqTab: () => <div>FAQ content</div>,
}));

describe('TabsSection', () => {
  it('render default tab', () => {
    render(<TabsSection />);

    expect(screen.getByText('About content')).toBeInTheDocument();
  });

  it('switch tab on click', async () => {
    const user = userEvent.setup();

    render(<TabsSection />);

    await user.click(
      screen.getByRole('button', { name: /Rates and conditions/i })
    );

    expect(screen.getByText('Rates content')).toBeInTheDocument();
  });

  it('switch to cashback tab', async () => {
    const user = userEvent.setup();

    render(<TabsSection />);

    await user.click(screen.getByRole('button', { name: /Cashback/i }));

    expect(screen.getByText('Cashback content')).toBeInTheDocument();
  });

  it('switch to FAQ tab', async () => {
    const user = userEvent.setup();

    render(<TabsSection />);

    await user.click(screen.getByRole('button', { name: /FAQ/i }));

    expect(screen.getByText('FAQ content')).toBeInTheDocument();
  });
});
