import React from "react";

const RohstoffeEventTrader = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-red-700 mb-4">Event-Trading bei Rohstoffen – Vollständiges Lernmodul</h2>
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
  </div>
);

export default RohstoffeEventTrader;
