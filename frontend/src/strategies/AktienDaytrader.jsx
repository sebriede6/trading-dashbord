import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const AktienDaytrader = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-pink-700 mb-4">Daytrading bei Aktien – Vollständiges Lernmodul</h2>
    <StrategyFigure
      title="Intraday Volumen-Map"
      variant="equityDay"
      caption="Visualisiert typische Breakout-Sequenzen während der Markteröffnung inklusive Volumenspike-Filter."
      href="https://capital.com/de-de/learn/trading-strategies/day-trading"
      linkLabel="Capital.com: Day Trading Strategies"
    />
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
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">9. Pre-Market Workflow</h3>
      <ul className="list-disc ml-6">
        <li>06:45 Uhr: Global-Market-Check (Futures, Asien/Europa, Volatilitätsindex).</li>
        <li>07:00 Uhr: Earnings- und News-Kalender sortieren, High-Impact-Events mit Stern markieren.</li>
        <li>07:15 Uhr: Gap-Scan (≥3%), Unusual Volume, Relative Strength vs. Sektor.</li>
        <li>07:30 Uhr: Key Levels (Vortageshoch/-tief, VWAP, Pivot, Liquidity Pools) einzeichnen.</li>
        <li>08:45 Uhr: Trade-Plan formulieren: Setup, Trigger, Risiko, Skalierung, Exit-Regeln schriftlich festhalten.</li>
      </ul>
      <p>Ein klarer Pre-Market-Prozess verhindert impulsive Entscheidungen und schafft Fokus auf High-Quality-Setups.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">10. Orderflow & Tape Reading</h3>
      <ul className="list-disc ml-6">
        <li>Nutze Level-2 und Time & Sales, um versteckte Liquidität und große Orders (Icebergs) zu erkennen.</li>
        <li>Achte auf Geschwindigkeit der Prints: Beschleunigung signalisiert Momentum, Verlangsamung mögliche Erschöpfung.</li>
        <li>DOM-Liquidity-Shifts als Frühindikator für Reversals nutzen.</li>
        <li>Footprint-Charts (z.B. Bookmap, Exocharts) zeigen Delta und Absorption an Schlüsselzonen.</li>
      </ul>
      <p>Orderflow-Interpretation erfordert Praxis – fünf Minuten tägliches Tape-Reading-Training schärfen das Auge.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">11. Volatilitäts- & Risiko-Steuerung</h3>
      <ul className="list-disc ml-6">
        <li>Setze ATR-Filter: Nur Aktien mit ATR &gt; 1.5 USD für klare Bewegungen.</li>
        <li>Dynamic Position Sizing: Positionsgröße anhand impliziter Volatilität und Spread festlegen.</li>
        <li>Hard-Stop-Limits bei Circuit-Breaker-Phasen und illiquiden Midcaps.</li>
        <li>Max. Exposure pro Sektor definieren, um Klumpenrisiko zu vermeiden.</li>
      </ul>
      <p>Volatilität kann Chance und Risiko gleichzeitig sein – dokumentiere, welche VIX-Niveaus deinem Stil entsprechen.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">12. Tech-Stack & Automatisierung</h3>
      <ul className="list-disc ml-6">
        <li>Charting & Scanning: TradingView, TrendSpider, Benzinga Pro (Audio News Squawk).</li>
        <li>Execution: DAS Trader, Sterling Trader Pro mit Hotkeys und OCO-Layouts.</li>
        <li>Automatisierte Playbook-Templates in Notion oder Google Docs für wiederkehrende Setups.</li>
        <li>Trade-Recorder (z.B. TradeBuddy) für Screen-Captures und Voice Notes.</li>
      </ul>
      <p>Automatisierung sorgt für Konstanz: Hotkeys und vorbereitete Order-Templates minimieren Latenz.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">13. Performance-Analytics</h3>
      <ul className="list-disc ml-6">
        <li>Berechne Win/Loss in R, Payoff-Ratio, Expectancy, Max Drawdown.</li>
        <li>Führe ein Session-Scorecard-System (A bis F) basierend auf Prozessqualität.</li>
        <li>Heatmap, welche Uhrzeiten und Setups den größten Edge liefern.</li>
        <li>Review der Top 10 Gewinner und Verlierer pro Monat, um Muster zu isolieren.</li>
      </ul>
      <p>Edgewonk, TraderSync oder selbstentwickelte Sheets helfen, Daten sichtbar zu machen und Entscheidungen zu objektivieren.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">14. Trading Playbook & Best Practices</h3>
      <ol className="list-decimal ml-6">
        <li><b>Opening Drive Breakout:</b> Fokus auf High Relative Volume, klarer Trend auf 5-Minuten, Scale-out bei VWAP.</li>
        <li><b>VWAP Reclaim:</b> Geduld bis Preis unter VWAP konsolidiert, Entry bei Rückeroberung, Risiko knapp unter Range.</li>
        <li><b>Range Reversal:</b> Mehrere Failed Breakouts? Entry gegen die Range mit enger Absicherung.</li>
        <li><b>Trend Continuation:</b> Höheres Hoch + Pullback; kombiniere mit RSI-Divergenz oder Market Internals (AD-Line).</li>
      </ol>
      <p>Jedes Play enthält: Setup-Beschreibung, Trigger, Risiko, Management, Post-Trade-Review. Dokumentiere Muster mit Screenshots.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">15. Routine nach dem Closing</h3>
      <ul className="list-disc ml-6">
        <li>17:00 Uhr: Trades exportieren, Journal &amp; Screenshots ergänzen, Emotionen reflektieren.</li>
        <li>17:30 Uhr: Kennzahlen aktualisieren, Edge-Check (Erfüllt? Nicht erfüllt?).</li>
        <li>18:00 Uhr: Lesson Learned formulieren, Maßnahmenplan für morgen definieren.</li>
        <li>19:00 Uhr: Disconnect-Ritual (Sport, Meditation), um mental zu resetten.</li>
      </ul>
      <p>Konsequente Nachbereitung hält das Urteil objektiv und verhindert, dass Lernpotenzial verloren geht.</p>
    </section>
  </div>
);

export default AktienDaytrader;
