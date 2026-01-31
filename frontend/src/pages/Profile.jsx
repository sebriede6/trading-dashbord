import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function Profile({ username, onLogout, lightBg = 90, darkMode = false }) {
  // Passe die Farben an den Lightmodus-Regler an
  const lightBgColor = `hsl(220, 16%, ${lightBg + 10}%)`;
  const lightTextColor = lightBg < 60 ? '#222' : '#111';
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center min-h-screen">
      <h2
        className="text-3xl font-bold mb-4 transition-colors duration-300"
        style={darkMode ? { color: '#f3f4f6' } : { color: '#18181b' }}
      >
        Profil
      </h2>
      <div
        className="rounded shadow p-6 w-80 flex flex-col items-center border transition-colors duration-300"
        style={darkMode
          ? { backgroundColor: '#1f2937', color: '#f3f4f6', borderColor: '#374151' }
          : { backgroundColor: lightBgColor, color: lightTextColor, borderColor: '#e5e7eb' }}
      >
        <div className="text-lg font-semibold mb-2 transition-colors duration-300" style={darkMode ? { color: '#d1d5db' } : { color: lightTextColor }}>
          Benutzername:
        </div>
        <div className="mb-4" style={darkMode ? { color: '#93c5fd' } : { color: '#2563eb' }}>{username}</div>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onLogout}>Logout</button>
      </div>
    </motion.div>
  );
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  lightBg: PropTypes.number,
  darkMode: PropTypes.bool,
};
