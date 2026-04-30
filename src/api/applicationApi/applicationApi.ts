import { APPLICATION_API_BASE_URL } from '@/constants';
import axios from 'axios';

type ApplicationData = {
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthDate: string;
  passportSeries: string;
  passportNumber: string;
};

export async function sendApplication(data: ApplicationData) {
  const response = await axios.post(`${APPLICATION_API_BASE_URL}/application`, {
    amount: data.amount,
    term: data.term,
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: data.middleName,
    email: data.email,
    birthdate: data.birthDate,
    passportSeries: data.passportSeries,
    passportNumber: data.passportNumber,
  });

  return response.data;
}
