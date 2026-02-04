export default function ForexBreakout() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-indigo-300 mb-4">Forex Breakout Strategie – Das ultimative Lernmodul</h2>
      <section>
        <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
        <p className="mb-2">Breakout-Trading im Forex-Markt bedeutet, gezielt auf starke Kursbewegungen nach dem Durchbruch wichtiger Preiszonen zu setzen. Ziel ist es, von Momentum und Volatilität zu profitieren. Die Strategie basiert auf:</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Handel von Ausbrüchen aus Range, Konsolidierung oder Chartmustern</li>
          <li>Fokus auf hohe Volatilität, News-Impulse, Liquiditätszonen</li>
          <li>Technische Analyse: Unterstützungen/Widerstände, Volumen, Indikatoren</li>
        </ul>
        <p className="mb-2">Typische Breakout-Trader sind chancenorientiert, risikobewusst und mögen schnelle Bewegungen.</p>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Charttechnik</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><b>Range-Breakout:</b> Einstieg bei Ausbruch aus enger Seitwärtsphase</li>
          <li><b>Chartmuster-Breakout:</b> Dreieck, Flagge, Wimpel, Rechteck</li>
          <li><b>News-Breakout:</b> Starke Bewegung nach Wirtschaftsdaten</li>
          <li><b>Volumen-Breakout:</b> Einstieg bei Volumenanstieg</li>
        </ul>
        <div className="mb-2">Chartbeispiel: <i>M15-Chart mit eingezeichnetem Range-Breakout, Entry, SL/TP, Volumen-Spike</i></div>
        <div className="mb-2">Tools: TradingView, MetaTrader, Volumen-Indikatoren, Wirtschaftskalender</div>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
        <ol className="list-decimal ml-6 mb-2">
          <li>Warte auf Ausbruch aus Range oder Chartmuster</li>
          <li>Entry nach Close der Ausbruchskerze, Bestätigung durch Volumen</li>
          <li>Stop-Loss knapp unter/über Ausbruchslevel</li>
          <li>Take-Profit nach CRV 2:1 oder an nächster Zone</li>
          <li>Trade schließen, wenn Ausbruch fehlschlägt (Fakeout)</li>
        </ol>
        <div className="mb-2">Praxisbeispiel: <i>USD/JPY, M15, Range-Breakout nach News, Entry nach Volumen-Spike, TP an nächstem Widerstand</i></div>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>Maximal 1,5% Risiko pro Trade</li>
          <li>Positionsgröße nach Volatilität und Depotgröße</li>
          <li>Regelmäßige Kontrolle der offenen Risiken</li>
        </ul>
        <div className="mb-2">Fehlerquelle: Zu enger Stop-Loss, kein CRV, zu hohes Risiko</div>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>Geduld: Auf den perfekten Ausbruch warten</li>
          <li>Keine Angst vor Fakeouts, aber konsequent aussteigen</li>
          <li>Trading-Journal führen, Fehler und Learnings dokumentieren</li>
          <li>Mentale Checkliste vor jedem Trade</li>
        </ul>
        <div className="mb-2">Praxis: <i>Journaling, Fehleranalyse, wöchentliche Review</i></div>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
        <ol className="list-decimal ml-6 mb-2">
          <li>Mindestens 50 Breakout-Trades auf historischen Daten testen</li>
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
          <li>Handle bevorzugt zu den liquidesten Zeiten</li>
          <li>Nutze Alerts für Ausbruchslevel</li>
          <li>Empfohlene Tools: TradingView, MetaTrader, Volumen-Indikatoren</li>
          <li>Literatur: "Encyclopedia of Chart Patterns" von Thomas Bulkowski, "Technical Analysis of the Financial Markets" von John Murphy</li>
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
          <li>09:15 Uhr: Entry nach Breakout, SL/TP gesetzt</li>
          <li>10:00 Uhr: Trade läuft, Teilgewinnmitnahme</li>
          <li>11:00 Uhr: Trade geschlossen, Ergebnis dokumentiert</li>
          <li>12:00 Uhr: Wöchentliche Review, Fehleranalyse</li>
        </ol>
      </section>
      <section>
        <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><b>Wie erkenne ich den besten Breakout?</b> Fokus auf Volumen, Range, News, Chartmuster</li>
          <li><b>Welcher Broker ist geeignet?</b> ECN-Broker mit stabilem Handel, z.B. Pepperstone, IC Markets</li>
          <li><b>Wie kann ich Breakout-Trading üben?</b> Demo-Konto, Backtesting, Replay-Modus</li>
          <li><b>Wie finde ich die besten Setups?</b> Fokus auf Range, Chartmuster, News</li>
        </ul>
      </section>
    </div>
  );
}
