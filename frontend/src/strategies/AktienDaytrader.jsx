import React from "react";

const AktienDaytrader = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-pink-700 mb-4">Daytrading bei Aktien – Vollständiges Lernmodul</h2>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p>Daytrader handeln Aktien innerhalb eines Tages, um von Intraday-Schwankungen zu profitieren. Es werden keine Positionen über Nacht gehalten. Die Strategie basiert auf Volumen, Orderflow und striktem Risikomanagement.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten</h3>
      <ul className="list-disc ml-6">
        <li>Handel auf M1-M15-Charts, Fokus auf Volumen, Orderflow, Level 2.</li>
        <li>Strategien: Breakout, Reversal, VWAP, Gap-Trading.</li>
        <li>Striktes Risikomanagement, Stop-Loss pro Trade, Tagesverlust-Limit.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6">
        <li>Screening nach liquiden Aktien mit Screener-Tools.</li>
        <li>Einstieg nach Breakout oder Reversal, Bestätigung durch Volumen.</li>
        <li>Stop-Loss nach ATR, Take-Profit nach CRV oder an Widerstand.</li>
        <li>Tagesverlust-Limit strikt einhalten.</li>
      </ol>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6">
        <li>Maximal 1% Risiko pro Trade.</li>
        <li>Portfolio-Diversifikation: Verschiedene Sektoren und Aktien.</li>
        <li>Positionsgröße nach Volatilität und Depotgröße.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6">
        <li>Stressresistenz: Schnelle Entscheidungen treffen.</li>
        <li>Disziplin: An der Strategie festhalten, Overtrading vermeiden.</li>
        <li>Journaling und tägliche Fehleranalyse.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ul className="list-disc ml-6">
        <li>Mindestens 100 Daytrades auf historischen Daten testen.</li>
        <li>Trefferquote, CRV, Drawdown, Zeit im Markt auswerten.</li>
        <li>Regeln anpassen und erneut testen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps</h3>
      <ul className="list-disc ml-6">
        <li>Nutze Screener wie Finviz, TradingView.</li>
        <li>Handle bevorzugt in ruhigen Marktphasen, vermeide Earnings-Trading.</li>
        <li>Nutze Alerts für Einstiegszonen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">8. Tools & Literatur</h3>
      <ul className="list-disc ml-6">
        <li>TradingView, Finviz, Yahoo Finance.</li>
        <li>&quot;One Good Trade&quot; – Mike Bellafiore</li>
        <li>&quot;The Playbook&quot; – Mike Bellafiore</li>
        <li>&quot;How to Day Trade for a Living&quot; – Andrew Aziz</li>
      </ul>
      <div className="mt-4 text-xs text-gray-500">Quellen: Bellafiore, Aziz, eigene Backtests, Erfahrungsberichte von Daytradern.</div>
    </section>
  </div>
);

export default AktienDaytrader;
