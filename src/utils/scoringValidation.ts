export const scoringValidation = {
  gender: {
    validate: (value: string) => {
      if (!value) return 'Select one of the options';

      return true;
    },
  },

  maritalStatus: {
    validate: (value: string) => {
      if (!value) return 'Select one of the options';

      return true;
    },
  },

  dependentAmount: {
    setValueAs: (value: string) => (value === '' ? undefined : Number(value)),
    validate: (value: number | undefined) => {
      if (value === undefined || Number.isNaN(value)) {
        return 'Select one of the options';
      }

      return true;
    },
  },

  passportIssueDate: {
    validate: (value: string) => {
      if (!value) return 'Incorrect date of passport issue date';

      const issueDate = new Date(value);
      const today = new Date();

      if (Number.isNaN(issueDate.getTime())) {
        return 'Incorrect date of passport issue date';
      }

      if (issueDate > today) {
        return 'Date cannot be later than today';
      }

      return true;
    },
  },

  passportIssueBranch: {
    setValueAs: (value: string) => value.trim(),
    validate: (value: string) => {
      if (!value) return 'Field is required';

      if (!/^\d{6}$/.test(value)) {
        return 'The series must be 6 digits';
      }

      return true;
    },
  },

  employmentStatus: {
    validate: (value: string) => {
      if (!value) return 'Select one of the options';

      return true;
    },
  },

  employerINN: {
    setValueAs: (value: string) => value.trim(),
    validate: (value: string) => {
      if (!value) return 'Field is required';

      if (!/^\d{12}$/.test(value)) {
        return 'Department code must be 12 digits';
      }

      return true;
    },
  },

  salary: {
    setValueAs: (value: string) => (value === '' ? undefined : Number(value)),
    validate: (value: number | undefined) => {
      if (value === undefined || Number.isNaN(value)) {
        return 'Enter your salary';
      }

      return true;
    },
  },

  position: {
    validate: (value: string) => {
      if (!value) return 'Select one of the options';

      return true;
    },
  },

  workExperienceTotal: {
    setValueAs: (value: string) => (value === '' ? undefined : Number(value)),
    validate: (value: number | undefined) => {
      if (value === undefined || Number.isNaN(value)) {
        return 'Enter your work experience total';
      }

      if (value < 0) return 'Value cannot be negative';
      if (value > 99) return 'Maximum 2 digits';

      return true;
    },
  },

  workExperienceCurrent: {
    setValueAs: (value: string) => (value === '' ? undefined : Number(value)),
    validate: (value: number | undefined) => {
      if (value === undefined || Number.isNaN(value)) {
        return 'Enter your work experience current';
      }

      if (value < 0) return 'Value cannot be negative';
      if (value > 99) return 'Maximum 2 digits';

      return true;
    },
  },
};
