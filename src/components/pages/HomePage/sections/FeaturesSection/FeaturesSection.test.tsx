import { render, screen } from '@testing-library/react';
import { FeaturesSection } from './FeaturesSection';

describe('FeaturesSection', () => {
  it('render title and description', () => {
    render(<FeaturesSection />);

    expect(
      screen.getByRole('heading', { name: /we provide many features/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/you can explore the features/i)
    ).toBeInTheDocument();
  });

  it('render image', () => {
    render(<FeaturesSection />);

    expect(screen.getByAltText(/features/i)).toBeInTheDocument();
  });

  it('render all feature items', () => {
    render(<FeaturesSection />);

    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText('Powerfull online protection')).toBeInTheDocument();
  });
});
