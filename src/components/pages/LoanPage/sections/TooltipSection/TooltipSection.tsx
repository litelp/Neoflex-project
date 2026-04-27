import { Button } from '@/components/Button/Button';
import styles from './TooltipSection.module.scss';
import creditCard from '@assets/images/loan_card.png';
import { Tooltip } from './Tooltip/Tooltip';

export function TooltipSection() {
  return (
    <section className={styles.tooltip}>
      <h2 className={styles['tooltip__title']}>Platinum digital credit card</h2>
      <p className={styles['tooltip__text']}>
        Our best credit card. Suitable for everyday spending and shopping.
        <br />
        Cash withdrawals and transfers without commission and interest.
      </p>
      <ul className={styles['tooltip__benefits-list']}>
        <li className={styles['tooltip__benefit-item']}>
          <Tooltip text="When repaying the full debt up to 160 days.">
            <p className={styles['tooltip__benefit-title']}>Up to 160 days</p>
            <p className={styles['tooltip__benefit-text']}>No percent</p>
          </Tooltip>
        </li>
        <li className={styles['tooltip__benefit-item']}>
          <Tooltip text="Over the limit willaccrue percent">
            <p className={styles['tooltip__benefit-title']}>Up to 600 000 ₽</p>
            <p className={styles['tooltip__benefit-text']}>Credit limit</p>
          </Tooltip>
        </li>
        <li className={styles['tooltip__benefit-item']}>
          <Tooltip text="Promotion valid until December 31, 2022.">
            <p className={styles['tooltip__benefit-title']}>0 ₽</p>
            <p className={styles['tooltip__benefit-text']}>
              Card service is free
            </p>
          </Tooltip>
        </li>
      </ul>
      <Button className={styles['tooltip__button']} text="Apply for card" />
      <img
        className={styles['tooltip__image']}
        src={creditCard}
        alt="Credit card design"
      />
    </section>
  );
}
