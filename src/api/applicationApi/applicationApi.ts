import { APPLICATION_API_BASE_URL } from '@/constants';
import type {
  ApplicationData,
  ApplicationResponse,
  CreditOffer,
  ScoringFormData,
} from '@/types/applicationTypes';
import axios from 'axios';

export async function sendApplication(
  data: ApplicationData
): Promise<CreditOffer[]> {
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

export async function applyOffer(offer: CreditOffer): Promise<void> {
  await axios.post(`${APPLICATION_API_BASE_URL}/application/apply`, offer);
}

export async function getApplication(
  applicationId: number
): Promise<ApplicationResponse> {
  const response = await axios.get(
    `${APPLICATION_API_BASE_URL}/admin/application/${applicationId}`
  );

  return response.data;
}

export async function sendScoringForm(
  formData: ScoringFormData,
  applicationId: number
): Promise<void> {
  await axios.put(
    `${APPLICATION_API_BASE_URL}/application/registration/${applicationId}`,
    {
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      dependentAmount: formData.dependentAmount,
      passportIssueDate: formData.passportIssueDate,
      passportIssueBranch: formData.passportIssueBranch,
      employment: {
        employmentStatus: formData.employmentStatus,
        employerINN: formData.employerINN,
        salary: formData.salary,
        position: formData.position,
        workExperienceTotal: formData.workExperienceTotal,
        workExperienceCurrent: formData.workExperienceCurrent,
      },
    }
  );
}

export async function sendDocument(applicationId: number): Promise<void> {
  await axios.post(`${APPLICATION_API_BASE_URL}/document/${applicationId}`);
}

export async function sendInfo(applicationId: number): Promise<void> {
  await axios.post(
    `${APPLICATION_API_BASE_URL}/document/${applicationId}/sign`
  );
}

export async function sendCode(
  applicationId: number,
  code: number
): Promise<void> {
  await axios.post(
    `${APPLICATION_API_BASE_URL}/document/${applicationId}/sign/code`,
    code,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
