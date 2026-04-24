import { render, screen } from '@testing-library/react';
import { FeaturesSection } from './FeaturesSection';

describe('FeaturesSection', () => {
  it('render title, image and features list', () => {
    render(<FeaturesSection />);

    expect(
      screen.getByRole('heading', { name: /we provide many features/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText(/features/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
