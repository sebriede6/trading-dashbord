import { exportTradesAsPDF } from '../utils/exportTradesAsPDF';
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import TradeForm from '../components/TradeForm';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const API_URL = import.meta.env.VITE_API_URL;


// --- StartkapitalForm Komponente ---
function StartkapitalForm({ startkapital, setStartkapital, setShowStartInput, token, mode }) {
  const [inputValue, setInputValue] = React.useState(startkapital === '' || startkapital === null ? '' : String(startkapital));
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        if (inputValue !== '' && !isNaN(inputValue)) {
          console.log('[DEBUG] POST /startkapital', { API_URL, token });
          await fetch(`${API_URL}/startkapital`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ startkapital: inputValue })
          });
          // Nach dem Speichern Wert erneut vom Server laden
          console.log('[DEBUG] GET /startkapital', { API_URL, token });
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
      <label className={`${mode === 'dark' ? 'text-gray-200' : 'text-blue-900'} font-semibold`}>Startkapital (€):</label>
      <input
        type="number"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className={`rounded px-3 py-1 w-32 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`}
        required
        step="0.01"
        min="0"
      />
      <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded">Speichern</button>
    </form>
  );
}

StartkapitalForm.propTypes = {
  startkapital: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  setStartkapital: PropTypes.func.isRequired,
  setShowStartInput: PropTypes.func.isRequired,
  token: PropTypes.string,
  mode: PropTypes.string
};

