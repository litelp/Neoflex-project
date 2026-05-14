import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ScoringFormSection } from './ScoringFormSection';
import { sendScoringForm } from '@/api/applicationApi/applicationApi';

vi.mock('@/api/applicationApi/applicationApi', () => ({
  sendScoringForm: vi.fn(),
}));

const mockedSendScoringForm = vi.mocked(sendScoringForm);

function renderComponent(onSuccess = vi.fn()) {
  render(
    <MemoryRouter initialEntries={['/loan/1']}>
      <Routes>
        <Route
          path="/loan/:applicationId"
          element={<ScoringFormSection onSuccess={onSuccess} />}
        />
      </Routes>
    </MemoryRouter>
  );

  return { onSuccess };
}

describe('ScoringFormSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render form title', () => {
    renderComponent();

    expect(
      screen.getByText('Continuation of the application')
    ).toBeInTheDocument();
  });

  it('send scoring form after valid submit', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    mockedSendScoringForm.mockResolvedValue();

    renderComponent(onSuccess);

    await user.selectOptions(screen.getByLabelText(/gender/i), 'MALE');
    await user.selectOptions(
      screen.getByLabelText(/marital status/i),
      'SINGLE'
    );
    await user.selectOptions(screen.getByLabelText(/dependents/i), '0');
    await user.type(screen.getByLabelText(/passport/i), '2020-01-01');
    await user.type(screen.getByLabelText(/division code/i), '123456');
    await user.selectOptions(
      screen.getByLabelText(/employment status/i),
      'EMPLOYED'
    );
    await user.type(screen.getByLabelText(/employer inn/i), '123456789012');
    await user.type(screen.getByLabelText(/salary/i), '50000');
    await user.selectOptions(screen.getByLabelText(/position/i), 'WORKER');
    await user.type(screen.getByLabelText(/experience total/i), '24');
    await user.type(screen.getByLabelText(/experience current/i), '12');
    await user.click(screen.getByRole('button', { name: /continue/i }));
    await waitFor(() => {
      expect(mockedSendScoringForm).toHaveBeenCalledWith(
        {
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
        },
        1
      );
    });

    expect(onSuccess).toHaveBeenCalled();
  });

  it('show validation errors when form is empty', async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(
      await screen.findAllByText(/select one of the options/i)
    ).not.toHaveLength(0);
    expect(mockedSendScoringForm).not.toHaveBeenCalled();
  });
});
