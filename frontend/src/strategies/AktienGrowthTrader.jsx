import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const AktienGrowthTrader = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-purple-700 mb-4">Growth Investing bei Aktien – Vollständiges Lernmodul</h2>
    <StrategyFigure
      title="Breakout-Rallye im Wachstumsmarkt"
      variant="equityGrowth"
      caption="Zeigt die CAN SLIM typische High-Tight-Flag, gefolgt von Momentum-Skalierung."
      href="https://www.n-tv.de/broker-vergleich/trading-lernen/aktien/growth/"
      linkLabel="n-tv: Growth Trading"
    />
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p>Growth-Trader investieren in Unternehmen mit überdurchschnittlichem Wachstumspotenzial, oft in neuen Technologien oder Märkten. Die Strategie basiert auf Innovation, Momentum und Risikobereitschaft.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten</h3>
      <ul className="list-disc ml-6">
        <li>Analyse von Umsatzwachstum, Margen, Marktanteil, Innovation.</li>
        <li>Fokus auf Branchen mit starkem Momentum (z.B. Tech, Biotech).</li>
        <li>Kauf nach Ausbrüchen, Trendfortsetzung, positive Quartalszahlen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6">
        <li>Screening nach Wachstumsaktien mit Screener-Tools.</li>
        <li>Analyse von Quartalszahlen, Innovation und Marktanteil.</li>
        <li>Kauf bei Ausbruch, Verkauf bei Schwächeanzeichen oder Zielerreichung.</li>
      </ol>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6">
        <li>Maximal 5% des Portfolios pro Aktie.</li>
        <li>Breite Diversifikation über Sektoren und Regionen.</li>
        <li>Regelmäßiges Rebalancing und Gewinnmitnahme.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6">
        <li>Vision: Fokus auf langfristiges Wachstum.</li>
        <li>Risikobereitschaft: Rückschläge akzeptieren.</li>
        <li>Jährliche Review und Anpassung des Portfolios.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ul className="list-disc ml-6">
        <li>Backtesting mit historischen Wachstumsdaten.</li>
        <li>Regeln anpassen und erneut testen.</li>
        <li>Langfristige Outperformance nachweisbar (Lynch, O&#39;Neil).</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps</h3>
      <ul className="list-disc ml-6">
        <li>Nutze Screener wie Finviz, TradingView.</li>
        <li>Fokus auf Unternehmen mit starker Innovation und Marktanteil.</li>
        <li>Vermeide Hype-Aktien und zu teure Käufe.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">8. Tools & Literatur</h3>
      <ul className="list-disc ml-6">
        <li>Finviz, TradingView, Yahoo Finance.</li>
        <li>&quot;One Up On Wall Street&quot; – Peter Lynch</li>
        <li>&quot;How to Make Money in Stocks&quot; – William O&#39;Neil</li>
      </ul>
      <div className="mt-4 text-xs text-gray-500">Quellen: Lynch, O&#39;Neil, eigene Backtests, Erfahrungsberichte von Growth-Tradern.</div>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">9. Momentum-Filter & Trigger</h3>
      <ul className="list-disc ml-6">
        <li>Screening nach EPS-Überraschungen &gt; 10%, Umsatzwachstum &gt; 20%, Relative Strength Rating &gt; 80.</li>
        <li>Price-Action: Cup-and-Handle, High Tight Flag, Darvas-Box als Signale für fortgesetztes Momentum.</li>
        <li>Volume-Signatur: Breakouts nur mit Volumen &gt; 150% des 50-Tage-Durchschnitts handeln.</li>
        <li>Market Breadth verfolgen (Advance/Decline, High-Lows), um Risikomodus des Gesamtmarkts einzuschätzen.</li>
      </ul>
      <p className="mb-2">Momentum-Filter verhindern, dass du in stagnierende Wachstumsstories einsteigst.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">10. Event- & Earnings-Trading</h3>
      <ul className="list-disc ml-6">
        <li>Vor Earnings: Position reduzieren oder hedgen, wenn Volatilitätserwartung hoch.</li>
        <li>Post-Earnings Drift ausnutzen: Positive Überraschungen mit Gap-and-Go Setup traden.</li>
        <li>Investor Days, Produkt-Launches, Analystenkonferenzen als Katalysatoren im Kalender markieren.</li>
        <li>Nutze Optionsdaten (Open Interest, IV Crush) als zusätzlichen Sentiment-Indikator.</li>
      </ul>
      <p className="mb-2">Event-Katalysatoren können Trends beschleunigen – plane Ex-Ante, wie du reagierst.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">11. Risiko-Controlling & Positionsmanagement</h3>
      <ul className="list-disc ml-6">
        <li>Nutze Trailing Stops (z.B. 21 EMA oder ATR x 2), um Gewinne zu schützen.</li>
        <li>Skaliere in Stufen: 1/3 beim Breakout, 1/3 beim Pullback, 1/3 nach Bestätigung.</li>
        <li>Absolute Drawdown-Grenze (z.B. 8-10%) pro Position definieren, unabhängig vom Stop.</li>
        <li>Hedging via Short-Index, Sektor-Puts oder inverse ETFs bei Marktkorrekturen vorbereiten.</li>
      </ul>
      <p className="mb-2">Professionelles Positionsmanagement verhindert, dass ein Verlierer mehrere Gewinner auslöscht.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">12. Research-Tech & Automatisierung</h3>
      <ul className="list-disc ml-6">
        <li>TrendSpider/TradingView Pine Scripts für automatische Trendlinien und Breakout-Alerts.</li>
        <li>Koyfin, TIKR, Simply Wall St. für KPI-Tracking und Vergleich mit Peers.</li>
        <li>Newsfeeds (Benzinga Pro, FlyontheWall) für Echtzeit-Katalysatoren.</li>
        <li>Dokumentiere jede Position in Notion mit These, Trigger, Risiko, Exit-Regeln und Post-Mortem.</li>
      </ul>
      <p className="mb-2">Automatisierte Alerts sorgen dafür, dass keine High-Conviction-Story unbeobachtet bleibt.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">13. Performance-Review & Kennzahlen</h3>
      <ul className="list-disc ml-6">
        <li>Rendite vs. Benchmark (NASDAQ 100, IBD 50) monatlich vergleichen.</li>
        <li>Hit-Ratio nach Setup, durchschnittliche Haltedauer, Rendite pro Aktie dokumentieren.</li>
        <li>Drawdown-Analyse: Wie schnell erholst du dich nach -5%, -10%, -15%?</li>
        <li>Führe ein Scorecard-System (Execution, Process, Emotion) für jeden Trade.</li>
      </ul>
      <p className="mb-2">Kennzahlen machen sichtbar, ob dein Prozess oder der Markt für Underperformance verantwortlich ist.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">14. Praxis-Fallstudie</h3>
      <ol className="list-decimal ml-6">
        <li><b>Setup:</b> Cloud-Software-Unternehmen meldet 40% YoY Umsatzwachstum, Guidance angehoben.</li>
        <li><b>Trigger:</b> Breakout über Allzeithoch mit 200% Volumen; Entry über Buy-Stop.</li>
        <li><b>Management:</b> Teilgewinn bei +10%, Rest via Trailing Stop; News-Alerts aktiv.</li>
        <li><b>Exit:</b> Fundamentals intakt, Trailing Stop greift nach 18% Anstieg; Nachanalyse im Journal.</li>
      </ol>
      <p className="mb-2">Case Studies helfen, Muster zu internalisieren und Playbooks zu verfeinern.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">15. Wochenroutine & Mentales Framework</h3>
      <ul className="list-disc ml-6">
        <li>Sonntag: Macro Review, Branchenranking, Watchlist-Update (A/B/C-Setups).</li>
        <li>Montag–Freitag: 30-Minuten Pre-Market-Meeting (Marktbreite, Gewinner/Verlierer, Katalysatoren).</li>
        <li>Mittwoch: Midweek-Review, Positionscheck vs. Thesis-Score.</li>
        <li>Freitag: Wochenabschluss, KPI-Updates, Lessons Learned, Mindset-Reset.</li>
      </ul>
      <p className="mb-2">Konsequente Routinen verankern Disziplin und sorgen für stetige Verbesserung.</p>
    </section>
  </div>
);

export default AktienGrowthTrader;
