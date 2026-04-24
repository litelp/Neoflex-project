import { NewsCard } from '@/components/NewsCard/NewsCard';
import styles from './NewsSection.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ValidNewsData } from '@/types/newsApiTypes';
import { getValidNews } from '@/api/newsApi/newsApi';
import { Loader } from '@/components/Loader/Loader';

const MINUTES = 15;
const SECONDS = 60;
const MILLISECONDS = 1000;

const MAX_SLIDER_STEP = 500;

function getGapValue(listElement: HTMLUListElement): number {
  const styles = window.getComputedStyle(listElement);
  const gap = styles.gap || '0';

  return Number.parseFloat(gap) || 0;
}

function getSliderValues(
  sliderElement: HTMLDivElement,
  listElement: HTMLUListElement
) {
  const visibleWidth = sliderElement.offsetWidth;
  const fullWidth = listElement.scrollWidth;
  const maxOffset = Math.max(fullWidth - visibleWidth, 0);
  const firstItem = listElement.firstElementChild as HTMLLIElement;

  if (!firstItem) {
    return {
      maxOffset,
      step: MAX_SLIDER_STEP,
    };
  }

  const cardWidth = firstItem.offsetWidth;
  const gap = getGapValue(listElement);
  const step = cardWidth + gap;

  return {
    maxOffset,
    step,
  };
}

export function NewsSection() {
  const [news, setNews] = useState<ValidNewsData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const slider = useRef<HTMLDivElement | null>(null);
  const list = useRef<HTMLUListElement | null>(null);

  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [step, setStep] = useState(MAX_SLIDER_STEP);

  const isPrevDisabled = offset === 0;
  const isNextDisabled = maxOffset - offset < 1;

  const getNews = useCallback(async () => {
    try {
      const data = await getValidNews();

      setNews(data);
      setError(null);
    } catch {
      setError('Error loading news');
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getNews();
  }, [getNews]);

  useEffect(() => {
    const intervalId = window.setInterval(
      getNews,
      MINUTES * SECONDS * MILLISECONDS
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [getNews]);

  function updateSlider() {
    if (!slider.current || !list.current) return;

    const values = getSliderValues(slider.current, list.current);
    const nextMaxOffset = values.maxOffset;
    const nextStep = values.step;

    setMaxOffset(nextMaxOffset);
    setStep(nextStep);
    setOffset((prev) => Math.min(prev, nextMaxOffset));
  }

  useEffect(() => {
    updateSlider();
  }, [news]);

  useEffect(() => {
    window.addEventListener('resize', updateSlider);

    return () => {
      window.removeEventListener('resize', updateSlider);
    };
  }, []);

  const handlePrev = () => {
    setOffset((prev) => Math.max(prev - step, 0));
  };

  const handleNext = () => {
    setOffset((prev) => Math.min(prev + step, maxOffset));
  };

  return (
    <section className={styles.news}>
      <h2 className={styles['news__title']}>
        Current news from the world of finance
      </h2>
      <p className={styles['news__desc']}>
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </p>
      {isLoading ? (
        <Loader label="Loading news" className={styles['news__loader']} />
      ) : error ? (
        <p className={styles['news__error']}>{error}</p>
      ) : news.length > 0 ? (
        <div className={styles['news__slider']} ref={slider}>
          <ul
            className={styles['news__list']}
            ref={list}
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {news.map((item) => (
              <li className={styles['news__item']} key={item.url}>
                <NewsCard
                  urlToImage={item.urlToImage}
                  title={item.title}
                  url={item.url}
                  description={item.description}
                />
              </li>
            ))}
          </ul>
          <div
            className={styles['news__buttons']}
            role="group"
            aria-label="News navigation"
          >
            <button
              disabled={isPrevDisabled}
              className={`${styles['news__slider-btn']} ${styles['news__slider-btn--prev']}`}
              type="button"
              aria-label="Previous news"
              onClick={handlePrev}
            >
              <svg
                className={styles['news__btn-icon']}
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.6211 16.0928H9.4632V23.4842C9.4632 23.6773 9.21671 23.7583 9.10219 23.6028L0.621095 12.0928L9.10219 0.582717C9.21671 0.427291 9.4632 0.508295 9.4632 0.701357V8.09277H24.6211"
                  stroke="#ffffff"
                />
              </svg>
            </button>
            <button
              disabled={isNextDisabled}
              className={`${styles['news__slider-btn']} ${styles['news__slider-btn--next']}`}
              type="button"
              aria-label="Next news"
              onClick={handleNext}
            >
              <svg
                className={styles['news__btn-icon']}
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8.09277H15.1579V0.701357C15.1579 0.508295 15.4044 0.427291 15.5189 0.582717L24 12.0928L15.5189 23.6028C15.4044 23.7583 15.1579 23.6773 15.1579 23.4842V16.0928H0"
                  stroke="#ffffff"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <p className={styles['news__error']}>No news available</p>
      )}
    </section>
  );
}
