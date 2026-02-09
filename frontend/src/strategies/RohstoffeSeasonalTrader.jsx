import React from "react";
import StrategyFigure from "../components/StrategyFigure.jsx";

const RohstoffeSeasonalTrader = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-green-700 mb-4">Saisonale Strategien bei Rohstoffen – Vollständiges Lernmodul</h2>
    <StrategyFigure
      title="Saisonaler Zyklus mit Spread"
      variant="commoditySeasonal"
      caption="Veranschaulicht wiederkehrende Preismuster rund um die Ernte saisonaler Produkte."
      href="https://tradingwithdavid.com/de/saisonalitat-von-rohstoffen/"
      linkLabel="TradingWithDavid: Saisonalität von Rohstoffen"
    />
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">1. Marktlogik & Zielsetzung</h3>
      <p>Seasonal-Trader nutzen wiederkehrende saisonale Muster, z.B. Erntezeiten bei Agrarrohstoffen oder saisonale Nachfrage bei Energie. Die Strategie basiert auf statistischer Analyse und Planung.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">2. Setup-Varianten</h3>
      <ul className="list-disc ml-6">
        <li>Analyse historischer Preismuster mit Seasonality-Charts und Research-Daten.</li>
        <li>Handel zu bestimmten Jahreszeiten, z.B. Long Weizen im Frühjahr.</li>
        <li>Stop-Loss und Take-Profit nach Volatilität und Saisonalität.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">3. Exakte Einstiegs- und Ausstiegsregeln</h3>
      <ol className="list-decimal ml-6">
        <li>Identifikation saisonaler Muster mit Research-Tools.</li>
        <li>Einstieg zu saisonalen Wendepunkten, Bestätigung durch Volumen und Preisstruktur.</li>
        <li>Stop-Loss nach ATR, Take-Profit nach statistischem Ziel.</li>
        <li>Teilgewinnmitnahme bei 1R, Rest laufen lassen.</li>
      </ol>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">4. Money Management & Risiko</h3>
      <ul className="list-disc ml-6">
        <li>Maximal 1,5% Risiko pro Trade.</li>
        <li>Portfolio-Diversifikation: Verschiedene Rohstoffe und Saisons.</li>
        <li>Positionsgröße nach Volatilität und Depotgröße.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">5. Psychologie & Routinen</h3>
      <ul className="list-disc ml-6">
        <li>Planung: Geduld auf das Setup warten.</li>
        <li>Wöchentliche Analyse: Review aller abgeschlossenen Trades.</li>
        <li>Trading-Journal führen, Fehler und Learnings dokumentieren.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">6. Backtesting & Optimierung</h3>
      <ul className="list-disc ml-6">
        <li>Mindestens 50 saisonale Trades auf historischen Daten testen.</li>
        <li>Trefferquote, CRV, Drawdown, Zeit im Markt auswerten.</li>
        <li>Regeln anpassen und erneut testen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">7. Profi-Tipps</h3>
      <ul className="list-disc ml-6">
        <li>Nutze Moore Research Center und MRCI Reports für saisonale Muster.</li>
        <li>Handle bevorzugt in klaren saisonalen Phasen.</li>
        <li>Nutze Alerts für Einstiegszonen.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">8. Tools & Literatur</h3>
      <ul className="list-disc ml-6">
        <li>TradingView, Moore Research Center, MRCI Reports.</li>
        <li>&quot;Seasonal Futures Spreads&quot; – Jake Bernstein</li>
        <li>&quot;Commodity Seasonality&quot; – MRCI Reports</li>
      </ul>
      <div className="mt-4 text-xs text-gray-500">Quellen: Bernstein, MRCI, eigene Backtests, Erfahrungsberichte von Seasonal-Tradern.</div>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">9. Saisonkalender & Planung</h3>
      <ul className="list-disc ml-6">
        <li>Erstelle Jahreskalender mit Einstieg-/Ausstiegsfenstern pro Rohstoff (z.B. Long Gasoline Feb-Apr).</li>
        <li>Markiere USDA-, OPEC-, IEA-Reports und Wetterumschwünge als potenzielle Störfaktoren.</li>
        <li>Planung in Phasen: Vorbereitung (Backtests), Execution (Trade), Nachbearbeitung (Review).</li>
        <li>Nutze Heatmaps, um Saisonalitätsstärke (Prozent positiver Jahre, Durchschnittsrendite) zu visualisieren.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">10. Fundamentale Überlagerung</h3>
      <ul className="list-disc ml-6">
        <li>Validiere Saisonalität mit aktuellen Fundamentaldaten (Lagerbestände, Wetter, Nachfrage).</li>
        <li>Erstelle Framework: Saisonalität (grün/gelb/rot) + Fundamentaldaten (grün/gelb/rot) = Trade-Freigabe.</li>
        <li>Berücksichtige Makrotrends (Inflation, Währung) als Störvariablen.</li>
        <li>Delta zur Historie messen: Wie stark weichen aktuelle Daten vom langfristigen Mittel ab?</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">11. Spread- & Pair-Trading</h3>
      <ul className="list-disc ml-6">
        <li>Handele saisonale Spreads (z.B. Long Soybean Meal/Short Soybean Oil) zur Volatilitätsreduktion.</li>
        <li>Backteste Inter-Commodity-Spreads (Heating Oil vs. Gasoline) für strukturierte Trades.</li>
        <li>Nutze Ratio-Charts und Z-Scores, um Mean-Reversion-Potenzial zu identifizieren.</li>
        <li>Positionsmanagement: Separate Stops je Beinkombination oder Net Exposure.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">12. Risiko-Management & Drawdown-Kontrolle</h3>
      <ul className="list-disc ml-6">
        <li>Max. Exposure pro Saison definieren (z.B. 6 offene saisonale Trades gleichzeitig).</li>
        <li>Drawdown-Monitor: Bei -6R Saisonverlust Pause einlegen, Setup neu evaluieren.</li>
        <li>Stop-Strategie: Mischung aus zeitbasierten Stops (Saisonfenster endet) und Preisstopps.</li>
        <li>Nutze Volatilitätsfilter (HV, ATR), um in ruhigen Phasen Positionen zu reduzieren.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">13. Automatisierung & Tools</h3>
      <ul className="list-disc ml-6">
        <li>Seasonalgo, Seasonax, Moore Research API für Charting und Alerts.</li>
        <li>Python/R-Skripte zur Auswertung historischer Daten, Generierung von Equity Curves.</li>
        <li>Notion/Excel-Dashboard mit KPI-Tracking (Winrate, Avg. Return, Max Drawdown per Saison).</li>
        <li>Integration in Trading-Plattform (NinjaTrader, Sierra) für automatische Orderplatzierung.</li>
      </ul>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">14. Case Studies & Muster</h3>
      <ol className="list-decimal ml-6">
        <li><b>Gasoline Pre-Summer Run:</b> Fundament: steigende Driving Season Nachfrage; Technisch: Break über 200 DMA.</li>
        <li><b>Cocoa Harmattan Rally:</b> Westafrika Trockenheit führt zu Angebotsengpässen – Absicherung via Options.</li>
        <li><b>NatGas Shoulder Season Short:</b> Niedrige Nachfrage, Lageraufbau, Trendindikatoren bestätigen.</li>
      </ol>
      <p>Case Studies helfen, Setup-Qualität zu beurteilen und Playbooks aufzubauen.</p>
    </section>
    <section className="mb-6">
      <h3 className="text-lg font-bold mb-2">15. Review-Prozess & Weiterentwicklung</h3>
      <ul className="list-disc ml-6">
        <li>Quartalsweise Review: Welche Saisons funktionierten/nicht? Anpassungen dokumentieren.</li>
        <li>Peer-Review oder Mentor-Sessions für objektive Feedback-Schleifen.</li>
        <li>Lessons Learned in Wissensdatenbank (Notion, Obsidian) archivieren.</li>
        <li>Experimentiere jährlich mit 1-2 neuen Saisons (Pilot-Trades) und integriere sie nach Proof.</li>
      </ul>
    </section>
  </div>
);

export default RohstoffeSeasonalTrader;
