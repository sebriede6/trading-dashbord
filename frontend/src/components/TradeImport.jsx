import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FileSpreadsheet, Upload } from 'lucide-react';
import { parseTradeFile } from '../utils/importTrades';

export default function TradeImport({ onImport, mode = 'dark' }) {
  const [preview, setPreview] = useState([]);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStatus(null);
    setPreview([]);
    try {
      const trades = await parseTradeFile(file);
      setPreview(trades);
      setStatus({ type: 'success', text: `${trades.length} Trades erkannt. Bitte Import starten.` });
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Datei konnte nicht gelesen werden.' });
    }
    event.target.value = '';
  }

  async function handleImport() {
    if (!preview.length) return;
    setLoading(true);
    setStatus(null);
    try {
      const result = await onImport(preview);
      setStatus({ type: result.failed ? 'error' : 'success', text: `${result.imported} von ${preview.length} Trades gespeichert${result.failed ? `, ${result.failed} übersprungen` : ''}.` });
      if (!result.failed) setPreview([]);
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Import fehlgeschlagen.' });
    } finally {
      setLoading(false);
    }
  }

  const isDark = mode === 'dark';
  const panel = isDark ? 'bg-gray-900/80 border-gray-700 text-gray-100' : 'bg-white border-blue-200 text-blue-900';
  const input = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200';
  const statusColor = status?.type === 'error' ? 'text-red-400' : 'text-emerald-400';

  return (
    <section className={`rounded-xl border shadow-lg p-5 mb-8 ${panel}`}>
      <div className="flex items-start gap-3">
        <FileSpreadsheet className="mt-1 text-emerald-400" size={24} aria-hidden="true" />
        <div>
          <h2 className="text-lg font-bold">Trades aus Datei importieren</h2>
          <p className="text-sm opacity-75">CSV, Excel und MQL5-HTML werden als normale Trades gespeichert und in alle Statistiken übernommen.</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <label className={`inline-flex items-center justify-center gap-2 rounded px-4 py-2 border cursor-pointer font-semibold ${input}`}>
          <Upload size={16} aria-hidden="true" /> Datei auswählen
          <input type="file" accept=".csv,.xls,.xlsx,.html,.htm,text/csv,text/html" onChange={handleFileChange} className="sr-only" />
        </label>
        {fileName && <span className="text-sm truncate" title={fileName}>{fileName}</span>}
        <button type="button" onClick={handleImport} disabled={loading || !preview.length} className="rounded px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-white">
          {loading ? 'Importiere...' : `${preview.length ? `${preview.length} Trades importieren` : 'Import starten'}`}
        </button>
      </div>
      {status && <p className={`mt-3 text-sm ${statusColor}`}>{status.text}</p>}
      {preview.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded border border-gray-600">
          <table className="w-full text-xs text-left">
            <thead className={isDark ? 'bg-gray-800' : 'bg-blue-50'}>
              <tr><th className="px-3 py-2">Datum</th><th className="px-3 py-2">Symbol</th><th className="px-3 py-2">Typ</th><th className="px-3 py-2">Einstieg</th><th className="px-3 py-2">Ausstieg</th><th className="px-3 py-2">G/V</th></tr>
            </thead>
            <tbody>
              {preview.slice(0, 5).map((trade, index) => <tr key={`${trade.date}-${trade.symbol}-${index}`} className="border-t border-gray-700"><td className="px-3 py-2">{trade.date}</td><td className="px-3 py-2">{trade.symbol}</td><td className="px-3 py-2 uppercase">{trade.type}</td><td className="px-3 py-2">{trade.entry_price || '-'}</td><td className="px-3 py-2">{trade.exit_price || '-'}</td><td className={trade.gewinn > 0 ? 'px-3 py-2 text-emerald-400' : 'px-3 py-2 text-red-400'}>{(trade.gewinn - trade.verlust).toFixed(2)}</td></tr>)}
            </tbody>
          </table>
          {preview.length > 5 && <p className="px-3 py-2 text-xs opacity-70">Vorschau der ersten 5 von {preview.length} Trades</p>}
        </div>
      )}
    </section>
  );
}

TradeImport.propTypes = {
  onImport: PropTypes.func.isRequired,
  mode: PropTypes.string,
};
