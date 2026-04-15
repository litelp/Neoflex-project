import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  it('render logo and contacts', () => {
    renderFooter();

    expect(screen.getByAltText(/neoflex/i)).toBeInTheDocument();
    expect(screen.getByText('+7 (495) 984 25 13')).toBeInTheDocument();
    expect(screen.getByText('info@neoflex.ru')).toBeInTheDocument();
  });

  it('render navigation links', () => {
    renderFooter();

    expect(
      screen.getByRole('link', { name: /about bank/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /ask a question/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /investors/i })
    ).toBeInTheDocument();
  });

  it('render footer navigation', () => {
    renderFooter();

    expect(
      screen.getByRole('navigation', { name: /footer navigation/i })
    ).toBeInTheDocument();
  });
});
