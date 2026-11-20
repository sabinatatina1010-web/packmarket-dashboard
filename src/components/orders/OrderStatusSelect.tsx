import { ORDER_STATUS_LABELS, type OrderStatus } from '../../types/order';
import styles from './OrderStatusSelect.module.css';

const STATUSES = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[];

interface OrderStatusSelectProps {
  status: OrderStatus;
  onChange: (status: OrderStatus) => void;
}

export function OrderStatusSelect({ status, onChange }: OrderStatusSelectProps) {
  return (
    <select
      className={`${styles.select} ${styles[status]}`}
      value={status}
      onChange={(event) => onChange(event.target.value as OrderStatus)}
      aria-label="Изменить статус заявки"
    >
      {STATUSES.map((value) => (
        <option key={value} value={value}>
          {ORDER_STATUS_LABELS[value]}
        </option>
      ))}
    </select>
  );
}
