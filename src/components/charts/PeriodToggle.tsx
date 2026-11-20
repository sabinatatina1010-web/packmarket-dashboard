import type { ChartPeriod } from '../../types/revenue';
import styles from './PeriodToggle.module.css';

interface PeriodToggleProps {
  value: ChartPeriod;
  onChange: (period: ChartPeriod) => void;
}

const OPTIONS: { value: ChartPeriod; label: string }[] = [
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
  { value: 'year', label: 'Год' },
];

export function PeriodToggle({ value, onChange }: PeriodToggleProps) {
  return (
    <div className={styles.toggle} role="group" aria-label="Период графика">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.btn} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
