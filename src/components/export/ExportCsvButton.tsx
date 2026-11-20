import type { Order } from '../../types/order';
import { downloadOrdersCsv } from '../../utils/exportCsv';
import styles from './ExportCsvButton.module.css';

interface ExportCsvButtonProps {
  orders: Order[];
}

export function ExportCsvButton({ orders }: ExportCsvButtonProps) {
  const disabled = orders.length === 0;

  return (
    <button
      type="button"
      className={styles.btn}
      disabled={disabled}
      title={disabled ? 'Нет данных для экспорта' : 'Скачать CSV для Excel'}
      onClick={() => downloadOrdersCsv(orders)}
    >
      Экспорт в CSV
    </button>
  );
}
