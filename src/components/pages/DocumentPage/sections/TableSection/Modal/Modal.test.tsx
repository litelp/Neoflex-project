import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Modal } from './Modal';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render modal text', () => {
    render(
      <MemoryRouter>
        <Modal onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('Deny application')).toBeInTheDocument();
    expect(
      screen.getByText('You exactly sure, you want to cancel this application?')
    ).toBeInTheDocument();
  });

  it('call onClose after click close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <Modal onClose={onClose} />
      </MemoryRouter>
    );

    await user.click(screen.getByLabelText('Close modal'));

    expect(onClose).toHaveBeenCalled();
  });

  it('show denied message after click deny', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Modal onClose={vi.fn()} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: 'Deny' }));

    expect(
      screen.getByText('Your application has been deny!')
    ).toBeInTheDocument();
  });

  it('navigate to home after click go home', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Modal onClose={vi.fn()} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: 'Deny' }));
    await user.click(screen.getByRole('button', { name: 'Go home' }));

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
