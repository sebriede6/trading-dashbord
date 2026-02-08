import React from "react";
import PropTypes from "prop-types";

function formatNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "0";
  return numeric.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function formatCurrency(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "0,00 €";
  return `${numeric.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} €`;
}

function ProfileStats({ stats }) {
  const trades = formatNumber(stats?.trades);
  const pnl = formatCurrency(stats?.pnl);
  const todos = formatNumber(stats?.todos);
  const goals = formatNumber(stats?.goals);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-900/80 rounded p-4 text-center shadow">
        <div className="text-2xl font-bold text-blue-200">{trades}</div>
        <div className="text-blue-400">Trades</div>
      </div>
      <div className="bg-green-900/80 rounded p-4 text-center shadow">
        <div className="text-2xl font-bold text-green-200">{pnl}</div>
        <div className="text-green-400">Gewinn/Verlust</div>
      </div>
      <div className="bg-purple-900/80 rounded p-4 text-center shadow" data-testid="profile-todos-card">
        <div className="text-2xl font-bold text-purple-200">{todos}</div>
        <div className="text-purple-400">Todos</div>
      </div>
      <div className="bg-cyan-900/80 rounded p-4 text-center shadow">
        <div className="text-2xl font-bold text-cyan-200">{goals}</div>
        <div className="text-cyan-400">Ziele</div>
      </div>
    </div>
  );
}

ProfileStats.propTypes = {
  stats: PropTypes.shape({
    trades: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pnl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    todos: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    goals: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

export default ProfileStats;
