import { useDispatch, useSelector } from 'react-redux';
import { CreditOffers } from './CreditOffers/CreditOffers';
import { CustomizeForm } from './CustomizeForm/CustomizeForm';
import styles from './GetCardSection.module.scss';
import type { RootState } from '@/store/store';
import { PreliminaryDecision } from './PreliminaryDecision/PreliminaryDescision';
import { useEffect } from 'react';
import { getApplication } from '@/api/applicationApi/applicationApi';
import { convertBackToFrontStatus } from '@/utils/applicationStatus';
import { removeOffers, setApplicationStatus } from '@/store/slice';

export function GetCardSection() {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.application.status);
  const applicationId = useSelector(
    (state: RootState) => state.application.applicationId
  );

  useEffect(() => {
    if (!applicationId) return;

    const syncApplicationStatus = async (applicationId: number) => {
      try {
        const application = await getApplication(applicationId);
        const uiStatus = convertBackToFrontStatus(application.status);

        dispatch(setApplicationStatus(uiStatus));
      } catch {
        dispatch(removeOffers());
      }
    };

    syncApplicationStatus(applicationId);
  }, [applicationId, dispatch]);

  return (
    <section className={styles['get-card']}>
      <h3 className={styles['get-card__title']}>How to get a card</h3>
      <ul className={styles['get-card__step-list']}>
        <li className={styles['get-card__list-item']}>
          <div className={styles['get-card__step-wrapper']}>
            <span className={styles['get-card__step']}>1</span>
            <span className={styles['get-card__divider']}></span>
          </div>
          <span className={styles['get-card__text']}>
            Fill out an online application - you do not need to visit the bank
          </span>
        </li>
        <li className={styles['get-card__list-item']}>
          <div className={styles['get-card__step-wrapper']}>
            <span className={styles['get-card__step']}>2</span>
            <span className={styles['get-card__divider']}></span>
          </div>
          <span className={styles['get-card__text']}>
            Find out the bank&apos;s decision immediately after filling out the
            application
          </span>
        </li>
        <li className={styles['get-card__list-item']}>
          <div className={styles['get-card__step-wrapper']}>
            <span className={styles['get-card__step']}>3</span>
            <span className={styles['get-card__divider']}></span>
          </div>
          <span className={styles['get-card__text']}>
            The bank will deliver the card free of charge, wherever convenient,
            to your city
          </span>
        </li>
      </ul>
      {status === 'form' && <CustomizeForm />}
      {status === 'offers' && <CreditOffers />}
      {status === 'sent' && <PreliminaryDecision />}
    </section>
  );
}
