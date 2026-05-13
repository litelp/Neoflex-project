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

vi.mock('./CreditOffers/CreditOffers', () => ({
  CreditOffers: () => <div data-testid="credit-offers" />,
}));

vi.mock('./PreliminaryDecision/PreliminaryDecision', () => ({
  PreliminaryDecision: () => <div data-testid="preliminary-decision" />,
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

  it('render credit offers when status is offers', () => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        application: {
          status: 'offers',
          applicationId: null,
        },
      })
    );

    render(<GetCardSection />);

    expect(screen.getByTestId('credit-offers')).toBeInTheDocument();
  });

  it('render preliminary decision when status is sent', () => {
    vi.mocked(useSelector).mockImplementation((selector) =>
      selector({
        application: {
          status: 'sent',
          applicationId: null,
        },
      })
    );

    render(<GetCardSection />);

    expect(screen.getByTestId('preliminary-decision')).toBeInTheDocument();
  });
});
