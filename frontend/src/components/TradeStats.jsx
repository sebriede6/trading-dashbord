import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';

export default function TradeStats({ trades }) {
  // Stimmungshäufigkeit berechnen
  const moodCounts = {};
  const fehlerCounts = {};
  trades.forEach(trade => {
    if (trade.mood) {
      moodCounts[trade.mood] = (moodCounts[trade.mood] || 0) + 1;
    }
    if (trade.fehler_tags) {
      const tags = Array.isArray(trade.fehler_tags) ? trade.fehler_tags : String(trade.fehler_tags).split(',').map(t => t.trim());
      tags.forEach(tag => {
        if (tag) fehlerCounts[tag] = (fehlerCounts[tag] || 0) + 1;
      });
    }
  });

  // Mood Verlauf (Zeitreihe)
  // Annahme: trades sind nach Datum sortiert, falls nicht, sortieren wir sie
  const moodTimeline = trades
    .filter(trade => trade.mood && trade.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(trade => ({
      date: trade.date,
      mood: trade.mood
    }));

  // Für das Diagramm: Mood als Zahl abbilden
  const moodMap = {};
  let moodIdx = 1;
  Object.keys(moodCounts).forEach(mood => {
    moodMap[mood] = moodIdx++;
  });
  const moodTimelineData = moodTimeline.map(item => ({
    date: item.date,
    moodLabel: item.mood,
    moodValue: moodMap[item.mood] || 0
  }));
  const moodData = Object.entries(moodCounts).map(([mood, count]) => ({ name: mood, count }));
  const fehlerData = Object.entries(fehlerCounts).map(([tag, count]) => ({ name: tag, count }));

  // Farben für PieChart
  const pieColors = [
    '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#facc15', '#38bdf8', '#818cf8', '#fb7185', '#4ade80', '#fcd34d'
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-8 w-full max-w-3xl mx-auto shadow-lg">
      <h2 className="text-2xl font-bold text-blue-200 mb-6 text-center tracking-wide">Psychologie & Fehler-Statistik</h2>

      {/* Mood Verlauf Liniendiagramm */}
      <div className="mb-10">
        <h3 className="text-blue-300 font-semibold mb-4 text-center">Stimmungsverlauf</h3>
        {moodTimelineData.length === 0 ? (
          <div className="text-gray-500 text-center">Keine Daten</div>
        ) : (
          <ResponsiveContainer width="100%" height={220} minWidth={220}>
            <LineChart data={moodTimelineData} margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#aaa" fontSize={13} tick={{ fill: '#aaa' }} />
              <YAxis dataKey="moodValue" stroke="#aaa" fontSize={13} allowDecimals={false}
                domain={[0, moodIdx]}
                tickFormatter={val => {
                  const entry = Object.entries(moodMap).find(entry => entry[1] === val);
                  return entry ? entry[0] : '';
                }}
              />
              <Tooltip formatter={(value, name) => {
                if (name === 'moodValue') {
                  const entry = Object.entries(moodMap).find(entry => entry[1] === value);
                  const mood = entry ? entry[0] : value;
                  return [mood, 'Stimmung'];
                }
                return [value, name];
              }} labelFormatter={label => `Datum: ${label}`} />
              <Legend />
              <Line type="monotone" dataKey="moodValue" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5 }} name="Stimmung" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Fehler/Tags Tortendiagramm */}
      <div className="mb-10 flex flex-col items-center w-full" style={{ minWidth: 0 }}>
        <h3 className="text-pink-300 font-semibold mb-4 text-center">Fehler/Tags Verteilung</h3>
        {fehlerData.length === 0 ? (
          <div className="text-gray-500">Keine Daten</div>
        ) : (
          <div style={{ width: '100%', maxWidth: 600, minWidth: 340, height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fehlerData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={60}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={true}
                  paddingAngle={2}
                >
                  {fehlerData.map((entry, idx) => (
                    <Cell key={`cell-${entry.name}`} fill={pieColors[idx % pieColors.length]} />
                  ))}
                </Pie>
                <style>{`
                  .recharts-pie-label-text {
                    font-size: 15px;
                    fill: #fff;
                    paint-order: stroke fill;
                    stroke: #222;
                    stroke-width: 2px;
                  }
                `}</style>
                <Tooltip formatter={(value, name) => [`${value}x`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-blue-300 font-semibold mb-4 text-center">Stimmungshäufigkeit</h3>
          {moodData.length === 0 ? (
            <div className="text-gray-500">Keine Daten</div>
          ) : (
            <ResponsiveContainer width="100%" height={220} minWidth={220}>
              <BarChart data={moodData} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#aaa" fontSize={13} allowDecimals={false} />
                <YAxis dataKey="name" type="category" stroke="#aaa" fontSize={14} width={90} />
                <Tooltip cursor={{ fill: '#2222' }} />
                <Bar dataKey="count" fill="#38bdf8" radius={[0, 8, 8, 0]}>
                  <LabelList dataKey="count" position="right" fill="#fff" fontSize={14} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-blue-300 font-semibold mb-4 text-center">Fehler/Tags Häufigkeit</h3>
          {fehlerData.length === 0 ? (
            <div className="text-gray-500">Keine Daten</div>
          ) : (
            <ResponsiveContainer width="100%" height={220} minWidth={220}>
              <BarChart data={fehlerData} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#aaa" fontSize={13} allowDecimals={false} />
                <YAxis dataKey="name" type="category" stroke="#aaa" fontSize={14} width={90} />
                <Tooltip cursor={{ fill: '#2222' }} />
                <Bar dataKey="count" fill="#f87171" radius={[0, 8, 8, 0]}>
                  <LabelList dataKey="count" position="right" fill="#fff" fontSize={14} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

TradeStats.propTypes = {
  trades: PropTypes.array.isRequired
};
