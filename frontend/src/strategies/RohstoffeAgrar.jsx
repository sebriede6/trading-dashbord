import StrategyFigure from "../components/StrategyFigure.jsx";

const RohstoffeAgrar = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-lime-400 mb-4">Agrar-Rohstoffe Trading Strategie – Das ultimative Lernmodul</h2>
    <StrategyFigure
      title="Saisonalität im Mais-Futures"
      variant="commodityAgrar"
      caption="Zeigt typische Erntezeit-Korrekturen und anschließende Erholungen basierend auf saisonalen Mustern."
      href="https://www.cmegroup.com/education/courses/introduction-to-agricultural-products/what-are-agricultural-commodities.html"
      linkLabel="CME Group: Agricultural Commodities"
    />
    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Agrar-Rohstoffe wie Weizen, Mais, Soja und Kaffee sind stark von Wetter, Angebot, Nachfrage und geopolitischen Faktoren beeinflusst. Trader nutzen Charttechnik, Saisonalität und News, um von Preisschwankungen zu profitieren.</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Fokus auf Saisonalität, Wetter und Charttechnik</li>
        <li>Handel auf Futures, CFDs oder ETFs</li>
        <li>News und Wetter als Preistreiber</li>
      </ul>
      <p className="mb-2">Typische Agrar-Trader sind analytisch, flexibel und risikobewusst.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Analyse</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Charttechnik:</b> Breakouts, Trendlinien, Unterstützungen/Widerstände</li>
        <li><b>Saisonalität:</b> Erntezeiten, Wetterzyklen, historische Muster</li>
        <li><b>News:</b> Wetterberichte, Ernteprognosen, Exportdaten</li>
      </ul>
      <div className="mb-2">Tools: TradingView, Barchart, USDA-Reports</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Kauf bei Breakout, Trendbestätigung oder Saisonalitäts-Impuls</li>
        <li>Verkauf bei Schwäche, Trendbruch oder Zielerreichung</li>
        <li>Stop-Loss unter letzter Korrektur oder Support</li>
        <li>Take-Profit an Widerstand oder nach CRV</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>Kauf von Weizen bei Wetterknappheit, Verkauf bei Ernteprognose</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Maximal 2% Risiko pro Trade</li>
        <li>Portfolio-Diversifikation: Weizen, Mais, Soja, Kaffee</li>
        <li>Positionsgröße nach Volatilität und Trendstärke</li>
      </ul>
      <div className="mb-2">Fehlerquelle: Zu große Positionen, kein Stop-Loss</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Geduld: Trends und Saisonalität abwarten</li>
        <li>Disziplin: An der Strategie festhalten</li>
        <li>Regelmäßige Analyse der Trades</li>
        <li>Mentale Checkliste vor jedem Trade</li>
      </ul>
      <div className="mb-2">Praxis: <i>Journaling, Fehleranalyse, wöchentliche Review</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Backtesting mit historischen Kursdaten und Saisonalitätsmustern</li>
        <li>Statistik: Trefferquote, Profitfaktor, Drawdown</li>
        <li>Regeln anpassen und erneut testen</li>
        <li>Ergebnisse im Journal dokumentieren</li>
      </ol>
      <div className="mb-2">Fehlerquelle: Zu wenig Backtests, keine Anpassung der Regeln</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps & Tools</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Nutze TradingView, Barchart, USDA-Reports</li>
        <li>Fokus auf Saisonalität und Wetterzyklen</li>
        <li>Empfohlene Indikatoren: Trendlinien, RSI, MACD</li>
        <li>Literatur: "Commodity Trading" von Carley Garner, "Seasonal Futures Trading" von Jake Bernstein</li>
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
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Komplette Agrar-Trading-Woche</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Montag: Marktvorbereitung, Wetterdaten prüfen</li>
        <li>Dienstag: Entry bei Breakout, Stop-Loss setzen</li>
        <li>Mittwoch: Gewinn dokumentieren, Trades analysieren</li>
        <li>Freitag: Wöchentliche Review, Fehleranalyse</li>
      </ol>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie finde ich Agrar-Trading-Signale?</b> Charttechnik, Saisonalität, News</li>
        <li><b>Welcher Broker ist geeignet?</b> Trade Republic, Comdirect, ING</li>
        <li><b>Wie kann ich Agrar-Trading üben?</b> Musterdepot, Backtesting, Literatur</li>
        <li><b>Wie minimiere ich das Risiko?</b> Striktes Money Management, Stop-Loss</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">11. Fundamentale Angebots-/Nachfrage-Modelle</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>USDA WASDE Reports monatlich auswerten (Ending Stocks, Stocks-to-Use Ratio).</li>
        <li>Export Sales Reports (wöchentlich) für Nachfrageimpulse großer Abnehmer (China, EU).</li>
        <li>Beobachte globalen Wettbewerb (Brasilien, Russland, Ukraine) und deren Erntestatus.</li>
        <li>Preisrelationen: Mais vs. Soja (Corn/Soy Ratio) zur Prognose von Anbauentscheidungen.</li>
      </ul>
      <p className="mb-2">Ein strukturiertes Fundamentaldaten-Modell liefert Kontext für saisonale Trades.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">12. Wetter- & Klima-Intelligence</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Nutze NOAA, ECMWF, Meteoblue für Niederschlag, Temperatur, Dürre-Indizes.</li>
        <li>El Niño/La Niña Zyklen und ihre Auswirkungen auf Regenmuster beobachten.</li>
        <li>Satel-litendaten (Vegetationsindizes NDVI) geben Echtzeit-Blick auf Ernteentwicklung.</li>
        <li>Erstelle ein Ampelsystem (Grün/Gelb/Rot) für Wetterstress pro Region.</li>
      </ul>
      <p className="mb-2">Wetter-Kenntnis verschafft Zeitvorsprung, bevor Zahlen in Reports erscheinen.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">13. Risiko-Management & Hedging-Strategien</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Positionsgröße anhand Kontraktwert (z.B. Corn: 5.000 Bushel) und ATR bestimmen.</li>
        <li>Hedge über Spread-Trades (z.B. Long Corn / Short Wheat) oder Optionsstrategien.</li>
        <li>Max. Exposure pro Rohstoffgruppe definieren, um Wetter-Klumpenrisiko zu vermeiden.</li>
        <li>Stop-Strategie: Technische Levels + Fundamentalanlass (Report-Veröffentlichung) kombinieren.</li>
      </ul>
      <p className="mb-2">Hedging schützt vor unvorhergesehenen Wetter- oder Politikschocks.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">14. Logistik & Lieferketten-Faktoren</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Binnenschifffahrt (Mississippi Pegel), Häfen, Streiks, Transportkosten berücksichtigen.</li>
        <li>Fracht-Indizes (Baltic Dry Index) und Containerpreise als Frühindikator für Nachfrage.</li>
        <li>Politische Maßnahmen (Exportverbote, Zölle, Subventionen) beobachten.</li>
        <li>Versicherungskosten und Qualitätsstandards (z.B. Feuchtigkeitsgehalt) für physische Deals im Blick behalten.</li>
      </ul>
      <p className="mb-2">Logistik kann Preise abrupt bewegen – besonders bei regionalen Engpässen.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">15. Research-Workflow & Review</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Monatliches Research-Dossier (PDF/Notion) mit Zusammenfassung von Reports, Wetter, Charts.</li>
        <li>Trade-Journal strukturiert nach Rohstoff, Saison, Setup, Ergebnis, Lessons Learned.</li>
        <li>Regelmäßige Peer-Review mit anderen Tradern oder Mentoren, um Bias zu reduzieren.</li>
        <li>Archivierung von Chartbildern, Wetterkarten, Report-Zusammenfassungen nach Saison.</li>
      </ul>
      <p className="mb-2">Disziplinierter Research sichert, dass Entscheidungen datenbasiert bleiben.</p>
    </section>
  </div>
)
export default RohstoffeAgrar;
