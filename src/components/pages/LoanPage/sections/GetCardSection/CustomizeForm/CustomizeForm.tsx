import { Button } from '@/components/Button/Button';
import styles from './CustomizeForm.module.scss';
import { useState, type CSSProperties } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  MAX_AMOUNT,
  MIN_AMOUNT,
  prescoringValidation,
} from '@/utils/prescoringValidation';
import { sendApplication } from '@/api/applicationApi/applicationApi';
import { clampAmount } from '@/utils/clampAmount';
import { useDispatch } from 'react-redux';
import { setOffers } from '@/store/slice';

interface FormValues {
  term: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  birthDate: string;
  passportSeries: string;
  passportNumber: string;
}

export function CustomizeForm() {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(String(MIN_AMOUNT));
  const [submitError, setSubmitError] = useState<string | null>(null);

  const numericAmount = amount === '' ? MIN_AMOUNT : Number(amount);
  const clampedAmount = clampAmount(numericAmount);
  const progress =
    ((clampedAmount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

  const handleAmountChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;

    setAmount(value);
  };

  const handleAmountBlur = () => {
    if (amount === '') {
      setAmount(String(MIN_AMOUNT));
      return;
    }

    const normalized = clampAmount(Number(amount));
    setAmount(String(normalized));
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isSubmitted, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { term: 6, middleName: '' },
  });

  const values = useWatch({ control });

  const getInputStatusClass = (name: keyof FormValues) => {
    const value = values[name];

    if (!value) return '';

    if (errors[name]) {
      return styles['form__field-input--error'];
    }

    if (touchedFields[name] || isSubmitted) {
      return styles['form__field-input--success'];
    }

    return '';
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitError(null);

      const offers = await sendApplication({
        amount: clampedAmount,
        ...data,
        middleName: data.middleName.trim() || null,
      });

      dispatch(setOffers(offers));
    } catch {
      setSubmitError('Failed to send application. Please try again.');
    }
  };

  return (
    <form id="form" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['form__customize-wrapper']}>
        <div className={styles['form__left-wrapper']}>
          <h3 className={styles['form__title']}>Customize your card</h3>
          <span className={styles['form__step']}>Step 1 of 5</span>
          <div className={styles['form__range-amount']}>
            <span className={styles['form__range-title']}>Select amount</span>
            <span className={styles['form__value']}>{amount}</span>
            <input
              className={styles['form__range-input']}
              style={{ '--progress': `${progress}%` } as CSSProperties}
              type="range"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={500}
              value={clampedAmount}
              onChange={(event) => handleAmountChange(event.target.value)}
            />
            <div className={styles['form__limits']}>
              <span>{MIN_AMOUNT}</span>
              <span>{MAX_AMOUNT}</span>
            </div>
          </div>
        </div>
        <div className={styles['form__right-wrapper']}>
          <p className={styles['form__text-title']}>
            You have chosen the amount
          </p>
          <input
            className={styles['form__text-input']}
            type="text"
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            value={amount}
            onChange={(event) => handleAmountChange(event.target.value)}
            onBlur={handleAmountBlur}
          />
        </div>
      </div>
      <p className={styles['form__info-title']}>Contact Information</p>
      <div className={styles['form__fields']}>
        <label className={styles['form__field-name']}>
          <span
            className={`${styles['form__label-text']} ${styles['form__required']}`}
          >
            Your last name
          </span>
          <input
            {...register('lastName', prescoringValidation.lastName)}
            className={`${styles['form__field-input']} ${getInputStatusClass('lastName')}`}
            type="text"
            placeholder="For Example Doe"
          />
          {errors.lastName && (
            <span className={styles['form__error']}>
              {errors.lastName.message}
            </span>
          )}
        </label>
        <label className={styles['form__field-name']}>
          <span
            className={`${styles['form__label-text']} ${styles['form__required']}`}
          >
            Your first name
          </span>
          <input
            {...register('firstName', prescoringValidation.firstName)}
            className={`${styles['form__field-input']} ${getInputStatusClass('firstName')}`}
            type="text"
            placeholder="For Example Jhon"
          />
          {errors.firstName && (
            <span className={styles['form__error']}>
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className={styles['form__field-name']}>
          <span className={styles['form__label-text']}>Your patronymic</span>
          <input
            {...register('middleName', prescoringValidation.middleName)}
            className={`${styles['form__field-input']} ${getInputStatusClass('middleName')}`}
            type="text"
            placeholder="For Example Victorovich"
          />
        </label>
        <label className={styles['form__field-name']}>
          <span
            className={`${styles['form__label-text']} ${styles['form__required']}`}
          >
            Select term
          </span>
          <select
            {...register('term', { valueAsNumber: true })}
            className={styles['form__field-select']}
          >
            <option value="6">6 month</option>
            <option value="12">12 month</option>
            <option value="18">18 month</option>
            <option value="24">24 month</option>
          </select>
        </label>
        <label className={styles['form__field-name']}>
          <span
            className={`${styles['form__label-text']} ${styles['form__required']}`}
          >
            Your email
          </span>
          <input
            {...register('email', prescoringValidation.email)}
            className={`${styles['form__field-input']} ${getInputStatusClass('email')}`}
            type="text"
            placeholder="test@gmail.com"
          />
          {errors.email && (
            <span className={styles['form__error']}>
              {errors.email.message}
            </span>
          )}
        </label>
        <label className={styles['form__field-name']}>
          <span
            className={`${styles['form__label-text']} ${styles['form__required']}`}
          >
            Your date of birth
          </span>
          <input
            {...register('birthDate', prescoringValidation.birthDate)}
            className={`${styles['form__field-input']} ${getInputStatusClass('birthDate')}`}
            type="date"
            placeholder="Select Date and Time"
          />
          {errors.birthDate && (
            <span className={styles['form__error']}>
              {errors.birthDate.message}
            </span>
          )}
        </label>
        <label className={styles['form__field-name']}>
          <span
            className={`${styles['form__label-text']} ${styles['form__required']}`}
          >
            Your passport series
          </span>
          <input
            {...register('passportSeries', prescoringValidation.passportSeries)}
            className={`${styles['form__field-input']} ${getInputStatusClass('passportSeries')}`}
            type="text"
            placeholder="0000"
            maxLength={4}
          />
          {errors.passportSeries && (
            <span className={styles['form__error']}>
              {errors.passportSeries.message}
            </span>
          )}
        </label>
        <label className={styles['form__field-name']}>
          <span
            className={`${styles['form__label-text']} ${styles['form__required']}`}
          >
            Your passport number
          </span>
          <input
            {...register('passportNumber', prescoringValidation.passportNumber)}
            className={`${styles['form__field-input']} ${getInputStatusClass('passportNumber')}`}
            type="text"
            placeholder="000000"
            maxLength={6}
          />
          {errors.passportNumber && (
            <span className={styles['form__error']}>
              {errors.passportNumber.message}
            </span>
          )}
        </label>
      </div>
      <div className={styles['form__submit-wrapper']}>
        {submitError && (
          <span className={styles['form__submit-error']}>{submitError}</span>
        )}
        <Button
          className={styles['form__button']}
          text="Continue"
          type="submit"
          loading={isSubmitting}
        />
      </div>
    </form>
  );
}
