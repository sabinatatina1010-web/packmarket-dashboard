import type { KpiMetric } from '../../types/kpi';
import { calcTrend } from '../../utils/calcTrend';
import { formatMoney } from '../../utils/formatMoney';
import styles from './KpiCard.module.css';

interface KpiCardProps {
  metric: KpiMetric;
}

export function KpiCard({ metric }: KpiCardProps) {
  const trend = calcTrend(metric.value, metric.previousValue);
  const displayValue =
    metric.unit === 'rub'
      ? formatMoney(metric.value)
      : new Intl.NumberFormat('ru-RU').format(metric.value);

  const arrow =
    trend.direction === 'up' ? '▲' : trend.direction === 'down' ? '▼' : '—';

  const trendText =
    trend.percent === null
      ? 'н/д'
      : `${Math.abs(trend.percent).toLocaleString('ru-RU')}%`;

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{metric.title}</h3>
      <p className={styles.value}>{displayValue}</p>
      <span className={`${styles.trend} ${styles[trend.direction]}`}>
        <span aria-hidden="true">{arrow}</span>
        {trendText}
        <span className={styles.hint}>vs прошлый период</span>
      </span>
    </article>
  );
}
