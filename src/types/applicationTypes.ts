export interface ApplicationData {
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthDate: string;
  passportSeries: string;
  passportNumber: string;
}

export interface CreditOffer {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
}

export type ApplicationUIStatus = 'form' | 'offers' | 'sent';

export type ApplicationBackendStatus =
  | 'REQUEST_DENIED'
  | 'PREAPPROVAL'
  | 'APPROVED';

export type PaymentScheduleItem = {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
};

export interface ApplicationResponse {
  id: number;
  status: ApplicationBackendStatus;
  credit: {
    paymentSchedule: PaymentScheduleItem[];
  };
}

export interface ScoringFormData {
  gender: 'MALE' | 'FEMALE' | '';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER' | '';
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus:
    | 'UNEMPLOYED'
    | 'SELF_EMPLOYED'
    | 'EMPLOYED'
    | 'BUSINESS_OWNER'
    | '';
  employerINN: string;
  salary: number;
  position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER' | '';
  workExperienceTotal: number;
  workExperienceCurrent: number;
}
