import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GitHubSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      // Fehler-Status und Loader im localStorage zurücksetzen
      localStorage.removeItem("authError");
      localStorage.removeItem("githubLoginPending");
      // Token aus URL entfernen
      window.history.replaceState({}, document.title, "/github-success");
      // Harte Weiterleitung, damit kein alter State bleibt
      window.location.replace("/profile");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-blue-400 text-xl animate-pulse">Lädt ...</div>
    </div>
  );
}

export default GitHubSuccess;
