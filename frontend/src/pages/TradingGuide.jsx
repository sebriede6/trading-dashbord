import React, { useState } from "react";
import ForexScalper from "../strategies/ForexScalper";
import ForexSwingTrader from "../strategies/ForexSwingTrader";
import ForexBreakout from "../strategies/ForexBreakout";
import ForexRangeTrader from "../strategies/ForexRangeTrader";
import KryptoHodler from "../strategies/KryptoHodler";
import KryptoArbitrageur from "../strategies/KryptoArbitrageur";
import KryptoMomentumTrader from "../strategies/KryptoMomentumTrader";
import KryptoTrendTrader from "../strategies/KryptoTrendTrader";
import AktienValueInvestor from "../strategies/AktienValueInvestor";
import AktienGrowthInvestor from "../strategies/AktienGrowthInvestor";
import AktienDividendenStrategie from "../strategies/AktienDividendenStrategie";
import AktienSwingTrader from "../strategies/AktienSwingTrader";
import RohstoffeGold from "../strategies/RohstoffeGold";
import RohstoffeOil from "../strategies/RohstoffeOil";
import RohstoffeAgrar from "../strategies/RohstoffeAgrar";
import { tradingModules } from "../data/tradingModules";

export default function TradingGuide() {
  const [modal, setModal] = useState({ open: false, key: null });

  const strategyComponents = {
    ForexScalper,
    ForexSwingTrader,
    ForexBreakout,
    ForexRangeTrader,
    KryptoHodler,
    KryptoArbitrageur,
    KryptoMomentumTrader,
    KryptoTrendTrader,
    AktienValueInvestor,
    AktienGrowthInvestor,
    AktienDividendenStrategie,
    AktienSwingTrader,
    RohstoffeGold,
    RohstoffeOil,
    RohstoffeAgrar,
  };

  const handleOpen = (key) => setModal({ open: true, key });
  const handleClose = () => setModal({ open: false, key: null });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Trading Strategie Guide</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tradingModules.map((s) => (
          <button
            key={s.key}
            className="block bg-indigo-50 rounded-lg p-4 shadow hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition cursor-pointer text-left w-full"
            title={`Mehr zu ${s.label}`}
            onClick={() => handleOpen(s.key)}
          >
            <h3 className="text-lg font-bold text-indigo-800 mb-2">{s.label}</h3>
            <div className="text-sm text-gray-700 mb-1">Typ: <span className="font-semibold">{s.type}</span></div>
            <div className="text-xs text-gray-500 mb-2">{s.hint}</div>
            <span className="text-indigo-600 underline">Modul öffnen</span>
          </button>
        ))}
      </div>
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-gray-100 rounded-lg shadow-lg p-8 max-w-2xl w-full relative" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-2xl"
              onClick={handleClose}
              title="Schließen"
            >
              &times;
            </button>
            {(() => {
              const StrategyComponent = strategyComponents[modal.key];
              return StrategyComponent ? <StrategyComponent /> : <div>Strategie nicht gefunden.</div>;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
