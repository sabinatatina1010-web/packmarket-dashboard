import type { RevenuePoint } from '../types/revenue';

export const weekSeries: RevenuePoint[] = [
  { label: 'Пн', revenue: 210400 },
  { label: 'Вт', revenue: 185200 },
  { label: 'Ср', revenue: 248600 },
  { label: 'Чт', revenue: 196800 },
  { label: 'Пт', revenue: 312500 },
  { label: 'Сб', revenue: 142300 },
  { label: 'Вс', revenue: 98400 },
];

/** 30 точек месяца — без нулевых «дыр» в конце, чтобы график не обрывался */
export const monthSeries: RevenuePoint[] = [
  { label: '01.11', revenue: 52000 },
  { label: '02.11', revenue: 61000 },
  { label: '03.11', revenue: 48000 },
  { label: '04.11', revenue: 73000 },
  { label: '05.11', revenue: 69000 },
  { label: '06.11', revenue: 81000 },
  { label: '07.11', revenue: 45000 },
  { label: '08.11', revenue: 38000 },
  { label: '09.11', revenue: 92000 },
  { label: '10.11', revenue: 87000 },
  { label: '11.11', revenue: 76000 },
  { label: '12.11', revenue: 94000 },
  { label: '13.11', revenue: 101000 },
  { label: '14.11', revenue: 88000 },
  { label: '15.11', revenue: 112000 },
  { label: '16.11', revenue: 134500 },
  { label: '17.11', revenue: 264200 },
  { label: '18.11', revenue: 159800 },
  { label: '19.11', revenue: 215900 },
  { label: '20.11', revenue: 178400 },
  { label: '21.11', revenue: 143200 },
  { label: '22.11', revenue: 67200 },
  { label: '23.11', revenue: 55800 },
  { label: '24.11', revenue: 121600 },
  { label: '25.11', revenue: 136400 },
  { label: '26.11', revenue: 98400 },
  { label: '27.11', revenue: 152300 },
  { label: '28.11', revenue: 167800 },
  { label: '29.11', revenue: 89400 },
  { label: '30.11', revenue: 72400 },
];

/** 12 месяцев текущего года */
export const yearSeries: RevenuePoint[] = [
  { label: 'Янв', revenue: 2480000 },
  { label: 'Фев', revenue: 2315000 },
  { label: 'Мар', revenue: 2754000 },
  { label: 'Апр', revenue: 2890000 },
  { label: 'Май', revenue: 3021000 },
  { label: 'Июн', revenue: 3186000 },
  { label: 'Июл', revenue: 2954000 },
  { label: 'Авг', revenue: 2712000 },
  { label: 'Сен', revenue: 3098000 },
  { label: 'Окт', revenue: 3345000 },
  { label: 'Ноя', revenue: 3174300 },
  { label: 'Дек', revenue: 3560000 },
];
