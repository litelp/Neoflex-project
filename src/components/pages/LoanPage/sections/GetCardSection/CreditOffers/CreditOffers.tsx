import styles from './CreditOffers.module.scss';
import offerImage from '@assets/images/offer.png';
import successImg from '@assets/images/success.svg';
import errorImg from '@assets/images/error.svg';
import { Button } from '@/components/Button/Button';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import type { CreditOffer } from '@/types/applicationTypes';
import { applyOffer } from '@/api/applicationApi/applicationApi';
import { useState } from 'react';

export function CreditOffers() {
  const offers = useSelector((state: RootState) => state.application.offers);

  const [error, setError] = useState<string | null>(null);

  const sortedOffers = [...offers].sort((a, b) => b.rate - a.rate);

  const handleSelectOffer = async (offer: CreditOffer) => {
    try {
      setError(null);

      await applyOffer(offer);
    } catch {
      setError('Failed to apply offer');
    }
  };

  return (
    <div className={styles.offers}>
      {sortedOffers.map((offer) => (
        <article
          className={styles['offers__item']}
          key={`${offer.applicationId}_${offer.rate}`}
        >
          <img className={styles['offers__image']} src={offerImage} />
          <div className={styles['offers__terms']}>
            <span className={styles['offers__text']}>
              Requested amount: {offer.requestedAmount} ₽
            </span>
            <span className={styles['offers__text']}>
              Total amount: {offer.totalAmount} ₽
            </span>
            <span className={styles['offers__text']}>
              For {offer.term} months
            </span>
            <span className={styles['offers__text']}>
              Monthly payment: {offer.monthlyPayment} ₽
            </span>
            <span className={styles['offers__text']}>
              Your rate: {offer.rate}%
            </span>
            <span
              className={`${styles['offers__text']} ${styles['offers__with-icon']}`}
            >
              Insurance included{' '}
              <img
                src={offer.isInsuranceEnabled ? successImg : errorImg}
                alt={
                  offer.isInsuranceEnabled
                    ? 'Insurance enabled'
                    : 'Insurance disabled'
                }
              />
            </span>
            <span
              className={`${styles['offers__text']} ${styles['offers__with-icon']}`}
            >
              Salary client{' '}
              <img
                src={offer.isSalaryClient ? successImg : errorImg}
                alt={
                  offer.isSalaryClient
                    ? 'Is salary client'
                    : 'Is not salary client'
                }
              />
            </span>
          </div>
          <Button
            className={styles['offers__button']}
            text="Select"
            onClick={() => handleSelectOffer(offer)}
          />
        </article>
      ))}
      {error && <p className={styles['offers__error']}>{error}</p>}
    </div>
  );
}
