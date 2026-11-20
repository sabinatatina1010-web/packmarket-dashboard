export type TrendDirection = 'up' | 'down' | 'flat';

export interface TrendResult {
  percent: number | null;
  direction: TrendDirection;
}

export function calcTrend(current: number, previous: number): TrendResult {
  if (previous === 0) {
    return { percent: null, direction: 'flat' };
  }

  const raw = ((current - previous) / previous) * 100;
  const percent = Math.round(raw * 10) / 10;

  if (percent > 0) return { percent, direction: 'up' };
  if (percent < 0) return { percent, direction: 'down' };
  return { percent: 0, direction: 'flat' };
}
