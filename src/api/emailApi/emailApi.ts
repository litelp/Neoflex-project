import { APPLICATION_API_BASE_URL } from '@/constants';
import axios from 'axios';

export async function subscribeToNews(email: string) {
  const response = await axios.post(`${APPLICATION_API_BASE_URL}/email`, {
    email,
  });

  return response.data;
}
