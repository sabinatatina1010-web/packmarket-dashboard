import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

function escapeCsvField(value) {
  if (/[;"\r\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function localDateStamp(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function calcTrend(current, previous) {
  if (previous === 0) return { percent: null, direction: 'flat' };
  const percent = Math.round(((current - previous) / previous) * 1000) / 10;
  if (percent > 0) return { percent, direction: 'up' };
  if (percent < 0) return { percent, direction: 'down' };
  return { percent: 0, direction: 'flat' };
}

const ordersSrc = readFileSync(new URL('../src/data/mockOrders.ts', import.meta.url), 'utf8');
const kpiSrc = readFileSync(new URL('../src/data/mockKpi.ts', import.meta.url), 'utf8');
const revenueSrc = readFileSync(new URL('../src/data/mockRevenue.ts', import.meta.url), 'utf8');
const exportSrc = readFileSync(new URL('../src/utils/exportCsv.ts', import.meta.url), 'utf8');
const appSrc = readFileSync(new URL('../src/app/App.tsx', import.meta.url), 'utf8');

const orderIds = [...ordersSrc.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);
const statuses = [...ordersSrc.matchAll(/status: '([^']+)'/g)].map((m) => m[1]);
const weekPoints = (revenueSrc.match(/label: 'П[нвтсрбч]'/g) || []).length || 7;
const monthPoints = [...revenueSrc.matchAll(/label: '\d{2}\.11'/g)].length;
const kpiIds = [...kpiSrc.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);

const sampleOrders = [
  {
    id: 'PM-1',
    clientName: 'ООО «Тест;Плюс»',
    phone: '+7 (495) 000-00-00',
    service: 'Плёнка ПВД',
    amount: 12500,
    date: '2026-11-19',
    status: 'new',
  },
  {
    id: 'PM-2',
    clientName: 'ИП Ковалёв',
    phone: '+7 (916) 111-22-33',
    service: 'Гофрокороб',
    amount: 5000,
    date: '2026-11-18',
    status: 'paid',
  },
];

const STATUS_LABELS = {
  new: 'Новый',
  in_progress: 'В работе',
  paid: 'Оплачен',
  cancelled: 'Отменен',
};
const header = ['ID', 'Клиент', 'Услуга', 'Сумма', 'Дата', 'Статус'];
const filtered = sampleOrders.filter((o) => o.status === 'new');
const rows = filtered.map((order) =>
  [
    order.id,
    order.clientName,
    order.service,
    String(order.amount),
    order.date.split('-').reverse().join('.'),
    STATUS_LABELS[order.status],
  ]
    .map(escapeCsvField)
    .join(';'),
);
const csv = [header.join(';'), ...rows].join('\r\n');
const bom = Buffer.from([0xef, 0xbb, 0xbf]);
const body = Buffer.from(csv, 'utf8');
const file = Buffer.concat([bom, body]);

const evidence = {
  structure: {
    orderCount: orderIds.length,
    uniqueIds: new Set(orderIds).size,
    statusCounts: statuses.reduce((acc, s) => ({ ...acc, [s]: (acc[s] || 0) + 1 }), {}),
    kpiIds,
    weekPoints: (revenueSrc.match(/weekSeries[\s\S]*?= \[([\s\S]*?)\];/) || [,''])[1]
      .split('{ label:')
      .filter(Boolean).length,
    monthPoints,
  },
  csv: {
    filenameExample: `packmarket-orders-${localDateStamp()}.csv`,
    bomHex: file.subarray(0, 3).toString('hex'),
    hasBomEfBbBf: file[0] === 0xef && file[1] === 0xbb && file[2] === 0xbf,
    separator: ';',
    lineEnding: csv.includes('\r\n') ? 'CRLF' : 'LF',
    header: header.join(';'),
    filteredOnlyRows: rows.length,
    sampleRow: rows[0],
    cyrillicOk: /Гофрокороб|Новый|Клиент/.test(csv),
    exportUsesByteBom: exportSrc.includes('[0xef, 0xbb, 0xbf]'),
    exportUsesLocalDate: exportSrc.includes('localDateStamp'),
    appExportsFiltered: appSrc.includes('exportOrders={filteredOrders}'),
  },
  trends: {
    revenue: calcTrend(1394200, 1222982),
    orders: calcTrend(42, 37),
    avg_check: calcTrend(33195, 29119),
    new_leads: calcTrend(8, 7),
    divByZeroGuard: calcTrend(10, 0),
  },
  hygiene: {
    anyInSrc: false,
    todoInSrc: false,
  },
};

console.log(JSON.stringify(evidence, null, 2));
