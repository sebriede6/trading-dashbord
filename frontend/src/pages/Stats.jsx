import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Stats({ token }) {
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const [startkapital, setStartkapital] = useState('');

  // Trades mit berechnetem PnL (wie in Trading.jsx)
  const tradesWithPnl = React.useMemo(() => {
    return trades.map(trade => {
      const gewinn = parseFloat(trade.gewinn) || 0;
      const verlust = parseFloat(trade.verlust) || 0;
      const pnl = gewinn - verlust;
      return { ...trade, pnl };
    });
  }, [trades]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/trades`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => Array.isArray(data) && setTrades(data));
    fetch(`${API_URL}/trades/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data));
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

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-2xl min-w-85 min-h-90 rounded shadow p-6 bg-white text-gray-900">
        <h2 className="text-xl font-bold mb-4">Statistiken</h2>
        {startkapital !== '' && !isNaN(startkapital) && (
          <div className="mb-4 text-blue-900 text-sm">
            <span className="font-semibold">Startkapital:</span> {Number(startkapital).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
        )}
        {stats && (
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
              <div className="text-xs text-blue-700">Trades</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
              <div className="text-xs text-green-700">Gewinn-Trades</div>
              <div className="text-2xl font-bold">{stats.wins}</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded p-4 text-center">
              <div className="text-xs text-red-700">Verlust-Trades</div>
              <div className="text-2xl font-bold">{stats.losses}</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-center">
              <div className="text-xs text-yellow-700">Trefferquote</div>
              <div className="text-2xl font-bold">{stats.winRate?.toFixed(1)}%</div>
            </div>
            <div className="bg-blue-100 border border-blue-200 rounded p-4 text-center col-span-2 md:col-span-1">
              <div className="text-xs text-blue-700">Summe PnL</div>
              <div className="text-xl font-bold">{stats.sumPnl?.toFixed(2)}</div>
            </div>
            <div className="bg-green-100 border border-green-200 rounded p-4 text-center col-span-2 md:col-span-1">
              <div className="text-xs text-green-700">Ø Gewinn</div>
              <div className="text-xl font-bold">{stats.avgGewinn?.toFixed(2)}</div>
            </div>
            <div className="bg-red-100 border border-red-200 rounded p-4 text-center col-span-2 md:col-span-1">
              <div className="text-xs text-red-700">Ø Verlust</div>
              <div className="text-xl font-bold">{stats.avgVerlust?.toFixed(2)}</div>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded p-4 text-center col-span-2 md:col-span-1">
              <div className="text-xs text-gray-700">Ø PnL</div>
              <div className="text-xl font-bold">{stats.avgPnl?.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Erweiterte Psychologie- & Fehler-Statistik */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2 text-blue-700">Stimmung & Fehler-Statistik</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stimmungshäufigkeit & Korrelation zu PnL */}
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Stimmungshäufigkeit & Ø PnL</h4>
              <ul className="space-y-1">
                {(() => {
                  const moods = Array.from(new Set(tradesWithPnl.map(t => t.mood).filter(Boolean)));
                  if (moods.length === 0) return <li className="text-gray-400">Keine Daten</li>;
                  return moods.map(mood => {
                    const moodTrades = tradesWithPnl.filter(t => t.mood === mood);
                    const avgPnl = moodTrades.length ? (moodTrades.reduce((sum, t) => sum + (Number(t.pnl) || 0), 0) / moodTrades.length) : 0;
                    return (
                      <li key={mood} className="flex justify-between items-center">
                        <span>{mood}</span>
                        <span className="font-bold text-blue-700">{moodTrades.length} <span className="ml-2 text-xs text-gray-500">Ø PnL: {avgPnl.toFixed(2)}</span></span>
                      </li>
                    );
                  });
                })()}
              </ul>
            </div>
            {/* Fehler/Tags Häufigkeit & Korrelation zu PnL */}
            <div>
              <h4 className="font-semibold mb-2 text-pink-600">Fehler/Tags Häufigkeit & Ø PnL</h4>
              <ul className="space-y-1">
                {(() => {
                  const fehlerCounts = {};
                  const fehlerPnls = {};
                  tradesWithPnl.forEach(trade => {
                    if (trade.fehler_tags) {
                      const tags = Array.isArray(trade.fehler_tags) ? trade.fehler_tags : String(trade.fehler_tags).split(',').map(t => t.trim());
                      tags.forEach(tag => {
                        if (tag) {
                          fehlerCounts[tag] = (fehlerCounts[tag] || 0) + 1;
                          fehlerPnls[tag] = (fehlerPnls[tag] || []).concat(Number(trade.pnl) || 0);
                        }
                      });
                    }
                  });
                  const keys = Object.keys(fehlerCounts);
                  if (keys.length === 0) return <li className="text-gray-400">Keine Daten</li>;
                  return keys.map(tag => {
                    const avgPnl = fehlerPnls[tag].length ? (fehlerPnls[tag].reduce((a, b) => a + b, 0) / fehlerPnls[tag].length) : 0;
                    return (
                      <li key={tag} className="flex justify-between items-center">
                        <span>{tag}</span>
                        <span className="font-bold text-pink-700">{fehlerCounts[tag]} <span className="ml-2 text-xs text-gray-500">Ø PnL: {avgPnl.toFixed(2)}</span></span>
                      </li>
                    );
                  });
                })()}
              </ul>
            </div>
          </div>

          {/* Warnungen bei häufigen Fehlern/Mustern */}
          <div className="mt-8">
            <h4 className="font-semibold mb-2 text-red-600">Warnungen & Auffälligkeiten</h4>
            <ul className="space-y-1">
              {(() => {
                // Warnung, wenn ein Fehler/Tag in >30% der letzten 10 Trades vorkommt
                const recent = tradesWithPnl.slice(0, 10);
                const fehlerCounts = {};
                recent.forEach(trade => {
                  if (trade.fehler_tags) {
                    const tags = Array.isArray(trade.fehler_tags) ? trade.fehler_tags : String(trade.fehler_tags).split(',').map(t => t.trim());
                    tags.forEach(tag => {
                      if (tag) fehlerCounts[tag] = (fehlerCounts[tag] || 0) + 1;
                    });
                  }
                });
                const keys = Object.keys(fehlerCounts);
                const warnings = keys.filter(tag => fehlerCounts[tag] / recent.length > 0.3);
                if (warnings.length === 0) return <li className="text-green-700">Keine auffälligen Fehler in den letzten 10 Trades.</li>;
                return warnings.map(tag => (
                  <li key={tag} className="text-red-700 font-bold">Achtung: Fehler/Tag &quot;{tag}&quot; kam in {fehlerCounts[tag]} von 10 letzten Trades vor!</li>
                ));
              })()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import PropTypes from 'prop-types';

Stats.propTypes = {
  token: PropTypes.string
};
