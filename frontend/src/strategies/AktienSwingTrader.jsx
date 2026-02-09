import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const AktienSwingTrader = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-indigo-400 mb-4">Swing-Trading bei Aktien – Das ultimative Lernmodul</h2>
    <StrategyFigure
      title="Swing-Channel Roadmap"
      variant="equitySwing"
      caption="Veranschaulicht Wechsel zwischen Aufwärts- und Abwärts-Swings inklusive Pullback-Entries."
      href="https://naga.com/de/academy/swing-trading?reason=&utm_source=google&utm_medium=cpc&utm_campaignid=23526430547&utm_campaign=LA-NM-PMAX-DE-DE-PMAX-NEW2025&utm_campaignname=LA-NM-PMAX-DE-DE-PMAX-NEW2025&utm_adgroupid=&utm_adgroupname=&utm_content=&utm_landingpage=&utm_device=c&utm_matchtype=&utm_placement=&utm_targetid=&utm_country=DE&utm_language=DE&utm_loc_interest_ms=&utm_loc_physical_ms=9042856&utm_creative=&utm_adposition=&utm_feeditemid=&utm_keyword=&gad_source=1&gad_campaignid=23521344450&gbraid=0AAAAAC7P7dEnHOKlTWXH7IUc0ShupX6yS&gclid=CjwKCAiAqKbMBhBmEiwAZ3UboBuZ-lB9W5PGAaAbfKcC8gmtMTkiAK9ykRLxvhHdkV8qg1F9YE2a1xoCyj4QAvD_BwE"
      linkLabel="NAGA: Swing Trading"
    />
    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Swing-Trader handeln mittelfristige Kursbewegungen und nutzen Charttechnik, Indikatoren und Volumen, um von Schwankungen zwischen Unterstützungen und Widerständen zu profitieren.</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Fokus auf mittelfristige Trends und Swings</li>
        <li>Technische Analyse als Hauptwerkzeug</li>
        <li>Handel zwischen Unterstützungen und Widerständen</li>
      </ul>
      <p className="mb-2">Typische Swing-Trader sind flexibel, analytisch und entscheidungsfreudig.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Charttechnik</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Trendfolge:</b> Einstieg bei bestätigtem Trend (z.B. EMA, MACD, RSI)</li>
        <li><b>Breakout:</b> Ausbruch aus Konsolidierungsphasen</li>
        <li><b>Volumen-Spikes:</b> Plötzliche Volumenanstiege als Einstiegssignal</li>
      </ul>
      <div className="mb-2">Tools: TradingView, Finviz, Yahoo Finance</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Kauf bei Trendbestätigung (EMA-Cross, MACD-Buy, RSI)</li>
        <li>Verkauf bei Trendbruch oder Schwäche (MACD-Sell, RSI-Abfall)</li>
        <li>Stop-Loss unter letzter Korrektur oder Support</li>
        <li>Take-Profit bei Ziellevel oder Swing-Ende</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>Kauf von Apple bei Breakout, Verkauf bei Widerstand</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Maximal 2% Risiko pro Trade</li>
        <li>Portfolio-Diversifikation: Verschiedene Branchen und Länder</li>
        <li>Positionsgröße nach Volatilität und Trendstärke</li>
      </ul>
      <div className="mb-2">Fehlerquelle: Zu große Positionen, kein Stop-Loss</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Geduld: Swings laufen lassen</li>
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
        <li>Nutze TradingView, Finviz, Yahoo Finance</li>
        <li>Fokus auf liquide Aktien mit klaren Swings</li>
        <li>Empfohlene Indikatoren: EMA, MACD, RSI</li>
        <li>Literatur: &quot;Swing Trading&quot; von Marc Rivalland, &quot;Technical Analysis&quot; von John J. Murphy</li>
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
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Kompletter Swing-Trading-Woche</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Montag: Marktvorbereitung, Swing-Signale prüfen</li>
        <li>Dienstag: Entry bei Breakout, Stop-Loss setzen</li>
        <li>Mittwoch: Gewinn dokumentieren, Trades analysieren</li>
        <li>Freitag: Wöchentliche Review, Fehleranalyse</li>
      </ol>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie finde ich Swing-Signale?</b> Indikatoren, Charttechnik, Volumen</li>
        <li><b>Welcher Broker ist geeignet?</b> Trade Republic, Comdirect, ING</li>
        <li><b>Wie kann ich Swing-Trading üben?</b> Musterdepot, Backtesting, Literatur</li>
        <li><b>Wie minimiere ich das Risiko?</b> Striktes Money Management, Stop-Loss</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">11. Multi-Zeitebenen-Analyse</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Monthly/Weekly: Großen Trend bestimmen (Bull/Bear, Trendrichtung, wichtige Levels).</li>
        <li>Daily: Setup identifizieren (Flagge, Pullback, Reversal), Volumen beurteilen.</li>
        <li>4h/1h: Entry-Trigger (Candlestick-Pattern, Momentum-Break, RSI-Divergenz).</li>
        <li>Intraday: Fine-Tuning für Entry mittels VWAP, OBV, Intraday-Supports.</li>
      </ul>
      <p className="mb-2">Jede Zeitebene beantwortet eine andere Frage – Kombination liefert hohe Trefferquote.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">12. Sektorrotation & Makro-Faktoren</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Verfolge Relative Strength von Sektoren (XLK, XLF, XLE etc.).</li>
        <li>Nutze Zinsstrukturkurve, Inflation, PMI, Konsumentenstimmung für Makro-Bias.</li>
        <li>Überprüfe Earnings-Season-Kalender, um Volatilität einzuordnen.</li>
        <li>Führe ein Sektorrelationlogbuch, das zyklische Muster festhält.</li>
      </ul>
      <p className="mb-2">Swing-Trader profitieren von Kapitalrotation – Timing verbessert Quote und CRV.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">13. Risiko-Management & Hedging</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Initialer Stop unter strukturellem Tief, Trailing Stop nach höherem Hoch.</li>
        <li>Positionsgröße via Position Sizing Formel (Kontogröße x Risiko% / Stop-Distanz).</li>
        <li>Nutze Optionen (Protective Put, Covered Call) für Absicherung oder Cashflow.</li>
        <li>Setze Trade Guardrails: Max. 3 gleichgerichtete Positionen pro Sektor.</li>
      </ul>
      <p className="mb-2">Hedging schützt Kapital in Seitwärtsphasen und erhält Handlungsfähigkeit.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">14. Performance-Tracking & Kennzahlen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Berechne Profitfaktor, Sharpe Ratio, Ulcer Index für Halbjahresvergleiche.</li>
        <li>Trade-Klassifikation: A-Setup, B-Setup, C-Setup und jeweilige Trefferquote.</li>
        <li>Führe eine Equity-Kurve, die Outlier (Top 5 Trades, Worst 5 Trades) separat analysiert.</li>
        <li>Nutze Journaling-Software (Edgewonk, TraderSync) für Emotionstracking.</li>
      </ul>
      <p className="mb-2">Kennzahlen zeigen, ob Prozessverbesserungen wirken oder Anpassungen nötig sind.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">15. Wochen- & Monatsroutine</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Sonntag: Markt-Top-Down-Analyse, Watchlist-Update, Szenarien erstellen.</li>
        <li>Mo/Mi/Fr: Kurzreview, offene Trades, News, Anpassungen an Stops.</li>
        <li>Freitagabend: Wochenjournal, Emotionen bewerten, Verbesserungen festlegen.</li>
        <li>Monatsende: KPI-Review, Kapitalallokation anpassen, neue Ideen testen.</li>
        <li>Krisenprotokoll bereitlegen: Vorgehensweise bei Flash-Crash, Earnings-Gap, geopolitischen Events.</li>
      </ol>
      <p className="mb-2">Strukturierte Routinen verankern professionelle Standards im täglichen Handeln.</p>
    </section>
  </div>
);

export default AktienSwingTrader;
