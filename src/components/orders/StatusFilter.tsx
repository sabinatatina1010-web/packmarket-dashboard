import { ORDER_STATUS_LABELS, type OrderStatus, type StatusFilterValue } from '../../types/order';
import styles from './StatusFilter.module.css';

interface StatusFilterProps {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
}

const OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: 'all', label: 'Все' },
  ...(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((value) => ({
    value,
    label: ORDER_STATUS_LABELS[value],
  })),
];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className={styles.filter} role="group" aria-label="Фильтр по статусу">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.chip} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
