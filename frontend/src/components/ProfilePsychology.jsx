import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const FIELD_META = [
  { key: "motivation", label: "Motivation" },
  { key: "discipline", label: "Disziplin" },
  { key: "stress", label: "Stress" },
  { key: "focus", label: "Focus" },
  { key: "emotion", label: "Emotion" },
  { key: "confidence", label: "Confidence" }
];

function toInitialValue(value) {
  if (value === null || typeof value === "undefined") return "";
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : "";
}

function ProfilePsychology({ psychology, onSave, saving }) {
  const [values, setValues] = useState(() => {
    const initial = {};
    FIELD_META.forEach(({ key }) => {
      initial[key] = toInitialValue(psychology?.[key]);
    });
    return initial;
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const nextValues = {};
    FIELD_META.forEach(({ key }) => {
      nextValues[key] = toInitialValue(psychology?.[key]);
    });
    setValues(nextValues);
  }, [psychology]);

  useEffect(() => {
    if (!status) return undefined;
    const timer = setTimeout(() => setStatus(null), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSliderChange = (key, raw) => {
    const numeric = Number(raw);
    setValues((prev) => ({ ...prev, [key]: Number.isFinite(numeric) ? numeric : "" }));
  };

  const handleNumberChange = (key, raw) => {
    if (raw === "") {
      setValues((prev) => ({ ...prev, [key]: "" }));
      return;
    }
    const numeric = Number(raw);
    if (!Number.isFinite(numeric)) return;
    setValues((prev) => ({ ...prev, [key]: numeric }));
  };

  const handleReset = (key) => {
    setValues((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {};
    FIELD_META.forEach(({ key }) => {
      const raw = values[key];
      payload[key] = raw === "" ? null : Number(raw);
    });
    const result = await onSave(payload);
    if (result?.success) {
      setStatus({ type: "success", message: "Psychologie gespeichert." });
    } else {
      setStatus({
        type: "error",
        message: result?.message || "Speichern fehlgeschlagen."
      });
    }
  };

  return (
    <form className="bg-gray-900/80 rounded p-4 shadow mb-6" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-blue-300 font-bold">Psychologie</div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={saving}
        >
          {saving ? "Speichern..." : "Speichern"}
        </button>
      </div>
      <p className="text-xs text-blue-400 mb-3">
        Werte zwischen 0 und 10 (0 = sehr niedrig, 10 = sehr hoch). Feld leer lassen, um es zurückzusetzen.
      </p>
      {status && (
        <div className={`mb-3 text-sm font-semibold ${status.type === "error" ? "text-red-300" : "text-green-300"}`}>
          {status.message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FIELD_META.map(({ key, label }) => {
          const value = values[key];
          const displayValue = value === "" ? "-" : value;
          return (
            <div key={key} className="bg-gray-900/60 rounded p-3 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-blue-400">{label}</span>
                <span className="text-blue-200 text-lg">{displayValue}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={value === "" ? 0 : value}
                  onChange={(event) => handleSliderChange(key, event.target.value)}
                  className="flex-1 accent-blue-500"
                />
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={value === "" ? "" : value}
                  onChange={(event) => handleNumberChange(key, event.target.value)}
                  className="w-16 px-2 py-1 rounded border border-blue-500 bg-gray-900 text-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="-"
                />
                <button
                  type="button"
                  className="text-xs text-blue-300 hover:text-blue-100 underline"
                  onClick={() => handleReset(key)}
                >
                  Reset
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}

export default ProfilePsychology;

ProfilePsychology.propTypes = {
  psychology: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

ProfilePsychology.defaultProps = {
  psychology: {},
  saving: false
};
