import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { tradingModules } from "../data/tradingModules";

const baseQuestions = [
  {
    id: "asset",
    title: "Welche Märkte reizen dich am meisten?",
    options: [
      { value: "forex", label: "Forex & Devisenpaare" },
      { value: "crypto", label: "Kryptomärkte" },
      { value: "stocks", label: "Aktien & ETFs" },
      { value: "commodities", label: "Rohstoffe wie Gold, Öl oder Agrar" },
      { value: "flex", label: "Ich bin offen für alles – Hauptsache die Strategie passt." }
    ]
  },
  {
    id: "time",
    title: "Wie viel Zeit möchtest du aktiv investieren?",
    options: [
      { value: "intraday", label: "Täglich mehrere kurze Sessions – ich mag Action." },
      { value: "swing", label: "Regelmäßige Checks mehrmals pro Woche." },
      { value: "longterm", label: "Einmal wöchentlich oder noch seltener – langfristiger Fokus." },
      { value: "mix", label: "Ich kombiniere aktives Trading mit ruhigen Phasen." }
    ]
  },
  {
    id: "risk",
    title: "Wie schätzt du dein Risikoprofil ein?",
    options: [
      { value: "low", label: "Eher defensiv – Kapitalerhalt steht im Vordergrund." },
      { value: "medium", label: "Ausgewogen – Chancen nutzen, Risiken kontrollieren." },
      { value: "high", label: "Risikofreudig – hohe Schwankungen sind okay." }
    ]
  },
  {
    id: "style",
    title: "Welcher Stil beschreibt dich am besten?",
    options: [
      { value: "scalping", label: "Schnelle Entscheidungen, Scalping & Breakouts." },
      { value: "trend", label: "Trends identifizieren und mitreiten." },
      { value: "range", label: "Seitwärtsphasen handeln, geduldige Entries." },
      { value: "invest", label: "Langfristig investieren, Cashflow & Fundamentaldaten." },
      { value: "automation", label: "Technikaffin – Automatisierung, Bots & Tools." }
    ]
  },
  {
    id: "tech",
    title: "Wie technikaffin bist du?",
    options: [
      { value: "low", label: "Ich halte es simpel – wenige Tools, klare Prozesse." },
      { value: "medium", label: "Ich nutze moderne Tools, bleibe aber flexibel." },
      { value: "high", label: "Ich liebe Automatisierung, Scripts und Datenfeeds." }
    ]
  }
];

const commodityQuestion = {
  id: "commodityFocus",
  title: "Welcher Rohstoff spricht dich am stärksten an?",
  options: [
    { value: "gold", label: "Gold – Sicherheit und Krisenschutz" },
    { value: "oil", label: "Öl – volatil, aber chancenreich" },
    { value: "agrar", label: "Agrar – nachhaltige, langfristige Trends" }
  ]
};

function createInitialAnswers() {
  const initial = baseQuestions.reduce((acc, question) => {
    acc[question.id] = [];
    return acc;
  }, {});
  initial[commodityQuestion.id] = [];
  return initial;
}

const styleAffinities = {
  scalping: ["scalping", "momentum", "breakout"],
  trend: ["trend", "momentum", "swing"],
  range: ["range", "mean-reversion"],
  invest: ["invest", "income", "value", "hold", "hedge"],
  automation: ["automation", "arbitrage"]
};

function matchesStyle(answerStyles = [], moduleStyles = []) {
  if (!answerStyles.length || !moduleStyles?.length) {
    return false;
  }
  return answerStyles.some(answerStyle => {
    const targets = styleAffinities[answerStyle] || [answerStyle];
    return moduleStyles.some(style => targets.includes(style));
  });
}

