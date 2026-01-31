import React from 'react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4 text-red-600">404</h2>
      <p className="text-lg text-gray-600 mb-4">Seite nicht gefunden</p>
      <a href="/" className="text-blue-500 underline">Zurück zur Startseite</a>
    </motion.div>
  );
}
