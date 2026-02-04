import React from "react";

const ForexScalper = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-indigo-300 mb-4">Forex Scalper Strategie – Das ultimative Lernmodul</h2>

    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Scalping ist die Kunst, im Forex-Markt winzige Kursbewegungen auszunutzen. Ziel ist es, viele kleine Gewinne zu erzielen, indem man Marktrauschen, Mikrotrends und Liquiditätsimpulse handelt. Die Strategie basiert auf:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Extrem schnelle Reaktionsfähigkeit (Trades dauern oft nur Sekunden bis wenige Minuten)</li>
        <li>Handel in den liquidesten Marktphasen (London/NY-Open, News-Impulse)</li>
        <li>Minimale Kosten: Broker mit niedrigem Spread und Kommission</li>
        <li>Striktes Risiko- und Money-Management</li>
        <li>Fokus auf technische Analyse, Orderflow und Volumen</li>
      </ul>
      <p className="mb-2">Typische Scalper sind entscheidungsfreudig, stressresistent und lieben schnelle Action.</p>
    </section>

    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Charttechnik</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Breakout-Scalping:</b> Einstieg bei Ausbruch aus enger Range, z.B. nach London-Open. Indikatoren: Volumen, VWAP, EMA 9/21.</li>
        <li><b>Pullback-Scalping:</b> Einstieg nach kurzer Korrektur im Trend, z.B. an EMA, Pivot, VWAP.</li>
        <li><b>Orderflow-Scalping:</b> Nutzung von DOM/Orderbuch, um Liquiditätszonen und große Orders zu erkennen.</li>
        <li><b>News-Scalping:</b> Schnelle Reaktion auf Wirtschaftsdaten, z.B. NFP, Zinsentscheidungen.</li>
      </ul>
      <div className="mb-2">Chartbeispiel: <i>M1-Chart mit eingezeichnetem Breakout, Entry, Stop-Loss, Take-Profit, Volumen-Spike</i></div>
      <div className="mb-2">Tools: TradingView, MetaTrader, cTrader, Bookmap, Soft4FX, DOM/Orderbuch-Tools</div>
    </section>

    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Warte auf ein Setup (z.B. Breakout über Tageshoch mit Volumenanstieg)</li>
        <li>Platziere Market-Order oder Pending-Order mit engem Stop-Loss (2-5 Pips)</li>
        <li>Take-Profit: 2-3x Risiko, fester Pip-Wert oder nach Orderflow</li>
        <li>Nutze OCO-Orders (One Cancels Other) für automatisches Schließen</li>
        <li>Trade sofort schließen, wenn das Setup ungültig wird (z.B. Rückkehr in Range, Volumen bricht ein)</li>
        <li>Keine Positionsverschiebung: Immer nach Plan aussteigen!</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>London-Open, GBP/USD, Breakout aus 15-Minuten-Range, Entry nach Volumen-Spike, TP nach 6 Pips, SL nach 3 Pips</i></div>
    </section>

    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Maximal 1% des Kapitals pro Trade riskieren</li>
        <li>Tagesverlust-Limit: Nach 3-5 Verlusten Trading stoppen</li>
        <li>Positionsgröße mit Lot-Rechner exakt berechnen</li>
        <li>Spread und Kommission immer einrechnen</li>
        <li>Keine Überhebelung: Maximal 10:1</li>
        <li>Regelmäßige Kontrolle der Broker-Kosten</li>
      </ul>
      <div className="mb-2">Fehlerquelle: Zu hohe Positionsgröße, Ignorieren von Kosten, kein Tageslimit</div>
    </section>

    <section>
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Vor dem Trading: 2-minütige Atemübung, Visualisierung des perfekten Trades</li>
        <li>Timer: Nach 60 Minuten Pause einlegen</li>
        <li>Verluste akzeptieren, kein Revenge-Trading</li>
        <li>Trading-Journal führen, Fehler und Learnings dokumentieren</li>
        <li>Mentale Checkliste vor jedem Trade</li>
      </ul>
      <div className="mb-2">Praxis: <i>Journaling, Fehleranalyse, wöchentliche Review</i></div>
    </section>

    <section>
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Nutze Soft4FX, TradingView Replay für historische Daten</li>
        <li>Teste mindestens 100 Trades mit festen Regeln</li>
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
        <li>Handle nur in ruhigen Marktphasen, vermeide News-Trading (außer gezielt)</li>
        <li>Nutze Alerts für Einstiegszonen</li>
        <li>Empfohlene Tools: TradingView, MetaTrader, cTrader, Bookmap, Soft4FX</li>
        <li>Literatur: &quot;Forex Price Action Scalping&quot; von Bob Volman, &quot;The Art of Scalping&quot; von Dan Valcu</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-bold mb-2">8. Häufige Fehlerquellen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Zu hohe Positionsgröße, Überhebelung</li>
        <li>Kein Tageslimit, zu viele Trades</li>
        <li>Emotionale Entscheidungen, Revenge-Trading</li>
        <li>Ignorieren von Kosten und Slippage</li>
        <li>Fehlende Dokumentation und Analyse</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Kompletter Trading-Tag</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>07:45 Uhr: Marktvorbereitung, News-Check, Chartanalyse</li>
        <li>08:00 Uhr: London-Open, Beobachtung der Range</li>
        <li>08:10 Uhr: Breakout-Setup, Entry mit Market-Order, SL/TP gesetzt</li>
        <li>08:12 Uhr: Trade geschlossen, Ergebnis dokumentiert</li>
        <li>08:15 Uhr: Kurze Pause, Fehleranalyse</li>
        <li>08:30 Uhr: Nächstes Setup, Pullback-Scalping</li>
        <li>09:00 Uhr: Trading-Session beendet, Journal ausgefüllt</li>
      </ol>
    </section>

    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie viele Trades pro Tag?</b> 5-20, je nach Setup und Marktphase</li>
        <li><b>Welcher Broker ist geeignet?</b> ECN-Broker mit niedrigem Spread, z.B. IC Markets, Pepperstone</li>
        <li><b>Wie kann ich Scalping üben?</b> Demo-Konto, Backtesting, Replay-Modus</li>
        <li><b>Wie finde ich die besten Setups?</b> Fokus auf Volumen, Range, News, Orderflow</li>
      </ul>
    </section>
  </div>
);

export default ForexScalper;
