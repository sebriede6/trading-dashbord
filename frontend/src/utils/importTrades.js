import * as XLSX from 'xlsx';

function normalizeHeader(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function asNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const cleaned = String(value)
    .trim()
    .replace(/\s/g, '')
    .replace(/%$/, '')
    .replace(',', '.');
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function asDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'number') {
    const date = XLSX.SSF.parse_date_code(value);
    if (date) return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
  }
  const text = String(value ?? '').trim();
  if (!text) return null;
  const match = text.match(/(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
  if (match) return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
  const iso = text.match(/(\d{4})[./-](\d{1,2})[./-](\d{1,2})/);
  if (iso) return `${iso[1]}-${iso[2].padStart(2, '0')}-${iso[3].padStart(2, '0')}`;
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

function findColumn(headers, patterns) {
  return headers.findIndex(header => patterns.some(pattern => header.includes(pattern)));
}

function findColumns(headers, patterns) {
  return headers.reduce((matches, header, index) => {
    if (patterns.some(pattern => header.includes(pattern))) matches.push(index);
    return matches;
  }, []);
}

function findHeaderRow(rows) {
  return rows.findIndex(row => {
    const headers = row.map(normalizeHeader);
    const hasSymbol = headers.some(header => header.includes('symbol') || header.includes('instrument'));
    const hasType = headers.some(header => header.includes('type') || header === 'typ' || header.includes('direction'));
    const hasResult = headers.some(header => header.includes('profit') || header.includes('pnl') || header.includes('gewinn') || header.includes('g') || header.includes('price'));
    return hasSymbol && hasType && hasResult;
  });
}

function normalizeType(value) {
  const type = String(value ?? '').trim().toLowerCase();
  if (type.includes('sell') || type.includes('verkauf') || type === 'short') return 'sell';
  if (type.includes('buy') || type.includes('kauf') || type === 'long') return 'buy';
  return null;
}

export function normalizeTradeRows(rows) {
  const headerRowIndex = findHeaderRow(rows);
  if (headerRowIndex < 0) throw new Error('Keine Trade-Tabelle mit Symbol und Typ gefunden.');

  const sectionHeaders = new Set(['orders', 'deals', 'kontostand', 'balance', 'ruckgangkontostand']);
  const nextSectionOffset = rows.slice(headerRowIndex + 1).findIndex(row => sectionHeaders.has(normalizeHeader(row[0])));
  const dataRows = nextSectionOffset >= 0
    ? rows.slice(headerRowIndex + 1, headerRowIndex + 1 + nextSectionOffset)
    : rows.slice(headerRowIndex + 1);

  const headers = rows[headerRowIndex].map(normalizeHeader);
  const dateIndex = findColumn(headers, ['opentime', 'openzeit', 'date', 'datum', 'time', 'zeit']);
  const symbolIndex = findColumn(headers, ['symbol', 'instrument', 'markt']);
  const typeIndex = findColumn(headers, ['type', 'typ', 'direction', 'richtung', 'tradeart']);
  const profitIndex = findColumn(headers, ['profit', 'pnl', 'g/v', 'gewinn', 'result', 'ergebnis']);
  const gainIndex = findColumn(headers, ['gewinn', 'grossprofit']);
  const lossIndex = findColumn(headers, ['verlust', 'grossloss']);
  const priceIndexes = findColumns(headers, ['price', 'preis', 'entryprice', 'exitprice']);
  const entryIndex = findColumn(headers, ['entryprice', 'openprice', 'einstiegskurs', 'einstieg']);
  const exitIndex = findColumn(headers, ['exitprice', 'closeprice', 'schlusskurs', 'ausstieg']);
  const spreadIndex = findColumn(headers, ['spread']);

  if (dateIndex < 0 || symbolIndex < 0 || typeIndex < 0) {
    throw new Error('Die Datei braucht mindestens Datum, Symbol und Typ.');
  }

  return dataRows.reduce((trades, row) => {
    const date = asDate(row[dateIndex]);
    const symbol = String(row[symbolIndex] ?? '').trim();
    const type = normalizeType(row[typeIndex]);
    if (!date || !symbol || !type) return trades;

    const pnlValue = profitIndex >= 0 ? asNumber(row[profitIndex]) : null;
    const gainValue = gainIndex >= 0 ? asNumber(row[gainIndex]) : null;
    const lossValue = lossIndex >= 0 ? asNumber(row[lossIndex]) : null;
    const pnl = pnlValue ?? ((gainValue ?? 0) - (lossValue ?? 0));
    const entry = entryIndex >= 0 ? asNumber(row[entryIndex]) : (priceIndexes.length > 0 ? asNumber(row[priceIndexes[0]]) : null);
    const exit = exitIndex >= 0 ? asNumber(row[exitIndex]) : (priceIndexes.length > 1 ? asNumber(row[priceIndexes[1]]) : null);

    trades.push({
      date,
      symbol,
      type,
      entry_price: entry ?? '',
      exit_price: exit ?? '',
      spread: spreadIndex >= 0 ? (asNumber(row[spreadIndex]) ?? '') : '',
      pip_mode: 'pips',
      gewinn: Math.max(pnl, 0),
      verlust: Math.abs(Math.min(pnl, 0)),
      note: 'Import aus Datei',
      mood: '',
      fehler_tags: '',
      reflexion: '',
    });
    return trades;
  }, []);
}

export async function parseTradeFile(file) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: true, raw: true });
  const rows = workbook.SheetNames.flatMap(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  });
  const trades = normalizeTradeRows(rows);
  if (!trades.length) throw new Error('Es wurden keine gültigen geschlossenen Trades gefunden.');
  return trades;
}
