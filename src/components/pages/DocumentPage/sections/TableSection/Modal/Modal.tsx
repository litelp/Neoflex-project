import { useNavigate } from 'react-router-dom';
import styles from './Modal.module.scss';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';

interface ModalProps {
  onClose: () => void;
}

export function Modal({ onClose }: ModalProps) {
  const navigate = useNavigate();
  const [isDenied, setIsDenied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  function handleOverlayClick() {
    onClose();
  }

  function handleModalClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  function handleDeny() {
    setIsDenied(true);
  }

  function handleGoHome() {
    navigate('/');
  }

  return (
    <div className={styles.modal} onClick={handleOverlayClick}>
      <div className={styles['modal__window']} onClick={handleModalClick}>
        <div className={styles['modal__header']}>
          <h4 className={styles['modal__title']}>Deny application</h4>
          <button
            className={styles['modal__close-btn']}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          ></button>
        </div>
        {!isDenied ? (
          <>
            <span className={styles['modal__text']}>
              You exactly sure, you want to cancel this application?
            </span>
            <div className={styles['modal__buttons']}>
              <Button
                className={styles['modal__deny-btn']}
                text="Deny"
                onClick={handleDeny}
              />
              <Button
                className={styles['modal__cancel-btn']}
                text="Cancel"
                onClick={onClose}
              />
            </div>
          </>
        ) : (
          <>
            <span className={styles['modal__text']}>
              Your application has been deny!
            </span>
            <Button
              className={styles['modal__go-home-btn']}
              text="Go home"
              onClick={handleGoHome}
            />
          </>
        )}
      </div>
    </div>
  );
}
