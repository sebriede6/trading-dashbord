import StrategyFigure from "../components/StrategyFigure.jsx";

const RohstoffeOil = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-orange-400 mb-4">Öl-Trading Strategie – Das ultimative Lernmodul</h2>
    <StrategyFigure
      title="WTI-Volatilität am Inventar-Release"
      variant="commodityOil"
      caption="Darstellung eines impulsiven Bewegungsprofils nach EIA-Lagerbestandsdaten."
      href="https://wissen.terminmarktservice.de/rohoel-kaufen-strategien-chancen-und-konkrete-ansaetze-fuer-ihren-einstieg-in-den-rohstoffmarkt/"
      linkLabel="Terminmarktservice: Rohöl Trading"
    />
    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Öl ist einer der wichtigsten Rohstoffe weltweit und wird stark von Angebot, Nachfrage, geopolitischen Ereignissen und Makrodaten beeinflusst. Trader nutzen Charttechnik, News und Fundamentaldaten, um von Preisschwankungen zu profitieren.</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Fokus auf Makrodaten, News und Charttechnik</li>
        <li>Handel auf Futures, CFDs oder ETFs</li>
        <li>Geopolitische Ereignisse als Preistreiber</li>
      </ul>
      <p className="mb-2">Typische Öl-Trader sind analytisch, risikobewusst und entscheidungsfreudig.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Analyse</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Charttechnik:</b> Breakouts, Trendlinien, Unterstützungen/Widerstände</li>
        <li><b>Makrodaten:</b> Lagerbestände (EIA, API), OPEC-Entscheidungen, USD-Stärke</li>
        <li><b>News:</b> Geopolitik, Naturkatastrophen, Fördermengen</li>
      </ul>
      <div className="mb-2">Tools: TradingView, Investing.com, EIA-Reports</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Kauf bei Breakout, Trendbestätigung oder News-Impuls</li>
        <li>Verkauf bei Schwäche, Trendbruch oder Zielerreichung</li>
        <li>Stop-Loss unter letzter Korrektur oder Support</li>
        <li>Take-Profit an Widerstand oder nach CRV</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>Kauf von Öl bei Lagerbestandsrückgang, Verkauf bei Widerstand</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Maximal 2% Risiko pro Trade</li>
        <li>Portfolio-Diversifikation: Öl, Gas, Energie-ETFs</li>
        <li>Positionsgröße nach Volatilität und Trendstärke</li>
      </ul>
      <div className="mb-2">Fehlerquelle: Zu große Positionen, kein Stop-Loss</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Geduld: Trends laufen lassen</li>
        <li>Disziplin: An der Strategie festhalten</li>
        <li>Regelmäßige Analyse der Trades</li>
        <li>Mentale Checkliste vor jedem Trade</li>
      </ul>
      <div className="mb-2">Praxis: <i>Journaling, Fehleranalyse, wöchentliche Review</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Backtesting mit historischen Kursdaten und Makrodaten</li>
        <li>Statistik: Trefferquote, Profitfaktor, Drawdown</li>
        <li>Regeln anpassen und erneut testen</li>
        <li>Ergebnisse im Journal dokumentieren</li>
      </ol>
      <div className="mb-2">Fehlerquelle: Zu wenig Backtests, keine Anpassung der Regeln</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps & Tools</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Nutze TradingView, Investing.com, EIA-Reports</li>
        <li>Fokus auf große Liquidität und klare Trends</li>
        <li>Empfohlene Indikatoren: Trendlinien, RSI, MACD</li>
        <li>Literatur: "Oil Trading Manual" von David Long, "Technical Analysis" von John J. Murphy</li>
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
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Komplette Öl-Trading-Woche</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Montag: Marktvorbereitung, Makrodaten prüfen</li>
        <li>Dienstag: Entry bei Breakout, Stop-Loss setzen</li>
        <li>Mittwoch: Gewinn dokumentieren, Trades analysieren</li>
        <li>Freitag: Wöchentliche Review, Fehleranalyse</li>
      </ol>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie finde ich Öl-Trading-Signale?</b> Charttechnik, Makrodaten, News</li>
        <li><b>Welcher Broker ist geeignet?</b> Trade Republic, Comdirect, ING</li>
        <li><b>Wie kann ich Öl-Trading üben?</b> Musterdepot, Backtesting, Literatur</li>
        <li><b>Wie minimiere ich das Risiko?</b> Striktes Money Management, Stop-Loss</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">11. Fundamentale Angebots-/Nachfrage-Analyse</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Beobachte OPEC/OPEC+ Produktionsquoten, Compliance-Raten und Spare Capacity.</li>
        <li>EIA/API Weekly Petroleum Status Reports: Lagerbestände, Raffinerieauslastung, Import/Export.</li>
        <li>Nachfrageseite: IEA Monthly Oil Market Reports, globale PMI, Flugverkehrsdaten (FlightRadar).</li>
        <li>Berücksichtige saisonale Muster (Driving Season, Winter Heating Demand).</li>
      </ul>
      <p className="mb-2">Ein sauberes Angebots-/Nachfrage-Modell liefert Kontext für technische Signale.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">12. Terminkurve & Spread-Trading</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Analysiere Contango vs. Backwardation – starker Backwardation signalisiert physische Knappheit.</li>
        <li>Calendar Spreads (CL1-CL2) handeln, um auf Lagerbestände zu spekulieren oder zu hedgen.</li>
        <li>Beobachte Crack Spreads (RBOB Gasoline/Heating Oil) für Raffineriemargen und Produktnachfrage.</li>
        <li>Nutze ICE Brent vs. NYMEX WTI Differenzen (Brent-WTI Spread) für geopolitische Divergenzen.</li>
      </ul>
      <p className="mb-2">Terminkurvenanalyse zeigt, wie physische Märkte den Preisrahmen setzen.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">13. Risiko- & Positionssteuerung</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Volatilitätsbasiertes Sizing: ATR, HV (historische Volatilität) oder Margin-Anforderungen.</li>
        <li>Nutze Stop-Clustering: initial, Break-Even, Trailing anhand struktureller Tiefs.</li>
        <li>Absicherung via Optionsstrategien (Put-Spreads) gegen News-Gaps.</li>
        <li>Maximale Positionsanzahl pro Richtung definieren, um Eventrisiko (OPEC-Meeting) zu begrenzen.</li>
      </ul>
      <p className="mb-2">Öl handelt oft sprunghaft – Risikomanagement ist wichtiger als der perfekte Entry.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">14. Nachrichtenfluss & Szenarioplanung</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Tägliche Newsfeeds: Reuters Energy, Platts, OilPrice.com, TankerTrackers.</li>
        <li>Event-Kategorie: Geopolitik (Nahost, Russland), Naturkatastrophen, Pipeline-/Terminal-Ausfälle.</li>
        <li>Szenario-Matrix: Base Case, Supply Shock, Demand Shock mit Reaktionsplan.</li>
        <li>Krisenprotokoll: Sofortiges Hedging oder Exit, falls geopolitische Eskalation eintritt.</li>
      </ol>
      <p className="mb-2">Ein strukturierter Newsflow verhindert, dass du von Schlagzeilen überrascht wirst.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">15. Analyse-Stack & Journaling</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Charting & Alerts in TradingView/TrendSpider, Terminkurve via Quandl oder CME Tools.</li>
        <li>Makro-Dashboards (Koyfin, MacroMicro) für Wirtschaftsindikatoren.</li>
        <li>Trade-Journal mit Kennzahlen: R-Multiple, Haltezeit, Event-bezogene Performance.</li>
        <li>Wöchentliche Lessons Learned, optional Video-Nachbesprechung zur Mustererkennung.</li>
      </ul>
      <p className="mb-2">Konsequentes Tracking führt zu messbaren Verbesserungen und schnellerem Lernen.</p>
    </section>
  </div>
)
export default RohstoffeOil;
