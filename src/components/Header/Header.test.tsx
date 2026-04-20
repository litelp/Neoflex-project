import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

function getBurgerButton() {
  return document.querySelector(
    'button[aria-controls="header-navigation"]'
  ) as HTMLButtonElement;
}

describe('Header', () => {
  it('render logo, navigation links and main button', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /neobank/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /credit card/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /product/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /account/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /resources/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /online bank/i })
    ).toBeInTheDocument();
    expect(getBurgerButton()).toBeInTheDocument();
  });

  it('opens and closes menu when burger button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    const burgerButton = getBurgerButton();

    expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.body).not.toHaveClass('menu-open');

    await user.click(burgerButton);

    expect(burgerButton).toHaveAttribute('aria-expanded', 'true');
    expect(document.body).toHaveClass('menu-open');

    await user.click(burgerButton);

    expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.body).not.toHaveClass('menu-open');
  });

  it('close menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderHeader();

    const burgerButton = getBurgerButton();

    await user.click(burgerButton);

    expect(document.body).toHaveClass('menu-open');
    expect(burgerButton).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Escape}');

    expect(document.body).not.toHaveClass('menu-open');
    expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
  });
});