function buildAdvice(module, answers) {
  const attrs = module.attributes || {};
  const positives = [];
  const cautions = [];

  const assetSelections = answers.asset || [];
  const timeSelections = answers.time || [];
  const riskSelections = answers.risk || [];
  const styleSelections = answers.style || [];
  const techSelections = answers.tech || [];
  const commoditySelections = answers.commodityFocus || [];

  if (assetSelections.includes(attrs.asset)) {
    positives.push("Deine Marktpräferenz deckt sich mit dem empfohlenen Modul.");
  }

  if (assetSelections.includes("commodities")) {
    if (commoditySelections.includes("gold")) {
      if (module.key === "RohstoffeGold") {
        positives.push("Gold passt zu deinem Wunsch nach Stabilität und Krisenschutz.");
      } else {
        cautions.push("Du bevorzugst Gold, dieses Modul liegt aber auf einem anderen Rohstoff.");
      }
    }
    if (commoditySelections.includes("oil")) {
      if (module.key === "RohstoffeOil") {
        positives.push("Du suchst Öl-Exposure und bekommst es hier.");
      } else {
        cautions.push("Du hast Öl markiert, dieses Modul konzentriert sich jedoch anders.");
      }
    }
    if (commoditySelections.includes("agrar")) {
      if (module.key === "RohstoffeAgrar") {
        positives.push("Agrarmärkte stehen bei dir im Fokus und dieses Modul deckt sie ab.");
      } else {
        cautions.push("Du möchtest Agrarwerte handeln, doch hier geht es um andere Rohstoffe.");
      }
    }
  }

  if (riskSelections.length) {
    if (riskSelections.includes(attrs.risk)) {
      positives.push("Risikoprofil und Modul sind im Gleichgewicht.");
    }
    if (riskSelections.includes("low") && attrs.risk === "high") {
      cautions.push("Du handelst lieber defensiv, dieses Modul verlangt eine hohe Schwankungstoleranz.");
    }
    if (riskSelections.includes("high") && attrs.risk === "low") {
      cautions.push("Das Modul ist sehr konservativ, während du mehr Dynamik erwartest.");
    }
  }

  if (timeSelections.length) {
    if (timeSelections.includes(attrs.timeframe)) {
      positives.push("Zeitaufwand passt zu deinem Alltag.");
    }
    if (timeSelections.includes("intraday") && attrs.timeframe === "longterm") {
      cautions.push("Du suchst tägliche Action, dieses Modul setzt eher auf langen Anlagehorizont.");
    }
    if (timeSelections.includes("longterm") && attrs.timeframe === "intraday") {
      cautions.push("Das Modul verlangt tägliche Präsenz, obwohl du langfristig planen willst.");
    }
  }

  if (styleSelections.length) {
    if (matchesStyle(styleSelections, attrs.styles)) {
      positives.push("Handelsstil und Modul ergänzen sich.");
    } else {
      cautions.push("Dein Wunschstil wird hier nur teilweise abgedeckt.");
    }
  }

  if (techSelections.length) {
    if (techSelections.includes(attrs.tech)) {
      positives.push("Techniklevel passt zu den Anforderungen.");
    }
    if (techSelections.includes("low") && attrs.tech === "high") {
      cautions.push("Das Modul setzt intensiven Technikeinsatz voraus, du möchtest es jedoch einfacher halten.");
    }
    if (techSelections.includes("high") && attrs.tech === "low") {
      cautions.push("Du suchst viel Automatisierung, dieses Modul bleibt eher manuell.");
    }
  }

  const summary = cautions.length
    ? "Achte auf folgende Punkte, bevor du dich festlegst:"
    : positives.length
      ? "Alles spricht dafür, dass dieses Modul gut zu deinen Zielen passt."
      : "Keine klaren Signale – prüfe, ob du weitere Präferenzen ergänzen möchtest.";

  return { summary, positives, cautions };
}

