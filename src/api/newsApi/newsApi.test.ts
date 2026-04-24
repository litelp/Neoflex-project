import { getValidNews } from './newsApi';
import axios from 'axios';
import { clearHtml } from '@/utils/clearHtml';

vi.mock('axios');
vi.mock('@/utils/clearHtml', () => ({
  clearHtml: vi.fn((v) => v),
}));

const mockedAxios = vi.mocked(axios);
const mockedClearHtml = vi.mocked(clearHtml);

describe('getValidNews', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('map and return valid news', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        articles: [
          {
            urlToImage: 'img.jpg',
            title: 'Title',
            url: 'link',
            description: 'desc',
          },
        ],
      },
    });

    const result = await getValidNews();

    expect(result).toEqual([
      {
        urlToImage: 'img.jpg',
        title: 'Title',
        url: 'link',
        description: 'desc',
      },
    ]);
  });

  it('filter invalid news', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        articles: [
          {
            urlToImage: null,
            title: 'Invalid',
            url: 'link',
            description: 'desc',
          },
          {
            urlToImage: 'img.jpg',
            title: 'Invalid2',
            url: 'link',
            description: '',
          },
        ],
      },
    });

    const result = await getValidNews();

    expect(result).toEqual([]);
  });

  it('calls clearHtml for description', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        articles: [
          {
            urlToImage: 'img.jpg',
            title: 'Title',
            url: 'link',
            description: '<p>desc</p>',
          },
        ],
      },
    });

    await getValidNews();

    expect(mockedClearHtml).toHaveBeenCalledWith('<p>desc</p>');
  });
});
