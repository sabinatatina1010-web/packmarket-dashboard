export interface KpiMetric {
  id: 'revenue' | 'orders' | 'avg_check' | 'new_leads';
  title: string;
  value: number;
  previousValue: number;
  unit: 'rub' | 'count';
}
