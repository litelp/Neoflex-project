import axios from 'axios';
import { subscribeToNews } from './emailApi';

vi.mock('axios');

const mockedAxios = vi.mocked(axios);

describe('subscribeToNews', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('send email to subscription API', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { success: true },
    });

    const result = await subscribeToNews('test@mail.com');

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/email',
      { email: 'test@mail.com' }
    );

    expect(result).toEqual({ success: true });
  });

  it('throw error when request fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Request failed'));

    await expect(subscribeToNews('test@mail.com')).rejects.toThrow(
      'Request failed'
    );
  });
});