function scoreModule(module, answers) {
  const attrs = module.attributes || {};
  let score = 0;

  const assetSelections = answers.asset || [];
  const timeSelections = answers.time || [];
  const riskSelections = answers.risk || [];
  const styleSelections = answers.style || [];
  const techSelections = answers.tech || [];
  const commoditySelections = answers.commodityFocus || [];

  if (assetSelections.length) {
    let assetScore = 0;
    if (attrs.asset && assetSelections.includes(attrs.asset)) {
      assetScore = 3;
    } else if (assetSelections.includes("flex")) {
      assetScore = 1;
    }
    score += assetScore;
  }

  if (timeSelections.length && attrs.timeframe) {
    const timeScore = Math.max(
      0,
      ...timeSelections.map(selection => {
        switch (selection) {
          case "intraday":
            if (attrs.timeframe === "intraday") {
              return 3;
            }
            if (attrs.timeframe === "swing") {
              return 2;
            }
            return 1;
          case "swing":
            if (attrs.timeframe === "swing") {
              return 3;
            }
            if (attrs.timeframe === "intraday" || attrs.timeframe === "longterm") {
              return 1;
            }
            return 0;
          case "longterm":
            if (attrs.timeframe === "longterm") {
              return 3;
            }
            if (attrs.timeframe === "swing") {
              return 1;
            }
            return 0;
          case "mix": {
            let mixScore = 0;
            if (attrs.timeframe === "swing" || attrs.timeframe === "intraday") {
              mixScore = 2;
            }
            if (attrs.styles?.includes("invest")) {
              mixScore = Math.max(mixScore, 1);
            }
            if (attrs.timeframe === "longterm") {
              mixScore = Math.max(mixScore, 2);
            }
            return mixScore;
          }
          default:
            return 0;
        }
      })
    );
    score += timeScore;
  }

  if (riskSelections.length && attrs.risk) {
    const riskScore = Math.max(
      0,
      ...riskSelections.map(selection => {
        switch (selection) {
          case "low":
            if (attrs.risk === "low") {
              return 3;
            }
            if (attrs.risk === "medium") {
              return 1;
            }
            return 0;
          case "medium":
            if (attrs.risk === "medium") {
              return 3;
            }
            if (attrs.risk !== "high") {
              return 1;
            }
            return 0;
          case "high":
            if (attrs.risk === "high") {
              return 3;
            }
            if (attrs.risk === "medium") {
              return 1;
            }
            return 0;
          default:
            return 0;
        }
      })
    );
    score += riskScore;
  }

  if (styleSelections.length && matchesStyle(styleSelections, attrs.styles)) {
    score += 3;
  }

  if (techSelections.length && attrs.tech) {
    const techScore = Math.max(
      0,
      ...techSelections.map(selection => {
        switch (selection) {
          case "low":
            if (attrs.tech === "low") {
              return 3;
            }
            if (attrs.tech === "medium") {
              return 1;
            }
            return 0;
          case "medium":
            if (attrs.tech === "medium") {
              return 3;
            }
            if (attrs.tech === "low" || attrs.tech === "high") {
              return 1;
            }
            return 0;
          case "high":
            if (attrs.tech === "high") {
              return 3;
            }
            if (attrs.tech === "medium") {
              return 1;
            }
            return 0;
          default:
            return 0;
        }
      })
    );
    score += techScore;
  }

  if (assetSelections.includes("commodities")) {
    let commodityScore = 0;
    if (commoditySelections.includes("gold") && module.key === "RohstoffeGold") {
      commodityScore = 3;
    }
    if (commoditySelections.includes("oil") && module.key === "RohstoffeOil") {
      commodityScore = 3;
    }
    if (commoditySelections.includes("agrar") && module.key === "RohstoffeAgrar") {
      commodityScore = 3;
    }
    if (commodityScore === 0 && attrs.asset === "commodities") {
      commodityScore = 1;
    }
    score += commodityScore;
  }

  return score;
}

function formatScore(score, maxScore) {
  if (!maxScore) {
    return 0;
  }
  return Math.round((score / maxScore) * 100);
}

