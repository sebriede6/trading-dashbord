import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const KryptoTrendTrader = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4">Krypto Trend Trader Strategie – Das ultimative Lernmodul</h2>
    <StrategyFigure
      title="Trend-Kontinuum im Kryptomarkt"
      variant="cryptoTrend"
      caption="Visualisiert aufeinanderfolgende Higher Highs/Higher Lows inklusive Trailing-Stop-Management."
      href="https://capital.com/en-eu/learn/trading-strategies/trend-trading"
      linkLabel="Capital Learn: Trend Trading"
    />
    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Trend-Trader handeln in Richtung des übergeordneten Trends. Sie nutzen Charttechnik, Indikatoren und fundamentale Analysen, um langfristige Bewegungen zu reiten und von stabilen Trends zu profitieren.</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Handel mit Trendrichtung</li>
        <li>Fokus auf Charttechnik und Fundamentaldaten</li>
        <li>Geduld und Disziplin als Schlüssel</li>
      </ul>
      <p className="mb-2">Typische Trend-Trader sind geduldig, analytisch und strategisch.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Charttechnik</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Trendfolge:</b> Einstieg bei bestätigtem Trend (z.B. EMA, MACD, Trendlinien)</li>
        <li><b>Breakout:</b> Ausbruch aus Konsolidierungsphasen</li>
        <li><b>Fundamentale Analyse:</b> Bewertung von Projekten und Coins</li>
      </ul>
      <div className="mb-2">Tools: TradingView, CoinMarketCap, On-Chain-Analytics</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Kauf bei Trendbestätigung (EMA-Cross, MACD-Buy, Trendlinienbruch)</li>
        <li>Verkauf bei Trendbruch oder Schwäche (MACD-Sell, RSI-Abfall)</li>
        <li>Stop-Loss unter letzter Korrektur oder Support</li>
        <li>Take-Profit bei Ziellevel oder Trendende</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>Kauf von BTC bei EMA-Cross, Verkauf bei Trendbruch</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Maximal 2% Risiko pro Trade</li>
        <li>Portfolio-Diversifikation: Verschiedene Coins und Sektoren</li>
        <li>Positionsgröße nach Trendstärke und Volatilität</li>
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
        <li>Nutze TradingView und On-Chain-Analytics</li>
        <li>Fokus auf große, liquide Coins</li>
        <li>Empfohlene Indikatoren: EMA, MACD, Trendlinien</li>
        <li>Literatur: &quot;Trend Following&quot; von Michael Covel, &quot;Cryptoassets&quot; von Chris Burniske</li>
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
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Kompletter Trend-Trading-Tag</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>08:00 Uhr: Marktvorbereitung, Trendanalyse</li>
        <li>09:00 Uhr: Trend-Signale identifizieren</li>
        <li>09:15 Uhr: Entry bei Trendbestätigung, Stop-Loss setzen</li>
        <li>10:00 Uhr: Gewinn dokumentieren, Trades analysieren</li>
        <li>11:00 Uhr: Wöchentliche Review, Fehleranalyse</li>
      </ol>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie finde ich Trend-Signale?</b> Indikatoren, Charttechnik, Fundamentaldaten</li>
        <li><b>Welcher Broker/Börse ist geeignet?</b> Binance, Kraken, Coinbase</li>
        <li><b>Wie kann ich Trend-Trading üben?</b> Demo-Konto, Backtesting, Literatur</li>
        <li><b>Wie minimiere ich das Risiko?</b> Striktes Money Management, Stop-Loss</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">11. Makrozyklen & On-Chain Filter</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Nutze Bitcoin-Halving-Zyklen, Realized Cap HODL Waves und Stablecoin-Flows als Trendfilter.</li>
        <li>Bewerte globale Liquidität (M2, Zentralbank-Bilanzen) für Risikoappetit.</li>
        <li>Halte Sentiment-Indikatoren (Fear & Greed) im Blick, um Teilverkäufe zu planen.</li>
        <li>On-Chain Active Addresses und Developer Activity signalisieren nachhaltige Trends.</li>
      </ul>
      <p className="mb-2">Eine Kombination aus Makro- und On-Chain-Daten erhöht die Trefferquote für langfristige Trendwechsel.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">12. Langfristige Performance-Metriken</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Equity-Kurve in Bitcoin und Fiat führen, um echte Outperformance sichtbar zu machen.</li>
        <li>Maximaler Drawdown und Recovery Time tracken – Ziel: Recovery &lt; 50% der Drawdown-Dauer.</li>
        <li>Core vs. Satellite Positionen getrennt dokumentieren.</li>
        <li>Rolling Sharpe und Sortino Ratio über 90 Tage berechnen.</li>
      </ul>
      <p className="mb-2">Klare Kennzahlen helfen, die Strategie gegenüber Buy-and-Hold zu rechtfertigen.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">13. Technologische Umsetzung</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Verwende Portfolio-Tracking (Kubera, CoinTracking) mit automatisierten API-Imports.</li>
        <li>Setze Trendmodelle in Python (pandas-ta) oder Pine Script um, um Signale konsistent zu generieren.</li>
        <li>Nutze automatisierte Rebalancing-Tools (zapper.fi, DeFi Saver) für On-Chain-Portfolios.</li>
        <li>Implementiere Stopp-Orders bei zentralisierten Börsen und Smart-Contract-Schutz (Gelato) in DeFi.</li>
      </ul>
      <p className="mb-2">Technologie sorgt dafür, dass Execution und Reporting mit dem Tempo des Kryptomarktes mithalten.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">14. Wöchentliche Trend-Trader-Routine</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Montag: Trendmatrix (W1/D1/H4) aktualisieren, Makro-Notizen ergänzen.</li>
        <li>Dienstag: On-Chain Kennzahlen prüfen, potenzielle Positionsanpassungen planen.</li>
        <li>Mittwoch: Portfolio-Exposure vs. Zielgewichtung abgleichen, ggf. Hedging via Futures.</li>
        <li>Donnerstag: Bildung einer Watchlist neuer Leader, Research zu Fundamentaldaten.</li>
        <li>Freitag: Wochenreview, KPI-Update, Lernpunkte und Anpassungen festhalten.</li>
      </ol>
      <p className="mb-2">Die Routine hält dich fokussiert und verhindert reaktive Entscheidungen auf kurzfristige Schwankungen.</p>
    </section>
  </div>
);

export default KryptoTrendTrader;
