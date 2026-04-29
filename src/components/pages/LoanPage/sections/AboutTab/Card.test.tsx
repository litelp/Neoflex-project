import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('render title, text and image', () => {
    render(<Card icon="test-icon.png" title="Test title" text="Test text" />);

    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test text')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test-icon.png');
    expect(image).toHaveAttribute('alt', 'Test title');
  });

  it('apply custom className', () => {
    render(
      <Card
        icon="test.png"
        title="Title"
        text="Text"
        className="custom-class"
      />
    );

    const article = screen.getByRole('article');
    expect(article).toHaveClass('custom-class');
  });
});
