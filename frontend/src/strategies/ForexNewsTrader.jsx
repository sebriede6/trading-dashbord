import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const ForexNewsTrader = () => (
  <>
    <StrategyFigure
      title="News-Impulse Snapshot"
      variant="forexNews"
      caption="Veranschaulicht den initialen Spike nach Wirtschaftsnews und die anschließende Volatilitätsabnahme."
      href="https://trading.de/lernen/strategien/news-trading/"
      linkLabel="Trading.de: News Trading"
    />
    <h3 className="text-lg font-bold mt-4 mb-2">1. Marktlogik & Setup</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Handel auf starke Marktbewegungen nach wichtigen Wirtschaftsnachrichten (z.B. Zinsentscheidungen, NFP, CPI).</li>
      <li>Vorbereitung: Wirtschaftskalender, Analyse der erwarteten Volatilität.</li>
      <li>Typische Strategien: Breakout nach News, Fade der Überreaktion, Straddle-Orders.</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">2. Einstieg & Ausstieg</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Sehr schnelle Ausführung, oft mit Pending Orders vor News.</li>
      <li>Stop-Loss und Take-Profit müssen an hohe Volatilität angepasst werden.</li>
      <li>Trade sofort schließen, wenn News-Effekt nachlässt.</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">3. Money Management</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Maximal 1,5% Risiko pro Trade.</li>
      <li>Positionsgröße nach Volatilität und News-Impact.</li>
      <li>Trading nur mit stabiler Technik und Broker.</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">4. Psychologie & Routinen</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Schnelle Reaktion, keine Angst vor Volatilität.</li>
      <li>Trading-Journal führen, Fehler und Learnings dokumentieren.</li>
      <li>Nach jedem News-Trade: Kurze Pause, Fehleranalyse.</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">5. Backtesting & Optimierung</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Mindestens 50 News-Trades auf historischen Daten testen.</li>
      <li>Trefferquote, CRV, Drawdown, News-Effekt auswerten.</li>
      <li>Regeln anpassen und erneut testen.</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">6. Profi-Tipps</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Nutze Algorithmen für News-Trading.</li>
      <li>Handle nur bei klaren News-Impulsen.</li>
      <li>Nutze Alerts für News-Zeiten.</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">7. Tools & Literatur</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>TradingView, MetaTrader, Myfxbook, Wirtschaftskalender.</li>
      <li>&quot;The 10 Essentials of Forex Trading&quot; – Jared Martinez</li>
      <li>&quot;Beat the Forex Dealer&quot; – Agustin Silvani</li>
    </ul>
    <div className="mt-4 text-xs text-gray-500">Quellen: Martinez, Silvani, eigene Backtests, Erfahrungsberichte von News-Tradern.</div>
    <h3 className="text-lg font-bold mt-4 mb-2">8. Pre-News Vorbereitungsplan</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>30-60 Minuten vorher: Konsensschätzungen, Abweichungsspannen, Flüsterschätzungen sammeln.</li>
      <li>Liquidität prüfen: Spreads, DOM, Broker-Stabilität, Backup-Verbindung bereit halten.</li>
      <li>Levels markieren (Previous High/Low, VWAP, Overnight High/Low) für Reaktionszonen.</li>
      <li>News-Skript parat halten: Wann wird gehandelt, wann verzichtet, welche Ordertypen?</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">9. Ordertypen & Execution</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Stop-Orders für Momentum-Breakouts, Limit-Orders zum Faden von Überreaktionen.</li>
      <li>Straddle-Strategie: Beidseitige Stop-Orders, automatisches Löschen der Gegenorder (OCO).</li>
      <li>Latency minimieren: VPS nahe Broker-Server, Hotkeys, Ein-Klick-Handel.</li>
      <li>Slippage-Management: Maximal erlaubte Abweichung definieren, bei Überschreitung Trade sofort schließen.</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">10. Risiko-Framework & Notfallpläne</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Max. Tagesverlust (z.B. 3R) und Monatsverlust (10R) definieren.</li>
      <li>Nach Black-Swan News (Flash Crash) automatischer Trading-Stopp für den Tag.</li>
      <li>Backup-Broker oder Telefonhandel bereithalten.</li>
      <li>Positionen sofort hedgen, wenn Plattform einfriert (z.B. via CFD/Options).</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">11. Datenquellen & Live-Feeds</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Premium-Kalender: ForexFactory Pro, Econoday, FinancialJuice.</li>
      <li>Audio-Squawk: LiveSquawk, Ransquawk, Benzinga Pro für Sekunden-Vorsprung.</li>
      <li>News-APIs (Newsquawk API, Refinitiv) für algorithmische Umsetzung.</li>
      <li>Twitter-Listen mit Zentralbankern, Journalisten, Makroanalysten.</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">12. Performance-Metriken & Review</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Average Slippage pro News-Event, getrennt nach Währungspaar.</li>
      <li>Hit Rate nach Event-Typ (Zinsentscheid, NFP, CPI, PMI etc.).</li>
      <li>Risikokennzahlen: Max Drawdown, Largest Loss, News-Session Equity Curve.</li>
      <li>Pre-News Forecast Accuracy: Wie oft deckt sich Erwartung mit tatsächlichem Outcome?</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">13. Automatisierung & Tools</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>News-Parser-Bot, der Abweichung (Actual vs. Forecast) berechnet und sofort Signal liefert.</li>
      <li>MT5/CTRADER cAlgo Skripte für OCO-Straddles mit dynamischem Stop-Offset.</li>
      <li>Excel/Google Sheets Dashboard mit Live-Datenfeeds (Myfxbook API) für Sentiment.</li>
      <li>Notion/Obsidian Vorlagen für jeden Event-Typ (Vorbereitung, Erwartung, Ergebnis, Nachanalyse).</li>
    </ul>
    <h3 className="text-lg font-bold mt-4 mb-2">14. Case Study: Non-Farm Payrolls</h3>
    <ol className="list-decimal ml-6 mb-2">
      <li>Vorbereitung: Konsens +200k, Whisper +230k, Risiko-Event hoch.</li>
      <li>Setup: Straddle auf EUR/USD, Stops 15 Pips entfernt, OCO aktiv.</li>
      <li>Ausführung: Actual +310k, USD-Stärke; Long-Order wird ausgelöst, Teilgewinn bei +20 Pips, Rest via Trailing Stop.</li>
      <li>Nachanalyse: Slippage 1.5 Pips, Kurs nach 5 Minuten retraced; Lessons Learned dokumentiert.</li>
    </ol>
    <h3 className="text-lg font-bold mt-4 mb-2">15. Mentales Training & Regeneration</h3>
    <ul className="list-disc ml-6 mb-2">
      <li>Pre-News Atemtechnik (Box Breathing) zur Stressreduktion.</li>
      <li>Post-Event Kurzreview (5 Minuten), um Emotionen zu verarbeiten.</li>
      <li>Regelmäßige Pausen, da News-Trading hohe kognitive Last erzeugt.</li>
      <li>Visualisierung erfolgreicher Execution stärkt Selbstvertrauen.</li>
    </ul>
  </>
);

export default ForexNewsTrader;
