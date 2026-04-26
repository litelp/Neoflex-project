import { useState } from 'react';
import styles from './FaqTab.module.scss';
import { faqData } from './faqData';

export function FaqTab() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <ul className={styles.faq}>
      {faqData.map((section) => (
        <li className={styles['faq__section']} key={section.id}>
          <h3 className={styles['faq__title']}>{section.title}</h3>
          <ul className={styles['faq__issues-list']}>
            {section.questions.map((issue) => (
              <li className={styles['faq__issue']} key={issue.id}>
                <button
                  className={`${styles['faq__question']} ${activeId === issue.id ? styles['faq__question--open'] : ''}`}
                  onClick={() => handleToggle(issue.id)}
                >
                  {issue.question}
                </button>
                <div
                  className={`${styles['faq__answer-wrapper']} ${activeId === issue.id ? styles['faq__answer-wrapper--open'] : ''}`}
                >
                  <span className={styles['faq__answer']}>{issue.answer}</span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
