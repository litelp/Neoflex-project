import axios from 'axios';

const URL = 'http://localhost:8080';

export async function subscribeToNews(email: string) {
  const response = await axios.post(`${URL}/email`, { email });

  return response.data;
}
