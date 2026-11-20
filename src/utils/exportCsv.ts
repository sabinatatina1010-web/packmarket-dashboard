import { ORDER_STATUS_LABELS, type Order } from '../types/order';
import { formatDate } from './formatDate';

function escapeCsvField(value: string): string {
  if (/[;"\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function localDateStamp(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function downloadOrdersCsv(orders: Order[], filename?: string): void {
  const header = ['ID', 'Клиент', 'Услуга', 'Сумма', 'Дата', 'Статус'];

  const rows = orders.map((order) =>
    [
      order.id,
      order.clientName,
      order.service,
      String(order.amount),
      formatDate(order.date),
      ORDER_STATUS_LABELS[order.status],
    ]
      .map(escapeCsvField)
      .join(';'),
  );

  const csv = [header.join(';'), ...rows].join('\r\n');
  // UTF-8 BOM as bytes — надёжнее для Excel, чем строка с \uFEFF в Blob
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const body = new TextEncoder().encode(csv);
  const blob = new Blob([bom, body], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const name = filename ?? `packmarket-orders-${localDateStamp()}.csv`;

  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
