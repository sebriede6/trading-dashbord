import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import ProfileAvatar from "../components/ProfileAvatar";
import ProfileStats from "../components/ProfileStats";
import ProfilePsychology from "../components/ProfilePsychology";
import ProfileSettings from "../components/ProfileSettings";


const API_URL = import.meta.env.VITE_API_URL || "";

function Profile({ onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [savingPsychology, setSavingPsychology] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("Nicht eingeloggt.");
      setLoading(false);
      return;
    }
    setToken(storedToken);
    fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Fehler beim Laden des Profils.");
        setLoading(false);
      });
  }, []);

  const handleSavePsychology = async (values) => {
    const authToken = token || localStorage.getItem("authToken");
    if (!authToken) {
      return { success: false, message: "Bitte einloggen." };
    }
    setSavingPsychology(true);
    try {
      const response = await fetch(`${API_URL}/profile/psychology`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, message: errorData.error || "Speichern fehlgeschlagen." };
      }
      const data = await response.json();
      setProfile(prev => prev ? { ...prev, psychology: data.psychology } : prev);
      return { success: true };
    } catch {
      return { success: false, message: "Speichern fehlgeschlagen. Bitte erneut versuchen." };
    } finally {
      setSavingPsychology(false);
    }
  };

  const handleChangePassword = async ({ currentPassword, newPassword }) => {
    const authToken = token || localStorage.getItem("authToken");
    if (!authToken) {
      return { success: false, message: "Bitte einloggen." };
    }
    setSavingPassword(true);
    try {
      const response = await fetch(`${API_URL}/profile/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, message: errorData.error || "Passwortänderung fehlgeschlagen." };
      }
      const data = await response.json().catch(() => ({}));
      return { success: true, message: data.message || "Passwort geändert." };
    } catch {
      return { success: false, message: "Passwortänderung fehlgeschlagen. Bitte erneut versuchen." };
    } finally {
      setSavingPassword(false);
    }
  };


  // Debug-Panel für schnelle Fehleranalyse
  if (loading) return <div className="flex items-center justify-center min-h-screen text-blue-400 text-xl animate-pulse">Lädt ...</div>;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-400 text-xl">
      {error}
      <div className="mt-4 p-2 bg-gray-900 text-xs text-gray-200 rounded max-w-xl break-all">
        <b>Debug:</b><br/>
        Token: {localStorage.getItem("authToken")?.slice(0, 32) + '...'}<br/>
        <span>Antwort: {JSON.stringify(profile)}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Profil-Header und Avatar */}
      <ProfileAvatar avatarUrl={profile.user.avatar_url} username={profile.user.username} />
      <ProfileStats stats={profile.stats} />
      <ProfilePsychology
        psychology={profile.psychology}
        onSave={handleSavePsychology}
        saving={savingPsychology}
      />
      <ProfileSettings
        email={profile.user.email}
        onChangePassword={handleChangePassword}
        savingPassword={savingPassword}
        onLogout={onLogout}
      />
    </div>
  );
}

Profile.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Profile;
