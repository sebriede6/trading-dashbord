import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const RohstoffeEventTrader = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-red-700 mb-4">Event-Trading bei Rohstoffen – Vollständiges Lernmodul</h2>
    <StrategyFigure
      title="Event-Impact Pulse"
      variant="commodityEvent"
      caption="Skizziert die Initialreaktion auf Geopolitik- oder Wetter-News sowie das anschließende Mean-Reversion-Fenster."
      href="https://trading.de/lernen/rohstoff-handel/"
      linkLabel="Trading.de: Rohstoff Handel"
    />
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p>Event-Trader handeln gezielt auf Nachrichten, Wetterereignisse oder geopolitische Entwicklungen, die Rohstoffpreise stark bewegen können. Die Strategie erfordert Flexibilität und schnelle Entscheidungen.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten</h3>
      <ul className="list-disc ml-6">
        <li>Beobachtung von Newsfeeds, Wetterdiensten, COT-Reports.</li>
        <li>Schnelle Reaktion auf Ereignisse, oft mit Pending Orders oder Market Orders.</li>
        <li>Stop-Loss großzügig, da Volatilität hoch ist.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6">
        <li>Identifikation relevanter Events mit Newsfeeds und Wetterdiensten.</li>
        <li>Einstieg nach Event, Bestätigung durch Volumen und Preisstruktur.</li>
        <li>Stop-Loss nach ATR, Take-Profit nach CRV oder an Widerstand.</li>
        <li>Teilgewinnmitnahme bei 1R, Rest laufen lassen.</li>
      </ol>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6">
        <li>Maximal 1,5% Risiko pro Trade.</li>
        <li>Portfolio-Diversifikation: Verschiedene Rohstoffe und Events.</li>
        <li>Positionsgröße nach Volatilität und Depotgröße.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6">
        <li>Flexibilität: Schnelle Entscheidungen treffen.</li>
        <li>Wöchentliche Analyse: Review aller abgeschlossenen Trades.</li>
        <li>Trading-Journal führen, Fehler und Learnings dokumentieren.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ul className="list-disc ml-6">
        <li>Mindestens 50 Event-Trades auf historischen Daten testen.</li>
        <li>Trefferquote, CRV, Drawdown, Zeit im Markt auswerten.</li>
        <li>Regeln anpassen und erneut testen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps</h3>
      <ul className="list-disc ml-6">
        <li>Nutze Newsfeeds und Wetterdienste für Event-Erkennung.</li>
        <li>Handle bevorzugt bei klaren Events mit hoher Volatilität.</li>
        <li>Nutze Alerts für Einstiegszonen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">8. Tools & Literatur</h3>
      <ul className="list-disc ml-6">
        <li>TradingView, Investing.com, Weather.com.</li>
        <li>&quot;The New Market Wizards&quot; – Jack Schwager</li>
        <li>&quot;Hot Commodities&quot; – Jim Rogers</li>
      </ul>
      <div className="mt-4 text-xs text-gray-500">Quellen: Schwager, Rogers, eigene Backtests, Erfahrungsberichte von Event-Tradern.</div>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">9. Event-Kategorie-Framework</h3>
      <ul className="list-disc ml-6">
        <li><b>Geopolitik:</b> Kriege, Sanktionen, Embargos, politische Umstürze.</li>
        <li><b>Wetter:</b> Hurrikans (Energie), Dürren/Überschwemmungen (Agrar), Frost (Softs).</li>
        <li><b>Makro:</b> Zentralbankentscheidungen, Wirtschaftsdaten, Währungsschocks.</li>
        <li><b>Logistik:</b> Pipeline-Lecks, Hafenstreiks, Transportrestriktionen.</li>
      </ul>
      <p>Jede Kategorie erhält Checklisten für Vorbereitung, Entry, Risk, Exit.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">10. Pre-Event & Post-Event Ablauf</h3>
      <ol className="list-decimal ml-6">
        <li>Vorbereitung: Szenarien, Levels, Newsfeeds, Hedge-Plan.</li>
        <li>Live-Phase: Fokus auf Preisreaktion vs. Erwartung, Volumen, Liquidity Gaps.</li>
        <li>Nachbereitung: Gewinnmitnahme in Stufen, Stops nachziehen, Risiko reduzieren.</li>
        <li>Debrief: Event in Journal, Abgleich mit Erwartung, Lessons Learned.</li>
      </ol>
      <p>Ein ritualisierter Ablauf reduziert Stress in hochvolatilen Phasen.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">11. Datenquellen & Techstack</h3>
      <ul className="list-disc ml-6">
        <li>News: Bloomberg Terminal, Reuters, LiveSquawk, OilPrice, AgWeb.</li>
        <li>Sentiment: Twitter/Telegram Feeds, Google Trends, Optionsdaten (Skew, IV).</li>
        <li>Visualisierung: TradingView, Bookmap, Sierra Chart für Orderflow.</li>
        <li>Automation: RSS-Parser, Zapier, Custom Alerts in Notion/Slack/Discord.</li>
      </ul>
      <p>Technologische Tools verschaffen Geschwindigkeit und Informationsvorsprung.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">12. Risiko-Framework & Hedging</h3>
      <ul className="list-disc ml-6">
        <li>Maximale Exposure pro Event (z.B. ≤4R Gesamt-Risiko).</li>
        <li>Stops immer im Markt; falls News-Flashes den Broker überfordern, synthetische Notfall-Stops setzen.</li>
        <li>Nutze Optionsstrategien (Straddles/Strangles) oder Correlation Hedges (USD, Bonds) bei extremen Unsicherheiten.</li>
        <li>Event-Abstinenz-Regeln: Kein Trading, wenn Informationslage unklar.</li>
      </ul>
      <p>Event-Trading ohne klares Risiko-Framework führt schnell zu extremen Drawdowns.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">13. Szenario-Matrix & Entscheidungsbaum</h3>
      <ol className="list-decimal ml-6">
        <li>Basisszenario (Erwartet), Positiv (stärker als erwartet), Negativ (schwächer), Überraschung.</li>
        <li>Für jedes Szenario Entry, Positionsgröße, Management, Exit festlegen.</li>
        <li>Visualisiere Entscheidungsbaum (Mindmap) für schnelles Handeln.</li>
        <li>Backtesting: Historische Events analysieren, Response-Muster identifizieren.</li>
      </ol>
      <p>Vorbereitete Entscheidungsbäume garantieren, dass du in Sekunden reagieren kannst.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">14. Fallstudie: Hurrikan in Golfküste</h3>
      <ol className="list-decimal ml-6">
        <li>Event: Hurrikan bedroht Raffinerien; Erwartung: Produktionsausfälle, steigende Benzinpreise.</li>
        <li>Pre-Event: RBOB-Gasoline-Long, Hedge mit Brent/WTI Spread, Stop unter technischer Struktur.</li>
        <li>Live: Volumen-Bestätigung, Teilgewinn bei +2R, Rest via Trailing Stop.</li>
        <li>Post: Analyse vs. Prognose, Lessons Learned in Journal, Check zukünftiger Reparaturzeiten.</li>
      </ol>
      <p>Realbeispiele helfen, das Framework in die Praxis zu übertragen.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">15. Teamarbeit & Kommunikation</h3>
      <ul className="list-disc ml-6">
        <li>Event-Trading-Room (Discord/Slack) mit Rollen: Analyst, Execution, Risk.</li>
        <li>Checklisten-Sharing und Echtzeit-Updates minimieren Blindspots.</li>
        <li>Daily Stand-up, Event-Debrief, Wissensdatenbank pflegen.</li>
        <li>Backup-Kommunikation für Strom/Internet-Ausfälle bereit halten.</li>
      </ul>
      <p>Auch Solo-Trader profitieren von Communities oder Mentoren für Second Opinions.</p>
    </section>
  </div>
);

export default RohstoffeEventTrader;
