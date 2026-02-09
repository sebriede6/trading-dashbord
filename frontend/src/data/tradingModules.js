export const tradingModules = [
  {
    key: "ForexScalper",
    label: "Forex Scalper",
    type: "Aktiv, schnell, entscheidungsfreudig",
    hint: "Für Menschen, die schnelle Entscheidungen mögen und Stress gut kontrollieren können.",
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
    type: "Geduldig, analytisch, mittelfristig",
    hint: "Für Geduldige, die gerne Trends analysieren und nicht ständig am Bildschirm sitzen wollen.",
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
    type: "Chancenorientiert, risikobewusst",
    hint: "Für Trader, die gerne auf starke Bewegungen setzen und schnelle Chancen suchen.",
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
    type: "Ruhig, systematisch, ausdauernd",
    hint: "Für Menschen, die gerne Muster erkennen und auf Seitwärtsphasen setzen.",
    attributes: {
      asset: "forex",
      timeframe: "swing",
      risk: "medium",
      styles: ["range", "mean-reversion"],
      tech: "low"
    }
  },
  {
    key: "KryptoHodler",
    label: "Krypto Hodler",
    type: "Langfristig, sicherheitsorientiert",
    hint: "Für Investoren, die an die Zukunft glauben und starke Nerven haben.",
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
    hint: "Für Menschen, die gerne mit Tools und Bots arbeiten und schnelle Chancen nutzen.",
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
    type: "Trendfolger, risikofreudig",
    hint: "Für Trader, die starke Bewegungen lieben und Trends reiten wollen.",
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
    type: "Geduldig, strategisch, diszipliniert",
    hint: "Für Menschen, die gerne langfristige Trends handeln und Disziplin mitbringen.",
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
    type: "Fundamental, geduldig, sicherheitsorientiert",
    hint: "Für Investoren, die auf solide Unternehmen setzen und langfristig denken.",
    attributes: {
      asset: "stocks",
      timeframe: "longterm",
      risk: "low",
      styles: ["invest", "value"],
      tech: "low"
    }
  },
  {
    key: "AktienGrowthInvestor",
    label: "Aktien Growth Investor",
    type: "Zukunftsorientiert, innovationsfreudig",
    hint: "Für Menschen, die an Wachstum und neue Technologien glauben.",
    attributes: {
      asset: "stocks",
      timeframe: "longterm",
      risk: "medium",
      styles: ["invest", "trend"],
      tech: "medium"
    }
  },
  {
    key: "AktienDividendenStrategie",
    label: "Aktien Dividenden Strategie",
    type: "Einkommensorientiert, risikoarm",
    hint: "Für Investoren, die regelmäßige Erträge und Stabilität suchen.",
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
    type: "Flexibel, trendbewusst",
    hint: "Für Trader, die gerne mittelfristige Bewegungen handeln und flexibel sind.",
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
    type: "Sicherheitsorientiert, krisenfest",
    hint: "Für Menschen, die auf Werterhalt und Krisenschutz setzen.",
    attributes: {
      asset: "commodities",
      timeframe: "longterm",
      risk: "low",
      styles: ["hedge", "invest"],
      tech: "low"
    }
  },
  {
    key: "RohstoffeOil",
    label: "Rohstoffe Öl",
    type: "Chancenorientiert, volatilitätsaffin",
    hint: "Für Trader, die mit schnellen Richtungswechseln umgehen können.",
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
    type: "Nachhaltig, langfristig",
    hint: "Für Investoren, die auf nachhaltige Trends und Agrarwirtschaft setzen.",
    attributes: {
      asset: "commodities",
      timeframe: "longterm",
      risk: "medium",
      styles: ["invest", "trend"],
      tech: "low"
    }
  }
];
