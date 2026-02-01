import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

export default function Stats({ token, mode }) {
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
    <div className={`flex flex-col items-center p-8 ${mode === 'dark' ? 'bg-black min-h-screen' : ''}`}>
      <div className={`w-full max-w-2xl min-w-85 min-h-90 rounded shadow p-6 ${mode === 'dark' ? 'bg-gray-900 text-blue-100 border border-gray-700' : 'bg-white text-gray-900'}`}>
        <h2 className="text-xl font-bold mb-4">Statistiken</h2>
        {startkapital !== '' && !isNaN(startkapital) && (
          <div className={`mb-4 text-sm ${mode === 'dark' ? 'text-blue-200' : 'text-blue-900'}`}>
            <span className="font-semibold">Startkapital:</span> {Number(startkapital).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
        )}
        {stats && (
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`rounded p-4 text-center ${mode === 'dark' ? 'bg-[#17223b] border border-blue-900' : 'bg-blue-50 border border-blue-200'}`}>
              <div className={`text-xs ${mode === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Trades</div>
              <div className={`text-2xl font-bold ${mode === 'dark' ? 'text-blue-300' : ''}`}>{stats.total}</div>
            </div>
            <div className={`rounded p-4 text-center ${mode === 'dark' ? 'bg-[#193b2f] border border-green-900' : 'bg-green-50 border border-green-200'}`}>
              <div className={`text-xs ${mode === 'dark' ? 'text-green-400' : 'text-green-700'}`}>Gewinn-Trades</div>
              <div className={`text-2xl font-bold ${mode === 'dark' ? 'text-green-300' : ''}`}>{stats.wins}</div>
            </div>
            <div className={`rounded p-4 text-center ${mode === 'dark' ? 'bg-[#3b1a1a] border border-red-900' : 'bg-red-50 border border-red-200'}`}>
              <div className={`text-xs ${mode === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Verlust-Trades</div>
              <div className={`text-2xl font-bold ${mode === 'dark' ? 'text-red-300' : ''}`}>{stats.losses}</div>
            </div>
            <div className={`rounded p-4 text-center ${mode === 'dark' ? 'bg-[#3b3b1a] border border-yellow-900' : 'bg-yellow-50 border border-yellow-200'}`}>
              <div className={`text-xs ${mode === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>Trefferquote</div>
              <div className={`text-2xl font-bold ${mode === 'dark' ? 'text-yellow-200' : ''}`}>{stats.winRate?.toFixed(1)}%</div>
            </div>
            <div className={`rounded p-4 text-center col-span-2 md:col-span-1 ${mode === 'dark' ? 'bg-[#1a233b] border border-blue-900' : 'bg-blue-100 border border-blue-200'}`}>
              <div className={`text-xs ${mode === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Summe PnL</div>
              <div className={`text-xl font-bold ${mode === 'dark' ? 'text-blue-200' : ''}`}>{stats.sumPnl?.toFixed(2)}</div>
            </div>
            <div className={`rounded p-4 text-center col-span-2 md:col-span-1 ${mode === 'dark' ? 'bg-[#1a3b2a] border border-green-900' : 'bg-green-100 border border-green-200'}`}>
              <div className={`text-xs ${mode === 'dark' ? 'text-green-400' : 'text-green-700'}`}>Ø Gewinn</div>
              <div className={`text-xl font-bold ${mode === 'dark' ? 'text-green-200' : ''}`}>{stats.avgGewinn?.toFixed(2)}</div>
            </div>
            <div className={`rounded p-4 text-center col-span-2 md:col-span-1 ${mode === 'dark' ? 'bg-[#3b1a2a] border border-red-900' : 'bg-red-100 border border-red-200'}`}>
              <div className={`text-xs ${mode === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Ø Verlust</div>
              <div className={`text-xl font-bold ${mode === 'dark' ? 'text-red-200' : ''}`}>{stats.avgVerlust?.toFixed(2)}</div>
            </div>
            <div className={`rounded p-4 text-center col-span-2 md:col-span-1 ${mode === 'dark' ? 'bg-[#23263b] border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
              <div className={`text-xs ${mode === 'dark' ? 'text-blue-200' : 'text-gray-700'}`}>Ø PnL</div>
              <div className={`text-xl font-bold ${mode === 'dark' ? 'text-blue-100' : ''}`}>{stats.avgPnl?.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Erweiterte Psychologie- & Fehler-Statistik */}
        <div className={`mt-8 ${mode === 'dark' ? 'bg-gray-800 rounded-lg p-4 border border-gray-700' : ''}`}> 
          <h3 className="text-lg font-bold mb-2 text-blue-700">Stimmung & Fehler-Statistik</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stimmungshäufigkeit & Korrelation zu PnL */}
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Stimmungshäufigkeit & Ø PnL</h4>
              {/* Tortendiagramm für Stimmungshäufigkeit */}
              {(() => {
                const moods = Array.from(new Set(tradesWithPnl.map(t => t.mood).filter(Boolean)));
                if (moods.length === 0) return <div className="text-gray-400">Keine Daten</div>;
                const moodData = moods.map(mood => {
                  const moodTrades = tradesWithPnl.filter(t => t.mood === mood);
                  const avgPnl = moodTrades.length ? (moodTrades.reduce((sum, t) => sum + (Number(t.pnl) || 0), 0) / moodTrades.length) : 0;
                  return { name: mood, value: moodTrades.length, avgPnl };
                });
                const COLORS = ['#38bdf8', '#fbbf24', '#f87171', '#a78bfa', '#34d399', '#f472b6', '#facc15'];
                return (
                  <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, type: 'spring' }}>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={moodData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                          {moodData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => {
                          const avgPnl = props && props.payload && typeof props.payload.avgPnl === 'number' ? props.payload.avgPnl : 0;
                          return [`${value} Trades, Ø PnL: ${avgPnl.toFixed(2)}`];
                        }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                );
              })()}
            </div>
            {/* Fehler/Tags Häufigkeit als Balkendiagramm */}
            <div>
              <h4 className="font-semibold mb-2 text-pink-600">Fehler/Tags Häufigkeit & Ø PnL</h4>
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
                if (keys.length === 0) return <div className="text-gray-400">Keine Daten</div>;
                const data = keys.map(tag => ({
                  tag,
                  count: fehlerCounts[tag],
                  avgPnl: fehlerPnls[tag].length ? (fehlerPnls[tag].reduce((a, b) => a + b, 0) / fehlerPnls[tag].length) : 0
                }));
                return (
                  <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, type: 'spring' }}>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                        <XAxis type="number" allowDecimals={false} />
                        <YAxis dataKey="tag" type="category" width={90} />
                        <Tooltip formatter={(value, name, props) => {
                          const avgPnl = props && props.payload && typeof props.payload.avgPnl === 'number' ? props.payload.avgPnl : 0;
                          if (name === 'count') return `${value}x`;
                          return `Ø PnL: ${avgPnl.toFixed(2)}`;
                        }} />
                        <Legend />
                        <Bar dataKey="count" fill="#f472b6" name="Häufigkeit" />
                        <Bar dataKey="avgPnl" fill="#38bdf8" name="Ø PnL" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                );
              })()}
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

// Custom prop type for recharts Tooltip formatter props
const tooltipPropsShape = PropTypes.shape({
  payload: PropTypes.shape({
    avgPnl: PropTypes.number,
  }),
});

// Add prop-types validation for payload used in Tooltip formatter
const tooltipFormatterPropTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
  props: PropTypes.shape({
    payload: PropTypes.shape({
      avgPnl: PropTypes.number,
    }),
  }),
};

Stats.propTypes = {
  token: PropTypes.string,
  mode: PropTypes.string, // Added prop-types validation for 'mode'
  // Optionally, you can add this if you use the formatter as a separate component or function
  tooltipProps: tooltipPropsShape,
  // Add formatter prop-types if you use it as a separate function/component
  tooltipFormatterProps: PropTypes.shape(tooltipFormatterPropTypes),
  // Add payload prop validation for Tooltip formatter usage
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      avgPnl: PropTypes.number,
    })
  ),
};
