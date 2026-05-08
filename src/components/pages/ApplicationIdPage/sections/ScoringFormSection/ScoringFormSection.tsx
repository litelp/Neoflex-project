import { Button } from '@/components/Button/Button';
import styles from './ScoringFormSection.module.scss';
import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import { sendScoringForm } from '@/api/applicationApi/applicationApi';
import type { ScoringFormData } from '@/types/applicationTypes';
import { useParams } from 'react-router-dom';
import { scoringValidation } from '@/utils/scoringValidation';
import { scoringFormOptions } from './mock';

interface ScoringFormProps {
  onSuccess: () => void;
}

export function ScoringFormSection({ onSuccess }: ScoringFormProps) {
  const { applicationId } = useParams<{ applicationId: string }>();

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ScoringFormData>({
    mode: 'onChange',
    defaultValues: {
      gender: '',
      maritalStatus: '',
      dependentAmount: undefined,
      employmentStatus: '',
      position: '',
    },
  });

  const values = useWatch({ control });

  const getInputStatusClass = (name: keyof ScoringFormData) => {
    const value = values[name];

    if (errors[name]) {
      return styles['scoring__field-input--error'];
    }

    if (value && !errors[name]) {
      return styles['scoring__field-input--success'];
    }

    return '';
  };

  const getSelectStatusClass = (name: keyof ScoringFormData) => {
    if (errors[name]) {
      return styles['scoring__field-select--error'];
    }

    return '';
  };

  const onSubmit = async (data: ScoringFormData) => {
    try {
      setSubmitError(null);

      await sendScoringForm(data, Number(applicationId));

      onSuccess();
    } catch {
      setSubmitError('Failed to send scoring form. Please try again.');
    }
  };

  return (
    <section className={styles.scoring}>
      <form
        className={styles['scoring__form']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className={styles['scoring__title']}>
          Continuation of the application
        </h3>
        <span className={styles['scoring__step']}>Step 2 of 5</span>
        <div className={styles['scoring__about-wrapper']}>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              What&apos;s your gender
            </span>
            <select
              {...register('gender', scoringValidation.gender)}
              className={`${styles['scoring__field-select']} ${getSelectStatusClass('gender')}`}
            >
              {scoringFormOptions.gender.map((item) => (
                <option value={item.value} key={item.id} hidden={item.hidden}>{item.text}</option>
              ))}
            </select>
            {errors.gender && (
              <span className={styles['scoring__error']}>
                {errors.gender.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Your marital status
            </span>
            <select
              {...register('maritalStatus', scoringValidation.maritalStatus)}
              className={`${styles['scoring__field-select']} ${getSelectStatusClass('maritalStatus')}`}
            >
              {scoringFormOptions.maritalStatus.map((item) => (
                <option value={item.value} key={item.id} hidden={item.hidden}>{item.text}</option>
              ))}
            </select>
            {errors.maritalStatus && (
              <span className={styles['scoring__error']}>
                {errors.maritalStatus.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Your number of dependents
            </span>
            <select
              {...register('dependentAmount', {
                ...scoringValidation.dependentAmount,
                valueAsNumber: true,
              })}
              className={`${styles['scoring__field-select']} ${getSelectStatusClass('dependentAmount')}`}
            >
              {scoringFormOptions.dependentAmount.map((item) => (
                <option value={item.value} key={item.id} hidden={item.hidden}>{item.text}</option>
              ))}
            </select>
            {errors.dependentAmount && (
              <span className={styles['scoring__error']}>
                {errors.dependentAmount.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Date of issue of the passport
            </span>
            <input
              {...register(
                'passportIssueDate',
                scoringValidation.passportIssueDate
              )}
              className={`${styles['scoring__field-input']} ${getInputStatusClass('passportIssueDate')}`}
              type="date"
            />
            {errors.passportIssueDate && (
              <span className={styles['scoring__error']}>
                {errors.passportIssueDate.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Division code
            </span>
            <input
              {...register(
                'passportIssueBranch',
                scoringValidation.passportIssueBranch
              )}
              className={`${styles['scoring__field-input']} ${getInputStatusClass('passportIssueBranch')}`}
              type="text"
              placeholder="000-000"
              maxLength={7}
              onInput={(event) => {
                const input = event.currentTarget;
                const digits = input.value.replace(/\D/g, '').slice(0, 6);
                input.value =
                  digits.length > 3
                    ? `${digits.slice(0, 3)}-${digits.slice(3)}`
                    : digits;
              }}
            />
            {errors.passportIssueBranch && (
              <span className={styles['scoring__error']}>
                {errors.passportIssueBranch.message}
              </span>
            )}
          </label>
        </div>
        <p className={styles['scoring__subtitle']}>Employment</p>
        <div className={styles['scoring__employment']}>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Your employment status
            </span>
            <select
              {...register(
                'employmentStatus',
                scoringValidation.employmentStatus
              )}
              className={`${styles['scoring__field-select']} ${getSelectStatusClass('employmentStatus')}`}
            >
              {scoringFormOptions.employmentStatus.map((item) => (
                <option value={item.value} key={item.id} hidden={item.hidden}>{item.text}</option>
              ))}
            </select>
            {errors.employmentStatus && (
              <span className={styles['scoring__error']}>
                {errors.employmentStatus.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Your employer INN
            </span>
            <input
              {...register('employerINN', scoringValidation.employerINN)}
              className={`${styles['scoring__field-input']} ${getInputStatusClass('employerINN')}`}
              type="text"
              placeholder="000000000000"
            />
            {errors.employerINN && (
              <span className={styles['scoring__error']}>
                {errors.employerINN.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Your salary
            </span>
            <input
              {...register('salary', {
                ...scoringValidation.salary,
                setValueAs: (value) => Number(value),
              })}
              className={`${styles['scoring__field-input']} ${getInputStatusClass('salary')}`}
              type="text"
              placeholder="For example 100 000"
            />
            {errors.salary && (
              <span className={styles['scoring__error']}>
                {errors.salary.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Your position
            </span>
            <select
              {...register('position', scoringValidation.position)}
              className={`${styles['scoring__field-select']} ${getSelectStatusClass('position')}`}
            >
              {scoringFormOptions.position.map((item) => (
                <option value={item.value} key={item.id} hidden={item.hidden}>{item.text}</option>
              ))}
            </select>
            {errors.position && (
              <span className={styles['scoring__error']}>
                {errors.position.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Your work experience total
            </span>
            <input
              {...register('workExperienceTotal', {
                ...scoringValidation.workExperienceTotal,
                setValueAs: (value) => Number(value),
              })}
              className={`${styles['scoring__field-input']} ${getInputStatusClass('workExperienceTotal')}`}
              type="text"
              placeholder="For example 10"
              maxLength={2}
            />
            {errors.workExperienceTotal && (
              <span className={styles['scoring__error']}>
                {errors.workExperienceTotal.message}
              </span>
            )}
          </label>
          <label className={styles['scoring__field']}>
            <span
              className={`${styles['scoring__field-name']} ${styles['scoring__required']}`}
            >
              Your work experience current
            </span>
            <input
              {...register('workExperienceCurrent', {
                ...scoringValidation.workExperienceCurrent,
                setValueAs: (value) => Number(value),
              })}
              className={`${styles['scoring__field-input']} ${getInputStatusClass('workExperienceCurrent')}`}
              type="text"
              placeholder="For example 2"
              maxLength={2}
            />
            {errors.workExperienceCurrent && (
              <span className={styles['scoring__error']}>
                {errors.workExperienceCurrent.message}
              </span>
            )}
          </label>
        </div>
        <div className={styles['scoring__submit-wrapper']}>
          {submitError && (
            <span className={styles['scoring__submit-error']}>
              {submitError}
            </span>
          )}
          <Button
            className={styles['scoring__button']}
            text='Continue'
            type="submit"
            loading={isSubmitting}
           />
        </div>
      </form>
    </section>
  );
}
