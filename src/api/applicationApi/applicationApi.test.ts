import axios from 'axios';
import {
  applyOffer,
  getApplication,
  sendApplication,
  sendCode,
  sendDocument,
  sendInfo,
  sendScoringForm,
} from './applicationApi';
import type { ScoringFormData } from '@/types/applicationTypes';

vi.mock('axios');

const mockedAxios = vi.mocked(axios);

describe('applicationApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('apply offer', async () => {
    const offer = {
      applicationId: 1,
      requestedAmount: 15000,
      totalAmount: 16000,
      term: 6,
      monthlyPayment: 3000,
      rate: 10,
      isInsuranceEnabled: false,
      isSalaryClient: false,
    };

    mockedAxios.post.mockResolvedValue({});

    await applyOffer(offer);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/application/apply',
      offer
    );
  });

  it('get application data', async () => {
    const responseData = {
      id: 1,
      status: 'CC_APPROVED',
    };

    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await getApplication(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:8080/admin/application/1'
    );
    expect(result).toEqual(responseData);
  });

  it('send scoring form', async () => {
    const formData: ScoringFormData = {
      gender: 'MALE',
      maritalStatus: 'SINGLE',
      dependentAmount: 0,
      passportIssueDate: '2020-01-01',
      passportIssueBranch: '123-456',
      employmentStatus: 'EMPLOYED',
      employerINN: '123456789012',
      salary: 50000,
      position: 'WORKER',
      workExperienceTotal: 24,
      workExperienceCurrent: 12,
    };

    mockedAxios.put.mockResolvedValue({});

    await sendScoringForm(formData, 1);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      'http://localhost:8080/application/registration/1',
      {
        gender: 'MALE',
        maritalStatus: 'SINGLE',
        dependentAmount: 0,
        passportIssueDate: '2020-01-01',
        passportIssueBranch: '123-456',
        employment: {
          employmentStatus: 'EMPLOYED',
          employerINN: '123456789012',
          salary: 50000,
          position: 'WORKER',
          workExperienceTotal: 24,
          workExperienceCurrent: 12,
        },
      }
    );
  });

  it('send document', async () => {
    mockedAxios.post.mockResolvedValue({});

    await sendDocument(1);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/document/1'
    );
  });

  it('send info', async () => {
    mockedAxios.post.mockResolvedValue({});

    await sendInfo(1);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/document/1/sign'
    );
  });

  it('send code', async () => {
    mockedAxios.post.mockResolvedValue({});

    await sendCode(1, 1234);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/document/1/sign/code',
      1234,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });
});
