import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FaqTab } from './FaqTab';

describe('FaqTab', () => {
  it('render faq questions', () => {
    render(<FaqTab />);

    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('open answer after question click', async () => {
    const user = userEvent.setup();

    render(<FaqTab />);

    const question = screen.getAllByRole('button')[0];

    await user.click(question);

    expect(question).toHaveAttribute('aria-expanded', 'true');
  });

  it('close answer after second click', async () => {
    const user = userEvent.setup();

    render(<FaqTab />);

    const question = screen.getAllByRole('button')[0];

    await user.click(question);
    await user.click(question);

    expect(question).toHaveAttribute('aria-expanded', 'false');
  });

  it('open only one question at a time', async () => {
    const user = userEvent.setup();

    render(<FaqTab />);

    const questions = screen.getAllByRole('button');

    await user.click(questions[0]);
    await user.click(questions[1]);

    expect(questions[0]).toHaveAttribute('aria-expanded', 'false');
    expect(questions[1]).toHaveAttribute('aria-expanded', 'true');
  });
});
