import { render, screen } from '@testing-library/react';
import { ChooseCardSection } from './ChooseCardSection';

describe('ChooseCardSection', () => {
  it('render title and button', () => {
    render(<ChooseCardSection />);

    expect(
      screen.getByRole('heading', { name: /choose the design you like/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /choose the card/i })
    ).toBeInTheDocument();
  });

  it('render card images', () => {
    render(<ChooseCardSection />);

    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(4);
  });
});
