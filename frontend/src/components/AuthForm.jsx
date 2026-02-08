import React, { useState } from "react";
import PropTypes from "prop-types";
import GitHubLoginButton from "./GitHubLoginButton";

// Farben und Glanz-Effekte werden mit Tailwind + Custom CSS umgesetzt
// Animationen für Wechsel zwischen Login/Registrierung

const strongColors = {
  primary: "from-gray-900 via-gray-800 to-blue-900",
  accent: "from-blue-700 via-cyan-700 to-gray-700",
  glow: "shadow-[0_0_40px_10px_rgba(30,64,175,0.4)]",
};

function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fehler und GitHub-Login-Status beim Mounten zurücksetzen
  React.useEffect(() => {
    setError("");
    if (typeof window !== 'undefined') {
      localStorage.removeItem('githubLoginPending');
      if (localStorage.getItem('authToken')) {
        setError("");
      }
    }
  }, []);
  // Wenn bereits ein Token existiert, sofort weiterleiten (Login-Form nie anzeigen)
  if (typeof window !== 'undefined' && localStorage.getItem('authToken')) {
    window.location.replace('/profile');
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Fehler sofort zurücksetzen beim Tippen
  };

  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let url = mode === "login" ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;
      let payload = mode === "login"
        ? { username: form.username, email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok && data.token) {
        // Nach erfolgreichem Login alles zurücksetzen
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', data.token);
          if (form.username) localStorage.setItem('authUser', form.username);
        }
        setForm({ email: "", password: "", username: "" });
        setError("");
        setLoading(false);
        onAuth && onAuth({ user: form.username, token: data.token });
        return; // Fehler nie setzen, wenn Login erfolgreich
      } else if (res.ok && data.message) {
        setError("Registrierung erfolgreich. Bitte einloggen.");
        setMode("login");
      } else {
        setError(data.error || data.message || "Login fehlgeschlagen.");
      }
    } catch {
      setError("Serverfehler. Bitte später versuchen.");
      setLoading(false);
    }
  };

  const githubPending = typeof window !== 'undefined' && localStorage.getItem('githubLoginPending') === 'true';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-blue-950 relative overflow-hidden">
      {/* Maskuliner Glanz-/Neon-Glow im Hintergrund */}
      <div className="absolute inset-0 pointer-events-none animate-pulse-slow">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded bg-linear-to-tr from-blue-900 via-cyan-800 to-gray-800 opacity-30 blur-2xl animate-spin-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded bg-linear-to-br from-blue-800 via-blue-600 to-cyan-700 opacity-20 blur-2xl animate-pulse" />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`relative z-10 w-full max-w-md p-8 rounded bg-linear-to-br ${strongColors.primary} shadow-2xl ${strongColors.glow} transition-all duration-700 ease-in-out backdrop-blur-md bg-opacity-90 border-2 border-blue-900`}
      >
        <h2 className="text-3xl font-extrabold text-blue-200 mb-6 text-center tracking-widest uppercase drop-shadow-lg">
          {mode === "login" ? "Login" : "Registrieren"}
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Benutzername"
            value={form.username}
            onChange={handleChange}
            className="rounded px-4 py-3 bg-gray-900/90 focus:bg-gray-800 focus:ring-2 focus:ring-blue-700 outline-none text-blue-100 font-semibold shadow-inner transition-all border border-blue-900 tracking-wide"
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            value={form.password}
            onChange={handleChange}
            className="rounded px-4 py-3 bg-gray-900/90 focus:bg-gray-800 focus:ring-2 focus:ring-blue-700 outline-none text-blue-100 font-semibold shadow-inner transition-all border border-blue-900 tracking-wide"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </div>
        <div className="flex justify-center mt-4">
          <GitHubLoginButton />
        </div>
        {(!localStorage.getItem('authToken') && !githubPending && error) && <div className="mt-4 text-blue-300 text-center animate-pulse font-semibold">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 rounded bg-linear-to-r from-blue-800 via-cyan-700 to-blue-900 text-blue-100 font-bold text-lg shadow-lg hover:scale-105 hover:shadow-blue-700/40 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-700 tracking-widest uppercase border border-blue-900"
        >
          {loading ? "Bitte warten..." : mode === "login" ? "Einloggen" : "Registrieren"}
        </button>
        <div className="mt-6 text-center">
          <span className="text-blue-300/80 font-medium">
            {mode === "login" ? "Noch keinen Account?" : "Schon registriert?"}
          </span>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="ml-2 text-cyan-400 hover:text-blue-200 font-semibold underline underline-offset-2 transition-colors tracking-wide"
          >
            {mode === "login" ? "Registrieren" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Custom Animations (in Tailwind config erweitern):
// .animate-spin-slow { animation: spin 8s linear infinite; }
// .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4,0,0.6,1) infinite; }

export default AuthForm;

AuthForm.propTypes = {
  onAuth: PropTypes.func
};