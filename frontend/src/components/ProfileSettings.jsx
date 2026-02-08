import React, { useState } from "react";
import PropTypes from "prop-types";

function ProfileSettings({ email, onChangePassword, savingPassword, onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(null);

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggle = () => {
    setShowForm(prev => !prev);
    setStatus(null);
    resetForm();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!onChangePassword) return;
    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "Passwörter stimmen nicht überein." });
      return;
    }
    if (newPassword.length < 8) {
      setStatus({ type: "error", message: "Das Passwort muss mindestens 8 Zeichen haben." });
      return;
    }
    const result = await onChangePassword({ currentPassword, newPassword });
    setStatus({
      type: result.success ? "success" : "error",
      message: result.message || (result.success ? "Passwort geändert." : "Passwortänderung fehlgeschlagen."),
    });
    if (result.success) {
      resetForm();
      setShowForm(false);
    }
  };

  return (
    <div className="bg-gray-900/80 rounded p-4 shadow mb-6">
      <div className="text-blue-300 font-bold mb-2">Einstellungen</div>
      <div className="mb-2 text-blue-100">
        E-Mail: <span className="font-semibold">{email}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleToggle}
          className="bg-blue-700 text-white px-4 py-2 rounded font-bold mt-2 hover:bg-blue-600 transition"
        >
          Passwort ändern
        </button>
        <button
          onClick={() => {
            if (onLogout) onLogout();
          }}
          className="bg-red-700 text-white px-4 py-2 rounded font-bold mt-2 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      {status && (
        <div
          className={`mt-3 text-sm ${
            status.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {status.message}
        </div>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="flex flex-col">
            <label className="text-sm text-blue-200 mb-1">Aktuelles Passwort</label>
            <input
              type="password"
              className="bg-gray-800 text-white px-3 py-2 rounded"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-blue-200 mb-1">Neues Passwort</label>
            <input
              type="password"
              className="bg-gray-800 text-white px-3 py-2 rounded"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-blue-200 mb-1">Passwort bestätigen</label>
            <input
              type="password"
              className="bg-gray-800 text-white px-3 py-2 rounded"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition disabled:opacity-50"
              disabled={savingPassword}
            >
              {savingPassword ? "Speichere..." : "Speichern"}
            </button>
            <button
              type="button"
              onClick={handleToggle}
              className="bg-gray-700 text-white px-4 py-2 rounded font-semibold hover:bg-gray-600 transition"
              disabled={savingPassword}
            >
              Abbrechen
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

ProfileSettings.propTypes = {
  email: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func,
  savingPassword: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default ProfileSettings;
