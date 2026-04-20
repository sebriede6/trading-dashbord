import React from "react";
import PropTypes from "prop-types";

export default function KIAnalyseBox({ analysis, mode }) {
  if (!analysis) return null;
  const { patterns = [], tips = [], moodStats = {}, fehlerStats = {} } = analysis;
  const moodEntries = Object.entries(moodStats);
  const fehlerEntries = Object.entries(fehlerStats);
  return (
    <div className={`w-full max-w-2xl min-w-85 rounded shadow p-6 mb-8 ${mode === 'dark' ? 'bg-linear-to-br from-gray-900 via-blue-900 to-gray-800 text-blue-100 border border-blue-800' : 'bg-linear-to-br from-blue-50 via-white to-blue-100 text-gray-900 border border-blue-200'}`}
      style={{ boxShadow: mode === 'dark' ? '0 4px 32px #0a254033' : '0 4px 32px #60a5fa22' }}>
      <h2 className="text-xl font-bold mb-4 text-blue-700">KI-Auswertung &amp; Empfehlungen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2 text-blue-600">Erkannte Muster</h3>
          {patterns.length === 0 ? <div className="text-gray-400">Keine besonderen Muster erkannt.</div> :
            <ul className="list-disc ml-5 space-y-1">
              {patterns.map((p, i) => <li key={i} className="text-blue-900 dark:text-blue-200">{p}</li>)}
            </ul>}
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-green-600">Empfehlungen &amp; Tipps</h3>
          {tips.length === 0 ? <div className="text-gray-400">Keine Tipps verfügbar.</div> :
            <ul className="list-disc ml-5 space-y-1">
              {tips.map((t, i) => <li key={i} className="text-green-900 dark:text-green-200">{t}</li>)}
            </ul>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="font-semibold mb-2 text-blue-700">Stimmungsauswertung</h4>
          {moodEntries.length === 0 ? <div className="text-gray-400">Keine Stimmungsdaten.</div> :
            <ul className="list-disc ml-5 space-y-1">
              {moodEntries.map(([mood, count]) => <li key={mood}>{mood}: <span className="font-bold">{count}</span></li>)}
            </ul>}
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-pink-700">Fehler-Tag-Auswertung</h4>
          {fehlerEntries.length === 0 ? <div className="text-gray-400">Keine Fehler-Tags.</div> :
            <ul className="list-disc ml-5 space-y-1">
              {fehlerEntries.map(([tag, count]) => <li key={tag}>{tag}: <span className="font-bold">{count}</span></li>)}
            </ul>}
        </div>
      </div>
    </div>
  );
}

KIAnalyseBox.propTypes = {
  analysis: PropTypes.shape({
    patterns: PropTypes.arrayOf(PropTypes.string),
    tips: PropTypes.arrayOf(PropTypes.string),
    moodStats: PropTypes.object,
    fehlerStats: PropTypes.object,
  }),
  mode: PropTypes.string,
};
