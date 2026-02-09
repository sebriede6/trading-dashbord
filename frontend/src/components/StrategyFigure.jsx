import React from "react";
import PropTypes from "prop-types";

const quickChartUrl = (config) =>
  `https://quickchart.io/chart?backgroundColor=white&width=900&height=480&format=png&c=${encodeURIComponent(
    JSON.stringify(config),
  )}`;

const createLineChart = ({
  labels,
  prices,
  entries = [],
  exits = [],
  title,
  lineColor = "#38bdf8",
  areaFill = "rgba(59,130,246,0.12)",
}) => {
  const datasets = [
    {
      label: "Preis",
      data: prices,
      borderColor: lineColor,
      backgroundColor: areaFill,
      fill: true,
      tension: 0.35,
      borderWidth: 3,
      pointRadius: 0,
    },
  ];

  if (entries.length) {
    datasets.push({
      type: "scatter",
      label: "Entry",
      data: entries.map(({ index, value }) => ({
        x: labels[index],
        y: typeof value === "number" ? value : prices[index],
      })),
      pointBackgroundColor: "#22c55e",
      pointBorderColor: "#14532d",
      pointRadius: 6,
    });
  }

  if (exits.length) {
    datasets.push({
      type: "scatter",
      label: "Exit",
      data: exits.map(({ index, value }) => ({
        x: labels[index],
        y: typeof value === "number" ? value : prices[index],
      })),
      pointBackgroundColor: "#f97316",
      pointBorderColor: "#7c2d12",
      pointRadius: 6,
    });
  }

  const config = {
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 16 },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#0f172a",
            font: { size: 14, family: "Inter, system-ui, -apple-system" },
          },
        },
        title: title
          ? {
              display: true,
              text: title,
              color: "#0f172a",
              font: { size: 18, weight: "600", family: "Inter, system-ui, -apple-system" },
            }
          : undefined,
        tooltip: {
          callbacks: {
            label: (context) => {
              const raw = context.raw;
              if (raw && typeof raw === "object" && "y" in raw) {
                return `${context.dataset.label}: ${raw.y.toFixed(2)}`;
              }
              return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(148, 163, 184, 0.24)" },
          ticks: {
            color: "#475569",
            font: { size: 12, family: "Inter, system-ui, -apple-system" },
          },
        },
        y: {
          beginAtZero: false,
          grid: { color: "rgba(148, 163, 184, 0.2)" },
          ticks: {
            color: "#475569",
            font: { size: 12, family: "Inter, system-ui, -apple-system" },
          },
        },
      },
    },
  };

  return quickChartUrl(config);
};

