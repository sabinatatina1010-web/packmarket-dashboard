import type { KpiMetric } from '../types/kpi';
import type { ChartPeriod } from '../types/revenue';

/** KPI по периоду; выручка ≈ +14% к прошлому окну */
export const mockKpiByPeriod: Record<ChartPeriod, KpiMetric[]> = {
  week: [
    {
      id: 'revenue',
      title: 'Выручка',
      value: 1394200,
      previousValue: 1222982,
      unit: 'rub',
    },
    {
      id: 'orders',
      title: 'Число заказов',
      value: 42,
      previousValue: 37,
      unit: 'count',
    },
    {
      id: 'avg_check',
      title: 'Средний чек',
      value: 33195,
      previousValue: 29119,
      unit: 'rub',
    },
    {
      id: 'new_leads',
      title: 'Новые лиды',
      value: 8,
      previousValue: 7,
      unit: 'count',
    },
  ],
  month: [
    {
      id: 'revenue',
      title: 'Выручка',
      value: 3174300,
      previousValue: 2784474,
      unit: 'rub',
    },
    {
      id: 'orders',
      title: 'Число заказов',
      value: 148,
      previousValue: 130,
      unit: 'count',
    },
    {
      id: 'avg_check',
      title: 'Средний чек',
      value: 21448,
      previousValue: 18814,
      unit: 'rub',
    },
    {
      id: 'new_leads',
      title: 'Новые лиды',
      value: 23,
      previousValue: 20,
      unit: 'count',
    },
  ],
  year: [
    {
      id: 'revenue',
      title: 'Выручка',
      value: 35489300,
      previousValue: 31130965,
      unit: 'rub',
    },
    {
      id: 'orders',
      title: 'Число заказов',
      value: 1680,
      previousValue: 1474,
      unit: 'count',
    },
    {
      id: 'avg_check',
      title: 'Средний чек',
      value: 21125,
      previousValue: 18531,
      unit: 'rub',
    },
    {
      id: 'new_leads',
      title: 'Новые лиды',
      value: 312,
      previousValue: 274,
      unit: 'count',
    },
  ],
};
