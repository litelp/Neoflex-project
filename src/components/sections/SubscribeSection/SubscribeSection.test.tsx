import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { SubscribeSection } from './SubscribeSection';
import { subscribeToNews } from '@/api/emailApi/emailApi';

vi.mock('@/api/emailApi/emailApi', () => ({
  subscribeToNews: vi.fn(),
}));

function renderSubscribeSection() {
  return render(
    <MemoryRouter>
      <SubscribeSection />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

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

  it('show success message after successful subscription', async () => {
    vi.mocked(subscribeToNews).mockResolvedValue({});

    const user = userEvent.setup();
    renderSubscribeSection();

    await user.type(
      screen.getByPlaceholderText(/your email/i),
      'test@mail.com'
    );
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText(/already subscribed/i)).toBeInTheDocument();
    expect(localStorage.getItem('isSubscribed')).toBe('true');
  });
});
