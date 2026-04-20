import { render, screen } from '@testing-library/react';
import { NewsSection } from './NewsSection';
import { getValidNews } from '@/utils/newsAPI';

vi.mock('@/utils/newsAPI', () => ({
  getValidNews: vi.fn(),
}));

const mockedGetValidNews = vi.mocked(getValidNews);

describe('NewsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render loader initially', () => {
    mockedGetValidNews.mockReturnValue(new Promise(() => {}));

    render(<NewsSection />);

    expect(
      screen.getByRole('status', { name: 'Loading news' })
    ).toBeInTheDocument();
  });

  it('render news after successful request', async () => {
    mockedGetValidNews.mockResolvedValue([
      {
        urlToImage: 'https://test.com/image.jpg',
        title: 'News title',
        url: 'https://test.com/news',
        description: 'News description',
      },
    ]);

    render(<NewsSection />);

    expect(await screen.findByText('News title')).toBeInTheDocument();
    expect(screen.getByText('News description')).toBeInTheDocument();
  });

  it('render error message when request fails', async () => {
    mockedGetValidNews.mockRejectedValue(new Error('Request failed'));

    render(<NewsSection />);

    expect(await screen.findByText('Error loading news')).toBeInTheDocument();
  });

  it('render fallback message when news is empty', async () => {
    mockedGetValidNews.mockResolvedValue([]);

    render(<NewsSection />);

    expect(await screen.findByText('No news available')).toBeInTheDocument();
  });
});
