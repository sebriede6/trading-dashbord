import { exportTradesAsPDF } from '../utils/exportTradesAsPDF';
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import TradeForm from '../components/TradeForm';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const API_URL = import.meta.env.VITE_API_URL;

function StartkapitalForm({
  inputValue,
  setInputValue,
  onSave,
  mode,
  saving,
  statusMessage
}) {
  const handleSubmit = async e => {
    e.preventDefault();
    await onSave(inputValue);
  };

  const isDark = mode === 'dark';
  const inputClasses = `flex-1 min-w-0 px-3 py-2 rounded border text-base transition-colors ${isDark ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-500 focus:border-blue-400' : 'bg-white text-blue-900 border-blue-300 focus:border-blue-500'}`;
  const buttonClasses = `px-4 py-2 rounded font-semibold transition-colors ${isDark ? 'bg-blue-700 hover:bg-blue-600 text-white disabled:bg-gray-700 disabled:text-gray-400' : 'bg-blue-500 hover:bg-blue-400 text-white disabled:bg-blue-200 disabled:text-blue-500'}`;
  const helperClasses = `text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`;
  const statusClasses = statusMessage && statusMessage.type === 'error'
    ? `text-sm mt-2 font-semibold ${isDark ? 'text-red-300' : 'text-red-600'}`
    : `text-sm mt-2 font-semibold ${isDark ? 'text-green-300' : 'text-green-600'}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className={`text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-200' : 'text-blue-900'}`} htmlFor="startkapital-input">
        Startkapital eingeben
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          id="startkapital-input"
          type="number"
          min="0"
          step="0.01"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className={inputClasses}
          placeholder="z.B. 2500"
          required
        />
        <button
          type="submit"
          className={buttonClasses}
          disabled={saving || inputValue === ''}
        >
          {saving ? 'Speichern...' : 'Speichern'}
        </button>
      </div>
      <p className={helperClasses}>
        Dein Startkapital wird sofort gespeichert und für alle Auswertungen genutzt.
      </p>
      {statusMessage && (
        <p className={statusClasses}>{statusMessage.text}</p>
      )}
    </form>
  );
}

StartkapitalForm.propTypes = {
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setInputValue: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  mode: PropTypes.string,
  saving: PropTypes.bool,
  statusMessage: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf(['success', 'error']).isRequired,
      text: PropTypes.string.isRequired
    }),
    PropTypes.oneOf([null])
  ])
};

