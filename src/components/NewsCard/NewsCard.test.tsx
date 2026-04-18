import { render, screen } from '@testing-library/react';
import { NewsCard } from './NewsCard';

const props = {
  urlToImage: 'https://test.com/image.jpg',
  title: 'Test title',
  url: 'https://test.com',
  description: 'Test description',
};

describe('NewsCard', () => {
  it('render title and description', () => {
    render(<NewsCard {...props} />);

    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('render link with correct attributes', () => {
    render(<NewsCard {...props} />);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', props.url);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('render image with correct src and alt', () => {
    render(<NewsCard {...props} />);

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', props.urlToImage);
    expect(img).toHaveAttribute('alt', props.title);
  });
});
