import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Über diese App</h2>
      <p className="text-lg text-gray-600 max-w-xl text-center mb-4">
        Diese App ist ein modernes Fullstack-Projekt mit React, Tailwind, Node.js, PostgreSQL, Docker, CI/CD, Security und vielem mehr. Sie demonstriert Best Practices für Entwicklung, Sicherheit und Cloud-Deployment.
      </p>
      <p className="text-md text-gray-500">Erweitere sie nach deinen Wünschen!</p>
    </motion.div>
  );
}
