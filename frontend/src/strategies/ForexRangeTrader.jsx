import React from "react";

export default function ForexRangeTrader() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-indigo-300 mb-4">Forex Range Trader Strategie – Das ultimative Lernmodul</h2>
      <section>
        <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
        <p className="mb-2">Range-Trading im Forex-Markt bedeutet, gezielt auf Seitwärtsphasen und das Handeln zwischen klaren Unterstützungs- und Widerstandszonen zu setzen. Ziel ist es, von wiederkehrenden Mustern und Preisschwankungen innerhalb einer Range zu profitieren. Die Strategie basiert auf:</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Handel in ruhigen Marktphasen, abseits von News und starken Trends</li>
          <li>Fokus auf technische Analyse: Unterstützungen, Widerstände, Oszillatoren</li>
          <li>Geduld und Disziplin: Warten auf klare Signale</li>
        </ul>
        <p className="mb-2">Typische Range-Trader sind ruhig, systematisch und ausdauernd.</p>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Charttechnik</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><b>Classic Range:</b> Einstieg am unteren/oberen Rand der Range</li>
          <li><b>Fakeout-Range:</b> Einstieg nach Fehlausbruch</li>
          <li><b>Oszillator-Range:</b> Nutzung von RSI, Stochastik, CCI für Überkauft/Überverkauft</li>
        </ul>
        <div className="mb-2">Chartbeispiel: <i>M30-Chart mit eingezeichneter Range, Entry, SL/TP, Oszillator-Signal</i></div>
        <div className="mb-2">Tools: TradingView, MetaTrader, Oszillator-Indikatoren</div>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
        <ol className="list-decimal ml-6 mb-2">
          <li>Warte auf Berührung der Range-Grenze</li>
          <li>Entry nach Bestätigung durch Oszillator (z.B. RSI &gt; 70/ &lt; 30)</li>
          <li>Stop-Loss knapp außerhalb der Range</li>
          <li>Take-Profit am gegenüberliegenden Range-Rand</li>
          <li>Trade schließen, wenn Range bricht oder News anstehen</li>
        </ol>
        <div className="mb-2">Praxisbeispiel: <i>EUR/USD, M30, Einstieg am unteren Range-Rand, TP am oberen Rand, SL knapp darunter</i></div>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>Maximal 1% Risiko pro Trade</li>
          <li>Positionsgröße nach Range-Breite und Depotgröße</li>
          <li>Regelmäßige Kontrolle der offenen Risiken</li>
        </ul>
        <div className="mb-2">Fehlerquelle: Zu enger Stop-Loss, kein CRV, zu hohes Risiko</div>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>Geduld: Auf den perfekten Range-Einstieg warten</li>
          <li>Keine Angst vor Fakeouts, aber konsequent aussteigen</li>
          <li>Trading-Journal führen, Fehler und Learnings dokumentieren</li>
          <li>Mentale Checkliste vor jedem Trade</li>
        </ul>
        <div className="mb-2">Praxis: <i>Journaling, Fehleranalyse, wöchentliche Review</i></div>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
        <ol className="list-decimal ml-6 mb-2">
          <li>Mindestens 50 Range-Trades auf historischen Daten testen</li>
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
          <li>Handle bevorzugt in ruhigen Marktphasen</li>
          <li>Nutze Alerts für Range-Grenzen</li>
          <li>Empfohlene Tools: TradingView, MetaTrader, Oszillator-Indikatoren</li>
          <li>Literatur: "Range Trading" von Michael Young, "Technical Analysis of the Financial Markets" von John Murphy</li>
        </ul>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">8. Häufige Fehlerquellen</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>Zu enger Stop-Loss, kein CRV</li>
          <li>Emotionale Entscheidungen, zu frühes Schließen</li>
          <li>Fehlende Dokumentation und Analyse</li>
        </ul>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Kompletter Trading-Tag</h3>
        <ol className="list-decimal ml-6 mb-2">
          <li>07:30 Uhr: Marktvorbereitung, News-Check, Chartanalyse</li>
          <li>08:00 Uhr: Range-Analyse, Setup-Suche</li>
          <li>09:15 Uhr: Entry am Range-Rand, SL/TP gesetzt</li>
          <li>10:00 Uhr: Trade läuft, Teilgewinnmitnahme</li>
          <li>11:00 Uhr: Trade geschlossen, Ergebnis dokumentiert</li>
          <li>12:00 Uhr: Wöchentliche Review, Fehleranalyse</li>
        </ol>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><b>Wie erkenne ich die beste Range?</b> Fokus auf Volumen, Oszillatoren, Chartmuster</li>
          <li><b>Welcher Broker ist geeignet?</b> ECN-Broker mit stabilem Handel, z.B. Pepperstone, IC Markets</li>
          <li><b>Wie kann ich Range-Trading üben?</b> Demo-Konto, Backtesting, Replay-Modus</li>
          <li><b>Wie finde ich die besten Setups?</b> Fokus auf Range, Oszillatoren, News</li>
        </ul>
      </section>
    </div>
  );
}
