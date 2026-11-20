import { ORDER_STATUS_LABELS, type OrderStatus } from '../../types/order';
import styles from './OrderStatusBadge.module.css';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
