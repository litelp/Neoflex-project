import { render, screen } from '@testing-library/react';
import { MapSection } from './MapSection';

describe('MapSection', () => {
  it('render title', () => {
    render(<MapSection />);

    expect(
      screen.getByRole('heading', {
        name: /you can use our services anywhere/i,
      })
    ).toBeInTheDocument();
  });

  it('render description text', () => {
    render(<MapSection />);

    expect(
      screen.getByText(
        'Withdraw and transfer money online through our application'
      )
    ).toBeInTheDocument();
  });

  it('render map image', () => {
    render(<MapSection />);

    expect(
      screen.getByAltText(/world map showing where services are available/i)
    ).toBeInTheDocument();
  });
});
