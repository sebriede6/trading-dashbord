import React from "react";

const RohstoffeTrendFollower = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-yellow-700 mb-4">Trendfolge bei Rohstoffen – Vollständiges Lernmodul</h2>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p>Trend-Follower handeln in Richtung des übergeordneten Trends bei Rohstoffen wie Gold, Öl oder Kupfer. Ziel ist es, große Bewegungen mitzunehmen und Drawdowns zu akzeptieren. Die Strategie basiert auf Geduld, konsequenter Regelbefolgung und robustem Risikomanagement.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten</h3>
      <ul className="list-disc ml-6">
        <li>Handel auf H4/D1/Woche, Identifikation des Trends mit EMA 50/200, Trendlinien, COT-Daten.</li>
        <li>Ein- und Ausstieg nach Pullbacks oder Ausbrüchen.</li>
        <li>Stop-Loss unter/über letzter Korrektur, Positionsgröße nach Volatilität.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6">
        <li>Trendbestimmung mit EMA und COT-Report.</li>
        <li>Einstieg nach Pullback in Trendrichtung, Bestätigung durch Volumenanstieg.</li>
        <li>Stop-Loss unter letzter Korrektur, Take-Profit nach CRV 2:1 oder an Widerstand.</li>
        <li>Teilgewinnmitnahme bei 1R, Rest laufen lassen oder Trailing-Stop.</li>
      </ol>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6">
        <li>Maximal 1,5% Risiko pro Trade.</li>
        <li>Portfolio-Diversifikation: Verschiedene Rohstoffe und Sektoren.</li>
        <li>Positionsgröße nach ATR und Depotgröße.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6">
        <li>Geduld: Trades laufen lassen, nicht zu früh schließen.</li>
        <li>Wöchentliche Analyse: Review aller abgeschlossenen Trades.</li>
        <li>Trading-Journal führen, Fehler und Learnings dokumentieren.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ul className="list-disc ml-6">
        <li>Mindestens 50 Trendfolge-Trades auf historischen Daten testen.</li>
        <li>Trefferquote, CRV, Drawdown, Zeit im Markt auswerten.</li>
        <li>Regeln anpassen und erneut testen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps</h3>
      <ul className="list-disc ml-6">
        <li>Nutze COT-Reports und Volumenanalyse für Trendbestätigung.</li>
        <li>Handle bevorzugt in klaren Trendphasen.</li>
        <li>Nutze Alerts für Einstiegszonen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">8. Tools & Literatur</h3>
      <ul className="list-disc ml-6">
        <li>TradingView, MetaTrader, Moore Research Center.</li>
        <li>&quot;Way of the Turtle&quot; – Curtis Faith</li>
        <li>&quot;Trend Following&quot; – Michael Covel</li>
      </ul>
      <div className="mt-4 text-xs text-gray-500">Quellen: Faith, Covel, eigene Backtests, Erfahrungsberichte von Rohstoff-Trend-Followern.</div>
    </section>
  </div>
);

export default RohstoffeTrendFollower;
