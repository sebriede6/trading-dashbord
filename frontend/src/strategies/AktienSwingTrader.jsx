import React from "react";

const AktienSwingTrader = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-indigo-400 mb-4">Swing-Trading bei Aktien – Das ultimative Lernmodul</h2>
    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Swing-Trader handeln mittelfristige Kursbewegungen und nutzen Charttechnik, Indikatoren und Volumen, um von Schwankungen zwischen Unterstützungen und Widerständen zu profitieren.</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Fokus auf mittelfristige Trends und Swings</li>
        <li>Technische Analyse als Hauptwerkzeug</li>
        <li>Handel zwischen Unterstützungen und Widerständen</li>
      </ul>
      <p className="mb-2">Typische Swing-Trader sind flexibel, analytisch und entscheidungsfreudig.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Charttechnik</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Trendfolge:</b> Einstieg bei bestätigtem Trend (z.B. EMA, MACD, RSI)</li>
        <li><b>Breakout:</b> Ausbruch aus Konsolidierungsphasen</li>
        <li><b>Volumen-Spikes:</b> Plötzliche Volumenanstiege als Einstiegssignal</li>
      </ul>
      <div className="mb-2">Tools: TradingView, Finviz, Yahoo Finance</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Kauf bei Trendbestätigung (EMA-Cross, MACD-Buy, RSI)</li>
        <li>Verkauf bei Trendbruch oder Schwäche (MACD-Sell, RSI-Abfall)</li>
        <li>Stop-Loss unter letzter Korrektur oder Support</li>
        <li>Take-Profit bei Ziellevel oder Swing-Ende</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>Kauf von Apple bei Breakout, Verkauf bei Widerstand</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Maximal 2% Risiko pro Trade</li>
        <li>Portfolio-Diversifikation: Verschiedene Branchen und Länder</li>
        <li>Positionsgröße nach Volatilität und Trendstärke</li>
      </ul>
      <div className="mb-2">Fehlerquelle: Zu große Positionen, kein Stop-Loss</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Geduld: Swings laufen lassen</li>
        <li>Disziplin: An der Strategie festhalten</li>
        <li>Regelmäßige Analyse der Trades</li>
        <li>Mentale Checkliste vor jedem Trade</li>
      </ul>
      <div className="mb-2">Praxis: <i>Journaling, Fehleranalyse, wöchentliche Review</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Backtesting mit historischen Kursdaten und Indikatoren</li>
        <li>Statistik: Trefferquote, Profitfaktor, Drawdown</li>
        <li>Regeln anpassen und erneut testen</li>
        <li>Ergebnisse im Journal dokumentieren</li>
      </ol>
      <div className="mb-2">Fehlerquelle: Zu wenig Backtests, keine Anpassung der Regeln</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps & Tools</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Nutze TradingView, Finviz, Yahoo Finance</li>
        <li>Fokus auf liquide Aktien mit klaren Swings</li>
        <li>Empfohlene Indikatoren: EMA, MACD, RSI</li>
        <li>Literatur: &quot;Swing Trading&quot; von Marc Rivalland, &quot;Technical Analysis&quot; von John J. Murphy</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">8. Häufige Fehlerquellen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Zu große Positionen, kein Stop-Loss</li>
        <li>Emotionale Trades, Overtrading</li>
        <li>Fehlende Dokumentation und Analyse</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Kompletter Swing-Trading-Woche</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Montag: Marktvorbereitung, Swing-Signale prüfen</li>
        <li>Dienstag: Entry bei Breakout, Stop-Loss setzen</li>
        <li>Mittwoch: Gewinn dokumentieren, Trades analysieren</li>
        <li>Freitag: Wöchentliche Review, Fehleranalyse</li>
      </ol>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie finde ich Swing-Signale?</b> Indikatoren, Charttechnik, Volumen</li>
        <li><b>Welcher Broker ist geeignet?</b> Trade Republic, Comdirect, ING</li>
        <li><b>Wie kann ich Swing-Trading üben?</b> Musterdepot, Backtesting, Literatur</li>
        <li><b>Wie minimiere ich das Risiko?</b> Striktes Money Management, Stop-Loss</li>
      </ul>
    </section>
  </div>
);

export default AktienSwingTrader;
