import { render, screen } from '@testing-library/react';
import { MapSection } from './MapSection';

describe('MapSection', () => {
  it('render title and map image', () => {
    render(<MapSection />);

    expect(
      screen.getByRole('heading', {
        name: /you can use our services anywhere/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/world map showing where services are available/i)
    ).toBeInTheDocument();
  });
});
