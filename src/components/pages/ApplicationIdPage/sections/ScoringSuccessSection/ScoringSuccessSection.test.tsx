import { render, screen } from '@testing-library/react';
import { ScoringSuccessSection } from './ScoringSuccessSection';

describe('ScoringSuccessSection', () => {
  it('render success message', () => {
    render(<ScoringSuccessSection />);

    expect(
      screen.getByText('Wait for a decision on the application')
    ).toBeInTheDocument();
    expect(
      screen.getByText('The answer will come to your mail within 10 minutes')
    ).toBeInTheDocument();
  });

  it('render title', () => {
    render(<ScoringSuccessSection />);

    expect(
      screen.getByText('Wait for a decision on the application')
    ).toBeInTheDocument();
  });

  it('render description text', () => {
    render(<ScoringSuccessSection />);

    expect(
      screen.getByText('The answer will come to your mail within 10 minutes')
    ).toBeInTheDocument();
  });
});
