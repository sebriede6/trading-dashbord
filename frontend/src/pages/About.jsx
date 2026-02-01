import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Über Tradingtagebuch Pro</h2>
      <p className="text-lg text-gray-600 max-w-xl text-center mb-4">
        Tradingtagebuch Pro: Analyse & Reflexion ist deine moderne App für Trading-Statistiken, Fehleranalyse, Ziele und Psychologie. Entwickelt für alle, die mehr aus ihrem Trading herausholen wollen – unabhängig vom Broker.
      </p>
      <p className="text-md text-gray-500">Dein smarter Begleiter für Auswertung, Motivation und Wachstum.</p>
    </motion.div>
  );
}
