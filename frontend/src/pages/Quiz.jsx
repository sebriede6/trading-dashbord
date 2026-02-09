import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { tradingModules } from "../data/tradingModules";

const questions = [
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

function scoreModule(module, answers) {
  const attrs = module.attributes || {};
  let score = 0;

  switch (answers.asset) {
    case "forex":
    case "crypto":
    case "stocks":
    case "commodities":
      if (attrs.asset === answers.asset) {
        score += 3;
      }
      break;
    case "flex":
      score += 1;
      break;
    default:
      break;
  }

  switch (answers.time) {
    case "intraday":
      if (attrs.timeframe === "intraday") {
        score += 3;
      } else if (attrs.timeframe === "swing") {
        score += 2;
      }
      break;
    case "swing":
      if (attrs.timeframe === "swing") {
        score += 3;
      } else if (attrs.timeframe === "intraday" || attrs.timeframe === "longterm") {
        score += 1;
      }
      break;
    case "longterm":
      if (attrs.timeframe === "longterm") {
        score += 3;
      } else if (attrs.timeframe === "swing") {
        score += 1;
      }
      break;
    case "mix":
      if (attrs.timeframe === "swing" || attrs.timeframe === "intraday") {
        score += 2;
      }
      if (attrs.styles?.includes("invest")) {
        score += 1;
      }
      break;
    default:
      break;
  }

  switch (answers.risk) {
    case "low":
      if (attrs.risk === "low") {
        score += 3;
      } else if (attrs.risk === "medium") {
        score += 1;
      }
      break;
    case "medium":
      if (attrs.risk === "medium") {
        score += 3;
      } else if (attrs.risk !== "high") {
        score += 1;
      }
      break;
    case "high":
      if (attrs.risk === "high") {
        score += 3;
      } else if (attrs.risk === "medium") {
        score += 1;
      }
      break;
    default:
      break;
  }

  if (answers.style) {
    const styleMatches = {
      scalping: ["scalping", "momentum", "breakout"],
      trend: ["trend", "momentum", "swing"],
      range: ["range", "mean-reversion"],
      invest: ["invest", "income", "value", "hold", "hedge"],
      automation: ["automation", "arbitrage"]
    };
    const targets = styleMatches[answers.style] || [answers.style];
    if (attrs.styles?.some(style => targets.includes(style))) {
      score += 3;
    }
  }

  switch (answers.tech) {
    case "low":
      if (attrs.tech === "low") {
        score += 3;
      } else if (attrs.tech === "medium") {
        score += 1;
      }
      break;
    case "medium":
      if (attrs.tech === "medium") {
        score += 3;
      } else if (attrs.tech === "low" || attrs.tech === "high") {
        score += 1;
      }
      break;
    case "high":
      if (attrs.tech === "high") {
        score += 3;
      } else if (attrs.tech === "medium") {
        score += 1;
      }
      break;
    default:
      break;
  }

  return score;
}

function formatScore(score, maxScore) {
  return Math.round((score / maxScore) * 100);
}

export default function Quiz() {
  const [answers, setAnswers] = useState({ asset: "", time: "", risk: "", style: "", tech: "" });
  const [showDetails, setShowDetails] = useState(false);

  const maxScore = questions.length * 3;
  const complete = Object.values(answers).every(Boolean);

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

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Welcher Trading-Typ bist du?</h1>
      <p className="text-center text-gray-500 mb-8">
        Beantworte fünf kurze Fragen und erhalte eine Empfehlung, welches unserer Trading-Module am besten zu dir passt.
      </p>

      <div className="space-y-8">
        {questions.map(question => (
          <div key={question.id} className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">{question.title}</h2>
            <div className="space-y-3">
              {question.options.map(option => {
                const checked = answers[question.id] === option.value;
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
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={checked}
                      onChange={() => setAnswers(prev => ({ ...prev, [question.id]: option.value }))}
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
                  onClick={() => setShowDetails(d => !d)}
                  className="px-4 py-2 rounded border border-blue-200 text-blue-600 dark:text-blue-300 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  {showDetails ? "Details ausblenden" : "Alle Ergebnisse anzeigen"}
                </button>
              </div>

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
