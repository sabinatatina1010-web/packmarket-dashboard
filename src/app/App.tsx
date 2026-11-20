import { useMemo, useState } from 'react';
import { RevenueChart } from '../components/charts/RevenueChart';
import { KpiGrid } from '../components/kpi/KpiGrid';
import { OrdersTable } from '../components/orders/OrdersTable';
import { mockKpiByPeriod } from '../data/mockKpi';
import { mockOrders } from '../data/mockOrders';
import { monthSeries, weekSeries, yearSeries } from '../data/mockRevenue';
import type { Order, OrderStatus, StatusFilterValue } from '../types/order';
import type { ChartPeriod } from '../types/revenue';
import { DashboardLayout } from './layout/DashboardLayout';

const CHART_BY_PERIOD = {
  week: weekSeries,
  month: monthSeries,
  year: yearSeries,
} as const;

export default function App() {
  const [period, setPeriod] = useState<ChartPeriod>('week');
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const filteredOrders = useMemo(
    () =>
      statusFilter === 'all'
        ? orders
        : orders.filter((order) => order.status === statusFilter),
    [orders, statusFilter],
  );

  const handleOrderStatusChange = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
  };

  return (
    <DashboardLayout exportOrders={filteredOrders}>
      <KpiGrid metrics={mockKpiByPeriod[period]} />
      <RevenueChart
        period={period}
        onPeriodChange={setPeriod}
        data={CHART_BY_PERIOD[period]}
      />
      <OrdersTable
        orders={filteredOrders}
        totalCount={orders.length}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </DashboardLayout>
  );
}
