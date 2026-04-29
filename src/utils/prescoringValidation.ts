export const MIN_AMOUNT = 15000;
export const MAX_AMOUNT = 600000;

const latin = /^[A-Za-z]+$/;

export const validation = {
  amount: {
    valueAsNumber: true,
    validate: (value: number) => {
      if (!value) return 'Field is required';
      if (value < MIN_AMOUNT) return `Min ${MIN_AMOUNT}`;
      if (value > MAX_AMOUNT) return `Max ${MAX_AMOUNT}`;
      return true;
    },
  },

  lastName: {
    setValueAs: (v: string) => v.trim(),
    validate: (value: string) => {
      if (!value) return 'Enter your last name';
      if (!latin.test(value)) return 'Only Latin letters';
      return true;
    },
  },

  firstName: {
    setValueAs: (v: string) => v.trim(),
    validate: (value: string) => {
      if (!value) return 'Enter your first name';
      if (!latin.test(value)) return 'Only Latin letters';
      return true;
    },
  },

  middleName: {
    setValueAs: (v: string) => v.trim(),
    validate: (value: string) => {
      if (!value) return true;
      if (!latin.test(value)) return 'Only Latin letters';
      return true;
    },
  },

  email: {
    setValueAs: (v: string) => v.trim(),
    validate: (value: string) => {
      if (!value) return 'Field is required';
      if (!value.includes('@')) return 'Email must contain @';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Incorrect email address';
      }
      return true;
    },
  },

  birthDate: {
    validate: (value: string) => {
      if (!value) return 'Incorrect date of birth';

      const birth = new Date(value);
      const today = new Date();
      const adult = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );

      if (birth > adult) return 'Must not be under 18 years old';

      return true;
    },
  },

  passportSeries: {
    setValueAs: (v: string) => v.trim(),
    validate: (value: string) => {
      if (!value) return 'Field is required';
      if (!/^\d{4}$/.test(value)) return 'The series must be 4 digits';
      return true;
    },
  },

  passportNumber: {
    setValueAs: (v: string) => v.trim(),
    validate: (value: string) => {
      if (!value) return 'Field is required';
      if (!/^\d{6}$/.test(value)) return 'The number must be 6 digits';
      return true;
    },
  },
};
