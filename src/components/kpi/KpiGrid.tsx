import type { KpiMetric } from '../../types/kpi';
import { KpiCard } from './KpiCard';
import styles from './KpiGrid.module.css';

interface KpiGridProps {
  metrics: KpiMetric[];
}

export function KpiGrid({ metrics }: KpiGridProps) {
  return (
    <section className={styles.grid} aria-label="Ключевые показатели">
      {metrics.map((metric) => (
        <KpiCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}
