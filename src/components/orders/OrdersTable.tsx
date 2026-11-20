import type { Order, OrderStatus, StatusFilterValue } from '../../types/order';
import { formatDate } from '../../utils/formatDate';
import { formatMoney } from '../../utils/formatMoney';
import { OrderStatusSelect } from './OrderStatusSelect';
import { StatusFilter } from './StatusFilter';
import styles from './OrdersTable.module.css';

interface OrdersTableProps {
  orders: Order[];
  totalCount: number;
  statusFilter: StatusFilterValue;
  onStatusFilterChange: (value: StatusFilterValue) => void;
  onOrderStatusChange: (orderId: string, status: OrderStatus) => void;
}

export function OrdersTable({
  orders,
  totalCount,
  statusFilter,
  onStatusFilterChange,
  onOrderStatusChange,
}: OrdersTableProps) {
  return (
    <section className={styles.panel} aria-label="Последние заказы">
      <div className={styles.header}>
        <div className={styles.headingRow}>
          <h2 className={styles.title}>Последние заказы</h2>
          <span className={styles.counter}>
            Показано {orders.length} из {totalCount}
          </span>
        </div>
        <StatusFilter value={statusFilter} onChange={onStatusFilterChange} />
      </div>

      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Клиент</th>
              <th>Услуга</th>
              <th>Сумма</th>
              <th>Дата</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={6}>
                  Нет заказов с выбранным статусом
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.id}>{order.id}</td>
                  <td>{order.clientName}</td>
                  <td>{order.service}</td>
                  <td className={styles.amount}>{formatMoney(order.amount)}</td>
                  <td>{formatDate(order.date)}</td>
                  <td>
                    <OrderStatusSelect
                      status={order.status}
                      onChange={(status) => onOrderStatusChange(order.id, status)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
