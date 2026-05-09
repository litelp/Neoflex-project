import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import styles from './EnterCodeSection.module.scss';
import { sendCode } from '@/api/applicationApi/applicationApi';
import { useParams } from 'react-router-dom';
import { Loader } from '@/components/Loader/Loader';

interface EnterCodeSectionProps {
  onSend: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export function EnterCodeSection({ onSend, isLoading, setIsLoading }: EnterCodeSectionProps) {
  const { applicationId } = useParams<{ applicationId: string }>();

  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string[]>(['', '', '', '']);

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const firstEmptyIndex = code.findIndex((digit) => digit === '');

    if (firstEmptyIndex !== -1 && index !== firstEmptyIndex) {
      inputRef.current[firstEmptyIndex]?.focus();
      return;
    }

    const newDigit = value.trim().slice(-1);

    if (newDigit < '0' || newDigit > '9') return;

    const newCode = updateArray(code, index, newDigit);
    setCode(newCode);

    if (newCode.every((digit) => digit !== '')) submitCode(newCode);

    if (index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    } else {
      inputRef.current[index]?.blur();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key !== 'Backspace') return;

    event.preventDefault();

    if (code[index]) {
      setCode(updateArray(code, index, ''));
    } else if (index > 0) {
      setCode(updateArray(code, index - 1, ''));
      inputRef.current[index - 1]?.focus();
    }
  };

  function updateArray(arr: string[], index: number, newValue: string) {
    const copy = [...arr];
    copy[index] = newValue;

    return copy;
  }

  const focusFirstEmpty = () => {
    const firstEmptyIndex = code.findIndex((digit) => digit === '');
    const targetIndex =
      firstEmptyIndex === -1 ? code.length - 1 : firstEmptyIndex;

    inputRef.current[targetIndex]?.focus();
  };

  const submitCode = async (newCode: string[]) => {
    try {
      setError(null);
      setIsLoading(true);
      await sendCode(Number(applicationId), Number(newCode.join('')));
      onSend();
    } catch {
      setError('Invalid confirmation code');
      setCode(['', '', '', '']);
      inputRef.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  let content = (
    <div className={styles['enter__code']}>
    {code.map((digit, index) => (
      <input
        className={styles['enter__value']}
        onClick={focusFirstEmpty}
        placeholder=""
        maxLength={1}
        type="text"
        value={digit}
        onChange={(event) => handleChange(event.target.value, index)}
        ref={(el) => {
          inputRef.current[index] = el;
        }}
        onKeyDown={(event) => handleKeyDown(event, index)}
        key={index}
      />
    ))}
  </div>
  )

  if (isLoading) {
    content = <Loader className={styles['enter__loader']} />;
  }

  return (
    <section className={styles.enter}>
      <h3 className={styles['enter__title']}>Please enter confirmation code</h3>
      {content}
      {error && <p className={styles['enter__error']}>{error}</p>}
    </section>
  );
}
