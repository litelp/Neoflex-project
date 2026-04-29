import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomizeForm } from './CustomizeForm';
import { sendApplication } from '@/api/applicationApi/applicationApi';

vi.mock('@/api/applicationApi/applicationApi', () => ({
  sendApplication: vi.fn(),
}));

vi.mock('@/components/Loader/Loader', () => ({
  Loader: () => <span>Loading...</span>,
}));

const mockedSendApplication = vi.mocked(sendApplication);

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByPlaceholderText('For Example Doe'), 'Doe');
  await user.type(screen.getByPlaceholderText('For Example Jhon'), 'John');
  await user.type(
    screen.getByPlaceholderText('test@gmail.com'),
    'test@gmail.com'
  );
  await user.type(screen.getByLabelText(/Your date of birth/i), '2000-01-01');
  await user.type(screen.getByPlaceholderText('0000'), '1234');
  await user.type(screen.getByPlaceholderText('000000'), '123456');
};

describe('CustomizeForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render form fields', () => {
    render(<CustomizeForm />);

    expect(screen.getByText('Customize your card')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('For Example Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('For Example Jhon')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('For Example Victorovich')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('test@gmail.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0000')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('000000')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });

  it('normalize amount if value is less than minimum', async () => {
    const user = userEvent.setup();

    render(<CustomizeForm />);

    const amountInput = screen
      .getAllByDisplayValue('15000')
      .find((element) => element.getAttribute('type') === 'text');

    expect(amountInput).toBeDefined();

    await user.clear(amountInput as HTMLInputElement);
    await user.type(amountInput as HTMLInputElement, '1');
    await user.tab();

    expect(amountInput).toHaveValue('15000');
  });

  it('submit valid form data', async () => {
    mockedSendApplication.mockResolvedValue({ id: 1 });

    const user = userEvent.setup();

    render(<CustomizeForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /continue/i }));
    await waitFor(() => {
      expect(mockedSendApplication).toHaveBeenCalledWith({
        amount: 15000,
        term: 6,
        lastName: 'Doe',
        firstName: 'John',
        middleName: null,
        email: 'test@gmail.com',
        birthDate: '2000-01-01',
        passportSeries: '1234',
        passportNumber: '123456',
      });
    });
  });

  it('show submit error if request failed', async () => {
    mockedSendApplication.mockRejectedValue(new Error('Request failed'));

    const user = userEvent.setup();

    render(<CustomizeForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(
      await screen.findByText('Failed to send application. Please try again.')
    ).toBeInTheDocument();
  });
});
