export const tradingModules = [
  {
    key: "ForexScalper",
    label: "Forex Scalper",
    type: "Hyperaktiv, blitzschnell, aufmerksam",
    hint: "Hohe Frequenz, enge Stops und kurze Haltezeiten: Dieses Modul richtet sich an Trader, die während der London- und New-York-Session permanent auf den Chart schauen, Mikrotrends erkennen und sofort reagieren wollen.",
    strengths: [
      "Sehr viele Setups pro Woche dank hoher Marktliquidität",
      "Eignet sich für Trader mit ausgeprägtem Fokus und schneller Entscheidungsfähigkeit",
      "Kombiniert Volumenprofile, Orderflow und kurzfristige Preisstrukturen"
    ],
    watchouts: [
      "Erfordert penibles Risiko- und Money-Management, da Fehltrades sich schnell summieren",
      "Hoher Stressfaktor – ohne klare Routine droht Entscheidungs-Müdigkeit",
      "Spreads und Slippage können Gewinne auffressen, besonders bei Nachrichten"
    ],
    attributes: {
      asset: "forex",
      timeframe: "intraday",
      risk: "high",
      styles: ["scalping", "momentum"],
      tech: "medium"
    }
  },
  {
    key: "ForexSwingTrader",
    label: "Forex Swing Trader",
    type: "Geduldig, analytisch, strukturiert",
    hint: "Ideal für Trader, die zwei- bis viermal pro Woche Setups handeln, auf klare Trendbewegungen warten und Fundamentaldaten mit Preisaktionen kombinieren.",
    strengths: [
      "Guter Kompromiss zwischen Aktivität und Zeitaufwand",
      "Setups lassen sich am Vortag planen und mit Alarmen überwachen",
      "Profitieren von Makro-Trends, ohne 24/7 am Chart zu sein"
    ],
    watchouts: [
      "Benötigt Disziplin, um Sideways-Phasen auszusitzen",
      "Stops müssen breiter gesetzt werden – sauberes Positionsmanagement ist Pflicht",
      "Fundamentale Events (FOMC, EZB) können Setups über Nacht negieren"
    ],
    attributes: {
      asset: "forex",
      timeframe: "swing",
      risk: "medium",
      styles: ["trend", "swing"],
      tech: "medium"
    }
  },
  {
    key: "ForexBreakout",
    label: "Forex Breakout",
    type: "Chancenorientiert, aggressiv, fokussiert",
    hint: "Für Trader, die auf explosive Bewegungen nach Konsolidierungen setzen, News-Impulse spielen und Momentum mit klaren Triggern handeln.",
    strengths: [
      "Hohe Chance-Risiko-Verhältnisse, wenn Breakouts sauber laufen",
      "Klare Regeln für Entry (Break), Confirmation und Retest",
      "Gute Kombination mit Volumen- oder COT-Daten"
    ],
    watchouts: [
      "Viele Fehlausbrüche – Geduld bei der Bestätigung notwendig",
      "Schnelle Bewegungen erfordern rasches Trade-Management",
      "News-Spikes können Stop-Losses rasieren"
    ],
    attributes: {
      asset: "forex",
      timeframe: "swing",
      risk: "high",
      styles: ["momentum", "breakout"],
      tech: "medium"
    }
  },
  {
    key: "ForexRangeTrader",
    label: "Forex Range Trader",
    type: "Ruhig, systematisch, geduldig",
    hint: "Konzentriert sich auf klar eingegrenzte Preisbereiche, nutzt Mean-Reversion-Strategien und arbeitet mit engen Stops rund um Unterstützungen und Widerstände.",
    strengths: [
      "Konstante Renditen in ruhigen Marktphasen",
      "Unkomplizierte Playbooks mit klaren Zonen (Supply/Demand)",
      "Passt gut zu Tradern, die strukturierte, wiederkehrende Setups lieben"
    ],
    watchouts: [
      "Breakouts zerstören das Setup – schnelle Reaktionen nötig",
      "Range-Märkte können plötzlich trendig werden (Fakeouts)",
      "Benötigt saubere Execution, sonst schrumpft das Chance-Risiko-Verhältnis"
    ],
    attributes: {
      asset: "forex",
      timeframe: "swing",
      risk: "medium",
      styles: ["range", "mean-reversion"],
      tech: "low"
    }
  },
  {
    key: "ForexNewsTrader",
    label: "Forex News Trader",
    type: "Nachrichtengetrieben, schnell, risikobewusst",
    hint: "Spielt makroökonomische Veröffentlichungen, nutzt Volatilitätsspitzen bei NFP, CPI und Zinsentscheiden und koppelt Orderflow mit Kalenderereignissen.",
    strengths: [
      "Klare Zeitfenster rund um Wirtschaftsnews",
      "Hohe Momentum-Bewegungen mit starken CRVs",
      "Lässt sich mit Options- oder Futures-Hedges kombinieren"
    ],
    watchouts: [
      "Starke Slippage und Spread-Ausweitungen bei Datenreleases",
      "Erfordert enges Risiko-Management und schnelle Execution",
      "News können ausfallen oder anders interpretiert werden"
    ],
    attributes: {
      asset: "forex",
      timeframe: "intraday",
      risk: "high",
      styles: ["news", "momentum"],
      tech: "medium"
    }
  },
  {
    key: "KryptoHodler",
    label: "Krypto Hodler",
    type: "Langfristig, fundamental, stoisch",
    hint: "Langfristige Positionen auf Bitcoin, Ether & Co., die von zyklischen Adoptionstrends profitieren und mit Staking oder Yield-Angeboten kombiniert werden.",
    strengths: [
      "Einfacher Workflow – monatliche Allokation genügt",
      "Partizipation an großen Makrozyklen und Adoption",
      "Lässt sich mit Sparplänen und Cold Storage kombinieren"
    ],
    watchouts: [
      "Hohe Drawdowns möglich – Risikostreuung über Stablecoins ratsam",
      "Regulatorische News können Langfrist-These gefährden",
      "Psychologische Belastung in Bärenmärkten enorm"
    ],
    attributes: {
      asset: "crypto",
      timeframe: "longterm",
      risk: "medium",
      styles: ["invest", "hold"],
      tech: "low"
    }
  },
  {
    key: "KryptoArbitrageur",
    label: "Krypto Arbitrageur",
    type: "Technikaffin, schnell, rational",
    hint: "Nutzt Preisunterschiede zwischen Börsen, Basis-Trades im Futures-Markt und automatisierte Bots, um risikoarme Prämien einzusammeln.",
    strengths: [
      "Relative Stabilität der Erträge bei konsequenter Ausführung",
      "Skalierbar durch API-Anbindungen und Bots",
      "Profitieren von Marktineffizienzen (Funding, Basis, Latency)"
    ],
    watchouts: [
      "Benötigt hohe technische Stabilität und Überwachung",
      "Exchange-Risiko (Custody, Hacks) muss aktiv gemanagt werden",
      "Fees und Slippage können Edge vernichten, wenn Volumen zu gering ist"
    ],
    attributes: {
      asset: "crypto",
      timeframe: "intraday",
      risk: "medium",
      styles: ["automation", "arbitrage"],
      tech: "high"
    }
  },
  {
    key: "KryptoMomentumTrader",
    label: "Krypto Momentum Trader",
    type: "Trendfolger, risikofreudig, agil",
    hint: "Spielt starke Aufwärts- oder Abwärtsbewegungen auf Layer-1-, Layer-2- und Narrative-Coins mit Momentum-Filtern und On-Chain-Daten.",
    strengths: [
      "Große Gewinnspannen in starken Trends",
      "Flexible Verwendung von Perpetuals für Long/Short",
      "Narrativ- und Sektor-Rotation sorgt für stetigen Setup-Nachschub"
    ],
    watchouts: [
      "Schwankungen extrem – striktes Stop-Management unverzichtbar",
      "Overtrading-Gefahr bei Seitwärtsphasen",
      "Funding-Kosten können Carry belasten"
    ],
    attributes: {
      asset: "crypto",
      timeframe: "swing",
      risk: "high",
      styles: ["momentum", "trend"],
      tech: "medium"
    }
  },
  {
    key: "KryptoTrendTrader",
    label: "Krypto Trend Trader",
    type: "Strategisch, diszipliniert, adaptiv",
    hint: "Greift mittelfristige Moves über gleitende Durchschnitte, Marktstruktur-Brüche und Makrotrends auf, kombiniert Spot- und Futures-Positionen.",
    strengths: [
      "Profitiert von mehrmonatigen Bewegungen (Halvings, ETF-Flows)",
      "Moderater Zeitaufwand – tägliche Checks reichen",
      "Lässt sich mit Portfolio-Rotation und Stablecoin-Hedges kombinieren"
    ],
    watchouts: [
      "Trendwechsel sind oft brutal – Absicherung über zwingende Stops",
      "Narrative kippen schnell, was zu Gaps führen kann",
      "Benötigt klares Regelwerk, um FOMO-Einstiege zu vermeiden"
    ],
    attributes: {
      asset: "crypto",
      timeframe: "longterm",
      risk: "medium",
      styles: ["trend", "invest"],
      tech: "medium"
    }
  },
  {
    key: "AktienValueInvestor",
    label: "Aktien Value Investor",
    type: "Fundamental, geduldig, konservativ",
    hint: "Langfristige Beteiligungen an unterbewerteten Qualitätsunternehmen mit Fokus auf Cashflows, Burggräben und Dividenden.",
    strengths: [
      "Solide Renditen bei geringer Volatilität",
      "Ertrag aus Dividenden und Kurssteigerungen",
      "Guter Fit für langfristige Vermögensplanung"
    ],
    watchouts: [
      "Wertetiefer Phasen können Jahre dauern – Geduld nötig",
      "Capex-Zyklen und Zinsumfeld beeinflussen Bewertung",
      "Research-Aufwand hoch, um Value-Traps zu vermeiden"
    ],
    attributes: {
      asset: "stocks",
      timeframe: "longterm",
      risk: "low",
      styles: ["invest", "value"],
      tech: "low"
    }
  },
  {
    key: "AktienDaytrader",
    label: "Aktien Daytrader",
    type: "Reaktionsschnell, fokussiert, risikoaffin",
    hint: "Handelt Intraday-Setups auf liquiden Large Caps, kombiniert Level-2-Daten, Volumenprofile und Marktstruktur rund um die Eröffnung.",
    strengths: [
      "Hohe Frequenz an Setups durch Pre-Market Scanner",
      "Intraday-Risiko ohne Overnight-Gaps",
      "Klares Regelwerk über Morning Drive und VWAP"
    ],
    watchouts: [
      "Belastende Bildschirmzeit und Stress",
      "Slippage bei stark bewegten Momentum-Names",
      "Strenges Tagesverlust-Limit nötig"
    ],
    attributes: {
      asset: "stocks",
      timeframe: "intraday",
      risk: "high",
      styles: ["daytrading", "momentum"],
      tech: "high"
    }
  },
  {
    key: "AktienGrowthInvestor",
    label: "Aktien Growth Investor",
    type: "Zukunftsorientiert, innovationsgetrieben, optimistisch",
    hint: "Investiert in Unternehmen mit starkem Umsatzwachstum, neuen Technologien und großem Total Addressable Market, oft kombiniert mit Trendfiltern.",
    strengths: [
      "Hohe Upside, wenn Gewinner früh identifiziert werden",
      "Megatrends (AI, GreenTech) liefern strukturelle Rückenwinde",
      "Lässt sich mit Options-Covered Calls für Cashflow ergänzen"
    ],
    watchouts: [
      "Bewertungen anfällig für Zinsveränderungen",
      "Starke Schwankungen in Bärenmärkten",
      "Erfordert laufendes Monitoring von Earnings und Guidance"
    ],
    attributes: {
      asset: "stocks",
      timeframe: "longterm",
      risk: "medium",
      styles: ["invest", "trend"],
      tech: "medium"
    }
  },
  {
    key: "AktienGrowthTrader",
    label: "Aktien Growth Trader",
    type: "Trendorientiert, selektiv, agil",
    hint: "Fokussiert sich auf Wachstumsaktien mit CAN SLIM Strukturen, Earnings-Breakouts und Sektorrelativer Stärke.",
    strengths: [
      "Hebt Momentum in führenden Branchen hervor",
      "Kombiniert Fundamentaldaten mit Charttechnik",
      "Klare Ausstiegssignale über Verlustbegrenzung"
    ],
    watchouts: [
      "Hohe Volatilität bei Wachstumswerten",
      "Bewertungsrisiko bei Zinsanstiegen",
      "Erfordert konsequentes Nachziehen der Stops"
    ],
    attributes: {
      asset: "stocks",
      timeframe: "swing",
      risk: "medium",
      styles: ["momentum", "trend"],
      tech: "medium"
    }
  },
  {
    key: "AktienDividendenStrategie",
    label: "Aktien Dividenden Strategie",
    type: "Einkommensorientiert, defensiv, beständig",
    hint: "Aufbau eines Portfolios aus Dividenden-Aristokraten, REITs und Infrastrukturwerten, das quartalsweise Cashflow generiert.",
    strengths: [
      "Planbare Ausschüttungen als passives Einkommen",
      "Geringere Volatilität als Wachstumswerte",
      "Lässt sich mit Dividend Reinvestment Plans automatisieren"
    ],
    watchouts: [
      "Zinserhöhungen können defensive Sektoren belasten",
      "Dividendenkürzungen in Krisen möglich",
      "Übergewichtung einzelner Sektoren (Versorger, Banken) vermeiden"
    ],
    attributes: {
      asset: "stocks",
      timeframe: "longterm",
      risk: "low",
      styles: ["income", "invest"],
      tech: "low"
    }
  },
  {
    key: "AktienSwingTrader",
    label: "Aktien Swing Trader",
    type: "Flexibel, trendbewusst, fokussiert",
    hint: "Handelt Breakouts und Pullbacks auf Mid- und Large-Caps, nutzt Volumenprofile, Earnings-Gaps und Sektorrelative-Stärke.",
    strengths: [
      "Viele Setups durch breite Aktienauswahl",
      "Lässt sich mit Screenern und Watchlists effizient vorbereiten",
      "Gute Balance aus Zeitaufwand und Potenzial"
    ],
    watchouts: [
      "Quartalszahlen und News können Trades zerstören",
      "Gap-Risiko über Nacht erfordert Positionsanpassung",
      "Benötigt konsequentes Nachziehen der Stops"
    ],
    attributes: {
      asset: "stocks",
      timeframe: "swing",
      risk: "medium",
      styles: ["trend", "swing"],
      tech: "medium"
    }
  },
  {
    key: "RohstoffeGold",
    label: "Rohstoffe Gold",
    type: "Volatil, taktisch, krisenbewusst",
    hint: "Kombiniert Gold als Safe-Haven-Narrativ mit hochfrequentem Intraday- und Swing-Trading rund um makroökonomische News, Realrenditen und USD-Stärke.",
    strengths: [
      "Hohe Liquidität in den Hauptsessions",
      "Profitiert von Flight-to-Safety und Inflationsszenarien",
      "Klares Regelwerk über Level (London Fixing, NY Open, Asien-Range)"
    ],
    watchouts: [
      "Starke Intraday-Schwankungen verlangen präzise Stops",
      "Makro-News (NFP, CPI, Fed) können Volatilität sprengen",
      "Swap-Kosten bei Overnight-Leverage beachten"
    ],
    attributes: {
      asset: "commodities",
      timeframe: "intraday",
      risk: "high",
      styles: ["momentum", "breakout", "hedge"],
      tech: "medium"
    }
  },
  {
    key: "RohstoffeOil",
    label: "Rohstoffe Öl",
    type: "Chancenorientiert, volatilitätsaffin, newsfokussiert",
    hint: "Spiel auf Supply-Demand-Schocks, OPEC-Entscheidungen und Lagerbestandsdaten. Nutzt News-Trading, Spread-Strategien und Saisonalitäten.",
    strengths: [
      "Große intraday Moves bieten attraktive CRVs",
      "Fundamentale Daten (API/EIA) liefern wöchentliche Trigger",
      "Hedge-Möglichkeiten über Crack-Spreads und Optionen"
    ],
    watchouts: [
      "Geopolitische Ereignisse sorgen für extreme Gaps",
      "Benötigt saubere Positionsgröße wegen hoher Volatilität",
      "Roll-Kosten bei Futures müssen einbezogen werden"
    ],
    attributes: {
      asset: "commodities",
      timeframe: "swing",
      risk: "high",
      styles: ["momentum", "trend"],
      tech: "medium"
    }
  },
  {
    key: "RohstoffeAgrar",
    label: "Rohstoffe Agrar",
    type: "Nachhaltig, langfristig, strukturiert",
    hint: "Setzt auf Saisonalitäten, Wetterdaten und globale Nachfragezyklen bei Soja, Mais, Weizen und Soft Commodities.",
    strengths: [
      "Diversifikation zum klassischen Aktien-/Forex-Exposure",
      "Fundamentale Daten (USDA-Reports) liefern klare Anker",
      "Geeignet für Position-Trader mit längerem Horizont"
    ],
    watchouts: [
      "Liquidität variiert stark zwischen den Kontrakten",
      "Wetter- und Politikrisiken schwer kalkulierbar",
      "Roll-Strategien für Futures notwendig, um Contango zu managen"
    ],
    attributes: {
      asset: "commodities",
      timeframe: "longterm",
      risk: "medium",
      styles: ["invest", "trend"],
      tech: "low"
    }
  },
  {
    key: "RohstoffeEventTrader",
    label: "Rohstoffe Event Trader",
    type: "Newsfokussiert, taktisch, opportunistisch",
    hint: "Spielt geopolitische Ereignisse, Wetterextreme und Regierungsentscheidungen mit schnellen Event-Fades und Absicherungen.",
    strengths: [
      "Große Bewegungen rund um planbare Ereignisse",
      "Flexibel kombinierbar mit Optionen zur Absicherung",
      "Eignet sich für Trader mit schneller Szenario-Analyse"
    ],
    watchouts: [
      "Hohe Gaps bei überraschenden Meldungen",
      "Benötigt verlässliche Newsfeeds und Alerts",
      "Positionsgrößen müssen wegen Volatilität reduziert werden"
    ],
    attributes: {
      asset: "commodities",
      timeframe: "intraday",
      risk: "high",
      styles: ["event", "mean-reversion"],
      tech: "medium"
    }
  },
  {
    key: "RohstoffeSeasonalTrader",
    label: "Rohstoffe Seasonal Trader",
    type: "Strukturiert, researchintensiv, geduldig",
    hint: "Nutzen saisonale Muster bei Energie- und Agrarrohstoffen, kombiniert Reports wie COT, USDA und Lagerbestände.",
    strengths: [
      "Planbare Setups basierend auf historischen Mustern",
      "Gute Ergänzung zu Trend- und Eventstrategien",
      "Lässt sich mit Spread-Strategien kombinieren"
    ],
    watchouts: [
      "Saisonalität kann sich durch Klimafaktoren verschieben",
      "Rollkosten bei Futures beeinträchtigen Rendite",
      "Benötigt diszipliniertes Risiko-Management"
    ],
    attributes: {
      asset: "commodities",
      timeframe: "swing",
      risk: "medium",
      styles: ["seasonal", "trend"],
      tech: "medium"
    }
  },
  {
    key: "RohstoffeTrendFollower",
    label: "Rohstoffe Trend Follower",
    type: "Systematisch, robust, diszipliniert",
    hint: "Folgt mittelfristigen Trends über gleitende Durchschnitte und Breakouts auf breiter Rohstoffpalette.",
    strengths: [
      "Profitiert von nachhaltigen Makrotrends",
      "Diversifikation über Energie, Metalle und Agrar",
      "Klar definierte Regeln für Entries und Ausstiege"
    ],
    watchouts: [
      "Starke Mean-Reversion-Phasen können Gewinne aufzehren",
      "Roll- und Finanzierungskosten beachten",
      "Braucht Geduld bei trendlosen Perioden"
    ],
    attributes: {
      asset: "commodities",
      timeframe: "swing",
      risk: "medium",
      styles: ["trend", "systematic"],
      tech: "medium"
    }
  }
];