function Trading({ token, mode = 'dark', lightBg = 90 }) {
  const [trades, setTrades] = useState([]);
  const [startkapital, setStartkapital] = useState('');
  const [showStartInput, setShowStartInput] = useState(false);
  // Removed unused activeTab state

  // Startkapital vom Server laden
  useEffect(() => {
    if (!token) return;
    console.log('[DEBUG] GET /startkapital', { API_URL, token });
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
    console.log('[DEBUG] GET /trades', { API_URL, token });
    fetch(`${API_URL}/trades`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => Array.isArray(data) && setTrades(data));
  }, [token]);

  async function handleAddTrade(trade) {
    if (!token) return;
    console.log('[DEBUG] POST /trades', { API_URL, token, trade });
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
    console.log('[DEBUG] DELETE /trades/' + id, { API_URL, token });
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
    <>
      <div
        className={`relative flex flex-col items-center min-h-screen pt-12 transition-colors duration-300 ${mode === 'dark' ? 'bg-black bg-opacity-90' : ''}`}
        style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
      >
        <h1 className={`text-4xl font-extrabold mb-6 tracking-tight text-center ${mode === 'dark' ? 'text-blue-200' : 'text-blue-900'}`}>Trading Dashboard</h1>
        <p className={`mb-8 text-lg max-w-xl text-center ${mode === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
          Trage hier deine Trades ein, behalte den Überblick und analysiere deine Performance.
        </p>
        <div
          className={`mb-4 w-full max-w-xl flex flex-col items-center mx-auto`}
          style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}
        >
          {(startkapital === '' || startkapital === null || showStartInput) ? (
            <StartkapitalForm
              startkapital={startkapital}
              setStartkapital={setStartkapital}
              setShowStartInput={setShowStartInput}
              token={token}
              mode={mode}
            />
          ) : (
            <div className="flex gap-4 items-center mb-4">
              <span className={`${mode === 'dark' ? 'text-gray-300' : 'text-blue-900'}`}>Startkapital: <span className={`font-bold ${mode === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>{Number(startkapital).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</span></span>
            </div>
          )}
          {/* TradeForm for adding trades */}
          <TradeForm onAddTrade={handleAddTrade} mode={mode} lightBg={lightBg} />

          {/* Aktionen */}
          <div className="flex gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded text-xs font-semibold shadow ${mode === 'dark' ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-red-200 hover:bg-red-300 text-red-900 border border-red-300'}`}
              onClick={handleDeleteAll}
            >Alle Trades löschen</button>
            <button
              className={`px-3 py-1 rounded text-xs font-semibold shadow ${mode === 'dark' ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-200 hover:bg-blue-300 text-blue-900 border border-blue-300'}`}
              onClick={exportTradesAsCSV}
            >CSV Export</button>
            <button
              className={`px-3 py-1 rounded text-xs font-semibold shadow ${mode === 'dark' ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-green-200 hover:bg-green-300 text-green-900 border border-green-300'}`}
              onClick={() => exportTradesAsPDF(tradesWithPnl, startkapital)}
            >PDF Export</button>
          </div>

          {/* Tabelle */}
          <div className="overflow-x-auto rounded" style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)` } : {}}>
            <table className={`w-full text-sm text-left rounded ${mode === 'dark' ? 'text-gray-300 bg-gray-800' : 'text-blue-900'}`}
              style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)`, border: '1px solid #cbd5e1' } : {}}>
              <thead className={mode === 'dark' ? 'bg-gray-700 text-gray-200' : ''} style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg + 10}%)`, color: '#1e293b' } : {}}>
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
                  let kontostand = Number(startkapital) + trade.balance;
                  return (
                    <tr key={trade.id} className={mode === 'dark' ? 'border-b border-gray-700 hover:bg-gray-700/30' : 'border-b border-blue-200 hover:bg-blue-50/30'}>
                      <td className="px-3 py-2 whitespace-nowrap">{trade.date}</td>
                      <td className="px-3 py-2">{trade.symbol}</td>
                      <td className="px-3 py-2 capitalize">{trade.type}</td>
                      <td className="px-3 py-2 text-green-400">{trade.gewinn ? '+' + trade.gewinn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : ''}</td>
                      <td className="px-3 py-2 text-red-400">{trade.verlust ? '-' + trade.verlust.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : ''}</td>
                      <td className={trade.pnl >= 0 ? "px-3 py-2 text-green-400" : "px-3 py-2 text-red-400"}>
                        {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
                      </td>
                      <td className={`px-3 py-2 font-bold ${mode === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>{kontostand.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</td>
                      <td className="px-3 py-2">{trade.mood || ''}</td>
                      <td className="px-3 py-2">{Array.isArray(trade.fehler_tags) ? trade.fehler_tags.join(', ') : (trade.fehler_tags || '')}</td>
                      <td className="px-3 py-2">{trade.reflexion || ''}</td>
                      <td className="px-3 py-2">{trade.note}</td>
                      <td className="px-3 py-2">
                        <button
                          className={`px-2 py-1 rounded text-xs font-semibold ${mode === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-200 hover:bg-red-300 text-red-900 border border-red-300'}`}
                          onClick={() => handleDeleteTrade(trade.id)}
                        >Löschen</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Removed unused activeTab logic and conditional rendering for stats */}

          {/* Kontostand Chart */}
          <div
            className={`w-full max-w-xl mt-8 rounded p-4 ${mode === 'dark' ? 'bg-gray-900' : ''}`}
            style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)`, border: '1px solid #cbd5e1' } : {}}
          >
            <h2 className={`text-lg font-bold mb-2 ${mode === 'dark' ? 'text-blue-200' : 'text-blue-900'}`}>Kontostand Verlauf</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={mode === 'dark' ? '#444' : '#bbb'} />
                <XAxis dataKey="date" stroke={mode === 'dark' ? '#ccc' : '#1e40af'} />
                <YAxis stroke={mode === 'dark' ? '#ccc' : '#1e40af'} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={{ background: mode === 'dark' ? '#222' : '#fff', borderRadius: 6, boxShadow: '0 2px 8px #0002', padding: 12, border: '1px solid #ddd' }}>
                      <div style={{ color: mode === 'dark' ? '#eee' : '#222', fontSize: 14, marginBottom: 4 }}>
                        {label !== 'Start' && (
                          <span>Datum: {label}</span>
                        )}
                      </div>
                      <div style={{ color: mode === 'dark' ? '#38bdf8' : '#1e40af', fontWeight: 600, fontSize: 18 }}>
                        Kontostand : {d.balance} €
                      </div>
                    </div>
                  );
                }} />
                <Line type="monotone" dataKey="balance" stroke="#38bdf8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </>
    );
}

Trading.propTypes = {
  token: PropTypes.string,
  mode: PropTypes.string,
  lightBg: PropTypes.number
};

export default Trading;