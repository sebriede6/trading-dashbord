import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const RohstoffeTrendFollower = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-yellow-700 mb-4">Trendfolge bei Rohstoffen – Vollständiges Lernmodul</h2>
    <StrategyFigure
      title="Langfristiger Trendkanal"
      variant="commodityTrend"
      caption="Zeigt steigende Hochs und Tiefs inklusive Trailing-Stop-Zonen für Trendfolger."
      href="https://trading.de/lernen/strategien/trendfolgestrategien/"
      linkLabel="Trading.de: Trendfolgestrategien"
    />
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
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">9. Multi-Timeframe-Trendframework</h3>
      <ul className="list-disc ml-6">
        <li>Quarterly/Monthly: Primärer Makrotrend (Bull/Bear), COT-Positionierung der Commercials.</li>
        <li>Weekly/Daily: Signalebene für Entries (Pullbacks, Breakouts, Trendlinien).</li>
        <li>4h/1h: Feintuning, Risiko-Entry mit engerem Stop.</li>
        <li>Nutze Trendvolumen (OBV, Volume Profile) als Bestätigung.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">10. Trend-Fortschritts-Analyse</h3>
      <ul className="list-disc ml-6">
        <li>Phasen definieren: Accumulation, Expansion, Distribution, Reversion.</li>
        <li>ATR-Expansion/Contraction als Hinweis auf Trendreife.</li>
        <li>Momentum-Indikatoren (ADX, MACD Histogram) für Trendstärke.</li>
        <li>Divergenzen in RSI/Stochastik als Warnsignal.</li>
      </ul>
      <p>Vermeide den Einstieg in spät reife Trends ohne klare Struktur.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">11. Positionsaufbau & Skalierung</h3>
      <ul className="list-disc ml-6">
        <li>Initiale Starter-Position, dann Pyramiding bei Bestätigung (z.B. neues Higher High).</li>
        <li>Verwende Fixed Fractional oder Volatility Scaling zur Anpassung.</li>
        <li>Trailing Stop Strategien: Chandelier Exit, Donchian Channel, Parabolic SAR.</li>
        <li>Halte Quote zwischen Trend-Trades und Cash fest, um Drawdowns psycho-logisch handhabbar zu halten.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">12. Risiko-Management & Korrelationskontrolle</h3>
      <ul className="list-disc ml-6">
        <li>Korrelationsanalyse (z.B. Gold vs. Silber, Öl vs. Heizöl) um Klumpenrisiken zu erkennen.</li>
        <li>Max. Portfolio-Heat definieren (Summe offener R-Risiken).</li>
        <li>Nutze Drawdown-Stop: Bei -10R monatlich Trading-Pause, Review.</li>
        <li>Absicherung via inverse Positionen oder Cross-Asset-Hedges (Dollar, Aktienindizes).</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">13. Automatisierung & Tools</h3>
      <ul className="list-disc ml-6">
        <li>Systematische Strategie in Python/NinjaTrader/Sierra implementieren.</li>
        <li>Trigger Alerts bei Donchian Breakouts, ADX Schwellen, ATR-Änderungen.</li>
        <li>Nutze Portfolio Backtester (QuantConnect, Backtrader) zur Validierung.</li>
        <li>Versioniere Regeln in Git, führe Change-Logs bei Strategieanpassungen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">14. Case Study: Kupfer-Langfristtrend</h3>
      <ol className="list-decimal ml-6">
        <li>Makro: Infrastrukturprogramme, Elektrifizierungsboom treiben Nachfrage.</li>
        <li>Signal: Break aus mehrjähriger Range, COT zeigt Commercial Short-Abbau.</li>
        <li>Umsetzung: Entry auf Re-Test, Trailing Stop 2x ATR, Pyramiding bei neuen Hochs.</li>
        <li>Exit: Trend erschöpft sich nach parabolischer Bewegung + Divergenzen.</li>
      </ol>
      <p>Case Studies zeigen, wie Makro und Technik zusammenspielen.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">15. Routine & Weiterentwicklung</h3>
      <ul className="list-disc ml-6">
        <li>Wochenende: Marktüberblick, Trend-Screening, Watchlist Aktualisierung.</li>
        <li>Midweek: Trendfortschritt prüfen, Stops anpassen, Skalierungspläne erstellen.</li>
        <li>Monat: KPI-Review (CAGR, MAR Ratio, Winrate), Regel-Backtests.</li>
        <li>Quartal: Strategie-Audit, Outlier-Analyse, neue Märkte testen.</li>
      </ul>
    </section>
  </div>
);

export default RohstoffeTrendFollower;
