import type { ReactNode } from 'react';
import { ExportCsvButton } from '../../components/export/ExportCsvButton';
import type { Order } from '../../types/order';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: ReactNode;
  exportOrders: Order[];
}

export function DashboardLayout({ children, exportOrders }: DashboardLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brandBlock}>
          <h1 className={styles.brand}>Packmarket</h1>
          <p className={styles.subtitle}>Аналитика заказов</p>
        </div>
        <ExportCsvButton orders={exportOrders} />
      </header>
      {children}
    </div>
  );
}
