import React from "react";

const RiskDisclaimer = () => (
  <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
    <header className="space-y-2">
      <h1 className="text-3xl font-bold text-indigo-400">Haftungs- &amp; Risiko-Hinweis</h1>
      <p className="text-sm text-slate-400">
        Dieser Hinweis stellt klar, dass es sich um ein privates Projekt und keine Anlageberatung handelt.
      </p>
    </header>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">Keine Anlageberatung</h2>
      <p className="text-slate-300 leading-relaxed">
        Die bereitgestellten Inhalte, Statistiken und Strategiebeschreibungen dienen ausschließlich zu Informations- und Demonstrationszwecken. Sie stellen keine Finanz-, Anlage- oder Steuerberatung dar und ersetzen keine individuelle Beratung durch qualifizierte Fachpersonen.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">Eigenverantwortung</h2>
      <p className="text-slate-300 leading-relaxed">
        Jede Nutzung der Anwendung, insbesondere die Ableitung von Handelsentscheidungen, erfolgt auf eigene Verantwortung und eigenes Risiko. Trading an Finanzmärkten ist mit erheblichen Chancen und Risiken verbunden. Es können Verluste des eingesetzten Kapitals bis hin zum Totalverlust entstehen.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">Keine Gewähr für Aktualität</h2>
      <p className="text-slate-300 leading-relaxed">
        Trotz sorgfältiger Pflege kann keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der dargestellten Informationen übernommen werden. Technische Fehler, Ausfälle oder Datenverluste können nicht ausgeschlossen werden.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">Eigenes Research erforderlich</h2>
      <p className="text-slate-300 leading-relaxed">
        Prüfe alle Informationen sorgfältig und führe vor Handelsentscheidungen eigenes Research durch. Nutze gegebenenfalls Demokonten oder hole unabhängige Beratung ein, bevor du echtes Kapital einsetzt.
      </p>
    </section>
  </div>
);

export default RiskDisclaimer;
