import { validation, MIN_AMOUNT, MAX_AMOUNT } from './prescoringValidation';

describe('validation', () => {
  describe('amount', () => {
    it('valid amount', () => {
      expect(validation.amount.validate(20000)).toBe(true);
    });

    it('less than min', () => {
      expect(validation.amount.validate(10000)).toBe(`Min ${MIN_AMOUNT}`);
    });

    it('greater than max', () => {
      expect(validation.amount.validate(700000)).toBe(`Max ${MAX_AMOUNT}`);
    });
  });

  describe('lastName', () => {
    it('valid last name', () => {
      expect(validation.lastName.validate('Ivan')).toBe(true);
    });

    it('empty last name', () => {
      expect(validation.lastName.validate('')).toBe('Enter your last name');
    });

    it('non-latin characters', () => {
      expect(validation.lastName.validate('Иван')).toBe('Only Latin letters');
    });
  });

  describe('email', () => {
    it('valid email', () => {
      expect(validation.email.validate('test@gmail.com')).toBe(true);
    });

    it('no @ symbol', () => {
      expect(validation.email.validate('testgmail.com')).toBe(
        'Email must contain @'
      );
    });
  });

  describe('birthDate', () => {
    it('valid adult date', () => {
      expect(validation.birthDate.validate('2000-01-01')).toBe(true);
    });

    it('under 18 years old', () => {
      const today = new Date();
      const under18 = new Date(
        today.getFullYear() - 10,
        today.getMonth(),
        today.getDate()
      )
        .toISOString()
        .split('T')[0];

      expect(validation.birthDate.validate(under18)).toBe(
        'Must not be under 18 years old'
      );
    });
  });

  describe('passportSeries', () => {
    it('valid series', () => {
      expect(validation.passportSeries.validate('1234')).toBe(true);
    });

    it('invalid series', () => {
      expect(validation.passportSeries.validate('12')).toBe(
        'The series must be 4 digits'
      );
    });
  });

  describe('passportNumber', () => {
    it('valid number', () => {
      expect(validation.passportNumber.validate('123456')).toBe(true);
    });

    it('invalid number', () => {
      expect(validation.passportNumber.validate('123')).toBe(
        'The number must be 6 digits'
      );
    });
  });
});
