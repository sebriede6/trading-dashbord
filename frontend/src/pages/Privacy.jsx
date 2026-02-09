import React from "react";

const Privacy = () => (
  <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
    <header className="space-y-2">
      <h1 className="text-3xl font-bold text-indigo-400">Datenschutzerklärung</h1>
      <p className="text-sm text-slate-400">
        Diese Vorlage gibt einen Überblick über zentrale Datenschutz-Themen. Ergänze sie um deine konkreten Prozesse, sobald du weitere Tools oder Dienste einsetzt.
      </p>
    </header>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">1. Verantwortlicher</h2>
      <p className="text-slate-200 leading-relaxed">
        Verantwortlich für die Datenverarbeitung auf dieser Website ist die im Impressum genannte Person.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">2. Zweck der Verarbeitung</h2>
      <p className="text-slate-300 leading-relaxed">
        Diese Website dient als persönliches Tradingtagebuch und Portfolio-Demo. Personenbezogene Daten werden nur verarbeitet, soweit dies zur Bereitstellung der Anwendung, zur Fehleranalyse sowie zur Kommunikation über das Kontaktformular bzw. per E-Mail erforderlich ist.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">3. Hosting & Server-Logs</h2>
      <p className="text-slate-300 leading-relaxed">
        Beim Aufruf der Seiten werden durch den Hosting-Anbieter automatisch Server-Logfiles erhoben (IP-Adresse, Datum und Uhrzeit, User-Agent, Referrer). Die Speicherung erfolgt zur Gewährleistung eines störungsfreien Betriebs und zur Abwehr von Angriffen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">4. Registrierung & Nutzerkonto</h2>
      <p className="text-slate-300 leading-relaxed">
        Sofern du eine Benutzeranmeldung anbietest, werden die zur Kontoführung erforderlichen Angaben (z.B. E-Mail-Adresse, Passwort-Hash) verarbeitet. Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO zur Erfüllung des Nutzungsvertrags.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">5. Cookies & Tracking</h2>
      <p className="text-slate-300 leading-relaxed">
        Aktuell setzt die Anwendung keine optionalen Tracking- oder Marketing-Cookies ein. Technisch notwendige Cookies können jedoch für die Anmeldung oder Session-Verwaltung erforderlich sein.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">6. Empfänger & Drittstaatentransfers</h2>
      <p className="text-slate-300 leading-relaxed">
        Eine Weitergabe personenbezogener Daten an Dritte findet nur statt, wenn dies zur Erfüllung des Vertrags erforderlich ist (z.B. Hosting-Dienstleister) oder eine gesetzliche Verpflichtung besteht. Eine Übermittlung in Drittstaaten erfolgt nur bei Einsatz entsprechender Dienste und unter Beachtung der Art.-44-ff.-DSGVO-Anforderungen.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">7. Speicherdauer</h2>
      <p className="text-slate-300 leading-relaxed">
        Nutzerkontodaten werden bis zur Löschung des Accounts gespeichert. Server-Logs löscht der Hosting-Anbieter in der Regel nach wenigen Tagen. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">8. Rechte der betroffenen Personen</h2>
      <p className="text-slate-300 leading-relaxed">
        Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO). Wende dich dafür an die im Impressum genannte Kontaktadresse.
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-indigo-300">9. Beschwerderecht</h2>
      <p className="text-slate-300 leading-relaxed">
        Du kannst dich jederzeit bei einer Aufsichtsbehörde beschweren, z.B. bei der zuständigen Landesdatenschutzbehörde deines Wohnsitzes oder Arbeitsortes.
      </p>
    </section>
  </div>
);

export default Privacy;
