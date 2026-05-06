import styles from './Checkbox.module.scss';

interface CheckboxProps {
  onChange: (checked: boolean) => void;
  text: string;
  className?: string;
}

export function Checkbox({ onChange, text, className }: CheckboxProps) {
  return (
    <label className={`${styles.checkbox} ${className}`.trim()}>
      <input
        className={styles['checkbox__input']}
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={styles['checkbox__field']}></span>
      <span className={styles['checkbox__text']}>{text}</span>
    </label>
  );
}
