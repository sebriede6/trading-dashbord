import React, { useEffect, useState } from 'react';
// Keine Recharts mehr, alles als Grid und Listen

const API_URL = import.meta.env.VITE_API_URL;

export default function Stats({ token }) {
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);

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
  }, [token]);

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-2xl min-w-[340px] min-h-[360px] rounded shadow p-6 bg-white text-gray-900">
        <h2 className="text-xl font-bold mb-4">Statistiken</h2>
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

        {/* Psychologie & Fehler als Listen */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2 text-blue-700">Stimmung & Fehler-Statistik</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Stimmungshäufigkeit</h4>
              <ul className="space-y-1">
                {Array.from(new Set(trades.map(t => t.mood).filter(Boolean))).map(mood => (
                  <li key={mood} className="flex justify-between items-center">
                    <span>{mood}</span>
                    <span className="font-bold text-blue-700">{trades.filter(t => t.mood === mood).length}</span>
                  </li>
                ))}
                {trades.filter(t => t.mood).length === 0 && <li className="text-gray-400">Keine Daten</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-pink-600">Fehler/Tags Häufigkeit</h4>
              <ul className="space-y-1">
                {(() => {
                  const fehlerCounts = {};
                  trades.forEach(trade => {
                    if (trade.fehler_tags) {
                      const tags = Array.isArray(trade.fehler_tags) ? trade.fehler_tags : String(trade.fehler_tags).split(',').map(t => t.trim());
                      tags.forEach(tag => {
                        if (tag) fehlerCounts[tag] = (fehlerCounts[tag] || 0) + 1;
                      });
                    }
                  });
                  const keys = Object.keys(fehlerCounts);
                  return keys.length > 0
                    ? keys.map(tag => (
                        <li key={tag} className="flex justify-between items-center">
                          <span>{tag}</span>
                          <span className="font-bold text-pink-700">{fehlerCounts[tag]}</span>
                        </li>
                      ))
                    : <li className="text-gray-400">Keine Daten</li>;
                })()}
              </ul>
            </div>
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