function Trading({ token, mode = 'dark', lightBg = 90 }) {
  const [trades, setTrades] = useState([]);
  const [startkapital, setStartkapital] = useState('');
  const [startInputValue, setStartInputValue] = useState('');
  const [savingStartkapital, setSavingStartkapital] = useState(false);
  const [startkapitalStatus, setStartkapitalStatus] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/trades`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => (res.ok ? res.json() : []))
      .then(data => setTrades(Array.isArray(data) ? data : []));

    fetch(`${API_URL}/startkapital`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => (res.ok ? res.json() : { startkapital: 10000 }))
      .then(data => {
        const stored = data.startkapital === '' || data.startkapital === null
          ? 0
          : Number(data.startkapital || 0);
        setStartkapital(stored);
        setStartInputValue(Number.isFinite(stored) ? String(stored) : '');
      });
  }, [token]);

  useEffect(() => {
    if (!startkapitalStatus) return;
    const timeout = setTimeout(() => setStartkapitalStatus(null), 4000);
    return () => clearTimeout(timeout);
  }, [startkapitalStatus]);

  async function handleSaveStartkapital(rawValue) {
    if (!token) {
      setStartkapitalStatus({ type: 'error', text: 'Bitte melde dich an, um das Startkapital zu speichern.' });
      return;
    }

    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue) || numericValue < 0) {
      setStartkapitalStatus({ type: 'error', text: 'Bitte gib eine gültige Zahl größer oder gleich 0 ein.' });
      return;
    }

    try {
      setSavingStartkapital(true);
      setStartkapitalStatus(null);
      const res = await fetch(`${API_URL}/startkapital`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ startkapital: numericValue })
      });

      if (!res.ok) {
        throw new Error('Speichern fehlgeschlagen');
      }

      setStartkapital(numericValue);
      setStartInputValue(String(numericValue));
      setStartkapitalStatus({ type: 'success', text: 'Startkapital gespeichert.' });
    } catch {
      setStartkapitalStatus({ type: 'error', text: 'Speichern fehlgeschlagen. Bitte erneut versuchen.' });
    } finally {
      setSavingStartkapital(false);
    }
  }

  async function handleAddTrade(trade) {
    if (!token) return;
    const res = await fetch(`${API_URL}/trades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(trade)
    });
    if (res.ok) {
      const saved = await res.json();
      setTrades(t => [saved, ...t]);
    }
  }

  const tradesWithPnl = useMemo(() => {
    const sorted = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));
    let balance = 0;
    return sorted.map(trade => {
      const gewinn = parseFloat(trade.gewinn) || 0;
      const verlust = parseFloat(trade.verlust) || 0;
      const pnl = gewinn - verlust;
      balance += pnl;
      return {
        ...trade,
        gewinn: Math.round(gewinn * 100) / 100,
        verlust: Math.round(verlust * 100) / 100,
        pnl: Math.round(pnl * 100) / 100,
        balance: Math.round(balance * 100) / 100
      };
    });
  }, [trades]);

  function exportTradesAsCSV() {
    if (!trades.length) return;
    const header = ['Datum', 'Symbol', 'Typ', 'Gewinn', 'Verlust', 'G/V', 'Kontostand', 'Stimmung', 'Fehler/Tags', 'Reflexion', 'Notiz'];
    const rows = tradesWithPnl.map(trade => [
      trade.date,
      trade.symbol,
      trade.type,
      trade.gewinn,
      trade.verlust,
      trade.pnl,
      trade.balance,
      trade.mood || '',
      Array.isArray(trade.fehler_tags) ? trade.fehler_tags.join(', ') : (trade.fehler_tags || ''),
      trade.reflexion || '',
      trade.note || ''
    ]);
    const csv = [header, ...rows]
      .map(row => row.map(val => '"' + String(val).replace(/"/g, '""') + '"').join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trades.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDeleteTrade(id) {
    if (!token) return;
    const res = await fetch(`${API_URL}/trades/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setTrades(t => t.filter(trade => trade.id !== id));
    }
    setConfirmDeleteId(null);
  }

  async function handleDeleteAll() {
    if (!token) return;
    await Promise.all(trades.map(trade => (
      fetch(`${API_URL}/trades/${trade.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
    )));
    setTrades([]);
    setConfirmDeleteAll(false);
  }

  const chartData = useMemo(() => {
    const points = [{ date: 'Start', balance: Number(startkapital) }];
    tradesWithPnl.forEach(trade => {
      points.push({ date: trade.date, balance: Number(startkapital) + trade.balance });
    });
    return points;
  }, [tradesWithPnl, startkapital]);

  return (
    <div>
      <div className={`mb-6 rounded-xl shadow-lg p-5 ${mode === 'dark' ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-blue-900 border border-blue-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${mode === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>Dein Startkapital</h2>
            <p className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              Passe hier dein verfügbares Kapital an. Die Änderung wirkt sich direkt auf den Kontostand und Statistiken aus.
            </p>
          </div>
          <div className={`text-lg font-semibold ${mode === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
            Aktuell: {Number(startkapital || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
        </div>
        <StartkapitalForm
          inputValue={startInputValue}
          setInputValue={setStartInputValue}
          onSave={handleSaveStartkapital}
          mode={mode}
          saving={savingStartkapital}
          statusMessage={startkapitalStatus}
        />
      </div>

      <TradeForm onAddTrade={handleAddTrade} mode={mode} lightBg={lightBg} />

      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded text-xs font-semibold shadow ${mode === 'dark' ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-red-200 hover:bg-red-300 text-red-900 border border-red-300'}`}
          onClick={() => setConfirmDeleteAll(true)}
          title="Warnung: Diese Aktion löscht unwiderruflich ALLE Trades!"
        >Alle Trades löschen</button>
        {confirmDeleteAll && (
          <span className="ml-2 flex items-center gap-2">
            <span className="text-red-700 font-bold text-xs">Wirklich ALLE löschen?</span>
            <button className="px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white hover:bg-red-800" onClick={handleDeleteAll}>Ja, löschen</button>
            <button className="px-2 py-1 rounded text-xs font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400" onClick={() => setConfirmDeleteAll(false)}>Abbrechen</button>
          </span>
        )}
        <button
          className={`px-3 py-1 rounded text-xs font-semibold shadow ${mode === 'dark' ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-200 hover:bg-blue-300 text-blue-900 border border-blue-300'}`}
          onClick={exportTradesAsCSV}
        >CSV Export</button>
        <button
          className={`px-3 py-1 rounded text-xs font-semibold shadow ${mode === 'dark' ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-green-200 hover:bg-green-300 text-green-900 border border-green-300'}`}
          onClick={() => exportTradesAsPDF(tradesWithPnl, startkapital)}
        >PDF Export</button>
      </div>

      <div className="hidden md:block overflow-x-auto rounded" style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}>
        <table
          className={`w-full text-sm text-left rounded ${mode === 'dark' ? 'text-gray-300 bg-gray-800' : 'text-blue-900'}`}
          style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)`, border: '1px solid #cbd5e1' } : {}}
        >
          <thead className={mode === 'dark' ? 'bg-gray-700 text-gray-200' : ''} style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg + 10}%)`, color: '#1e293b' } : {}}>
            <tr>
              <th className="px-3 py-2">Datum</th>
              <th className="px-3 py-2">Symbol</th>
              <th className="px-3 py-2">Typ</th>
              <th className="px-3 py-2">Kaufkurs</th>
              <th className="px-3 py-2">Verkaufskurs</th>
              <th className="px-3 py-2">Gewinn (€)</th>
              <th className="px-3 py-2">Verlust (€)</th>
              <th className="px-3 py-2">G/V</th>
              <th className="px-3 py-2">Kontostand (€)</th>
              <th className="px-3 py-2">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {tradesWithPnl.slice().reverse().map(trade => {
              const kontostand = Number(startkapital) + trade.balance;
              return (
                <tr key={trade.id} className={mode === 'dark' ? 'border-b border-gray-700 hover:bg-gray-700/30' : 'border-b border-blue-200 hover:bg-blue-50/30'}>
                  <td className="px-3 py-2 whitespace-nowrap">{trade.date}</td>
                  <td className="px-3 py-2">{trade.symbol}</td>
                  <td className="px-3 py-2 capitalize">{trade.type}</td>
                  <td className="px-3 py-2">{trade.entry_price !== undefined && trade.entry_price !== null && trade.entry_price !== '' ? Number(trade.entry_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '–'}</td>
                  <td className="px-3 py-2">{trade.exit_price !== undefined && trade.exit_price !== null && trade.exit_price !== '' ? Number(trade.exit_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '–'}</td>
                  <td className="px-3 py-2 text-green-400">{trade.gewinn ? '+' + trade.gewinn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</td>
                  <td className="px-3 py-2 text-red-400">{trade.verlust ? '-' + trade.verlust.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</td>
                  <td className={trade.pnl >= 0 ? 'px-3 py-2 text-green-400' : 'px-3 py-2 text-red-400'}>
                    {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </td>
                  <td className={`px-3 py-2 font-bold ${mode === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>{kontostand.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</td>
                  <td className="px-3 py-2">
                    <button
                      className={`px-2 py-1 rounded text-xs font-semibold ${mode === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-200 hover:bg-red-300 text-red-900 border border-red-300'}`}
                      onClick={() => setConfirmDeleteId(trade.id)}
                      title="Trade löschen: Diese Aktion kann NICHT rückgängig gemacht werden!"
                    >Löschen</button>
                    {confirmDeleteId === trade.id && (
                      <span className="ml-2 flex items-center gap-2">
                        <span className="text-red-700 font-bold text-xs">Wirklich löschen?</span>
                        <button className="px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white hover:bg-red-800" onClick={() => handleDeleteTrade(trade.id)}>Ja</button>
                        <button className="px-2 py-1 rounded text-xs font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400" onClick={() => setConfirmDeleteId(null)}>Abbrechen</button>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden w-full">
        <div className="space-y-3">
          {tradesWithPnl.slice().reverse().map(trade => {
            const kontostand = Number(startkapital) + trade.balance;
            return (
              <div key={trade.id} className={`rounded-lg p-3 shadow border ${mode === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-blue-200 text-blue-900'}`}>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Datum</span><span>{trade.date}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Symbol</span><span>{trade.symbol}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Typ</span><span className="capitalize">{trade.type}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Einstiegskurs</span><span>{trade.entry_price !== undefined && trade.entry_price !== null && trade.entry_price !== '' ? Number(trade.entry_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '–'}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Schlusskurs</span><span>{trade.exit_price !== undefined && trade.exit_price !== null && trade.exit_price !== '' ? Number(trade.exit_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '–'}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Schlusskurs</span><span>{trade.close_price !== undefined && trade.close_price !== null && trade.close_price !== '' ? Number(trade.close_price).toLocaleString(undefined, { minimumFractionDigits: 5 }) : '–'}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Spread</span><span>{(trade.spread !== undefined && trade.spread !== null && trade.spread !== '') ? `${Number(trade.spread).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })} ${(trade.pip_mode === 'punkte' ? 'Pkt.' : (trade.pip_mode === 'pips' ? 'Pips' : ''))}` : '–'}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Pips</span><span>{(trade.pips !== undefined && trade.pips !== null && trade.pips !== '') ? `${Number(trade.pips).toLocaleString(undefined, { minimumFractionDigits: 2 })} Pips` : '–'}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Punkte</span><span>{(trade.punkte !== undefined && trade.punkte !== null && trade.punkte !== '') ? `${Number(trade.punkte).toLocaleString(undefined, { minimumFractionDigits: 2 })} Punkte` : '–'}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Gewinn (€)</span><span className="text-green-400">{trade.gewinn ? '+' + trade.gewinn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Verlust (€)</span><span className="text-red-400">{trade.verlust ? '-' + trade.verlust.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">G/V</span><span className={trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>{trade.pnl >= 0 ? '+' : ''}{trade.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Kontostand (€)</span><span className={`font-bold ${mode === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>{kontostand.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Stimmung</span><span>{trade.mood || ''}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Fehler/Tags</span><span>{Array.isArray(trade.fehler_tags) ? trade.fehler_tags.join(', ') : (trade.fehler_tags || '')}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Reflexion</span><span>{trade.reflexion || ''}</span></div>
                <div className="flex justify-between border-b border-blue-100 py-1"><span className="font-semibold">Notiz</span><span>{trade.note}</span></div>
                <div className="flex justify-between py-1">
                  <span className="font-semibold">Aktion</span>
                  <button
                    className={`px-2 py-1 rounded text-xs font-semibold ${mode === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-200 hover:bg-red-300 text-red-900 border border-red-300'}`}
                    onClick={() => handleDeleteTrade(trade.id)}
                  >Löschen</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`w-full max-w-xl mt-8 rounded p-4 ${mode === 'dark' ? 'bg-gray-900' : ''}`} style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)`, border: '1px solid #cbd5e1' } : {}}>
        <h2 className={`text-lg font-bold mb-2 ${mode === 'dark' ? 'text-blue-200' : 'text-blue-900'}`}>Kontostand Verlauf</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#444' : '#bbb'} />
            <XAxis dataKey="date" stroke={mode === 'dark' ? '#ccc' : '#1e40af'} />
            <YAxis stroke={mode === 'dark' ? '#ccc' : '#1e40af'} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const point = payload[0].payload;
                return (
                  <div style={{ background: mode === 'dark' ? '#222' : '#fff', borderRadius: 6, boxShadow: '0 2px 8px #0002', padding: 12, border: '1px solid #ddd' }}>
                    <div style={{ color: mode === 'dark' ? '#eee' : '#222', fontSize: 14, marginBottom: 4 }}>
                      {label !== 'Start' && <span>Datum: {label}</span>}
                    </div>
                    <div style={{ color: mode === 'dark' ? '#38bdf8' : '#1e40af', fontWeight: 600, fontSize: 18 }}>
                      Kontostand: {point.balance} €
                    </div>
                  </div>
                );
              }}
            />
            <Line type="monotone" dataKey="balance" stroke="#38bdf8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

Trading.propTypes = {
  token: PropTypes.string,
  mode: PropTypes.string,
  lightBg: PropTypes.number
};

export default Trading;
