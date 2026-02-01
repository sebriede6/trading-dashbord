import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TradeForm({ onAddTrade, mode = 'dark', lightBg = 90 }) {
  const [form, setForm] = useState({
    date: '',
    symbol: '',
    type: 'buy',
    buy_price: '',
    sell_price: '',
    spread: '',
    pip_mode: 'pips', // 'pips' oder 'punkte'
    gewinn: '',
    verlust: '',
    note: '',
    mood: '',
    fehler_tags: [],
    reflexion: ''
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => {
        const tags = new Set(f.fehler_tags);
        if (checked) tags.add(value); else tags.delete(value);
        return { ...f, fehler_tags: Array.from(tags) };
      });
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.date || !form.symbol) return;
    // Datum ins ISO-Format bringen (wichtig für Backend!)
    let isoDate = form.date;
    if (isoDate && isoDate.includes('.')) {
      // z.B. 29.01.2026 → 2026-01-29
      const [d, m, y] = isoDate.split('.');
      isoDate = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    onAddTrade({
      ...form,
      date: isoDate,
      fehler_tags: Array.isArray(form.fehler_tags) ? form.fehler_tags.join(',') : form.fehler_tags,
      mood: form.mood || '',
      reflexion: form.reflexion || ''
    });
    setForm({ date: '', symbol: '', type: 'buy', buy_price: '', sell_price: '', spread: '', gewinn: '', verlust: '', note: '', mood: '', fehler_tags: [], reflexion: '' });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded p-6 mb-8 w-full max-w-xl mx-auto shadow-lg flex flex-col gap-4 ${mode === 'dark' ? 'bg-gray-900 bg-opacity-80' : ''}`}
      style={mode === 'light' ? { backgroundColor: `hsl(220, 16%, ${lightBg}%)`, border: '1px solid #cbd5e1' } : {}}
    >
      <div className="grid grid-cols-3 gap-4">
        <input type="date" name="date" value={form.date} onChange={handleChange} className={`w-full rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} required />
        <input type="text" name="symbol" value={form.symbol} onChange={handleChange} placeholder="Symbol (z.B. TSLA)" className={`w-full rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} required />
        <select name="type" value={form.type} onChange={handleChange} className={`w-full rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-4 items-end">
        <input type="number" name="buy_price" value={form.buy_price} onChange={handleChange} placeholder="Kaufkurs (z.B. 1.08500)" className={`w-full rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} step="0.00001" min="0" />
        <input type="number" name="sell_price" value={form.sell_price} onChange={handleChange} placeholder="Verkaufskurs (z.B. 1.08700)" className={`w-full rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} step="0.00001" min="0" />
        <input type="number" name="spread" value={form.spread} onChange={handleChange} placeholder={form.pip_mode === 'pips' ? 'Spread (in Pips, optional)' : 'Spread (in Punkten, optional)'} className={`w-full rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} step="0.00001" min="0" />
        <div>
          <label className={`block text-xs mb-1 ${mode === 'dark' ? 'text-gray-300' : 'text-blue-900'}`}>Auswertung</label>
          <select name="pip_mode" value={form.pip_mode} onChange={handleChange} className={`w-full rounded px-2 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`}>
            <option value="pips">Pips (Forex, z.B. EUR/USD)</option>
            <option value="punkte">Punkte (CFD, DAX, etc.)</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4">
        <input type="number" name="gewinn" value={form.gewinn} onChange={handleChange} placeholder="Gewinn (€)" className={`flex-1 rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} step="0.01" />
        <input type="number" name="verlust" value={form.verlust} onChange={handleChange} placeholder="Verlust (€)" className={`flex-1 rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} step="0.01" />
      </div>
      <div className="flex gap-4">
        <select name="mood" value={form.mood} onChange={handleChange} className={`flex-1 rounded px-3 py-2 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`}>
          <option value="">Stimmung wählen...</option>
          <option value="neutral">Neutral</option>
          <option value="fokussiert">Fokussiert</option>
          <option value="gestresst">Gestresst</option>
          <option value="euphorisch">Euphorisch</option>
          <option value="ängstlich">Ängstlich</option>
          <option value="müde">Müde</option>
        </select>
        <div className="flex flex-col flex-1">
          <span className={`text-xs mb-1 ${mode === 'dark' ? 'text-gray-400' : 'text-blue-900'}`}>Fehler/Verhalten:</span>
          <div className="flex flex-wrap gap-2">
            {['Regelbruch','FOMO','zu früh raus','zu spät rein','Overtrading','Planlos','Impulsiv','Disziplin'].map(tag => (
              <label key={tag} className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  name="fehler_tags"
                  value={tag}
                  checked={form.fehler_tags.includes(tag)}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </div>
      <textarea name="reflexion" value={form.reflexion} onChange={handleChange} placeholder="Lernpunkt / Reflexion (optional)" className={`rounded px-3 py-2 resize-none ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} rows={2} />
      <textarea name="note" value={form.note} onChange={handleChange} placeholder="Notiz (optional)" className={`rounded px-3 py-2 resize-none ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900 border border-blue-200'}`} rows={2} />
      <button type="submit" className={`mt-2 font-bold py-2 px-6 rounded shadow ${mode === 'dark' ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-200 hover:bg-blue-300 text-blue-900 border border-blue-300'}`}>Trade speichern</button>
    </form>
  );
}

TradeForm.propTypes = {
  onAddTrade: PropTypes.func.isRequired,
  mode: PropTypes.string,
  lightBg: PropTypes.number
};
