import React from "react";

const ForexNewsTrader = () => (
  <>
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
  </>
);

export default ForexNewsTrader;
