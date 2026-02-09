import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const AktienValueInvestor = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-green-400 mb-4">Value Investing Strategie – Das ultimative Lernmodul</h2>
    <StrategyFigure
      title="Bewertungsfenster & Margin of Safety"
      variant="equityValue"
      caption="Darstellung der Unterbewertungszone sowie der langfristigen Mean-Reversion auf den Fair Value."
      href="https://www.etoro.com/de/investing/value-investing/"
      linkLabel="eToro: Value Investing"
    />
    <section>
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p className="mb-2">Value-Investoren suchen unterbewertete Aktien mit solidem Geschäftsmodell und langfristigem Potenzial. Sie investieren antizyklisch und mit Geduld, um von Marktineffizienzen zu profitieren.</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Fokus auf Fundamentaldaten und Bewertung</li>
        <li>Langfristige Buy-and-Hold-Strategie</li>
        <li>Antizyklisches Investieren</li>
      </ul>
      <p className="mb-2">Typische Value-Investoren sind geduldig, rational und analytisch.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten & Fundamentalanalyse</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Kennzahlen:</b> KGV, KBV, Eigenkapitalquote, Cashflow, Verschuldungsgrad</li>
        <li><b>Screening:</b> Nach unterbewerteten Aktien mit stabilem Geschäftsmodell</li>
        <li><b>Qualitative Analyse:</b> Management, Marktstellung, Wettbewerbsvorteile</li>
      </ul>
      <div className="mb-2">Tools: Aktienfinder, Morningstar, Yahoo Finance</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Kauf bei Unterbewertung und solidem Geschäftsmodell</li>
        <li>Verkauf bei Überbewertung, Geschäftsmodellbruch oder Managementwechsel</li>
        <li>Langfristiges Halten, seltene Umschichtungen</li>
      </ol>
      <div className="mb-2">Praxisbeispiel: <i>Kauf von BASF bei KGV &lt; 10, Verkauf bei KGV &gt; 20</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Breite Diversifikation über Branchen und Länder</li>
        <li>Maximal 10% pro Aktie</li>
        <li>Langfristige Liquiditätsplanung</li>
        <li>Rebalancing einmal pro Jahr</li>
      </ul>
      <div className="mb-2">Fehlerquelle: Klumpenrisiko, zu wenig Diversifikation</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Geduld: Langfristig denken, kurzfristige Schwankungen ignorieren</li>
        <li>Disziplin: An der Strategie festhalten</li>
        <li>Regelmäßige Analyse der Unternehmen</li>
        <li>Mentale Checkliste vor jedem Investment</li>
      </ul>
      <div className="mb-2">Praxis: <i>Jährliches Review, Fehleranalyse, Journaling</i></div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Backtesting mit historischen Kennzahlen und Kursdaten</li>
        <li>Statistik: Trefferquote, CAGR, Drawdown</li>
        <li>Regeln anpassen und erneut testen</li>
        <li>Ergebnisse im Journal dokumentieren</li>
      </ol>
      <div className="mb-2">Fehlerquelle: Zu wenig Backtests, keine Anpassung der Regeln</div>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps & Tools</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Nutze Aktienfinder, Morningstar, Yahoo Finance</li>
        <li>Fokus auf Unternehmen mit Burggraben (Moat)</li>
        <li>Empfohlene Kennzahlen: KGV, KBV, Cashflow</li>
        <li>Literatur: &quot;Intelligent Investor&quot; von Benjamin Graham, &quot;Value Investing&quot; von Bruce Greenwald</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">8. Häufige Fehlerquellen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Klumpenrisiko, zu wenig Diversifikation</li>
        <li>Emotionale Entscheidungen, Overtrading</li>
        <li>Fehlende Dokumentation und Analyse</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">9. Praxisbeispiel: Kompletter Value-Investing-Jahr</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Januar: Screening nach unterbewerteten Aktien</li>
        <li>Februar: Fundamentalanalyse, Managementbewertung</li>
        <li>März: Kaufentscheidung, Portfolioaufbau</li>
        <li>Juni: Halbjahres-Review, Rebalancing</li>
        <li>Dezember: Jahresabschluss, Fehleranalyse</li>
      </ol>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">10. FAQ</h3>
      <ul className="list-disc ml-6 mb-2">
        <li><b>Wie finde ich unterbewertete Aktien?</b> Screening, Kennzahlen, qualitative Analyse</li>
        <li><b>Welcher Broker ist geeignet?</b> Trade Republic, Comdirect, ING</li>
        <li><b>Wie kann ich Value Investing üben?</b> Musterdepot, Backtesting, Literatur</li>
        <li><b>Wie minimiere ich das Risiko?</b> Diversifikation, Rebalancing</li>
      </ul>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">11. Vertiefte Fundamentalanalyse</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Berechne Owner Earnings (Free Cash Flow minus Wartungsinvestitionen) für realistische Bewertungen.</li>
        <li>Analyse der Kapitalallokation: ROIC vs. WACC, Aktienrückkäufe, Dividendenpolitik.</li>
        <li>Bewerte Burggraben-Kennzahlen (Marktanteile, Switching Costs, Patente, Netzwerkeffekte).</li>
        <li>Stress-Teste Bilanzen mit Szenarien (Umsatzrückgang, Margendruck, Zinsanstieg).</li>
      </ul>
      <p className="mb-2">Eine tiefgehende Fundamentalanalyse reduziert Value Traps und zeigt, ob Management Kapital effizient einsetzt.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">12. Bewertungsmodelle & Kennzahlen</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Nutze Discounted Cashflow (DCF) mit Sensitivitätsanalyse (Wachstum, Margin, Diskontsatz).</li>
        <li>Vergleiche EV/EBIT, EV/FCF, PEG-Ratio innerhalb der Branche.</li>
        <li>Margin of Safety definieren (z.B. 30%), bevor Kapital eingesetzt wird.</li>
        <li>Tracke kumulierte Rendite vs. Benchmark (MSCI World Value) monatlich.</li>
      </ul>
      <p className="mb-2">Bewertungsmodelle sollten versioniert und regelmäßig mit neuen Daten aktualisiert werden.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">13. Toolstack & Automatisierung</h3>
      <ul className="list-disc ml-6 mb-2">
        <li>Setze Screener (Tikr, Finbox) mit individuellen Kennzahlenfiltern auf.</li>
        <li>Nutze Excel/Google Sheets mit API-Anbindung (Alpha Vantage) für automatisierte Updates.</li>
        <li>Erstelle ein Research-Wiki (Notion) mit Investment-Thesen, Risikofaktoren, Triggern.</li>
        <li>Automatisiere Dividenden-Tracking und Steuerreports mit Tools wie Tresor One.</li>
      </ul>
      <p className="mb-2">Eine digitale Research-Infrastruktur spart Zeit und erhöht die Qualität der Entscheidungen.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold mb-2">14. Value-Investing-Jahresfahrplan</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>Quartalsweise Earnings-Review und Aktualisierung der DCF-Modelle.</li>
        <li>Halbjährlich: Branchenrotation prüfen, Makrotrends (Inflation, Zinsen) einbeziehen.</li>
        <li>Monatlich: Watchlist-Signale, Insidertransaktionen, Short-Interest beobachten.</li>
        <li>Nachkaufplan schriftlich festlegen (Preisbereiche, Tranchierung, maximale Positionsgröße).</li>
        <li>Jährlich: Gesamtstrategie evaluieren, Lessons Learned dokumentieren, neue Ziele setzen.</li>
      </ol>
      <p className="mb-2">Der Fahrplan sorgt dafür, dass Analyse und Portfolio-Pflege nicht dem Zufall überlassen werden.</p>
    </section>
  </div>
);

export default AktienValueInvestor;
