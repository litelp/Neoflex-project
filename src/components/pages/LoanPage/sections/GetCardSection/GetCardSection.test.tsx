import { render, screen } from '@testing-library/react';
import { GetCardSection } from './GetCardSection';
import { useSelector } from 'react-redux';

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('./CustomizeForm/CustomizeForm', () => ({
  CustomizeForm: () => <div data-testid="customize-form" />,
}));

describe('GetCardSection', () => {
  beforeEach(() => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        application: {
          status: 'form',
          applicationId: null,
        },
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('render title, steps and form', () => {
    render(<GetCardSection />);

    expect(screen.getByText('How to get a card')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(
      screen.getByText(
        'Fill out an online application - you do not need to visit the bank'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Find out the bank's decision immediately after filling out the application"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'The bank will deliver the card free of charge, wherever convenient, to your city'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('customize-form')).toBeInTheDocument();
  });

  it('render 3 steps', () => {
    render(<GetCardSection />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