const FIGURE_PRESETS = {
  equityDay: {
    background: "linear-gradient(135deg, rgba(236,72,153,0.12), rgba(59,130,246,0.08))",
    imageUrl: createLineChart({
      labels: ["09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05"],
      prices: [401.5, 402.2, 403.1, 404.9, 405.7, 405.2, 406.4, 407.8],
      entries: [{ index: 3 }],
      exits: [{ index: 7 }],
      title: "VWAP Breakout & Morning Drive",
      lineColor: "#ec4899",
      areaFill: "rgba(236,72,153,0.18)",
    }),
    imageAlt: "Intraday breakout chart mit markiertem Entry und Exit",
  },
  equityDividend: {
    background: "linear-gradient(135deg, rgba(250,204,21,0.12), rgba(14,165,233,0.1))",
    imageUrl: createLineChart({
      labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
      prices: [1.0, 1.05, 1.08, 1.12, 1.17, 1.22, 1.28, 1.33],
      entries: [{ index: 0, value: 1.0 }],
      exits: [{ index: 7, value: 1.33 }],
      title: "Dividend Growth Ladder",
      lineColor: "#facc15",
      areaFill: "rgba(250,204,21,0.24)",
    }),
    imageAlt: "Langfristiger Dividendengraph mit Einstieg und Ausstieg",
  },
  equityGrowth: {
    background: "linear-gradient(135deg, rgba(251,113,133,0.12), rgba(56,189,248,0.1))",
    imageUrl: createLineChart({
      labels: ["2023-Q1", "2023-Q2", "2023-Q3", "2023-Q4", "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
      prices: [48, 53, 59, 66, 74, 83, 95, 108],
      entries: [{ index: 2 }],
      exits: [{ index: 7 }],
      title: "Revenue Acceleration Breakout",
      lineColor: "#fb7185",
      areaFill: "rgba(251,113,133,0.2)",
    }),
    imageAlt: "Wachstumsaktie mit beschleunigendem Trend",
  },
  equitySwing: {
    background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(129,140,248,0.1))",
    imageUrl: createLineChart({
      labels: ["Mo", "Di", "Mi", "Do", "Fr", "Mo", "Di", "Mi"],
      prices: [64, 60, 68, 62, 70, 65, 73, 67],
      entries: [{ index: 1 }],
      exits: [{ index: 4 }],
      title: "Swing High/Low Rotation",
      lineColor: "#6366f1",
      areaFill: "rgba(99,102,241,0.2)",
    }),
    imageAlt: "Swing-Trading-Chart mit markierten Trendwechseln",
  },
  equityValue: {
    background: "linear-gradient(135deg, rgba(234,179,8,0.14), rgba(30,64,175,0.1))",
    imageUrl: createLineChart({
      labels: ["FY17", "FY18", "FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
      prices: [52, 55, 57, 54, 59, 63, 68, 72],
      entries: [{ index: 3 }],
      exits: [{ index: 7 }],
      title: "Value Re-Rating nach Unterbewertung",
      lineColor: "#fbbf24",
      areaFill: "rgba(250,204,21,0.22)",
    }),
    imageAlt: "Value-Investing-Chart mit Bewertungsanpassung",
  },
  forexScalper: {
    background: "linear-gradient(135deg, rgba(129,140,248,0.12), rgba(168,85,247,0.08))",
    imageUrl: createLineChart({
      labels: ["09:01", "09:03", "09:05", "09:07", "09:09", "09:11", "09:13", "09:15"],
      prices: [1.0862, 1.0868, 1.0873, 1.0879, 1.0871, 1.0876, 1.0881, 1.0875],
      entries: [{ index: 2, value: 1.0873 }],
      exits: [{ index: 4, value: 1.0871 }],
      title: "EUR/USD Scalping: Momentum Burst",
      lineColor: "#a855f7",
      areaFill: "rgba(168,85,247,0.22)",
    }),
    imageAlt: "Forex-Scalping-Chart mit Sekunden-hold",
  },
  forexSwing: {
    background: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(14,116,144,0.12))",
    imageUrl: createLineChart({
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
      prices: [1.247, 1.254, 1.261, 1.257, 1.269, 1.276, 1.268, 1.279],
      entries: [{ index: 1 }],
      exits: [{ index: 6 }],
      title: "Cable Swing mit Pullback-Kauf",
      lineColor: "#38bdf8",
      areaFill: "rgba(56,189,248,0.2)",
    }),
    imageAlt: "Swing-Trading-Chart im Forex-Markt",
  },
  forexBreakout: {
    background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(99,102,241,0.1))",
    imageUrl: createLineChart({
      labels: ["Tag -3", "Tag -2", "Tag -1", "London", "NY Open", "NY +2h", "NY Close", "Asien"],
      prices: [0.864, 0.866, 0.868, 0.871, 0.879, 0.885, 0.889, 0.892],
      entries: [{ index: 3 }],
      exits: [{ index: 6 }],
      title: "GBP/CHF Range Break",
      lineColor: "#f97316",
      areaFill: "rgba(249,115,22,0.2)",
    }),
    imageAlt: "Forex-Breakout-Chart mit Range-Ausbruch",
  },
  forexRange: {
    background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(45,212,191,0.08))",
    imageUrl: createLineChart({
      labels: ["20:00", "22:00", "00:00", "02:00", "04:00", "06:00", "08:00", "10:00"],
      prices: [1.352, 1.349, 1.353, 1.35, 1.354, 1.351, 1.355, 1.352],
      entries: [{ index: 1 }],
      exits: [{ index: 2 }],
      title: "Range Bounce im Asia-Session",
      lineColor: "#34d399",
      areaFill: "rgba(52,211,153,0.18)",
    }),
    imageAlt: "Seitwärtsmarkt im Forex mit Rebound",
  },
  forexNews: {
    background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(244,114,182,0.08))",
    imageUrl: createLineChart({
      labels: ["08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00"],
      prices: [1.099, 1.101, 1.128, 1.136, 1.131, 1.134, 1.138, 1.141],
      entries: [{ index: 2 }],
      exits: [{ index: 7 }],
      title: "NFP Momentum Capture",
      lineColor: "#f97316",
      areaFill: "rgba(249,115,22,0.18)",
    }),
    imageAlt: "News-Trading-Chart mit volatiler Bewegung",
  },
  commodityGold: {
    background: "linear-gradient(135deg, rgba(252,211,77,0.14), rgba(251,191,36,0.1))",
    imageUrl: createLineChart({
      labels: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug"],
      prices: [1875, 1894, 1930, 1988, 2024, 2056, 2081, 2110],
      entries: [{ index: 2 }],
      exits: [{ index: 7 }],
      title: "Gold Breakout über psychologische Marke",
      lineColor: "#fcd34d",
      areaFill: "rgba(252,211,77,0.22)",
    }),
    imageAlt: "Goldpreis-Chart mit Breakout",
  },
  commodityOil: {
    background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(239,68,68,0.09))",
    imageUrl: createLineChart({
      labels: ["Mo", "Di", "Mi", "Do", "Fr", "Mo", "Di", "Mi"],
      prices: [78.5, 80.2, 77.4, 81.6, 83.1, 82.4, 84.9, 86.2],
      entries: [{ index: 2 }],
      exits: [{ index: 6 }],
      title: "Inventar-getriebener Öl-Impuls",
      lineColor: "#f97316",
      areaFill: "rgba(249,115,22,0.2)",
    }),
    imageAlt: "Ölpreis-Chart mit Inventarspike",
  },
  commodityAgrar: {
    background: "linear-gradient(135deg, rgba(74,222,128,0.12), rgba(45,212,191,0.08))",
    imageUrl: createLineChart({
      labels: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug"],
      prices: [4.1, 4.3, 4.5, 4.4, 4.8, 5.0, 5.1, 4.9],
      entries: [{ index: 2 }],
      exits: [{ index: 6 }],
      title: "Mais-Future Saisontrade",
      lineColor: "#4ade80",
      areaFill: "rgba(74,222,128,0.22)",
    }),
    imageAlt: "Agrarrohstoff-Chart mit saisonaler Rally",
  },
  commodityEvent: {
    background: "linear-gradient(135deg, rgba(248,113,113,0.12), rgba(59,130,246,0.08))",
    imageUrl: createLineChart({
      labels: ["Woche -3", "Woche -2", "Woche -1", "Event", "+1", "+2", "+3", "+4"],
      prices: [64, 66, 65, 78, 72, 74, 70, 68],
      entries: [{ index: 3 }],
      exits: [{ index: 4 }],
      title: "Event Risk Fade",
      lineColor: "#ef4444",
      areaFill: "rgba(239,68,68,0.18)",
    }),
    imageAlt: "Eventgetriebener Rohstoff-Chart",
  },
  commoditySeasonal: {
    background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(37,99,235,0.06))",
    imageUrl: createLineChart({
      labels: ["Nov", "Dez", "Jan", "Feb", "Mrz", "Apr", "Mai", "Jun"],
      prices: [2.8, 2.9, 3.2, 3.5, 3.3, 3.6, 3.4, 3.1],
      entries: [{ index: 2 }],
      exits: [{ index: 6 }],
      title: "Heizöl Saisonmuster",
      lineColor: "#22c55e",
      areaFill: "rgba(34,197,94,0.18)",
    }),
    imageAlt: "Saisonaler Rohstoff-Chart",
  },
  commodityTrend: {
    background: "linear-gradient(135deg, rgba(207,250,254,0.09), rgba(250,204,21,0.12))",
    imageUrl: createLineChart({
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
      prices: [52, 54, 56, 59, 62, 65, 68, 71],
      entries: [{ index: 2 }],
      exits: [{ index: 7 }],
      title: "Trendfolge mit Trailing Stop",
      lineColor: "#eab308",
      areaFill: "rgba(234,179,8,0.18)",
    }),
    imageAlt: "Trendfolgechart im Rohstoffmarkt",
  },
  cryptoHodl: {
    background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(59,130,246,0.06))",
    imageUrl: createLineChart({
      labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
      prices: [4500, 7200, 11000, 42000, 18000, 31000, 43000, 62000],
      entries: [{ index: 1 }],
      exits: [{ index: 7 }],
      title: "Bitcoin Halving Cycle",
      lineColor: "#f97316",
      areaFill: "rgba(249,115,22,0.2)",
    }),
    imageAlt: "Bitcoin Langfristchart mit Halving-Zyklen",
  },
  cryptoArb: {
    background: "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(45,212,191,0.12))",
    imageUrl: createLineChart({
      labels: ["T-30", "T-25", "T-20", "T-15", "T-10", "T-5", "T0", "T+5"],
      prices: [1.002, 1.001, 1.003, 1.000, 1.004, 1.001, 1.003, 1.000],
      entries: [{ index: 2 }],
      exits: [{ index: 4 }],
      title: "USDT Triangular Spread",
      lineColor: "#2dd4bf",
      areaFill: "rgba(45,212,191,0.2)",
    }),
    imageAlt: "Krypto-Arbitrage-Chart mit geringen Abweichungen",
  },
  cryptoMomentum: {
    background: "linear-gradient(135deg, rgba(244,114,182,0.12), rgba(56,189,248,0.08))",
    imageUrl: createLineChart({
      labels: ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6", "Tag 7", "Tag 8"],
      prices: [140, 146, 159, 172, 188, 210, 236, 228],
      entries: [{ index: 2 }],
      exits: [{ index: 7 }],
      title: "Altcoin Momentum Extension",
      lineColor: "#f472b6",
      areaFill: "rgba(244,114,182,0.2)",
    }),
    imageAlt: "Krypto-Momentum-Chart mit Ausstieg nach Schwäche",
  },
  cryptoTrend: {
    background: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(15,118,110,0.08))",
    imageUrl: createLineChart({
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
      prices: [1.1, 1.18, 1.24, 1.32, 1.28, 1.38, 1.47, 1.55],
      entries: [{ index: 1 }],
      exits: [{ index: 7 }],
      title: "Layer2 Trendfolge",
      lineColor: "#38bdf8",
      areaFill: "rgba(56,189,248,0.2)",
    }),
    imageAlt: "Krypto-Trendfolgechart",
  },
  default: {
    background: "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(14,165,233,0.1))",
    imageUrl: createLineChart({
      labels: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"],
      prices: [10, 12, 14, 13, 16, 18, 19, 21],
      entries: [{ index: 1 }],
      exits: [{ index: 6 }],
      title: "Strategie-Visualisierung",
      lineColor: "#38bdf8",
      areaFill: "rgba(56,189,248,0.2)",
    }),
    imageAlt: "Allgemeiner Trading-Chart",
  },
};

