function escapeCsvField(value) {
  if (/[;"\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

const header = ['ID', 'Имя клиента', 'Телефон', 'Услуга', 'Сумма', 'Дата', 'Статус'];
const row = [
  'PM-1',
  'ООО «Тест;Плюс»',
  '+7 (495) 000-00-00',
  'Плёнка ПВД',
  '12500',
  '19.11.2026',
  'Новый',
]
  .map(escapeCsvField)
  .join(';');

const csv = `${header.join(';')}\r\n${row}`;
const content = `\uFEFF${csv}`;
const buf = Buffer.from(content, 'utf8');

const hasBom = buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
const escaped = row.includes('"ООО «Тест;Плюс»"');

console.log(JSON.stringify({ hasBom, bom: buf.subarray(0, 3).toString('hex'), escaped, row }));
if (!hasBom || !escaped) process.exit(1);
