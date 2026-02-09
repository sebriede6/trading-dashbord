import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const ForexSwingTrader = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-indigo-300 mb-4">Forex Swing Trader Strategie – Das ultimative Lernmodul</h2>
    <StrategyFigure
      title="Mehr-Tages-Swing im Trendkanal"
      variant="forexSwing"
      caption="Skizziert Pullback-Entries auf H4/D1 inklusive Zielzonen an wichtigen Pivot-Leveln."
      href="https://trading.de/lernen/strategien/swing-trading/"
      linkLabel="Trading.de: Swing Trading Guide"
    />
    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Swing-Trading im Forex-Markt bedeutet, mittelfristige Trends und größere Kursbewegungen zu handeln. Ziel ist es, von klaren Trendphasen und Chartmustern zu profitieren, ohne ständig am Bildschirm zu sitzen. Die Strategie basiert auf:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Handel auf H4/D1-Chart, Fokus auf Trendfolge und Chartmuster</li>
        <li>Nutzen von EMA 20/50, Fibonacci, Pivot Points, Unterstützungen/Widerständen</li>
        <li>Geduld und Disziplin: Trades laufen lassen, nicht zu früh schließen</li>
        <li>Fundierte Analyse: Wirtschaftskalender, News, Saisonalität</li>
      </ul>
      <p className="mb-2">Typische Swing-Trader sind geduldig, analytisch und mögen mittelfristige Planung.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Charttechnik</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Trendfolge:</b> Einstieg nach Pullback im Trend, Bestätigung durch Candlestick-Pattern (Pinbar, Engulfing)</li>
        <li><b>Chartmuster:</b> Double Top/Bottom, Flaggen, Dreiecke, Range-Breakouts</li>
        <li><b>Fibonacci-Retracement:</b> Einstieg nach Korrektur auf 38/50/61%-Level</li>
        <li><b>Pivot Points:</b> Orientierung für Support/Resistance und Take-Profit</li>
      </ul>
      <div className="mb-2">Chartbeispiel: <i>D1-Chart mit eingezeichnetem Trend, Pullback, Entry, SL/TP, Fibonacci</i></div>
      <div className="mb-2">Tools: TradingView, MetaTrader, cTrader, Fibonacci-Tools, Wirtschaftskalender</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Warte auf Pullback im Trend, Bestätigung durch Candlestick-Pattern</li>
        <li>Entry nach Close der Bestätigungs-Kerze</li>
        <li>Stop-Loss unter/über letzter Struktur oder Fibonacci-Level</li>
        <li>Take-Profit am nächsten Widerstand/Unterstützung oder nach CRV 2:1</li>
        <li>Teilgewinnmitnahme bei 1R, Rest laufen lassen oder Trailing-Stop</li>
        <li>Trade schließen, wenn Trend bricht oder News anstehen</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>EUR/USD, D1, Pullback an EMA 20, Pinbar, Entry nach Close, TP am nächsten Pivot</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Maximal 2% Risiko pro Trade</li>
        <li>Portfolio-Diversifikation: Nicht mehr als 3 offene Trades gleichzeitig</li>
        <li>Positionsgröße nach ATR und Depotgröße berechnen</li>
        <li>Regelmäßige Kontrolle der offenen Risiken</li>
      </ul>
      <div className="mb-2">Fehlerquelle: Zu viele offene Trades, zu hohes Risiko, kein CRV</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Geduld: Trades laufen lassen, nicht zu früh schließen</li>
        <li>Wöchentliche Analyse: Review aller abgeschlossenen Trades</li>
        <li>Trading-Journal führen, Fehler und Learnings dokumentieren</li>
        <li>Mentale Checkliste vor jedem Trade</li>
      </ul>
      <div className="mb-2">Praxis: <i>Journaling, Fehleranalyse, wöchentliche Review</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Mindestens 50 Swing-Trades auf historischen Daten testen</li>
        <li>Statistik: Trefferquote, CRV, Drawdown, Zeit im Markt</li>
        <li>Regeln anpassen und erneut testen</li>
        <li>Ergebnisse im Journal dokumentieren</li>
      </ol>
      <div className="mb-2">Fehlerquelle: Zu wenig Backtests, keine Anpassung der Regeln</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps & Tools</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Nutze den Wirtschaftskalender (forexfactory.com) für News-Filterung</li>
        <li>Handle nur in ruhigen Marktphasen, vermeide News-Trading</li>
        <li>Nutze Alerts für Einstiegszonen</li>
        <li>Empfohlene Tools: TradingView, MetaTrader, cTrader, Fibonacci-Tools</li>
        <li>Literatur: &quot;Swing Trading&quot; von John F. Carter, &quot;Technical Analysis of the Financial Markets&quot; von John Murphy</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">8. Häufige Fehlerquellen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Zu viele offene Trades, Überdiversifikation</li>
        <li>Kein CRV, zu enger Stop-Loss</li>
        <li>Emotionale Entscheidungen, zu frühes Schließen</li>
        <li>Fehlende Dokumentation und Analyse</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Kompletter Trading-Tag</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>07:30 Uhr: Marktvorbereitung, News-Check, Chartanalyse</li>
        <li>08:00 Uhr: Trendanalyse, Setup-Suche</li>
        <li>09:00 Uhr: Entry nach Pullback, SL/TP gesetzt</li>
        <li>15:00 Uhr: Trade läuft, Teilgewinnmitnahme</li>
        <li>18:00 Uhr: Trade geschlossen, Ergebnis dokumentiert</li>
        <li>19:00 Uhr: Wöchentliche Review, Fehleranalyse</li>
      </ol>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie lange läuft ein Swing-Trade?</b> 1-10 Tage, je nach Trend und Setup</li>
        <li><b>Welcher Broker ist geeignet?</b> ECN-Broker mit stabilem Handel, z.B. Pepperstone, IC Markets</li>
        <li><b>Wie kann ich Swing-Trading üben?</b> Demo-Konto, Backtesting, Replay-Modus</li>
        <li><b>Wie finde ich die besten Setups?</b> Fokus auf Trend, Pullback, Chartmuster, News</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">11. Makro- und Sentiment-Filter</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Analysiere wöchentlich Commitment of Traders (COT), um Großanleger-Positionierung zu verstehen.</li>
        <li>Nutze Zinsdifferenzen (2y, 10y Renditen) zwischen Währungspaaren als Trendfilter.</li>
        <li>Tracke globale Risk-On/Off-Indikatoren (VIX, SPX, DXY), um Positionsgröße anzupassen.</li>
        <li>Verknüpfe Makro-Themen (z.B. Inflationspfad, Zentralbank-Zyklen) mit Trendrichtung.</li>
      </ul>
      <p className="mb-2">Erstelle ein wöchentliches Makro-Briefing, das Setups nach Fundamentaldruck priorisiert.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">12. Performance- und Risiko-Kennzahlen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Tracke Rolling 12-Trade Expectancy, um kurzfristige Edge-Änderungen zu erkennen.</li>
        <li>Maximaler Wochendrawdown: setze ein Limit (z.B. -3R), danach Floor-Time.</li>
        <li>Halte die durchschnittliche Haltedauer je Setup fest, um Time-Stop-Optimierungen abzuleiten.</li>
        <li>Vergleiche Performance von Trend- vs. Rangephasen, um Filter zu verfeinern.</li>
      </ul>
      <p className="mb-2">Verwende Tools wie TraderVue oder Edgewonk, um Kennzahlen konsistent auszuwerten.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">13. Automatisierung & Prozess-Support</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Setze Screener (TrendSpider, TradingView) auf Weekly/Daily-Kombination, die Pullbacks automatisch kennzeichnen.</li>
        <li>Nutze Notion oder Obsidian für ein verknüpftes Setup-Wiki mit Screenshot-Datenbank.</li>
        <li>Automatisiere Benachrichtigungen bei EMA-Crossover + RSI Divergenz via Pine Script.</li>
        <li>Implementiere Teilverkaufs-Automationen (MT5 Scripts) zur Disziplinwahrung.</li>
      </ul>
      <p className="mb-2">Ziel ist ein klarer, wiederholbarer Analyse- und Ausführungsprozess, der Fehler minimiert.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">14. Wöchentliche Swing-Trader-Checkliste</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Sonntag: Makro-Update, Trendmatrix (H4/D1/W1) pro Paar aktualisieren.</li>
        <li>Support/Resistance Zonen und Fibo-Level markieren; Alerts setzen.</li>
        <li>Positionsgröße und Risiko je Setup planen; Kalender synchronisieren.</li>
        <li>Während der Woche: Trade-Plan mit Entry, SL, TP und Entscheidungsnotizen vorbereiten.</li>
        <li>Freitag: Review, KPI-Update, Lessons Learned, Anpassung der Watchlist.</li>
      </ol>
      <p className="mb-2">Die Checkliste sichert Konsistenz und verhindert impulsive Entscheidungen zwischen den Zeiteinheiten.</p>
    </section>
  </div>
);

export default ForexSwingTrader;
