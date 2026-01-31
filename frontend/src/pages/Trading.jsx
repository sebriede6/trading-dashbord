  import { exportTradesAsPDF } from '../utils/exportTradesAsPDF';

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import TradeForm from '../components/TradeForm';
import TradeStats from '../components/TradeStats';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const API_URL = import.meta.env.VITE_API_URL;


export default function Trading({ token }) {
  const [trades, setTrades] = useState([]);
  const [startkapital, setStartkapital] = useState('');
  const [showStartInput, setShowStartInput] = useState(false);

  // Startkapital vom Server laden
  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/startkapital`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data.startkapital !== 'undefined' && data.startkapital !== null) {
          setStartkapital(data.startkapital);
        }
      });
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/trades`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => Array.isArray(data) && setTrades(data));
  }, [token]);

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

  // Gewinn und Verlust separat aufsummieren
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

  // CSV-Export-Funktion
  function exportTradesAsCSV() {
    if (!trades.length) return;
    const header = ['Datum','Symbol','Typ','Gewinn','Verlust','G/V','Kontostand','Stimmung','Fehler/Tags','Reflexion','Notiz'];
    const rows = tradesWithPnl.map(trade => [
      trade.date,
      trade.symbol,
      trade.type,
      trade.gewinn,
      trade.verlust,
      trade.pnl,
      Number(startkapital) + trade.balance,
      trade.mood || '',
      Array.isArray(trade.fehler_tags) ? trade.fehler_tags.join(', ') : (trade.fehler_tags || ''),
      trade.reflexion || '',
      (trade.note || '').replace(/\n/g, ' ')
    ]);
    const csv = [header, ...rows].map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(';')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trades_export_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  }

  // Chart-Daten extrahieren (mit Startkapital als Startwert)
  const chartData = useMemo(() => {
    const arr = tradesWithPnl.map(t => ({ date: t.date, balance: t.balance }));
    if (startkapital !== '' && !isNaN(startkapital)) {
      return [{ date: 'Start', balance: Number(startkapital) }, ...arr.map(d => ({ ...d, balance: d.balance + Number(startkapital) }))];
    }
    return arr;
  }, [tradesWithPnl, startkapital]);

  // Einzelnen Trade löschen
  async function handleDeleteTrade(id) {
    if (!token) return;
    const res = await fetch(`${API_URL}/trades/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setTrades(t => t.filter(trade => trade.id !== id));
    }
  }

  // Alle Trades löschen
  async function handleDeleteAll() {
    if (!token) return;
    // Hole alle IDs und lösche nacheinander (Backend-API für "alle löschen" fehlt)
    await Promise.all(trades.map(trade => handleDeleteTrade(trade.id)));
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black bg-opacity-90 pt-12">
      <h1 className="text-4xl font-extrabold text-blue-200 mb-6 tracking-tight text-center">Trading Dashboard</h1>
      <p className="text-gray-300 mb-8 text-lg max-w-xl text-center">
        Trage hier deine Trades ein, behalte den Überblick und analysiere deine Performance.
      </p>
      <div className="mb-4 w-full max-w-xl flex flex-col items-center mx-auto">
        {(startkapital === '' || startkapital === null || showStartInput) ? (
          <form
            onSubmit={async e => {
              e.preventDefault();
              if (startkapital !== '' && !isNaN(startkapital)) {
                await fetch(`${API_URL}/startkapital`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify({ startkapital })
                });
                // Nach dem Speichern Wert erneut vom Server laden
                const res = await fetch(`${API_URL}/startkapital`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (typeof data.startkapital !== 'undefined' && data.startkapital !== null) {
                  setStartkapital(data.startkapital);
                }
                setShowStartInput(false);
              }
            }}
            className="flex gap-2 items-center"
          >
            <label className="text-gray-200 font-semibold">Startkapital (€):</label>
            <input
              type="number"
              value={startkapital}
              onChange={e => setStartkapital(e.target.value)}
              className="rounded px-3 py-1 bg-gray-800 text-white w-32"
              required
              step="0.01"
              min="0"
            />
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded">Speichern</button>
          </form>
        ) : (
          <div className="flex gap-4 items-center">
            <span className="text-gray-300">Startkapital: <span className="font-bold text-blue-300">{Number(startkapital).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</span></span>
            <button onClick={() => setShowStartInput(true)} className="text-xs text-blue-400 underline">ändern</button>
          </div>
        )}
      </div>
      <div className="w-full max-w-xl flex flex-col items-center mx-auto mb-6">
        <TradeForm onAddTrade={handleAddTrade} />
      </div>
      <TradeStats trades={tradesWithPnl} />
      <div className="w-full flex flex-col items-center mt-8">
        <div className="flex gap-4 mb-6 justify-center w-full">
          <button
            className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-semibold shadow"
            onClick={exportTradesAsCSV}
            disabled={!trades.length}
          >
            Export als CSV
          </button>
          <button
            className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-semibold shadow"
            onClick={() => exportTradesAsPDF(tradesWithPnl, startkapital)}
            disabled={!trades.length}
          >
            Export als PDF
          </button>
        </div>
        <div className="flex flex-row gap-8 w-full max-w-6xl justify-center items-start mx-auto">
          {chartData.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 min-w-[320px] max-w-100 w-full flex-1">
              <h2 className="text-lg font-bold text-blue-200 mb-2 text-center">Performance-Verlauf</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#aaa" fontSize={12} />
                  <YAxis stroke="#aaa" fontSize={12} label={{ value: 'Kumulierte P&L (€)', angle: -90, position: 'insideLeft', fill: '#aaa', fontSize: 13 }} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div style={{ background: 'white', borderRadius: 6, boxShadow: '0 2px 8px #0002', padding: 12, border: '1px solid #ddd' }}>
                          <div style={{ color: '#222', fontSize: 14, marginBottom: 4 }}>
                            {label !== 'Start' && (
                              <span>Datum: {label}</span>
                            )}
                          </div>
                          <div style={{ color: '#1e40af', fontWeight: 600, fontSize: 18 }}>
                            Kontostand : {d.balance} €
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Line type="monotone" dataKey="balance" stroke="#38bdf8" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {trades.length === 0 ? (
            <div className="text-gray-400 text-center flex-1">Noch keine Trades eingetragen.</div>
          ) : (
            <div className="w-full max-w-3xl flex-1">
              <div className="flex justify-end mb-2">
                <button
                  className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-semibold shadow"
                  onClick={handleDeleteAll}
                >
                  Alle Trades löschen
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left text-gray-300 bg-gray-800 rounded-lg">
                  <thead className="bg-gray-700 text-gray-200">
                    <tr>
                      <th className="px-3 py-2">Datum</th>
                      <th className="px-3 py-2">Symbol</th>
                      <th className="px-3 py-2">Typ</th>
                      <th className="px-3 py-2">Gewinn (€)</th>
                      <th className="px-3 py-2">Verlust (€)</th>
                      <th className="px-3 py-2">G/V</th>
                      <th className="px-3 py-2">Kontostand (€)</th>
                      <th className="px-3 py-2">Stimmung</th>
                      <th className="px-3 py-2">Fehler/Tags</th>
                      <th className="px-3 py-2">Reflexion</th>
                      <th className="px-3 py-2">Notiz</th>
                      <th className="px-3 py-2">Aktion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradesWithPnl.slice().reverse().map((trade) => {
                      // Kontostand berechnen: Startkapital + alle PnL bis zu diesem Trade
                      let kontostand = Number(startkapital) + trade.balance;
                      return (
                        <tr key={trade.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                          <td className="px-3 py-2 whitespace-nowrap">{trade.date}</td>
                          <td className="px-3 py-2">{trade.symbol}</td>
                          <td className="px-3 py-2 capitalize">{trade.type}</td>
                          <td className="px-3 py-2 text-green-400">{trade.gewinn ? '+' + trade.gewinn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : ''}</td>
                          <td className="px-3 py-2 text-red-400">{trade.verlust ? '-' + trade.verlust.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : ''}</td>
                          <td className={trade.pnl >= 0 ? "px-3 py-2 text-green-400" : "px-3 py-2 text-red-400"}>
                            {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
                          </td>
                          <td className="px-3 py-2 font-bold text-blue-300">{kontostand.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</td>
                          <td className="px-3 py-2">{trade.mood || ''}</td>
                          <td className="px-3 py-2">{Array.isArray(trade.fehler_tags) ? trade.fehler_tags.join(', ') : (trade.fehler_tags || '')}</td>
                          <td className="px-3 py-2">{trade.reflexion || ''}</td>
                          <td className="px-3 py-2">{trade.note}</td>
                          <td className="px-3 py-2">
                            <button
                              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold"
                              onClick={() => handleDeleteTrade(trade.id)}
                            >
                              Löschen
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Trading.propTypes = {
  token: PropTypes.string
};