const StrategyFigure = ({
  title,
  caption,
  href,
  linkLabel,
  variant = "default",
  imageUrl,
  imageAlt,
}) => {
  const preset = FIGURE_PRESETS[variant] || FIGURE_PRESETS.default;
  const resolvedImageUrl = imageUrl || preset.imageUrl;
  const resolvedImageAlt = imageAlt || preset.imageAlt || title;

  return (
    <figure
      className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 shadow-lg"
      style={{ backgroundImage: preset.background }}
    >
      <figcaption className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-200">
        {title}
      </figcaption>
      <div className="overflow-hidden rounded-lg bg-slate-950/40">
        {resolvedImageUrl ? (
          <img
            src={resolvedImageUrl}
            alt={resolvedImageAlt}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-48 items-center justify-center text-slate-400">
            Keine Abbildung verfügbar
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-slate-300">
        {caption}
        {href && linkLabel ? (
          <>
            {" "}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 underline offset-2 hover:text-sky-200"
            >
              {linkLabel}
            </a>
          </>
        ) : null}
      </p>
    </figure>
  );
};

StrategyFigure.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  href: PropTypes.string,
  linkLabel: PropTypes.string,
  variant: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
};

StrategyFigure.defaultProps = {
  href: undefined,
  linkLabel: undefined,
  variant: "default",
  imageUrl: undefined,
  imageAlt: undefined,
};

export default StrategyFigure;
