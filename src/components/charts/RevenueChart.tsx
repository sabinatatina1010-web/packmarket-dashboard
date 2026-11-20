import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartPeriod, RevenuePoint } from '../../types/revenue';
import { formatAxisMoney, formatMoney } from '../../utils/formatMoney';
import { PeriodToggle } from './PeriodToggle';
import styles from './RevenueChart.module.css';

interface RevenueChartProps {
  period: ChartPeriod;
  onPeriodChange: (period: ChartPeriod) => void;
  data: RevenuePoint[];
}

interface TooltipPayloadItem {
  value?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const value = payload[0]?.value ?? 0;
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e5e9f0',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 4px 12px rgba(26,35,50,0.08)',
      }}
    >
      <div style={{ color: '#5c6b7a', fontSize: 12, marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 600, color: '#1a2332' }}>{formatMoney(value)}</div>
    </div>
  );
}

export function RevenueChart({ period, onPeriodChange, data }: RevenueChartProps) {
  return (
    <section className={styles.panel} aria-label="Динамика выручки">
      <div className={styles.header}>
        <h2 className={styles.title}>Динамика выручки</h2>
        <PeriodToggle value={period} onChange={onPeriodChange} />
      </div>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e4d7b" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#1e4d7b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eef1f5" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#8a97a6', fontSize: 12 }}
              axisLine={{ stroke: '#e5e9f0' }}
              tickLine={false}
              interval={period === 'month' ? 2 : 0}
            />
            <YAxis
              tickFormatter={formatAxisMoney}
              tick={{ fill: '#8a97a6', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1e4d7b"
              strokeWidth={2}
              fill="url(#revenueFill)"
              animationDuration={350}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