export default function Quiz() {
  const [answers, setAnswers] = useState(() => createInitialAnswers());
  const [showDetails, setShowDetails] = useState(false);

  const commoditySelected = answers.asset.includes("commodities");

  const activeQuestions = useMemo(() => {
    if (commoditySelected) {
      return [...baseQuestions, commodityQuestion];
    }
    return baseQuestions;
  }, [commoditySelected]);

  const requiredQuestionIds = useMemo(
    () => activeQuestions.map(question => question.id),
    [activeQuestions],
  );

  const maxScore = requiredQuestionIds.length * 3;

  const complete = useMemo(
    () =>
      requiredQuestionIds.every(id => {
        const value = answers[id];
        return Array.isArray(value) ? value.length > 0 : Boolean(value);
      }),
    [answers, requiredQuestionIds],
  );

  useEffect(() => {
    if (!commoditySelected && answers.commodityFocus.length) {
      setAnswers(prev => ({ ...prev, commodityFocus: [] }));
    }
  }, [commoditySelected, answers.commodityFocus.length]);

  const toggleOption = (questionId, value) => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      const exists = current.includes(value);
      const nextValues = exists
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [questionId]: nextValues };
    });
  };

  const results = useMemo(() => {
    if (!complete) {
      return [];
    }
    return tradingModules
      .map(module => ({
        module,
        score: scoreModule(module, answers)
      }))
      .sort((a, b) => b.score - a.score);
  }, [answers, complete]);

  const best = results[0];
  const runnerUps = results.slice(1, 3);
  const advice = best ? buildAdvice(best.module, answers) : null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Welcher Trading-Typ bist du?</h1>
      <p className="text-center text-gray-500 mb-8">
        Beantworte ein paar kurze Fragen, kreuze mehrere Antworten an und erhalte eine Empfehlung, welches unserer Trading-Module am besten zu dir passt.
      </p>

      <div className="space-y-8">
        {activeQuestions.map(question => (
          <div key={question.id} className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{question.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300 mb-4">Mehrfachauswahl möglich.</p>
            <div className="space-y-3">
              {question.options.map(option => {
                const selections = answers[question.id] || [];
                const checked = selections.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 cursor-pointer rounded-lg border p-3 transition-colors ${
                      checked
                        ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40"
                        : "border-slate-200 dark:border-gray-700 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={question.id}
                      value={option.value}
                      checked={checked}
                      onChange={() => toggleOption(question.id, option.value)}
                      className="mt-1"
                    />
                    <span className="text-slate-700 dark:text-slate-200">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {complete ? (
        <div className="mt-10 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Dein Ergebnis</h2>
          {best ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <p className="uppercase text-xs tracking-widest text-blue-500 dark:text-blue-300 font-semibold">Empfohlener Trading-Typ</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{best.module.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{best.module.type}</p>
                  <p className="mt-2 text-slate-600 dark:text-slate-200">{best.module.hint}</p>
                </div>
                <div className="md:text-right">
                  <span className="text-sm uppercase text-slate-400">Match</span>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{formatScore(best.score, maxScore)}%</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <Link
                  to="/trading-guide"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
                >
                  Passendes Modul öffnen
                </Link>
                <button
                  type="button"
                  onClick={() => setShowDetails(current => !current)}
                  className="px-4 py-2 rounded border border-blue-200 text-blue-600 dark:text-blue-300 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  {showDetails ? "Details ausblenden" : "Alle Ergebnisse anzeigen"}
                </button>
              </div>

              {advice && (
                <div className="mb-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500 rounded-lg p-4">
                  <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Einschätzung</p>
                  <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">{advice.summary}</p>
                  {advice.positives.map((message, index) => (
                    <p key={`positive-${index}`} className="text-sm text-blue-900 dark:text-blue-100">Pro: {message}</p>
                  ))}
                  {advice.cautions.map((message, index) => (
                    <p key={`caution-${index}`} className="text-sm text-red-700 dark:text-red-300">Hinweis: {message}</p>
                  ))}
                </div>
              )}

              {runnerUps.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm uppercase text-slate-400 font-semibold mb-2">Weitere starke Matches</p>
                  <ul className="space-y-2">
                    {runnerUps.map(result => (
                      <li
                        key={result.module.key}
                        className="flex items-center justify-between bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2"
                      >
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-100">{result.module.label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-300">{result.module.type}</p>
                        </div>
                        <span className="text-blue-600 dark:text-blue-300 font-semibold">{formatScore(result.score, maxScore)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {showDetails && (
                <div className="mt-6">
                  <p className="text-sm uppercase text-slate-400 font-semibold mb-3">Gesamtergebnis</p>
                  <div className="space-y-2">
                    {results.map(result => (
                      <div key={result.module.key} className="flex items-center gap-3">
                        <div className="w-40 text-sm font-medium text-slate-600 dark:text-slate-200">{result.module.label}</div>
                        <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-gray-700 overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${formatScore(result.score, maxScore)}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-blue-600 dark:text-blue-300 font-semibold">
                          {formatScore(result.score, maxScore)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-slate-600 dark:text-slate-200">Leider kein eindeutiges Ergebnis gefunden. Bitte überprüfe deine Antworten.</p>
          )}
        </div>
      ) : (
        <div className="mt-10 text-center text-slate-500 dark:text-slate-300">
          Bitte beantworte alle Fragen, um dein Profil zu sehen.
        </div>
      )}
    </div>
  );
}
