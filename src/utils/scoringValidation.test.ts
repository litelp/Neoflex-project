import { scoringValidation } from './scoringValidation';

describe('scoringValidation', () => {
  it('validate gender', () => {
    expect(scoringValidation.gender.validate('')).toBe(
      'Select one of the options'
    );
    expect(scoringValidation.gender.validate('MALE')).toBe(true);
  });

  it('validate passport issue date', () => {
    expect(scoringValidation.passportIssueDate.validate('')).toBe(
      'Incorrect date of passport issue date'
    );
    expect(scoringValidation.passportIssueDate.validate('2020-01-01')).toBe(
      true
    );
  });

  it('validate passport issue branch', () => {
    expect(scoringValidation.passportIssueBranch.validate('123')).toBe(
      'Division code must be in format 123-456'
    );
    expect(scoringValidation.passportIssueBranch.validate('123-456')).toBe(
      true
    );
  });

  it('validate employer inn', () => {
    expect(scoringValidation.employerINN.validate('123')).toBe(
      'Department code must be 12 digits'
    );
    expect(scoringValidation.employerINN.validate('123456789012')).toBe(true);
  });

  it('validate work experience total', () => {
    expect(scoringValidation.workExperienceTotal.validate(-1)).toBe(
      'Value cannot be negative'
    );
    expect(scoringValidation.workExperienceTotal.validate(24)).toBe(true);
  });

  it('validate work experience current', () => {
    expect(scoringValidation.workExperienceCurrent.validate(100)).toBe(
      'Maximum 2 digits'
    );
    expect(scoringValidation.workExperienceCurrent.validate(12)).toBe(true);
  });
});
