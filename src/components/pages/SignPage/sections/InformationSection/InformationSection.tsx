import styles from './InformationSection.module.scss';
import docImage from '@assets/images/File_dock.svg';
import { Button } from '@/components/Button/Button';
import { useState } from 'react';
import { sendInfo } from '@/api/applicationApi/applicationApi';
import { useParams } from 'react-router-dom';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { Loader } from '@/components/Loader/Loader';

interface InformationProps {
  onSend: () => void;
}

export function InformationSection({ onSend }: InformationProps) {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [isAgree, setIsAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    console.log('CLICK SEND');
    try {
      setError(null);
      setIsLoading(true);

      await sendInfo(Number(applicationId));
      console.log('SEND INFO POST');

      onSend();
      console.log('ON SEND');
    } catch {
      setError('Failed to send information. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.info}>
      <h3 className={styles['info__title']}>Signing of documents</h3>
      <span className={styles['info__step']}>Step 4 of 5</span>
      <span className={styles['info__text']}>
        Information on interest rates under bank deposit agreements with
        individuals. Center for Corporate Information Disclosure. Information of
        a professional participant in the securities market. Information about
        persons under whose control or significant influence the Partner Banks
        are. By leaving an application, you agree to the processing of personal
        data, obtaining information, obtaining access to a credit history, using
        an analogue of a handwritten signature, an offer, a policy regarding the
        processing of personal data, a form of consent to the processing of
        personal data.
      </span>
      <a
        className={styles['info__doc-link']}
        href="/credit-card-offer.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className={styles['info__download__img']}
          src={docImage}
          alt="Download information on your card"
        />
        <span className={styles['info__download-text']}>
          Information on your card
        </span>
      </a>
      <div className={styles['info__controls']}>
        <Checkbox text="I agree" onChange={setIsAgree} />
        {isLoading ? (
          <Loader className={styles['info__loader']} />
        ) : (
          <Button
            className={styles['info__send-btn']}
            text="Send"
            disabled={!isAgree}
            onClick={onSubmit}
          />
        )}
      </div>
      {error && <p className={styles['info__error']}>{error}</p>}
    </section>
  );
}
