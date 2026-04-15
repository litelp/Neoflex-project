import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { SubscribeSection } from './SubscribeSection';

function renderSubscribeSection() {
  return render(
    <MemoryRouter>
      <SubscribeSection />
    </MemoryRouter>
  );
}

describe('SubscribeSection', () => {
  it('render form elements', () => {
    renderSubscribeSection();

    expect(
      screen.getByRole('heading', { name: /subscribe newsletter/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /subscribe/i })
    ).toBeInTheDocument();
  });

  it('update input value when user types', async () => {
    const user = userEvent.setup();
    renderSubscribeSection();

    const input = screen.getByPlaceholderText(/your email/i);

    await user.type(input, 'test@mail.com');

    expect(input).toHaveValue('test@mail.com');
  });
});
