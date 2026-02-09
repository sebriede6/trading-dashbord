import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const KryptoMomentumTrader = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-fuchsia-400 mb-4">Krypto Momentum Trader Strategie – Das ultimative Lernmodul</h2>
    <StrategyFigure
      title="Momentum-Schub im Altcoin"
      variant="cryptoMomentum"
      caption="Darstellung eines schnellen Durchbruchs mit anschließender Momentum-Verlängerung und Profit-Taking-Zonen."
      href="https://www.ig.com/de/trading-strategien/momentum-trading-strategien--ein-leitfaden-fuer-anfaenger-220209"
      linkLabel="IG: Momentum Trading Guide"
    />
    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Momentum-Trader setzen auf starke Trends und schnelle Bewegungen. Sie kaufen, wenn der Markt Fahrt aufnimmt, und verkaufen bei Schwäche. Ziel ist es, von kurzfristigen, dynamischen Preisbewegungen zu profitieren.</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Handel mit Trendrichtung</li>
        <li>Fokus auf Volumen und Geschwindigkeit</li>
        <li>Technische Indikatoren als Signalgeber</li>
      </ul>
      <p className="mb-2">Typische Momentum-Trader sind entscheidungsfreudig, analytisch und stressresistent.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Charttechnik</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Trendfolge:</b> Einstieg bei bestätigtem Trend (z.B. EMA-Cross, MACD)</li>
        <li><b>Breakout:</b> Ausbruch aus Konsolidierungsphasen mit Volumenanstieg</li>
        <li><b>Volumen-Spikes:</b> Plötzliche Volumenanstiege als Einstiegssignal</li>
      </ul>
      <div className="mb-2">Tools: TradingView, CoinMarketCap, On-Chain-Analytics</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Kauf bei starkem Momentum (z.B. RSI &gt; 60, MACD-Buy-Signal, EMA-Cross)</li>
        <li>Verkauf bei Schwäche (z.B. RSI &lt; 40, MACD-Sell-Signal, Trendbruch)</li>
        <li>Stop-Loss unter letzter Konsolidierung oder Support</li>
        <li>Take-Profit bei Ziellevel oder Momentum-Verlust</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>Kauf von ETH bei Breakout, Verkauf bei RSI-Abfall</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Maximal 3% des Portfolios pro Trade</li>
        <li>Striktes Stop-Loss-Management</li>
        <li>Nur liquide Coins handeln</li>
        <li>Positionsgröße nach Volatilität anpassen</li>
      </ul>
      <div className="mb-2">Fehlerquelle: Zu große Positionen, kein Stop-Loss</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Schnelle Entscheidungen treffen</li>
        <li>Emotionen kontrollieren, Disziplin bewahren</li>
        <li>Regelmäßige Analyse der Trades</li>
        <li>Mentale Checkliste vor jedem Trade</li>
      </ul>
      <div className="mb-2">Praxis: <i>Journaling, Fehleranalyse, tägliche Review</i></div>
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
        <li>Empfohlene Indikatoren: RSI, MACD, EMA</li>
        <li>Literatur: &quot;Momentum Masters&quot; von Mark Minervini, &quot;Cryptoassets&quot; von Chris Burniske</li>
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
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Kompletter Momentum-Tag</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>08:00 Uhr: Marktvorbereitung, Indikatoren prüfen</li>
        <li>09:00 Uhr: Momentum-Signale identifizieren</li>
        <li>09:15 Uhr: Entry bei Breakout, Stop-Loss setzen</li>
        <li>10:00 Uhr: Gewinn dokumentieren, Trades analysieren</li>
        <li>11:00 Uhr: Tägliche Review, Fehleranalyse</li>
      </ol>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie finde ich Momentum-Signale?</b> Indikatoren, Volumen, Charttechnik</li>
        <li><b>Welcher Broker/Börse ist geeignet?</b> Binance, Kraken, Coinbase</li>
        <li><b>Wie kann ich Momentum-Trading üben?</b> Demo-Konto, Backtesting, Literatur</li>
        <li><b>Wie minimiere ich das Risiko?</b> Striktes Money Management, Stop-Loss</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">11. Narrativ- & Rotation-Tracking</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Beobachte Social Sentiment (LunarCrush, Santiment) für aufkommende Narrative.</li>
        <li>Nutze Sektorperformance (DeFi, Gaming, L2) als Rotationsindikator.</li>
        <li>Halte Watchlists mit Market-Cap-Staffelung bereit, um schnell auf neue Leader umzuschwenken.</li>
        <li>Verfolge Token Unlocks und Emissionskalender, da diese Momentum bremsen können.</li>
      </ul>
      <p className="mb-2">Narrativ-Dynamik ist im Kryptobereich oft wichtiger als klassische Makro-Daten.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">12. Kennzahlen & Trade-Management</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Run-Up Ratio: Verhältnis von Gewinn zu Maximum Adverse Excursion – optimiert Stop-Nachführung.</li>
        <li>Hit Rate im ersten 30-Minuten-Fenster: Frühindikator für Setup-Qualität.</li>
        <li>Beta zum Gesamtmarkt (z.B. BTC.D, TOTAL3) messen, um Exposure zu steuern.</li>
        <li>Funding-Kosten protokollieren, wenn Perpetuals genutzt werden.</li>
      </ul>
      <p className="mb-2">Dokumentiere jede Anpassung (Partial Profit, Trailing Stop) inklusive Gründen.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">13. Toolchain & Automatisierung</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Scanne mit Messari Screener oder CoinGecko Trending für frühe Momentum-Signale.</li>
        <li>On-Chain-Analytics (Nansen, Glassnode) liefern Smart-Money-Flows als Bestätigung.</li>
        <li>Nutze Trading Bots mit Teilautomatisierung (Einstieg manuell, Exit automatisiert) für Disziplin.</li>
        <li>Setze Alerts für Volumen*Preis Kombinationen (z.B. 2x durchschnittliches Volumen + 5% Preisexplosion).</li>
      </ul>
      <p className="mb-2">Ein hybrider Ansatz aus manueller Bewertung und automatisierten Signalen liefert Geschwindigkeit und Kontrolle.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">14. Daily Momentum Playbook</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Pre-Market: Narrative-Scan, Top Gainers/Losers, Funding-Übersicht.</li>
        <li>Setup-Board: Definiere Trigger-Level, Volumenanforderungen, Stop-Zonen.</li>
        <li>Execution: Max. zwei gleichzeitige Momentum-Trades, klare Exit-Szenarien.</li>
        <li>Midday-Review: Überprüfe ob Momentum intakt bleibt, adjustiere Stops.</li>
        <li>Close: KPI-Update, Screenshot-Archiv, schriftliche Reflexion der Emotionen.</li>
      </ol>
      <p className="mb-2">Das Playbook sorgt für Struktur in einem sonst chaotischen, schnellen Markt.</p>
    </section>
  </div>
);

export default KryptoMomentumTrader;
