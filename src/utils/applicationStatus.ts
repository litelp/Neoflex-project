import type {
  ApplicationBackendStatus,
  ApplicationUIStatus,
} from '@/types/applicationTypes';

export function convertBackToFrontStatus(
  backandStatus: ApplicationBackendStatus
): ApplicationUIStatus {
  if (backandStatus === 'REQUEST_DENIED') return 'form';
  if (backandStatus === 'PREAPPROVAL') return 'offers';
  if (backandStatus === 'APPROVED') return 'sent';

  return 'form';
}
