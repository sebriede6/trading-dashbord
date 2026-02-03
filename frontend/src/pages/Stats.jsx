import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

export default function Stats({ token, mode }) {
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const [startkapital, setStartkapital] = useState('');
  // Ziele/Fortschritt (persistent via API)
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalUnit, setGoalUnit] = useState('€');
  const [loadingGoals, setLoadingGoals] = useState(false);
  const [goalError, setGoalError] = useState('');

  // Drag & Drop Handler für Ziele
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(goals);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setGoals(reordered);
  };

  // Load goals from backend
  useEffect(() => {
    if (!token) return;
    setLoadingGoals(true);
    fetch(`${API_URL}/goals`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGoals(data);
        setLoadingGoals(false);
      })
      .catch(() => {
        setLoadingGoals(false);
        setGoalError('Fehler beim Laden der Ziele.');
      });
  }, [token]);

  // Add goal via API
  const handleAddGoal = async e => {
    e.preventDefault();
    setGoalError('');
    if (!goalInput || !goalTarget) return;
    try {
      const res = await fetch(`${API_URL}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          text: goalInput,
          target: Number(goalTarget),
          unit: goalUnit
        })
      });
      if (!res.ok) throw new Error('Fehler beim Hinzufügen.');
      const newGoal = await res.json();
      setGoals(goals => [...goals, newGoal]);
      setGoalInput('');
      setGoalTarget('');
      setGoalUnit('€');
    } catch {
      setGoalError('Fehler beim Hinzufügen des Ziels.');
    }
  };

  // Delete goal via API
  const handleDeleteGoal = async id => {
    setGoalError('');
    try {
      const res = await fetch(`${API_URL}/goals/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Fehler beim Löschen.');
      setGoals(goals => goals.filter(g => g.id !== id));
    } catch {
      setGoalError('Fehler beim Löschen des Ziels.');
    }
  };

  // Update goal progress (optional, for future inline editing)
  // const handleUpdateGoal = async (id, updates) => { ... };

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
      {/* Ziele & Fortschritt */}
      <div className={`w-full max-w-2xl min-w-85 mb-8 rounded shadow p-6 ${mode === 'dark' ? 'bg-gray-900/90 text-blue-100 border border-blue-800' : 'bg-blue-50 text-gray-900 border border-blue-200'}`}>
        <h2 className="text-lg font-bold mb-2 text-blue-700">Ziele & Fortschritt</h2>
        <form className="flex flex-col md:flex-row gap-2 mb-4" onSubmit={handleAddGoal}>
          <input
            className={`flex-1 rounded border px-2 py-1 ${mode === 'dark' ? 'bg-gray-800 border-gray-600 text-blue-100' : 'bg-white border-blue-200'}`}
            placeholder="Zielbeschreibung (z.B. 1000€ Gewinn in 30 Tagen)"
            value={goalInput}
            onChange={e => setGoalInput(e.target.value)}
            maxLength={60}
          />
          <input
            className={`w-24 rounded border px-2 py-1 ${mode === 'dark' ? 'bg-gray-800 border-gray-600 text-blue-100' : 'bg-white border-blue-200'}`}
            type="number"
            placeholder="Zielwert"
            value={goalTarget}
            onChange={e => setGoalTarget(e.target.value)}
            min={1}
          />
          <select
            className={`w-16 rounded border px-2 py-1 ${mode === 'dark' ? 'bg-gray-800 border-gray-600 text-blue-100' : 'bg-white border-blue-200'}`}
            value={goalUnit}
            onChange={e => setGoalUnit(e.target.value)}
          >
            <option value="€">€</option>
            <option value="Trades">Trades</option>
            <option value="%">%</option>
          </select>
          <button type="submit" className="rounded bg-blue-600 text-white px-3 py-1 font-semibold hover:bg-blue-700">Hinzufügen</button>
        </form>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="goals-droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                {loadingGoals && <div className="text-gray-400">Ziele werden geladen...</div>}
                {goalError && <div className="text-red-500 text-sm">{goalError}</div>}
                {!loadingGoals && goals.length === 0 && <div className="text-gray-400">Noch keine Ziele gesetzt.</div>}
                {goals.map((goal, index) => {
                  let current = goal.unit === '€' ? (stats?.sumPnl || 0) : goal.unit === 'Trades' ? (stats?.total || 0) : 0;
                  let percent = Math.min(100, Math.round((current / goal.target) * 100));
                  return (
                    <Draggable key={goal.id} draggableId={goal.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex flex-col md:flex-row md:items-center gap-2 group ${mode === 'dark' ? 'bg-gray-900/80 text-blue-100 border border-gray-700' : 'bg-white/80'} rounded p-2 shadow-sm border ${snapshot.isDragging ? 'ring-2 ring-blue-400' : ''}`}
                        >
                          <div className="flex-1 font-semibold">{goal.text}</div>
                          <div className="w-40 flex flex-col">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{current.toLocaleString()} {goal.unit}</span>
                              <span>{goal.target.toLocaleString()} {goal.unit}</span>
                            </div>
                            <div className="w-full h-4 bg-gray-200 rounded overflow-hidden border border-blue-200">
                              <div
                                className="h-4 bg-blue-500"
                                style={{ width: percent + '%', transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)' }}
                              />
                            </div>
                            <div className="text-xs text-right mt-1 font-bold" style={{ color: percent >= 100 ? '#22c55e' : '#2563eb' }}>{percent}%</div>
                          </div>
                          <button
                            className="ml-2 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Ziel löschen"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >✕</button>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {/* --- Bisheriger Statistik-Block --- */}
      <div className={`w-full max-w-2xl min-w-85 min-h-90 rounded shadow p-6 ${mode === 'dark' ? 'bg-gray-900 text-blue-100 border border-gray-700' : 'bg-white text-gray-900'}`}>
        <h2 className="text-xl font-bold mb-4">Statistiken</h2>
        {startkapital !== '' && !isNaN(startkapital) && (
          <div className={`mb-4 text-sm ${mode === 'dark' ? 'text-blue-200' : 'text-blue-900'}`}>
            <span className="font-semibold">Startkapital:</span> {Number(startkapital).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
        )}
        {stats && (
          <div className="w-full overflow-x-auto min-w-0">
              <table className="min-w-175 w-auto text-xs md:text-sm rounded overflow-hidden">
                <thead>
                  <tr className={mode === 'dark' ? 'bg-gray-700 text-blue-100' : 'bg-blue-100 text-blue-900'}>
                    <th className="px-2 py-1 text-left">Trades</th>
                    <th className="px-2 py-1 text-left">Gewinn-Trades</th>
                    <th className="px-2 py-1 text-left">Verlust-Trades</th>
                    <th className="px-2 py-1 text-left">Trefferquote</th>
                    <th className="px-2 py-1 text-left">Summe PnL</th>
                    <th className="px-2 py-1 text-left">Ø Gewinn</th>
                    <th className="px-2 py-1 text-left">Ø Verlust</th>
                    <th className="px-2 py-1 text-left">Ø PnL</th>
                    <th className="px-2 py-1 text-left">Summe Pips</th>
                    <th className="px-2 py-1 text-left">Ø Pips</th>
                    <th className="px-2 py-1 text-left">Winrate Pips</th>
                    <th className="px-2 py-1 text-left">Summe Punkte</th>
                    <th className="px-2 py-1 text-left">Ø Punkte</th>
                    <th className="px-2 py-1 text-left">Winrate Punkte</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-center">{stats.total}</td>
                    <td className="px-2 py-1 text-center">{stats.wins}</td>
                    <td className="px-2 py-1 text-center">{stats.losses}</td>
                    <td className="px-2 py-1 text-center">{stats.winRate?.toFixed(1)}%</td>
                    <td className="px-2 py-1 text-center">{stats.sumPnl?.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">{stats.avgGewinn?.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">{stats.avgVerlust?.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">{stats.avgPnl?.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">{stats.sumPips?.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">{stats.avgPips?.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">{stats.winRatePips?.toFixed(1)}%</td>
                    <td className="px-2 py-1 text-center">{stats.sumPunkte?.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">{stats.avgPunkte?.toFixed(2)}</td>
                    <td className="px-2 py-1 text-center">{stats.winRatePunkte?.toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
        )}

        {/* Erweiterte Psychologie- & Fehler-Statistik */}
        <div className={`mt-8 ${mode === 'dark' ? 'bg-gray-800 rounded-lg p-4 border border-gray-700' : ''}`}> 
                    {/* Korrelationstabelle Fehler/Tags & Stimmung zu PnL */}
                    <div className="mt-8">
                      <h4 className="font-semibold mb-2 text-blue-700">Smarte Korrelationen & Auffälligkeiten</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Fehler/Tags Korrelation */}
                        <div>
                          <h5 className="font-semibold mb-1 text-pink-600">Fehler/Tags & Ø PnL</h5>
                          <div className="w-full overflow-x-auto">
                            <table className="min-w-100 w-auto text-xs md:text-sm rounded overflow-hidden">
                            <thead>
                              <tr className={mode === 'dark' ? 'bg-gray-700 text-blue-100' : 'bg-pink-100 text-pink-900'}>
                                <th className="px-2 py-1 text-left">Fehler/Tag</th>
                                <th className="px-2 py-1 text-right">Ø PnL</th>
                                <th className="px-2 py-1 text-right">Trades</th>
                              </tr>
                            </thead>
                            <tbody>
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
                                if (keys.length === 0) return <tr><td colSpan="3" className="text-gray-400 py-2">Keine Daten</td></tr>;
                                return keys.map(tag => {
                                  const avgPnl = fehlerPnls[tag].length ? (fehlerPnls[tag].reduce((a, b) => a + b, 0) / fehlerPnls[tag].length) : 0;
                                  let color = '';
                                  if (avgPnl < -10) color = mode === 'dark' ? 'text-red-400 font-bold' : 'text-red-700 font-bold';
                                  else if (avgPnl > 10) color = mode === 'dark' ? 'text-green-300 font-bold' : 'text-green-700 font-bold';
                                  return (
                                    <tr key={tag} className={mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-pink-50'}>
                                      <td className="px-2 py-1">{tag}</td>
                                      <td className={`px-2 py-1 text-right ${color}`}>{avgPnl.toFixed(2)}</td>
                                      <td className="px-2 py-1 text-right">{fehlerCounts[tag]}</td>
                                    </tr>
                                  );
                                });
                              })()}
                            </tbody>
                            </table>
                          </div>
                          {/* Hinweise */}
                          {(() => {
                            const fehlerPnls = {};
                            tradesWithPnl.forEach(trade => {
                              if (trade.fehler_tags) {
                                const tags = Array.isArray(trade.fehler_tags) ? trade.fehler_tags : String(trade.fehler_tags).split(',').map(t => t.trim());
                                tags.forEach(tag => {
                                  if (tag) {
                                    fehlerPnls[tag] = (fehlerPnls[tag] || []).concat(Number(trade.pnl) || 0);
                                  }
                                });
                              }
                            });
                            const hints = Object.entries(fehlerPnls).filter(([, pnls]) => pnls.length >= 2 && pnls.every(p => p < 0));
                            if (hints.length === 0) return null;
                            return (
                              <div className="mt-2 text-xs text-red-400 font-semibold">
                                {hints.map(([tag]) => (
                                  <div key={tag}>Achtung: Fehler/Tag „{tag}“ führte bisher immer zu Verlusten!</div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                        {/* Stimmung Korrelation */}
                        <div>
                          <h5 className="font-semibold mb-1 text-blue-600">Stimmung & Ø PnL</h5>
                          <div className="w-full overflow-x-auto">
                            <table className="min-w-100 w-auto text-xs md:text-sm rounded overflow-hidden">
                            <thead>
                              <tr className={mode === 'dark' ? 'bg-gray-700 text-blue-100' : 'bg-blue-100 text-blue-900'}>
                                <th className="px-2 py-1 text-left">Stimmung</th>
                                <th className="px-2 py-1 text-right">Ø PnL</th>
                                <th className="px-2 py-1 text-right">Trades</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(() => {
                                const moods = Array.from(new Set(tradesWithPnl.map(t => t.mood).filter(Boolean)));
                                if (moods.length === 0) return <tr><td colSpan="3" className="text-gray-400 py-2">Keine Daten</td></tr>;
                                return moods.map(mood => {
                                  const moodTrades = tradesWithPnl.filter(t => t.mood === mood);
                                  const avgPnl = moodTrades.length ? (moodTrades.reduce((sum, t) => sum + (Number(t.pnl) || 0), 0) / moodTrades.length) : 0;
                                  let color = '';
                                  if (avgPnl < -10) color = mode === 'dark' ? 'text-red-400 font-bold' : 'text-red-700 font-bold';
                                  else if (avgPnl > 10) color = mode === 'dark' ? 'text-green-300 font-bold' : 'text-green-700 font-bold';
                                  return (
                                    <tr key={mood} className={mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-50'}>
                                      <td className="px-2 py-1">{mood}</td>
                                      <td className={`px-2 py-1 text-right ${color}`}>{avgPnl.toFixed(2)}</td>
                                      <td className="px-2 py-1 text-right">{moodTrades.length}</td>
                                    </tr>
                                  );
                                });
                              })()}
                            </tbody>
                            </table>
                          </div>
                          {/* Hinweise */}
                          {(() => {
                            const moods = Array.from(new Set(tradesWithPnl.map(t => t.mood).filter(Boolean)));
                            const hints = moods.filter(mood => {
                              const moodTrades = tradesWithPnl.filter(t => t.mood === mood);
                              return moodTrades.length >= 2 && moodTrades.every(t => t.pnl < 0);
                            });
                            if (hints.length === 0) return null;
                            return (
                              <div className="mt-2 text-xs text-red-400 font-semibold">
                                {hints.map(mood => (
                                  <div key={mood}>Achtung: Stimmung „{mood}“ führte bisher immer zu Verlusten!</div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
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
