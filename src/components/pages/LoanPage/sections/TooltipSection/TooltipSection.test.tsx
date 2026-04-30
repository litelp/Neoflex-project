import { render, screen } from '@testing-library/react';
import { TooltipSection } from './TooltipSection';

vi.mock('./Tooltip/Tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('TooltipSection', () => {
  it('render main content', () => {
    render(<TooltipSection />);

    expect(
      screen.getByText('Platinum digital credit card')
    ).toBeInTheDocument();
    expect(screen.getByText(/Our best credit card/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Apply for card/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText('Credit card design')).toBeInTheDocument();
  });

  it('render benefits', () => {
    render(<TooltipSection />);

    expect(screen.getByText('Up to 160 days')).toBeInTheDocument();
    expect(screen.getByText('No percent')).toBeInTheDocument();
    expect(screen.getByText('Up to 600 000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Credit limit')).toBeInTheDocument();
    expect(screen.getByText('0 ₽')).toBeInTheDocument();
    expect(screen.getByText('Card service is free')).toBeInTheDocument();
  });

  it('render 3 benefit items', () => {
    render(<TooltipSection />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
