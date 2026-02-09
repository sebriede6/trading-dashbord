import React from "react";

const Imprint = () => (
  <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
    <header className="space-y-2">
      <h1 className="text-3xl font-bold text-indigo-400">Impressum</h1>
      <p className="text-sm text-slate-400">
        Bitte ersetze die Platzhalterangaben durch deine tatsächlichen Kontaktdaten, bevor du die Seite veröffentlichst.
      </p>
    </header>

    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-indigo-300">Angaben gemäß § 5 TMG</h2>
      <div className="text-slate-200 leading-relaxed">
        <p>Sebastian Riede-Zwätz</p>
        <p>Kindleber Straße 42 B</p>
        <p>99867 Gotha</p>
        <p>Deutschland</p>
        <p className="mt-2">Telefon: <span className="text-slate-300">0172/7718130</span></p>
        <p>E-Mail: <span className="text-slate-300">sebriede6@gmail.com</span></p>
      </div>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">Verantwortlich für den Inhalt</h2>
      <p className="text-slate-200">Sebastian Riede-Zwätz</p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">Haftung für Inhalte</h2>
      <p className="text-slate-300 leading-relaxed">
        Die Inhalte dieser Anwendung wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">Haftung für Links</h2>
      <p className="text-slate-300 leading-relaxed">
        Dieses Projekt enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">Urheberrecht</h2>
      <p className="text-slate-300 leading-relaxed">
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>
    </section>
  </div>
);

export default Imprint;
