import axios from 'axios';
import { sendApplication } from './applicationApi';

vi.mock('axios');

const mockedAxios = vi.mocked(axios);

describe('sendApplication', () => {
  it('send application data and return response data', async () => {
    const applicationData = {
      amount: 15000,
      term: 6,
      firstName: 'Ivan',
      lastName: 'Ivanov',
      middleName: 'Ivanovich',
      email: 'ivan@test.com',
      birthDate: '2000-01-01',
      passportSeries: '1234',
      passportNumber: '123456',
    };

    const responseData = {
      id: 1,
      status: 'success',
    };

    mockedAxios.post.mockResolvedValue({
      data: responseData,
    });

    const result = await sendApplication(applicationData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/application',
      {
        amount: 15000,
        term: 6,
        firstName: 'Ivan',
        lastName: 'Ivanov',
        middleName: 'Ivanovich',
        email: 'ivan@test.com',
        birthdate: '2000-01-01',
        passportSeries: '1234',
        passportNumber: '123456',
      }
    );

    expect(result).toEqual(responseData);
  });
});
